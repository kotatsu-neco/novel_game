#!/usr/bin/env python3
"""Compile SCENARIO_SOURCE.md into runtime main.json and synchronize manifest.json.

This compiler is intentionally strict. It supports the project's fixed
authoring Markdown format, not arbitrary Markdown.
"""

from __future__ import annotations

import argparse
import copy
import json
import re
from pathlib import Path
from typing import Any


ALLOWED_STATUS = {"draft", "ai_revise", "human_review", "human_final", "locked"}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def parse_scalar(value: str) -> Any:
    value = value.strip()
    if value.startswith("+") and value[1:].isdigit():
        return int(value)
    if value.startswith("-") and value[1:].isdigit():
        return int(value)
    if value.isdigit():
        return int(value)
    if value == "true":
        return True
    if value == "false":
        return False
    return value


def parse_source_metadata(source: str) -> dict[str, Any]:
    """Parse source-level content-pack metadata before the first scene."""
    first_scene = re.search(r"^# scene:\s*", source, flags=re.MULTILINE)
    header = source[: first_scene.start()] if first_scene else source

    metadata: dict[str, Any] = {
        "contentPack": {},
        "backgrounds": {},
        "audio": {"ambiences": {}, "se": {}},
    }

    current_section = None
    current_item: dict[str, Any] | None = None
    current_audio_group: str | None = None

    for raw_line in header.splitlines():
        stripped = raw_line.strip()

        if stripped == "":
            continue
        if stripped == "---":
            current_section = None
            current_item = None
            current_audio_group = None
            continue

        if stripped == "# content-pack":
            current_section = "content-pack"
            current_item = None
            current_audio_group = None
            continue
        if stripped == "# backgrounds":
            current_section = "backgrounds"
            current_item = None
            current_audio_group = None
            continue
        if stripped == "# audio":
            current_section = "audio"
            current_item = None
            current_audio_group = None
            continue
        if current_section == "audio" and stripped in {"ambiences:", "se:"}:
            current_audio_group = stripped[:-1]
            current_item = None
            continue

        if current_section == "content-pack":
            if ":" not in stripped:
                continue
            key, value = stripped.split(":", 1)
            metadata["contentPack"][key.strip()] = parse_scalar(value)
            continue

        if current_section == "backgrounds":
            if stripped.startswith("- id:"):
                item_id = stripped.split(":", 1)[1].strip()
                current_item = {"id": item_id}
                metadata["backgrounds"][item_id] = current_item
                continue
            if current_item is not None and ":" in stripped:
                key, value = stripped.split(":", 1)
                current_item[key.strip()] = parse_scalar(value)
                continue

        if current_section == "audio":
            if stripped.startswith("- id:"):
                item_id = stripped.split(":", 1)[1].strip()
                current_item = {"id": item_id}
                group = current_audio_group or "se"
                metadata["audio"].setdefault(group, {})[item_id] = current_item
                continue
            if current_item is not None and ":" in stripped:
                key, value = stripped.split(":", 1)
                current_item[key.strip()] = parse_scalar(value)
                continue

    return metadata

def split_scene_blocks(source: str) -> list[tuple[str, str]]:
    matches = list(re.finditer(r"^# scene:\s*([A-Za-z0-9_\-]+)\s*$", source, flags=re.MULTILINE))
    blocks: list[tuple[str, str]] = []
    for index, match in enumerate(matches):
        scene_id = match.group(1)
        start = match.start()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(source)
        blocks.append((scene_id, source[start:end].strip()))
    return blocks


def parse_scene(scene_id: str, block: str) -> dict[str, Any]:
    lines = block.splitlines()
    scene: dict[str, Any] = {"id": scene_id, "steps": []}
    metadata_end = 1

    for idx in range(1, len(lines)):
        line = lines[idx]
        metadata_end = idx + 1
        if line.strip() == "":
            break
        if ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            if key == "status":
                if value not in ALLOWED_STATUS:
                    raise ValueError(f"Scene {scene_id}: invalid status {value!r}")
                scene["_status"] = value
            elif key in {"background", "ambience"}:
                if value != "":
                    scene[key] = value
            elif key in {"requires", "assumes"}:
                if value != "":
                    scene[key] = parse_condition_expr(value)
            else:
                scene[f"_{key}"] = value

    body_lines = lines[metadata_end:]
    scene["steps"] = parse_steps(scene_id, body_lines)
    return scene


