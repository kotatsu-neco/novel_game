# maze_ui_choice_fix_check_v04.md

## 1. 対象

- `sn_engine_v02b_loop.zip` → `sn_engine_v02c_ui_loop.zip`
- `maze_scenario_pack_loop_v03.zip` → `maze_scenario_pack_loop_v04.zip`
- `maze_publish_loop_v03.zip` → `maze_publish_loop_v04.zip`
- 検査日時UTC: `2026-05-17T13:16:29.191817+00:00`

## 2. 総合判定

**設定画面正本固定・道選択肢修正・静的検査・validator検査・ルート総当たり検査上は合格候補。**

## 3. 正本確認

### 3.1 設定画面
```text
2カラム
左: 表示速度
- 本文
- 台詞
- 文書

右: 文字サイズ
- 本文
- 台詞
- 文書
```

### 3.2 道を選ぶ選択肢
```text
左の道を選ぶ
真ん中の道を選ぶ
右の道を選ぶ
```

## 4. 修正内容
- 設定画面HTMLを正本どおりに固定。
- 旧CSSグリッド断片を削除。
- 旧ラベルを含む古いアーカイブ文書を削除。
- `choice_first_crossroad` と `choice_water_sign` の選択肢を方向だけに変更。
- 説明的なヒントは選択肢ラベルから削除し、直前本文の観察情報側へ残す方針を維持。

## 5. 構造維持
```text
scene数: 49
choice block数: 7
choice option数: 21
routeCheck数: 3
ending数: 4
総当たりルート数: 1863
失敗ルート数: 0
```

## 6. 到達分布
```text
ending_bad: 648
ending_true: 405
ending_normal_almost: 405
ending_normal: 405
```

## 7. 確認済み
- [engine_v02c] all text-like files readable: OK
- [engine_v02c] JSON parse: OK
- [engine_v02c] Markdown fences balanced: OK
- [engine_v02c] no cache/system files: OK
- [engine_v02c] no nested zip: OK
- [engine_v02c] no personal-name path/content hits: OK
- [engine_v02c] no forbidden UI/choice terms: OK
- [engine_v02c] index.html exists for settings validation: OK
- [engine_v02c] base.css exists for settings validation: OK
- [engine_v02c] settings section found before backlog: OK
- [engine_v02c] settings canonical required tokens present: OK
- [engine_v02c] settings label 本文 appears twice: OK
- [engine_v02c] settings label 台詞 appears twice: OK
- [engine_v02c] settings label 文書 appears twice: OK
- [engine_v02c] settings has two column headings: OK
- [engine_v02c] settings uses settings-columns not 旧CSSグリッド: OK
- [engine_v02c] settings CSS has two-column layout: OK
- [engine_v02c] old label 作中 absent from settings: OK
- [engine_v02c] Node syntax OK: src/main.js: OK
- [engine_v02c] Node syntax OK: src/engine/validator.js: OK
- [engine_v02c] engine version marker v02c: OK
- [scenario_loop_v04] all text-like files readable: OK
- [scenario_loop_v04] JSON parse: OK
- [scenario_loop_v04] Markdown fences balanced: OK
- [scenario_loop_v04] no cache/system files: OK
- [scenario_loop_v04] no nested zip: OK
- [scenario_loop_v04] no personal-name path/content hits: OK
- [scenario_loop_v04] no forbidden UI/choice terms: OK
- [scenario_loop_v04] required package files present: OK
- [scenario_loop_v04] manifest engine v02c: OK
- [scenario_loop_v04] main compatibleEngine v02c: OK
- [scenario_loop_v04] choice_first_crossroad path choice labels exact: OK
- [scenario_loop_v04] choice_water_sign path choice labels exact: OK
- [scenario_loop_v04] route/step references valid: OK
- [scenario_loop_v04] scene count remains 49: OK
- [scenario_loop_v04] choice block count remains 7: OK
- [scenario_loop_v04] choice option count remains 21: OK
- [scenario_loop_v04] routeCheck count remains 3: OK
- [scenario_loop_v04] ending count remains 4: OK
- [publish_loop_v04] all text-like files readable: OK
- [publish_loop_v04] JSON parse: OK
- [publish_loop_v04] Markdown fences balanced: OK
- [publish_loop_v04] no cache/system files: OK
- [publish_loop_v04] no nested zip: OK
- [publish_loop_v04] no personal-name path/content hits: OK
- [publish_loop_v04] no forbidden UI/choice terms: OK
- [publish_loop_v04] index.html exists for settings validation: OK
- [publish_loop_v04] base.css exists for settings validation: OK
- [publish_loop_v04] settings section found before backlog: OK
- [publish_loop_v04] settings canonical required tokens present: OK
- [publish_loop_v04] settings label 本文 appears twice: OK
- [publish_loop_v04] settings label 台詞 appears twice: OK
- [publish_loop_v04] settings label 文書 appears twice: OK
- [publish_loop_v04] settings has two column headings: OK
- [publish_loop_v04] settings uses settings-columns not 旧CSSグリッド: OK
- [publish_loop_v04] settings CSS has two-column layout: OK
- [publish_loop_v04] old label 作中 absent from settings: OK
- [publish_loop_v04] publish main.js Node syntax OK: OK
- [publish_loop_v04] required package files present: OK
- [publish_loop_v04] manifest engine v02c: OK
- [publish_loop_v04] main compatibleEngine v02c: OK
- [publish_loop_v04] choice_first_crossroad path choice labels exact: OK
- [publish_loop_v04] choice_water_sign path choice labels exact: OK
- [publish_loop_v04] route/step references valid: OK
- [publish_loop_v04] scene count remains 49: OK
- [publish_loop_v04] choice block count remains 7: OK
- [publish_loop_v04] choice option count remains 21: OK
- [publish_loop_v04] routeCheck count remains 3: OK
- [publish_loop_v04] ending count remains 4: OK
- [scenario_loop_v04] engine v02c runValidator accepts scenario: OK
- [scenario_loop_v04] all enumerated routes terminate: OK
- [scenario_loop_v04] expected ending distribution preserved: OK
- [scenario_loop_v04] total route count preserved: OK

