# PATCH_NOTE_v02a.md

## 修正内容

- 三点リーダー「……」の禁則処理を強化。
- `…` 単独や奇数個の三点リーダーがページ頭・ページ末に孤立しないように判定を追加。
- `japanese_layout_cases.json` に三点リーダー関連ケースを追加。
- `check_japanese_layout_rules.py` に三点リーダー静的検査を追加。
- `textPaginator.js` に病的な測定結果でも分割位置が0にならない安全ガードを追加。
- v22b時代の旧検査文書を `docs/archive_pre_v02a/` へ退避。
- 文書上の旧バージョン名を `sn_engine_v02a` / `sn_author_kit_v02a` に整理。

## 未確認

- 実ブラウザでのDOM測定結果
- iPhone Safari表示
- Android Chrome表示
- 文字サイズ「大」での全ページ表示

## v02a追加修正

- 「……」で始まる自然な文は許容し、単独の「…」や奇数個の三点リーダー断片のみを禁則対象に修正。
- DOM測定モジュールで `clientHeight` を明示的に利用。
- author kitから旧検査報告書を除去し、完成済みシナリオ名の混入を避けた。