def is_step_start(line: str) -> bool:
    stripped = line.strip()
    if stripped == "---":
        return True
    if stripped.startswith("# scene:"):
        return True
    if re.match(r"^\[(text|voice|document|title)(?:\s+[^\]]+)?\]$", stripped):
        return True
    if re.match(r"^\[[A-Za-z]+(?:\s+\d+)?\]$", stripped):
        return True
    if re.match(r"^\[next:\s*[A-Za-z0-9_\-]+\]$", stripped):
        return True
    return False


def collect_block(lines: list[str], start: int) -> tuple[str, int]:
    collected: list[str] = []
    i = start
    while i < len(lines):
        if is_step_start(lines[i]):
            break
        collected.append(lines[i])
        i += 1
    text = "\n".join(collected).strip("\n")
    return text.strip(), i


def parse_tag_attrs(raw: str) -> dict[str, Any]:
    attrs: dict[str, Any] = {}
    for part in raw.split():
        if "=" not in part:
            raise ValueError(f"Invalid tag attribute {part!r}")
        key, value = part.split("=", 1)
        attrs[key.strip()] = parse_scalar(value)
    return attrs


def parse_steps(scene_id: str, lines: list[str]) -> list[dict[str, Any]]:
    steps: list[dict[str, Any]] = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if line == "" or line == "---":
            i += 1
            continue

        next_match = re.match(r"^\[next:\s*([A-Za-z0-9_\-]+)\]$", line)
        if next_match:
            steps.append({"type": "jump", "next": next_match.group(1)})
            i += 1
            continue

        simple_match = re.match(r"^\[(text|voice|document|title)(?:\s+([^\]]+))?\]$", line)
        if simple_match:
            step_type = simple_match.group(1)
            attrs = parse_tag_attrs(simple_match.group(2) or "")
            i += 1

            pages: list[str] = []
            while i < len(lines) and re.match(r"^\[page\s+\d+\]$", lines[i].strip()):
                i += 1
                page_text, i = collect_block(lines, i)
                pages.append(page_text)
            if pages:
                step = {"type": step_type, "pages": pages}
                step.update(attrs)
                steps.append(step)
                continue

            text, i = collect_block(lines, i)
            step = {"type": step_type, "text": text}
            step.update(attrs)
            steps.append(step)
            continue

        if line == "[choice]":
            choice_step, i = parse_choice(scene_id, lines, i + 1)
            steps.append(choice_step)
            continue

        if line == "[ending]":
            ending_step, i = parse_ending(scene_id, lines, i + 1)
            steps.append(ending_step)
            continue

        if line == "[endingCheck]":
            ending_check_step, i = parse_ending_check(scene_id, lines, i + 1)
            steps.append(ending_check_step)
            continue

        if line == "[pageBreak]":
            steps.append({"type": "pageBreak"})
            i += 1
            continue

        raise ValueError(f"Scene {scene_id}: unknown source line: {lines[i]!r}")

    return steps



def parse_condition_expr(expr: str) -> dict[str, Any]:
    expr = expr.strip()
    if expr in {"default", "else"}:
        return {"default": True}
    for operator in ["notEquals", "equals", "gte", "lte", "gt", "lt"]:
        token = f" {operator} "
        if token in expr:
            key, value = expr.split(token, 1)
            return {"flag": key.strip(), operator: parse_scalar(value.strip())}
    for symbol, operator in [("!=", "notEquals"), ("==", "equals"), (">=", "gte"), ("<=", "lte"), (">", "gt"), ("<", "lt")]:
        if symbol in expr:
            key, value = expr.split(symbol, 1)
            return {"flag": key.strip(), operator: parse_scalar(value.strip())}
    if expr.startswith("!"):
        return {"not": {"flag": expr[1:].strip(), "truthy": True}}
    return {"flag": expr, "truthy": True}


