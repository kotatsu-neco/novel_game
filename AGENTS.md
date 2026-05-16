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
