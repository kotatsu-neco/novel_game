# PATCH_NOTE_v11.md

## 変更内容

1. 文字送り機能を追加。
2. 文字送り中のタップで全文表示。
3. 全文表示後のタップで次ページへ進行。
4. 文書表示は速めの文字送りに設定。
5. 仕様書・デザイン・設計・READMEへ反映。

## 速度

```text
text: 35ms / char
voice: 45ms / char
document: 12ms / char + 2 chars per tick
title: instant
```

## 確認済み

- JS構文チェックOK。
- JSON構文OK。
- シーン参照OK。
- manifest更新済み。

## 未確認

- iPhone Safariでの実際の文字送り速度。
- 文書表示の体感速度。
- 文字送り中タップの実機挙動。
