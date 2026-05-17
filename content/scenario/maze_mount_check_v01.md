# maze_mount_check_v01.md

## 1. 対象

- 入力: `maze_sound_novel_v04(1).zip`
- 出力: `maze_scenario_pack_webp_v01.zip`
- 出力: `maze_publish_webp_v01.zip`
- 検査日時UTC: `2026-05-17T12:21:26.555341+00:00`

## 2. 総合判定

**エンジン視点の全件検査・搭載・画像WebP化後、静的検査上は合格候補。**

## 3. 実施内容

- `SCENARIO_SOURCE.md` を `content/scenario/main.json` へ変換。
- `STORY_BIBLE.md` / `BACKGROUND_ASSIGNMENT.md` / `REPORT.md` を同梱。
- 個人名入りREADMEは `README_FOR_AUTHOR.md` へリネーム。
- `sn_engine_v02a` へ搭載。
- 背景PNG 8枚をWebPへ変換し、最大辺1440pxへ縮小。
- scenario pack版とpublish版を分離。

## 4. 画像削減

- PNG合計: 15138474 bytes
- WebP合計: 410768 bytes
- 削減率: 97.3%

## 5. 確認済み

- [scenario_pack] required files present: OK
- [scenario_pack] text files readable: OK
- [scenario_pack] JSON parse: OK
- [scenario_pack] Markdown fences balanced: OK
- [scenario_pack] no cache/system files: OK
- [scenario_pack] no nested zip: OK
- [scenario_pack] no personal-name path/content hits: OK
- [scenario_pack] manifest entryScenario exists: OK
- [scenario_pack] manifest engine is sn_engine_v02a: OK
- [scenario_pack] main compatibleEngine v02a: OK
- [scenario_pack] scene IDs unique: OK
- [scenario_pack] route and step refs valid: OK
- [scenario_pack] scene count 66: OK
- [scenario_pack] choice block count 13: OK
- [scenario_pack] choice option count 39: OK
- [scenario_pack] ending count 4: OK
- [scenario_pack] all scenes reachable: OK
- [scenario_pack] all used backgrounds have manifest spec: OK
- [scenario_pack] all image backgrounds exist: OK
- [scenario_pack] image backgrounds use webp: OK
- [scenario_pack] webp images readable and max side <=1440: OK
- [scenario_pack] no PNG remains in mounted bg assets: OK
- [scenario_pack] known corrected wording absent from runtime text: OK
- [publish_pack] required files present: OK
- [publish_pack] text files readable: OK
- [publish_pack] JSON parse: OK
- [publish_pack] Markdown fences balanced: OK
- [publish_pack] no cache/system files: OK
- [publish_pack] no nested zip: OK
- [publish_pack] no personal-name path/content hits: OK
- [publish_pack] manifest entryScenario exists: OK
- [publish_pack] manifest engine is sn_engine_v02a: OK
- [publish_pack] main compatibleEngine v02a: OK
- [publish_pack] scene IDs unique: OK
- [publish_pack] route and step refs valid: OK
- [publish_pack] scene count 66: OK
- [publish_pack] choice block count 13: OK
- [publish_pack] choice option count 39: OK
- [publish_pack] ending count 4: OK
- [publish_pack] all scenes reachable: OK
- [publish_pack] all used backgrounds have manifest spec: OK
- [publish_pack] all image backgrounds exist: OK
- [publish_pack] image backgrounds use webp: OK
- [publish_pack] webp images readable and max side <=1440: OK
- [publish_pack] no PNG remains in mounted bg assets: OK
- [publish_pack] known corrected wording absent from runtime text: OK

## 6. エラー

なし。

## 7. 注意・未確認

- 実ブラウザ表示
- iPhone Safari実機確認
- 横長背景をスマホ縦画面でcover表示した際のトリミング
- 背景WebPの主観品質
- 背景明度と本文可読性
- 音声・BGMの実再生
- choice option数は39で、30分以内キットとしては多め