def parse_ending_check(scene_id: str, lines: list[str], start: int) -> tuple[dict[str, Any], int]:
    step: dict[str, Any] = {"type": "endingCheck", "rules": []}
    i = start

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if stripped == "":
            i += 1
            continue
        if is_step_start(line):
            break

        if stripped.startswith("fallback:"):
            step["fallback"] = stripped.split(":", 1)[1].strip()
            i += 1
            continue

        if stripped.startswith("- when:") or stripped.startswith("- if:"):
            condition_expr = stripped.split(":", 1)[1].strip()
            rule: dict[str, Any] = {"if": parse_condition_expr(condition_expr)}
            i += 1
            while i < len(lines):
                sub = lines[i]
                s = sub.strip()
                if s == "":
                    i += 1
                    continue
                if is_step_start(sub) or s.startswith("- when:") or s.startswith("- if:") or s.startswith("- default:"):
                    break
                if s.startswith("next:"):
                    rule["next"] = s.split(":", 1)[1].strip()
                    i += 1
                    continue
                if s.startswith("ending:"):
                    rule["ending"] = s.split(":", 1)[1].strip()
                    i += 1
                    continue
                raise ValueError(f"Scene {scene_id}: invalid endingCheck rule line {sub!r}")
            step["rules"].append(rule)
            continue

        if stripped.startswith("- default:"):
            value = parse_scalar(stripped.split(":", 1)[1])
            rule = {"default": bool(value)}
            i += 1
            while i < len(lines):
                sub = lines[i]
                s = sub.strip()
                if s == "":
                    i += 1
                    continue
                if is_step_start(sub) or s.startswith("- when:") or s.startswith("- if:") or s.startswith("- default:"):
                    break
                if s.startswith("next:"):
                    rule["next"] = s.split(":", 1)[1].strip()
                    i += 1
                    continue
                if s.startswith("ending:"):
                    rule["ending"] = s.split(":", 1)[1].strip()
                    i += 1
                    continue
                raise ValueError(f"Scene {scene_id}: invalid endingCheck default line {sub!r}")
            step["rules"].append(rule)
            continue

        raise ValueError(f"Scene {scene_id}: invalid endingCheck block line {line!r}")

    if not step["rules"]:
        step.pop("rules")
    return step, i


def parse_choice(scene_id: str, lines: list[str], start: int) -> tuple[dict[str, Any], int]:
    prompt = ""
    choices: list[dict[str, Any]] = []
    i = start

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if stripped == "":
            i += 1
            continue
        if is_step_start(line):
            break
        if stripped.startswith("prompt:"):
            prompt = stripped.split(":", 1)[1].strip()
            i += 1
            continue
        if stripped.startswith("- label:"):
            choice: dict[str, Any] = {"label": stripped.split(":", 1)[1].strip()}
            i += 1
            while i < len(lines):
                sub = lines[i]
                s = sub.strip()
                if s == "":
                    i += 1
                    continue
                if is_step_start(sub) or s.startswith("- label:"):
                    break
                if s.startswith("next:"):
                    choice["next"] = s.split(":", 1)[1].strip()
                    i += 1
                    continue
                if s.startswith("score:"):
                    choice["score"] = parse_scalar(s.split(":", 1)[1])
                    i += 1
                    continue
                if s.startswith("forceEnding:"):
                    choice["forceEnding"] = s.split(":", 1)[1].strip()
                    i += 1
                    continue
                if s == "set:":
                    i += 1
                    data: dict[str, Any] = {}
                    while i < len(lines):
                        set_line = lines[i]
                        ss = set_line.strip()
                        if ss == "":
                            i += 1
                            continue
                        if is_step_start(set_line) or ss.startswith("- label:"):
                            break
                        if ":" not in ss:
                            raise ValueError(f"Scene {scene_id}: invalid set line {set_line!r}")
                        key, value = ss.split(":", 1)
                        data[key.strip()] = parse_scalar(value)
                        i += 1
                    choice["set"] = data
                    continue
                raise ValueError(f"Scene {scene_id}: invalid choice line {sub!r}")
            choices.append(choice)
            continue
        raise ValueError(f"Scene {scene_id}: invalid choice block line {line!r}")

    return {"type": "choice", "prompt": prompt, "choices": choices}, i


