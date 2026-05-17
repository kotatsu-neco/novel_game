# SPEC.md

## 1. 目的

『返し鈴』は、現代の一晩に焦点を当てた短編和風ホラー・サウンドノベルである。  
本ファイルは、作品固有仕様と、現時点で作品に同梱されている最小ノベルゲームエンジン仕様を合わせて記述する正本仕様書である。

## 2. 対象範囲

v0.9時点の対象範囲は以下。

- 短編シナリオ再生
- 本文表示
- 文書表示
- 声表示
- 選択肢表示
- 3分岐・各3択
- BAD / NORMAL / TRUE の3エンド
- スコア式エンディング判定
- 背景画像表示
- Web Audio による仮音
- バックログ
- 保存 / 読込
- 画面全体タップによるページ送り
- 画面スクロール禁止
- 本文ウィンドウ内スクロール禁止
- 長文自動ページ分割

## 3. 非対象

v0.9では以下を対象外とする。

- 実ブラウザ検査済みの保証
- iPhone Safari実機確認済みの保証
- 外部音源ファイルの同梱
- ボイス
- CG鑑賞
- 既読スキップ
- オート再生
- 多言語対応
- ストア公開
- 汎用エンジンとしての完成
- CSSの `engine.css` / `theme.css` 分離実装

## 4. 作品コンテンツ仕様

### 4.1 シナリオ

シナリオ本体は以下に置く。

```text
content/scenario/main.json
```

### 4.2 主人公名

主人公は片桐遙。  
タイトル後の `mother_intro` シーンで、母の台詞により名前を自然に提示する。

### 4.3 文書表記ルール

- 声・台詞・呼び声は `「」` で囲む。
- 覚書・走り書き・札・写真裏・絵馬文字など、画面上に文書として表示される内容は `『』` で囲む。
- 返鈴覚書は文語調とし、句読点を使用しない。
- 祖母の走り書きは現代語とし、句点のみ使用し、読点は使用しない。
- 本文地の文は句読点を自然に使用する。

### 4.4 主人公目線

本文は、主人公がその時点で見た・聞いた・触れた・読んだ・思い出した・自然に推測できる範囲に限定する。  
主人公が知り得ない背景情報、作者都合の説明、読者向けの整理文は本文に出さない。

## 5. 分岐・エンディング仕様

### 5.1 状態変数

```text
score
bell_handling
ema_action
voice_action
ending
```

### 5.2 分岐1

| 選択肢 | score | 状態 |
|---|---:|---|
| 白布に包む | +1 | `bell_wrap` |
| そのまま持つ | 0 | `bell_pocket` |
| 鈴を鳴らして確かめる | -1 | `bell_ring` |

### 5.3 分岐2

| 選択肢 | score | 状態 |
|---|---:|---|
| 名前を読まず、鈴を置く | +1 | `ema_place_bell` |
| 書かれた名前を小声で読む | -1 | `ema_read_name` |
| 絵馬を外して裏を見る | 0 | `ema_remove` |

### 5.4 分岐3

| 選択肢 | score | 状態 |
|---|---:|---|
| 振り返らない | +1 | `voice_no_turn` |
| 鳥居まで走る | 0 | `voice_run` |
| 返事をする | BAD強制 | `voice_answer` |

### 5.5 エンディング判定

| 条件 | END |
|---|---|
| `voice_action === "voice_answer"` | BAD |
| `score >= 2` | TRUE |
| `score >= 0` | NORMAL |
| `score < 0` | BAD |

## 6. エンジンUI仕様

### 6.1 画面スクロール禁止

画面全体はスクロールさせない。  
`html`, `body`, `app`, `stage` は固定表示とし、上下スクロールによって読書位置が変わらないようにする。

### 6.2 本文ウィンドウ内スクロール禁止

本文ウィンドウ内でもスクロールさせない。  
本文が入りきらない場合は、スクロールではなくページ分割で読む。

### 6.3 ページ送り

選択肢表示中を除き、画面全体タップで次ページへ進む。  
ただし、以下のUI要素はページ送りの対象外とする。

- メニューボタン
- 保存ボタン
- 読込ボタン
- 音ボタン
- 選択肢ボタン
- メニュー内ボタン
- パネル領域

