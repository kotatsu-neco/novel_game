# PATCH_NOTE_v20.md

## 変更内容

1. Runtimeにcondition-based endingCheckを追加。
2. `evaluateCondition()` と `getStateValue()` を追加。
3. legacy score fallbackは互換維持として残した。
4. validatorにcondition block検査を追加。
5. sceneの `requires` / `assumes` を検査対象に追加。
6. `conditionalText` stepの構造検査を追加。
7. compilerに `[endingCheck]` 簡易ルール記法を追加。
8. `tools/check_story_logic.py` を追加。
9. シナリオ本文の直接修正は行っていない。

## 目的

今後のシナリオで、分岐後の事実状態とエンディング条件が噛み合わない問題を防ぐ。

## 確認済み

- Python構文OK
- JS構文OK
- compiler check-only OK
- story logic checker実行OK

## 未確認

- 実ブラウザ確認
- iPhone Safari確認
- 新規本番シナリオでのcondition rules実運用
