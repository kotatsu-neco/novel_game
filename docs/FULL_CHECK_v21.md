# FULL_CHECK_v21.md

## 1. 対象

`sound_novel_starter_v21`

## 2. 総合判定

**静的・論理検査上は合格候補。**

## 3. v21の目的

最大30分程度の作品を対象に、分岐・合流・繰り返しで手詰まりや事実矛盾が起きにくいようにする。

## 4. 実装内容

- conditionalText Runtime対応
- state.visited[sceneId] 自動加算
- route guard追加
- deep state set対応
- tools/check_route_graph.py追加
- merge point / loop候補 / unreachable / dead route / 推定読了時間の検査
- 最大30分向け推奨規模の明文化
- 『返し鈴』本文の直接修正は未実施

## 5. 確認済み

- tools/compile_scenario.py syntax: OK
- tools/check_story_logic.py syntax: OK
- tools/check_route_graph.py syntax: OK
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
- route graph checker run: OK
- v21 synthetic route graph checker: OK
- v21 synthetic detects merge: OK
- v21 synthetic detects loop: OK
- v21 synthetic detects unreachable: OK
- main marker function selectConditionalTextCase(step): OK
- main marker step.type === "conditionalText": OK
- main marker state.visited[sceneId]: OK
- main marker MAX_ROUTE_STEPS: OK
- main marker setStateValues(data): OK
- route checker marker MAX_RECOMMENDED_EST_MINUTES = 30: OK
- route checker marker mergePoints: OK
- route checker marker incomingEdgeCounts: OK
- route checker marker estimatedMinutes: OK
- route checker marker unreachableScenes: OK
- README.md mentions 30 minutes: OK
- SPEC.md mentions 30 minutes: OK
- AGENTS.md mentions 30 minutes: OK
- docs/PATCH_NOTE_v21.md mentions 30 minutes: OK
- text files readable: OK

## 6. エラー

なし。

## 7. checker warnings

### story logic checker
- ending_check: endingCheck has no rules and will use legacy fallback.

### route graph checker
- なし。

## 8. route graph stats

```json
{
  "sceneCount": 24,
  "choiceCount": 9,
  "textChars": 3349,
  "estimatedMinutes": 7.4,
  "endingSceneCount": 3
}
```

### merge points
```json
{
  "ending_bad": {
    "incomingSources": [
      "ending_check",
      "voice_answer_result"
    ],
    "incomingEdgeCounts": {
      "voice_answer_result": 1,
      "ending_check": 1
    }
  },
  "ending_check": {
    "incomingSources": [
      "voice_no_turn_result",
      "voice_run_result"
    ],
    "incomingEdgeCounts": {
      "voice_no_turn_result": 1,
      "voice_run_result": 1
    }
  },
  "return_path": {
    "incomingSources": [
      "ema_place_bell_result",
      "ema_read_name_result",
      "ema_remove_result"
    ],
    "incomingEdgeCounts": {
      "ema_place_bell_result": 1,
      "ema_read_name_result": 1,
      "ema_remove_result": 1
    }
  },
  "road_to_shrine": {
    "incomingSources": [
      "bell_pocket_result",
      "bell_ring_result",
      "bell_wrap_result"
    ],
    "incomingEdgeCounts": {
      "bell_wrap_result": 1,
      "bell_pocket_result": 1,
      "bell_ring_result": 1
    }
  }
}
```

## 9. synthetic route graph test

```json
{
  "mergePoints": {
    "merge": {
      "incomingSources": [
        "start"
      ],
      "incomingEdgeCounts": {
        "start": 2
      }
    }
  },
  "cycles": [
    [
      "start",
      "start"
    ]
  ],
  "unreachableScenes": [
    "ending_bad",
    "unused_scene"
  ]
}
```

## 10. 未確認

- 実ブラウザ表示
- iPhone Safari実機確認
- conditionalTextを使った本番シナリオ実機確認
- 30分相当の実シナリオでの制作運用

## 11. 役割担当レビュー

### 正本確認担当
最大30分という対象範囲をSPEC/README/AGENTS/PATCH_NOTEへ反映。本文正本には手を入れていない。

### システム設計担当
分岐・合流・繰り返しに対し、conditionalText、visited、route graph checkerを追加。長編向けの複雑機能は避けた。

### 実装担当
Runtime、検査ツール、ドキュメントを更新。合成テストでmerge/loop/unreachable検出を確認。

### 検証担当
静的・論理検査では合格候補。実ブラウザは未確認。

### 批評・矛盾検出担当
既存『返し鈴』の矛盾はまだ直らないが、次回修正時に使える汎用基盤は入った。

### 統合ディレクター
v21は30分以内作品向けの分岐・合流・繰り返し対策として妥当。