### 6.4 本文開始位置

本文の開始位置はページごとに上下しないよう固定する。  
また、本文は画面中央より下から始めない。メニューの少し下から始まる読書領域として扱う。

### 6.5 選択肢表示時の本文領域

通常本文では本文領域を広く使う。  
選択肢表示時のみ、選択肢領域を確保するため本文領域を縮める。  
この切替は `.stage.has-choices` により制御する。

### 6.6 ページ分割量

v0.9時点では `src/main.js` 内で以下の目安値を使用する。

```text
document: 180
voice: 88
text: 150
```

ただし、これは将来的に `manifest` またはテーマ設定へ移す候補である。  
現時点では、作品を進めるための暫定エンジン値として扱う。

## 7. 背景画像仕様

背景画像は以下に置く。

```text
assets/bg/
```

シナリオ内の `background` ID と、CSSの `.bg-*` クラス、および画像ファイル名を対応させる。  
`black_rain` と `black_plain` はCSS背景であり、画像ファイルを必要としない。

## 8. 音仕様

v0.9では、外部音源ファイルを同梱せず、Web Audio による仮音を使用する。

- 雨音風ノイズ
- 鈴風の短い音
- 足音風の短い音

商用素材や外部素材を追加する場合は、`docs/AUDIO_SOURCES.md` と `docs/LICENSES.md` を更新する。

## 9. CSS分離方針

v0.9では `styles/base.css` にエンジンUIとテーマが混在している。  
将来的には以下に分離する。

```text
styles/engine.css
styles/theme.css
```

### 9.1 engine.css に入れるもの

- 画面固定
- スクロール禁止
- 本文領域の構造
- 選択肢領域の構造
- 全画面タップ前提のレイアウト
- セーフエリア対応
- 非表示クラス
- パネル・トーストの基本構造

### 9.2 theme.css に入れるもの

- 色
- 背景画像割り当て
- 文字影
- グラデーション
- 角丸
- 作品固有の暗さ
- 雨・ホラー作品向けの視覚調整

## 10. 検証範囲

チャット内では以下を確認対象とする。

- JSON構文
- JS構文
- CSS参照
- ファイル構成
- シーン参照
- 分岐総当たり
- 表記ルール
- zip構成

以下はCodex / ローカル / 実機確認対象とする。

- 実ブラウザ描画
- Playwright完走
- スクリーンショット確認
- 保存 / 読込の実動作
- iPhone Safari実機確認


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

## v1.1 typewriter display

v1.1では、ページ内の文章を一括表示ではなく、文字送りで表示する。

### 基本挙動

| 状態 | タップ時の動作 |
|---|---|
| 文字送り中 | 現在ページの全文を即時表示 |
| 全文表示後 | 次ページへ進む |
| 選択肢表示中 | 選択肢選択まで待機 |
| ボタン・パネル操作 | ページ送りしない |

### 速度

```text
text: 35ms / char
voice: 45ms / char
document: 12ms / char
title: instant
```

文書表示は可読性を優先し、地の文や声より速く表示する。  
将来的には「標準 / 速い / 瞬時」を設定化する。

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

## v1.4 Text Layout Engine

v1.4では、テキスト表示を単なる文字列表示ではなく、Text Layout Engineとして扱う。

### 対応済み

- 自動ページ分割
- 手動ページ指定 `pages`
- インライン改行 `[r]`
- インライン改ページ `[p]`
- 日本語禁則処理
- 文字送り
- 種別別文字送り速度
- kind付きバックログ

### 予約

- `[l]` はクリック待ち命令として予約。v1.4では未実装。

### 方針

制作側は演出上の切れ目を指定し、エンジン側は安全な表示・禁則処理・ページ送りを担う。

## v1.5 Authoring System

v1.5では、シナリオ積み替えに備えて Authoring System を導入する。

### 追加ファイル

```text
content/scenario/STORY_BIBLE.md
content/scenario/SCENARIO_SOURCE.md
content/scenario/COMPILE_REPORT.md
docs/AI_SCENARIO_RULES.md
docs/HUMAN_MANUAL.md
docs/SCENARIO_REVIEW_CHECKLIST.md
```

### 方針

