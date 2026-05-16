# PATCH_NOTE_v19.md

## 変更内容

1. 成果物名を `sound_novel_starter_v19` として扱う。
2. Runtime Audio Engineに `manifest.audio` 参照機能を追加。
3. compilerに `# audio` metadata処理を追加。
4. scenario Cでダミー背景PNG・ダミー音声WAVを使った積み替え検証を実施。
5. 画像・音声参照の静的検査を追加。

## 確認済み

- compiler実行OK
- JS構文OK
- Python構文OK
- manifest.backgrounds参照OK
- manifest.audio参照OK
- ダミー画像ファイル存在OK
- ダミー音声ファイル存在OK

## 未確認

- 実ブラウザ表示
- 実ブラウザ音声再生
- iPhone Safari音声再生
