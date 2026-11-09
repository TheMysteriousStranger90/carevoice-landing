# CareVoice Landing

Landing page for CareVoice — AI-assisted SOAP notes for therapists. Pre-launch (waitlist).

## Tech stack

- Angular 22 (standalone components, signals, **zoneless**, `@angular/build` application builder)
- TypeScript 6, SCSS
- Jest (unit) · Playwright + axe (e2e / accessibility) · Lighthouse CI
- ESLint (with template accessibility rules) · Prettier
- Hosting: GitHub Pages and Azure Static Web Apps (see [DEPLOY.md](DEPLOY.md))

Requires Node `^22.22.3` (see `.nvmrc` / `engines`).

## Local development

```bash
npm install
npm run dev        # http://localhost:4200
```

## Scripts

| Command                           | What it does                                                          |
| --------------------------------- | --------------------------------------------------------------------- |
| `npm run build:prod`              | Production build (base href `/`) → `dist/carevoice-landing/browser`   |
| `npm run build:pages`             | Production build for GitHub Pages (base href `/carevoice-landing/`)   |
| `npm test` / `npm run test:ci`    | Jest unit tests                                                       |
| `npm run test:e2e`                | Playwright smoke + axe tests (builds and serves the site on `:4300`)  |
| `npm run lint`                    | ESLint (TypeScript + inline templates, incl. accessibility rules)     |
| `npm run format` / `format:check` | Prettier                                                              |
| `npm run typecheck:e2e`           | Type-check Playwright tests and config                                |
| `npm run images`                  | Regenerate WebP screenshots from `assets-src/screenshots/*.png`       |
| `npm run audit:prod`              | `npm audit` for production dependencies (fails on high severity)      |
| `npm run verify`                  | Everything CI checks, in one go                                       |

First e2e run on a new machine: `npx playwright install chromium`.

## Project structure

```text
src/app/
  content/        Single source of truth for copy: plans, features, security, pipeline, nav/footer, launch date
  components/     Page sections (hero, pricing, …) plus shared icon/ and logo/ components
  directives/     reveal (scroll fade-in, progressive enhancement)
  pages/          home and the legal pages (lazy-loaded)
e2e/              Playwright tests (smoke + accessibility)
assets-src/       Original screenshot PNGs (not deployed)
public/           Static files copied as-is (screenshots/*.webp, staticwebapp.config.json, …)
scripts/          Build helpers (screenshot optimizer)
```

### Editing content

- **Prices and plan features:** `src/app/content/plans.ts`. The JSON-LD offers in
  `src/index.html` must match — a unit test fails if they drift.
- **Launch date:** `LAUNCH` in `src/app/content/site.ts` (a UTC instant). The countdown is shown
  as a _target_; after it passes the timer is replaced by a message.
- **Compliance wording:** `COMPLIANCE_COPY` in `site.ts`. A guard test (`content.spec.ts`) blocks
  phrases that were deliberately removed (e.g. "HIPAA compliant", "E2E encrypted",
  unmeasured speed claims). Change the wording on purpose, not by accident.

## Video Overview

<details>
<summary>YouTube Walkthrough</summary>

[![YouTube](https://img.youtube.com/vi/55LaswfdIHc/maxresdefault.jpg)](https://youtu.be/55LaswfdIHc)

</details>

## Author

Bohdan Harabadzhyu (Bogdan Garabagiu) and CareVoice

## License

MIT — see [LICENSE](./LICENSE).
