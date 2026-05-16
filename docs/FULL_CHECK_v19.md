# FULL_CHECK_v19.md

## 1. 対象

`sound_novel_starter_v19`

## 2. 総合判定

**静的・論理検査上は合格候補。**

## 3. 確認済み

- compiler 実行 OK
- compiler check-only OK
- Python compiler 構文 OK
- JS構文チェック OK
- Runtime Audio Engine が `manifest.audio` を参照可能
- `src/main.js` が `audio.configure(manifest.audio)` を呼ぶ
- Runtime JS に作品固有の画像ID・音声IDを直書きしていない
- Runtime JS が Authoring Markdown を直接読まない
- 既存『返し鈴』サンプルの main.json / manifest.json 同期 OK

## 4. v1.9で追加したAsset仕様

```text
manifest.backgrounds: 背景画像 / CSS背景の定義
manifest.audio.ambiences: 環境音ファイル定義
manifest.audio.se: 効果音ファイル定義
SCENARIO_SOURCE.md # backgrounds: 背景定義の入力
SCENARIO_SOURCE.md # audio: 音声定義の入力
```

## 5. 未確認

- 実ブラウザでの画像表示
- 実ブラウザでの音声再生
- iPhone Safariでの音声再生
- 保存 / 読込の実動作
- file:// 直開き時の音声再生可否

## 6. 予測される問題

- iPhone Safariでは、ユーザー操作前の音声再生は制限される可能性が高い。現仕様では「音をオン」ボタン後の再生を前提にする必要がある。
- ローカルの file:// 直開きでは、ブラウザや端末により音声ファイル読み込みが不安定になる可能性がある。実機確認はローカルHTTPサーバーまたはホスティング環境が望ましい。
- 画像サイズ・縦横比がスマホ縦画面と大きく違う場合、cover表示で重要部分が切れる可能性がある。
- manifest.audioに定義せずscenario側で ambience / se を使うと、compiler検査で弾く方針にした。これは事故防止として妥当。
- base.css互換が残っているため、theme.cssだけを差し替えても完全に見た目を分離できる段階ではない。

## 7. 全ファイル一覧

- `AGENTS.md` (7632 bytes, sha256:7991951091839de7)
- `ARCHITECTURE.md` (8096 bytes, sha256:f56169642ce9affc)
- `CHANGELOG.md` (4625 bytes, sha256:d26f50ccd84e51c4)
- `DESIGN.md` (8223 bytes, sha256:f64eb79d02ddaa86)
- `README.md` (8531 bytes, sha256:eb64f240c4f739e7)
- `REPORT.md` (17076 bytes, sha256:ac1379edde5de115)
- `SPEC.md` (13410 bytes, sha256:ec985569edd8e5a5)
- `assets/bg/butsuma_morning.png` (2014748 bytes, sha256:0e6dc15136d3c293)
- `assets/bg/butsuma_night.png` (1723263 bytes, sha256:6500aa7eb18de00c)
- `assets/bg/mountain_path.png` (1596528 bytes, sha256:aad0c4948db0cb43)
- `assets/bg/old_house_evening.png` (1912005 bytes, sha256:043671599194bdec)
- `assets/bg/old_house_morning.png` (2073796 bytes, sha256:7027e74d10e37567)
- `assets/bg/shrine_dawn.png` (2440836 bytes, sha256:8f4476337575863b)
- `assets/bg/shrine_night.png` (2070767 bytes, sha256:09d44ca08a8f28eb)
- `content/manifest.json` (4741 bytes, sha256:fc52ec2b5844fad0)
- `content/scenario/COMPILE_REPORT.md` (863 bytes, sha256:63f9a5f8512d954b)
- `content/scenario/SCENARIO_SCHEMA.json` (2504 bytes, sha256:9c6fb1a8cd5bde19)
- `content/scenario/SCENARIO_SOURCE.md` (15277 bytes, sha256:171bbc80f1a73a83)
- `content/scenario/STORY_BIBLE.md` (3898 bytes, sha256:e73c0623c48ce66e)
- `content/scenario/main.json` (23372 bytes, sha256:560aa37548eb7c5a)
- `docs/AI_SCENARIO_RULES.md` (2953 bytes, sha256:c67344712b2cc064)
- `docs/AUDIO_SOURCES.md` (332 bytes, sha256:f31e04d298f7a644)
- `docs/BRANCH_MAP.md` (854 bytes, sha256:357eab4f1b7532b0)
- `docs/CSS_SPLIT_PLAN.md` (2229 bytes, sha256:b7df336a69019566)
- `docs/FILE_TREE.txt` (1840 bytes, sha256:decfaff00d9a0f8a)
- `docs/FULL_CHECK_v17.md` (6003 bytes, sha256:9e188632568ff1d1)
- `docs/FULL_CHECK_v18.md` (7548 bytes, sha256:8dbe923d5c05ebf9)
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
- `docs/PATCH_NOTE_v19.md` (669 bytes, sha256:31f570c713b6464f)
- `docs/QA_CHECKLIST.md` (828 bytes, sha256:71139c1d6f96f781)
- `docs/SCENARIO_REVIEW_CHECKLIST.md` (1694 bytes, sha256:b4e24dde071722ee)
- `docs/TEXT_GUIDE.md` (3738 bytes, sha256:5b591e9921304576)
- `index.html` (1974 bytes, sha256:838b0c449bc0ae31)
- `src/engine/audioManager.js` (4048 bytes, sha256:a6696566086d4c9f)
- `src/engine/saveLoad.js` (377 bytes, sha256:8dc77472ac33af1e)
- `src/engine/sceneRunner.js` (77 bytes, sha256:0fe223ad183f2302)
- `src/engine/stateStore.js` (69 bytes, sha256:841771c7c5b78816)
- `src/engine/validator.js` (3362 bytes, sha256:f52686751ca73195)
- `src/main.js` (16946 bytes, sha256:8d188b8518ef0875)
- `src/ui/choicePanel.js` (52 bytes, sha256:9237dd2539e1a662)
- `src/ui/textWindow.js` (51 bytes, sha256:7b50bec8aa1b106f)
- `styles/base.css` (10990 bytes, sha256:f82b429fbe486349)
- `styles/engine.css` (454 bytes, sha256:cca5aacdd53b8b3a)
- `styles/theme.css` (372 bytes, sha256:bf40b995a2f22c72)
- `tools/__pycache__/compile_scenario.cpython-313.pyc` (31499 bytes, sha256:0a003ac8b0437a0e)
- `tools/compile_scenario.py` (23808 bytes, sha256:133ad84813ded52a)
- `tools/validate_scenario.html` (525 bytes, sha256:d34408de244c0694)

## 8. 役割担当レビュー

### 正本確認担当
v1.9でAsset仕様がSPEC/ARCHITECTURE/AGENTS/REPORTへ反映されていることを確認。

### 実装担当
Audio Engineは `manifest.audio` を参照する構造になった。Runtimeに作品固有IDを直書きしていない。

### 検証担当
静的検査では問題なし。ただし音声再生はブラウザ依存が大きいため、実ブラウザ確認を後続必須とする。

### 批評・矛盾検出担当
音声ファイル対応によりContent Pack化は前進。ただしbase.css互換とブラウザ音声制限は残課題。

### 統合ディレクター
v1.9は画像・音声を含むContent Pack積み替え検証の基準成果物として扱える。