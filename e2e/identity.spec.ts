import { expect, test } from '@playwright/test';
import { icoSizes, pngSize } from './support';

// The identity set, fetched as a browser or crawler would, with the type each must be served
// as and the bytes checked: an HTML page at an image path counts as missing.
const PNG = 'image/png';
const ASSETS: [string, RegExp, (b: Buffer) => void][] = [
  ['/favicon.ico', /^image\/(vnd\.microsoft\.icon|x-icon)$/, (b) => expect(icoSizes(b)).toEqual([16, 32, 48])],
  ['/favicon.svg', /^image\/svg\+xml/, (b) => expect(b.toString()).toMatch(/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)],
  ['/logo.svg', /^image\/svg\+xml/, (b) => expect(b.toString()).toMatch(/^<svg [^>]*aria-label="Avarok"/)],
  ['/apple-touch-icon.png', new RegExp(`^${PNG}$`), (b) => expect(pngSize(b)).toEqual({ width: 180, height: 180 })],
  ['/icon-192.png', new RegExp(`^${PNG}$`), (b) => expect(pngSize(b)).toEqual({ width: 192, height: 192 })],
  ['/icon-512.png', new RegExp(`^${PNG}$`), (b) => expect(pngSize(b)).toEqual({ width: 512, height: 512 })],
  ['/icon-maskable-512.png', new RegExp(`^${PNG}$`), (b) => expect(pngSize(b)).toEqual({ width: 512, height: 512 })],
  ['/og-image.png', new RegExp(`^${PNG}$`), (b) => expect(pngSize(b)).toEqual({ width: 1200, height: 630 })],
  ['/site.webmanifest', /^application\/manifest\+json/, (b) => expect(JSON.parse(b.toString()).display).toBe('standalone')],
  ['/robots.txt', /^text\/plain/, (b) => expect(b.toString()).toMatch(/^Sitemap: https:\/\/avarok\.net\/sitemap\.xml$/m)],
  ['/llms.txt', /^text\/plain/, (b) => expect(b.toString()).toMatch(/^# Avarok\n/)],
  ['/sitemap.xml', /^(application|text)\/xml/, (b) => expect(b.toString()).toContain('<urlset')],
];

for (const [path, type, check] of ASSETS) {
  test(`${path} is served as ${type.source} with the right bytes`, async ({ request }) => {
    const r = await request.get(path);
    expect(r.status(), path).toBe(200);
    expect(r.headers()['content-type'], path).toMatch(type);
    check(await r.body());
  });
}

test('the head points at the identity set with absolute OG and Twitter image URLs', async ({ page, request }) => {
  await page.goto('/');
  const og = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(og).toBe('https://avarok.net/og-image.png');
  expect(await page.locator('meta[name="twitter:image"]').getAttribute('content')).toBe(og);
  expect(await page.locator('meta[name="twitter:card"]').getAttribute('content')).toBe('summary_large_image');
  for (const sel of ['link[rel="icon"][type="image/svg+xml"]', 'link[rel="icon"][sizes]', 'link[rel="apple-touch-icon"]', 'link[rel="manifest"]']) {
    const href = await page.locator(sel).getAttribute('href');
    expect((await request.get(href!)).status(), sel).toBe(200);
  }
});

test('an unknown file-like path is a 404 page, never an image or a 200', async ({ request }) => {
  for (const path of ['/missing.png', '/missing.ico', '/nope/']) {
    const r = await request.get(path);
    expect(r.status(), path).toBe(404);
    expect(r.headers()['content-type'], path).toMatch(/^text\/html/);
  }
});
