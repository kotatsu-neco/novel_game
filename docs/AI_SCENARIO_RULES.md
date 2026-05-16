# AI_SCENARIO_RULES.md

## 1. Purpose

This file is not a human tutorial.  
It is a working rule file for AI agents that draft, revise, inspect, or convert scenario material.

## 2. Read first

AI agents must read these files before editing scenario material.

1. `content/scenario/STORY_BIBLE.md`
2. `content/scenario/SCENARIO_SOURCE.md`
3. `SPEC.md`
4. `DESIGN.md`
5. `docs/TEXT_GUIDE.md`
6. `docs/SCENARIO_REVIEW_CHECKLIST.md`

## 3. Authority order

When sources conflict, obey this order.

1. `STORY_BIBLE.md`
2. `SCENARIO_SOURCE.md` scenes with `status: locked` or `status: human_final`
3. `SPEC.md`
4. `DESIGN.md`
5. `docs/TEXT_GUIDE.md`
6. Current user task
7. AI suggestions

AI suggestions never override higher authority files.

## 4. Status rules

| status | AI permission |
|---|---|
| `draft` | May create and heavily revise |
| `ai_revise` | May revise directly |
| `human_review` | May suggest only. Do not directly rewrite as final |
| `human_final` | Do not change. Point out issues only |
| `locked` | Do not change. Treat as canonical |

## 5. Editable areas

AI may edit or suggest edits for:

- prose in `draft`
- prose in `ai_revise`
- rough wording alternatives
- over-explanation reduction
- protagonist viewpoint fixes
- `[p]` page break suggestions
- `[r]` line break suggestions
- line wrapping improvements
- scene draft proposals
- contradiction reports

## 6. Forbidden changes

AI must not change unless explicitly instructed by the user:

- `STORY_BIBLE.md` facts
- `locked` scenes
- `human_final` scenes
- scene IDs
- `next`
- `score`
- `forceEnding`
- `endingCheck`
- `stateDefaults`
- 返鈴覚書 canonical wording
- protagonist knowledge scope
- ending logic
- background IDs as implementation facts

## 7. Output format

AI output for scenario editing must use this format.

```md
## 対象

scene:
status:

## 変更方針

- ...

## 変更案

...

## 変更していないもの

- scene ID
- next
- score
- ending rules
- locked text

## 検査結果

- STORY_BIBLE consistency:
- protagonist viewpoint:
- over-explanation:
- voice brackets:
- document brackets:
- kinsoku / page amount:
- branch structure:

## 未確認

- iPhone Safari display
- runtime behavior
```

## 8. Failure handling

If the AI cannot determine whether a change is allowed, it must stop and report:

- uncertain point
- relevant file/section
- proposed safe alternatives

Do not invent missing setting facts.
Do not silently rewrite locked material.

## v1.8 Source Metadata Rules

AI must treat the `# content-pack` and `# backgrounds` sections in `SCENARIO_SOURCE.md` as structured compiler input.

AI must not:
- rename `gameId` casually
- change `saveKey` without explicit instruction
- change `startScene` during prose-only tasks
- invent background IDs without adding them to `# backgrounds`

When proposing a new content pack, AI must output:
- content-pack metadata
- background definitions
- scene blocks
- validation notes
