# Screenshot sources — "Progress" section

The `app-dev-diary` section shows these screenshots inside a browser-window frame.
This folder holds the **original PNGs** (not deployed). The site serves optimized
WebP files generated from them into `public/screenshots/`:

```bash
npm run images      # PNG → <name>-800.webp + <name>-1600.webp
```

Save each screenshot here with the **exact** filename below, then run the command
and commit both the PNG and the generated WebP files.

| Filename                | What it should show                                   |
| ----------------------- | ----------------------------------------------------- |
| `dashboard.png`         | Therapist Dashboard (sessions this month, plan, etc.) |
| `sessions.png`          | Sessions list with filters                            |
| `new-session.png`       | "Start New Session" form                              |
| `record-transcribe.png` | Session page with "Upload & Transcribe"               |
| `soap-draft.png`        | SOAP note in Draft status                             |
| `soap-signed.png`       | SOAP note in Signed status                            |
| `pdf-export.png`        | Exported PDF (CareVoice Session Note)                 |
| `subscription.png`      | Subscription page with PayPal plans                   |
| `patient.png`           | Patient detail page                                   |

## Guidelines

- Wide screenshots (~1900×870). The script crops to a shared 1600:726 ratio
  anchored at the **top-left**, so keep the important UI near the top and don't let
  the top bar be cut off.
- Shoot in the **en-US** locale (dates such as "July 8, 2026"), with the same theme as
  the landing page, and with demo data only (never real patient data).

To change the list, captions or fake URLs, edit the `shots` array in
`src/app/components/dev-diary/dev-diary.component.ts`. If you change the output
size, update `WIDTHS`/`ASPECT` in `scripts/optimize-screenshots.mjs` and the
`SHOT_WIDTH`/`SHOT_HEIGHT` constants in that component.
