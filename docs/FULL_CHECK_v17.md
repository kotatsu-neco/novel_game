# FULL_CHECK_v17.md

## 1. 対象

`kaeshisuzu_v17.zip` 生成前の作業ディレクトリ。

## 2. 総合判定

**静的・論理検査上は合格候補。**

## 3. 確認済み

- compiler check-only OK
- compiler 実行 OK
- compile_scenario.py 構文 OK
- JSON構文 OK
- JS構文チェック OK
- シーン参照 OK
- CSS参照 OK
- manifest.backgrounds 対応 OK
- 分岐総当たり OK
- Runtime JS が Authoring Markdown を直接読まない
- SCENARIO_SOURCE.md に se 属性を明示

分岐総当たり: `{'ending_true': 4, 'ending_bad': 13, 'ending_normal': 10}`

## 4. エラー

なし。

## 5. 警告

なし。

## 6. 未確認

- 実ブラウザ表示
- iPhone Safari実機表示
- 保存 / 読込の実動作
- 別Content Packでのcompiler実運用
- SCENARIO_SOURCE.mdを人間が編集した後の差分運用

## 7. 全ファイル一覧

- `AGENTS.md` (6574 bytes, sha256:b0220f054d660c8c)
- `ARCHITECTURE.md` (7213 bytes, sha256:ab855a4376025095)
- `CHANGELOG.md` (4304 bytes, sha256:7ff82e9ab80ba790)
- `DESIGN.md` (7853 bytes, sha256:fd77c94aad6b2dad)
- `README.md` (7450 bytes, sha256:9e9461fa7807c967)
- `REPORT.md` (15506 bytes, sha256:ca6c38903b4b2e9e)
- `SPEC.md` (12047 bytes, sha256:ae3647218dacdf04)
- `assets/bg/butsuma_morning.png` (2014748 bytes, sha256:0e6dc15136d3c293)
- `assets/bg/butsuma_night.png` (1723263 bytes, sha256:6500aa7eb18de00c)
- `assets/bg/mountain_path.png` (1596528 bytes, sha256:aad0c4948db0cb43)
- `assets/bg/old_house_evening.png` (1912005 bytes, sha256:043671599194bdec)
- `assets/bg/old_house_morning.png` (2073796 bytes, sha256:7027e74d10e37567)
- `assets/bg/shrine_dawn.png` (2440836 bytes, sha256:8f4476337575863b)
- `assets/bg/shrine_night.png` (2070767 bytes, sha256:09d44ca08a8f28eb)
- `content/manifest.json` (4593 bytes, sha256:a6ab795a058b26b4)
- `content/scenario/COMPILE_REPORT.md` (696 bytes, sha256:0c74e45f7fc1c92e)
- `content/scenario/SCENARIO_SCHEMA.json` (2229 bytes, sha256:d79f4e9c7d4a25b6)
- `content/scenario/SCENARIO_SOURCE.md` (14513 bytes, sha256:e9cb9c4f145c9d40)
- `content/scenario/STORY_BIBLE.md` (3898 bytes, sha256:e73c0623c48ce66e)
- `content/scenario/main.json` (23397 bytes, sha256:65389b61c590dec7)
- `docs/AI_SCENARIO_RULES.md` (2470 bytes, sha256:989749d394e9aa26)
- `docs/AUDIO_SOURCES.md` (332 bytes, sha256:f31e04d298f7a644)
- `docs/BRANCH_MAP.md` (854 bytes, sha256:357eab4f1b7532b0)
- `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- `docs/FILE_TREE.txt` (1840 bytes, sha256:decfaff00d9a0f8a)
- `docs/HUMAN_MANUAL.md` (2203 bytes, sha256:ecf55643728894a0)
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
- `docs/QA_CHECKLIST.md` (828 bytes, sha256:71139c1d6f96f781)
- `docs/SCENARIO_REVIEW_CHECKLIST.md` (1694 bytes, sha256:b4e24dde071722ee)
- `docs/TEXT_GUIDE.md` (3339 bytes, sha256:a6df7fc4fd2b1404)
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
- `tools/__pycache__/compile_scenario.cpython-313.pyc` (20975 bytes, sha256:80c9e05addfa5435)
- `tools/compile_scenario.py` (15181 bytes, sha256:680856051017e793)
- `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)
## 8. 追加確認

- `scenario.meta.compiledFrom`: `content/scenario/SCENARIO_SOURCE.md`
- compiledFrom relative path OK