## 8. 役割担当レビュー

### 正本確認担当
`STORY_BIBLE.md` と `SCENARIO_SOURCE.md` を正本として保持し、Runtime用 `main.json` と分離した。

### 実装担当
`SCENARIO_SOURCE.md` を解析し、`sn_engine_v02a` 互換の `main.json` / `manifest.json` を生成した。

### 検証担当
全ファイル読込、JSON parse、Markdown fence、ルート参照、scene数、choice数、ending数、背景パス、WebP読込を確認した。

### UI/UX担当
画像は横長のため、スマホ縦画面でのトリミング確認が必須。

### アクセシビリティ担当
背景の明度と本文可読性は未確認。実機確認対象。

### 批評・矛盾検出担当
今回はエンジン搭載検査であり、シナリオ本文の再校閲・現実考証は対象外。

### 統合ディレクター
publish版で実機確認へ進める状態。choice数が多めのため、読後負荷は後続確認対象。


## 9. 全ファイル監査

- [scenario_pack] `PACK_INFO.json` (464 bytes, sha256:685fc328d42aa480)
- [scenario_pack] `README_MOUNTED.md` (476 bytes, sha256:4cea89b0924ecc9b)
- [scenario_pack] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [scenario_pack] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [scenario_pack] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [scenario_pack] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [scenario_pack] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [scenario_pack] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [scenario_pack] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [scenario_pack] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [scenario_pack] `content/manifest.json` (3375 bytes, sha256:ee6212a1e48d47d4)
- [scenario_pack] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [scenario_pack] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [scenario_pack] `content/scenario/README_FOR_AUTHOR.md` (3320 bytes, sha256:5b097b2372dc7574)
- [scenario_pack] `content/scenario/REPORT.md` (8049 bytes, sha256:c8b361ad981ba5f7)
- [scenario_pack] `content/scenario/SCENARIO_SOURCE.md` (39373 bytes, sha256:bc17d291d3647439)
- [scenario_pack] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [scenario_pack] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [scenario_pack] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [scenario_pack] `content/scenario/STORY_BIBLE.md` (6511 bytes, sha256:246533a480ea1847)
- [scenario_pack] `content/scenario/main.json` (58076 bytes, sha256:c0fa4434524ba2e0)
- [publish_pack] `AGENTS.md` (9856 bytes, sha256:576b33fccb9e33e9)
- [publish_pack] `ARCHITECTURE.md` (9932 bytes, sha256:c22039ce3bc5573a)
- [publish_pack] `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- [publish_pack] `DESIGN.md` (9155 bytes, sha256:e758488f2bd7049b)
- [publish_pack] `PUBLISH_INFO.json` (485 bytes, sha256:264b6a1b3cd58f21)
- [publish_pack] `README.md` (10591 bytes, sha256:f2a1ffc355c7c8e2)
- [publish_pack] `README_MOUNTED.md` (476 bytes, sha256:4cea89b0924ecc9b)
- [publish_pack] `REPORT.md` (19715 bytes, sha256:3475c1da6fa5ecb5)
- [publish_pack] `SCENARIO_INSTALL.md` (834 bytes, sha256:3a8824aba7b12825)
- [publish_pack] `SN_PACKAGE_VERSION.txt` (274 bytes, sha256:f5df7ce69c591d38)
- [publish_pack] `SPEC.md` (17697 bytes, sha256:c2ae043a999a304c)
- [publish_pack] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [publish_pack] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [publish_pack] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [publish_pack] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [publish_pack] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [publish_pack] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [publish_pack] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [publish_pack] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [publish_pack] `content/manifest.json` (3375 bytes, sha256:ee6212a1e48d47d4)
- [publish_pack] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [publish_pack] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [publish_pack] `content/scenario/README_FOR_AUTHOR.md` (3320 bytes, sha256:5b097b2372dc7574)
- [publish_pack] `content/scenario/REPORT.md` (8049 bytes, sha256:c8b361ad981ba5f7)
- [publish_pack] `content/scenario/SCENARIO_SOURCE.md` (39373 bytes, sha256:bc17d291d3647439)
- [publish_pack] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [publish_pack] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [publish_pack] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [publish_pack] `content/scenario/STORY_BIBLE.md` (6511 bytes, sha256:246533a480ea1847)
- [publish_pack] `content/scenario/main.json` (58076 bytes, sha256:c0fa4434524ba2e0)
- [publish_pack] `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- [publish_pack] `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- [publish_pack] `docs/HUMAN_MANUAL.md` (2599 bytes, sha256:733c6d7115ba05d0)
- [publish_pack] `docs/LICENSES.md` (359 bytes, sha256:e02151f4c8f4b86b)
- [publish_pack] `docs/PATCH_NOTE_v02.md` (1093 bytes, sha256:ca77ec7fe322d4ea)
- [publish_pack] `docs/PATCH_NOTE_v02a.md` (1146 bytes, sha256:4d2a70e47cd43ad4)
- [publish_pack] `docs/archive_pre_v02a/FULL_CHECK_v22b.md` (8647 bytes, sha256:48c5a2474c18f126)
- [publish_pack] `docs/archive_pre_v02a/LABEL_POLICY_v22b.md` (682 bytes, sha256:391c7dd75db1cf7d)
- [publish_pack] `docs/archive_pre_v02a/PATCH_NOTE_v22b.md` (500 bytes, sha256:7ec454ade37ed0d7)
- [publish_pack] `docs/sn_engine_author_full_check_v02.md` (12689 bytes, sha256:935a7f49ba81f281)
- [publish_pack] `docs/sn_engine_author_full_check_v02a.md` (13117 bytes, sha256:222332560c6df8c3)
- [publish_pack] `docs/sn_text_display_spec_v01.md` (18586 bytes, sha256:8588bf74ffd2ca12)
- [publish_pack] `index.html` (4694 bytes, sha256:0d12e4371f4e38e9)
- [publish_pack] `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- [publish_pack] `src/engine/japaneseLayoutRules.js` (5110 bytes, sha256:e9208a4060120321)
- [publish_pack] `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- [publish_pack] `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- [publish_pack] `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- [publish_pack] `src/engine/textMeasure.js` (3242 bytes, sha256:93516aa02153a81d)
- [publish_pack] `src/engine/textPaginator.js` (4572 bytes, sha256:f7ab12cea9899e40)
- [publish_pack] `src/engine/typewriterController.js` (1693 bytes, sha256:a0b1b08743296e09)
- [publish_pack] `src/engine/validator.js` (7089 bytes, sha256:cbbee9b6c763cff5)
- [publish_pack] `src/main.js` (25445 bytes, sha256:6681403614a3c7a8)
- [publish_pack] `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- [publish_pack] `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- [publish_pack] `styles/base.css` (13894 bytes, sha256:c6a65f1b2ea1a3ad)
- [publish_pack] `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- [publish_pack] `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- [publish_pack] `tests/japanese_layout_cases.json` (1650 bytes, sha256:25d90d811d1164f6)
- [publish_pack] `tests/run_japanese_layout_static_tests.mjs` (1500 bytes, sha256:e3131f2ba2259c94)
- [publish_pack] `tools/check_japanese_layout_rules.py` (5987 bytes, sha256:fde32243e4e09adc)
- [publish_pack] `tools/check_route_graph.py` (9515 bytes, sha256:a73704c9e9fd2e77)
- [publish_pack] `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- [publish_pack] `tools/compile_scenario.py` (27535 bytes, sha256:2472ecd2275dc0be)
- [publish_pack] `tools/publish_game.py` (2213 bytes, sha256:64ad84207f906009)
- [publish_pack] `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)