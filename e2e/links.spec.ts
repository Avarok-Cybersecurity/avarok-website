import { expect, test, type APIRequestContext, type Browser } from '@playwright/test';
import { DATA, sitemapPaths } from './support';

// Every link on every page resolves: internal ones against the site under test, external ones
// (the family sites, the founder's site, GitHub, crates.io, downloads) live on the internet,
// plus every URL the JSON-LD names (sameAs, url). A 200, or redirects ending in one.
//
// A few hosts refuse scripted HTTP clients with 403 (Medium, LinkedIn). For those the check
// falls back to a real browser navigation, and fails if that is refused too.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';
const BOT_WALLED = new Set([403, 429, 999]);

async function collect(request: APIRequestContext): Promise<{ internal: Set<string>; external: Map<string, string> }> {
  const paths = [...sitemapPaths(await (await request.get('/sitemap.xml')).text()), '/404.html', '/offline/'];
  const internal = new Set<string>(paths);
  const external = new Map<string, string>();
  for (const p of paths) {
    const html = await (await request.get(p)).text();
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      const url = href.startsWith(DATA.origin) ? href.slice(DATA.origin.length) || '/' : href;
      if (url.startsWith('/')) internal.add(url.split('#')[0]);
      else if (url.startsWith('https://')) external.set(url.split('#')[0], p);
    }
    for (const [, block] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      for (const [, url] of block.matchAll(/"(https:\/\/[^"]+)"/g)) {
        if (!url.startsWith(DATA.origin) && !url.includes('#') && !url.startsWith('https://schema.org')) external.set(url, `${p} (JSON-LD)`);
      }
    }
  }
  return { internal, external };
}

// A github.com/<owner>/<repo>/blob/<ref>/<path> link is checked against GitHub's contents API
// instead of the rendered page: the API proves the same fact (the file exists in a public
// repository: it answers 404 for a private one, unauthenticated) without asking GitHub to
// render it, and GitHub answers anonymous renders of large files with a 503 "Unicorn" page
// under load while the repository and the file are fine.
const BLOB = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/;

async function resolves(request: APIRequestContext, browser: Browser, url: string): Promise<string> {
  const blob = url.match(BLOB);
  if (blob) {
    const [, owner, repo, ref, path] = blob;
    const api = await request.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`, { headers: { 'user-agent': 'avarok-website-linkcheck', accept: 'application/vnd.github+json' } });
    return api.status() === 200 ? '200 (contents API)' : `contents API ${api.status()}`;
  }
  const r = await request.get(url, { headers: { 'user-agent': UA, accept: 'text/html,*/*' }, maxRedirects: 10, timeout: 30_000 });
  if (r.status() < 400) return `${r.status()}`;
  if (!BOT_WALLED.has(r.status())) return `HTTP ${r.status()}`;
  const page = await browser.newPage({ userAgent: UA });
  try {
    const nav = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    return nav && nav.status() < 400 ? `${nav.status()} (browser)` : `browser ${nav?.status()}`;
  } finally {
    await page.close();
  }
}

test('every internal link resolves on the site under test', async ({ request }) => {
  const { internal } = await collect(request);
  expect(internal.size).toBeGreaterThan(15);
  const broken: string[] = [];
  for (const path of internal) {
    const r = await request.get(path);
    if (r.status() !== 200 && path !== '/404.html') broken.push(`${path} -> ${r.status()}`);
  }
  expect(broken).toEqual([]);
});

test('every family, founder, source and download link resolves live', async ({ request, browser }) => {
  test.setTimeout(240_000);
  const { external } = await collect(request);
  for (const must of ['https://work.avarok.net/', 'https://synchronized.work/', 'https://atlasinference.io/', 'https://certified.sh/', 'https://thomaspbraun.com']) {
    expect([...external.keys()], must).toContain(must);
  }
  // Four at a time: GitHub answers a burst of parallel requests with 503.
  const queue = [...external];
  const results: (readonly [string, string, string])[] = [];
  await Promise.all(Array.from({ length: 4 }, async () => {
    for (let next = queue.shift(); next; next = queue.shift()) results.push([next[0], next[1], await resolves(request, browser, next[0])]);
  }));
  expect(results.length).toBe(external.size);
  console.log(results.map(([url, , status]) => `${status.padEnd(14)} ${url}`).sort().join('\n'));
  const broken = results.filter(([, , status]) => !/^\d{3}( \((browser|contents API)\))?$/.test(status) || Number(status.slice(0, 3)) >= 400);
  expect(broken.map(([url, from, status]) => `${url} (on ${from}): ${status}`)).toEqual([]);
});
