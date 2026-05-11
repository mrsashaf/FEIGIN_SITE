# FEIGIN Site Optimization Roadmap

Goal: keep development fast as the site grows, while preventing regressions and "AI improvisation."

## Phase 0: Guardrails (done)

- `CLAUDE.md`
- `docs/AI_GUARDRAILS.md`
- `docs/PROJECT_MAP.md`
- `docs/PRE_FLIGHT_CHECKLIST.md`
- `docs/WORK_REQUEST_TEMPLATE.md`
- `SESSION_START_PROMPT.md`

## Phase 1: Stability + Hygiene (High Priority)

Target: 2-4 days

### 1.1 Fix encoding issues (UTF-8)
Status: `Mostly done`

- Normalize text files to UTF-8:
  - `index.html`
  - `analyst.html`
  - `censored.html`
  - `design-system.html`
  - `css/*.css`
  - `js/*.js`
  - `CLAUDE.md`
- Replace visibly broken characters in user-facing content.

Done when:
- No mojibake in rendered text.
- No broken characters in main UI copy.

### 1.2 Remove inline styles from HTML
Status: `Mostly done`

- Move style attributes from page markup into CSS classes.
- Keep existing visual result 1:1.

Done when:
- `index.html`, `analyst.html`, `censored.html` have no inline `style=""` except truly dynamic runtime cases.

Progress:
- User-facing mojibake in core pages fixed (including redacted text in `censored.html`).
- Remaining mojibake is mostly in developer comments and docs, not visible in UI.
- Done for `index.html`
- Done for `analyst.html`
- Done for `censored.html`
- Partially done for `admin.html` (safe static inline styles moved)
- Not targeted for `design-system.html` (demo page, inline samples kept intentionally)

### 1.3 Clean CSS duplication
Status: `In progress`

- Deduplicate repeated media blocks and repeated selector groups.
- Keep class names unchanged.

Done when:
- No duplicated sections in `css/index.css` for the same breakpoints/selectors.

Progress:
- Duplicated `evidence-grid/evidence-card` block in `css/index.css` removed.
- Additional pass still needed for the rest of the file.

## Phase 2: Performance (High Priority)

Target: 2-3 days

### 2.1 Image optimization

- Convert large PNGs to `webp` (and optionally keep PNG fallback).
- Prioritize:
  - `assets/cases/case-01-analyst/gallery/*.png`
  - `assets/cases/case-02-comfort-zone/**/*.png`
  - `assets/evidence/**/*.png`

Done when:
- Visual quality acceptable.
- Total image weight noticeably reduced.

### 2.2 Video loading strategy

- Keep hero video where needed.
- Ensure poster usage and avoid aggressive preload where non-critical.

Done when:
- Faster initial page render on normal connection.

### 2.3 JS sanity cleanup
Status: `Done`

- Fix broken slide paths in `js/case-slideshow.js` to match actual files.
- Keep behavior unchanged.

Done when:
- Case slideshow has no missing-file requests.

Progress:
- `js/case-slideshow.js` now points to existing `gallery/01.png`, `02.png`, `03.png`.

## Phase 3: Content Scalability (Very High Priority)

Target: 3-5 days

### 3.1 Introduce content registry (without framework migration yet)

- Add data files:
  - `content/cases/*.json`
  - `content/evidence/*.json`
- Keep current HTML pages, but drive repeated blocks from data via a small build/update script.

Done when:
- New case can be added by filling one data file + assets.

### 3.2 Standardize case-page creation

- Create one canonical case template file.
- Add explicit placeholder markers:
  - title
  - meta
  - description
  - lore blocks
  - gallery assets

Done when:
- Creating a new case page requires no manual structural copy/paste.

## Phase 4: Architecture Upgrade (Optional, planned)

Target: 4-7 days

### 4.1 Gradual Astro migration

- Migrate page-by-page, preserving current design system.
- Start with:
  - shared layout (head/fonts/meta)
  - shared header/footer components
  - case page template component

Done when:
- Existing routes render 1:1 with current visual output.
- Adding new pages/components is faster and safer.

## Quality Gates (for every task)

1. No design drift from existing style language.
2. Mobile check at 375px.
3. Links and media paths validated.
4. JS behavior retested where touched.
5. Change summary with file list.

## Suggested Work Order

1. Encoding fix
2. Inline style cleanup
3. CSS dedupe
4. Slideshow path fix
5. Image optimization
6. Content registry
7. Case template standardization
8. Optional Astro migration

## Risk Notes

- Highest regression risk: CSS cleanup and framework migration.
- Lowest risk / high impact: encoding cleanup, slideshow path fix, image compression.
- Keep each PR/task narrow: one concern at a time.

## Next Action (start here)

Current next action:
- Finish Phase 1.1 (UTF-8 normalization and mojibake cleanup in user-facing copy).
- Complete remaining Phase 1.3 dedupe pass in `css/index.css`.

## Progress Log

- 2026-05-11:
  - Added guardrail/docs system (`docs/*` + `SESSION_START_PROMPT.md`).
  - Fixed slideshow broken paths in `js/case-slideshow.js`.
  - Removed inline styles from `index.html`, `analyst.html`, `censored.html`.
  - Added class-based replacements in `css/index.css` and `css/cases.css`.
  - Removed one duplicated `evidence` block in `css/index.css`.
