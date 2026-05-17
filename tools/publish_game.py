#!/usr/bin/env python3
"""Create a lightweight publish zip containing only game runtime files."""
from __future__ import annotations
import argparse
import zipfile
from pathlib import Path

INCLUDE_DIRS = ["src", "styles", "content", "assets"]
INCLUDE_FILES = ["index.html", "README_MENKAI_PREVIEW.md"]
EXCLUDE_NAMES = {"STORY_BIBLE.md", "SCENARIO_SOURCE.md"}
EXCLUDE_PREFIXES = ["docs/", "tools/"]
EXCLUDE_SUFFIXES = [".pyc", ".pyo", ".zip"]

def should_include(path: Path, root: Path) -> bool:
    rel = path.relative_to(root).as_posix()
    if path.is_dir():
        return False
    if "__pycache__" in rel or ".DS_Store" in rel or "__MACOSX" in rel:
        return False
    if path.name in EXCLUDE_NAMES:
        return False
    if any(rel.startswith(prefix) for prefix in EXCLUDE_PREFIXES):
        return False
    if any(rel.endswith(suffix) for suffix in EXCLUDE_SUFFIXES):
        return False
    if rel in INCLUDE_FILES:
        return True
    return any(rel.startswith(f"{dirname}/") for dirname in INCLUDE_DIRS)

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".", help="project root")
    parser.add_argument("--out", default="dist/game_publish.zip", help="output zip")
    args = parser.parse_args()
    root = Path(args.root).resolve()
    out = Path(args.out)
    if not out.is_absolute():
        out = root / out
    out.parent.mkdir(parents=True, exist_ok=True)
    if not (root / "index.html").exists():
        raise SystemExit("index.html not found")
    if not (root / "content/manifest.json").exists():
        raise SystemExit("content/manifest.json not found")
    if not (root / "content/scenario/main.json").exists():
        raise SystemExit("content/scenario/main.json not found")
    files = [p for p in sorted(root.rglob("*")) if should_include(p, root)]
    if out.exists():
        out.unlink()
    with zipfile.ZipFile(out, "w", compression=zipfile.ZIP_DEFLATED) as z:
        for path in files:
            z.write(path, path.relative_to(root))
    print(f"created: {out}")
    print(f"files: {len(files)}")
    print(f"size: {out.stat().st_size}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
