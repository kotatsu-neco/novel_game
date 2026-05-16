# CSS_SPLIT_PLAN.md

## 目的

v0.9時点では `styles/base.css` に、エンジンUIと作品テーマが混在している。  
今後、短編ノベルゲームエンジンとして複数作品へ流用する場合は、CSSを以下に分離する。

```text
styles/engine.css
styles/theme.css
```

## 1. engine.css に移すもの

エンジンの構造・操作・読書体験に関わるもの。

- `html`, `body` のスクロール禁止
- `.app`
- `.stage`
- `.topbar`
- `.novel-area`
- `.text-window`
- `.choices`
- `.choice-button` の構造
- `.panel`
- `.toast`
- `.hidden`
- セーフエリア対応
- 画面全体タップ前提のレイアウト
- 選択肢表示時の `.stage.has-choices`

## 2. theme.css に移すもの

作品ごとの見た目・雰囲気に関わるもの。

- 色
- 背景画像
- 背景オーバーレイ
- グラデーション
- 文字影
- 文書表示の雰囲気
- ホラー向け暗さ
- 作品固有の背景IDクラス

## 3. 分離時の注意

### 3.1 エンジン側に作品名を入れない

`返し鈴`, `遙`, `惣太`, `片桐`, `返鈴` などは `content/` またはテーマ側に置く。  
エンジン側には入れない。

### 3.2 背景画像はテーマ側

背景画像は `assets/bg/` と `theme.css` の担当。  
エンジンは背景IDを受け取り、該当クラスを付与するだけにする。

### 3.3 ページ分割量は設定化する

現状の `document: 180`, `voice: 88`, `text: 150` は `src/main.js` に直書きされている。  
分離時には、以下のような設定に移す。

```json
{
  "ui": {
    "pagination": {
      "document": 180,
      "voice": 88,
      "text": 150
    }
  }
}
```

## 4. 推奨手順

1. `styles/base.css` をコピーして `engine.css` と `theme.css` の草案を作る。
2. 画面固定・本文領域・選択肢領域を `engine.css` へ移す。
3. 色・背景・文字影・暗さを `theme.css` へ移す。
4. `index.html` で両方を読み込む。
5. 静的検査でCSS参照先を確認する。
6. Codex / ローカルで実ブラウザ確認する。
