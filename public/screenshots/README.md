# Product screenshots — "Behind the build" section

The `app-dev-diary` section on the landing page shows these screenshots inside a
browser-window frame. Save each screenshot here with the **exact** filename below
(PNG). Recommended size: ~1600×800 (16:8), or anything wide — the frame crops to
the top of the image, so make sure the important UI is near the top.

| Filename                  | What it should show                                   |
|---------------------------|-------------------------------------------------------|
| `dashboard.png`           | Therapist Dashboard (sessions this month, plan, etc.) |
| `sessions.png`            | Sessions list with filters                            |
| `new-session.png`         | "Start New Session" form                              |
| `record-transcribe.png`   | Session page with "Upload & Transcribe"               |
| `soap-draft.png`          | SOAP note in Draft status                             |
| `soap-signed.png`         | SOAP note in Signed status                            |
| `pdf-export.png`          | Exported PDF (CareVoice Session Note)                 |
| `subscription.png`        | Subscription page with PayPal plans                   |
| `patient.png`             | Patient detail page                                   |

To change the list, captions, or fake URLs, edit the `shots` array in
`src/app/components/dev-diary/dev-diary.component.ts`.
