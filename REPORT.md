# REPORT.md

## 作成日

2026-05-16

## 実施内容

『返し鈴』シナリオを `scenario.json` 化し、HTML/CSS/JavaScript の最小プレイ版を作成した。

## 作成ファイル

- `index.html`
- `styles/base.css`
- `src/main.js`
- `src/engine/audioManager.js`
- `src/engine/saveLoad.js`
- `src/engine/validator.js`
- `content/manifest.json`
- `content/scenario/main.json`
- `README.md`
- `SPEC.md`
- `DESIGN.md`
- `ARCHITECTURE.md`
- `AGENTS.md`
- `docs/BRANCH_MAP.md`
- `docs/QA_CHECKLIST.md`
- `docs/AUDIO_SOURCES.md`
- `docs/LICENSES.md`

## 確認済み

- 分岐3箇所、各3択をデータ化。
- BAD / NORMAL / TRUE の3エンドをデータ化。
- 声を「」で表記。
- 文書を『』で表記。
- 返鈴覚書は句読点なし。
- 祖母の走り書きは句点のみ、読点なし。
- 第三者音源・画像素材は未同梱。
- Web Audio の仮音を実装。
- CSS 仮背景を実装。

## 未確認

- iPhone Safari 実機表示。
- 音量・音の印象。
- 5分尺に収まるかの実測。
- 各ルートの通読確認。
- ローカルファイル直開き時の `fetch()` 可否。

## 想定

ローカル直開きで動かない場合は、`python -m http.server 8000` で簡易サーバー起動が必要。

## 次アクション

1. ブラウザで起動確認。
2. 3エンド到達確認。
3. iPhone Safari 実機確認。
4. 必要なら本文v0.3へ微修正。


## v0.2 追加実施内容

- シーン背景画 7枚を `assets/bg/` に配置。
- `styles/base.css` を更新し、各背景クラスへ画像を割り当て。
- `content/manifest.json` を v0.2 に更新。

## v0.2 内部確認

### 確認済み
- `assets/bg/` に必要画像 7枚を配置済み。
- CSS の `url()` 参照先と実ファイル名が一致。
- `content/scenario/main.json` の背景IDに対応する CSS クラスを維持。
- zip再生成前に主要ファイルの存在を確認。

### 未確認
- 実ブラウザでの見え方。
- iPhone Safari 実機での表示。
- 背景ごとの可読性（文字ウィンドウとのコントラスト）の実機確認。


## v0.3 追加実施内容

- `『返鈴箱　片桐家』` へ修正。
- `documents` シーンの最初の子どもの声を `「それ、ぼくの」` へ修正。
- `styles/base.css` を更新し、本文ウィンドウを背景画像上のオーバーレイ表示へ変更。
- 背景の見え方を保ちつつ文字可読性を上げるため、本文領域のグラデーションと文字影を調整。

## v0.3 静的確認

- `content/scenario/main.json` のJSON構文OK。
- 声表記 `「」` 維持。
- 文書表記 `『』` 維持。
- CSS更新済み。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v0.4 追加実施内容

- タイトル後に `mother_intro` シーンを追加。
- 母の台詞 `「遙、気を付けて行ってらっしゃい」` により、主人公名の初出を自然化。
- 母との導入シーンは画像を追加せず、CSSの黒画面 `black_plain` を使用。
- `title` シーンの遷移先を `house_intro` から `mother_intro` に変更。

## v0.4 静的確認

- `content/scenario/main.json` のJSON構文OK。
- `mother_intro` の遷移先 `house_intro` は存在。
- 声表記 `「」` 維持。
- 画像ファイルは追加していない。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v0.5 追加実施内容

- `styles/base.css` の `.text-window` を固定高さへ変更。
- `height / min-height / max-height` を `36vh` に統一。
- ページ送り時に文章の始まりの位置が上下しないよう調整。
- 長文ページは本文ウィンドウ内スクロールで読む設計。

## v0.5 静的確認

- CSS更新済み。
- `.text-window` の固定高さ指定を確認。
- JSON構文OK。
- JS構文チェックOK。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v0.6 追加実施内容

- 本文が画面下部に寄りすぎていたため、`.novel-area` の `justify-content` を `flex-start` に変更。
- 本文領域の開始位置を `max(136px, calc(env(safe-area-inset-top) + 100px))` に設定。
- `.text-window` をメニュー下から画面下部までの固定読書領域に変更。
- 背景より本文が主役になるよう、本文領域のグラデーションをやや強めた。

## v0.6 静的確認

- CSS更新済み。
- JSON構文OK。
- JS構文チェックOK。
- 実ブラウザ表示は未確認（チャット環境対象外）。


## v0.7 追加実施内容

