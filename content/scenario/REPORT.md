# REPORT.md

## 1. 作業範囲

`maze_sound_novel_v03` を基準に、以下を実施して `maze_sound_novel_v04` を作成した。

1. 全件検査
2. 未使用scene整理
3. 文体・演出の磨き込み

---

## 2. 全件検査結果

### scene / route

- startScene: opening
- scene数: 66
- 到達可能scene数: 66
- 未使用scene: なし
- scene ID重複: なし
- next参照切れ: なし
- choiceブロック数: 13
- 選択肢総数: 39
- ending種別: ['bad', 'normal', 'true']

### background

- 定義済みbackground: station_stairs, maze_corridor, crossroad, water_corridor, kiosk, cafe, stairs_up, bad_end_corridor, black_plain
- 使用background: bad_end_corridor, black_plain, cafe, crossroad, kiosk, maze_corridor, stairs_up, station_stairs, water_corridor
- 未定義background使用: なし
- 未使用background定義: なし

### asset参照

- station_stairs: `assets/bg/maze_station_stairs.png` / OK / 1763866 bytes
- maze_corridor: `assets/bg/maze_corridor.png` / OK / 1793751 bytes
- crossroad: `assets/bg/maze_crossroad.png` / OK / 1883084 bytes
- water_corridor: `assets/bg/maze_water_corridor.png` / OK / 2122761 bytes
- kiosk: `assets/bg/maze_kiosk.png` / OK / 1879898 bytes
- cafe: `assets/bg/maze_cafe.png` / OK / 1936088 bytes
- stairs_up: `assets/bg/maze_stairs_up.png` / OK / 2032775 bytes
- bad_end_corridor: `assets/bg/maze_bad_end_corridor.png` / OK / 1726251 bytes

---

## 3. 未使用scene整理

v03時点のREPORTに「`loop_two_notice` が未使用sceneとして残っていないか」とあったため、実ファイルを再検査した。

結果:

- `loop_two_notice` sceneはv03/v04の `SCENARIO_SOURCE.md` 内に存在しない
- 未使用sceneは0件
- `BACKGROUND_ASSIGNMENT.md` に古い注記が残っていたため、実際のscene割り当てから再生成した

---

## 4. 文体・演出の修正

### 修正済み

- 冒頭動画テロップの「顔を上げるな？」を「顔を伏せる？」へ変更
  - 理由: TRUE END条件の「顔を上げて上がる」と混線しやすいため
- 地の文の「泳ぐ形の先は濡れているらしい」を整理
  - 修正後: 「水泳マークの先は、水。」
- NORMAL ENDの「同じ動画を聞いて」を修正
  - 修正後: 「同じ動画を見て、同じ声を聞き」
- NORMAL未達ENDの「駅の外ではない」を微修正
  - 修正後: 「駅の外でも、いつもの改札でもない」
- BAD ENDの終盤を微調整
  - 修正後: 「同じ明るさの、同じ幅の、同じ通路」

### 表現チェック

- `顔を上げるな`: 0件
- `戻されただけ`: 0件
- `泳ぐ形の先は濡れているらしい`: 0件
- `同じ動画を聞いて`: 0件

---

## 5. 公式ツール検査

### compile_scenario.py

- 終了コード: 0

```text
{"ok": true, "title": "迷路", "gameId": "maze", "startScene": "opening", "sceneCount": 66, "backgroundCount": 9, "matchesExistingExceptMeta": false, "output": "/mnt/data/maze_sound_novel_v04/main_compiled_check.json"}

Spreadsheet runtime warmup failed during python startup
Traceback (most recent call last):
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/patches/warm_spreadsheet_runtime_on_startup.py", line 26, in warm_spreadsheet_runtime_on_startup
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/spreadsheet_warmup.py", line 785, in warm_spreadsheet_runtime
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/spreadsheet_warmup.py", line 720, in _warm_feature_flows
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/spreadsheet_warmup.py", line 704, in _warm_collaboration_flows
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/generated/interface/models.py", line 48821, in hydrate_crdt_from_proto
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/rpc/remote.py", line 747, in __call__
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/rpc/client.py", line 150, in call
artifact_tool.rpc.client.RemoteError: hydrateCrdtFromProto requires an empty collaborative document.
```

