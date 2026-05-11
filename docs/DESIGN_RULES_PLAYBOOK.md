# Design Rules Playbook

Purpose: make design changes predictable, global, and consistent across all pages.

This file defines **how** to apply visual changes in this repo.

## 1) Design intent (non-negotiable)

- Visual language is dark, brutalist, classified-document inspired.
- Reuse existing component classes and structure.
- No ad-hoc redesigns unless explicitly requested.

## 2) Global change principle

If a request sounds global ("all headings", "all cards", "all buttons"):

1. Map request to role groups in `docs/SEMANTIC_ROLE_MAP.md`.
2. Change shared CSS rules (not isolated HTML fragments).
3. Verify on all canonical pages:
   - `index.html`
   - `analyst.html`
   - `censored.html`
4. Report exactly which role groups were changed.

## 3) Where to change what

- Shared element behavior:
  - `css/shared.css`
- Home-page specific visuals:
  - `css/index.css`
- Case-page specific visuals:
  - `css/cases.css`
- Do not use inline style for static styling in production pages.

## 4) Typography governance

- H1/H2/H3 ownership is defined in `docs/SEMANTIC_ROLE_MAP.md`.
- If typography changes globally:
  - apply to all mapped classes in that role group
  - keep hierarchy contrast (H1 > H2 > H3 > body/meta)
- Do not mix role-level typography changes with one-off per-page tweaks.

## 5) Button governance

- Button classes are role-based (`primary compact`, `secondary action`, `form submit`, `utility`).
- If button sizing or style changes:
  - apply to every class in the role group
  - preserve interaction states (default/hover/focus)
- Do not style links as buttons unless they already use button classes.

## 6) Link governance

- Navigation links, footer links, and CTA anchors are different roles.
- If user says "change all links", clarify whether CTA anchors should be included.
- Keep nav/footer link behavior coherent across all pages.

## 7) Card governance

- Card types:
  - case
  - evidence
  - access
- If user asks "update cards", either:
  - apply to all card roles consistently, or
  - explicitly scope to one card role.

## 8) Spacing/layout governance

- Avoid introducing new spacing systems ad hoc.
- Prefer existing spacing rhythm and breakpoints already used in project CSS.
- For responsive updates, mirror existing breakpoint strategy before adding anything new.

## 9) Change checklist (must pass)

Before:
- Identify role group(s) from semantic map.
- List target files.

During:
- Apply changes in CSS first.
- Avoid one-off page hacks.

After:
- Validate visual consistency on all 3 canonical pages.
- Validate mobile at 375px.
- Provide changed file list and role groups changed.

## 10) Escalation cases

Ask user before implementing when:
- request conflicts with locked design language
- role mapping is ambiguous
- requested change implies architecture-level redesign
