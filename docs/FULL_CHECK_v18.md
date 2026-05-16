# FULL_CHECK_v18.md

## 1. 対象

`kaeshisuzu_v18.zip` 生成前の作業ディレクトリ。

## 2. 総合判定

**静的・論理検査上は合格候補。**

## 3. 確認済み

- Text files readable: OK
- manifest.version: OK
- scenario.meta.version: OK
- source metadata exists: OK
- source metadata title: OK
- source metadata gameId: OK
- source metadata saveKey: OK
- source metadata startScene: OK
- Required v1.8 files present: OK
- Compiler Python syntax: OK
- Compiler check-only: OK
- Compiler run: OK
- compiled manifest title: OK
- compiled manifest gameId: OK
- compiled manifest saveKey: OK
- compiled scenario startScene: OK
- sourceMetadataEnabled: OK
- SCENARIO_SCHEMA v1.8 title: OK
- JS syntax: OK
- Runtime does not read authoring markdown: OK
- No old fixed save key in runtime: OK
- index links styles/engine.css: OK
- index links styles/theme.css: OK
- index links styles/base.css: OK
- CSS url references: OK
- Scene IDs unique: OK
- startScene exists: OK
- Scenario references: OK
- Text brackets: OK
- Background specs: OK
- All endings reachable: OK
- 返鈴覚書 count: OK
- 返鈴覚書 punctuation: OK
- 祖母の走り書き count: OK
- 祖母の走り書き no 読点: OK

## 4. エラー

なし。

## 5. 警告

なし。


## 6. Source-level metadata確認

- title: `返し鈴`
- gameId: `kaeshisuzu`
- saveKey: `kaeshisuzu_save_v01`
- startScene: `title`
- backgrounds: `9`
- route counts: `{'ending_true': 4, 'ending_bad': 13, 'ending_normal': 10}`

## 7. 未確認

- 実ブラウザ表示
- iPhone Safari実機表示
- 保存 / 読込の実動作
- 別Content Packでのsource-level metadata実運用

## 8. 全ファイル一覧

