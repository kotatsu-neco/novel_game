# ARCHITECTURE.md

## 1. 構成

```text
index.html
styles/base.css
src/main.js
src/engine/audioManager.js
src/engine/saveLoad.js
src/engine/validator.js
content/manifest.json
content/scenario/main.json
assets/bg/
```

## 2. データフロー

1. `index.html` が `src/main.js` を読み込む。
2. `main.js` が `content/scenario/main.json` を取得する。
3. `validator.js` がシーンID・分岐参照を検証する。
4. シーンとステップを順に表示する。
5. `text` / `document` / `voice` / `title` はページ分割対象になる。
6. 画面全体タップでページ送りする。
7. 選択肢で `score` と状態変数を更新する。
8. `endingCheck` でエンディングを判定する。

## 3. 状態変数

- `score`
- `bell_handling`
- `ema_action`
- `voice_action`
- `ending`

## 4. UIエンジン構造

### 4.1 画面固定

`html`, `body`, `.app`, `.stage` はスクロールしない。  
ノベルゲームとして画面を固定し、ページ送りで読む。

### 4.2 ページネーション

`src/main.js` の `paginateText()` が、本文・文書・声を表示種別ごとに分割する。

v0.9時点の目安値:

```text
document: 180
voice: 88
text: 150
```

将来的には、この値を `manifest` またはテーマ設定に移す。

### 4.3 全画面タップ

`stageEl.addEventListener("click", handleAdvanceAreaClick)` により、画面全体をページ送り範囲として扱う。  
ただし、ボタン・選択肢・パネル内クリックはページ送りから除外する。

### 4.4 選択肢表示

選択肢表示時には `.stage.has-choices` を付与し、本文領域と選択肢領域の配分を切り替える。

## 5. 保存

`localStorage` に現在シーン、ステップ、ページ位置、状態、バックログを保存する。

## 6. 音

v0.9では外部音源ファイルを使わず、Web Audio で雨音風ノイズと鈴風の仮音を生成する。

## 7. CSS分離方針

v0.9では `styles/base.css` にエンジンUIとテーマが混在している。  
将来的には以下へ分離する。

```text
styles/engine.css
styles/theme.css
```

### 7.1 engine.css

- 固定画面
- セーフエリア対応
- スクロール禁止
- 本文領域
- 選択肢領域
- 全画面タップ前提の構造
- パネル
- トースト
- 非表示クラス

### 7.2 theme.css

- 色
- 背景画像
- 文字影
- 暗さ
- グラデーション
- 角丸
- 作品固有の視覚演出

## 8. 未使用プレースホルダー

以下はv0.9時点では実処理を持たない。

```text
src/engine/sceneRunner.js
src/engine/stateStore.js
src/ui/textWindow.js
src/ui/choicePanel.js
```

将来、`src/main.js` が肥大化する場合は、これらへ分離する。


## v1.0 line-based pagination note

v1.0では、ページ分割を単純な文字数ではなく、推定折り返し行数ベースで行う。  
これは、iPhone実機で文書表示が枠内に収まらない問題を受けた修正である。

現行目安:

```text
document: charsPerLine 20 / maxLines 15
voice: charsPerLine 22 / maxLines 8
text: charsPerLine 21 / maxLines 12
```

この値は将来的にmanifestまたはUI設定へ移す候補である。

## v1.1 typewriter architecture

`src/main.js` に文字送り制御を追加した。

主要関数:

```text
startTypewriter(text, type)
stopTypewriter()
revealCurrentPage()
typewriterSpeed(type)
```

`nextStep()` は、文字送り中なら全文表示、全文表示済みなら次ページへ進む。

## v1.2 strict pagination note

v1.2では、ページ分割の過小見積もりを防ぐため、句点単位のかたまりが1行上限を超える場合でも必ず分割する。  
また、iPhone Safariで下部UIに本文が隠れるリスクを下げるため、固定画面の高さ指定は `100svh` 寄りに調整する。

現行目安:

```text
document: charsPerLine 18 / maxLines 12
voice: charsPerLine 20 / maxLines 7
text: charsPerLine 20 / maxLines 10
```

この値は、読めないことを避けるため安全側に倒した暫定値である。

## v1.3 Japanese kinsoku note

v1.3では、日本語表示で句点・読点・閉じ括弧だけが行頭または単独行に送られる問題を避けるため、簡易禁則処理を追加する。

対象例:

```text
、 。 」 』 ）
```

方針:

- 行頭禁則文字は前行へ結合する。
- 句読点だけの行は前行へ結合する。
- 多少1行の文字数が増えても、句読点だけが送られるより可読性を優先する。

## v1.4 Text Layout Architecture

`src/main.js` に Text Layout Engine 相当の処理を追加した。

主要処理:

```text
preparePagesForStep()
splitByManualPageBreak()
normalizeInlineCommands()
paginateText()
wrapLineKinsoku()
formatBacklog()
```