- `html/body` を `overflow: hidden` に変更。
- `.stage`, `.novel-area`, `.text-window`, `.choices` をスクロールしない前提に調整。
- `src/main.js` を更新し、長文を自動的に複数ページへ分割する簡易ページネーションを追加。
- これにより、画面スクロールなし・本文スクロールなしでページ送りのみで読む構造へ変更。

## v0.7 静的確認

- CSS更新済み。
- JS構文チェックOK。
- JSON構文OK。
- 実ブラウザ表示は未確認（チャット環境対象外）。


## v0.8 追加実施内容

- `.text-window` を `flex: 1` 化し、選択肢がない場面では本文表示領域を拡大。
- 選択肢表示時のみ `.stage.has-choices` を付与し、本文領域を縮める構造へ変更。
- `paginateText()` のページ分割量を調整し、特に document タイプの1ページ文字量を増加。
- 覚書と祖母の走り書きの空行を整理し、段落間のみ空行を残す形に修正。
- `stage` 全体クリックでページ送り可能に変更。ボタン類クリック時は除外。

## v0.8 静的確認

- CSS更新済み。
- JS構文チェックOK。
- JSON構文OK。
- シーン参照OK。
- 実ブラウザ表示は未確認（チャット環境対象外）。


## v0.9 追加実施内容

- `SPEC.md` をv0.8実装後の現行仕様に更新。
- `DESIGN.md` を現行の読書UI仕様に更新。
- `README.md` を現行操作仕様に更新。
- `ARCHITECTURE.md` にページネーション、全画面タップ、CSS分離方針を反映。
- `AGENTS.md` にエンジン/作品境界ルールを追記。
- `docs/CSS_SPLIT_PLAN.md` を追加。
- `content/manifest.json` に `engineUiPolicy` を追加。
- `content/scenario/main.json` のバージョンを v0.9 に更新。

## v0.9 静的確認

- JSON構文OK。
- JS構文OK。
- シーン参照OK。
- CSS参照OK。
- 主要正本ファイル存在確認済み。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v0.9 境界判定

### エンジン仕様として扱うもの

- 画面スクロール禁止
- 本文ウィンドウ内スクロール禁止
- 画面全体タップでページ送り
- ボタン・選択肢・パネルのページ送り除外
- 長文自動ページ分割
- 選択肢表示時だけ本文領域を調整する仕組み

### 作品固有として扱うもの

- シナリオ本文
- 覚書・走り書きの改行
- 人物名
- 背景画像
- 『返鈴箱　片桐家』等の文言

## v1.0 追加実施内容

- `src/main.js` のページ分割を、従来の文字数推定から推定折り返し行数ベースに変更。
- `document` / `voice` / `text` ごとに `charsPerLine` と `maxLines` を設定。
- `document` は `charsPerLine: 20`, `maxLines: 15` とし、文書が表示枠から溢れないように保守的に分割。
- `styles/base.css` の本文フォントサイズを `clamp(15px, 4.1vw, 16px)` に調整。
- 文書表示は明朝体を維持しつつ、`font-size: inherit` として本文と極端なサイズ差が出ないよう調整。
- 文書表示の行間と字間を詰め、覚書・走り書きの可読性と表示量を改善。

## v1.0 静的確認

- JSON構文OK。
- JS構文チェックOK。
- シーン参照OK。
- CSS参照OK。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v1.1 追加実施内容

- `src/main.js` に文字送り機能を追加。
- `startTypewriter()`, `stopTypewriter()`, `revealCurrentPage()`, `typewriterSpeed()` を追加。
- 画面タップ時の挙動を、文字送り中は全文即時表示、全文表示済みなら次ページ送りに変更。
- 文書表示は `12ms` かつ2文字ずつ進めることで、遅すぎない表示にした。
- `content/manifest.json` に `engineUiPolicy.typewriter` を追加。
- `SPEC.md`, `DESIGN.md`, `ARCHITECTURE.md`, `README.md` に文字送り仕様を反映。

## v1.1 静的確認

- JSON構文OK。
- JS構文チェックOK。
- シーン参照OK。
- CSS参照OK。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v1.2 追加実施内容

- `src/main.js` のページ分割を厳密化。
- `wrapParagraph()` が20字前後を超える単位を1行扱いしていた問題を修正。
- `wrapLineStrict()`, `hardSplitByLength()` を追加。
- `paginationConfig()` を実機寄りに保守化。
  - document: 18字 / 最大12行
  - voice: 20字 / 最大7行
  - text: 20字 / 最大10行
- `styles/base.css` の `100dvh` を `100svh` へ置換し、iPhone Safari下部UIに本文が隠れにくい方向へ調整。
- 文書表示の行間・字間を再調整。
- 保存データに `currentStepLoggedKey` を含め、読込後のバックログ重複を軽減。
- `logStepOnce()` にバックログ末尾との重複チェックを追加。
- `manifest` にv1.2のページ分割・viewport・保存仕様を追記。

