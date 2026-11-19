// The built site's crawl files, head tags and internal links, read from site/.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { DATA, ROOT, SITE, meta, pages, read } from "./built.mjs";

const ALL = pages();
const indexable = ALL.filter((p) => p.canonical !== null);
const ORIGIN = DATA.origin;

test("every indexable page has a unique title and description, a canonical, OG and Twitter cards, and one h1", () => {
  const titles = new Set();
  for (const p of indexable) {
    const title = p.html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), `${p.sitePath}: title missing or duplicated`);
    titles.add(title);
    assert.equal(p.canonical, ORIGIN + p.sitePath);
    const desc = meta(p.html, "name", "description")[0];
    assert.ok(desc && desc.length >= 50 && desc.length <= 300, `${p.sitePath}: description length ${desc?.length}`);
    assert.deepEqual(meta(p.html, "property", "og:url"), [p.canonical]);
    assert.deepEqual(meta(p.html, "property", "og:image"), [`${ORIGIN}/og-image.png`]);
    for (const k of ["og:title", "og:description", "og:type", "og:image:alt"]) assert.equal(meta(p.html, "property", k).length, 1, `${p.sitePath} ${k}`);
    assert.deepEqual(meta(p.html, "name", "twitter:card"), ["summary_large_image"]);
    assert.equal(meta(p.html, "name", "theme-color").length, 2, `${p.sitePath}: light and dark theme-color`);
    assert.equal((p.html.match(/<h1[ >]/g) ?? []).length, 1, `${p.sitePath}: h1 count`);
    assert.match(p.html, /<link rel="manifest" href="\/site\.webmanifest">/);
  }
});

test("the 404 and offline pages have no canonical and stay out of the sitemap; the offline page (a 200) is noindex", () => {
  for (const rel of ["404.html", "offline/index.html"]) assert.equal(ALL.find((x) => x.rel === rel).canonical, null, rel);
  // Pages serves 404.html with status 404, which already keeps it out of an index.
  assert.deepEqual(meta(ALL.find((x) => x.rel === "offline/index.html").html, "name", "robots"), ["noindex"]);
  for (const p of ALL.filter((x) => x.rel !== "offline/index.html")) assert.deepEqual(meta(p.html, "name", "robots"), [], p.sitePath);
  assert.doesNotMatch(read("sitemap.xml"), /404|offline/);
});

test("the sitemap lists exactly the indexable pages, each with a lastmod", () => {
  const locs = [...read("sitemap.xml").matchAll(/<url><loc>([^<]+)<\/loc><lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod><\/url>/g)].map((m) => m[1]);
  assert.deepEqual(locs.sort(), indexable.map((p) => p.canonical).sort());
});

test("robots.txt names the search, answer-engine and training crawlers and points to the sitemap", () => {
  const robots = read("robots.txt");
  for (const bot of [...DATA.crawlers.search, ...DATA.crawlers.training]) assert.match(robots, new RegExp(`^User-agent: ${bot}$`, "m"));
  assert.match(robots, new RegExp(`^Sitemap: ${ORIGIN}/sitemap.xml$`, "m"));
  for (const line of robots.split("\n").filter((l) => l && !l.startsWith("#"))) {
    assert.match(line, /^(User-agent|Allow|Disallow|Sitemap): \S/, `robots.txt directive Lighthouse would reject: ${line}`);
  }
});

test("geoharness.toml names the same crawlers as src/data/site.json, so the deploy's robots groups match the site's", () => {
  const toml = readFileSync(path.join(ROOT, "geoharness.toml"), "utf8");
  const groups = Object.fromEntries([...toml.matchAll(/^group = "(\w+)"\ntokens = \[([^\]]*)\]/gm)]
    .map((m) => [m[1], [...m[2].matchAll(/"([^"]+)"/g)].map((t) => t[1]).sort()]));
  assert.deepEqual([...groups.search, ...groups.user].sort(), [...DATA.crawlers.search].sort());
  assert.deepEqual(groups.training, [...DATA.crawlers.training].sort());
  assert.deepEqual(groups.other, ["*"]);
});

test("llms.txt names every product, its site, the founder and his site", () => {
  const llms = read("llms.txt");
  assert.match(llms, /^# Avarok Cybersecurity\n\n> /);
  for (const p of DATA.products) {
    assert.ok(llms.includes(`[${p.name}](${ORIGIN}${p.path})`), p.name);
    assert.ok(llms.includes(p.site), p.site);
  }
  assert.ok(llms.includes(`[${DATA.founder.name}](${DATA.founder.url})`));
});

test("the manifest makes the site installable", () => {
  const m = JSON.parse(read("site.webmanifest"));
  assert.deepEqual({ id: m.id, start_url: m.start_url, scope: m.scope, display: m.display }, { id: "/", start_url: "/", scope: "/", display: "standalone" });
  for (const k of ["name", "short_name", "theme_color", "background_color"]) assert.ok(m[k], k);
  assert.deepEqual(m.icons.map((i) => `${i.src} ${i.sizes} ${i.purpose}`),
    ["/icon-192.png 192x192 any", "/icon-512.png 512x512 any", "/icon-maskable-512.png 512x512 maskable"]);
});

test("every page links the founder's site and every family site through the shared footer", () => {
  const family = ["https://work.avarok.net/", "https://synchronized.work/", "https://atlasinference.io/", "https://certified.sh/", DATA.founder.url];
  for (const p of ALL) for (const href of family) assert.ok(p.html.includes(`href="${href}"`), `${p.sitePath} lacks ${href}`);
});

test("every internal link and asset reference resolves to a built file", () => {
  for (const p of ALL) {
    for (const [, ref] of p.html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const file = ref.endsWith("/") ? path.join(SITE, ref, "index.html") : path.join(SITE, ref);
      assert.ok(existsSync(file), `${p.sitePath} -> ${ref}`);
    }
    for (const [, id] of p.html.matchAll(/href="#([^"]+)"/g)) assert.match(p.html, new RegExp(`id="${id}"`), `${p.sitePath} #${id}`);
  }
});

test("the CSP pins the inline stylesheet by hash, allows the service worker, and nothing uses inline style attributes", async () => {
  const { createHash } = await import("node:crypto");
  const headers = read("_headers");
  const css = ALL[0].html.match(/<style>(.*?)<\/style>/s)[1];
  const hash = createHash("sha256").update(css).digest("base64");
  assert.ok(headers.includes(`style-src 'sha256-${hash}'`));
  assert.match(headers, /worker-src 'self'/);
  for (const p of ALL) {
    assert.doesNotMatch(p.html, / style="/, p.sitePath);
    assert.equal(p.html.match(/<style>(.*?)<\/style>/s)[1], css, `${p.sitePath}: one stylesheet for every page`);
  }
});