- Runtime Engineは `main.json` のみを読む。
- `SCENARIO_SOURCE.md` は人間とAIが共同で扱う原稿正本。
- `STORY_BIBLE.md` は最上位の設定正本。
- `main.json` は実行用生成物。
- v1.5では自動コンパイラは未実装。

## v1.6 Content Pack

v1.6では、別シナリオへの積み替えに向けて、作品固有情報を `content/manifest.json` に寄せる。

### manifestで管理する作品固有情報

```text
gameId
title
saveKey
backgrounds
contentPack
```

### Runtime方針

- Runtime Engineは `manifest.json` と `main.json` を読む。
- 背景IDは `manifest.backgrounds` で解決する。
- 保存キーは `manifest.saveKey` を使う。
- 作品名は `manifest.title` を使う。
- Authoring Markdownは実行時に直接読まない。

### v1.6で未完了

- CSS完全分離は未完了。
- `styles/engine.css` と `styles/theme.css` は追加済みだが、互換維持のため `styles/base.css` も読み込む。
- `SCENARIO_SOURCE.md` から `main.json` への自動コンパイラは未実装。

## v1.6-docfix Current Specification Note

このファイルは履歴追記型で運用されているため、前半に古いv0.9等の記述が残る。  
現在仕様として優先するのは、後方のv1.4〜v1.6-docfix関連記述である。

現在の重要仕様:

- Runtime Engineは `manifest.json` と `main.json` を読む。
- Authoring MarkdownはRuntime Engineが直接読まない。
- 保存キーは `manifest.saveKey`。
- 作品名は `manifest.title`。
- 背景は `manifest.backgrounds`。
- ページ分割値は `manifest.engineUiPolicy.paginationProfile`。
- CSS完全分離は未完了。`base.css`互換維持中。

将来的には、Current仕様とHistoryを分離して読みやすくする。

## v1.7 Scenario Compiler

v1.7では、`SCENARIO_SOURCE.md` から `main.json` を生成するcompilerを追加する。

### 追加ファイル

```text
tools/compile_scenario.py
content/scenario/SCENARIO_SCHEMA.json
```

### 対応記法

```text
[text]
[text se=bell_far]
[voice]
[document]
[title]
[choice]
[next: scene_id]
[endingCheck]
[ending]
[pageBreak]
[page N]
```

### 方針

- Runtime Engineは引き続き `main.json` のみを読む。
- compilerはAuthoring Systemの支援ツールであり、Runtime Engineには組み込まない。
- `SCENARIO_SOURCE.md` の自由なMarkdownは対象外。固定記法のみを扱う。
- `COMPILE_REPORT.md` はcompilerが更新する。

## v1.8 Source-level Metadata

v1.8では、`SCENARIO_SOURCE.md` の先頭に source-level metadata を追加する。

### 対応項目

```text
title
gameId
saveKey
startScene
backgrounds
```

compilerはこのmetadataから、`main.json` と `manifest.json` を同期する。

### 方針

- `startScene` は `SCENARIO_SOURCE.md` 側で指定できる。
- `manifest.title` / `gameId` / `saveKey` も source 側から生成・同期できる。
- 背景IDは source 側の `# backgrounds` で定義し、manifestへ反映する。
- Runtime Engineは引き続きAuthoring Markdownを直接読まない。

## v1.9 Image and Audio Asset Handling

v1.9では、Content Pack差し替え時の画像・音声ファイル取扱いを検証する。

### manifest.audio

```json
{
  "audio": {
    "ambiences": {
      "scenario_c_loop": {
        "src": "assets/audio/scenario_c_loop.wav",
        "loop": true,
        "volume": 0.25
      }
    },
    "se": {
      "scenario_c_chime": {
        "src": "assets/audio/scenario_c_chime.wav",
        "volume": 0.7
      }
    }
  }
}
```

### 方針

- 背景画像は `manifest.backgrounds` で管理する。
- 音声ファイルは `manifest.audio` で管理する。
- シナリオ内の `background`, `ambience`, `se` はmanifest定義と照合する。
- RuntimeはAuthoring Markdownを直接読まない。

## v20 Condition-based Ending / State Consistency

v20では、スコアだけに依存したエンディング判定による事実関係の矛盾を防ぐため、condition-based endingを導入する。

