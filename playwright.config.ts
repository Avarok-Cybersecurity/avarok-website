import { defineConfig, devices } from '@playwright/test';

// BASE_URL points the suite at a deployed site (e.g. BASE_URL=https://avarok.net after a deploy).
// Without it, the suite runs against `wrangler pages dev site`, which applies _headers, content
// types and the 404 page from site/. Production is a Workers static-assets Worker deployed by
// GeoHarness, which also gates Lighthouse against `wrangler dev` with the deploy's own config.
const base = process.env.BASE_URL;
const LOCAL = 'http://127.0.0.1:8788';

export default defineConfig({
  testDir: 'e2e',
  workers: 4,
  reporter: [['list']],
  use: { baseURL: base ?? LOCAL },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: base
    ? undefined
    : {
        command: 'npx wrangler pages dev site --port 8788 --ip 127.0.0.1 --compatibility-date=2026-09-01',
        url: `${LOCAL}/`,
        reuseExistingServer: !process.env.CI,
        timeout: 90_000,
        env: { WRANGLER_SEND_METRICS: 'false' },
      },
});
