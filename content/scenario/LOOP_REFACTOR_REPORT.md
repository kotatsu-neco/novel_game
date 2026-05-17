# LOOP_REFACTOR_REPORT.md

## 1. 目的

`迷路` の分岐肥大化を抑えるため、`*_0 / *_1 / *_2` のscene複製を減らし、`mazeLoopCount` と `routeCheck` でループ回数を管理する。

## 2. 変更前後

```text
scene数: 66 → 49
choice block数: 13 → 7
choice option数: 39 → 21
routeCheck数: 0 → 3
```

## 3. 追加したstate

```json
{
  "mazeLoopCount": 0,
  "lastLoopCause": null
}
```

## 4. 追加した制御

### choice increment

間違った選択肢で `mazeLoopCount` を加算する。

```json
{
  "label": "棚の商品を勝手に持っていく",
  "next": "kiosk_wrong_gate",
  "increment": { "mazeLoopCount": 1 },
  "score": -1
}
```

### routeCheck

加算後の `mazeLoopCount` によって次sceneを振り分ける。

```json
{
  "type": "routeCheck",
  "rules": [
    { "if": { "state": "mazeLoopCount", "gte": 3 }, "next": "loop_three_bad", "ending": "bad" },
    { "if": { "state": "mazeLoopCount", "equals": 2 }, "next": "kiosk_loop_warning_2" },
    { "default": true, "next": "kiosk_loop_warning_1" }
  ]
}
```

## 5. 統合した重複scene

```text
choice_video_response_0 / choice_video_response_1
→ choice_video_response

water_sign_0 / water_sign_1
→ water_sign

choice_water_sign_0 / choice_water_sign_1
→ choice_water_sign

water_corridor_scene_0 / water_corridor_scene_1
→ water_corridor_scene

safe_second_path_0 / safe_second_path_1
→ safe_second_path

kiosk_area_0 / kiosk_area_1 / kiosk_area_2
→ kiosk_area

choice_kiosk_0 / choice_kiosk_1 / choice_kiosk_2
→ choice_kiosk

cafe_choice_0 / cafe_choice_1 / cafe_choice_2
→ cafe_choice

choice_cafe_0 / choice_cafe_1 / choice_cafe_2
→ choice_cafe
```

## 6. 確認済み

```text
- route / next 参照切れなし
- 全scene到達可能
- ending 4件維持
- 背景ID維持
- WebP背景素材維持
```

## 7. 未確認

```text
- 実ブラウザ表示
- iPhone Safari実機確認
- loopCount加算の実操作確認
- 分岐体験として自然か
```