def parse_ending(scene_id: str, lines: list[str], start: int) -> tuple[dict[str, Any], int]:
    step: dict[str, Any] = {"type": "ending"}
    i = start
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if stripped == "":
            i += 1
            continue
        if is_step_start(line):
            break
        if ":" not in stripped:
            raise ValueError(f"Scene {scene_id}: invalid ending line {line!r}")
        key, value = stripped.split(":", 1)
        key = key.strip()
        value = value.strip()
        if key == "ending":
            step["ending"] = value
        elif key == "title":
            step["title"] = value
        elif key == "subtitle":
            step["subtitle"] = value
        else:
            step[key] = value
        i += 1
    return step, i


def compile_source(source_path: Path, base_path: Path) -> tuple[dict[str, Any], dict[str, Any]]:
    source = read_text(source_path)
    source_metadata = parse_source_metadata(source)
    base = json.loads(read_text(base_path))

    scenes = []
    statuses: dict[str, str] = {}
    for scene_id, block in split_scene_blocks(source):
        scene = parse_scene(scene_id, block)
        statuses[scene_id] = scene.pop("_status", "")
        scenes.append(scene)

    output = copy.deepcopy(base)
    output["scenes"] = scenes

    content_pack = source_metadata.get("contentPack", {})
    if content_pack.get("startScene"):
        output["startScene"] = content_pack["startScene"]

    output.setdefault("meta", {})
    output["meta"]["version"] = "v21"
    if content_pack.get("title"):
        output["meta"]["title"] = content_pack["title"]
    try:
        compiled_from = source_path.relative_to(Path.cwd()).as_posix()
    except ValueError:
        compiled_from = source_path.as_posix()
    output["meta"]["compiledFrom"] = compiled_from
    output["meta"]["sourceStatusByScene"] = statuses

    return output, source_metadata


def update_manifest(base_manifest: dict[str, Any], source_metadata: dict[str, Any]) -> dict[str, Any]:
    manifest = copy.deepcopy(base_manifest)
    content_pack = source_metadata.get("contentPack", {})
    backgrounds = source_metadata.get("backgrounds", {})

    manifest["version"] = "v21"
    for key in ["title", "gameId", "saveKey"]:
        if content_pack.get(key):
            manifest[key] = content_pack[key]

    if backgrounds:
        manifest["backgrounds"] = {}
        for bg_id, spec in backgrounds.items():
            item = {k: v for k, v in spec.items() if k != "id"}
            manifest["backgrounds"][bg_id] = item

    audio = source_metadata.get("audio", {})
    if audio:
        manifest["audio"] = {"ambiences": {}, "se": {}}
        for group in ["ambiences", "se"]:
            for audio_id, spec in audio.get(group, {}).items():
                item = {k: v for k, v in spec.items() if k != "id"}
                manifest["audio"][group][audio_id] = item

    manifest.setdefault("authoringSystem", {})
    manifest["authoringSystem"]["compilerImplemented"] = True
    manifest["authoringSystem"]["sourceMetadataEnabled"] = True
    manifest["authoringSystem"]["compilerPath"] = "tools/compile_scenario.py"
    manifest["authoringSystem"]["compileReport"] = "content/scenario/COMPILE_REPORT.md"
    manifest.setdefault("contentPack", {})
    manifest["contentPack"]["sourceMetadata"] = "content/scenario/SCENARIO_SOURCE.md"
    return manifest