`manifest.engineUiPolicy.paginationProfile` と `manifest.engineUiPolicy.typewriter.speedsMsPerChar` を参照する。

## v1.5 Authoring Architecture

v1.5では、実行エンジンと制作支援を分離する。

```text
Authoring System:
  STORY_BIBLE.md
  SCENARIO_SOURCE.md
  AI_SCENARIO_RULES.md
  HUMAN_MANUAL.md
  SCENARIO_REVIEW_CHECKLIST.md

Future Compiler / Validator:
  SCENARIO_SOURCE.md -> main.json
  COMPILE_REPORT.md

Runtime Engine:
  manifest.json
  main.json
  assets
  styles
```

Runtime EngineはMarkdown原稿を直接読まない。

## v1.6 Content Pack Architecture

v1.6では、Runtime Engineから作品固有情報を切り離し始める。

```text
content/manifest.json
  gameId
  title
  saveKey
  backgrounds
  contentPack

content/scenario/main.json
  runtime scenario

styles/engine.css
  future engine layout css

styles/theme.css
  future content pack theme css

styles/base.css
  compatibility css retained in v1.6
```

### 背景解決

`setBackground()` は固定背景IDリストを持たず、`manifest.backgrounds` を参照する。

### 保存キー

`SaveLoad` は `manifest.saveKey` を使う。  
別作品へ積み替えても保存データが衝突しにくい。

## v1.6-docfix Current Architecture Note

このファイルは履歴追記型で運用されている。  
現在アーキテクチャの基準は以下。

```text
Runtime Engine:
  index.html
  src/main.js
  src/engine/
  styles/engine.css
  styles/theme.css
  styles/base.css

Content Pack:
  content/manifest.json
  content/scenario/main.json
  assets/bg/

Authoring System:
  content/scenario/STORY_BIBLE.md
  content/scenario/SCENARIO_SOURCE.md
  content/scenario/COMPILE_REPORT.md
  docs/AI_SCENARIO_RULES.md
  docs/HUMAN_MANUAL.md
  docs/SCENARIO_REVIEW_CHECKLIST.md
```

Runtime EngineはAuthoring Markdownを直接読まない。  
将来的にはCurrent ArchitectureとHistoryを分離する。

## v1.7 Compiler Architecture

v1.7では Authoring System にcompilerを追加する。

```text
SCENARIO_SOURCE.md
  ↓ tools/compile_scenario.py
main.json
  ↓ Runtime Engine
game
```

### compilerの役割

- `SCENARIO_SOURCE.md` を解析する
- `main.json` を生成する
- scene ID重複・next参照・表記ルールを検査する
- `COMPILE_REPORT.md` を出力する

Runtime Engineはcompilerを呼び出さない。

## v1.8 Metadata-aware Compiler Architecture

v1.8では compiler が `SCENARIO_SOURCE.md` の source-level metadata を読み取り、`main.json` と `manifest.json` の両方を同期する。

```text
SCENARIO_SOURCE.md
  ├─ # content-pack
  ├─ # backgrounds
  └─ # scene: ...

tools/compile_scenario.py
  ├─ main.json
  └─ manifest.json
```

これにより、別Content Packで開始シーンIDを自由に変えられる。

## v1.9 Asset-aware Content Pack Architecture

v1.9では、Content Packに画像・音声ファイルを含める検証を行う。

```text
assets/bg/
  scenario_c_room.png
  scenario_c_gate.png

assets/audio/
  scenario_c_loop.wav
  scenario_c_chime.wav
```

compilerは `SCENARIO_SOURCE.md` の `# backgrounds` と `# audio` から `manifest.json` を同期する。
Runtime Audio Engineは `manifest.audio` を参照する。

## v20 State Consistency Architecture

```text
choice.set
  ↓
runtime state
  ↓
endingCheck.rules
  ↓
ending scene
```

v20では、scoreに加えてstate条件をendingCheckで評価できる。

追加要素:

```text
src/main.js
  evaluateCondition()
  getStateValue()
  condition-based decideEnding()

src/engine/validator.js
  condition block validation
  endingCheck.rules validation
  requires / assumes validation

tools/check_story_logic.py
  authoring-time story consistency checker
```

Runtimeは引き続きAuthoring Markdownを直接読まない。

## v21 Route Architecture

v21の基本構造:

```text
choice.set
  ↓
state
  ↓
conditionalText / endingCheck.rules
  ↓
route graph checker
```

追加コンポーネント:

```text
src/main.js
  - conditionalText rendering
  - state.visited auto increment
  - route guard

tools/check_route_graph.py
  - graph construction
  - unreachable scene detection
  - merge point detection
  - loop candidate detection
  - estimated reading time
```

v21は最大30分程度の作品を対象にする。大規模ノベルエンジン化はしない。
