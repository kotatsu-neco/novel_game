# 返し鈴 v1.6-docfix

## v1.6-docfix 現在版サマリー

この成果物は、v1.6のContent Pack化準備に対する文書整合修正版です。

### 現在の実行構造

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

### 現在の重要仕様

- Runtime Engineは `main.json` を読む。
- Authoring Markdownは実行時に直接読まない。
- 背景は `manifest.backgrounds` で管理する。
- 保存キーは `manifest.saveKey` を使う。
- 作品名は `manifest.title` を使う。
- v1.6-docfixでは `styles/base.css` 互換を維持する。
- `styles/engine.css` / `styles/theme.css` は分離準備段階。


和風ホラー短編サウンドノベルの最小プレイ版です。

## 1. 起動方法

`index.html` をブラウザで開きます。

ローカルで `fetch()` が制限されるブラウザでは、簡易サーバーで起動してください。

```bash
python -m http.server 8000
```

その後、ブラウザで以下を開きます。

```text
http://127.0.0.1:8000/
```

## 2. 操作

### ページ送り

画面全体をタップすると進みます。

ただし、以下を押した場合はページ送りしません。

- メニュー
- 保存
- 読込
- 音
- 選択肢
- メニュー内ボタン

### 選択肢

選択肢が表示されたら、選択肢ボタンを押してください。

### 保存 / 読込

上部の「保存」「読込」を使用します。  
保存にはブラウザの `localStorage` を使用します。

### 音

上部の「音」ボタンで仮音のオン / オフを切り替えます。

## 3. 現在のUI仕様

v0.9では、以下を基本仕様とします。

```text
画面全体はスクロールしない
本文ウィンドウ内もスクロールしない
入りきらない文章は自動でページ分割する
ページ送りは画面全体タップで行う
本文の開始位置はページごとに動かさない
```

## 4. 実機確認ポイント

### 見る場所

- 冒頭の黒画面
- 母との導入
- 仏間シーン
- 覚書
- 祖母の走り書き
- 選択肢表示
- エンディング

### 合格条件

- 画面が上下にスクロールしない
- 本文ウィンドウ内もスクロールしない
- 本文の開始位置がページ送りで動かない
- 文章が入りきらない場合はページ送りで続きが読める
- 画面の広い範囲をタップしてページ送りできる
- ボタン類を押した時に誤ってページ送りされない
- 覚書と祖母の走り書きが読みやすい
- TRUE / NORMAL / BAD の3エンドに到達できる

## 5. 収録内容

```text
index.html
styles/base.css
src/main.js
src/engine/
content/scenario/main.json
assets/bg/
README.md
SPEC.md
DESIGN.md
ARCHITECTURE.md
AGENTS.md
REPORT.md
docs/
```

## 6. 注意

v0.9では第三者音源ファイルを同梱していません。  
音は Web Audio による仮音です。

背景画像は `assets/bg/` に同梱されています。  
今後、外部素材を追加する場合は `docs/LICENSES.md` と `docs/AUDIO_SOURCES.md` を必ず更新してください。

## 7. 検査範囲

このチャットでは、以下の静的・論理検査を対象とします。

- ファイル構成
- JSON構文
- JS構文
- CSS参照
- 背景画像ファイル存在
- シーン参照
- 分岐総当たり
- 表記ルール

以下はCodex / ローカルPC / 実機確認対象です。

- 実ブラウザ描画
- Playwright完走
- スクリーンショット確認
- 保存 / 読込の実動作
- iPhone Safari実機確認

## v1.0 更新

- ページ分割を文字数ベースから推定行数ベースへ変更しました。
- 祖母の走り書きや覚書が途中で切れないよう、文書表示の分割を保守的にしました。
- 文書表示の明朝体は維持しつつ、本文と極端にサイズ差が出ないよう調整しました。
- 通常本文も折り返しが不自然になりにくいよう、フォントサイズと行間を調整しました。

## v1.1 更新

