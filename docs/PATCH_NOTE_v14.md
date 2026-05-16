# PATCH_NOTE_v14.md

## 変更内容

1. Text Layout Engine仕様を追加。
2. `pages` による手動ページ指定に対応。
3. `[r]` 改行、`[p]` 改ページに対応。
4. 文字送り速度をmanifest参照へ変更。
5. ページ分割値をmanifest参照へ変更。
6. バックログをkind付き構造へ変更。
7. `docs/TEXT_GUIDE.md` を追加。
8. 正本系ファイルへv1.4仕様を反映。

## 確認済み

- JSON構文OK
- JS構文チェックOK
- シーン参照OK
- 分岐総当たりOK
- CSS参照OK

## 未確認

- 実ブラウザ表示
- iPhone Safari実機表示
- 手動ページ指定を使った実シナリオ上の演出確認
