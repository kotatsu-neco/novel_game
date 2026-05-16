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
