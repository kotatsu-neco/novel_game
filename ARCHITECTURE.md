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
