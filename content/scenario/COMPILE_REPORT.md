# COMPILE_REPORT.md

## 1. 目的

`SCENARIO_SOURCE.md` から `main.json` と `manifest.json` を変換・検査した結果を記録する。

## 2. 変換元

```text
content/scenario/SCENARIO_SOURCE.md
```

## 3. 変換先

```text
content/scenario/main.json
content/manifest.json
```

## 4. 生成結果

- title: 面会札
- gameId: menkai_fuda
- saveKey: menkai_fuda_save_v01
- startScene: opening
- scene数: 39
- background数: 4
- ambience audio数: 0
- se audio数: 0
- validation errors: 0
- existing main.json semantic match except meta: False

## 5. エラー

なし。

## 6. 注意

- v1.9 compilerはsource-level metadataとaudio metadataを扱う。
- Runtime Engineは引き続き `main.json` のみを読む。
- Authoring MarkdownをRuntimeで直接読む変更は入れていない。
- ブラウザ表示・保存読込実動作は未確認。
