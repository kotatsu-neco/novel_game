# speed_slider_revision_check_v05.md

## 1. 対象

- `sn_engine_v02c_ui_loop.zip` → `sn_engine_v02d_speed_slider.zip`
- `maze_scenario_pack_loop_v04.zip` → `maze_scenario_pack_loop_v05.zip`
- `maze_publish_loop_v04.zip` → `maze_publish_loop_v05.zip`
- 検査日時UTC: `2026-05-17T13:24:27.856795+00:00`

## 2. 総合判定

**速度スライダー化・標準速度の低速寄せ・静的検査・validator検査・ルート総当たり検査上は合格候補。**

## 3. 正本

### 3.1 表示速度
```text
0 とてもゆっくり
1 ゆっくり
2 標準
3 速い
4 瞬時
```

### 3.2 デフォルト
```text
2 標準
```

### 3.3 設定画面
```text
左カラム:
表示速度
- 本文 slider
- 台詞 slider
- 文書 slider

右カラム:
文字サイズ
- 本文 select
- 台詞 select
- 文書 select
```

## 4. 実装内容
- 表示速度UIを select から range slider へ変更。
- 速度段階ごとに ms/char をJS側で定義。
- デフォルトを `2 標準` に設定。
- 従来より文字送りをゆっくり側へ寄せた。
- 旧保存値 `slow / normal / fast / instant` を新しい段階へ自動変換。

## 5. ms/char
```text
本文: 0=85 / 1=70 / 2=55 / 3=35 / 4=0
台詞: 0=105 / 1=86 / 2=68 / 3=45 / 4=0
文書: 0=42 / 1=34 / 2=26 / 3=16 / 4=0
```

## 6. 構造維持
```text
scene数: 49
choice block数: 7
choice option数: 21
routeCheck数: 3
ending数: 4
総当たりルート数: 1863
失敗ルート数: 0
```

## 7. 到達分布
```text
ending_bad: 648
ending_true: 405
ending_normal_almost: 405
ending_normal: 405
```

## 8. 確認済み
- [engine_v02d] all text-like files readable: OK
- [engine_v02d] JSON parse: OK
- [engine_v02d] Markdown fences balanced: OK
- [engine_v02d] no cache/system files: OK
- [engine_v02d] no nested zip: OK
- [engine_v02d] no personal-name path/content hits: OK
- [engine_v02d] no forbidden old terms: OK
- [engine_v02d] index.html exists: OK
- [engine_v02d] base.css exists: OK
- [engine_v02d] main.js exists: OK
- [engine_v02d] settings section found before backlog: OK
- [engine_v02d] speed slider settings required tokens present: OK
- [engine_v02d] speed controls are range inputs: OK
- [engine_v02d] font controls remain selects: OK
- [engine_v02d] settings has two column headings: OK
- [engine_v02d] settings labels remain 本文/台詞/文書: OK
- [engine_v02d] no old select speed options: OK
- [engine_v02d] JS uses speedControls not speedSelects: OK
- [engine_v02d] JS has speed level defaults: OK
- [engine_v02d] JS maps old storage values: OK
- [engine_v02d] JS typewriterSpeed uses speedLevelMs: OK
- [engine_v02d] CSS has two-column settings layout: OK
- [engine_v02d] Node syntax OK: src/main.js: OK
- [engine_v02d] Node syntax OK: src/engine/validator.js: OK
- [engine_v02d] engine version marker v02d: OK
- [scenario_loop_v05] all text-like files readable: OK
- [scenario_loop_v05] JSON parse: OK
- [scenario_loop_v05] Markdown fences balanced: OK
- [scenario_loop_v05] no cache/system files: OK
- [scenario_loop_v05] no nested zip: OK
- [scenario_loop_v05] no personal-name path/content hits: OK
- [scenario_loop_v05] no forbidden old terms: OK
- [scenario_loop_v05] required package files present: OK
- [scenario_loop_v05] manifest engine v02d: OK
- [scenario_loop_v05] main compatibleEngine v02d: OK
- [scenario_loop_v05] manifest default speed level is 2: OK
- [scenario_loop_v05] manifest speed slider enabled: OK
- [scenario_loop_v05] route/step references valid: OK
- [scenario_loop_v05] scene count remains 49: OK
- [scenario_loop_v05] choice block count remains 7: OK
- [scenario_loop_v05] choice option count remains 21: OK
- [scenario_loop_v05] routeCheck count remains 3: OK
- [scenario_loop_v05] ending count remains 4: OK
- [publish_loop_v05] all text-like files readable: OK
- [publish_loop_v05] JSON parse: OK
- [publish_loop_v05] Markdown fences balanced: OK
- [publish_loop_v05] no cache/system files: OK
- [publish_loop_v05] no nested zip: OK
- [publish_loop_v05] no personal-name path/content hits: OK
- [publish_loop_v05] no forbidden old terms: OK
- [publish_loop_v05] index.html exists: OK
- [publish_loop_v05] base.css exists: OK
- [publish_loop_v05] main.js exists: OK
- [publish_loop_v05] settings section found before backlog: OK
- [publish_loop_v05] speed slider settings required tokens present: OK
- [publish_loop_v05] speed controls are range inputs: OK
- [publish_loop_v05] font controls remain selects: OK
- [publish_loop_v05] settings has two column headings: OK
- [publish_loop_v05] settings labels remain 本文/台詞/文書: OK
- [publish_loop_v05] no old select speed options: OK
- [publish_loop_v05] JS uses speedControls not speedSelects: OK
- [publish_loop_v05] JS has speed level defaults: OK
- [publish_loop_v05] JS maps old storage values: OK
- [publish_loop_v05] JS typewriterSpeed uses speedLevelMs: OK
- [publish_loop_v05] CSS has two-column settings layout: OK
- [publish_loop_v05] publish main.js Node syntax OK: OK
- [publish_loop_v05] required package files present: OK
- [publish_loop_v05] manifest engine v02d: OK
- [publish_loop_v05] main compatibleEngine v02d: OK
- [publish_loop_v05] manifest default speed level is 2: OK
- [publish_loop_v05] manifest speed slider enabled: OK
- [publish_loop_v05] route/step references valid: OK
- [publish_loop_v05] scene count remains 49: OK
- [publish_loop_v05] choice block count remains 7: OK
- [publish_loop_v05] choice option count remains 21: OK
- [publish_loop_v05] routeCheck count remains 3: OK
- [publish_loop_v05] ending count remains 4: OK
- [scenario_loop_v05] engine v02d runValidator accepts scenario: OK
- [scenario_loop_v05] all enumerated routes terminate: OK
- [scenario_loop_v05] expected ending distribution preserved: OK
- [scenario_loop_v05] total route count preserved: OK

