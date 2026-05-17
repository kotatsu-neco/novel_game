# PATCH_NOTE_v02b_loop.md

## 目的

短編サウンドノベルで、同じ分岐場面を `*_0 / *_1 / *_2` のように複製せず、state と条件分岐でループ回数を管理できるようにする。

## 追加仕様

### choice effects

choice に以下を書ける。

```json
{
  "label": "適当に進む",
  "next": "loop_gate",
  "increment": { "mazeLoopCount": 1 },
  "score": -1
}
```

対応する効果:

```text
set
increment / inc
decrement / dec
score
forceEnding
ending
```

### routeCheck step

条件に応じて次の scene へ進む。

```json
{
  "type": "routeCheck",
  "rules": [
    { "if": { "state": "mazeLoopCount", "gte": 3 }, "next": "ending_bad" },
    { "if": { "state": "mazeLoopCount", "equals": 2 }, "next": "loop_two_notice" },
    { "default": true, "next": "loop_one_notice" }
  ]
}
```

## 互換性

- 既存の `choice.set` / `choice.score` / `forceEnding` は維持。
- 既存の `endingCheck` は維持。
- 旧シナリオは原則そのまま動く。
