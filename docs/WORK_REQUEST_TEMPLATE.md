# Work Request Template (Copy/Paste)

Use this when giving a task to AI so it follows existing structure and does not improvise.

```md
Task:
<what to change>

Goal:
<what result should be visible>

Scope (strict):
- Files allowed to edit: <list>
- Files forbidden to edit: <list>
- Do not add new frameworks or architecture.
- Reuse existing components/classes only.

Design rules:
- Follow `CLAUDE.md` and `docs/AI_GUARDRAILS.md`.
- No new colors/fonts/spacing systems.
- Header/footer/access flow must remain consistent.

Acceptance criteria:
1. <check 1>
2. <check 2>
3. <check 3>

Output format:
- List edited files.
- Explain why each change was needed.
- Note any assumptions.
```

## Example short request

```md
Task:
Add CASE 03 page based on existing case template.

Scope (strict):
- Edit/create only: `case-03.html`, `css/cases.css` (only if needed).
- Do not touch `index.html` layout.
- Reuse structure from `censored.html`.

Acceptance criteria:
1. Header/footer exactly match existing pattern.
2. Mobile layout remains readable at 375px.
3. No new colors or fonts introduced.
```
