import { expect, test, type Page } from '@playwright/test';
import { pngSize } from './support';

// Installability as Chromium judges it (over CDP), the service worker controlling the page,
// and the offline fallback.
async function controlled(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null, undefined, { timeout: 15_000 });
}

test('Chromium reads the manifest, loads its icons and finds the site installable', async ({ page, request, baseURL }) => {
  await controlled(page);
  const cdp = await page.context().newCDPSession(page);
  const manifest = await cdp.send('Page.getAppManifest');
  expect(manifest.errors).toEqual([]);
  expect(manifest.url).toBe(`${baseURL}/site.webmanifest`);
  const parsed = JSON.parse(String(manifest.data));
  expect(parsed).toMatchObject({ id: '/', start_url: '/', scope: '/', display: 'standalone' });
  for (const icon of parsed.icons as { src: string; sizes: string }[]) {
    const r = await request.get(icon.src);
    expect(r.headers()['content-type'], icon.src).toBe('image/png');
    const side = Number(icon.sizes.split('x')[0]);
    expect(pngSize(await r.body()), icon.src).toEqual({ width: side, height: side });
  }
  const { installabilityErrors } = await cdp.send('Page.getInstallabilityErrors');
  expect(installabilityErrors).toEqual([]);
  const reg = await page.evaluate(async () => {
    const r = await navigator.serviceWorker.getRegistration('/');
    return { scope: r?.scope, state: r?.active?.state, script: r?.active?.scriptURL };
  });
  expect(reg).toEqual({ scope: `${baseURL}/`, state: 'activated', script: `${baseURL}/sw.js` });
  expect((await request.get('/sw.js')).headers()['cache-control']).toBe('no-cache');
});

test('offline, any navigation shows the offline page from the cache', async ({ page, context }) => {
  await controlled(page);
  await context.setOffline(true);
  await page.goto('/citadel-workspace/');
  await expect(page.getByRole('heading', { level: 1, name: "You're offline" })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Try again' })).toHaveAttribute('href', '/');
  await context.setOffline(false);
});

test('online, a navigation returns the real page, not the offline fallback', async ({ page }) => {
  await controlled(page);
  const response = await page.goto('/about/');
  expect(response?.fromServiceWorker()).toBe(true);
  await expect(page.getByRole('heading', { level: 1, name: 'About Avarok Cybersecurity' })).toBeVisible();
});
