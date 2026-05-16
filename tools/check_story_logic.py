#!/usr/bin/env python3
"""Static story consistency checker for Sound Novel Starter.

This tool checks structural story-logic signals that the runtime validator
does not fully cover:
- choice state updates
- endingCheck condition rules
- scene requires/assumes fields
- item/state references used by conditions
- routes reaching endings without explicit condition rules

It is intentionally conservative. It does not prove a story is contradiction-free.
"""

from __future__ import annotations

import argparse
import itertools
import json
from pathlib import Path
from typing import Any


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def state_get(state: dict[str, Any], key: str) -> Any:
    current: Any = state
    for part in str(key).split("."):
        if not isinstance(current, dict) or part not in current:
            return None
        current = current[part]
    return current


def evaluate_condition(condition: Any, state: dict[str, Any]) -> bool:
    if not condition:
        return False
    if condition.get("all"):
        return all(evaluate_condition(item, state) for item in condition["all"])
    if condition.get("any"):
        return any(evaluate_condition(item, state) for item in condition["any"])
    if condition.get("not"):
        return not evaluate_condition(condition["not"], state)

    key = condition.get("flag") or condition.get("key") or condition.get("state")
    actual = state_get(state, key)
    if "equals" in condition:
        return actual == condition["equals"]
    if "notEquals" in condition:
        return actual != condition["notEquals"]
    if "exists" in condition:
        return (actual is not None) if condition["exists"] else (actual is None)
    if "in" in condition:
        return actual in condition["in"]
    if "notIn" in condition:
        return actual not in condition["notIn"]
    if "gte" in condition:
        return float(actual or 0) >= float(condition["gte"])
    if "gt" in condition:
        return float(actual or 0) > float(condition["gt"])
    if "lte" in condition:
        return float(actual or 0) <= float(condition["lte"])
    if "lt" in condition:
        return float(actual or 0) < float(condition["lt"])
    if "truthy" in condition:
        return bool(actual) == bool(condition["truthy"])
    return False


def apply_set(state: dict[str, Any], data: dict[str, Any]) -> None:
    for key, value in data.items():
        parts = str(key).split(".")
        current = state
        for part in parts[:-1]:
            current = current.setdefault(part, {})
        current[parts[-1]] = value


def collect_condition_keys(condition: Any, keys: set[str]) -> None:
    if not condition:
        return
    if "all" in condition:
        for item in condition["all"]:
            collect_condition_keys(item, keys)
    if "any" in condition:
        for item in condition["any"]:
            collect_condition_keys(item, keys)
    if "not" in condition:
        collect_condition_keys(condition["not"], keys)
    key = condition.get("flag") or condition.get("key") or condition.get("state")
    if key:
        keys.add(str(key))


def check(scenario: dict[str, Any]) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []

    scenes = {scene["id"]: scene for scene in scenario.get("scenes", [])}
    if scenario.get("startScene") not in scenes:
        errors.append(f"startScene not found: {scenario.get('startScene')}")

    set_keys: set[str] = set()
    condition_keys: set[str] = set()
    ending_checks: list[tuple[str, dict[str, Any]]] = []

    for scene in scenario.get("scenes", []):
        for field in ["requires", "assumes"]:
            if field in scene:
                collect_condition_keys(scene[field], condition_keys)

        for index, step in enumerate(scene.get("steps", [])):
            if step.get("type") == "choice":
                for choice in step.get("choices", []):
                    for key in (choice.get("set") or {}).keys():
                        set_keys.add(str(key))
            if step.get("type") == "endingCheck":
                ending_checks.append((scene["id"], step))
                for rule in step.get("rules", []):
                    collect_condition_keys(rule.get("if") or rule.get("when") or rule.get("condition"), condition_keys)

    if not ending_checks:
        warnings.append("No condition-based endingCheck rules found. Legacy score-based ending may allow story-state contradictions.")

    unknown_condition_keys = sorted([key for key in condition_keys if key not in set_keys and not key.startswith("score")])
    if unknown_condition_keys:
        warnings.append(f"Condition keys not updated by any choice.set: {unknown_condition_keys}")

    for scene_id, step in ending_checks:
        rules = step.get("rules", [])
        if not rules:
            warnings.append(f"{scene_id}: endingCheck has no rules and will use legacy fallback.")
            continue
        if not any(rule.get("default") is True for rule in rules) and not step.get("fallback"):
            warnings.append(f"{scene_id}: endingCheck rules have no default or fallback.")
        targets = [rule.get("next") for rule in rules if rule.get("next")]
        for target in targets:
            if target not in scenes:
                errors.append(f"{scene_id}: endingCheck target not found: {target}")

    return errors, warnings


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--scenario", default="content/scenario/main.json")
    args = parser.parse_args()

    scenario = load_json(Path(args.scenario))
    errors, warnings = check(scenario)

    print(json.dumps({
        "ok": not errors,
        "errors": errors,
        "warnings": warnings,
    }, ensure_ascii=False, indent=2))

    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
