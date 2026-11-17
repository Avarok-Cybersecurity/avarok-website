// Reads the generated site/ for the unit tests: every HTML page with its canonical, head tags and
// JSON-LD. The tests run after `python3 tools/build.py`, against exactly what deploys.
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const SITE = path.join(ROOT, "site");
export const DATA = JSON.parse(readFileSync(path.join(ROOT, "src/data/site.json"), "utf8"));

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

export const read = (rel) => readFileSync(path.join(SITE, rel), "utf8");

/** Every page: its site path ("/about/"), file, html, canonical (or null) and JSON-LD blocks. */
export function pages() {
  return walk(SITE).filter((f) => f.endsWith(".html")).map((file) => {
    const rel = path.relative(SITE, file).split(path.sep).join("/");
    const sitePath = rel === "index.html" ? "/" : rel.endsWith("/index.html") ? `/${rel.slice(0, -"index.html".length)}` : `/${rel}`;
    const html = readFileSync(file, "utf8");
    const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1] ?? null;
    const jsonld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
    return { sitePath, rel, html, canonical, jsonld };
  });
}

export const meta = (html, attr, name) =>
  [...html.matchAll(new RegExp(`<meta ${attr}="${name.replace(/[:.]/g, "\\$&")}"(?: media="[^"]*")? content="([^"]*)">`, "g"))].map((m) => m[1]);
