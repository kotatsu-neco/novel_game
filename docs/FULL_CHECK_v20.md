# FULL_CHECK_v20.md

## 1. 対象

`sound_novel_starter_v20`

## 2. 総合判定

**静的・論理検査上は合格候補。**

## 3. v20の目的

本文修正ではなく、今後の手詰まりを防ぐため、scoreだけに依存しない状態条件型のエンディング判定とstory consistency検査を追加した。

## 4. 実装内容

- Runtime `decideEnding(step)` が `endingCheck.rules` を評価
- `evaluateCondition()` / `getStateValue()` を追加
- legacy score fallbackを互換維持として残置
- validatorでcondition block / endingCheck.rules / requires / assumes / conditionalText を検査
- compilerで `[endingCheck]` の簡易ルール記法に対応
- `tools/check_story_logic.py` を追加
- 『返し鈴』本文の直接修正は未実施

## 5. 確認済み

- compile_scenario.py syntax: OK
- check_story_logic.py syntax: OK
- compiler check-only: OK
- compiler run: OK
- JS syntax src/main.js: OK
- JS syntax src/engine/audioManager.js: OK
- JS syntax src/engine/validator.js: OK
- JS syntax src/engine/saveLoad.js: OK
- JS syntax src/engine/sceneRunner.js: OK
- JS syntax src/engine/stateStore.js: OK
- JS syntax src/ui/textWindow.js: OK
- JS syntax src/ui/choicePanel.js: OK
- story logic checker run: OK
- main.js marker function evaluateCondition(condition): OK
- main.js marker function getStateValue(path): OK
- main.js marker Array.isArray(step.rules): OK
- main.js marker Legacy fallback: OK
- validator.js marker checkConditionBlock: OK
- validator.js marker endingCheck: OK
- validator.js marker requires: OK
- validator.js marker assumes: OK
- validator.js marker conditionalText: OK
- compiler marker def parse_ending_check: OK
- compiler marker def parse_condition_expr: OK
- compiler marker when:: OK
- compiler marker fallback:: OK
- story checker marker choice state updates: OK
- story checker marker endingCheck condition rules: OK
- story checker marker Condition keys not updated: OK
- condition test story checker: OK
- condition rule simulation: OK
- startScene exists: OK
- scenario next references: OK
- text files readable: OK

## 6. エラー

なし。

## 7. story logic checker warning

- ending_check: endingCheck has no rules and will use legacy fallback.

## 8. condition rule simulation

`{'true': 'ending_true', 'bad': 'ending_bad', 'normal': 'ending_normal'}`

## 9. 未確認

- 実ブラウザ表示
- iPhone Safari実機確認
- condition-based endingを使った本番シナリオの実機確認
- 『返し鈴』本文・分岐ロジックの修正反映

## 10. 役割担当レビュー

### 正本確認担当
v20では本文正本には手を入れず、エンジン・Authoring仕様側の補強に限定した。

### システム設計担当
score制の限界を補うため、state条件によるendingCheckを導入した。既存Content Pack互換のためlegacy fallbackも残した。

### 実装担当
Runtime、Validator、Compiler、Story Checkerの4箇所を更新。condition rulesの基本構造は静的検査で成立。

### 検証担当
構文、compiler、story checker、合成condition testはOK。実ブラウザは未確認。

### 批評・矛盾検出担当
今回の改修だけで既存『返し鈴』の矛盾は自動解消しない。次工程で本文/分岐にstate条件を適用する必要がある。

### 統合ディレクター
v20は今後の手詰まり防止の基礎改修として合格候補。次は『返し鈴』へのcondition rules適用またはAuthor Kitへの反映。


## 11. 全ファイル一覧

- `AGENTS.md` (8231 bytes, sha256:e18835b7e1d2390d)
- `ARCHITECTURE.md` (8666 bytes, sha256:fa800f887f4f2c88)
- `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- `DESIGN.md` (8675 bytes, sha256:a74ae6ff82507b5a)
- `README.md` (9092 bytes, sha256:4b4ea2a703c6a53a)
- `REPORT.md` (17919 bytes, sha256:30a919a9e5a9f0ab)
- `SPEC.md` (14524 bytes, sha256:8e0880bb1d573aa5)
- `assets/bg/butsuma_morning.png` (2014748 bytes, sha256:0e6dc15136d3c293)
- `assets/bg/butsuma_night.png` (1723263 bytes, sha256:6500aa7eb18de00c)
- `assets/bg/mountain_path.png` (1596528 bytes, sha256:aad0c4948db0cb43)
- `assets/bg/old_house_evening.png` (1912005 bytes, sha256:043671599194bdec)
- `assets/bg/old_house_morning.png` (2073796 bytes, sha256:7027e74d10e37567)
- `assets/bg/shrine_dawn.png` (2440836 bytes, sha256:8f4476337575863b)
- `assets/bg/shrine_night.png` (2070767 bytes, sha256:09d44ca08a8f28eb)
- `content/manifest.json` (4740 bytes, sha256:5b5c323c1b7a9c63)
- `content/scenario/COMPILE_REPORT.md` (863 bytes, sha256:63f9a5f8512d954b)
- `content/scenario/SCENARIO_SCHEMA.json` (2504 bytes, sha256:9c6fb1a8cd5bde19)
- `content/scenario/SCENARIO_SOURCE.md` (15277 bytes, sha256:171bbc80f1a73a83)
- `content/scenario/STORY_BIBLE.md` (3898 bytes, sha256:e73c0623c48ce66e)
- `content/scenario/main.json` (23371 bytes, sha256:5c8bfd182966d905)
- `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- `docs/AUDIO_SOURCES.md` (332 bytes, sha256:f31e04d298f7a644)
- `docs/BRANCH_MAP.md` (854 bytes, sha256:357eab4f1b7532b0)
- `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- `docs/FILE_TREE.txt` (1840 bytes, sha256:decfaff00d9a0f8a)
- `docs/FULL_CHECK_v17.md` (6003 bytes, sha256:9e188632568ff1d1)
- `docs/FULL_CHECK_v18.md` (7548 bytes, sha256:8dbe923d5c05ebf9)
- `docs/FULL_CHECK_v19.md` (8103 bytes, sha256:b1e2597d5fbcc4d3)
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
- `docs/QA_CHECKLIST.md` (828 bytes, sha256:71139c1d6f96f781)
- `docs/SCENARIO_REVIEW_CHECKLIST.md` (1694 bytes, sha256:b4e24dde071722ee)
- `docs/TEXT_GUIDE.md` (3738 bytes, sha256:5b591e9921304576)
- `docs/examples/ENDING_CHECK_CONDITION_EXAMPLE.md` (1347 bytes, sha256:bbad76c8fe489262)
- `index.html` (1974 bytes, sha256:838b0c449bc0ae31)
- `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- `src/engine/validator.js` (6447 bytes, sha256:b7040ab33736fd5c)
- `src/main.js` (18848 bytes, sha256:4607b9d36e9449b6)
- `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- `styles/base.css` (10990 bytes, sha256:f82b429fbe486349)
- `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- `tools/__pycache__/check_story_logic.cpython-313.pyc` (9139 bytes, sha256:88bab02d99aad0cf)
- `tools/__pycache__/compile_scenario.cpython-313.pyc` (36080 bytes, sha256:731b049ed53459a8)
- `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- `tools/compile_scenario.py` (27537 bytes, sha256:6f9d028b59fa0ecd)
- `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)