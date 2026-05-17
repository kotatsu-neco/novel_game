# AGENTS.md

## 作業範囲

このプロジェクトは、短編サウンドノベル『返し鈴』のHTML/JS最小実装である。

## 正本ファイル

以下のファイル名は変更禁止。

- AGENTS.md
- DESIGN.md
- ARCHITECTURE.md
- SPEC.md
- REPORT.md

履歴は CHANGELOG.md または REPORT.md に記録する。

## 変更してよい範囲

- `content/scenario/main.json`
- `src/`
- `styles/base.css`
- `docs/`

## 注意

- シナリオ本文は説明くさくしない。
- 主人公が知り得ない情報を本文に出さない。
- 声は「」で括る。
- 文書内容は『』で括る。
- 返鈴覚書は句読点なしを維持する。
- 祖母の走り書きは句点のみ。読点は使わない。
- 第三者素材を追加した場合は `docs/LICENSES.md` と `docs/AUDIO_SOURCES.md` を必ず更新する。

## Python系チェック

Pythonを追加した場合は、型・構文確認として可能な範囲で `pyrefly check` の実行を検討する。
ただし v0.1 には Python アプリコードは含まない。


## v0.9 UI/Engine Boundary Rules

- 画面全体スクロール禁止はエンジン仕様として維持する。
- 本文ウィンドウ内スクロール禁止はエンジン仕様として維持する。
- ページ送りは画面全体タップを基本とする。ただしボタン・選択肢・パネルは除外する。
- 長文はスクロールではなくページ分割で処理する。
- ページ分割量は将来的に設定化する。暫定値を変更する場合は理由と影響範囲を報告する。
- 作品固有の文言・背景画像・人物名をエンジンコードへ入れない。
- CSSを大きく変更する場合は、`docs/CSS_SPLIT_PLAN.md` を参照し、engine/themeのどちらの変更か報告する。


## v1.1 Typewriter Rules

- 文字送りはエンジン仕様として扱う。
- 文字送り中のタップは全文即時表示にする。
- 全文表示後のタップで次ページへ進む。
- 選択肢表示中、ボタン、パネル操作はページ送りにしない。
- 文書表示は可読性優先で、遅くしすぎない。
- 将来的には文字送り速度を設定化する。

## v1.2 Strict Pagination Rules

- ページ分割では、1行上限を超える文字列を1行扱いしない。
- 文書表示は「できるだけ一度で読む」よりも「画面から溢れない」を優先する。
- `charsPerLine` / `maxLines` を変更する場合は、iPhone Safariでの可読性リスクを報告する。
- `100svh` 指定は、モバイルSafari下部UIに本文が隠れるリスクを下げるための暫定対策として維持する。

## v1.3 Japanese Kinsoku Rules

- 日本語本文で、句点・読点・閉じ括弧だけを次行へ送らない。
- 行頭禁則文字は前行へ結合する。
- 句読点だけの行が出る修正は不合格。
- 改行・ページ分割を変更する場合は、句読点単独行の有無を検査する。

## v1.4 Text Layout Rules

- 本文表示はText Layout Engineとして扱う。
- シナリオの重要な切れ目には `pages` または `[p]` を使ってよい。
- `[r]` は改行、`[p]` は改ページとして扱う。
- `[l]` は将来予約。勝手に別用途へ使わない。
- バックログは kind 付き構造を維持する。
- 制作時は `docs/TEXT_GUIDE.md` を参照する。

## v1.5 Authoring Rules

- Runtime Engineは `main.json` のみを読む。
- AIは `STORY_BIBLE.md` を最上位設定正本として扱う。
- AIは `SCENARIO_SOURCE.md` のstatusを確認してから作業する。
- `locked` と `human_final` は変更禁止。問題指摘のみ。
- scene ID / next / score / forceEnding / endingCheck は本文修正タスクで変更しない。
- AIシナリオ作業では `docs/AI_SCENARIO_RULES.md` を必ず読む。
- 人間向け説明は `docs/HUMAN_MANUAL.md` を参照する。

## v1.6 Content Pack Rules

- 作品名は `manifest.title` を参照する。
- 保存キーは `manifest.saveKey` を参照する。
- 背景IDは `manifest.backgrounds` で解決する。
- 新しい作品へ積み替える時は、Runtime EngineのJSに背景IDを直書きしない。
- `styles/engine.css` と `styles/theme.css` は追加済み。ただしv1.6では `base.css` 互換を維持する。
- Authoring MarkdownをRuntime Engineで直接読ませない。

## v1.6-docfix Current Work Scope

### Runtime files

Editable with care:

```text
index.html
src/main.js
src/engine/
styles/engine.css
styles/theme.css
styles/base.css
content/manifest.json
content/scenario/main.json
```

Rules:

- Runtime Engine must not read Authoring Markdown directly.
- Runtime Engine reads `content/manifest.json` and `content/scenario/main.json`.
- Do not hard-code content-specific background IDs in `src/main.js`.
- Use `manifest.backgrounds` for background resolution.
- Use `manifest.saveKey` for save data.
- Use `manifest.title` for document title.

