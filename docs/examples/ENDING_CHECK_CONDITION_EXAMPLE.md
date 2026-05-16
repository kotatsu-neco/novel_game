# ENDING_CHECK_CONDITION_EXAMPLE.md

## 目的

scoreだけでエンディングを決めると、物語上の条件を満たしていないのにTRUE ENDへ行くことがあります。  
v20では、`endingCheck.rules` によるcondition-based endingを使えます。

## JSON例

```json
{
  "type": "endingCheck",
  "rules": [
    {
      "if": {
        "all": [
          { "flag": "bell_handling", "equals": "wrapped" },
          { "flag": "bell_returned", "equals": true },
          { "flag": "voice_answered", "equals": false }
        ]
      },
      "next": "ending_true"
    },
    {
      "if": {
        "any": [
          { "flag": "bell_rung_by_player", "equals": true },
          { "flag": "name_read_aloud", "equals": true },
          { "flag": "voice_answered", "equals": true }
        ]
      },
      "next": "ending_bad"
    },
    {
      "default": true,
      "next": "ending_normal"
    }
  ]
}
```

## SCENARIO_SOURCE.md用の簡易記法例

```text
[endingCheck]
- when: bell_handling == wrapped
  next: ending_true

- when: name_read_aloud == true
  next: ending_bad

- default: true
  next: ending_normal
```

## 注意

複数条件の `all` / `any` は、現時点ではJSON側で扱うのが確実です。  
Markdown compilerの簡易記法では、まず単条件のルールを安全に扱います。