- `AGENTS.md` (7102 bytes, sha256:932ebe57593b5816)
- `ARCHITECTURE.md` (7664 bytes, sha256:b323627e04df1bcf)
- `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- `DESIGN.md` (8223 bytes, sha256:f64eb79d02ddaa86)
- `README.md` (8080 bytes, sha256:b6788bed2b94ccc8)
- `REPORT.md` (16335 bytes, sha256:0b459a1d46184332)
- `SPEC.md` (12656 bytes, sha256:e23c457cfb80fbda)
- `assets/bg/butsuma_morning.png` (2014748 bytes, sha256:0e6dc15136d3c293)
- `assets/bg/butsuma_night.png` (1723263 bytes, sha256:6500aa7eb18de00c)
- `assets/bg/mountain_path.png` (1596528 bytes, sha256:aad0c4948db0cb43)
- `assets/bg/old_house_evening.png` (1912005 bytes, sha256:043671599194bdec)
- `assets/bg/old_house_morning.png` (2073796 bytes, sha256:7027e74d10e37567)
- `assets/bg/shrine_dawn.png` (2440836 bytes, sha256:8f4476337575863b)
- `assets/bg/shrine_night.png` (2070767 bytes, sha256:09d44ca08a8f28eb)
- `content/manifest.json` (4689 bytes, sha256:8db8a72b02404860)
- `content/scenario/COMPILE_REPORT.md` (806 bytes, sha256:98c1a12d50b392de)
- `content/scenario/SCENARIO_SCHEMA.json` (2504 bytes, sha256:9c6fb1a8cd5bde19)
- `content/scenario/SCENARIO_SOURCE.md` (15253 bytes, sha256:bed356d63365bf34)
- `content/scenario/STORY_BIBLE.md` (3898 bytes, sha256:e73c0623c48ce66e)
- `content/scenario/main.json` (23372 bytes, sha256:cc395712302bb3cf)
- `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- `docs/AUDIO_SOURCES.md` (332 bytes, sha256:f31e04d298f7a644)
- `docs/BRANCH_MAP.md` (854 bytes, sha256:357eab4f1b7532b0)
- `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- `docs/FILE_TREE.txt` (1840 bytes, sha256:decfaff00d9a0f8a)
- `docs/FULL_CHECK_v17.md` (6003 bytes, sha256:9e188632568ff1d1)
- `docs/HUMAN_MANUAL.md` (2599 bytes, sha256:733c6d7115ba05d0)
- `docs/INTERNAL_CHECK_v02.txt` (208 bytes, sha256:ae934b30f4bf053b)
- `docs/INTERNAL_CHECK_v04.txt` (172 bytes, sha256:e0ffc3963b26c946)
- `docs/INTERNAL_CHECK_v05.txt` (174 bytes, sha256:23575422d6e6b6b7)
- `docs/INTERNAL_CHECK_v06.txt` (143 bytes, sha256:d25925641f28095c)
- `docs/INTERNAL_CHECK_v07.txt` (57 bytes, sha256:48dea6f803bac245)
- `docs/INTERNAL_CHECK_v08.txt` (57 bytes, sha256:8c60b8528bab3d5d)
- `docs/INTERNAL_CHECK_v09.txt` (225 bytes, sha256:21d98bfff6f8be9e)
- `docs/INTERNAL_CHECK_v10.txt` (279 bytes, sha256:37ab3bc4fcbd2a4b)
- `docs/INTERNAL_CHECK_v11.txt` (204 bytes, sha256:f252c7a1f35f73fa)
- `docs/INTERNAL_CHECK_v12.txt` (359 bytes, sha256:394c019e64fa0ebc)
- `docs/INTERNAL_CHECK_v13.txt` (354 bytes, sha256:6111069801e93e1a)
- `docs/INTERNAL_CHECK_v14.txt` (307 bytes, sha256:45f38dcb11411635)
- `docs/INTERNAL_CHECK_v15.txt` (386 bytes, sha256:661e6dd2d8f94e90)
- `docs/INTERNAL_CHECK_v16.txt` (619 bytes, sha256:96822b609eb8fd20)
- `docs/INTERNAL_CHECK_v16_docfix.txt` (537 bytes, sha256:835610e64f4aa9b6)
- `docs/INTERNAL_CHECK_v17.txt` (436 bytes, sha256:0c99a2017dd889a8)
- `docs/LICENSES.md` (359 bytes, sha256:e02151f4c8f4b86b)
- `docs/PATCH_NOTE_v03.md` (566 bytes, sha256:cace6624366dfb3d)
- `docs/PATCH_NOTE_v04.md` (604 bytes, sha256:3ff1f62291fd1ce5)
- `docs/PATCH_NOTE_v05.md` (758 bytes, sha256:c9bbc409957a419b)
- `docs/PATCH_NOTE_v06.md` (876 bytes, sha256:3e51a5ef12cc98a5)
- `docs/PATCH_NOTE_v07.md` (597 bytes, sha256:85c143624b1ae46b)
- `docs/PATCH_NOTE_v08.md` (622 bytes, sha256:321ee97657660709)
- `docs/PATCH_NOTE_v09.md` (709 bytes, sha256:7c1da5288f834107)
- `docs/PATCH_NOTE_v10.md` (846 bytes, sha256:df052198d1c0d0f4)
- `docs/PATCH_NOTE_v11.md` (664 bytes, sha256:9389bad88d8c7e6a)
- `docs/PATCH_NOTE_v12.md` (741 bytes, sha256:760b5e2e92c9f7e0)
- `docs/PATCH_NOTE_v13.md` (590 bytes, sha256:91308412fab0f6b6)
- `docs/PATCH_NOTE_v14.md` (671 bytes, sha256:830d4dbdcece28e6)
- `docs/PATCH_NOTE_v15.md` (929 bytes, sha256:f4bb648a212f7a72)
- `docs/PATCH_NOTE_v16.md` (1044 bytes, sha256:0685c3051d3d43a4)
- `docs/PATCH_NOTE_v16_docfix.md` (876 bytes, sha256:b8c6f77d34e4d037)
- `docs/PATCH_NOTE_v17.md` (813 bytes, sha256:28780fecdb84fb13)
- `docs/PATCH_NOTE_v18.md` (826 bytes, sha256:b9c974fc2a13cb4f)
- `docs/QA_CHECKLIST.md` (828 bytes, sha256:71139c1d6f96f781)
- `docs/SCENARIO_REVIEW_CHECKLIST.md` (1694 bytes, sha256:b4e24dde071722ee)
- `docs/TEXT_GUIDE.md` (3738 bytes, sha256:5b591e9921304576)
- `index.html` (1974 bytes, sha256:838b0c449bc0ae31)
- `src/engine/audioManager.js` (2678 bytes, sha256:fd5b4e2c1fba5e8e)
- `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- `src/engine/validator.js` (3362 bytes, sha256:f52686751ca73195)
- `src/main.js` (16904 bytes, sha256:ba54d2d37f42d538)
- `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- `styles/base.css` (10990 bytes, sha256:f82b429fbe486349)
- `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- `tools/__pycache__/compile_scenario.cpython-313.pyc` (28551 bytes, sha256:55f1bba87c62b1c9)
- `tools/compile_scenario.py` (21284 bytes, sha256:966de8d4e75640a2)
- `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)

## 9. 役割担当レビュー

### 正本確認担当
source-level metadataをSCENARIO_SOURCE.mdに追加し、manifest/main.jsonへ同期できることを確認。

### 実装担当
compilerはRuntimeに組み込まれておらず、AuthoringとRuntimeの責任境界は維持されている。

### 検証担当
静的・論理検査ではエラーなし。実表示・保存読込は別工程。

### 批評・矛盾検出担当
v1.7で残ったstartScene固定問題は、v1.8でsource metadataにより解消方向。

### 統合ディレクター
v1.8は、別Content Pack積み替えの前提を一段進めた基準成果物として扱える。
