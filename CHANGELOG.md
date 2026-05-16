# CHANGELOG.md

## v0.1

- シナリオをJSON化。
- HTML/JS/CSSの最小プレイ版を作成。
- Web Audio仮音を追加。
- CSS仮背景を追加。
- 正本系ファイルを作成。


## v0.2

- 背景画像 7枚を追加。
- CSS でシーン背景へ画像を割り当て。
- manifest を更新。


## v0.3

- 仏間の箱ラベルを1行表記へ修正。
- 冒頭の子どもの声を修正。
- メッセージウィンドウを背景一体型のオーバーレイ表示へ調整。

## v0.4

- `mother_intro` シーンを追加。
- タイトル後に母との短い導入を挿入。
- 主人公名「遙」の初出を自然化。
- `black_plain` 背景をCSSのみで追加。画像素材は追加していない。

## v0.5

- 本文ウィンドウを固定高さに変更。
- ページごとの文章量による本文開始位置のズレを抑制。

## v0.6

- 本文領域の下寄せを廃止。
- `.novel-area` を上寄せに変更。
- `.text-window` をメニュー下から画面下部までの固定読書領域に変更。


## v0.7

- 画面スクロールを禁止。
- 本文ウィンドウ内スクロールを禁止。
- 長文自動ページ分割を実装。


## v0.8

- 非選択肢時の本文領域を拡大。
- 覚書と祖母の走り書きの改行整理。
- 画面全体タップでページ送り可能に変更。


## v0.9

- SPEC.md を現行UI仕様へ更新。
- DESIGN.md を現行UI仕様へ更新。
- README.md を現行操作仕様へ更新。
- ARCHITECTURE.md にページ分割・全画面タップ・CSS分離方針を追記。
- docs/CSS_SPLIT_PLAN.md を追加。
- manifest に engineUiPolicy を追加。

## v1.0

- ページ分割を推定行数ベースに変更。
- 文書表示のフォントサイズ・行間・字間を調整。
- 通常本文の折り返し改善のため、フォントサイズを調整。

## v1.1

- 文字送り機能を追加。
- タップ1回目で全文表示、全文表示後のタップで次ページへ進む挙動を追加。
- `manifest` に `engineUiPolicy.typewriter` を追加。

## v1.2

- ページ分割ロジックの過小見積もりを修正。
- `wrapLineStrict()` と `hardSplitByLength()` を追加。
- `document / voice / text` のページ分割値を保守化。
- モバイルSafari対策として `100dvh` を `100svh` へ置換。
- バックログ重複対策を追加。

## v1.3

- 写真裏の文書を `『志乃と惣太　社の前にて』` へ修正。
- 日本語禁則処理を追加。
- 行頭に句点・読点・閉じ括弧が来る問題を抑制。

## v1.4

- Text Layout Engine仕様を追加。
- `pages` による手動ページ指定に対応。
- `[r]` 改行、`[p]` 改ページに対応。
- 文字送り速度とページ分割値をmanifest参照に変更。
- バックログをkind付き構造に変更。
- `docs/TEXT_GUIDE.md` を追加。

## v1.5

- Authoring System仕様を追加。
- `STORY_BIBLE.md` を追加。
- `SCENARIO_SOURCE.md` を追加。
- `COMPILE_REPORT.md` を追加。
- `docs/AI_SCENARIO_RULES.md` を追加。
- `docs/HUMAN_MANUAL.md` を追加。
- `docs/SCENARIO_REVIEW_CHECKLIST.md` を追加。
- `manifest.authoringSystem` を追加。

## v1.6

- Content Pack準備を追加。
- `manifest.gameId`, `manifest.title`, `manifest.saveKey`, `manifest.backgrounds` を追加。
- Runtime Engineの背景ID固定リストを解除。
- 保存キーをmanifest参照へ変更。
- `styles/engine.css` と `styles/theme.css` を追加。
- `index.html` にengine/theme CSSの読み込みを追加。

## v1.6-docfix

- README.md冒頭の版表記を修正。
- AGENTS.mdにv1.6構成の変更可能範囲を追記。
- COMPILE_REPORT.mdをv1.6-docfix現状へ更新。
- CSS_SPLIT_PLAN.mdから旧ページ分割値を削除し、manifest管理へ更新。
- SPEC.md / ARCHITECTURE.mdにCurrent仕様注意を追記。
- `src/main.js` の保存キー初期フォールバックを汎用化。

## v1.7

- `tools/compile_scenario.py` を追加。
- `SCENARIO_SOURCE.md` から `main.json` を生成可能にした。
- `[text se=...]` タグ属性に対応。
- `content/scenario/SCENARIO_SCHEMA.json` を追加。
- `src/engine/validator.js` を強化。
- `COMPILE_REPORT.md` をcompiler実行結果で更新。

## v1.8

- `SCENARIO_SOURCE.md` に source-level metadata を追加。
- compilerが `title`, `gameId`, `saveKey`, `startScene`, `backgrounds` を読み取れるようにした。
- compilerが `manifest.json` と `main.json` を同期するようにした。
- `SCENARIO_SCHEMA.json` をv1.8 metadata向けに更新。
