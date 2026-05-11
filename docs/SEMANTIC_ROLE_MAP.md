# Semantic Role Map (Headings / Buttons / Links / Cards)

This file defines what each element role is in this project.
Use it as the primary map for global UI updates.

## 1) Heading hierarchy

- `H1` (page primary title):
  - Home: `.main-title`
  - Case pages: `.case-name`
- `H2` (major section titles):
  - `.cases-title`
  - `.evidence-title`
  - `.access-title`
  - `.section-number` (case page section heading)
- `H3` (subsection / card heading):
  - `.access-card-title`
  - `.clearance-state-title`
  - `h3.case-name` inside cards on home

Rule:
- If asked to "change all main headings", update H1 + H2 groups via shared CSS tokens/rules.

## 2) Button roles (interactive commands)

- Primary compact CTA:
  - `.btn-clearance`
  - `.btn-contact`
- Secondary action CTA:
  - `.btn-steam`
  - `.btn-steam--outline`
  - `.btn-steam--gray`
- Form submit/action:
  - `.access-submit`
  - `.access-modal-btn`
- Utility actions:
  - `.btn-load-more`
  - `.evidence-filter` (filter behaves as control button)
  - `.case-meta-nav-btn` (icon navigation button)

Rule:
- If asked to "change all buttons", apply changes to all classes above consistently.

## 3) Link roles (navigation/reference)

- Global nav links in `.nav-menu`
- Footer social/product links in `.footer-links`
- Case/archive internal links in CTA anchors

Rule:
- If asked to "change all links", do not include button components unless explicitly requested.

## 4) Card roles

- Case card:
  - `.case-card`
- Evidence card:
  - `.evidence-card`
- Access card:
  - `.access-card`

Rule:
- If asked to "change card style", clarify which card type (case/evidence/access) or apply to all three intentionally.

## 5) Typography ownership map

- Display headings: `H1/H2` roles above
- Body/descriptions:
  - `.case-desc`
  - `.access-card-desc`
  - `.lore-text` (narrative block body/quote role)
- Tech/meta text:
  - `.case-meta`
  - `.evidence-meta`
  - `.legal-text`

## 6) Global-change protocol

When user asks global changes like:
- "Change all headings font"
- "Make all cards border brighter"
- "Update all buttons radius/height"

Do this:
1. Map request to role groups in this file.
2. Update shared CSS definitions first.
3. Verify all pages (`index.html`, `analyst.html`, `censored.html`).
4. Report exact role groups changed.
