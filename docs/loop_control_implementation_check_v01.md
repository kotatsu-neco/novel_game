# loop_control_implementation_check_v01.md

## 1. 対象

- `sn_engine_v02b_loop.zip`
- `sn_author_kit_v02f_loop.zip`
- `maze_scenario_pack_loop_v01.zip`
- `maze_publish_loop_v01.zip`
- 検査日時UTC: `2026-05-17T12:36:21.894609+00:00`

## 2. 総合判定

**エンジン視点の静的検査・ルート検査・参照検査上は合格候補。**

## 3. 実装内容

### エンジン
- `sn_engine_v02b_loop` として、`routeCheck` step を追加。
- choice / routeCheck rule / endingCheck rule で `increment` / `inc` / `decrement` / `dec` / `set` / `score` / `ending` を扱えるようにした。
- 既存の `choice.set` / `choice.score` / `forceEnding` / `endingCheck` は維持。

### 作成キット
- `manuals/LOOP_CONTROL_RULES.md` を追加。
- `scenario_templates/LOOP_CONTROL_TEMPLATE.md` を追加。
- `ai_workflow/13_AI_LOOP_ROUTE_REVIEW_PROMPT.md` を追加。

### 迷路
- scene複製方式を `mazeLoopCount` + `routeCheck` 方式へリファクタリング。
- Runtime同期版 `SCENARIO_SOURCE.md` を再生成。
- 元ソースは `ORIGINAL_SCENARIO_SOURCE_BEFORE_LOOP_REFACTOR.md` として保存。

## 4. 迷路の変更前後

```text
scene数: 66 → 49
choice block数: 13 → 7
choice option数: 39 → 21
routeCheck数: 0 → 3
```

## 5. 確認済み

- [engine_v02b] text files readable: OK
- [engine_v02b] JSON parse: OK
- [engine_v02b] Markdown fences balanced: OK
- [engine_v02b] no cache/system files: OK
- [engine_v02b] no nested zip: OK
- [engine_v02b] no personal-name path/content hits: OK
- [engine_v02b] required engine files exist: OK
- [engine_v02b] node syntax src/main.js: OK
- [engine_v02b] node syntax src/engine/validator.js: OK
- [engine_v02b] routeCheck implemented in main: OK
- [engine_v02b] increment effects implemented: OK
- [engine_v02b] validator allows routeCheck: OK
- [author_kit_v02f] text files readable: OK
- [author_kit_v02f] JSON parse: OK
- [author_kit_v02f] Markdown fences balanced: OK
- [author_kit_v02f] no cache/system files: OK
- [author_kit_v02f] no nested zip: OK
- [author_kit_v02f] no personal-name path/content hits: OK
- [author_kit_v02f] loop authoring files exist: OK
- [author_kit_v02f] author kit mentions routeCheck and increment: OK
- [author_kit_v02f] author kit version v02f_loop: OK
- [maze_scenario_loop] text files readable: OK
- [maze_scenario_loop] JSON parse: OK
- [maze_scenario_loop] Markdown fences balanced: OK
- [maze_scenario_loop] no cache/system files: OK
- [maze_scenario_loop] no nested zip: OK
- [maze_scenario_loop] no personal-name path/content hits: OK
- [maze_scenario_loop] required maze files exist: OK
- [maze_scenario_loop] manifest engine v02b: OK
- [maze_scenario_loop] main compatibleEngine v02b: OK
- [maze_scenario_loop] loop state defaults present: OK
- [maze_scenario_loop] route refs valid: OK
- [maze_scenario_loop] all scenes reachable: OK
- [maze_scenario_loop] scene count reduced to 49: OK
- [maze_scenario_loop] choice blocks reduced to 7: OK
- [maze_scenario_loop] choice options reduced to 21: OK
- [maze_scenario_loop] routeCheck count 3: OK
- [maze_scenario_loop] ending count 4: OK
- [maze_scenario_loop] background specs exist: OK
- [maze_scenario_loop] background assets exist: OK
- [maze_publish_loop] text files readable: OK
- [maze_publish_loop] JSON parse: OK
- [maze_publish_loop] Markdown fences balanced: OK
- [maze_publish_loop] no cache/system files: OK
- [maze_publish_loop] no nested zip: OK
- [maze_publish_loop] no personal-name path/content hits: OK
- [maze_publish_loop] required maze files exist: OK
- [maze_publish_loop] manifest engine v02b: OK
- [maze_publish_loop] main compatibleEngine v02b: OK
- [maze_publish_loop] loop state defaults present: OK
- [maze_publish_loop] route refs valid: OK
- [maze_publish_loop] all scenes reachable: OK
- [maze_publish_loop] scene count reduced to 49: OK
- [maze_publish_loop] choice blocks reduced to 7: OK
- [maze_publish_loop] choice options reduced to 21: OK
- [maze_publish_loop] routeCheck count 3: OK
- [maze_publish_loop] ending count 4: OK
- [maze_publish_loop] background specs exist: OK
- [maze_publish_loop] background assets exist: OK
- [maze_publish_loop] publish main.js syntax: OK

