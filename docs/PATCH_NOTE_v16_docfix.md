# PATCH_NOTE_v16_docfix.md

## 変更内容

1. README.md冒頭の版表記を修正。
2. AGENTS.mdの変更可能範囲をv1.6構成に合わせて更新。
3. COMPILE_REPORT.mdをv1.6-docfix時点の内容に更新。
4. docs/CSS_SPLIT_PLAN.mdを現在仕様へ更新。
5. SPEC.md / ARCHITECTURE.mdにCurrent仕様注意を追記。
6. src/main.jsの保存キー初期フォールバックを汎用化。

## Runtime修正

修正前:

```js
let saveLoad = new SaveLoad("kaeshisuzu_save_v01");
```

修正後:

```js
let saveLoad = null;
```

manifest読込後に `manifest.saveKey` を使って初期化する。

## 確認済み

- JSON構文OK
- JS構文チェックOK
- シーン参照OK
- 分岐総当たりOK
- Runtime JS内に `kaeshisuzu_save_v01` が残っていない
- 必須文書更新済み

## 未確認

- 実ブラウザ表示
- iPhone Safari実機表示