## 8. エラー
なし。

## 9. 未確認
- 実ブラウザ表示
- iPhone Safari実機確認
- 設定画面の実表示
- 背景明度と本文可読性
- 選択肢が簡素化されすぎていないか

## 10. 役割担当レビュー
### 正本確認担当
作業前に設定画面正本と選択肢正本を固定し、それに基づいて検査した。

### UI/UX担当
設定画面は2カラム正本へ固定。選択肢は方向だけにし、選択肢名で答えが出ない形にした。

### 実装担当
エンジンを `sn_engine_v02c_ui_loop` として更新し、publish版にも同じUIを反映した。

### 検証担当
JSON、Markdown、Node構文、validator、route参照、ルート総当たり、設定UIトークンを確認した。

### 批評・矛盾検出担当
旧CSS・旧ラベル資料が残っていたことが混乱要因。今回は削除・置換して再発を抑制した。

### 統合ディレクター
次は `maze_publish_loop_v04.zip` の実機確認。設定画面と道選択肢を重点確認する。


## 11. 全ファイル監査
- [engine_v02c] `AGENTS.md` (9856 bytes, sha256:576b33fccb9e33e9)
- [engine_v02c] `ARCHITECTURE.md` (9932 bytes, sha256:c22039ce3bc5573a)
- [engine_v02c] `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- [engine_v02c] `DESIGN.md` (9155 bytes, sha256:e758488f2bd7049b)
- [engine_v02c] `README.md` (10591 bytes, sha256:f2a1ffc355c7c8e2)
- [engine_v02c] `REPORT.md` (19715 bytes, sha256:3475c1da6fa5ecb5)
- [engine_v02c] `SCENARIO_INSTALL.md` (834 bytes, sha256:3a8824aba7b12825)
- [engine_v02c] `SN_PACKAGE_VERSION.txt` (337 bytes, sha256:1df5f6892bd71ef5)
- [engine_v02c] `SPEC.md` (17697 bytes, sha256:c2ae043a999a304c)
- [engine_v02c] `content/scenario/SCENARIO_SCHEMA.json` (2518 bytes, sha256:5dc80fec15bf3c20)
- [engine_v02c] `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- [engine_v02c] `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- [engine_v02c] `docs/HUMAN_MANUAL.md` (2599 bytes, sha256:733c6d7115ba05d0)
- [engine_v02c] `docs/LICENSES.md` (359 bytes, sha256:e02151f4c8f4b86b)
- [engine_v02c] `docs/PATCH_NOTE_v02.md` (1093 bytes, sha256:ca77ec7fe322d4ea)
- [engine_v02c] `docs/PATCH_NOTE_v02a.md` (1146 bytes, sha256:4d2a70e47cd43ad4)
- [engine_v02c] `docs/PATCH_NOTE_v02b_loop.md` (1010 bytes, sha256:5fc1437f7b9aa4b2)
- [engine_v02c] `docs/SETTINGS_UI_CANON_v02c.md` (471 bytes, sha256:5cb7167aa28df040)
- [engine_v02c] `docs/loop_control_implementation_check_v01.md` (22603 bytes, sha256:addfd828a99ac720)
- [engine_v02c] `docs/sn_engine_author_full_check_v02.md` (12689 bytes, sha256:935a7f49ba81f281)
- [engine_v02c] `docs/sn_engine_author_full_check_v02a.md` (13117 bytes, sha256:222332560c6df8c3)
- [engine_v02c] `docs/sn_text_display_spec_v01.md` (18586 bytes, sha256:8588bf74ffd2ca12)
- [engine_v02c] `index.html` (4694 bytes, sha256:0d12e4371f4e38e9)
- [engine_v02c] `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- [engine_v02c] `src/engine/japaneseLayoutRules.js` (5110 bytes, sha256:e9208a4060120321)
- [engine_v02c] `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- [engine_v02c] `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- [engine_v02c] `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- [engine_v02c] `src/engine/textMeasure.js` (3242 bytes, sha256:93516aa02153a81d)
- [engine_v02c] `src/engine/textPaginator.js` (4572 bytes, sha256:f7ab12cea9899e40)
- [engine_v02c] `src/engine/typewriterController.js` (1693 bytes, sha256:a0b1b08743296e09)
- [engine_v02c] `src/engine/validator.js` (8588 bytes, sha256:80f0c942dc1b82f7)
- [engine_v02c] `src/main.js` (26907 bytes, sha256:87aca68341f69f32)
- [engine_v02c] `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- [engine_v02c] `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- [engine_v02c] `styles/base.css` (13589 bytes, sha256:864c4900116595c6)
- [engine_v02c] `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- [engine_v02c] `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- [engine_v02c] `tests/japanese_layout_cases.json` (1650 bytes, sha256:25d90d811d1164f6)
- [engine_v02c] `tests/run_japanese_layout_static_tests.mjs` (1500 bytes, sha256:e3131f2ba2259c94)
- [engine_v02c] `tools/check_japanese_layout_rules.py` (5987 bytes, sha256:fde32243e4e09adc)
- [engine_v02c] `tools/check_route_graph.py` (9515 bytes, sha256:a73704c9e9fd2e77)
- [engine_v02c] `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- [engine_v02c] `tools/compile_scenario.py` (27535 bytes, sha256:2472ecd2275dc0be)
- [engine_v02c] `tools/publish_game.py` (2213 bytes, sha256:64ad84207f906009)
- [engine_v02c] `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)
- [scenario_loop_v04] `PACK_INFO.json` (491 bytes, sha256:0c186a25a8682608)
- [scenario_loop_v04] `README_MOUNTED.md` (1224 bytes, sha256:c426154f43b33804)
- [scenario_loop_v04] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [scenario_loop_v04] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [scenario_loop_v04] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [scenario_loop_v04] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [scenario_loop_v04] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [scenario_loop_v04] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [scenario_loop_v04] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [scenario_loop_v04] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [scenario_loop_v04] `content/manifest.json` (4099 bytes, sha256:63862546e7f51f37)
- [scenario_loop_v04] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [scenario_loop_v04] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [scenario_loop_v04] `content/scenario/LOOP_REFACTOR_REPORT.md` (1995 bytes, sha256:f98ee6021dcc86b0)
- [scenario_loop_v04] `content/scenario/OPENING_DEPTH_REVISION_REPORT.md` (1134 bytes, sha256:4f1355b80359c24d)
- [scenario_loop_v04] `content/scenario/README_FOR_AUTHOR.md` (3323 bytes, sha256:69473acb53ca4a85)
- [scenario_loop_v04] `content/scenario/REPORT.md` (8055 bytes, sha256:b2817cb360412120)
- [scenario_loop_v04] `content/scenario/SCENARIO_SOURCE.md` (34179 bytes, sha256:df9152a1a5c828fc)
- [scenario_loop_v04] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [scenario_loop_v04] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [scenario_loop_v04] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [scenario_loop_v04] `content/scenario/STORY_BIBLE.md` (6577 bytes, sha256:665a97d9a76330fa)
- [scenario_loop_v04] `content/scenario/UI_CHOICE_CANON_FIX_REPORT.md` (751 bytes, sha256:88c8be981aae2ccd)
- [scenario_loop_v04] `content/scenario/WORDING_REVISION_REPORT.md` (1120 bytes, sha256:3070b18b00da6b65)
- [scenario_loop_v04] `content/scenario/main.json` (51363 bytes, sha256:07c4822d6ef81712)
- [scenario_loop_v04] `content/scenario/maze_opening_depth_check_v03.md` (13761 bytes, sha256:6203631cbbf96009)
- [scenario_loop_v04] `content/scenario/maze_wording_revision_check_v02.md` (12780 bytes, sha256:7567d8778b89666d)
- [publish_loop_v04] `AGENTS.md` (9856 bytes, sha256:576b33fccb9e33e9)
- [publish_loop_v04] `ARCHITECTURE.md` (9932 bytes, sha256:c22039ce3bc5573a)
- [publish_loop_v04] `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- [publish_loop_v04] `DESIGN.md` (9155 bytes, sha256:e758488f2bd7049b)
- [publish_loop_v04] `PUBLISH_INFO.json` (512 bytes, sha256:2343837199115607)
- [publish_loop_v04] `README.md` (10591 bytes, sha256:f2a1ffc355c7c8e2)
- [publish_loop_v04] `README_MOUNTED.md` (214 bytes, sha256:d48ebaad26b283ce)
- [publish_loop_v04] `REPORT.md` (19715 bytes, sha256:3475c1da6fa5ecb5)
- [publish_loop_v04] `SCENARIO_INSTALL.md` (834 bytes, sha256:3a8824aba7b12825)
- [publish_loop_v04] `SN_PACKAGE_VERSION.txt` (337 bytes, sha256:1df5f6892bd71ef5)
- [publish_loop_v04] `SPEC.md` (17697 bytes, sha256:c2ae043a999a304c)
- [publish_loop_v04] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [publish_loop_v04] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [publish_loop_v04] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [publish_loop_v04] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [publish_loop_v04] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [publish_loop_v04] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [publish_loop_v04] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [publish_loop_v04] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [publish_loop_v04] `content/manifest.json` (4099 bytes, sha256:63862546e7f51f37)
- [publish_loop_v04] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [publish_loop_v04] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [publish_loop_v04] `content/scenario/LOOP_REFACTOR_REPORT.md` (1995 bytes, sha256:f98ee6021dcc86b0)
- [publish_loop_v04] `content/scenario/OPENING_DEPTH_REVISION_REPORT.md` (1134 bytes, sha256:4f1355b80359c24d)
- [publish_loop_v04] `content/scenario/README_FOR_AUTHOR.md` (3323 bytes, sha256:69473acb53ca4a85)
- [publish_loop_v04] `content/scenario/REPORT.md` (8055 bytes, sha256:b2817cb360412120)
- [publish_loop_v04] `content/scenario/SCENARIO_SOURCE.md` (34179 bytes, sha256:df9152a1a5c828fc)
- [publish_loop_v04] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [publish_loop_v04] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [publish_loop_v04] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [publish_loop_v04] `content/scenario/STORY_BIBLE.md` (6577 bytes, sha256:665a97d9a76330fa)
- [publish_loop_v04] `content/scenario/UI_CHOICE_CANON_FIX_REPORT.md` (751 bytes, sha256:88c8be981aae2ccd)
- [publish_loop_v04] `content/scenario/WORDING_REVISION_REPORT.md` (1120 bytes, sha256:3070b18b00da6b65)
- [publish_loop_v04] `content/scenario/main.json` (51363 bytes, sha256:07c4822d6ef81712)
- [publish_loop_v04] `content/scenario/maze_opening_depth_check_v03.md` (13761 bytes, sha256:6203631cbbf96009)
- [publish_loop_v04] `content/scenario/maze_wording_revision_check_v02.md` (12780 bytes, sha256:7567d8778b89666d)
- [publish_loop_v04] `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- [publish_loop_v04] `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- [publish_loop_v04] `docs/HUMAN_MANUAL.md` (2599 bytes, sha256:733c6d7115ba05d0)
- [publish_loop_v04] `docs/LICENSES.md` (359 bytes, sha256:e02151f4c8f4b86b)
- [publish_loop_v04] `docs/PATCH_NOTE_v02.md` (1093 bytes, sha256:ca77ec7fe322d4ea)
- [publish_loop_v04] `docs/PATCH_NOTE_v02a.md` (1146 bytes, sha256:4d2a70e47cd43ad4)
- [publish_loop_v04] `docs/PATCH_NOTE_v02b_loop.md` (1010 bytes, sha256:5fc1437f7b9aa4b2)
- [publish_loop_v04] `docs/SETTINGS_UI_CANON_v02c.md` (471 bytes, sha256:5cb7167aa28df040)
- [publish_loop_v04] `docs/loop_control_implementation_check_v01.md` (22603 bytes, sha256:addfd828a99ac720)
- [publish_loop_v04] `docs/sn_engine_author_full_check_v02.md` (12689 bytes, sha256:935a7f49ba81f281)
- [publish_loop_v04] `docs/sn_engine_author_full_check_v02a.md` (13117 bytes, sha256:222332560c6df8c3)
- [publish_loop_v04] `docs/sn_text_display_spec_v01.md` (18586 bytes, sha256:8588bf74ffd2ca12)
- [publish_loop_v04] `index.html` (4694 bytes, sha256:0d12e4371f4e38e9)
- [publish_loop_v04] `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- [publish_loop_v04] `src/engine/japaneseLayoutRules.js` (5110 bytes, sha256:e9208a4060120321)
- [publish_loop_v04] `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- [publish_loop_v04] `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- [publish_loop_v04] `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- [publish_loop_v04] `src/engine/textMeasure.js` (3242 bytes, sha256:93516aa02153a81d)
- [publish_loop_v04] `src/engine/textPaginator.js` (4572 bytes, sha256:f7ab12cea9899e40)
- [publish_loop_v04] `src/engine/typewriterController.js` (1693 bytes, sha256:a0b1b08743296e09)
- [publish_loop_v04] `src/engine/validator.js` (8588 bytes, sha256:80f0c942dc1b82f7)
- [publish_loop_v04] `src/main.js` (26907 bytes, sha256:87aca68341f69f32)
- [publish_loop_v04] `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- [publish_loop_v04] `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- [publish_loop_v04] `styles/base.css` (13589 bytes, sha256:864c4900116595c6)
- [publish_loop_v04] `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- [publish_loop_v04] `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- [publish_loop_v04] `tests/japanese_layout_cases.json` (1650 bytes, sha256:25d90d811d1164f6)
- [publish_loop_v04] `tests/run_japanese_layout_static_tests.mjs` (1500 bytes, sha256:e3131f2ba2259c94)
- [publish_loop_v04] `tools/check_japanese_layout_rules.py` (5987 bytes, sha256:fde32243e4e09adc)
- [publish_loop_v04] `tools/check_route_graph.py` (9515 bytes, sha256:a73704c9e9fd2e77)
- [publish_loop_v04] `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- [publish_loop_v04] `tools/compile_scenario.py` (27535 bytes, sha256:2472ecd2275dc0be)
- [publish_loop_v04] `tools/publish_game.py` (2213 bytes, sha256:64ad84207f906009)
- [publish_loop_v04] `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)