## 6. エラー

なし。

## 7. 未確認

- 実ブラウザ表示
- iPhone Safari実機確認
- 実操作での mazeLoopCount 加算確認
- 3回目ループでBAD ENDへ進むことの実機確認
- 背景WebPの主観品質
- 背景明度と本文可読性

## 8. 役割担当レビュー

### 正本確認担当
Runtime同期版 `SCENARIO_SOURCE.md` を作り直し、旧ソースは別名保存した。

### 実装担当
エンジンに `routeCheck` と state effect を追加し、既存仕様を壊さない形にした。

### 検証担当
JSON parse、Markdown fence、Node構文確認、route参照、全scene到達性、背景パスを確認した。

### UI/UX担当
表示UIは変更していない。読者側の体験差は実機確認対象。

### アクセシビリティ担当
背景と本文可読性は未確認。今回の変更は主に分岐制御。

### 批評・矛盾検出担当
`score` と `mazeLoopCount` を分離した点は妥当。scene数・choice数は削減できたが、実機で意図通りの体験か確認が必要。

### 統合ディレクター
次は `maze_publish_loop_v01.zip` の実機確認に進める状態。


## 9. 全ファイル監査

- [engine_v02b] `AGENTS.md` (9856 bytes, sha256:576b33fccb9e33e9)
- [engine_v02b] `ARCHITECTURE.md` (9932 bytes, sha256:c22039ce3bc5573a)
- [engine_v02b] `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- [engine_v02b] `DESIGN.md` (9155 bytes, sha256:e758488f2bd7049b)
- [engine_v02b] `README.md` (10591 bytes, sha256:f2a1ffc355c7c8e2)
- [engine_v02b] `REPORT.md` (19715 bytes, sha256:3475c1da6fa5ecb5)
- [engine_v02b] `SCENARIO_INSTALL.md` (834 bytes, sha256:3a8824aba7b12825)
- [engine_v02b] `SN_PACKAGE_VERSION.txt` (236 bytes, sha256:8704321a080a8f18)
- [engine_v02b] `SPEC.md` (17697 bytes, sha256:c2ae043a999a304c)
- [engine_v02b] `content/scenario/SCENARIO_SCHEMA.json` (2518 bytes, sha256:5dc80fec15bf3c20)
- [engine_v02b] `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- [engine_v02b] `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- [engine_v02b] `docs/HUMAN_MANUAL.md` (2599 bytes, sha256:733c6d7115ba05d0)
- [engine_v02b] `docs/LICENSES.md` (359 bytes, sha256:e02151f4c8f4b86b)
- [engine_v02b] `docs/PATCH_NOTE_v02.md` (1093 bytes, sha256:ca77ec7fe322d4ea)
- [engine_v02b] `docs/PATCH_NOTE_v02a.md` (1146 bytes, sha256:4d2a70e47cd43ad4)
- [engine_v02b] `docs/PATCH_NOTE_v02b_loop.md` (1010 bytes, sha256:5fc1437f7b9aa4b2)
- [engine_v02b] `docs/archive_pre_v02a/FULL_CHECK_v22b.md` (8647 bytes, sha256:48c5a2474c18f126)
- [engine_v02b] `docs/archive_pre_v02a/LABEL_POLICY_v22b.md` (682 bytes, sha256:391c7dd75db1cf7d)
- [engine_v02b] `docs/archive_pre_v02a/PATCH_NOTE_v22b.md` (500 bytes, sha256:7ec454ade37ed0d7)
- [engine_v02b] `docs/sn_engine_author_full_check_v02.md` (12689 bytes, sha256:935a7f49ba81f281)
- [engine_v02b] `docs/sn_engine_author_full_check_v02a.md` (13117 bytes, sha256:222332560c6df8c3)
- [engine_v02b] `docs/sn_text_display_spec_v01.md` (18586 bytes, sha256:8588bf74ffd2ca12)
- [engine_v02b] `index.html` (4694 bytes, sha256:0d12e4371f4e38e9)
- [engine_v02b] `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- [engine_v02b] `src/engine/japaneseLayoutRules.js` (5110 bytes, sha256:e9208a4060120321)
- [engine_v02b] `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- [engine_v02b] `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- [engine_v02b] `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- [engine_v02b] `src/engine/textMeasure.js` (3242 bytes, sha256:93516aa02153a81d)
- [engine_v02b] `src/engine/textPaginator.js` (4572 bytes, sha256:f7ab12cea9899e40)
- [engine_v02b] `src/engine/typewriterController.js` (1693 bytes, sha256:a0b1b08743296e09)
- [engine_v02b] `src/engine/validator.js` (8588 bytes, sha256:80f0c942dc1b82f7)
- [engine_v02b] `src/main.js` (26907 bytes, sha256:87aca68341f69f32)
- [engine_v02b] `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- [engine_v02b] `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- [engine_v02b] `styles/base.css` (13894 bytes, sha256:c6a65f1b2ea1a3ad)
- [engine_v02b] `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- [engine_v02b] `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- [engine_v02b] `tests/japanese_layout_cases.json` (1650 bytes, sha256:25d90d811d1164f6)
- [engine_v02b] `tests/run_japanese_layout_static_tests.mjs` (1500 bytes, sha256:e3131f2ba2259c94)
- [engine_v02b] `tools/check_japanese_layout_rules.py` (5987 bytes, sha256:fde32243e4e09adc)
- [engine_v02b] `tools/check_route_graph.py` (9515 bytes, sha256:a73704c9e9fd2e77)
- [engine_v02b] `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- [engine_v02b] `tools/compile_scenario.py` (27535 bytes, sha256:2472ecd2275dc0be)
- [engine_v02b] `tools/publish_game.py` (2213 bytes, sha256:64ad84207f906009)
- [engine_v02b] `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)
- [author_kit_v02f] `ENGINE_HANDOFF_RULES.md` (1019 bytes, sha256:dcdd213933f41f48)
- [author_kit_v02f] `FINISH_HERE.md` (1959 bytes, sha256:5287b6d40639f94b)
- [author_kit_v02f] `MAX_30_MINUTE_RULE.md` (1557 bytes, sha256:4fe26e711acbfc0b)
- [author_kit_v02f] `README.md` (3396 bytes, sha256:671acab94a8426bc)
- [author_kit_v02f] `SN_PACKAGE_VERSION.txt` (254 bytes, sha256:1e205e3412d17220)
- [author_kit_v02f] `START_HERE_FIRST.md` (4064 bytes, sha256:ad8c6ac9ff779e07)
- [author_kit_v02f] `VERSION.txt` (287 bytes, sha256:37f56b276ddd088a)
- [author_kit_v02f] `ai_workflow/00_FIRST_CHAT_MESSAGE.md` (2161 bytes, sha256:f173a89397e7f35a)
- [author_kit_v02f] `ai_workflow/01_AI_INTERVIEW_PROMPT.md` (4977 bytes, sha256:0e95ed9b91935a34)
- [author_kit_v02f] `ai_workflow/02_IDEA_INTAKE_SHEET.md` (1692 bytes, sha256:545b090d567c0fe6)
- [author_kit_v02f] `ai_workflow/03_AI_TO_STORY_BIBLE_PROMPT.md` (1766 bytes, sha256:745aef1acf427abe)
- [author_kit_v02f] `ai_workflow/04_AI_TO_SCENARIO_SOURCE_PROMPT.md` (2410 bytes, sha256:61f4f2d6f7c70c32)
- [author_kit_v02f] `ai_workflow/05_AI_REVIEW_PROMPT.md` (2305 bytes, sha256:5b41068503341327)
- [author_kit_v02f] `ai_workflow/06_AI_TEXT_DISPLAY_REVIEW_PROMPT.md` (938 bytes, sha256:764f00f5d331d4a4)
- [author_kit_v02f] `ai_workflow/07_AI_STYLE_GRAMMAR_REVIEW_PROMPT.md` (1308 bytes, sha256:447713e1eab2aa16)
- [author_kit_v02f] `ai_workflow/08_AI_REFERENCE_DECOMPOSITION_PROMPT.md` (1527 bytes, sha256:2fad1bab0b411bf7)
- [author_kit_v02f] `ai_workflow/09_AI_PROSE_POLISH_PROMPT.md` (1218 bytes, sha256:1cc517da1a648393)
- [author_kit_v02f] `ai_workflow/10_AI_PUNCTUATION_REVIEW_PROMPT.md` (1321 bytes, sha256:99e832860905ce30)
- [author_kit_v02f] `ai_workflow/12_AI_LIKE_PROSE_REVIEW_PROMPT.md` (1010 bytes, sha256:bc0ec4b27dc7c905)
- [author_kit_v02f] `ai_workflow/13_AI_LOOP_ROUTE_REVIEW_PROMPT.md` (869 bytes, sha256:85f0735ccc694975)
- [author_kit_v02f] `ai_workflow/99_FINAL_REVIEW_BEFORE_HANDOFF.md` (1770 bytes, sha256:0a7cd9d4d36565b2)
- [author_kit_v02f] `ai_workflow/START_HERE_AI_CONSULTATION.md` (1654 bytes, sha256:03724d197312bd74)
- [author_kit_v02f] `author_handoff/00_FINISH_WIZARD.md` (1484 bytes, sha256:0f6e9ca505d4221b)
- [author_kit_v02f] `author_handoff/HANDOFF_TO_AUTHOR.md` (944 bytes, sha256:a3be1b2563eff690)
- [author_kit_v02f] `author_handoff/HANDOFF_ZIP_RULES.md` (5145 bytes, sha256:163dcdd2c4c121d6)
- [author_kit_v02f] `author_handoff/README_FOR_AUTHOR_TEMPLATE.md` (802 bytes, sha256:04e991f4e07300e2)
- [author_kit_v02f] `author_handoff/READY_TO_ZIP_CHECKLIST.md` (964 bytes, sha256:9c6fa6c3addd3340)
- [author_kit_v02f] `author_handoff/handoff_package_template/README.md` (729 bytes, sha256:9a1d5c44f54cc397)
- [author_kit_v02f] `author_handoff/handoff_package_template/README_FOR_AUTHOR.md` (802 bytes, sha256:04e991f4e07300e2)
- [author_kit_v02f] `author_handoff/handoff_package_template/SCENARIO_SOURCE.md` (1811 bytes, sha256:312e0b1d1044a1a1)
- [author_kit_v02f] `author_handoff/handoff_package_template/STORY_BIBLE.md` (1060 bytes, sha256:ec92bd616491d40e)
- [author_kit_v02f] `docs/PATCH_NOTE_v02a.md` (399 bytes, sha256:929f49ab1b864238)
- [author_kit_v02f] `docs/PATCH_NOTE_v02b.md` (1048 bytes, sha256:ffb04cd2a169639d)
- [author_kit_v02f] `docs/PATCH_NOTE_v02c.md` (931 bytes, sha256:b0fed9b6ed023367)
- [author_kit_v02f] `docs/PATCH_NOTE_v02d.md` (1102 bytes, sha256:74241a579d58959b)
- [author_kit_v02f] `docs/PERSONAL_NAME_CLEANUP_v02e.md` (673 bytes, sha256:4b7408b854c185ce)
- [author_kit_v02f] `docs/personal_name_cleanup_check_v02.md` (17769 bytes, sha256:ce56c852fe6def29)
- [author_kit_v02f] `docs/sn_text_display_spec_v01.md` (18586 bytes, sha256:8588bf74ffd2ca12)
- [author_kit_v02f] `manuals/AI_REQUEST_PROMPT.md` (3248 bytes, sha256:8aea40ec665428ee)
- [author_kit_v02f] `manuals/FAMILY_AUTHOR_MANUAL.md` (6791 bytes, sha256:594559cbfa73e651)
- [author_kit_v02f] `manuals/LOOP_CONTROL_RULES.md` (1756 bytes, sha256:e36520162d6e82da)
- [author_kit_v02f] `manuals/PUNCTUATION_RULES.md` (3135 bytes, sha256:b6a3769bfc525d66)
- [author_kit_v02f] `manuals/REFERENCE_STYLE_RULES.md` (3770 bytes, sha256:fbf9b7eb13cb2a8d)
- [author_kit_v02f] `manuals/STYLE_AND_GRAMMAR_RULES.md` (6692 bytes, sha256:b613f177bfa2fce3)
- [author_kit_v02f] `manuals/TEXT_DISPLAY_AND_KINSOKU_RULES.md` (1472 bytes, sha256:35c7d0c880e010c5)
- [author_kit_v02f] `scenario_templates/DOCUMENT_ROLEPLAY_SHEET.md` (1364 bytes, sha256:3158651aeb848d7d)
- [author_kit_v02f] `scenario_templates/LOOP_CONTROL_TEMPLATE.md` (913 bytes, sha256:e3f9402700c4b67c)
- [author_kit_v02f] `scenario_templates/SCENARIO_TEMPLATE.md` (1811 bytes, sha256:312e0b1d1044a1a1)
- [author_kit_v02f] `scenario_templates/STORY_BIBLE_TEMPLATE.md` (1060 bytes, sha256:ec92bd616491d40e)
- [author_kit_v02f] `scenario_templates/STYLE_PATTERN_SHEET.md` (3213 bytes, sha256:1e8d74ad449236e1)
- [maze_scenario_loop] `PACK_INFO.json` (403 bytes, sha256:30285c6b909d841f)
- [maze_scenario_loop] `README_MOUNTED.md` (476 bytes, sha256:4cea89b0924ecc9b)
- [maze_scenario_loop] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [maze_scenario_loop] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [maze_scenario_loop] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [maze_scenario_loop] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [maze_scenario_loop] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [maze_scenario_loop] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [maze_scenario_loop] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [maze_scenario_loop] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [maze_scenario_loop] `content/manifest.json` (3837 bytes, sha256:3fd37ac430698fc9)
- [maze_scenario_loop] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [maze_scenario_loop] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [maze_scenario_loop] `content/scenario/LOOP_REFACTOR_REPORT.md` (1995 bytes, sha256:f98ee6021dcc86b0)
- [maze_scenario_loop] `content/scenario/ORIGINAL_SCENARIO_SOURCE_BEFORE_LOOP_REFACTOR.md` (39373 bytes, sha256:bc17d291d3647439)
- [maze_scenario_loop] `content/scenario/README_FOR_AUTHOR.md` (3320 bytes, sha256:5b097b2372dc7574)
- [maze_scenario_loop] `content/scenario/REPORT.md` (8049 bytes, sha256:c8b361ad981ba5f7)
- [maze_scenario_loop] `content/scenario/SCENARIO_SOURCE.md` (30426 bytes, sha256:b019156210b478bf)
- [maze_scenario_loop] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [maze_scenario_loop] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [maze_scenario_loop] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [maze_scenario_loop] `content/scenario/STORY_BIBLE.md` (6511 bytes, sha256:246533a480ea1847)
- [maze_scenario_loop] `content/scenario/main.json` (46257 bytes, sha256:b1de8f59d6377403)
- [maze_scenario_loop] `content/scenario/maze_mount_check_v01.md` (11809 bytes, sha256:c83e1204d57a4247)
- [maze_publish_loop] `AGENTS.md` (9856 bytes, sha256:576b33fccb9e33e9)
- [maze_publish_loop] `ARCHITECTURE.md` (9932 bytes, sha256:c22039ce3bc5573a)
- [maze_publish_loop] `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- [maze_publish_loop] `DESIGN.md` (9155 bytes, sha256:e758488f2bd7049b)
- [maze_publish_loop] `PUBLISH_INFO.json` (424 bytes, sha256:125e7b2534c9062d)
- [maze_publish_loop] `README.md` (10591 bytes, sha256:f2a1ffc355c7c8e2)
- [maze_publish_loop] `REPORT.md` (19715 bytes, sha256:3475c1da6fa5ecb5)
- [maze_publish_loop] `SCENARIO_INSTALL.md` (834 bytes, sha256:3a8824aba7b12825)
- [maze_publish_loop] `SN_PACKAGE_VERSION.txt` (236 bytes, sha256:8704321a080a8f18)
- [maze_publish_loop] `SPEC.md` (17697 bytes, sha256:c2ae043a999a304c)
- [maze_publish_loop] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [maze_publish_loop] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [maze_publish_loop] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [maze_publish_loop] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [maze_publish_loop] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [maze_publish_loop] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [maze_publish_loop] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [maze_publish_loop] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [maze_publish_loop] `content/manifest.json` (3837 bytes, sha256:3fd37ac430698fc9)
- [maze_publish_loop] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [maze_publish_loop] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [maze_publish_loop] `content/scenario/LOOP_REFACTOR_REPORT.md` (1995 bytes, sha256:f98ee6021dcc86b0)
- [maze_publish_loop] `content/scenario/ORIGINAL_SCENARIO_SOURCE_BEFORE_LOOP_REFACTOR.md` (39373 bytes, sha256:bc17d291d3647439)
- [maze_publish_loop] `content/scenario/README_FOR_AUTHOR.md` (3320 bytes, sha256:5b097b2372dc7574)
- [maze_publish_loop] `content/scenario/REPORT.md` (8049 bytes, sha256:c8b361ad981ba5f7)
- [maze_publish_loop] `content/scenario/SCENARIO_SOURCE.md` (30426 bytes, sha256:b019156210b478bf)
- [maze_publish_loop] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [maze_publish_loop] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [maze_publish_loop] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [maze_publish_loop] `content/scenario/STORY_BIBLE.md` (6511 bytes, sha256:246533a480ea1847)
- [maze_publish_loop] `content/scenario/main.json` (46257 bytes, sha256:b1de8f59d6377403)
- [maze_publish_loop] `content/scenario/maze_mount_check_v01.md` (11809 bytes, sha256:c83e1204d57a4247)
- [maze_publish_loop] `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- [maze_publish_loop] `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- [maze_publish_loop] `docs/HUMAN_MANUAL.md` (2599 bytes, sha256:733c6d7115ba05d0)
- [maze_publish_loop] `docs/LICENSES.md` (359 bytes, sha256:e02151f4c8f4b86b)
- [maze_publish_loop] `docs/PATCH_NOTE_v02.md` (1093 bytes, sha256:ca77ec7fe322d4ea)
- [maze_publish_loop] `docs/PATCH_NOTE_v02a.md` (1146 bytes, sha256:4d2a70e47cd43ad4)
- [maze_publish_loop] `docs/PATCH_NOTE_v02b_loop.md` (1010 bytes, sha256:5fc1437f7b9aa4b2)
- [maze_publish_loop] `docs/archive_pre_v02a/FULL_CHECK_v22b.md` (8647 bytes, sha256:48c5a2474c18f126)
- [maze_publish_loop] `docs/archive_pre_v02a/LABEL_POLICY_v22b.md` (682 bytes, sha256:391c7dd75db1cf7d)
- [maze_publish_loop] `docs/archive_pre_v02a/PATCH_NOTE_v22b.md` (500 bytes, sha256:7ec454ade37ed0d7)
- [maze_publish_loop] `docs/sn_engine_author_full_check_v02.md` (12689 bytes, sha256:935a7f49ba81f281)
- [maze_publish_loop] `docs/sn_engine_author_full_check_v02a.md` (13117 bytes, sha256:222332560c6df8c3)
- [maze_publish_loop] `docs/sn_text_display_spec_v01.md` (18586 bytes, sha256:8588bf74ffd2ca12)
- [maze_publish_loop] `index.html` (4694 bytes, sha256:0d12e4371f4e38e9)
- [maze_publish_loop] `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- [maze_publish_loop] `src/engine/japaneseLayoutRules.js` (5110 bytes, sha256:e9208a4060120321)
- [maze_publish_loop] `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- [maze_publish_loop] `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- [maze_publish_loop] `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- [maze_publish_loop] `src/engine/textMeasure.js` (3242 bytes, sha256:93516aa02153a81d)
- [maze_publish_loop] `src/engine/textPaginator.js` (4572 bytes, sha256:f7ab12cea9899e40)
- [maze_publish_loop] `src/engine/typewriterController.js` (1693 bytes, sha256:a0b1b08743296e09)
- [maze_publish_loop] `src/engine/validator.js` (8588 bytes, sha256:80f0c942dc1b82f7)
- [maze_publish_loop] `src/main.js` (26907 bytes, sha256:87aca68341f69f32)
- [maze_publish_loop] `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- [maze_publish_loop] `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- [maze_publish_loop] `styles/base.css` (13894 bytes, sha256:c6a65f1b2ea1a3ad)
- [maze_publish_loop] `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- [maze_publish_loop] `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- [maze_publish_loop] `tests/japanese_layout_cases.json` (1650 bytes, sha256:25d90d811d1164f6)
- [maze_publish_loop] `tests/run_japanese_layout_static_tests.mjs` (1500 bytes, sha256:e3131f2ba2259c94)
- [maze_publish_loop] `tools/check_japanese_layout_rules.py` (5987 bytes, sha256:fde32243e4e09adc)
- [maze_publish_loop] `tools/check_route_graph.py` (9515 bytes, sha256:a73704c9e9fd2e77)
- [maze_publish_loop] `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- [maze_publish_loop] `tools/compile_scenario.py` (27535 bytes, sha256:2472ecd2275dc0be)
- [maze_publish_loop] `tools/publish_game.py` (2213 bytes, sha256:64ad84207f906009)
- [maze_publish_loop] `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)