def validate_scenario(data: dict[str, Any], manifest: dict[str, Any] | None = None) -> list[str]:
    errors: list[str] = []
    scene_ids = [scene.get("id") for scene in data.get("scenes", [])]
    scene_set = set(scene_ids)

    if len(scene_ids) != len(scene_set):
        errors.append("Duplicate scene IDs found.")
    if data.get("startScene") not in scene_set:
        errors.append(f"startScene not found: {data.get('startScene')}")

    manifest_backgrounds = set((manifest or {}).get("backgrounds", {}).keys())
    manifest_ambiences = set((manifest or {}).get("audio", {}).get("ambiences", {}).keys())
    manifest_se = set((manifest or {}).get("audio", {}).get("se", {}).keys())
    procedural_ambience_prefixes = ("rain", "silent", "dawn_silence")
    procedural_se_keywords = ("bell", "footstep")

    for scene in data.get("scenes", []):
        sid = scene.get("id")
        if not scene.get("background"):
            errors.append(f"{sid}: missing background")
        if manifest is not None and scene.get("background") not in manifest_backgrounds:
            errors.append(f"{sid}: background not found in manifest: {scene.get('background')}")
        if manifest is not None:
            ambience = scene.get("ambience")
            if ambience and ambience not in manifest_ambiences and not ambience.startswith(procedural_ambience_prefixes):
                errors.append(f"{sid}: ambience not found in manifest.audio.ambiences: {ambience}")
        if not isinstance(scene.get("steps"), list):
            errors.append(f"{sid}: steps must be list")
            continue

        for index, step in enumerate(scene.get("steps", [])):
            step_type = step.get("type")
            label = f"{sid}[{index}]"

            if manifest is not None and step.get("se"):
                se_id = step.get("se")
                if se_id not in manifest_se and not any(keyword in se_id for keyword in procedural_se_keywords):
                    errors.append(f"{label}: se not found in manifest.audio.se: {se_id}")

            if step_type == "jump":
                if step.get("next") not in scene_set:
                    errors.append(f"{label}: jump target not found: {step.get('next')}")
            elif step_type == "choice":
                choices = step.get("choices", [])
                if not choices:
                    errors.append(f"{label}: choice has no choices")
                for choice_index, choice in enumerate(choices):
                    choice_label = f"{label}.choices[{choice_index}]"
                    if choice.get("next") not in scene_set:
                        errors.append(f"{choice_label}: choice target not found: {choice.get('next')}")
                    if not choice.get("label"):
                        errors.append(f"{choice_label}: choice label is required")
                    if "score" in choice and not isinstance(choice.get("score"), int):
                        errors.append(f"{choice_label}: score must be number")
            elif step_type in {"text", "voice", "document", "title"}:
                has_text = isinstance(step.get("text"), str)
                has_pages = isinstance(step.get("pages"), list) and all(isinstance(page, str) for page in step.get("pages", []))
                if not has_text and not has_pages:
                    errors.append(f"{label}: {step_type} requires text or pages")
                if has_text and has_pages:
                    errors.append(f"{label}: use either text or pages, not both")
                if step_type == "voice" and has_text and not (step["text"].startswith("「") and step["text"].endswith("」")):
                    errors.append(f"{label}: voice must use 「」")
                if step_type == "document" and has_text and not (step["text"].startswith("『") and step["text"].endswith("』")):
                    errors.append(f"{label}: document must use 『』")
            elif step_type == "ending":
                if not step.get("ending"):
                    errors.append(f"{label}: ending id is required")
                if not step.get("title"):
                    errors.append(f"{label}: ending title is required")
                if not step.get("subtitle"):
                    errors.append(f"{label}: ending subtitle is required")
            elif step_type in {"endingCheck", "pageBreak"}:
                pass
            else:
                errors.append(f"{label}: unknown step type {step_type}")

    endings = {
        step.get("ending")
        for scene in data.get("scenes", [])
        for step in scene.get("steps", [])
        if step.get("type") == "ending"
    }
    for required_ending in ["bad", "normal", "true"]:
        if required_ending not in endings:
            errors.append(f"ending not found: {required_ending}")

    return errors


def compare_semantic(compiled: dict[str, Any], existing: dict[str, Any]) -> dict[str, Any]:
    def slim(data: dict[str, Any]) -> dict[str, Any]:
        result = copy.deepcopy(data)
        result.get("meta", {}).pop("version", None)
        result.get("meta", {}).pop("compiledFrom", None)
        result.get("meta", {}).pop("sourceStatusByScene", None)
        return result

    return {
        "matchesExistingExceptMeta": slim(compiled) == slim(existing),
        "compiledSceneCount": len(compiled.get("scenes", [])),
        "existingSceneCount": len(existing.get("scenes", [])),
    }


