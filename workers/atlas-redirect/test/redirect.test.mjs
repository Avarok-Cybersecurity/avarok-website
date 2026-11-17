// The redirect, tested through the real fetch handler with the vars wrangler.toml deploys.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import worker, { config } from "../src/index.js";

const TOML = readFileSync(new URL("../wrangler.toml", import.meta.url), "utf8");
const vars = Object.fromEntries(
  [...TOML.split("[vars]")[1].matchAll(/^(\w+)\s*=\s*"([^"]*)"/gm)].map((m) => [m[1], m[2]]),
);

test("wrangler.toml deploys a 301 to the Atlas engine page on atlas.avarok.net", () => {
  assert.deepEqual(vars, { REDIRECT_TARGET: "https://atlasinference.io/engine", REDIRECT_STATUS: "301" });
  assert.match(TOML, /\{ pattern = "atlas\.avarok\.net", custom_domain = true \}/);
  assert.match(TOML, /^workers_dev = false$/m);
});

const cases = [
  ["GET", "https://atlas.avarok.net/"],
  ["GET", "https://atlas.avarok.net/engine"],
  ["GET", "https://atlas.avarok.net/some/deep/path?utm_source=x#frag"],
  ["HEAD", "https://atlas.avarok.net/models"],
  ["POST", "https://atlas.avarok.net/v1/chat/completions"],
];
for (const [method, url] of cases) {
  test(`${method} ${url} -> 301 to exactly the engine page (path and query ignored)`, async () => {
    const res = await worker.fetch(new Request(url, { method }), vars);
    assert.equal(res.status, 301);
    assert.equal(res.headers.get("location"), "https://atlasinference.io/engine");
    assert.equal(res.headers.get("cache-control"), "public, max-age=86400");
    assert.equal(await res.text(), "");
  });
}

test("missing or invalid vars fail closed with 500, never a redirect somewhere else", async () => {
  for (const env of [{}, { REDIRECT_STATUS: "301" }, { REDIRECT_TARGET: "http://atlasinference.io/engine", REDIRECT_STATUS: "301" },
    { REDIRECT_TARGET: "https://atlasinference.io/engine" }, { REDIRECT_TARGET: "https://atlasinference.io/engine", REDIRECT_STATUS: "200" }]) {
    const res = await worker.fetch(new Request("https://atlas.avarok.net/"), env);
    assert.equal(res.status, 500, JSON.stringify(env));
    assert.equal(res.headers.get("location"), null);
  }
  assert.deepEqual(config(vars), { target: "https://atlasinference.io/engine", status: 301 });
});
