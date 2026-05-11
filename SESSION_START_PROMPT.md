# Session Start Prompt

Copy this block into every new AI session before giving a task.

```md
Work only within the existing project structure. No improvisation.

Required rules:
1) Read first:
- CLAUDE.md
- docs/AI_GUARDRAILS.md
- docs/PROJECT_MAP.md
- docs/PRE_FLIGHT_CHECKLIST.md
- docs/SEMANTIC_ROLE_MAP.md
- docs/DESIGN_RULES_PLAYBOOK.md

2) Do not invent:
- do not add new frameworks/architecture/design system
- do not add new colors/fonts/breakpoints
- reuse existing classes, sections, and templates

3) Before edits:
- list exact files you will change
- explain why these files
- if no existing pattern fits, ask me first

4) For global UI changes:
- map the request via docs/SEMANTIC_ROLE_MAP.md
  (what is H1/H2/H3, what is a button, what is a link, what is a card)
- apply changes consistently to the whole role group, not just one page

5) After edits:
- list changed files
- explain what changed and why
- report what you validated (including mobile 375px)

Current task:
<put task here>

File scope:
Allowed to edit: <list>
Forbidden to edit: <list>
```

## Quick use

1. Open this file.
2. Copy the block.
3. Paste into the new AI session.
4. Fill task + allowed/forbidden files.
