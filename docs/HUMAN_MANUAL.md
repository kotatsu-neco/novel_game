# HUMAN_MANUAL.md

## 1. このマニュアルの目的

この文書は、人間が短編ノベルゲームを作るための制作手順書です。  
AIに任せる部分と、人間が決める部分を分け、シナリオ積み替えを安全に行うことを目的とします。

## 2. 制作の基本手順

```text
1. 人間が設定を決める
2. STORY_BIBLE.md を作る
3. AIが基本原稿を起こす
4. 人間がAIに大まかな修正を任せる
5. 人間がシナリオ細部を調整する
6. SCENARIO_SOURCE.md を確認する
7. main.json へ変換する
8. Validatorで検査する
9. 実機確認する
```

## 3. 人間が決めること

- 作品名
- 主人公
- 舞台
- 時系列
- 怪異や事件のルール
- 禁忌
- 真相
- エンディング方針
- 変更禁止の正本文書
- 文体

## 4. AIに任せてよいこと

- 基本原稿の下書き
- 説明くささの削減案
- 主人公目線違反の指摘
- 文章量調整案
- `[p]` 改ページ案
- `[r]` 改行案
- 代替表現案
- 矛盾候補の検出

## 5. AIに任せないこと

- 真相の変更
- 人物関係の変更
- 禁忌の変更
- scene IDの変更
- 分岐先の変更
- scoreの変更
- locked / human_final の本文変更
- 正本文書の整文

## 6. statusの使い方

| status | 人間側の意味 |
|---|---|
| `draft` | まだ下書き。AIに広く任せてよい |
| `ai_revise` | AIに修正させたい |
| `human_review` | 人間が確認中。AIは提案まで |
| `human_final` | 人間が仕上げた。AIは変更禁止 |
| `locked` | 完全固定。正本 |

## 7. シナリオを書く場所

人間が読む・直す原稿は以下です。

```text
content/scenario/SCENARIO_SOURCE.md
```

実行用JSONは以下です。

```text
content/scenario/main.json
```

原則として、人間は `main.json` を直接編集しません。

## 8. 実機確認の見方

- 画面スクロールしないか
- 文字送りが遅すぎないか
- 句読点だけの行がないか
- 文書が最後まで読めるか
- 画面全体タップで進むか
- ボタンで誤ってページ送りしないか
- 選択肢が押しやすいか
- バックログが読めるか

## v1.8 作品差し替え時の確認

別作品へ積み替える場合、まず `SCENARIO_SOURCE.md` 先頭のmetadataを確認する。

```text
title
gameId
saveKey
startScene
backgrounds
```

ここを更新してから `python tools/compile_scenario.py` を実行する。  
`manifest.json` を手作業で先に合わせるのではなく、source metadataを正として同期する。