def write_report(path: Path, compiled: dict[str, Any], manifest: dict[str, Any], validation_errors: list[str], comparison: dict[str, Any], source: Path, output: Path) -> None:
    lines: list[str] = []
    lines.append("# COMPILE_REPORT.md\n")
    lines.append("## 1. 目的\n")
    lines.append("`SCENARIO_SOURCE.md` から `main.json` と `manifest.json` を変換・検査した結果を記録する。\n")
    lines.append("## 2. 変換元\n")
    lines.append(f"```text\n{source.as_posix()}\n```\n")
    lines.append("## 3. 変換先\n")
    lines.append(f"```text\n{output.as_posix()}\ncontent/manifest.json\n```\n")
    lines.append("## 4. 生成結果\n")
    lines.append(f"- title: {manifest.get('title')}")
    lines.append(f"- gameId: {manifest.get('gameId')}")
    lines.append(f"- saveKey: {manifest.get('saveKey')}")
    lines.append(f"- startScene: {compiled.get('startScene')}")
    lines.append(f"- scene数: {len(compiled.get('scenes', []))}")
    lines.append(f"- background数: {len(manifest.get('backgrounds', {}))}")
    lines.append(f"- ambience audio数: {len(manifest.get('audio', {}).get('ambiences', {}))}")
    lines.append(f"- se audio数: {len(manifest.get('audio', {}).get('se', {}))}")
    lines.append(f"- validation errors: {len(validation_errors)}")
    lines.append(f"- existing main.json semantic match except meta: {comparison['matchesExistingExceptMeta']}")
    lines.append("")
    lines.append("## 5. エラー\n")
    if validation_errors:
        for error in validation_errors:
            lines.append(f"- {error}")
    else:
        lines.append("なし。")
    lines.append("")
    lines.append("## 6. 注意\n")
    lines.append("- v1.9 compilerはsource-level metadataとaudio metadataを扱う。")
    lines.append("- Runtime Engineは引き続き `main.json` のみを読む。")
    lines.append("- Authoring MarkdownをRuntimeで直接読む変更は入れていない。")
    lines.append("- ブラウザ表示・保存読込実動作は未確認。")
    lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", default="content/scenario/SCENARIO_SOURCE.md")
    parser.add_argument("--base", default="content/scenario/main.json")
    parser.add_argument("--manifest", default="content/manifest.json")
    parser.add_argument("--out", default="content/scenario/main.json")
    parser.add_argument("--report", default="content/scenario/COMPILE_REPORT.md")
    parser.add_argument("--check-only", action="store_true")
    args = parser.parse_args()

    root = Path.cwd()
    source = root / args.source
    base = root / args.base
    manifest_path = root / args.manifest
    out = root / args.out
    report = root / args.report

    existing = json.loads(read_text(base))
    existing_manifest = json.loads(read_text(manifest_path))

    compiled, source_metadata = compile_source(source, base)
    updated_manifest = update_manifest(existing_manifest, source_metadata)

    errors = validate_scenario(compiled, updated_manifest)
    comparison = compare_semantic(compiled, existing)

    write_report(report, compiled, updated_manifest, errors, comparison, Path(args.source), Path(args.out))

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    if not args.check_only:
        out.write_text(json.dumps(compiled, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        manifest_path.write_text(json.dumps(updated_manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(json.dumps({
        "ok": True,
        "title": updated_manifest.get("title"),
        "gameId": updated_manifest.get("gameId"),
        "startScene": compiled.get("startScene"),
        "sceneCount": len(compiled.get("scenes", [])),
        "backgroundCount": len(updated_manifest.get("backgrounds", {})),
        "matchesExistingExceptMeta": comparison["matchesExistingExceptMeta"],
        "output": args.out,
    }, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    import argparse
    raise SystemExit(main())
