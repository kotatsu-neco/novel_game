# BACKGROUND_ASSIGNMENT.md

## 1. 背景画像一覧

| background id | ファイル | 用途 |
|---|---|---|
| station_stairs | assets/bg/maze_station_stairs.png | 導入・帰還時の地下駅階段 |
| maze_corridor | assets/bg/maze_corridor.png | 基本の地下通路 |
| crossroad | assets/bg/maze_crossroad.png | 十字路・分岐案内板 |
| water_corridor | assets/bg/maze_water_corridor.png | 洪水のように水が押し寄せる通路 |
| kiosk | assets/bg/maze_kiosk.png | キオスク周辺 |
| cafe | assets/bg/maze_cafe.png | 構内カフェ・NORMAL END |
| stairs_up | assets/bg/maze_stairs_up.png | TRUE END直前の上り階段 |
| bad_end_corridor | assets/bg/maze_bad_end_corridor.png | BAD END専用の均質通路 |
| black_plain | CSS class | 導入の暗転・確認場面 |

## 2. 実際のscene割り当て

### bad_end_corridor
- ending_bad_lookback
- ending_bad

### black_plain
- opening

### cafe
- cafe_choice_0
- choice_cafe_0
- cafe_choice_1
- choice_cafe_1
- cafe_choice_2
- choice_cafe_2
- normal_waiting_path
- true_video_review
- ending_normal
- ending_normal_almost

### crossroad
- first_sign
- choice_first_crossroad
- loop_one_notice_from_first
- water_sign_0
- water_sign_1
- choice_water_sign_0
- choice_water_sign_1
- loop_one_after_water
- loop_one_from_cafe
- loop_two_from_cafe
- loop_three_bad

### kiosk
- kiosk_area_0
- choice_kiosk_0
- keep_culture_hint_0
- kiosk_area_1
- choice_kiosk_1
- keep_culture_hint_1
- kiosk_area_2
- choice_kiosk_2
- keep_culture_hint_2
- kiosk_loop_warning_1
- kiosk_loop_warning_2

### maze_corridor
- no_one_there
- choice_initial_check
- check_missing_stairs
- check_saved_video
- check_sign_shape
- wrong_head_loop1
- wrong_arm_loop1
- safe_first_path
- video_hint_no_loop
- video_hint_after_loop1
- choice_video_response_0
- watch_video_more_0
- close_video_0
- no_connection_comments_0
- choice_video_response_1
- watch_video_more_1
- close_video_1
- no_connection_comments_1
- wrong_feet_loop1_from_water
- wrong_feet_loop2_from_water
- safe_second_path_0
- safe_second_path_1
- rush_past_kiosk_0
- rush_past_kiosk_1
- rush_past_kiosk_2

### stairs_up
- final_stairs
- choice_final_stairs

### station_stairs
- video_phrase
- ending_true

### water_corridor
- water_corridor_scene_0
- water_corridor_scene_1

## 3. v04確認結果

- scene数: 66
- 到達可能scene数: 66
- 未使用scene: なし
- next参照切れ: なし
- 使用background id: bad_end_corridor, black_plain, cafe, crossroad, kiosk, maze_corridor, stairs_up, station_stairs, water_corridor

## 4. 補足

- 背景は必要最小限の8枚構成。
- `black_plain` は画像ではなくCSSクラス扱い。
- BAD ENDでは `bad_end_corridor` を使用し、景色の差が消える絶望感を出す。
- 水の通路は採用済みの洪水版 `maze_water_corridor.png` を使用する。