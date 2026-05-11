# FEIGIN ENTERTAINMENT — AI Working Instructions

> **Read this file first, every session.** This is the locked design system for the FEIGIN site. Any AI working on this project (Claude, GPT, etc.) MUST follow these rules. The user will frequently send a design (Figma, screenshot, sketch, verbal description) — your job is to **identify which existing component each visible element is**, and reuse it. NEVER invent new components, fonts, colors, or weights.

---

## 0 / PROJECT CONTEXT

FEIGIN ENTERTAINMENT is a horror game studio (fictional ABERRATION universe). The site has a strict, government-redacted-document aesthetic: black background, white text, gray hierarchy, single red accent, generous tracking, brutalist typography.

**Reference files (always look here first):**
- `index.html` — main site (Hero / Lore / Aberration / Cases / Evidence / Access / Footer)
- `censored.html` — secondary case page (CASE 02: COMFORT ZONE)
- `stall.html` — secondary case page (CASE #00: THE STALL)
- `design-system.html` — visual reference of every component
- `assets/` — image assets (use these, don't invent paths)

**Backup before destructive edits:** copy file to `backup/` before major rewrites.

---

## 1 / LOCKED RULES (NO EXCEPTIONS)

### 1.1 Fonts — only 3
| Font | Use for | Never use for |
|------|---------|---------------|
| `Inter` (100/300/400/500/600/700/800/900) | All body, all headings, all buttons, all descriptions | Tech meta, mono captions |
| `Roboto Mono` (400/500/700) | Tech tags, filters, legal, caution, classification stamps, file IDs | Body, descriptions, headings |
| `Panchang 900` | Only the ABERRATION seal logo | Anywhere else — period |

**Forbidden:** any other font family. No Helvetica, no system-ui, no serif, no display fonts.

### 1.2 Colors — fixed palette
**Backgrounds:** `#000` · `#050505` · `#080808` · `#0a0a0a` · `#111`
**Text gray hierarchy (highest → lowest importance):** `#fff` → `#d1d1d1` → `#aaa` → `#9c9c9c` → `#999` → `#888` → `#777` → `#666` → `#555`
**Accent (only one):** `#ff4444` (warning red) — used for `.access-warning`, `.nav-censored:hover`, key highlighted words in lore
**Hover:** `#ccc` (inverted buttons), `#ff4a4a` (censored link)
**Legal text:** `#9c9c9c` (Figma-spec — used for legal-text disclaimer at footer bottom)

**Forbidden:** any blue, green, yellow, purple, orange, pink. Any new gray shade not on the list above.

### 1.3 Font weights — locked to roles
| Weight | Role |
|--------|------|
| 900 | Hero (`main-title`), compact CTAs (`btn-clearance`, `btn-contact`) |
| 800 | Card titles (`case-name`), `btn-steam`, `access-submit` |
| 700 | Section titles, `lore-text`, `evidence-name`, `nav-menu`, filters |
| 600 | Descriptive subtitles (`cases-subtitle`, `case-desc`, `access-warning`, `access-card-title`, `copyright`) |
| 500 | Tech meta (`evidence-meta`, `legal-text`, `access-caution`, `meta-gray`) |
| 400 | `footer-links`, `lore-source` |
| 300 | Only `.anthology-text` (single use) |

**Forbidden:** Section title at weight < 700. Body text at weight < 500. Light weights (100/200) — ever.

### 1.4 Letter-spacing — by rule
| Range | When |
|-------|------|
| `-2.5px` to `-2px` | Largest displays/titles: `main-title`, `case-name`, all section titles |
| `-1.5px` to `-1px` | Medium-large: `lore-text`, `access-card-title`, `access-warning` |
| `-0.5px` to `-0.2px` | Body / mid controls: `case-desc`, `btn-steam`, `access-input`, `access-submit` |
| `+0.5px` | Small UPPERCASE: `nav-menu`, `btn-clearance`, `access-caution` |
| `+0.07em` (+7%) | `copyright` (Figma-spec) |
| `-0.07em` (-7%) | Large footer typography: `footer-links`, `access-card-title` (Figma-spec) |
| `+0.5px` | Compact CTA text: `btn-clearance`, `btn-contact` |
| `+1px` to `+2px` | Tech tags only: `evidence-meta` |
| `0` | Default — `case-meta`, `legal-text` |

**Forbidden:** positive letter-spacing on body text > 16px. Negative letter-spacing on text < 16px.

### 1.5 Line-height — by size
| LH | Role |
|----|------|
| 0.9 — 0.95 | Big headings: `main-title` (0.9), `case-name` (1), `access-card-title` (1) |
| 1.05 — 1.2 | Medium texts: `lore-text` (1.05), `access-warning` (1.1), `anthology-text` (1.2) |
| 1.3 — 1.4 | Body descriptions: `case-desc` (1.3) |
| 1.5 — 1.8 | Small/multi-line tech text: `access-caution` (1.6), mobile nav (1.8), `footer-links` (1.8 mobile) |

### 1.6 Sizes — clamp() always
**Use `clamp(min, vw-fluid, max)` for all hero/section titles, lore, subtitles.** This eliminates the need for multiple media-queries. Static `px` values only for tech meta, tiny captions, and form inputs.

### 1.7 Breakpoints — single set
- `@media (max-width: 1024px)` — tablet
- `@media (max-width: 991px)` — narrow tablet (evidence grid → 2 col)
- `@media (max-width: 768px)` — mobile (everything → 1 col, header → column)
- `@media (max-width: 420px)` — small phones (extra title shrinks)

**Forbidden:** any other breakpoint values.

---

## 2 / VISUAL → COMPONENT IDENTIFICATION GUIDE

When the user sends a design, scan it top-to-bottom and identify each element. Use this lookup table:

### 2.1 Headings — by visual scale and weight

| What you see | It's | Class |
|--------------|------|-------|
| Massive UPPERCASE heading taking 80%+ of hero, very heavy weight, multi-line, tight tracking | Hero display title | `.main-title` (Inter 900, clamp 3-9rem, -2px) |
| Big UPPERCASE section heading, slightly less massive than hero | Section title | `.cases-title` / `.evidence-title` / `.access-title` (Inter 700, clamp 2.5-4rem, -2px) |
| Mid-large gray quote with white border-left bar (4-6px) | Lore quote | `.lore-text-block` + `.lore-text` (Inter 700, clamp 2-3.2rem, color `#d1d1d1`) |
| Card heading inside a case (CASE 01: ANALYST style) | Case name | `.case-name` (Inter 800, 42px, -2.5px) |
| Form-card heading (LEVEL 2 INCLUDES style) | Form card title | `.access-card-title` (Inter 600, 38px, -1.5px) |
| Button-like text action (LOAD MORE DATA) | Compact CTA | `.btn-load-more` (212x42, Inter 900, 12px) |

### 2.2 Subtitles & body — by color and weight

| What you see | It's | Class |
|--------------|------|-------|
| Gray subtitle below a section title (#888-ish) | Subtitle | `.cases-subtitle` / `.evidence-subtitle` (Inter 500-600, clamp 1.2-2rem) |
| Red small-cap warning text | Warning | `.access-warning` (Inter 600, color `#ff4444`) |
| 18px gray body paragraph (case description style) | Body description | `.case-desc` (Inter 600, 18px, #999) |
| Bullet list inside a card | Form list | `.access-list` + `.access-list li` (Inter 600, 18px, white) |
| Light italic-feeling atmospheric text under a logo | Anthology text | `.anthology-text` (Inter 300, clamp 1.2-1.8rem, #888) |

### 2.3 Tech / mono elements — ALWAYS Roboto Mono

| What you see | It's | Class |
|--------------|------|-------|
| Bracketed tag like `[ DEMO — JUNE 2026 ]` next to platform info | Case meta | `.case-meta` (Mono 700, 13px, UPPERCASE) — gray prefix is `<span class="meta-gray">` |
| `[ DECRYPTING... 4 DAYS REMAIN ]` style label above an evidence card | Evidence meta | `.evidence-meta` (Mono 500, 15px, color `#555`) |
| Filter button `THE ANALYST` with separator `\` | Evidence filter | `.evidence-filter` (212x42, Mono 700, 12px) |
| Tiny caption under a form (CAUTION:...) | Caution | `.access-caution` (Mono 500, 11px, #888) |
| Bottom legal disclaimer | Legal | `.legal-text` (Mono 500, 15px, #777) |

### 2.4 Buttons — by size and color

| What you see | It's | Class |
|--------------|------|-------|
| White-bg black-text small CTA, UPPERCASE, ~12px | Primary mini CTA | `.btn-clearance` or `.btn-contact` (42px high, variable width) |
| White-bg black-text mid CTA, ~14px | Secondary CTA | `.btn-steam` / `.btn-steam--outline` / `.btn-steam--gray` (42px high, variable width) |
| White-bg black-text submit inside a form | Form submit | `.access-submit` (42px high, variable width) |
| Transparent text button with bracket-arrow `> LOAD MORE DATA` | Load-more | `.btn-load-more` (variable width x 42, Inter 900, 12px, color #666 -> #fff hover) |

### 2.4.1 CTA Ratio Lock — ALL PILLAR BUTTONS

Canonical CTA/control height is **42px**. Width must adapt to text (`max-content`) with generous horizontal padding (32px).

Applies to:
- `.btn-clearance`
- `.btn-steam`
- `.btn-steam--outline`
- `.btn-steam--gray`
- `.btn-case`
- `.btn-contact`
- `.access-submit`
- `.access-modal-btn`
- `.btn-load-more`
- `.evidence-filter`

Icon-only buttons use the same vertical system:
- `.case-meta-nav-btn`: `width: 42px`, `height: 42px`

Form fields aligned with buttons:
- `.access-input`: `height: 42px`; desktop can flex wider, but height must match adjacent `.access-submit`.

Required desktop rules:
- `width: max-content`
- `height: 42px`
- horizontal padding only: `padding: 0 32px`
- `display: inline-flex`
- `align-items: center`
- `justify-content: center`
- `line-height: 1`

Allowed mobile adjustment:
- keep `height: 42px`
- keep `width: max-content`
- avoid full-width CTA overrides unless explicitly requested
- do not override CTA width to `100%` without explicit user direction

Forbidden:
- Do not use vertical padding like `padding: 16px 28px` or `14px 28px` for CTA buttons.
- Do not make `.btn-contact` taller or larger than the 232 x 42 ratio.
- Do not make `btn-load-more` or `evidence-filter` hero-sized. They are controls, not headings.
- Do not set button sizes inline in HTML.
- Do not invent new CTA proportions unless the user explicitly provides a new Figma measurement.

### 2.5 Containers — by structure

| What you see | It's |
|--------------|------|
| Black-on-black card with white 2px border (form-style) | `.access-card` (`background: #050505`, `border: 2px solid #fff`, padding 60px) |
| Game-card with image on top + meta + name + desc + button | `.case-card` (used inside `.cases-grid`) |
| Photo-tile with status meta + file name (FILE_04 SYS_WALK) | `.evidence-card` (used inside `.evidence-grid`) |
| Large standalone photo with anthology text overlaid at bottom | `.aberration-section` + `.aberration-image-box` |
| Hero image-only section with title overlaid | `.hero-section` (full viewport) or `.case-hero` (full viewport, on case pages) |

### 2.6 Header & Footer — ALWAYS the same

Every page MUST use:
- **Header**: `.header` with logo (`assets/brand/feigin-logo.png`) wrapped in `<a href="index.html">` (MUST always link to index) + `.nav-menu` (WORKS / ARCHIVE / ABOUT / CLEARANCE / CENSORED)
- **Footer**: `.footer-section` with logo, social links, CONTACT button, copyright, legal-text

Do not redesign header or footer per-page. Copy from `index.html` or `censored.html`.

### 2.7 Footer Scale Lock — DO NOT ENLARGE

Footer is intentionally compact and quiet. It is not a hero.

Canonical `index.html` footer sizing:
- `.footer-logo img`: `max-width: clamp(260px, 30vw, 360px)`
- `.footer-links`: `font-size: clamp(22px, 3vw, 32px)`, weight 400, color `#aaa`
- `.btn-contact`: mini CTA only: `width: max-content`, `height: 42px`, `padding: 0 32px`, `font-size: 12px`, `font-weight: 900`, `letter-spacing: 0.5px`
- Mobile `.footer-logo img`: `max-width: clamp(220px, 74vw, 320px)`
- Mobile `.btn-contact`: `width: max-content`, `height: 42px`, `padding: 0 32px`, `font-size: 11px`

Forbidden:
- Do not set footer logo max width above `360px` desktop.
- Do not use `60vw`, `850px`, or any hero-scale sizing for footer logo.
- Do not make `.btn-contact` 14px+ unless the user explicitly asks.
- Do not use inline styles to resize footer elements. Footer scale belongs in CSS.

---

## 3 / WORKFLOW WHEN USER SENDS A DESIGN

**Step 1 — Identify.** Scan top-to-bottom. For each visible element, decide:
- What is its role? (heading? body? tech meta? button? card?)
- Match it against §2.1–2.6.
- If it doesn't match anything → **stop and ask the user** instead of inventing.

**Step 2 — Map.** Write a brief mental map: "This is `.case-meta` + `.case-name` + `.case-desc` inside `.case-card`."

**Step 3 — Reuse, don't write.** Open the closest reference page (`censored.html` for case pages, `index.html` for landing-style pages). Copy the exact HTML structure and CSS classes. Replace text/images only.

**Step 4 — Verify against locked rules.**
- All fonts in {Inter, Roboto Mono, Panchang}? ✓
- All colors in palette? ✓
- All weights in 300/400/500/600/700/800/900? ✓
- Letter-spacing follows §1.4? ✓
- All section titles via `clamp()`? ✓
- Mobile breakpoints used? ✓

**Step 5 — Test mobile.** Use the preview tools to check at 375px width. Hero must not wrap excessively, text must be readable, no horizontal scroll.

**Step 6 — Backup before save.** If editing existing file significantly: `cp file.html backup/`.

---

## 4 / COMMON MISTAKES TO AVOID

| Mistake | Why wrong | Fix |
|---------|-----------|-----|
| Adding a blue `#4a9eff` or any non-palette accent | Breaks color rule (only red `#ff4444`) | Use white or red |
| Using a new font for "design system" or "internal" pages | Breaks font rule | Use Inter for body, Mono for tech |
| Inventing new component (`.section-divider-fancy`, `.callout-box`) | Breaks reuse rule | Use existing `.lore-text-block` for callouts |
| Setting positive letter-spacing on body text > 16px | Breaks tracking rule | Use 0 or negative |
| Building unique header per page | Breaks consistency | Copy header from `index.html` |
| Building unique footer per page | Breaks consistency | Copy footer from `index.html` |
| Setting fixed `font-size: 64px` for hero | Breaks responsive rule | Use `clamp(2.5rem, 5vw, 4rem)` |
| Adding rounded corners (`border-radius: 8px`) to cards | Breaks brutalist aesthetic | Sharp 0 corners always |
| Creating a "design notes" or "documentation" section with new card style | Breaks reuse rule | Use `.lore-text-block` with white/red border-left |

---

## 5 / FILE STRUCTURE

```
WBFL/
|-- index.html              # Main site
|-- censored.html           # Case page (Comfort Zone)
|-- analyst.html            # Case page (The Analyst)
|-- stall.html              # Case page (The Stall)
|-- case-03.html            # Case page draft/template
|-- design-system.html      # Visual reference of all components
|-- admin.html              # Visual editor (separate tool, different rules)
|-- CLAUDE.md               # THIS FILE -- read first
|-- css/
|   `-- index.css           # Main page styles
|-- backup/                 # Manual backups before destructive edits
`-- assets/
    |-- brand/
    |   |-- feigin-logo.png
    |   `-- aberration-logo.png
    |-- index/
    |   |-- hero/
    |   |   |-- hero-video.mp4
    |   |   `-- hero-poster.png
    |   `-- prism/
    |       |-- prism-logo-animation.mp4
    |       `-- access-background.png
    |-- cases/
    |   |-- case-01-analyst/
    |   |   |-- main-capsule.png
    |   |   |-- ibm-pc.png
    |   |   `-- gallery/
    |   |-- case-02-comfort-zone/
    |   |   |-- hero.png
    |   |   |-- parasite.png
    |   |   `-- censored/
    `-- evidence/
        |-- analyst/
        |   |-- short-01.mp4
        |   |-- locked-file-01.png
        |   `-- locked-file-02.png
        `-- shared/
            `-- nonactive-image.png
```

Asset rules:
- Use lowercase, hyphenated file names only.
- Do not add new files directly inside `assets/`.
- Put reusable brand files in `assets/brand/`.
- Put home-page-only media in `assets/index/`.
- Put case-page media in `assets/cases/<case-slug>/`.
- Put archive/evidence media in `assets/evidence/<case-or-shared>/`.
- Never reintroduce spaces in file names such as `FEIGIN LOGO .png`.

---

## 5.1 / CLEARANCE ACCESS FLOW

The clearance system is a front-end narrative interaction in `index.html`.

Evidence cards use:
- `data-access="public"`: opens preview immediately.
- `data-access="level-2"`: opens preview only after `window.hasLevel2Access === true`; otherwise shows `UNAUTHORIZED ACCESS`.
- `data-access="sealed"`: always shows `FILE SEALED`.

The access form:
- Lives in `#clearanceForm`.
- Has three states: `#accessState1`, `#accessState2`, `#accessState3`.
- On submit, prevents default form submission, animates progress from 0 to 100, then shows `CLEARANCE GRANTED`.
- A separate listener sets `window.hasLevel2Access = true` after the same animation delay.

Rules:
- Do not add backend behavior unless the user explicitly asks.
- Do not replace `data-access` with a different system.
- Do not make sealed files unlockable unless the user explicitly asks.
- Do not store real emails yet; the current form is fictional/narrative.
- If adding a real mailing list later, preserve the visual 3-state flow and add the network call behind it.

---

## 6 / DECISION CHECKLIST (BEFORE EVERY EDIT)

Run through this every time before writing code:

1. **Has the user shown a design?** → Read it carefully. Identify each element using §2.
2. **Does an existing component match?** → Yes: copy it. No: ask user, do not invent.
3. **Am I about to introduce a new font, color, or weight?** → Stop. Re-check §1. If still needed, ask user explicitly.
4. **Am I building a new page?** → Header and footer come from `censored.html` or `index.html`, unmodified.
5. **Am I about to make a major change to `index.html`?** → Backup first: `cp index.html backup/`.
6. **Did I use `clamp()` for all hero/section sizes?** → If not, refactor.
7. **Did I test mobile at 375px?** → If not, do it before reporting "done".
8. **Is my page consistent with `censored.html` / `stall.html`?** → If not, it doesn't belong.

---

## 7 / EXAMPLE — HOW TO HANDLE "BUILD CASE #03"

User sends: "Build a page for CASE #03: THE TUNNEL. Subject explores subway tunnel."

**Wrong response:** Invents new "tunnel-themed" colors, builds custom hero animation, makes new card style for tunnel scenes.

**Correct response:**
1. Open `censored.html` and `stall.html` for reference.
2. Copy `stall.html` as starting template.
3. Replace:
   - `case-name` → "CASE #03: THE TUNNEL"
   - `case-desc` → user's tagline
   - `case-meta` → `[ CONCEPT — UNRELEASED ]` style
   - `lore-text-block` intro → tunnel lore
   - `lore-text` paragraph → tunnel aberration description
   - `case-images-stack` → 4 images from `assets/`
   - closing `lore-text-block` → tunnel observation note
4. Header, footer, scripts — kept untouched.
5. Verify mobile, save, report.

**Time spent:** 5 minutes. **Files changed:** 1 new HTML.

---

## 8 / WHEN IN DOUBT

- **The site is the source of truth, not your judgment.** If the design system says `#ff4444`, do not "improve" to `#ff6666`. If `lore-text` is weight 700, do not make it 800 because "it looks better bolder."
- **Ask before inventing.** Cheaper to ask "should I use `.access-card` or `.case-card` for this?" than to build a new component the user has to reject.
- **Less is more.** `censored.html` is ~1100 lines. A new case page should be ~1100 lines. If yours is 2000, you've added decoration.
- **Match `stall.html` for new case pages, `index.html` for new landing pages.** These are the canonical templates.
