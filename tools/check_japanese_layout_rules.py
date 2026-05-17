#!/usr/bin/env python3
"""Static checks for Japanese kinsoku/page-split rule fixtures and scenario text.

This checker intentionally does not require a browser. It verifies rule tables,
manual tag usage, and obvious bad page starts/ends in scenario text.
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

NO_LINE_START = set("、。，．,.！？!?」』）】〕〉》ぁぃぅぇぉゃゅょっァィゥェォャュョッヵヶーゝゞヽヾ々…")
NO_LINE_END = set("「『（【〔〈《")
PUNCT_ONLY = NO_LINE_START


def is_punctuation_only(text: str) -> bool:
    stripped = text.strip()
    return bool(stripped) and all(ch in PUNCT_ONLY for ch in stripped)


def is_ellipsis_fragment(text: str) -> bool:
    stripped = text.strip()
    if not stripped:
        return False
    if stripped == "…":
        return True
    if re.fullmatch(r"…+", stripped) and len(stripped) % 2 == 1:
        return True
    return False


def starts_with_ellipsis_fragment(text: str) -> bool:
    stripped = text.lstrip()
    return bool(stripped) and stripped.startswith("…") and not stripped.startswith("……")


def ends_with_odd_ellipsis(text: str) -> bool:
    stripped = text.rstrip()
    match = re.search(r"…+$", stripped)
    return bool(match) and len(match.group(0)) % 2 == 1


def bad_page_start(text: str) -> bool:
    stripped = text.lstrip()
    if not stripped:
        return False
    if stripped.startswith("……"):
        return False
    return stripped[0] in NO_LINE_START


def bad_page_end(text: str) -> bool:
    stripped = text.rstrip()
    return bool(stripped) and stripped[-1] in NO_LINE_END


def normalize(text: str) -> str:
    return text.replace("[r]", "\n")


def split_manual_pages(text: str) -> list[str]:
    return [normalize(part) for part in text.split("[p]")]


def check_text(text: str, context: str) -> list[str]:
    errors: list[str] = []
    pages = split_manual_pages(text)
    for idx, page in enumerate(pages):
        if bad_page_start(page):
            errors.append(f"{context}: manual page {idx} starts with prohibited character: {page[:20]!r}")
        if bad_page_end(page):
            errors.append(f"{context}: manual page {idx} ends with opening bracket: {page[-20:]!r}")
        if is_punctuation_only(page):
            errors.append(f"{context}: manual page {idx} is punctuation only")
        if is_ellipsis_fragment(page) or starts_with_ellipsis_fragment(page):
            errors.append(f"{context}: manual page {idx} has isolated ellipsis fragment")
        if ends_with_odd_ellipsis(page):
            errors.append(f"{context}: manual page {idx} ends with odd ellipsis")
        for line_no, line in enumerate(page.splitlines(), start=1):
            if bad_page_start(line):
                errors.append(f"{context}: line {line_no} starts with prohibited character: {line[:20]!r}")
            if bad_page_end(line):
                errors.append(f"{context}: line {line_no} ends with opening bracket: {line[-20:]!r}")
            if is_punctuation_only(line):
                errors.append(f"{context}: line {line_no} is punctuation only")
            if is_ellipsis_fragment(line) or starts_with_ellipsis_fragment(line):
                errors.append(f"{context}: line {line_no} has isolated ellipsis fragment")
            if ends_with_odd_ellipsis(line):
                errors.append(f"{context}: line {line_no} ends with odd ellipsis")
    return errors


def iter_scenario_texts(scenario: dict):
    for scene in scenario.get("scenes", []):
        scene_id = scene.get("id", "<unknown>")
        for step_index, step in enumerate(scene.get("steps", [])):
            step_type = step.get("type")
            if step_type not in {"text", "voice", "document", "conditionalText"}:
                continue
            if isinstance(step.get("text"), str):
                yield f"{scene_id}[{step_index}].text", step["text"]
            for page_index, page in enumerate(step.get("pages") or []):
                if isinstance(page, str):
                    yield f"{scene_id}[{step_index}].pages[{page_index}]", page
            for case_index, case in enumerate(step.get("cases") or []):
                if isinstance(case.get("text"), str):
                    yield f"{scene_id}[{step_index}].cases[{case_index}].text", case["text"]
                for page_index, page in enumerate(case.get("pages") or []):
                    if isinstance(page, str):
                        yield f"{scene_id}[{step_index}].cases[{case_index}].pages[{page_index}]", page


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--scenario", default="content/scenario/main.json")
    parser.add_argument("--fixtures", default="tests/japanese_layout_cases.json")
    args = parser.parse_args()

    errors: list[str] = []
    warnings: list[str] = []

    fixture_path = Path(args.fixtures)
    if fixture_path.exists():
        data = json.loads(fixture_path.read_text(encoding="utf-8"))
        for item in data.get("cases", []):
            errors.extend(check_text(str(item.get("text", "")), f"fixture:{item.get('id')}"))
    else:
        warnings.append(f"fixture file not found: {fixture_path}")

    scenario_path = Path(args.scenario)
    if scenario_path.exists():
        scenario = json.loads(scenario_path.read_text(encoding="utf-8"))
        for context, text in iter_scenario_texts(scenario):
            errors.extend(check_text(text, context))
    else:
        warnings.append(f"scenario file not found: {scenario_path}")

    result = {
        "ok": not errors,
        "errors": errors,
        "warnings": warnings,
        "ruleSummary": {
            "noLineStartCount": len(NO_LINE_START),
            "noLineEndCount": len(NO_LINE_END)
        }
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if not errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
