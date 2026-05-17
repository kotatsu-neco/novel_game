# SCENARIO_INSTALL.md

## このzipについて

これは、サンプルシナリオを含まないノベルゲームエンジン本体です。  
このままではゲーム本文がないため、単体では作品として再生できません。

## 使い方

1. このzipを展開します。
2. 別配布のシナリオパックを展開します。
3. シナリオパック内の `content/` と `assets/` を、このエンジンのルートへコピーします。
4. `index.html` を開きます。

## 含まないもの

```text
content/manifest.json
content/scenario/main.json
content/scenario/STORY_BIBLE.md
content/scenario/SCENARIO_SOURCE.md
assets/bg/
assets/audio/
```

## 内部キー

内部キーは互換性維持のため次のままです。

```text
text     = 本文
voice    = 台詞
document = 文書
```
