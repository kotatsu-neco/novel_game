# PATCH_NOTE_v16.md

## 変更内容

1. Content Pack化の準備を実施。
2. manifestに `gameId`, `title`, `saveKey`, `contentPack`, `backgrounds` を追加。
3. Runtime Engineの背景ID固定リストを解除。
4. `setBackground()` を `manifest.backgrounds` 参照へ変更。
5. 保存キーを `manifest.saveKey` 参照へ変更。
6. `document.title` を `manifest.title` で更新。
7. `styles/engine.css` と `styles/theme.css` を追加。
8. `index.html` にengine/theme CSS読み込みを追加。
9. 正本系ファイルへv1.6仕様を反映。

## 重要な設計判断

- v1.6ではCSS完全分離はまだ行わない。
- 互換維持のため `styles/base.css` は継続読み込み。
- 新しい作品へ積み替える時、背景IDはJSではなくmanifestへ追加する。

## 確認済み

- JSON構文OK
- JS構文チェックOK
- シーン参照OK
- 分岐総当たりOK
- 背景ID対応OK
- CSSファイル存在OK

## 未確認

- 実ブラウザ表示
- iPhone Safari実機表示
- theme.css単独運用