### Runtime step

```json
{
  "type": "endingCheck",
  "rules": [
    {
      "if": {
        "all": [
          { "flag": "bell_handling", "equals": "wrapped" },
          { "flag": "bell_returned", "equals": true }
        ]
      },
      "next": "ending_true"
    },
    {
      "default": true,
      "next": "ending_normal"
    }
  ]
}
```

### 対応operator

```text
equals
notEquals
exists
in
notIn
gte
gt
lte
lt
truthy
all
any
not
```

### scene前提

sceneには将来互換のため、`requires` / `assumes` を付与できる。

```json
{
  "id": "road_to_shrine",
  "requires": {
    "flag": "bell.location",
    "notEquals": "box"
  }
}
```

### 方針

- Runtimeは `endingCheck.rules` がある場合はcondition rulesを優先する。
- rulesがない古いContent Packではlegacy score fallbackを維持する。
- 物語上の必須条件はscoreではなくstate条件で書く。

## v21 Route Merge / Loop / 30-minute Scope

v21では、最大30分程度の作品を想定し、分岐・合流・繰り返しで破綻しにくくするための機能を追加する。

### 対象範囲

```text
想定プレイ時間：最大30分
主対象：短編〜中編サウンドノベル
対象外：長編ルート分岐ゲーム、大規模ADV、周回前提の複雑な管理
```

### conditionalText

合流sceneで、stateに応じて本文を出し分ける。

```json
{
  "type": "conditionalText",
  "cases": [
    {
      "if": { "flag": "bell_handling", "equals": "wrapped" },
      "text": "白布に包んだ鈴は、上着の内側にある。"
    },
    {
      "if": { "flag": "bell_handling", "equals": "bare" },
      "text": "鈴は、ポケットの布越しに冷たかった。"
    },
    {
      "default": true,
      "text": "上着の内側で、鈴が小さく震えている。"
    }
  ]
}
```

### visited count

sceneへ入るたびに、Runtimeが次を自動更新する。

```text
state.visited[sceneId] += 1
```

条件式では次のように使える。

```json
{ "flag": "visited.shrine", "gte": 2 }
```

### route graph checker

`tools/check_route_graph.py` は以下を検査する。

```text
到達不能scene
endingに到達しない経路
合流点
loop候補
分岐数
推定読了時間
30分向け推奨上限
```

## v22 Publish / Speed / Timed Choice / Font Size Foundation

### publish_game.py

公開用zipは、実行に必要なファイルだけを含める。

含める:
```text
index.html
src/
styles/
content/
assets/
```

除外する:
```text
tools/
docs/
STORY_BIBLE.md
SCENARIO_SOURCE.md
REPORT類
__pycache__
```

### 文字送りスピード

`text` / `voice` / `document` を独立設定できる。

### 選択肢の時間制限

```json
{
  "type": "choice",
  "prompt": "どうするか。",
  "timeLimitMs": 8000,
  "timeoutNext": "ending_bad",
  "timeoutBacklogLabel": "時間切れ",
  "choices": []
}
```

### フォントサイズ

`text` / `voice` / `document` を独立設定できる基礎を追加。縦書きは未対応。

## v02 Japanese Text Display Engine

### 目的

`sn_engine_v02a` では、日本語文字表示・文字送り・ページ分割を販売品質に近づけるため、固定文字数主導の分割から、実表示領域測定とJLREQ参照の禁則処理を主軸とする。

### 実装対象

```text
src/engine/japaneseLayoutRules.js
src/engine/textMeasure.js
src/engine/textPaginator.js
src/engine/typewriterController.js
```

### 要件

- 本文 / 台詞 / 文書を端末サイズ・文字サイズ設定に応じて安全にページ分割する。
- `[r]` は明示改行、`[p]` は明示改ページとして扱う。
- 句読点だけのページ、閉じ括弧だけのページ、行頭禁止文字から始まるページを避ける。
- 文字サイズ変更時、表示領域変更時に再ページ分割を行う。
- `charsPerLine / maxLines` はフォールバックまたは静的検査用の概算値として保持する。
- CSS `line-break: strict` は使用するが、ページ分割はエンジン側で制御する。