## v1.2 静的確認

- JSON構文OK。
- JS構文チェックOK。
- シーン参照OK。
- CSS参照OK。
- 主要ロジックマーカー確認済み。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v1.3 追加実施内容

- `content/scenario/main.json` の写真裏文書を `『志乃と惣太　社の前にて』` へ修正。
- `src/main.js` の改行処理を `wrapLineKinsoku()` へ変更。
- `isNoLineStartChar()`, `mergePunctuationOnlyLines()`, `isPunctuationOnly()` を追加。
- 句点・読点・閉じ括弧類が行頭に来ないようにした。
- 句読点だけの行が発生した場合は前行へ結合する。
- `content/manifest.json` に `kinsoku` 方針を追加。
- `styles/base.css` に補助的な `line-break: strict` / `word-break: keep-all` を追加。

## v1.3 静的確認

- JSON構文OK。
- JS構文チェックOK。
- シーン参照OK。
- CSS参照OK。
- 写真裏文書の1行化確認済み。
- 禁則処理の疑似検査OK。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v1.4 追加実施内容

- `src/main.js` を更新し、Text Layout Engine相当の処理を追加。
- `preparePagesForStep()` を追加し、`pages` 指定・`[p]` 指定・自動ページ分割を統合。
- `[r]` を改行、`[p]` を改ページとして処理。
- `paginationConfig()` を `manifest.engineUiPolicy.paginationProfile` 参照へ変更。
- `typewriterSpeed()` を `manifest.engineUiPolicy.typewriter.speedsMsPerChar` 参照へ変更。
- バックログを文字列配列から `kind/text/sceneId/stepIndex` を持つ構造へ変更。
- `formatBacklog()` を追加。
- `docs/TEXT_GUIDE.md` を追加。
- 正本系ファイルへv1.4仕様を反映。

## v1.4 静的確認

- JSON構文OK。
- JS構文チェックOK。
- シーン参照OK。
- CSS参照OK。
- 分岐総当たりOK。
- Text Layout Engine関連マーカー確認済み。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v1.5 追加実施内容

- シナリオ積み替えに向けた Authoring System を導入。
- `content/scenario/STORY_BIBLE.md` を追加。
- `content/scenario/SCENARIO_SOURCE.md` を既存 `main.json` から生成。
- `content/scenario/COMPILE_REPORT.md` を追加。
- `docs/AI_SCENARIO_RULES.md` を追加。
- `docs/HUMAN_MANUAL.md` を追加。
- `docs/SCENARIO_REVIEW_CHECKLIST.md` を追加。
- `manifest.authoringSystem` を追加。
- `SPEC.md`, `ARCHITECTURE.md`, `DESIGN.md`, `AGENTS.md`, `README.md` にv1.5仕様を反映。

## v1.5 静的確認

- JSON構文OK。
- JS構文チェックOK。
- シーン参照OK。
- 分岐総当たりOK。
- 新規Authoringファイル存在確認OK。
- Runtime EngineがMarkdownを直接読む変更は入れていない。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v1.6 追加実施内容

- `content/manifest.json` に `gameId`, `title`, `saveKey`, `contentPack`, `backgrounds` を追加。
- `src/main.js` の背景ID固定リストを削除。
- `setBackground()` を `manifest.backgrounds` 参照へ変更。
- `SaveLoad` の保存キーを `manifest.saveKey` 参照へ変更。
- `document.title` を `manifest.title` で更新する処理を追加。
- `styles/engine.css` と `styles/theme.css` を追加。
- `index.html` に `engine.css`, `theme.css`, `base.css` の読み込みを追加。
- 正本系ファイルへv1.6仕様を反映。

## v1.6 静的確認

- JSON構文OK。
- JS構文チェックOK。
- シーン参照OK。
- 分岐総当たりOK。
- CSS参照OK。
- manifest.backgrounds とシナリオ背景IDの対応OK。
- Runtime JSに背景ID固定リストが残っていないことを確認。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v1.6-docfix 実施内容

- README.md冒頭の `v0.9` 表記を `v1.6-docfix` へ修正。
- README.mdに現在版サマリーを追加。
- AGENTS.mdにv1.6-docfixのRuntime / Authoring / CSS分離ルールを追記。
- COMPILE_REPORT.mdをv1.6-docfix時点の状態へ更新。
- docs/CSS_SPLIT_PLAN.mdを現在仕様へ全面更新。
- SPEC.md / ARCHITECTURE.mdに、履歴追記型ファイルであることと現在仕様の優先情報を追記。
- `src/main.js` の `kaeshisuzu_save_v01` 初期フォールバックを削除し、`saveLoad = null` からmanifest読込後に初期化する形へ変更。
- 保存 / 読込ボタンで `ensureSaveLoad()` を使うように修正。
- `manifest.version` と `scenario.meta.version` を `v1.6-docfix` へ更新。

