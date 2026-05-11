# Evidence Card Audit

Updated: 2026-05-11

## Analyst Cards

| Slot | Card Label | Access | Media Source | Type |
|---|---|---|---|---|
| `file-00` | `FILE_00 / SYS_RECORDING` | `public` | `assets/evidence/analyst/short-01.mp4` | video (inline video tag) |
| `file-01` | `FILE_01 / SYS_PARKING_LOT` | `level-2` | `assets/evidence/analyst/locked-file-01.png` | image (config) |
| `file-02` | `FILE_02 / SYS_THEATER` | `level-2` | `assets/evidence/analyst/locked-file-03.png` | image (config) |
| `file-04` | `FILE_04 / SYS_WALK` | `sealed` | `assets/evidence/slots/file-04.png` | image (config) |
| `file-05` | `FILE_05 / SYS_ALLEY` | `sealed` | `assets/evidence/slots/file-05.png` | image (config) |
| `file-06` | `FILE_09 / SYS_PLAYGROUND` | `sealed` | `assets/evidence/slots/file-06.png` | image (config) |

## Comfort Cards

| Slot | Card Label | Access | Media Source | Type |
|---|---|---|---|---|
| `file-07` | `FILE_NO / NO_DATA` | `sealed` | `assets/evidence/slots/file-07.png` | image (config) |
| `file-08` | `FILE_NO / NO_DATA` | `sealed` | `assets/evidence/slots/file-08.png` | image (config) |
| `file-09` | `FILE_NO / NO_DATA` | `sealed` | `assets/evidence/slots/file-09.png` | image (config) |
| `file-10` | `FILE_NO / NO_DATA` | `sealed` | `assets/evidence/slots/file-10.png` | image (config) |

## Notes

- Evidence media is now managed by config + hydrator.
- Locked analyst cards no longer use inline `background-image` in `index.html`.
