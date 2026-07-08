# CareVoice Landing

CareVoice Landing is a modern Angular landing page for the CareVoice product.

## Tech stack

- Angular 18
- TypeScript
- SCSS
- Azure Static Web Apps

## Local development

```bash
npm install
npm run dev
```

The app will be available at http://localhost:4200/.

## Production build

```bash
npm run build:prod
```

## Deployment

This repository is configured to deploy automatically to Azure Static Web Apps from the main branch.

### Required GitHub secret

Add the following secret in GitHub repository settings:

- AZURE_STATIC_WEB_APPS_API_TOKEN

You can obtain it from the Azure portal in your Static Web App under "Manage deployment token".