## 12. 全ファイル一覧

- `AGENTS.md` (8859 bytes, sha256:9ba2b549d4132593)
- `ARCHITECTURE.md` (9220 bytes, sha256:d803cbb5e26bc5b4)
- `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- `DESIGN.md` (9155 bytes, sha256:e758488f2bd7049b)
- `README.md` (9888 bytes, sha256:38c799748ef21c94)
- `REPORT.md` (18596 bytes, sha256:d0fe2201cf651b45)
- `SPEC.md` (15903 bytes, sha256:ed64d5ce05f7ef6a)
- `assets/bg/butsuma_morning.png` (2014748 bytes, sha256:0e6dc15136d3c293)
- `assets/bg/butsuma_night.png` (1723263 bytes, sha256:6500aa7eb18de00c)
- `assets/bg/mountain_path.png` (1596528 bytes, sha256:aad0c4948db0cb43)
- `assets/bg/old_house_evening.png` (1912005 bytes, sha256:043671599194bdec)
- `assets/bg/old_house_morning.png` (2073796 bytes, sha256:7027e74d10e37567)
- `assets/bg/shrine_dawn.png` (2440836 bytes, sha256:8f4476337575863b)
- `assets/bg/shrine_night.png` (2070767 bytes, sha256:09d44ca08a8f28eb)
- `content/manifest.json` (4740 bytes, sha256:1698c45f08ba6623)
- `content/scenario/COMPILE_REPORT.md` (863 bytes, sha256:63f9a5f8512d954b)
- `content/scenario/SCENARIO_SCHEMA.json` (2504 bytes, sha256:9c6fb1a8cd5bde19)
- `content/scenario/SCENARIO_SOURCE.md` (15277 bytes, sha256:171bbc80f1a73a83)
- `content/scenario/STORY_BIBLE.md` (3898 bytes, sha256:e73c0623c48ce66e)
- `content/scenario/main.json` (23371 bytes, sha256:576344749da478d4)
- `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- `docs/AUDIO_SOURCES.md` (332 bytes, sha256:f31e04d298f7a644)
- `docs/BRANCH_MAP.md` (854 bytes, sha256:357eab4f1b7532b0)
- `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- `docs/FILE_TREE.txt` (1840 bytes, sha256:decfaff00d9a0f8a)
- `docs/FULL_CHECK_v17.md` (6003 bytes, sha256:9e188632568ff1d1)
- `docs/FULL_CHECK_v18.md` (7548 bytes, sha256:8dbe923d5c05ebf9)
- `docs/FULL_CHECK_v19.md` (8103 bytes, sha256:b1e2597d5fbcc4d3)
- `docs/FULL_CHECK_v20.md` (9332 bytes, sha256:9b4ca27dfc1c6284)
- `docs/FULL_CHECK_v21.md` (10162 bytes, sha256:adb2d88cd580ebbd)
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
- `docs/PATCH_NOTE_v21.md` (705 bytes, sha256:49cbddba2589fabd)
- `docs/QA_CHECKLIST.md` (828 bytes, sha256:71139c1d6f96f781)
- `docs/ROUTE_GRAPH_REPORT_v21.json` (3265 bytes, sha256:4b34413b5530cd9c)
- `docs/SCENARIO_REVIEW_CHECKLIST.md` (1694 bytes, sha256:b4e24dde071722ee)
- `docs/TEXT_GUIDE.md` (3738 bytes, sha256:5b591e9921304576)
- `docs/examples/ENDING_CHECK_CONDITION_EXAMPLE.md` (1347 bytes, sha256:bbad76c8fe489262)
- `index.html` (1974 bytes, sha256:838b0c449bc0ae31)
- `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- `src/engine/validator.js` (6447 bytes, sha256:b7040ab33736fd5c)
- `src/main.js` (21213 bytes, sha256:e09c9e057d042d0f)
- `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- `styles/base.css` (10990 bytes, sha256:f82b429fbe486349)
- `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- `tools/__pycache__/check_route_graph.cpython-313.pyc` (14112 bytes, sha256:b87931b367ea2ed8)
- `tools/__pycache__/check_story_logic.cpython-313.pyc` (9139 bytes, sha256:16492e00a7f3779a)
- `tools/__pycache__/compile_scenario.cpython-313.pyc` (36079 bytes, sha256:96d58ba99530efb3)
- `tools/check_route_graph.py` (9124 bytes, sha256:ed086e36f0447f16)
- `tools/check_story_logic.py` (5942 bytes, sha256:b4e1cf8f7b3612ac)
- `tools/compile_scenario.py` (27535 bytes, sha256:2472ecd2275dc0be)
- `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)