# maze_opening_depth_check_v03.md

## 1. 対象

- 入力: `maze_scenario_pack_loop_v02.zip`
- 入力: `maze_publish_loop_v02.zip`
- 出力: `maze_scenario_pack_loop_v03.zip`
- 出力: `maze_publish_loop_v03.zip`
- 検査日時UTC: `2026-05-17T12:59:41.259104+00:00`

## 2. 総合判定

**冒頭描写修正後、静的検査・ルート検査・総当たり検査上は合格候補。**

## 3. 修正方針

- 主人公をホラー都合で何もしない人物にしない。
- 大声で呼ぶ、駅員を探す、スマホで電話・メッセージ・緊急通報を考える行動を追加。
- 日常の地下通路が微妙に崩れていく描写を増やす。
- 軽い動画視聴から緊迫感へ移る段階を明確にする。
- 主人公の視覚・聴覚・手触り・動作で見せる。

## 4. 主な修正scene

- `opening`
- `video_phrase`
- `no_one_there`
- `choice_initial_check`
- `check_missing_stairs`
- `check_saved_video`
- `check_sign_shape`
- `first_sign`

## 5. 構造維持

```text
scene数: 49
choice block数: 7
choice option数: 21
routeCheck数: 3
ending数: 4
```

## 6. ルート検査

```text
総当たりルート数: 1863
失敗ルート数: 0
ending_bad: 648
ending_true: 405
ending_normal_almost: 405
ending_normal: 405
```

## 7. 確認済み

- [scenario_loop_v03] required files present: OK
- [scenario_loop_v03] all text-like files readable: OK
- [scenario_loop_v03] JSON parse: OK
- [scenario_loop_v03] Markdown fences balanced: OK
- [scenario_loop_v03] no cache/system files: OK
- [scenario_loop_v03] no nested zip: OK
- [scenario_loop_v03] no personal-name path/content hits: OK
- [scenario_loop_v03] targeted old wording remains absent: OK
- [scenario_loop_v03] opening contains ordinary help-seeking actions: OK
- [scenario_loop_v03] route/step references valid: OK
- [scenario_loop_v03] scene count remains 49: OK
- [scenario_loop_v03] choice block count remains 7: OK
- [scenario_loop_v03] choice option count remains 21: OK
- [scenario_loop_v03] routeCheck count remains 3: OK
- [scenario_loop_v03] ending count remains 4: OK
- [scenario_loop_v03] manifest engine v02b loop: OK
- [scenario_loop_v03] main compatibleEngine v02b loop: OK
- [scenario_loop_v03] all used backgrounds have manifest spec: OK
- [scenario_loop_v03] background assets readable webp <=1440: OK
- [publish_loop_v03] required files present: OK
- [publish_loop_v03] all text-like files readable: OK
- [publish_loop_v03] JSON parse: OK
- [publish_loop_v03] Markdown fences balanced: OK
- [publish_loop_v03] no cache/system files: OK
- [publish_loop_v03] no nested zip: OK
- [publish_loop_v03] no personal-name path/content hits: OK
- [publish_loop_v03] targeted old wording remains absent: OK
- [publish_loop_v03] opening contains ordinary help-seeking actions: OK
- [publish_loop_v03] route/step references valid: OK
- [publish_loop_v03] scene count remains 49: OK
- [publish_loop_v03] choice block count remains 7: OK
- [publish_loop_v03] choice option count remains 21: OK
- [publish_loop_v03] routeCheck count remains 3: OK
- [publish_loop_v03] ending count remains 4: OK
- [publish_loop_v03] manifest engine v02b loop: OK
- [publish_loop_v03] main compatibleEngine v02b loop: OK
- [publish_loop_v03] all used backgrounds have manifest spec: OK
- [publish_loop_v03] background assets readable webp <=1440: OK
- [publish_loop_v03] publish main.js Node syntax OK: OK
- [scenario_loop_v03] all enumerated routes terminate: OK
- [scenario_loop_v03] expected ending distribution preserved: OK

## 8. エラー

なし。

## 9. 未確認

- 実ブラウザ表示
- iPhone Safari実機確認
- 冒頭が長すぎないか
- 文字送りテンポ
- 主人公の行動が自然に読めるか
- 緊迫感が十分か
- 背景明度と本文可読性

## 10. 役割担当レビュー

### 正本確認担当
`main.json` と `SCENARIO_SOURCE.md` を同期し、v03の冒頭修正を `OPENING_DEPTH_REVISION_REPORT.md` に記録した。

### 本文担当
軽い説明を抑え、地下通路の日常が崩れる感覚と、主人公の普通の行動を追加した。

### 主人公目線担当
主人公が見たもの、聞いたもの、触れたもの、実際に試した行動に限定して恐怖を積み上げた。

