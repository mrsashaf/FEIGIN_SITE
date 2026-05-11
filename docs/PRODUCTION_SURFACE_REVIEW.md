# Production Surface Review

Updated: 2026-05-11

## Scope

- Main public pages reviewed:
  - `index.html`
  - `analyst.html`
  - `censored.html`
  - `clearance.html`

## Findings

1. No direct links to `admin.html` or `design-system.html` found in the main public pages.
2. `admin.html` is now marked with:
   - `<meta name="robots" content="noindex, nofollow, noarchive">`
3. `design-system.html` is now marked with:
   - `<meta name="robots" content="noindex, nofollow, noarchive">`

## Risk Level

- Public discoverability risk: reduced.
- Direct URL access risk: still possible if URL is known (expected for static hosting).

## Recommended Next Hardening (optional)

1. Host `admin.html` behind auth or private route.
2. Move `design-system.html` to a non-public internal path in deployment settings.
