# Asset Slots (Drop-in System)

Put files into these folders with these names. The site will auto-load them.

## Evidence cards (index archive)
Folder: `assets/evidence/slots/`

- `file-01` (public card 1)
- `file-02`
- `file-03`
- `file-04`
- `file-05`
- `file-06`
- `file-07`
- `file-08`
- `file-09`
- `file-10`

Supported extensions per slot:
- Video: `.mp4`, `.webm`
- Image: `.png`, `.jpg`, `.jpeg`, `.webp`

Example:
- `assets/evidence/slots/file-04.mp4` -> card behaves like video.
- `assets/evidence/slots/file-04.png` -> card behaves like image.

## Case 01 slideshow (index)
Folder: `assets/cases/slots/`

- `case01-main`
- `case01-slide-01`
- `case01-slide-02`
- `case01-slide-03`

Supported extensions:
- Images only for slideshow (`.png`, `.jpg`, `.jpeg`, `.webp`).

## Notes
- Keep one file per slot name (avoid duplicate extensions for same slot).
- If slot file is missing, current default project asset stays in place.