### UI/UX担当
初期選択肢は3つのまま維持し、ラベルを「階段と駅員」「スマホ連絡」「案内板と非常口表示」に整理した。

### アクセシビリティ担当
視覚情報を使う謎解きであるため、ヒントの強さは実機・読後確認で追加判断が必要。

### 検証担当
JSON、Markdown、route、背景、Node構文、ルート総当たりを確認した。

### 批評・矛盾検出担当
「普通なら助けを求める」という行動不足を修正した。文体以前の人物行動の不自然さを潰した。

### 統合ディレクター
実機確認に進める状態。ただし冒頭の長さとテンポは人間確認対象。


## 11. 全ファイル監査

- [scenario_loop_v03] `PACK_INFO.json` (459 bytes, sha256:54d9688e5e0f6cfa)
- [scenario_loop_v03] `README_MOUNTED.md` (1010 bytes, sha256:fe9d12244d5bd29e)
- [scenario_loop_v03] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [scenario_loop_v03] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [scenario_loop_v03] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [scenario_loop_v03] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [scenario_loop_v03] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [scenario_loop_v03] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [scenario_loop_v03] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [scenario_loop_v03] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [scenario_loop_v03] `content/manifest.json` (4014 bytes, sha256:b1c6f66d1744e170)
- [scenario_loop_v03] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [scenario_loop_v03] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [scenario_loop_v03] `content/scenario/LOOP_REFACTOR_REPORT.md` (1995 bytes, sha256:f98ee6021dcc86b0)
- [scenario_loop_v03] `content/scenario/OPENING_DEPTH_REVISION_REPORT.md` (1134 bytes, sha256:4f1355b80359c24d)
- [scenario_loop_v03] `content/scenario/README_FOR_AUTHOR.md` (3323 bytes, sha256:69473acb53ca4a85)
- [scenario_loop_v03] `content/scenario/REPORT.md` (8055 bytes, sha256:b2817cb360412120)
- [scenario_loop_v03] `content/scenario/SCENARIO_SOURCE.md` (34348 bytes, sha256:163a52249e5083db)
- [scenario_loop_v03] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [scenario_loop_v03] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [scenario_loop_v03] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [scenario_loop_v03] `content/scenario/STORY_BIBLE.md` (6577 bytes, sha256:665a97d9a76330fa)
- [scenario_loop_v03] `content/scenario/WORDING_REVISION_REPORT.md` (1120 bytes, sha256:3070b18b00da6b65)
- [scenario_loop_v03] `content/scenario/main.json` (51032 bytes, sha256:097b6425610be1db)
- [scenario_loop_v03] `content/scenario/maze_wording_revision_check_v02.md` (12780 bytes, sha256:7567d8778b89666d)
- [publish_loop_v03] `AGENTS.md` (9856 bytes, sha256:576b33fccb9e33e9)
- [publish_loop_v03] `ARCHITECTURE.md` (9932 bytes, sha256:c22039ce3bc5573a)
- [publish_loop_v03] `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- [publish_loop_v03] `DESIGN.md` (9155 bytes, sha256:e758488f2bd7049b)
- [publish_loop_v03] `PUBLISH_INFO.json` (480 bytes, sha256:35b67e3330716abc)
- [publish_loop_v03] `README.md` (10591 bytes, sha256:f2a1ffc355c7c8e2)
- [publish_loop_v03] `README_MOUNTED.md` (534 bytes, sha256:4185862b7824c37b)
- [publish_loop_v03] `REPORT.md` (19715 bytes, sha256:3475c1da6fa5ecb5)
- [publish_loop_v03] `SCENARIO_INSTALL.md` (834 bytes, sha256:3a8824aba7b12825)
- [publish_loop_v03] `SN_PACKAGE_VERSION.txt` (236 bytes, sha256:8704321a080a8f18)
- [publish_loop_v03] `SPEC.md` (17697 bytes, sha256:c2ae043a999a304c)
- [publish_loop_v03] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [publish_loop_v03] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [publish_loop_v03] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [publish_loop_v03] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [publish_loop_v03] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [publish_loop_v03] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [publish_loop_v03] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [publish_loop_v03] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [publish_loop_v03] `content/manifest.json` (4014 bytes, sha256:b1c6f66d1744e170)
- [publish_loop_v03] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [publish_loop_v03] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [publish_loop_v03] `content/scenario/LOOP_REFACTOR_REPORT.md` (1995 bytes, sha256:f98ee6021dcc86b0)
- [publish_loop_v03] `content/scenario/OPENING_DEPTH_REVISION_REPORT.md` (1134 bytes, sha256:4f1355b80359c24d)
- [publish_loop_v03] `content/scenario/README_FOR_AUTHOR.md` (3323 bytes, sha256:69473acb53ca4a85)
- [publish_loop_v03] `content/scenario/REPORT.md` (8055 bytes, sha256:b2817cb360412120)
- [publish_loop_v03] `content/scenario/SCENARIO_SOURCE.md` (34348 bytes, sha256:163a52249e5083db)
- [publish_loop_v03] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [publish_loop_v03] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [publish_loop_v03] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [publish_loop_v03] `content/scenario/STORY_BIBLE.md` (6577 bytes, sha256:665a97d9a76330fa)
- [publish_loop_v03] `content/scenario/WORDING_REVISION_REPORT.md` (1120 bytes, sha256:3070b18b00da6b65)
- [publish_loop_v03] `content/scenario/main.json` (51032 bytes, sha256:097b6425610be1db)
- [publish_loop_v03] `content/scenario/maze_wording_revision_check_v02.md` (12780 bytes, sha256:7567d8778b89666d)
- [publish_loop_v03] `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- [publish_loop_v03] `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- [publish_loop_v03] `docs/HUMAN_MANUAL.md` (2599 bytes, sha256:733c6d7115ba05d0)
- [publish_loop_v03] `docs/LICENSES.md` (359 bytes, sha256:e02151f4c8f4b86b)
- [publish_loop_v03] `docs/PATCH_NOTE_v02.md` (1093 bytes, sha256:ca77ec7fe322d4ea)
- [publish_loop_v03] `docs/PATCH_NOTE_v02a.md` (1146 bytes, sha256:4d2a70e47cd43ad4)
- [publish_loop_v03] `docs/PATCH_NOTE_v02b_loop.md` (1010 bytes, sha256:5fc1437f7b9aa4b2)
- [publish_loop_v03] `docs/archive_pre_v02a/FULL_CHECK_v22b.md` (8647 bytes, sha256:48c5a2474c18f126)
- [publish_loop_v03] `docs/archive_pre_v02a/LABEL_POLICY_v22b.md` (682 bytes, sha256:391c7dd75db1cf7d)
- [publish_loop_v03] `docs/archive_pre_v02a/PATCH_NOTE_v22b.md` (500 bytes, sha256:7ec454ade37ed0d7)
- [publish_loop_v03] `docs/sn_engine_author_full_check_v02.md` (12689 bytes, sha256:935a7f49ba81f281)
- [publish_loop_v03] `docs/sn_engine_author_full_check_v02a.md` (13117 bytes, sha256:222332560c6df8c3)
- [publish_loop_v03] `docs/sn_text_display_spec_v01.md` (18586 bytes, sha256:8588bf74ffd2ca12)
- [publish_loop_v03] `index.html` (4694 bytes, sha256:0d12e4371f4e38e9)
- [publish_loop_v03] `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- [publish_loop_v03] `src/engine/japaneseLayoutRules.js` (5110 bytes, sha256:e9208a4060120321)
- [publish_loop_v03] `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- [publish_loop_v03] `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- [publish_loop_v03] `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- [publish_loop_v03] `src/engine/textMeasure.js` (3242 bytes, sha256:93516aa02153a81d)
- [publish_loop_v03] `src/engine/textPaginator.js` (4572 bytes, sha256:f7ab12cea9899e40)
- [publish_loop_v03] `src/engine/typewriterController.js` (1693 bytes, sha256:a0b1b08743296e09)
- [publish_loop_v03] `src/engine/validator.js` (8588 bytes, sha256:80f0c942dc1b82f7)
- [publish_loop_v03] `src/main.js` (26907 bytes, sha256:87aca68341f69f32)
- [publish_loop_v03] `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- [publish_loop_v03] `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- [publish_loop_v03] `styles/base.css` (13894 bytes, sha256:c6a65f1b2ea1a3ad)
- [publish_loop_v03] `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- [publish_loop_v03] `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- [publish_loop_v03] `tests/japanese_layout_cases.json` (1650 bytes, sha256:25d90d811d1164f6)
- [publish_loop_v03] `tests/run_japanese_layout_static_tests.mjs` (1500 bytes, sha256:e3131f2ba2259c94)
- [publish_loop_v03] `tools/check_japanese_layout_rules.py` (5987 bytes, sha256:fde32243e4e09adc)
- [publish_loop_v03] `tools/check_route_graph.py` (9515 bytes, sha256:a73704c9e9fd2e77)
- [publish_loop_v03] `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- [publish_loop_v03] `tools/compile_scenario.py` (27535 bytes, sha256:2472ecd2275dc0be)
- [publish_loop_v03] `tools/publish_game.py` (2213 bytes, sha256:64ad84207f906009)
- [publish_loop_v03] `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)