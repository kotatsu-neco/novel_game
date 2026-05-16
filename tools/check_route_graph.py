#!/usr/bin/env python3
"""Route graph checker for Sound Novel Starter.

Target scale: short to mid-length sound novels up to about 30 minutes.
Checks:
- unreachable scenes
- ending reachability
- merge points
- repeated branch convergence from the same choice scene
- loops / cycles
- branching pressure
- rough playtime estimate from text length
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


MAX_RECOMMENDED_SCENES = 80
MAX_RECOMMENDED_CHOICES = 25
MAX_RECOMMENDED_EST_MINUTES = 30
READING_CHARS_PER_MINUTE = 450


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def step_text_len(step: dict[str, Any]) -> int:
    total = 0
    if isinstance(step.get("text"), str):
        total += len(step["text"])
    if isinstance(step.get("pages"), list):
        total += sum(len(str(page)) for page in step["pages"])
    if step.get("type") == "conditionalText":
        for item in step.get("cases", []):
            total += len(str(item.get("text", "")))
            total += sum(len(str(page)) for page in item.get("pages", []) or [])
        total += len(str(step.get("fallbackText", "")))
    if step.get("type") == "choice":
        total += len(str(step.get("prompt", "")))
        total += sum(len(str(choice.get("label", ""))) for choice in step.get("choices", []))
    if step.get("type") == "ending":
        total += len(str(step.get("title", ""))) + len(str(step.get("subtitle", "")))
    return total


def add_edge(graph: dict[str, set[str]], edge_counts: dict[str, dict[str, int]], src: str, dst: str | None) -> None:
    if not dst:
        return
    graph.setdefault(src, set()).add(dst)
    edge_counts.setdefault(dst, {})
    edge_counts[dst][src] = edge_counts[dst].get(src, 0) + 1


def build_graph(scenario: dict[str, Any]) -> tuple[dict[str, set[str]], dict[str, dict[str, int]], dict[str, int], dict[str, Any]]:
    scenes = {scene["id"]: scene for scene in scenario.get("scenes", [])}
    graph = {scene_id: set() for scene_id in scenes}
    edge_counts: dict[str, dict[str, int]] = {scene_id: {} for scene_id in scenes}
    choice_count_by_scene = {scene_id: 0 for scene_id in scenes}
    stats = {"choice_count": 0, "text_chars": 0, "ending_scenes": set()}

    default_legacy_endings = [eid for eid in ["ending_bad", "ending_normal", "ending_true"] if eid in scenes]

    for scene_id, scene in scenes.items():
        for step in scene.get("steps", []):
            stats["text_chars"] += step_text_len(step)

            if step.get("type") == "jump":
                add_edge(graph, edge_counts, scene_id, step.get("next"))

            if step.get("type") == "choice":
                choices = step.get("choices", [])
                stats["choice_count"] += len(choices)
                choice_count_by_scene[scene_id] += len(choices)
                for choice in choices:
                    add_edge(graph, edge_counts, scene_id, choice.get("next"))

            if step.get("type") == "endingCheck":
                rules = step.get("rules", [])
                if rules:
                    for rule in rules:
                        add_edge(graph, edge_counts, scene_id, rule.get("next"))
                    add_edge(graph, edge_counts, scene_id, step.get("fallback"))
                else:
                    # Legacy fallback in Runtime can route to these conventional ending ids.
                    for ending_id in default_legacy_endings:
                        add_edge(graph, edge_counts, scene_id, ending_id)

            if step.get("type") == "ending":
                stats["ending_scenes"].add(scene_id)

        # Sequential fall-through to next scene is intentionally not assumed.
    return graph, edge_counts, choice_count_by_scene, stats


def reachable_from_start(graph: dict[str, set[str]], start: str) -> set[str]:
    seen: set[str] = set()
    stack = [start]
    while stack:
        node = stack.pop()
        if node in seen or node not in graph:
            continue
        seen.add(node)
        stack.extend(sorted(graph[node] - seen))
    return seen


def reverse_graph(graph: dict[str, set[str]]) -> dict[str, set[str]]:
    incoming = {node: set() for node in graph}
    for src, targets in graph.items():
        for dst in targets:
            incoming.setdefault(dst, set()).add(src)
    return incoming


def detect_cycles(graph: dict[str, set[str]]) -> list[list[str]]:
    cycles: list[list[str]] = []
    temp: set[str] = set()
    perm: set[str] = set()
    stack: list[str] = []

    def visit(node: str) -> None:
        if node in perm:
            return
        if node in temp:
            if node in stack:
                cycles.append(stack[stack.index(node):] + [node])
            return
        temp.add(node)
        stack.append(node)
        for dst in graph.get(node, []):
            if dst in graph:
                visit(dst)
        stack.pop()
        temp.remove(node)
        perm.add(node)

    for node in graph:
        visit(node)

    unique = []
    seen = set()
    for cyc in cycles:
        key = tuple(cyc)
        if key not in seen:
            seen.add(key)
            unique.append(cyc)
    return unique


def can_reach_ending(graph: dict[str, set[str]], ending_scenes: set[str]) -> dict[str, bool]:
    incoming = reverse_graph(graph)
    can = {node: False for node in graph}
    stack = list(ending_scenes)
    while stack:
        node = stack.pop()
        if can.get(node):
            continue
        can[node] = True
        for src in incoming.get(node, set()):
            if not can.get(src):
                stack.append(src)
    return can


def check(scenario: dict[str, Any]) -> dict[str, Any]:
    graph, edge_counts, choice_count_by_scene, stats = build_graph(scenario)
    start = scenario.get("startScene")
    reachable = reachable_from_start(graph, start)
    incoming = reverse_graph(graph)
    cycles = detect_cycles(graph)
    ending_scenes = stats["ending_scenes"]
    ending_reachability = can_reach_ending(graph, ending_scenes)

    unreachable = sorted(set(graph) - reachable)
    dead_routes = sorted([node for node in reachable if not ending_reachability.get(node, False)])
    merge_points = sorted([
        node for node in graph
        if len(incoming.get(node, set())) >= 2 or sum(edge_counts.get(node, {}).values()) >= 2
    ])
    high_branch = {scene: count for scene, count in choice_count_by_scene.items() if count >= 5}

    estimated_minutes = round(stats["text_chars"] / READING_CHARS_PER_MINUTE, 1)

    warnings = []
    errors = []

    if unreachable:
        warnings.append(f"Unreachable scenes: {unreachable}")
    if dead_routes:
        warnings.append(f"Reachable scenes that cannot reach an ending: {dead_routes}")
    if cycles:
        warnings.append(f"Loop/cycle candidates: {cycles}")
    if len(graph) > MAX_RECOMMENDED_SCENES:
        warnings.append(f"Scene count {len(graph)} exceeds recommended maximum {MAX_RECOMMENDED_SCENES} for a <=30 minute kit.")
    if stats["choice_count"] > MAX_RECOMMENDED_CHOICES:
        warnings.append(f"Choice count {stats['choice_count']} exceeds recommended maximum {MAX_RECOMMENDED_CHOICES} for a <=30 minute kit.")
    if estimated_minutes > MAX_RECOMMENDED_EST_MINUTES:
        warnings.append(f"Estimated reading time {estimated_minutes} minutes exceeds recommended maximum {MAX_RECOMMENDED_EST_MINUTES}.")
    if high_branch:
        warnings.append(f"Scenes with many choices: {high_branch}")

    for dst in set().union(*graph.values()) if graph else set():
        if dst not in graph:
            errors.append(f"Reference to missing scene: {dst}")

    return {
        "ok": not errors,
        "errors": errors,
        "warnings": warnings,
        "stats": {
            "sceneCount": len(graph),
            "choiceCount": stats["choice_count"],
            "textChars": stats["text_chars"],
            "estimatedMinutes": estimated_minutes,
            "endingSceneCount": len(ending_scenes),
        },
        "startScene": start,
        "reachableScenes": sorted(reachable),
        "unreachableScenes": unreachable,
        "mergePoints": {
            node: {
                "incomingSources": sorted(incoming.get(node, set())),
                "incomingEdgeCounts": edge_counts.get(node, {})
            }
            for node in merge_points
        },
        "cycles": cycles,
        "deadRoutes": dead_routes,
        "graph": {node: sorted(targets) for node, targets in graph.items()},
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--scenario", default="content/scenario/main.json")
    parser.add_argument("--out", default="")
    args = parser.parse_args()

    scenario = load_json(Path(args.scenario))
    result = check(scenario)
    payload = json.dumps(result, ensure_ascii=False, indent=2)
    print(payload)
    if args.out:
        Path(args.out).write_text(payload + "\n", encoding="utf-8")
    return 1 if result["errors"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
