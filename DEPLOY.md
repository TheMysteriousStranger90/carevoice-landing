# CareVoice Landing — Deployment Guide

The site is a static Angular build. It currently deploys to **two** places on every push to `main`:

| Target                      | Workflow                                                       | Base href            |
| --------------------------- | -------------------------------------------------------------- | -------------------- |
| GitHub Pages                | `.github/workflows/deploy-pages.yml`                           | `/carevoice-landing/` |
| Azure Static Web Apps (SWA) | `.github/workflows/azure-static-web-apps-yellow-plant-*.yml`   | `/`                  |

Both workflows first call the shared quality gate (`.github/workflows/verify.yml`): lint, Prettier,
e2e type-check, unit tests, production build and `npm audit` for production dependencies.
Nothing deploys if it fails. Pull requests additionally run `ci.yml` (Playwright smoke + axe
accessibility tests and Lighthouse).

---

## Prerequisites

- Node.js **22.22.3 or newer** (`.nvmrc` pins major 22; Angular 22 does not run on Node 20)
- Git and a GitHub repository
- For Azure: an [Azure account](https://azure.microsoft.com/free/) (the SWA Free tier needs no payment card)

Build locally:

```bash
npm ci
npm run build:prod      # → dist/carevoice-landing/browser
```

---

## GitHub Pages

Settings → Pages → **Source: GitHub Actions**. The workflow builds with
`npm run build:pages` (base href `/carevoice-landing/`) and copies `index.html` to `404.html`
so deep links such as `/carevoice-landing/privacy` boot the router.

GitHub Pages ignores `staticwebapp.config.json` and sets its own cache headers; it cannot be configured.

---

## Azure Static Web Apps

1. Azure portal → **Create a resource** → **Static Web Apps** → plan **Free**.
2. Source: GitHub → pick the repository and the `main` branch. Build preset: _Custom_.
3. Azure commits a workflow file. This repository's version is already adjusted: it **builds in
   GitHub Actions** (pinned Node version) and uploads the prebuilt folder:

   ```yaml
   app_location: 'dist/carevoice-landing/browser'
   output_location: ''
   skip_app_build: true
   skip_api_build: true
   ```

4. Add the deployment token as the repository secret named in the workflow
   (`AZURE_STATIC_WEB_APPS_API_TOKEN_…`): portal → your Static Web App → **Manage deployment token**.
5. Custom domain (optional): **Custom domains → Add**, then create the DNS record Azure shows.
   Free TLS certificates are automatic. Use `carevoice.io` / `www`, not `app.` — that host belongs to the product.

### `public/staticwebapp.config.json`

Copied into the build output and read by SWA. What it does:

- `navigationFallback` rewrites unknown paths (deep links) to `/index.html`; static files are excluded.
- **Caching:** default `Cache-Control: no-cache`, so `index.html` is revalidated and a new deploy
  is picked up immediately. Content-hashed `/*.js` and `/*.css` are `immutable` for a year;
  `/screenshots/*` (not hashed) get one day plus `stale-while-revalidate`.
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
- `.json` is served as `application/json`.

`src/app/deploy-config.spec.ts` guards these rules (e.g. fails if everything becomes `immutable` again).

---

## Alternative: Azure Blob Storage static website (+ CDN)

Use it if you want full control over headers. Storage account names must be **3–24 lowercase
letters and digits** and globally unique.

```bash
az login
az group create --name rg-carevoice-landing --location eastus

STORAGE=carevoicelanding$RANDOM          # e.g. carevoicelanding12345
az storage account create \
  --name "$STORAGE" --resource-group rg-carevoice-landing \
  --location eastus --sku Standard_LRS --kind StorageV2

az storage blob service-properties update \
  --account-name "$STORAGE" --static-website \
  --index-document index.html --404-document index.html
```

Upload with the same cache policy as `staticwebapp.config.json` (blob static websites have no
config file, so headers are set per blob):

```bash
npm run build:prod

# 1) everything, long cache (hashed bundles and screenshots are safe to cache)
az storage blob upload-batch --account-name "$STORAGE" \
  --source dist/carevoice-landing/browser --destination '$web' --overwrite \
  --content-cache-control "public, max-age=31536000, immutable"

# 2) HTML and other un-hashed entry files must revalidate
for f in index.html 404.html robots.txt sitemap.xml favicon.svg; do
  az storage blob upload --account-name "$STORAGE" --container-name '$web' \
    --file "dist/carevoice-landing/browser/$f" --name "$f" --overwrite \
    --content-cache-control "no-cache"
done
```

Website URL:

```bash
az storage account show --name "$STORAGE" --resource-group rg-carevoice-landing \
  --query "primaryEndpoints.web" --output tsv
```

For a custom domain with HTTPS, put Azure Front Door or Azure CDN in front of the storage endpoint.

---

## Cost summary

| Option                           | Monthly cost | Custom domain | TLS      |
| -------------------------------- | ------------ | ------------- | -------- |
| GitHub Pages                     | $0           | yes           | free     |
| Azure Static Web Apps (Free)     | $0           | yes           | free     |
| Azure Blob static website        | ~ $0.02      | via CDN       | via CDN  |
| Azure Static Web Apps (Standard) | ~ $9         | yes           | free     |

CareVoice is planned for launch in **early 2027**.
