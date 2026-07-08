# CareVoice Landing — Azure Deployment Guide

This guide covers how to deploy the CareVoice landing page to **Azure Static Web Apps** (free tier) — the recommended option for static Angular applications.

---

## Prerequisites

- [Node.js 18+](https://nodejs.org) installed locally
- [Git](https://git-scm.com) installed
- A free [Azure account](https://azure.microsoft.com/free/) (no credit card required for Static Web Apps free tier)
- A [GitHub account](https://github.com) (for CI/CD integration)

---

## Method 1: Azure Static Web Apps (Recommended — Free Forever)

Azure Static Web Apps offers a **Free tier** with:
- Custom domains with free SSL certificates
- Global CDN distribution
- GitHub Actions CI/CD (automatic deployments)
- 100 GB bandwidth / month

### Step 1 — Build the app locally

```bash
# Extract the zip archive and navigate to the folder
cd carevoice-landing

# Install dependencies
npm install

# Build for production
npm run build:prod
```

The production build output will be at: `dist/carevoice-landing/browser/`

### Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: CareVoice landing site"
git branch -M main
git remote add origin https://github.com/TheMysteriousStranger90/carevoice-landing.git
git push -u origin main
```

### Step 3 — Create an Azure Static Web App

1. Go to [portal.azure.com](https://portal.azure.com)
2. Click **Create a resource** → search for **Static Web Apps**
3. Click **Create**
4. Fill in the form:
   - **Subscription**: Your free subscription
   - **Resource Group**: Create new → `rg-carevoice-landing`
   - **Name**: `carevoice-landing`
   - **Plan type**: **Free**
   - **Region**: Choose the closest to your target audience (e.g., East US)
   - **Source**: GitHub
5. Click **Sign in with GitHub** and authorize Azure
6. Select your **Organization**, **Repository** (`carevoice-landing`), and **Branch** (`main`)
7. Under **Build Details**:
   - **Build Presets**: Angular
   - **App location**: `/`
   - **Api location**: *(leave empty)*
   - **Output location**: `dist/carevoice-landing/browser`
8. Click **Review + Create** → **Create**

### Step 4 — Automatic deployment via GitHub Actions

Azure automatically creates a file at `.github/workflows/azure-static-web-apps-*.yml` in your repository. Every push to `main` triggers a new deployment automatically.

Your site will be live at: `https://<random-name>.azurestaticapps.net`

### Step 5 — Add a custom domain (optional)

1. In the Azure portal, open your Static Web App
2. Go to **Custom domains** → **Add**
3. Enter your domain (e.g., `carevoice.io`)
4. Follow the DNS configuration instructions to add a CNAME record at your domain registrar
5. Azure provisions a free SSL certificate automatically

---

## Method 2: Azure Blob Storage + Azure CDN (Alternative)

Use this method if you want more control over caching, compression, and headers.

### Step 1 — Create a Storage Account

```bash
# Install Azure CLI if not already installed
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

az login

az group create \
  --name rg-carevoice-landing \
  --location eastus

az storage account create \
  --name careVoiceLanding \
  --resource-group rg-carevoice-landing \
  --location eastus \
  --sku Standard_LRS \
  --kind StorageV2
```

### Step 2 — Enable static website hosting

```bash
az storage blob service-properties update \
  --account-name careVoiceLanding \
  --static-website \
  --index-document index.html \
  --404-document index.html
```

### Step 3 — Upload build artifacts

```bash
npm run build:prod

az storage blob upload-batch \
  --account-name careVoiceLanding \
  --source dist/carevoice-landing/browser \
  --destination '$web' \
  --overwrite
```

### Step 4 — Get the website URL

```bash
az storage account show \
  --name careVoiceLanding \
  --resource-group rg-carevoice-landing \
  --query "primaryEndpoints.web" \
  --output tsv
```

### Step 5 — Add Azure CDN (optional, for custom domain + HTTPS)

```bash
az cdn profile create \
  --resource-group rg-carevoice-landing \
  --name carevoice-cdn \
  --sku Standard_Microsoft

az cdn endpoint create \
  --resource-group rg-carevoice-landing \
  --profile-name carevoice-cdn \
  --name carevoice-landing \
  --origin <storage-static-website-hostname>
```

---

## Method 3: GitHub Actions CI/CD with Azure (Fully Automated)

Add this workflow file to your repository for automatic deployments on every push:

**`.github/workflows/deploy.yml`**

```yaml
name: Deploy to Azure Static Web Apps

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build:prod

      - name: Deploy to Azure Static Web Apps
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: 'upload'
          app_location: '/'
          output_location: 'dist/carevoice-landing/browser'
```

> **Note**: Add `AZURE_STATIC_WEB_APPS_API_TOKEN` to your GitHub repository Secrets. Get this token from the Azure portal → your Static Web App → **Manage deployment token**.

---

## staticwebapp.config.json (Recommended)

Create this file in your project root to configure routing for Angular's client-side routing:

**`staticwebapp.config.json`**

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/favicon.ico"]
  },
  "globalHeaders": {
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "mimeTypes": {
    ".json": "text/json"
  }
}
```

Place this file in the **`public/`** folder (next to `placeholder.txt`) so it's copied to the dist output.

---

## Development

```bash
# Install dependencies
npm install

# Run development server (http://localhost:4200)
npm start

# Build for production
npm run build:prod

# Build and watch (development)
npm run watch
```

---

## Cost Summary

| Method | Monthly Cost | Custom Domain | SSL |
|--------|-------------|---------------|-----|
| Azure Static Web Apps (Free) | **$0** | ✅ Free | ✅ Free |
| Azure Blob Storage | ~$0.02 | Via CDN | Via CDN |
| Azure Static Web Apps (Standard) | $9/month | ✅ | ✅ |

**Recommendation**: Use **Azure Static Web Apps Free tier** — zero cost, automatic GitHub CI/CD, custom domain, and free SSL certificate. It's purpose-built for this type of Angular SPA.

---

## Support

For questions about the CareVoice landing site, contact the development team.
CareVoice is planned for launch in **early 2027**.
