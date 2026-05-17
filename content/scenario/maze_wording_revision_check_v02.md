# maze_wording_revision_check_v02.md

## 1. 対象

- 入力: `maze_scenario_pack_loop_v01.zip`
- 入力: `maze_publish_loop_v01.zip`
- 出力: `maze_scenario_pack_loop_v02.zip`
- 出力: `maze_publish_loop_v02.zip`
- 検査日時UTC: `2026-05-17T12:50:58.657282+00:00`

## 2. 総合判定

**シナリオ本文・選択肢・同梱ドキュメントの文言修正後、静的検査・ルート検査・総当たり検査上は合格候補。**

## 3. 修正方針

- ピクトグラム説明に使っていた身体性の強い反復表現を削除。
- ピクトグラムを「正解マーク」として読ませないように選択肢を調整。
- 動画字幕を攻略メモにしすぎず、観察メモ寄りに修正。
- 最終階段の選択肢から、答えを直接示す言い回しを削除。
- 本文だけでなく、同梱ドキュメント側の旧表現も整理。

## 4. 構造維持

```text
scene数: 49
choice block数: 7
choice option数: 21
routeCheck数: 3
ending数: 4
```

## 5. ルート検査

```text
総当たりルート数: 1863
失敗ルート数: 0
ending_bad: 648
ending_true: 405
ending_normal_almost: 405
ending_normal: 405
```

## 6. 確認済み

- [scenario_loop_v02] required files present: OK
- [scenario_loop_v02] all text-like files readable: OK
- [scenario_loop_v02] JSON parse: OK
- [scenario_loop_v02] Markdown fences balanced: OK
- [scenario_loop_v02] no cache/system files: OK
- [scenario_loop_v02] no nested zip: OK
- [scenario_loop_v02] no personal-name path/content hits: OK
- [scenario_loop_v02] removed targeted problematic wording: OK
- [scenario_loop_v02] route/step references valid: OK
- [scenario_loop_v02] scene count remains 49: OK
- [scenario_loop_v02] choice block count remains 7: OK
- [scenario_loop_v02] choice option count remains 21: OK
- [scenario_loop_v02] routeCheck count remains 3: OK
- [scenario_loop_v02] ending count remains 4: OK
- [scenario_loop_v02] manifest engine v02b loop: OK
- [scenario_loop_v02] main compatibleEngine v02b loop: OK
- [scenario_loop_v02] all used backgrounds have manifest spec: OK
- [scenario_loop_v02] background assets readable webp <=1440: OK
- [publish_loop_v02] required files present: OK
- [publish_loop_v02] all text-like files readable: OK
- [publish_loop_v02] JSON parse: OK
- [publish_loop_v02] Markdown fences balanced: OK
- [publish_loop_v02] no cache/system files: OK
- [publish_loop_v02] no nested zip: OK
- [publish_loop_v02] no personal-name path/content hits: OK
- [publish_loop_v02] removed targeted problematic wording: OK
- [publish_loop_v02] route/step references valid: OK
- [publish_loop_v02] scene count remains 49: OK
- [publish_loop_v02] choice block count remains 7: OK
- [publish_loop_v02] choice option count remains 21: OK
- [publish_loop_v02] routeCheck count remains 3: OK
- [publish_loop_v02] ending count remains 4: OK
- [publish_loop_v02] manifest engine v02b loop: OK
- [publish_loop_v02] main compatibleEngine v02b loop: OK
- [publish_loop_v02] all used backgrounds have manifest spec: OK
- [publish_loop_v02] background assets readable webp <=1440: OK
- [publish_loop_v02] publish main.js Node syntax OK: OK
- [scenario_loop_v02] all enumerated routes terminate: OK
- [scenario_loop_v02] expected ending distribution preserved: OK

## 7. エラー

なし。

## 8. 未確認

- 実ブラウザ表示
- iPhone Safari実機確認
- 修正文の読後感
- ヒントの出方が弱すぎないか
- 背景明度と本文可読性

## 9. 役割担当レビュー

### 正本確認担当
`main.json` と `SCENARIO_SOURCE.md` を同期し、同梱ドキュメントにも旧表現が残らないように確認した。

### 本文担当
説明をそのまま答えにしない方針で、観察・輪郭・視線の描写へ寄せた。

### UI/UX担当
選択肢の正解感を弱めた。実際のプレイで迷いすぎないかは確認対象。

### アクセシビリティ担当
用語の強さを下げたが、視覚情報を使う謎解きであるため、代替ヒント設計は今後検討対象。

### 検証担当
JSON、Markdown、route、背景、ルート総当たりを確認した。

### 批評・矛盾検出担当
文体の問題ではなく情報開示設計の問題として扱った。直接的な攻略文を削った点は妥当。

### 統合ディレクター
実機確認に進める状態。ただし、読後感と謎の難易度は人間確認が必要。


