# PATCH_NOTE_v02.md

## 目的

`sn_engine_v02a` は、販売品質に向けて日本語文字表示・文字送り・ページ分割を汎用化するための基礎改修です。

## 追加内容

```text
src/engine/japaneseLayoutRules.js
src/engine/textMeasure.js
src/engine/textPaginator.js
src/engine/typewriterController.js
tools/check_japanese_layout_rules.py
tests/japanese_layout_cases.json
```

## 主な変更

- 固定文字数ベースのページ分割を主判定からフォールバックへ降格。
- DOM測定ベースのページ分割を導入。
- JLREQ参照の禁則処理レイヤーを追加。
- `[r]` を明示改行、`[p]` を明示改ページとして扱う。
- requestAnimationFrameベースの文字送り制御へ移行。
- 文字サイズ変更時に再ページ分割を呼ぶ基礎を追加。
- ResizeObserverで表示領域変化を監視する基礎を追加。

## 未確認

- 実ブラウザでのDOM測定
- iPhone Safariでの表示
- Android Chromeでの表示
- 文字サイズ「大」時の実表示
- 実タップでの文字送り体感
