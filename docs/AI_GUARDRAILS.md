# AI Guardrails (Project Rail System)

This file is the short operational contract for any AI working in this repo.

If there is any conflict:
1. User request
2. `CLAUDE.md`
3. This file

## 1) Core rule: reuse first, invent never

- Reuse existing HTML structure, classes, and patterns first.
- Do not introduce new design language unless user explicitly asks.
- Do not introduce new fonts, color families, button ratios, or spacing systems.
- If no existing component matches, stop and ask user before creating anything new.

## 2) Allowed edit surface by default

- Content/text updates in existing sections.
- Asset path updates inside existing blocks.
- New case pages cloned from existing case templates.
- Small bug fixes in existing CSS/JS logic.

## 3) Escalation required before doing these

- New framework/build system.
- New global CSS tokens, typography system, breakpoints, or layout primitives.
- New page architecture that does not follow current case/index structure.
- Removing or radically changing header/footer or clearance flow behavior.

## 4) Canonical sources of truth

- Main page structure: `index.html`
- Case page structure: `analyst.html`, `censored.html`
- Shared styles: `css/shared.css`
- Page styles: `css/index.css`, `css/cases.css`
- Interaction logic: `js/*.js`
- Visual grammar: `design-system.html`
- Semantic role mapping: `docs/SEMANTIC_ROLE_MAP.md`
- Design change protocol: `docs/DESIGN_RULES_PLAYBOOK.md`

## 5) Change protocol (mandatory)

Before edits:
- Read relevant source files.
- List exact files to edit.
- Confirm the target component exists already.

During edits:
- Keep changes local and minimal.
- Avoid unrelated refactors.
- Do not change naming conventions.

After edits:
- Validate links/paths still work.
- Validate mobile layout at 375px.
- Summarize what changed and why.

## 6) No-guess policy

If requirement is ambiguous, use this order:
1. Existing implementation in repo
2. `CLAUDE.md` rule
3. Ask user a short targeted question

Do not choose a creative direction by default.