## 10. 全ファイル監査

- [scenario_loop_v02] `PACK_INFO.json` (431 bytes, sha256:e4f1236cfa604939)
- [scenario_loop_v02] `README_MOUNTED.md` (725 bytes, sha256:d2c96e67bcaa1511)
- [scenario_loop_v02] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [scenario_loop_v02] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [scenario_loop_v02] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [scenario_loop_v02] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [scenario_loop_v02] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [scenario_loop_v02] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [scenario_loop_v02] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [scenario_loop_v02] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [scenario_loop_v02] `content/manifest.json` (3921 bytes, sha256:c4a543163745a02e)
- [scenario_loop_v02] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [scenario_loop_v02] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [scenario_loop_v02] `content/scenario/LOOP_REFACTOR_REPORT.md` (1995 bytes, sha256:f98ee6021dcc86b0)
- [scenario_loop_v02] `content/scenario/README_FOR_AUTHOR.md` (3323 bytes, sha256:69473acb53ca4a85)
- [scenario_loop_v02] `content/scenario/REPORT.md` (8055 bytes, sha256:b2817cb360412120)
- [scenario_loop_v02] `content/scenario/SCENARIO_SOURCE.md` (31091 bytes, sha256:8c64b7e8ab8d49c1)
- [scenario_loop_v02] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [scenario_loop_v02] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [scenario_loop_v02] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [scenario_loop_v02] `content/scenario/STORY_BIBLE.md` (6577 bytes, sha256:665a97d9a76330fa)
- [scenario_loop_v02] `content/scenario/WORDING_REVISION_REPORT.md` (1120 bytes, sha256:3070b18b00da6b65)
- [scenario_loop_v02] `content/scenario/main.json` (47266 bytes, sha256:e8a1d5cfaf142689)
- [publish_loop_v02] `AGENTS.md` (9856 bytes, sha256:576b33fccb9e33e9)
- [publish_loop_v02] `ARCHITECTURE.md` (9932 bytes, sha256:c22039ce3bc5573a)
- [publish_loop_v02] `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- [publish_loop_v02] `DESIGN.md` (9155 bytes, sha256:e758488f2bd7049b)
- [publish_loop_v02] `PUBLISH_INFO.json` (452 bytes, sha256:3a3ec2449e5cc86e)
- [publish_loop_v02] `README.md` (10591 bytes, sha256:f2a1ffc355c7c8e2)
- [publish_loop_v02] `README_MOUNTED.md` (249 bytes, sha256:c965fb0300df5fc8)
- [publish_loop_v02] `REPORT.md` (19715 bytes, sha256:3475c1da6fa5ecb5)
- [publish_loop_v02] `SCENARIO_INSTALL.md` (834 bytes, sha256:3a8824aba7b12825)
- [publish_loop_v02] `SN_PACKAGE_VERSION.txt` (236 bytes, sha256:8704321a080a8f18)
- [publish_loop_v02] `SPEC.md` (17697 bytes, sha256:c2ae043a999a304c)
- [publish_loop_v02] `content/assets/bg/bad_end_corridor.webp` (28604 bytes, sha256:537433a75a694956)
- [publish_loop_v02] `content/assets/bg/cafe.webp` (52508 bytes, sha256:c00d2d9b0013496f)
- [publish_loop_v02] `content/assets/bg/crossroad.webp` (50114 bytes, sha256:ec3b5e765c68c04c)
- [publish_loop_v02] `content/assets/bg/kiosk.webp` (61070 bytes, sha256:05f14530b0e59e0e)
- [publish_loop_v02] `content/assets/bg/maze_corridor.webp` (39806 bytes, sha256:684d9311d04ce743)
- [publish_loop_v02] `content/assets/bg/stairs_up.webp` (52730 bytes, sha256:7fbf49fcaccb2959)
- [publish_loop_v02] `content/assets/bg/station_stairs.webp` (39130 bytes, sha256:3241774aaccdc1d6)
- [publish_loop_v02] `content/assets/bg/water_corridor.webp` (86806 bytes, sha256:a5f4d6584a5fa73b)
- [publish_loop_v02] `content/manifest.json` (3921 bytes, sha256:c4a543163745a02e)
- [publish_loop_v02] `content/scenario/ASSET_REPORT.md` (877 bytes, sha256:8fe9e1b509669562)
- [publish_loop_v02] `content/scenario/BACKGROUND_ASSIGNMENT.md` (2853 bytes, sha256:5aa3eadd88b2f2eb)
- [publish_loop_v02] `content/scenario/LOOP_REFACTOR_REPORT.md` (1995 bytes, sha256:f98ee6021dcc86b0)
- [publish_loop_v02] `content/scenario/README_FOR_AUTHOR.md` (3323 bytes, sha256:69473acb53ca4a85)
- [publish_loop_v02] `content/scenario/REPORT.md` (8055 bytes, sha256:b2817cb360412120)
- [publish_loop_v02] `content/scenario/SCENARIO_SOURCE.md` (31091 bytes, sha256:8c64b7e8ab8d49c1)
- [publish_loop_v02] `content/scenario/SOURCE_COMPILE_REPORT.md` (894 bytes, sha256:bb2fb09d6cca562b)
- [publish_loop_v02] `content/scenario/SOURCE_REPORT.md` (487 bytes, sha256:f2ccf5e936bb3f7f)
- [publish_loop_v02] `content/scenario/SOURCE_ROUTE_REPORT.json` (10265 bytes, sha256:5d4179d5fc6d4ba7)
- [publish_loop_v02] `content/scenario/STORY_BIBLE.md` (6577 bytes, sha256:665a97d9a76330fa)
- [publish_loop_v02] `content/scenario/WORDING_REVISION_REPORT.md` (1120 bytes, sha256:3070b18b00da6b65)
- [publish_loop_v02] `content/scenario/main.json` (47266 bytes, sha256:e8a1d5cfaf142689)
- [publish_loop_v02] `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- [publish_loop_v02] `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- [publish_loop_v02] `docs/HUMAN_MANUAL.md` (2599 bytes, sha256:733c6d7115ba05d0)
- [publish_loop_v02] `docs/LICENSES.md` (359 bytes, sha256:e02151f4c8f4b86b)
- [publish_loop_v02] `docs/PATCH_NOTE_v02.md` (1093 bytes, sha256:ca77ec7fe322d4ea)
- [publish_loop_v02] `docs/PATCH_NOTE_v02a.md` (1146 bytes, sha256:4d2a70e47cd43ad4)
- [publish_loop_v02] `docs/PATCH_NOTE_v02b_loop.md` (1010 bytes, sha256:5fc1437f7b9aa4b2)
- [publish_loop_v02] `docs/archive_pre_v02a/FULL_CHECK_v22b.md` (8647 bytes, sha256:48c5a2474c18f126)
- [publish_loop_v02] `docs/archive_pre_v02a/LABEL_POLICY_v22b.md` (682 bytes, sha256:391c7dd75db1cf7d)
- [publish_loop_v02] `docs/archive_pre_v02a/PATCH_NOTE_v22b.md` (500 bytes, sha256:7ec454ade37ed0d7)
- [publish_loop_v02] `docs/sn_engine_author_full_check_v02.md` (12689 bytes, sha256:935a7f49ba81f281)
- [publish_loop_v02] `docs/sn_engine_author_full_check_v02a.md` (13117 bytes, sha256:222332560c6df8c3)
- [publish_loop_v02] `docs/sn_text_display_spec_v01.md` (18586 bytes, sha256:8588bf74ffd2ca12)
- [publish_loop_v02] `index.html` (4694 bytes, sha256:0d12e4371f4e38e9)
- [publish_loop_v02] `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- [publish_loop_v02] `src/engine/japaneseLayoutRules.js` (5110 bytes, sha256:e9208a4060120321)
- [publish_loop_v02] `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- [publish_loop_v02] `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- [publish_loop_v02] `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- [publish_loop_v02] `src/engine/textMeasure.js` (3242 bytes, sha256:93516aa02153a81d)
- [publish_loop_v02] `src/engine/textPaginator.js` (4572 bytes, sha256:f7ab12cea9899e40)
- [publish_loop_v02] `src/engine/typewriterController.js` (1693 bytes, sha256:a0b1b08743296e09)
- [publish_loop_v02] `src/engine/validator.js` (8588 bytes, sha256:80f0c942dc1b82f7)
- [publish_loop_v02] `src/main.js` (26907 bytes, sha256:87aca68341f69f32)
- [publish_loop_v02] `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- [publish_loop_v02] `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- [publish_loop_v02] `styles/base.css` (13894 bytes, sha256:c6a65f1b2ea1a3ad)
- [publish_loop_v02] `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- [publish_loop_v02] `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- [publish_loop_v02] `tests/japanese_layout_cases.json` (1650 bytes, sha256:25d90d811d1164f6)
- [publish_loop_v02] `tests/run_japanese_layout_static_tests.mjs` (1500 bytes, sha256:e3131f2ba2259c94)
- [publish_loop_v02] `tools/check_japanese_layout_rules.py` (5987 bytes, sha256:fde32243e4e09adc)
- [publish_loop_v02] `tools/check_route_graph.py` (9515 bytes, sha256:a73704c9e9fd2e77)
- [publish_loop_v02] `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- [publish_loop_v02] `tools/compile_scenario.py` (27535 bytes, sha256:2472ecd2275dc0be)
- [publish_loop_v02] `tools/publish_game.py` (2213 bytes, sha256:64ad84207f906009)
- [publish_loop_v02] `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)