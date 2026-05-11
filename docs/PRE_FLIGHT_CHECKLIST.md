# Pre-Flight Checklist (Before Any Change)

Use this list before writing code.

## A) Context

- [ ] I read relevant section in `CLAUDE.md`.
- [ ] I checked `docs/AI_GUARDRAILS.md`.
- [ ] I identified the nearest existing pattern to reuse.

## B) Scope

- [ ] I listed exact files to edit.
- [ ] I confirmed no unrelated files are being changed.
- [ ] I am not introducing a new visual system.

## C) Implementation

- [ ] Header/footer stay consistent with existing pages.
- [ ] Existing classes/components are reused.
- [ ] No new colors/fonts/breakpoints are introduced without approval.
- [ ] Access flow (`data-access`, clearance states) stays compatible.

## D) Validation

- [ ] All changed links and asset paths resolve.
- [ ] Mobile checked at 375px.
- [ ] Any JS behavior touched was retested.
- [ ] I can explain each change in one sentence.