## 9. エラー
なし。

## 10. 未確認
- 実ブラウザ表示
- iPhone Safari実機確認
- スライダー操作の実表示
- 速度の体感
- 既存localStorageがある端末での移行挙動
- 背景明度と本文可読性

## 11. 役割担当レビュー
### 正本確認担当
速度段階と設定画面配置を正本化してから実装した。

### UI/UX担当
表示速度はスライダー、文字サイズはselectのまま維持。設定画面の2カラム構造は維持した。

### 実装担当
`speedControls` / `SPEED_LEVELS` / `normalizeSpeedLevel` / `speedLevelMs` を追加し、旧select依存を削除した。

### 検証担当
JSON、Markdown、Node構文、validator、設定UIトークン、ルート総当たりを確認した。

### 批評・矛盾検出担当
旧UIでは速度差が実質反映されにくい構造だったため、JS側に速度表を持たせた点は妥当。

### 統合ディレクター
次は `maze_publish_loop_v05.zip` の実機確認。設定画面のスライダー表示と速度体感を重点確認する。


## 12. 全ファイル監査
- [engine_v02d] `AGENTS.md` (9856 bytes, sha256:576b33fccb9e33e9)
- [engine_v02d] `ARCHITECTURE.md` (9932 bytes, sha256:c22039ce3bc5573a)
- [engine_v02d] `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- [engine_v02d] `DESIGN.md` (9155 bytes, sha256:e758488f2bd7049b)
- [engine_v02d] `README.md` (10591 bytes, sha256:f2a1ffc355c7c8e2)
- [engine_v02d] `REPORT.md` (19715 bytes, sha256:3475c1da6fa5ecb5)
- [engine_v02d] `SCENARIO_INSTALL.md` (834 bytes, sha256:3a8824aba7b12825)
- [engine_v02d] `SN_PACKAGE_VERSION.txt` (397 bytes, sha256:862da01ffb885b83)
- [engine_v02d] `SPEC.md` (17697 bytes, sha256:c2ae043a999a304c)
- [engine_v02d] `content/scenario/SCENARIO_SCHEMA.json` (2518 bytes, sha256:5dc80fec15bf3c20)
- [engine_v02d] `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- [engine_v02d] `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- [engine_v02d] `docs/HUMAN_MANUAL.md` (2599 bytes, sha256:733c6d7115ba05d0)
- [engine_v02d] `docs/LICENSES.md` (359 bytes, sha256:e02151f4c8f4b86b)
- [engine_v02d] `docs/PATCH_NOTE_v02.md` (1093 bytes, sha256:ca77ec7fe322d4ea)
- [engine_v02d] `docs/PATCH_NOTE_v02a.md` (1146 bytes, sha256:4d2a70e47cd43ad4)
- [engine_v02d] `docs/PATCH_NOTE_v02b_loop.md` (1010 bytes, sha256:5fc1437f7b9aa4b2)
- [engine_v02d] `docs/SETTINGS_UI_CANON_v02c.md` (471 bytes, sha256:5cb7167aa28df040)
- [engine_v02d] `docs/SPEED_SLIDER_POLICY_v02d.md` (630 bytes, sha256:e1ce019c31cac071)
- [engine_v02d] `docs/loop_control_implementation_check_v01.md` (22603 bytes, sha256:addfd828a99ac720)
- [engine_v02d] `docs/maze_ui_choice_fix_check_v04.md` (19302 bytes, sha256:3a418cc883534304)
- [engine_v02d] `docs/sn_engine_author_full_check_v02.md` (12689 bytes, sha256:935a7f49ba81f281)
- [engine_v02d] `docs/sn_engine_author_full_check_v02a.md` (13117 bytes, sha256:222332560c6df8c3)
- [engine_v02d] `docs/sn_text_display_spec_v01.md` (18586 bytes, sha256:8588bf74ffd2ca12)
- [engine_v02d] `index.html` (4540 bytes, sha256:f612dbc6f91e31b4)
- [engine_v02d] `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- [engine_v02d] `src/engine/japaneseLayoutRules.js` (5110 bytes, sha256:e9208a4060120321)
- [engine_v02d] `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- [engine_v02d] `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- [engine_v02d] `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- [engine_v02d] `src/engine/textMeasure.js` (3242 bytes, sha256:93516aa02153a81d)
- [engine_v02d] `src/engine/textPaginator.js` (4572 bytes, sha256:f7ab12cea9899e40)
- [engine_v02d] `src/engine/typewriterController.js` (1693 bytes, sha256:a0b1b08743296e09)
- [engine_v02d] `src/engine/validator.js` (8588 bytes, sha256:80f0c942dc1b82f7)
- [engine_v02d] `src/main.js` (28939 bytes, sha256:4112a21556f5f33f)
- [engine_v02d] `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- [engine_v02d] `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- [engine_v02d] `styles/base.css` (13906 bytes, sha256:455ac63bd6be7608)
- [engine_v02d] `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- [engine_v02d] `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- [engine_v02d] `tests/japanese_layout_cases.json` (1650 bytes, sha256:25d90d811d1164f6)
- [engine_v02d] `tests/run_japanese_layout_static_tests.mjs` (1500 bytes, sha256:e3131f2ba2259c94)
- [engine_v02d] `tools/check_japanese_layout_rules.py` (5987 bytes, sha256:fde32243e4e09adc)
- [engine_v02d] `tools/check_route_graph.py` (9515 bytes, sha256:a73704c9e9fd2e77)
- [engine_v02d] `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- [engine_v02d] `tools/compile_scenario.py` (27535 bytes, sha256:2472ecd2275dc0be)
- [engine_v02d] `tools/publish_game.py` (2213 bytes, sha256:64ad84207f906009)
- [engine_v02d] `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)
- [scenario_loop_v05] `PACK_INFO.json` (522 bytes, sha256:8b4f2fca8c6e6307)
- [scenario_loop_v05] `README_MOUNTED.md` (1438 bytes, sha256:963d1d0d6c4cd820)
- [scenario_loop_v05] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [scenario_loop_v05] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [scenario_loop_v05] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [scenario_loop_v05] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [scenario_loop_v05] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [scenario_loop_v05] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [scenario_loop_v05] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [scenario_loop_v05] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [scenario_loop_v05] `content/manifest.json` (4345 bytes, sha256:8842f0ae3b49322f)
- [scenario_loop_v05] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [scenario_loop_v05] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [scenario_loop_v05] `content/scenario/LOOP_REFACTOR_REPORT.md` (1995 bytes, sha256:f98ee6021dcc86b0)
- [scenario_loop_v05] `content/scenario/OPENING_DEPTH_REVISION_REPORT.md` (1134 bytes, sha256:4f1355b80359c24d)
- [scenario_loop_v05] `content/scenario/README_FOR_AUTHOR.md` (3323 bytes, sha256:69473acb53ca4a85)
- [scenario_loop_v05] `content/scenario/REPORT.md` (8055 bytes, sha256:b2817cb360412120)
- [scenario_loop_v05] `content/scenario/SCENARIO_SOURCE.md` (34179 bytes, sha256:df9152a1a5c828fc)
- [scenario_loop_v05] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [scenario_loop_v05] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [scenario_loop_v05] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [scenario_loop_v05] `content/scenario/SPEED_SLIDER_REVISION_REPORT.md` (742 bytes, sha256:115fd5afdd5874e2)
- [scenario_loop_v05] `content/scenario/STORY_BIBLE.md` (6577 bytes, sha256:665a97d9a76330fa)
- [scenario_loop_v05] `content/scenario/UI_CHOICE_CANON_FIX_REPORT.md` (751 bytes, sha256:88c8be981aae2ccd)
- [scenario_loop_v05] `content/scenario/WORDING_REVISION_REPORT.md` (1120 bytes, sha256:3070b18b00da6b65)
- [scenario_loop_v05] `content/scenario/main.json` (51534 bytes, sha256:65469ab31eed08f2)
- [scenario_loop_v05] `content/scenario/maze_opening_depth_check_v03.md` (13761 bytes, sha256:6203631cbbf96009)
- [scenario_loop_v05] `content/scenario/maze_ui_choice_fix_check_v04.md` (19302 bytes, sha256:3a418cc883534304)
- [scenario_loop_v05] `content/scenario/maze_wording_revision_check_v02.md` (12780 bytes, sha256:7567d8778b89666d)
- [publish_loop_v05] `AGENTS.md` (9856 bytes, sha256:576b33fccb9e33e9)
- [publish_loop_v05] `ARCHITECTURE.md` (9932 bytes, sha256:c22039ce3bc5573a)
- [publish_loop_v05] `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- [publish_loop_v05] `DESIGN.md` (9155 bytes, sha256:e758488f2bd7049b)
- [publish_loop_v05] `PUBLISH_INFO.json` (543 bytes, sha256:58007ade0c7897e6)
- [publish_loop_v05] `README.md` (10591 bytes, sha256:f2a1ffc355c7c8e2)
- [publish_loop_v05] `README_MOUNTED.md` (214 bytes, sha256:0e22fb9d269e7c99)
- [publish_loop_v05] `REPORT.md` (19715 bytes, sha256:3475c1da6fa5ecb5)
- [publish_loop_v05] `SCENARIO_INSTALL.md` (834 bytes, sha256:3a8824aba7b12825)
- [publish_loop_v05] `SN_PACKAGE_VERSION.txt` (397 bytes, sha256:862da01ffb885b83)
- [publish_loop_v05] `SPEC.md` (17697 bytes, sha256:c2ae043a999a304c)
- [publish_loop_v05] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [publish_loop_v05] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [publish_loop_v05] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [publish_loop_v05] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [publish_loop_v05] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [publish_loop_v05] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [publish_loop_v05] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [publish_loop_v05] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [publish_loop_v05] `content/manifest.json` (4345 bytes, sha256:8842f0ae3b49322f)
- [publish_loop_v05] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [publish_loop_v05] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [publish_loop_v05] `content/scenario/LOOP_REFACTOR_REPORT.md` (1995 bytes, sha256:f98ee6021dcc86b0)
- [publish_loop_v05] `content/scenario/OPENING_DEPTH_REVISION_REPORT.md` (1134 bytes, sha256:4f1355b80359c24d)
- [publish_loop_v05] `content/scenario/README_FOR_AUTHOR.md` (3323 bytes, sha256:69473acb53ca4a85)
- [publish_loop_v05] `content/scenario/REPORT.md` (8055 bytes, sha256:b2817cb360412120)
- [publish_loop_v05] `content/scenario/SCENARIO_SOURCE.md` (34179 bytes, sha256:df9152a1a5c828fc)
- [publish_loop_v05] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [publish_loop_v05] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [publish_loop_v05] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [publish_loop_v05] `content/scenario/SPEED_SLIDER_REVISION_REPORT.md` (742 bytes, sha256:115fd5afdd5874e2)
- [publish_loop_v05] `content/scenario/STORY_BIBLE.md` (6577 bytes, sha256:665a97d9a76330fa)
- [publish_loop_v05] `content/scenario/UI_CHOICE_CANON_FIX_REPORT.md` (751 bytes, sha256:88c8be981aae2ccd)
- [publish_loop_v05] `content/scenario/WORDING_REVISION_REPORT.md` (1120 bytes, sha256:3070b18b00da6b65)
- [publish_loop_v05] `content/scenario/main.json` (51534 bytes, sha256:65469ab31eed08f2)
- [publish_loop_v05] `content/scenario/maze_opening_depth_check_v03.md` (13761 bytes, sha256:6203631cbbf96009)
- [publish_loop_v05] `content/scenario/maze_ui_choice_fix_check_v04.md` (19302 bytes, sha256:3a418cc883534304)
- [publish_loop_v05] `content/scenario/maze_wording_revision_check_v02.md` (12780 bytes, sha256:7567d8778b89666d)
- [publish_loop_v05] `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- [publish_loop_v05] `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- [publish_loop_v05] `docs/HUMAN_MANUAL.md` (2599 bytes, sha256:733c6d7115ba05d0)
- [publish_loop_v05] `docs/LICENSES.md` (359 bytes, sha256:e02151f4c8f4b86b)
- [publish_loop_v05] `docs/PATCH_NOTE_v02.md` (1093 bytes, sha256:ca77ec7fe322d4ea)
- [publish_loop_v05] `docs/PATCH_NOTE_v02a.md` (1146 bytes, sha256:4d2a70e47cd43ad4)
- [publish_loop_v05] `docs/PATCH_NOTE_v02b_loop.md` (1010 bytes, sha256:5fc1437f7b9aa4b2)
- [publish_loop_v05] `docs/SETTINGS_UI_CANON_v02c.md` (471 bytes, sha256:5cb7167aa28df040)
- [publish_loop_v05] `docs/SPEED_SLIDER_POLICY_v02d.md` (630 bytes, sha256:e1ce019c31cac071)
- [publish_loop_v05] `docs/loop_control_implementation_check_v01.md` (22603 bytes, sha256:addfd828a99ac720)
- [publish_loop_v05] `docs/maze_ui_choice_fix_check_v04.md` (19302 bytes, sha256:3a418cc883534304)
- [publish_loop_v05] `docs/sn_engine_author_full_check_v02.md` (12689 bytes, sha256:935a7f49ba81f281)
- [publish_loop_v05] `docs/sn_engine_author_full_check_v02a.md` (13117 bytes, sha256:222332560c6df8c3)
- [publish_loop_v05] `docs/sn_text_display_spec_v01.md` (18586 bytes, sha256:8588bf74ffd2ca12)
- [publish_loop_v05] `index.html` (4540 bytes, sha256:f612dbc6f91e31b4)
- [publish_loop_v05] `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- [publish_loop_v05] `src/engine/japaneseLayoutRules.js` (5110 bytes, sha256:e9208a4060120321)
- [publish_loop_v05] `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- [publish_loop_v05] `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- [publish_loop_v05] `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- [publish_loop_v05] `src/engine/textMeasure.js` (3242 bytes, sha256:93516aa02153a81d)
- [publish_loop_v05] `src/engine/textPaginator.js` (4572 bytes, sha256:f7ab12cea9899e40)
- [publish_loop_v05] `src/engine/typewriterController.js` (1693 bytes, sha256:a0b1b08743296e09)
- [publish_loop_v05] `src/engine/validator.js` (8588 bytes, sha256:80f0c942dc1b82f7)
- [publish_loop_v05] `src/main.js` (28939 bytes, sha256:4112a21556f5f33f)
- [publish_loop_v05] `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- [publish_loop_v05] `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- [publish_loop_v05] `styles/base.css` (13906 bytes, sha256:455ac63bd6be7608)
- [publish_loop_v05] `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- [publish_loop_v05] `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- [publish_loop_v05] `tests/japanese_layout_cases.json` (1650 bytes, sha256:25d90d811d1164f6)
- [publish_loop_v05] `tests/run_japanese_layout_static_tests.mjs` (1500 bytes, sha256:e3131f2ba2259c94)
- [publish_loop_v05] `tools/check_japanese_layout_rules.py` (5987 bytes, sha256:fde32243e4e09adc)
- [publish_loop_v05] `tools/check_route_graph.py` (9515 bytes, sha256:a73704c9e9fd2e77)
- [publish_loop_v05] `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- [publish_loop_v05] `tools/compile_scenario.py` (27535 bytes, sha256:2472ecd2275dc0be)
- [publish_loop_v05] `tools/publish_game.py` (2213 bytes, sha256:64ad84207f906009)
- [publish_loop_v05] `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)