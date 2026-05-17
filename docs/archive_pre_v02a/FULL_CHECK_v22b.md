# FULL_CHECK_v22b.md

## 1. 対象

`sound_novel_starter_v22b`

## 2. 総合判定

**設定画面ラベル・レイアウト修正の静的検査上は合格候補。**

## 3. 変更内容

- 設定画面を2カラム化
- 左カラム見出しを「表示速度」に変更
- 右カラム見出しを「文字サイズ」に変更
- 各カラム内を「本文 / 台詞 / 文書」の縦並びに変更
- UI表示名から「作中」を削除
- 内部キー `text / voice / document` とHTML control idは維持

## 4. 確認済み

- settings columns present: OK
- column labels present: OK
- short labels present: OK
- old 作中 labels absent in index: OK
- katakana 台詞 absent in index: OK
- v22b css present: OK
- speed ids unchanged: OK
- font ids unchanged: OK
- JS syntax src/main.js: OK
- JS syntax src/engine/audioManager.js: OK
- JS syntax src/engine/saveLoad.js: OK
- JS syntax src/engine/sceneRunner.js: OK
- JS syntax src/engine/stateStore.js: OK
- JS syntax src/engine/validator.js: OK
- JS syntax src/ui/choicePanel.js: OK
- JS syntax src/ui/textWindow.js: OK
- tools/compile_scenario.py syntax: OK
- tools/check_story_logic.py syntax: OK
- tools/check_route_graph.py syntax: OK
- tools/publish_game.py syntax: OK
- compiler check-only: OK
- story logic checker: OK
- route graph checker: OK
- text files readable: OK
- JSON parse: OK
- Markdown fences balanced: OK
- no cache files: OK

## 5. エラー

なし。

## 6. 未確認

- 実ブラウザ表示
- iPhone Safariでの設定画面表示
- 2カラムの横幅・余白
- 文字サイズ変更時の表示崩れ

## 7. 役割担当レビュー

### UI/UX担当
速度と文字サイズを列で分離したため、設定項目の意味が視線上で追いやすくなった。

### アクセシビリティ担当
短いラベルに戻したことでiPhone表示時の密度が改善する見込み。ただし実機確認は未実施。

### 実装担当
HTML control idと内部キーは維持。JavaScript側の設定処理には影響を与えていない。

### 批評・矛盾検出担当
「台詞」表記は残していない。「台詞」を使用。

### 統合ディレクター
v22bは実機確認へ進める状態。


## 8. 全ファイル一覧

- `AGENTS.md` (9311 bytes, sha256:df9cd775207840b6)
- `ARCHITECTURE.md` (9220 bytes, sha256:d803cbb5e26bc5b4)
- `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- `DESIGN.md` (9155 bytes, sha256:e758488f2bd7049b)
- `README.md` (10411 bytes, sha256:be633fb848d36050)
- `REPORT.md` (19112 bytes, sha256:18d9765908c17255)
- `SPEC.md` (16644 bytes, sha256:0bbc5a58dcd7e940)
- `assets/bg/butsuma_morning.png` (2014748 bytes, sha256:0e6dc15136d3c293)
- `assets/bg/butsuma_night.png` (1723263 bytes, sha256:6500aa7eb18de00c)
- `assets/bg/mountain_path.png` (1596528 bytes, sha256:aad0c4948db0cb43)
- `assets/bg/old_house_evening.png` (1912005 bytes, sha256:043671599194bdec)
- `assets/bg/old_house_morning.png` (2073796 bytes, sha256:7027e74d10e37567)
- `assets/bg/shrine_dawn.png` (2440836 bytes, sha256:8f4476337575863b)
- `assets/bg/shrine_night.png` (2070767 bytes, sha256:09d44ca08a8f28eb)
- `content/manifest.json` (5514 bytes, sha256:97bff670608fc2cb)
- `content/scenario/COMPILE_REPORT.md` (863 bytes, sha256:63f9a5f8512d954b)
- `content/scenario/SCENARIO_SCHEMA.json` (2504 bytes, sha256:9c6fb1a8cd5bde19)
- `content/scenario/SCENARIO_SOURCE.md` (15277 bytes, sha256:171bbc80f1a73a83)
- `content/scenario/STORY_BIBLE.md` (3898 bytes, sha256:e73c0623c48ce66e)
- `content/scenario/main.json` (23372 bytes, sha256:87ba150ff092b7d9)
- `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- `docs/AUDIO_SOURCES.md` (332 bytes, sha256:f31e04d298f7a644)
- `docs/BRANCH_MAP.md` (854 bytes, sha256:357eab4f1b7532b0)
- `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- `docs/FILE_TREE.txt` (1840 bytes, sha256:decfaff00d9a0f8a)
- `docs/FULL_CHECK_v17.md` (6003 bytes, sha256:9e188632568ff1d1)
- `docs/FULL_CHECK_v18.md` (7548 bytes, sha256:8dbe923d5c05ebf9)
- `docs/FULL_CHECK_v19.md` (8103 bytes, sha256:b1e2597d5fbcc4d3)
- `docs/FULL_CHECK_v20.md` (9332 bytes, sha256:9b4ca27dfc1c6284)
- `docs/FULL_CHECK_v21.md` (10890 bytes, sha256:3de3f5e938230db2)
- `docs/FULL_CHECK_v22.md` (9970 bytes, sha256:c8f58a929e1934fd)
- `docs/FULL_CHECK_v22a.md` (7308 bytes, sha256:6885fc7428c44bd6)
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
- `docs/INTERNAL_CHECK_v19.txt` (210 bytes, sha256:3a86c8bb51044850)
- `docs/LABEL_POLICY_v22a.md` (492 bytes, sha256:20ec6b0f369040a2)
- `docs/LABEL_POLICY_v22b.md` (679 bytes, sha256:4560d0262f522eef)
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
- `docs/PATCH_NOTE_v19.md` (669 bytes, sha256:31f570c713b6464f)
- `docs/PATCH_NOTE_v20.md` (899 bytes, sha256:8033fa647a846589)
- `docs/PATCH_NOTE_v21.md` (705 bytes, sha256:49cbddba2589fabd)
- `docs/PATCH_NOTE_v22.md` (1034 bytes, sha256:a1e62207c15dc697)
- `docs/PATCH_NOTE_v22b.md` (503 bytes, sha256:4c8f401f84137920)
- `docs/QA_CHECKLIST.md` (828 bytes, sha256:71139c1d6f96f781)
- `docs/ROUTE_GRAPH_REPORT_v21.json` (3265 bytes, sha256:4b34413b5530cd9c)
- `docs/SCENARIO_REVIEW_CHECKLIST.md` (1694 bytes, sha256:b4e24dde071722ee)
- `docs/TEXT_GUIDE.md` (3738 bytes, sha256:5b591e9921304576)
- `docs/examples/ENDING_CHECK_CONDITION_EXAMPLE.md` (1347 bytes, sha256:bbad76c8fe489262)
- `index.html` (4694 bytes, sha256:0d12e4371f4e38e9)
- `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- `src/engine/validator.js` (7089 bytes, sha256:cbbee9b6c763cff5)
- `src/main.js` (26778 bytes, sha256:281edd8e204d03a6)
- `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- `styles/base.css` (13484 bytes, sha256:f5383e18799501f3)
- `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- `tools/check_route_graph.py` (9515 bytes, sha256:a73704c9e9fd2e77)
- `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- `tools/compile_scenario.py` (27535 bytes, sha256:2472ecd2275dc0be)
- `tools/publish_game.py` (2213 bytes, sha256:64ad84207f906009)
- `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)