- 文字送りを追加しました。
- 文字送り中に画面をタップすると、そのページの全文が即時表示されます。
- 全文表示後にもう一度タップすると、次ページへ進みます。
- 文書表示は読みやすさ優先で速めに表示されます。

## v1.2 更新

- ページ分割をさらに保守的な推定行数ベースへ修正しました。
- 20字前後を超える文のかたまりが1行扱いにならないよう、厳密に分割するようにしました。
- iPhone Safariの下部ブラウザUIに本文領域が隠れにくいよう、`100svh` 寄りの高さ指定へ変更しました。
- 保存 / 読込後にバックログが重複しにくいよう修正しました。

## v1.3 更新

- 『志乃と惣太　社の前にて』を1行表記へ修正しました。
- 句点・読点・閉じ括弧だけが次行へ送られないよう、日本語禁則処理を追加しました。
- ページ分割時に、句読点だけの行が出ないようにしました。

## v1.4 更新

- Text Layout Engine仕様を追加しました。
- `pages` による手動ページ指定に対応しました。
- `[r]` を明示改行、`[p]` を明示改ページとして扱います。
- 文字送り速度とページ分割値を `manifest` から読むようにしました。
- バックログを `kind` 付き構造へ変更しました。
- `docs/TEXT_GUIDE.md` を追加しました。

## v1.5 更新

- シナリオ積み替えに向けた Authoring System を追加しました。
- `STORY_BIBLE.md` を設定正本として追加。
- `SCENARIO_SOURCE.md` を人間・AI編集用のシナリオ原稿として追加。
- `AI_SCENARIO_RULES.md`、`HUMAN_MANUAL.md`、`SCENARIO_REVIEW_CHECKLIST.md` を追加。
- v1.5では自動コンパイラは未実装です。Runtime Engineは引き続き `main.json` を読みます。

## v1.6 更新

- Content Pack化の準備を追加しました。
- `manifest.json` に `gameId`, `title`, `saveKey`, `backgrounds`, `contentPack` を追加しました。
- 背景ID固定リストをRuntime Engineから外し、`manifest.backgrounds` を参照するようにしました。
- 保存キーを `manifest.saveKey` 参照にしました。
- `styles/engine.css` と `styles/theme.css` を追加しました。
- 互換維持のため、v1.6では `styles/base.css` も引き続き読み込みます。

## v1.7 更新

- `tools/compile_scenario.py` を追加しました。
- `SCENARIO_SOURCE.md` から `main.json` を生成できるようにしました。
- `SCENARIO_SOURCE.md` の `[text se=...]` 形式に対応しました。
- `content/scenario/SCENARIO_SCHEMA.json` を追加しました。
- `src/engine/validator.js` を強化しました。
- `COMPILE_REPORT.md` を compiler 実行結果で更新するようにしました。

### 変換コマンド

```bash
python tools/compile_scenario.py
```

検査のみ行う場合:

```bash
python tools/compile_scenario.py --check-only
```

## v1.8 更新

- `SCENARIO_SOURCE.md` に source-level metadata を追加しました。
- compiler が `startScene`, `title`, `gameId`, `saveKey`, `backgrounds` を source 側から読み取れるようになりました。
- compiler が `main.json` だけでなく `manifest.json` も同期します。
- 別作品Content Packで開始シーンIDを `title` に固定する必要がなくなりました。

### source-level metadata 例

```md
# content-pack
title: 返し鈴
gameId: kaeshisuzu
saveKey: kaeshisuzu_save_v01
startScene: title

# backgrounds
- id: black_plain
  kind: cssClass
  className: bg-black_plain
```

## v1.9 更新

- 成果物名を `sound_novel_starter_v19` 系へ変更。
- 外部画像ファイル・外部音声ファイルをContent Pack側で扱う検証を追加。
- `manifest.audio.ambiences` / `manifest.audio.se` をcompiler同期対象に追加。
- Runtime Audio Engineがmanifest上の音声ファイルを参照できるようにした。
- シナリオCによるダミー画像・ダミー音声付き積み替え検証を実施。
