# CSS_SPLIT_PLAN.md

## 1. 目的

この文書は、現在 `styles/base.css` に混在しているエンジンUIと作品テーマを、将来的に分離するための計画書である。

v1.6-docfix時点では、以下の3ファイルを読み込む。

```text
styles/engine.css
styles/theme.css
styles/base.css
```

ただし、完全分離は未完了であり、`base.css` が引き続き主要な見た目を担っている。

## 2. 現在の状態

### engine.css

将来のエンジン共通レイアウト用。  
v1.6-docfixでは分離準備ファイル。

入れるべきもの:

- 画面固定
- セーフエリア対応
- スクロール禁止
- 本文領域構造
- 選択肢領域構造
- 全画面タップ前提の構造
- パネル
- トースト
- 非表示クラス

### theme.css

将来の作品固有テーマ用。  
v1.6-docfixでは分離準備ファイル。

入れるべきもの:

- 色
- 背景画像
- 文字影
- 暗さ
- グラデーション
- 角丸
- 作品固有の視覚演出

### base.css

v1.6-docfixでは互換維持のため継続使用。  
完全分離が終わるまで削除しない。

## 3. 現在のページ分割値

ページ分割値はCSSではなく、`content/manifest.json` の以下で管理する。

```text
manifest.engineUiPolicy.paginationProfile
```

現行値:

```text
document: charsPerLine 18 / maxLines 12
voice: charsPerLine 20 / maxLines 7
text: charsPerLine 20 / maxLines 10
```

旧値 `document: 180 / voice: 88 / text: 150` は廃止済み。

## 4. 分離時の注意

- 背景IDはJSに直書きしない。
- 背景解決は `manifest.backgrounds` を使う。
- 保存キーは `manifest.saveKey` を使う。
- 作品名は `manifest.title` を使う。
- Authoring MarkdownをRuntime Engineで直接読ませない。
- `base.css` 削除は、実ブラウザ・iPhone Safari確認後に行う。

## 5. 推奨手順

```text
1. base.cssをengine/theme観点で棚卸し
2. レイアウト構造をengine.cssへ移す
3. 色・背景・文字影をtheme.cssへ移す
4. base.cssを空に近づける
5. 静的検査
6. Codexまたはローカルで実ブラウザ検査
7. iPhone Safari実機確認
8. base.css削除可否を判断
```