## v1.6-docfix 静的確認

- JSON構文OK。
- JS構文チェックOK。
- シーン参照OK。
- 分岐総当たりOK。
- CSS参照OK。
- Runtime JS内に `kaeshisuzu_save_v01` が残っていないことを確認。
- README / AGENTS / COMPILE_REPORT / CSS_SPLIT_PLAN の更新確認済み。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v1.7 実施内容

- `tools/compile_scenario.py` を追加。
- compilerで `SCENARIO_SOURCE.md` を解析し、`main.json` を生成可能にした。
- compilerは固定Markdown記法のみを対象とし、自由Markdownは対象外。
- `[text se=bell_far]` のようなタグ属性に対応。
- 既存 `SCENARIO_SOURCE.md` に `se` 情報を明示した。
- `content/scenario/SCENARIO_SCHEMA.json` を追加。
- `src/engine/validator.js` を強化。
- `content/scenario/COMPILE_REPORT.md` をcompiler実行結果へ更新。
- `manifest.authoringSystem.compilerImplemented` を true にした。

## v1.7 静的確認

- compiler check-only OK。
- compiler実行OK。
- 生成後 `main.json` JSON構文OK。
- JS構文チェックOK。
- シーン参照OK。
- 分岐総当たりOK。
- Runtime JSがAuthoring Markdownを直接読まないことを確認。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v1.8 実施内容

- `SCENARIO_SOURCE.md` 先頭に `# content-pack` と `# backgrounds` を追加。
- `tools/compile_scenario.py` をmetadata対応版へ更新。
- compilerが `main.json` に加えて `manifest.json` も同期するようにした。
- `startScene` をsource metadataから設定できるようにした。
- 別Content Packで開始シーンIDを `title` に固定しなくてよい構造にした。
- `SCENARIO_SCHEMA.json` をv1.8向けに更新。
- 正本系ファイルへv1.8仕様を反映。

## v1.8 静的確認

- compiler check-only OK。
- compiler実行OK。
- Python compiler構文OK。
- JSON構文OK。
- JS構文チェックOK。
- シーン参照OK。
- manifest.backgrounds対応OK。
- 分岐総当たりOK。
- 実ブラウザ表示は未確認（チャット環境対象外）。

## v1.9 実施内容

- `sound_novel_starter_v19` として成果物名を変更。
- `src/engine/audioManager.js` を更新し、`manifest.audio` の音声ファイルを扱えるようにした。
- `src/main.js` で `audio.configure(manifest.audio)` を呼ぶようにした。
- `tools/compile_scenario.py` を更新し、`# audio` metadataをmanifestへ同期するようにした。
- シナリオCを作成し、ダミー背景PNGとダミーWAV音声を同梱して積み替え検証した。
- 画像・音声の参照整合、ファイル存在、分岐、compiler実行を静的に確認した。

## v1.9 未確認

- 実ブラウザでの画像表示
- 実ブラウザでの音声再生
- iPhone Safariでの音声再生挙動

## v20 実施内容

- condition-based endingCheckをRuntimeへ追加。
- legacy score fallbackは互換維持のため残した。
- validatorを拡張し、endingCheck.rules / condition block / requires / assumes / conditionalText を検査対象にした。
- compilerに `[endingCheck]` の簡易ルール記法を追加した。
- `tools/check_story_logic.py` を追加した。
- 『返し鈴』本文の直接修正は行っていない。

## v20 確認済み

- Python構文チェックOK。
- JS構文チェックOK。
- compiler check-only OK。
- runtime validator import構文OK。
- story logic checker実行OK。
- 既存Content Packはlegacy fallbackで互換維持。

## v20 未確認

- 実ブラウザ表示。
- iPhone Safari実機確認。
- condition-based endingを使った新規本番シナリオの実機確認。

## v21 実施内容

- 最大30分程度の作品を想定範囲として明文化。
- conditionalTextのRuntime対応を追加。
- scene訪問回数 `state.visited[sceneId]` の自動加算を追加。
- route guardを追加し、異常な無限ループ候補を停止できるようにした。
- `tools/check_route_graph.py` を追加。
- 到達不能scene、endingに到達しない経路、合流点、loop候補、推定読了時間を検査可能にした。
- 『返し鈴』本文の直接修正は行っていない。

## v21 未確認

- 実ブラウザ表示。
- iPhone Safari実機確認。
- conditionalTextを使った本番シナリオの実機確認。
