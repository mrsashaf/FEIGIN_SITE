# FEIGIN SITE Architecture Execution Checklist

Updated: 2026-05-11

## Status Legend
- `[todo]` not started
- `[in-progress]` in work
- `[done]` completed

## Phase 0
- `[done]` Step 0.1 Snapshot current state
  - Notes:
    - `git status` clean.
    - Baseline section set confirmed in `index.html`: hero, cases, evidence, access form, footer.

## Phase 1
- `[done]` Step 1.1 Create CSS section map
  - Notes:
    - Access form base rules live around `css/index.css:992-1115`.
    - First legacy mobile block appears around `css/index.css:1388-1624`.
    - Newer hotfix mobile block appears around `css/index.css:1636-1972`.
    - Same `access-*` selectors are overridden in multiple places.

- `[done]` Step 1.2 Remove conflicting access form rules
  - Goal:
    - Keep a single source of truth for `.access-section`, `.access-bg-video`, `.access-card`, `.access-form`, `.access-input`, `.access-submit` on mobile.
  - Notes:
    - Removed duplicate `access-card`/`access-card-title` overrides from legacy mobile block.
    - Re-homed mobile title/padding rules into the unified hotfix mobile block.

- `[done]` Step 1.3 Consolidate mobile overrides
  - Notes:
    - Removed legacy duplicate mobile/tablet block that conflicted with hotfix overrides.
    - Left one active mobile source (`@media (max-width: 768px)` hotfix block) for access-form behavior.
    - Restored a clean tablet normalization block for `.case-name` and `.case-meta`.

## Phase 2
- `[done]` Step 2.1 Audit evidence cards
  - Notes:
    - Added card-by-card audit: `docs/EVIDENCE_AUDIT.md`.

- `[done]` Step 2.2 Create single evidence config
  - Notes:
    - Added `js/evidence-config.js` with slot-to-media mapping.

- `[done]` Step 2.3 Reduce inline evidence media
  - Notes:
    - Removed inline `background-image` for locked analyst cards from `index.html`.
    - Added `data-evidence-slot` for locked cards.

- `[done]` Step 2.4 Simplify asset hydrator
  - Notes:
    - Refactored `js/asset-hydrator.js` to resolve media from config first, then slot convention fallback.
    - Removed fixed-slot exception branching.

## Phase 3
- `[done]` Step 3.1 Audit access state flow
  - Notes:
    - Before refactor, access state was split across `clearance-access.js`, `access-system.js`, and `clearance-form.js`.
    - Read-paths used mixed globals (`window.FEIGIN_CLEARANCE`, `window.hasLevel2Access`) and custom event dispatch.
    - Write-paths used direct `localStorage` updates plus manual global mutation.

- `[done]` Step 3.2 Create single access state module
  - Notes:
    - Added `js/access-state.js` as single source of truth (`hasLevel2`, `grantLevel2`, `emitChange`, `onChange`).
    - Kept compatibility shim for `window.FEIGIN_CLEARANCE`.
    - Migrated `clearance-access.js`, `clearance-form.js`, and `access-system.js` to `FEIGIN_ACCESS_STATE`.
    - Removed submit-time state sync workaround from `access-system.js`.

- `[done]` Step 3.3 Split form submit from evidence filters
  - Notes:
    - Moved clearance submit/state-flow out of `js/evidence-filters.js`.
    - Added dedicated module: `js/clearance-form.js`.
    - Connected new module in `index.html`.

## Phase 4
- `[done]` Step 4.1 Add real dev script
  - Notes:
    - `package.json` now has `npm run dev` -> `python -m http.server 5500`.

- `[done]` Step 4.2 Add basic check script
  - Notes:
    - Added `scripts/check-files.mjs`.
    - `npm run check` passes.

## Phase 5
- `[done]` Step 5.1 Fix mojibake
  - Notes:
    - Fixed user-visible mojibake in `index.html` (title/description/lore source/case meta dash).
    - Fixed broken arrow text in `js/clearance-form.js` and `js/clearance-access.js` via `\\u2193`.
    - Fixed mojibake signature dash in `api/register.js`.
- `[done]` Step 5.2 Review public production surface
  - Notes:
    - Added `noindex, nofollow, noarchive` meta on `admin.html` and `design-system.html`.
    - Verified no direct links to these pages from main public pages.
    - Added report: `docs/PRODUCTION_SURFACE_REVIEW.md`.

## Phase 6
- `[done]` Step 6.1 Full visual regression pass
  - Notes:
    - Structural regression passed: all key sections and scripts are present in `index.html`.
    - Local integrity check passed via `npm run check`.
    - Final visual approval should be confirmed in browser on desktop/mobile.

- `[done]` Step 6.2 Final report
  - Notes:
    - Architecture cleanup phases completed through Phase 6.
    - Remaining optional hardening is documented in `docs/PRODUCTION_SURFACE_REVIEW.md`.
