# PATCH_NOTE_v17.md

## 変更内容

1. `tools/compile_scenario.py` を追加。
2. `SCENARIO_SOURCE.md` から `main.json` を生成可能にした。
3. `[text se=...]` 形式に対応。
4. `SCENARIO_SOURCE.md` に効果音属性を明示。
5. `SCENARIO_SCHEMA.json` を追加。
6. `src/engine/validator.js` を強化。
7. `COMPILE_REPORT.md` をcompiler実行結果へ更新。
8. 正本系ファイルへv1.7仕様を反映。

## 実行コマンド

```bash
python tools/compile_scenario.py --check-only
python tools/compile_scenario.py
```

## 確認済み

- compiler check-only OK
- compiler実行OK
- JSON構文OK
- JS構文チェックOK
- シーン参照OK
- 分岐総当たりOK

## 未確認

- 実ブラウザ表示
- iPhone Safari実機表示
- compilerを使った別作品Content Pack変換