### check_route_graph.py

- 終了コード: 0

```text
{
  "ok": true,
  "errors": [],
  "warnings": [
    "Choice count 39 exceeds recommended maximum 25 for a <=30 minute kit."
  ],
  "stats": {
    "sceneCount": 66,
    "choiceCount": 39,
    "textChars": 9958,
    "estimatedMinutes": 22.1,
    "endingSceneCount": 4
  },
  "startScene": "opening",
  "reachableScenes": [
    "cafe_choice_0",
    "cafe_choice_1",
    "cafe_choice_2",
    "check_missing_stairs",
    "check_saved_video",
    "check_sign_shape",
    "choice_cafe_0",
    "choice_cafe_1",
    "choice_cafe_2",
    "choice_final_stairs",
    "choice_first_crossroad",
    "choice_initial_check",
    "choice_kiosk_0",
    "choice_kiosk_1",
    "choice_kiosk_2",
    "choice_video_response_0",
    "choice_video_response_1",
    "choice_water_sign_0",
    "choice_water_sign_1",
    "close_video_0",
    "close_video_1",
    "ending_bad",
    "ending_bad_lookback",
    "ending_normal",
    "ending_normal_almost",
    "ending_true",
    "final_stairs",
    "first_sign",
    "keep_culture_hint_0",
    "keep_culture_hint_1",
    "keep_culture_hint_2",
    "kiosk_area_0",
    "kiosk_area_1",
    "kiosk_area_2",
    "kiosk_loop_warning_1",
    "kiosk_loop_warning_2",
    "loop_one_after_water",
    "loop_one_from_cafe",
    "loop_one_notice_from_first",
    "loop_three_bad",
    "loop_two_from_cafe",
    "no_connection_comments_0",
    "no_connection_comments_1",
    "no_one_there",
    "normal_waiting_path",
    "opening",
    "rush_past_kiosk_0",
    "rush_past_kiosk_1",
    "rush_past_kiosk_2",
    "safe_first_path",
    "safe_second_path_0",
    "safe_second_path_1",
    "true_video_review",
    "video_hint_after_loop1",
    "video_hint_no_loop",
    "video_phrase",
    "watch_video_more_0",
    "watch_video_more_1",
    "water_corridor_scene_0",
    "water_corridor_scen
```

### check_story_logic.py

- 終了コード: 0

```text
{
  "ok": true,
  "errors": [],
  "warnings": [
    "No condition-based endingCheck rules found. Legacy score-based ending may allow story-state contradictions."
  ]
}

Spreadsheet runtime warmup failed during python startup
Traceback (most recent call last):
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/patches/warm_spreadsheet_runtime_on_startup.py", line 26, in warm_spreadsheet_runtime_on_startup
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/spreadsheet_warmup.py", line 785, in warm_spreadsheet_runtime
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/spreadsheet_warmup.py", line 720, in _warm_feature_flows
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/spreadsheet_warmup.py", line 704, in _warm_collaboration_flows
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/generated/interface/models.py", line 48821, in hydrate_crdt_from_proto
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/rpc/remote.py", line 747, in __call__
  File "/tmp/tmp.9eeVjt35CN/artifact_tool_v2-2.7.5/artifact_tool/rpc/client.py", line 150, in call
artifact_tool.rpc.client.RemoteError: hydrateCrdtFromProto requires an empty collaborative document.
```

---

## 6. 確認済み

- 全scene到達可能
- 未使用sceneなし
- next参照切れなし
- 背景画像参照切れなし
- BAD / NORMAL / TRUE ENDあり
- `compile_scenario.py`: OK
- `check_route_graph.py`: OK
- `check_story_logic.py`: OK

---

## 7. 未確認

- Runtime Engine上での実表示
- iPhone Safariでの読みやすさ
- 背景と文字ウィンドウのコントラスト
- 選択肢39件の体感負荷
- 実読時の読了時間
- BAD END背景の圧迫感が十分か
- NORMAL ENDの余韻が狙い通りか

---

## 8. 注意

`check_route_graph.py` は、30分以内キットの推奨上限25を超える選択肢数について警告する可能性がある。  
今回はテスト用途で分岐を広げる方針のため、警告は既知事項として扱う。
