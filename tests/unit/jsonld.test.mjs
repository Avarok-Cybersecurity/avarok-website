// The JSON-LD on every built page validates against the schema.org shape check, ties every
// product to the founder's shared Person @id, and covers every product in src/data/site.json.
import assert from "node:assert/strict";
import { test } from "node:test";
import { DATA, pages } from "./built.mjs";
import { validate } from "./schema-shape.mjs";

const PERSON = "https://thomaspbraun.com/#person";
const ALL = pages();
const indexable = ALL.filter((p) => p.canonical !== null);
const productPaths = new Set(DATA.products.map((p) => p.path));

test("the founder's Person @id in the data is the shared one", () => {
  assert.equal(DATA.founder.id, PERSON);
});

for (const page of indexable) {
  test(`${page.sitePath}: one JSON-LD graph that passes the schema.org shape check`, () => {
    assert.equal(page.jsonld.length, 1);
    const softwareCount = page.sitePath === "/" ? DATA.products.length : productPaths.has(page.sitePath) ? 1 : 0;
    assert.deepEqual(validate(page.jsonld[0], { personId: PERSON, canonical: page.canonical, softwareCount }), []);
  });
}

test("the home page describes every product, each authored by the founder", () => {
  const home = indexable.find((p) => p.sitePath === "/").jsonld[0]["@graph"];
  const apps = home.filter((n) => n["@type"] === "SoftwareApplication");
  assert.deepEqual(apps.map((a) => a.name).sort(), DATA.products.map((p) => p.name).sort());
  for (const a of apps) assert.equal(a.author["@id"], PERSON, a.name);
  const org = home.find((n) => n["@type"] === "Organization");
  assert.deepEqual(org.sameAs, DATA.organization.sameAs);
  assert.equal(org.founder["@id"], PERSON);
  const person = home.find((n) => n["@id"] === PERSON);
  assert.deepEqual(person.sameAs, DATA.founder.sameAs);
  assert.equal(person.url, "https://thomaspbraun.com");
});

test("each product page's SoftwareApplication is the product on that page", () => {
  for (const p of DATA.products) {
    const page = indexable.find((x) => x.sitePath === p.path);
    assert.ok(page, `no page for ${p.path}`);
    const app = page.jsonld[0]["@graph"].find((n) => n["@type"] === "SoftwareApplication");
    assert.equal(app.name, p.name);
    assert.equal(app.url, p.site);
    assert.equal(app.mainEntityOfPage, page.canonical);
  }
});

test("the validator itself rejects broken graphs (negative cases)", () => {
  const good = indexable.find((p) => p.sitePath === "/citadel-agent/").jsonld[0];
  const expect = { personId: PERSON, canonical: "https://avarok.net/citadel-agent/", softwareCount: 1 };
  assert.deepEqual(validate(good, expect), []);
  const mutate = (fn) => { const d = structuredClone(good); fn(d["@graph"]); return validate(d, expect); };
  const app = (g) => g.find((n) => n["@type"] === "SoftwareApplication");
  assert.notDeepEqual(mutate((g) => { delete app(g).author; }), []);
  assert.notDeepEqual(mutate((g) => { app(g).creator = { "@id": "https://example.com/#someone" }; }), []);
  assert.notDeepEqual(mutate((g) => { app(g).authr = "typo"; }), []);
  assert.notDeepEqual(mutate((g) => { g.splice(g.findIndex((n) => n["@type"] === "Person"), 1); }), []);
  assert.notDeepEqual(mutate((g) => { g.find((n) => n["@type"] === "Organization").founder = { "@id": "https://avarok.net/#nobody" }; }), []);
  assert.notDeepEqual(mutate((g) => { g.find((n) => n["@type"] === "BreadcrumbList").itemListElement[1].position = 3; }), []);
});
