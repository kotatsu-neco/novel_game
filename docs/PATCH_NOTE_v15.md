# PATCH_NOTE_v15.md

## 変更内容

1. Authoring System仕様を導入。
2. `STORY_BIBLE.md` を追加。
3. `SCENARIO_SOURCE.md` を既存main.jsonから生成。
4. `AI_SCENARIO_RULES.md` を追加。
5. `HUMAN_MANUAL.md` を追加。
6. `SCENARIO_REVIEW_CHECKLIST.md` を追加。
7. `COMPILE_REPORT.md` を追加。
8. 既存正本ファイルへv1.5仕様を反映。
9. `manifest.authoringSystem` を追加。

## 重要な設計判断

- Runtime Engineは引き続き `main.json` のみを読む。
- Markdown原稿は実行時に直接読まない。
- v1.5では自動コンパイラは未実装。
- AI編集はstatusと権限順位で制御する。

## 確認済み

- JSON構文OK
- JS構文チェックOK
- シーン参照OK
- 分岐総当たりOK
- 新規Authoringファイル存在確認OK

## 未確認

- SCENARIO_SOURCE.mdを人間が読んだ時の扱いやすさ
- 将来コンパイラでの変換実装
