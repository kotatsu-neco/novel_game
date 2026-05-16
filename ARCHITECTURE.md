# ARCHITECTURE.md

## 構成

```text
index.html
styles/base.css
src/main.js
src/engine/audioManager.js
src/engine/saveLoad.js
src/engine/validator.js
content/scenario/main.json
```

## データフロー

1. `index.html` が `src/main.js` を読み込む。
2. `main.js` が `content/scenario/main.json` を取得する。
3. `validator.js` がシーンID・分岐参照を検証する。
4. シーンとステップを順に表示する。
5. 選択肢で `score` と状態変数を更新する。
6. `endingCheck` でエンディングを判定する。

## 状態変数

- `score`
- `bell_handling`
- `ema_action`
- `voice_action`
- `ending`

## 保存

`localStorage` に現在シーン、ステップ、状態、バックログを保存する。

## 音

v0.1では外部音源ファイルを使わず、Web Audio で雨音風ノイズと鈴風の仮音を生成する。
