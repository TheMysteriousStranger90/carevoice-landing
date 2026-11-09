import { defineConfig, devices } from '@playwright/test';

const PORT = 4300;
const BASE_URL = `http://localhost:${PORT}`;

// Local escape hatch for machines where `npx playwright install` is not possible.
const executablePath = process.env['CHROMIUM_PATH'];
const launchOptions = executablePath ? { executablePath, args: ['--no-sandbox'] } : {};

// Set E2E_SKIP_BUILD=1 to serve an existing dist/ instead of rebuilding first.
const build = process.env['E2E_SKIP_BUILD'] ? '' : 'npm run build:prod && ';

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], launchOptions } },
    { name: 'mobile', use: { ...devices['Pixel 7'], launchOptions } }
  ],
  webServer: {
    // Production build, served statically. `-P …?` makes http-server answer unknown paths
    // (deep links like /privacy) with index.html, like the real SPA hosting does.
    command: `${build}npx http-server dist/carevoice-landing/browser -p ${PORT} -s -c-1 -P ${BASE_URL}?`,
    url: BASE_URL,
    reuseExistingServer: !process.env['CI'],
    timeout: 180_000
  }
});