### Authoring files

Editable only according to status and authority rules:

```text
content/scenario/STORY_BIBLE.md
content/scenario/SCENARIO_SOURCE.md
content/scenario/COMPILE_REPORT.md
docs/AI_SCENARIO_RULES.md
docs/HUMAN_MANUAL.md
docs/SCENARIO_REVIEW_CHECKLIST.md
docs/TEXT_GUIDE.md
```

Rules:

- `STORY_BIBLE.md` is the highest story authority.
- `SCENARIO_SOURCE.md` is the human/AI scenario source.
- `main.json` is the runtime JSON.
- Do not change `locked` or `human_final` content unless explicitly instructed by the user.
- Do not change scene IDs, `next`, `score`, `forceEnding`, `endingCheck`, or `stateDefaults` during prose-only tasks.

### CSS split status

v1.6-docfix is not a complete CSS split.

```text
styles/engine.css  = future engine layout home
styles/theme.css   = future work-specific visual theme home
styles/base.css    = compatibility CSS still active
```

Do not delete `styles/base.css` until a full visual regression check has been completed outside this chat environment.

## v1.7 Compiler Rules

- `tools/compile_scenario.py` はAuthoring System用の変換器。
- Runtime Engineからcompilerを呼び出さない。
- `SCENARIO_SOURCE.md` を変更した場合は、`python tools/compile_scenario.py --check-only` を実行する。
- `main.json` を更新する場合は、`python tools/compile_scenario.py` を実行する。
- compilerがエラーを出した場合、`main.json` を手作業でつじつま合わせしない。
- `[text se=...]` のようなタグ属性はcompiler仕様として扱う。

## v1.8 Source Metadata Rules

- `SCENARIO_SOURCE.md` 先頭の `# content-pack` と `# backgrounds` はcompiler入力である。
- `title`, `gameId`, `saveKey`, `startScene` はsource-level metadataで管理できる。
- 背景定義はsourceの `# backgrounds` から `manifest.backgrounds` へ同期される。
- 別作品へ積み替える時は、manifestを手で直接合わせる前に `SCENARIO_SOURCE.md` metadataを更新し、compilerを実行する。
- Runtime EngineにAuthoring Markdownを読ませない。

## v1.9 Asset Rules

- 新しい背景画像を使う場合、`SCENARIO_SOURCE.md` の `# backgrounds` に必ず定義する。
- 新しい環境音・効果音を使う場合、`SCENARIO_SOURCE.md` の `# audio` に必ず定義する。
- シナリオ内の `background`, `ambience`, `se` がmanifest定義に存在するか検査する。
- 画像・音声ファイルを追加した場合、実ファイル存在・拡張子・パスを確認する。
- Runtime JSに作品固有の画像ID・音声IDを直書きしない。

## v20 Story Logic Rules

- Do not rely on score alone when a story fact must be guaranteed.
- Use `choice.set` for important facts such as item location, taboo violation, name spoken, returned object, or answered voice.
- Use `endingCheck.rules` for TRUE / NORMAL / BAD conditions.
- Keep legacy score fallback only for simple demos.
- If a scene assumes a specific fact, add `requires` or `assumes` in JSON or document it in the source.
- Run `python tools/check_story_logic.py` after scenario changes.
- Do not rewrite the prose only to hide a state inconsistency; fix the state/condition rule.

## v21 Authoring Rules for <=30 Minute Works

- Target playtime is up to 30 minutes.
- Do not design long multi-route games in this kit.
- Keep scene count below 80 unless explicitly justified.
- Keep total choice count below 25 unless explicitly justified.
- Use `conditionalText` at route merge points when prose depends on prior state.
- Use `state.visited[sceneId]` for repeat visits.
- Run `python tools/check_route_graph.py` after scenario changes.
- Treat merge points and loop candidates as review targets, not automatic failures.
- Do not hide a route merge contradiction by vague prose if state-based text is needed.

## v22 Rules

- Use `tools/publish_game.py` to create public/game-only zips.
- Do not include authoring files in publish zips.
- Keep speed settings independent for `text`, `voice`, and `document`.
- Timed choices must be optional. Do not use time limits unless the scenario requires it.
- Timed choices must include `timeoutNext` or `timeoutChoiceLabel`.
- Font size control is horizontal-writing only for now. Do not claim vertical writing support.

## v02 Agent Rules

- Do not restore fixed-character pagination as the primary method.
- Keep `charsPerLine / maxLines` as fallback only.
- Respect `[r]` as manual line break and `[p]` as manual page break.
- Do not remove `japaneseLayoutRules.js`, `textMeasure.js`, `textPaginator.js`, or `typewriterController.js`.
- Do not claim browser/iPhone verification unless it was actually performed.
- If changing font-size settings, ensure page recalculation remains wired.
- Run `tools/check_japanese_layout_rules.py` when a scenario is installed.
