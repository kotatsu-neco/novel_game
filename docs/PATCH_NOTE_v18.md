# PATCH_NOTE_v18.md

## 変更内容

1. `SCENARIO_SOURCE.md` に source-level metadata を追加。
2. compilerをmetadata対応に更新。
3. `startScene` をsource側から設定可能にした。
4. `title`, `gameId`, `saveKey` をsource側からmanifestへ同期可能にした。
5. `backgrounds` をsource側からmanifestへ同期可能にした。
6. `SCENARIO_SCHEMA.json` をv1.8向けに更新。
7. 正本系ファイルへv1.8仕様を反映。

## 実行コマンド

```bash
python tools/compile_scenario.py --check-only
python tools/compile_scenario.py
```

## 確認済み

- compiler check-only OK
- compiler実行OK
- main.json / manifest.json 同期OK
- startScene metadata反映OK
- 背景metadata反映OK

## 未確認

- 実ブラウザ表示
- iPhone Safari実機表示
- 保存 / 読込の実動作
