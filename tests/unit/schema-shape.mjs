// A schema.org shape check for the JSON-LD the site emits. Pure: a parsed JSON-LD document and
// the expectations in, a list of problems out (empty means valid).
//
// It is deliberately stricter than schema.org: every type the site uses has a closed list of
// properties (a typo or a property schema.org does not define for the type is an error), the
// properties search engines need are required, every {"@id"} reference must resolve inside the
// graph, and the founder's Person @id must be the shared one.

const URL_RE = /^https:\/\/[^\s]+$/;
const isUrl = (v) => typeof v === "string" && URL_RE.test(v);
const isText = (v) => typeof v === "string" && v.trim().length > 0;
const isRef = (v) => v !== null && typeof v === "object" && Object.keys(v).length === 1 && isUrl(v["@id"]);
const urls = (v) => (Array.isArray(v) ? v.length > 0 && v.every(isUrl) : isUrl(v));

/** Per type: the properties allowed (schema.org's own, for that type) and the ones required. */
export const TYPES = {
  Organization: {
    allowed: ["@type", "@id", "name", "alternateName", "legalName", "url", "description", "logo", "image", "email", "address", "founder", "sameAs"],
    required: { "@id": isUrl, name: isText, url: isUrl, logo: (v) => v?.["@type"] === "ImageObject" && isUrl(v.url), founder: isRef, sameAs: urls },
  },
  Person: {
    allowed: ["@type", "@id", "name", "alternateName", "url", "jobTitle", "description", "worksFor", "sameAs"],
    required: { "@id": isUrl, name: isText, url: isUrl, sameAs: urls, worksFor: isRef },
  },
  WebSite: {
    allowed: ["@type", "@id", "url", "name", "inLanguage", "publisher"],
    required: { "@id": isUrl, url: isUrl, name: isText, publisher: isRef },
  },
  WebPage: {
    allowed: ["@type", "@id", "url", "name", "description", "isPartOf", "dateModified", "about", "breadcrumb", "mainEntity"],
    required: { "@id": isUrl, url: isUrl, name: isText, description: isText, isPartOf: isRef, dateModified: (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) },
  },
  BreadcrumbList: {
    allowed: ["@type", "@id", "itemListElement"],
    required: { "@id": isUrl, itemListElement: (v) => Array.isArray(v) && v.length >= 2 },
  },
  SoftwareApplication: {
    allowed: ["@type", "@id", "name", "alternateName", "url", "mainEntityOfPage", "description", "applicationCategory",
      "operatingSystem", "license", "isAccessibleForFree", "author", "creator", "publisher", "sameAs", "offers"],
    required: { "@id": isUrl, name: isText, url: isUrl, mainEntityOfPage: isUrl, description: isText, applicationCategory: isText,
      operatingSystem: isText, license: urls, author: isRef, creator: isRef, publisher: (v) => isRef(v) || (v?.["@type"] === "Organization" && isText(v.name) && isUrl(v.url)), sameAs: urls },
  },
};
TYPES.AboutPage = TYPES.WebPage;

const APP_CATEGORIES = new Set(["CommunicationApplication", "DeveloperApplication", "UtilitiesApplication", "BusinessApplication", "SecurityApplication"]);

/** Collects every {"@id": x} reference anywhere below `node` (excluding the node's own @id). */
function refs(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => refs(n, out));
  else if (node && typeof node === "object") {
    if (isRef(node)) out.push(node["@id"]);
    else for (const [k, v] of Object.entries(node)) if (k !== "@id") refs(v, out);
  }
  return out;
}

/**
 * @param doc       the parsed JSON-LD
 * @param expect    { personId, canonical, softwareCount }
 */
export function validate(doc, expect) {
  const problems = [];
  if (doc?.["@context"] !== "https://schema.org") problems.push("@context must be https://schema.org");
  const graph = doc?.["@graph"];
  if (!Array.isArray(graph) || graph.length === 0) return [...problems, "@graph must be a non-empty array"];
  const ids = new Map();
  for (const node of graph) {
    const spec = TYPES[node["@type"]];
    const label = `${node["@type"]} ${node["@id"] ?? "(no @id)"}`;
    if (!spec) { problems.push(`${label}: type not allowed`); continue; }
    if (ids.has(node["@id"])) problems.push(`${label}: duplicate @id`);
    ids.set(node["@id"], node);
    for (const key of Object.keys(node)) if (!spec.allowed.includes(key)) problems.push(`${label}: property '${key}' not allowed`);
    for (const [key, ok] of Object.entries(spec.required)) if (!ok(node[key])) problems.push(`${label}: '${key}' missing or malformed`);
  }
  for (const id of refs(graph)) if (!ids.has(id)) problems.push(`reference ${id} does not resolve in the graph`);

  const person = ids.get(expect.personId);
  if (!person || person["@type"] !== "Person") problems.push(`no Person with @id ${expect.personId}`);
  for (const org of graph.filter((n) => n["@type"] === "Organization" && n["@id"]?.startsWith("https://avarok.net/"))) {
    if (org.founder?.["@id"] !== expect.personId) problems.push(`${org["@id"]}: founder must reference ${expect.personId}`);
  }
  const apps = graph.filter((n) => n["@type"] === "SoftwareApplication");
  if (apps.length !== expect.softwareCount) problems.push(`expected ${expect.softwareCount} SoftwareApplication, found ${apps.length}`);
  for (const app of apps) {
    for (const key of ["author", "creator"]) {
      if (app[key]?.["@id"] !== expect.personId) problems.push(`${app["@id"]}: ${key} must reference ${expect.personId}`);
    }
    if (!APP_CATEGORIES.has(app.applicationCategory)) problems.push(`${app["@id"]}: unknown applicationCategory`);
    if (app.offers && !(app.offers["@type"] === "Offer" && app.offers.price === "0" && app.offers.priceCurrency === "USD")) {
      problems.push(`${app["@id"]}: offers must be a free Offer in USD`);
    }
  }
  const page = graph.find((n) => n["@type"] === "WebPage" || n["@type"] === "AboutPage");
  if (!page || page.url !== expect.canonical) problems.push(`WebPage url must equal the canonical ${expect.canonical}`);
  const crumbs = graph.find((n) => n["@type"] === "BreadcrumbList");
  if (crumbs) {
    const items = crumbs.itemListElement;
    items.forEach((it, i) => {
      if (it["@type"] !== "ListItem" || it.position !== i + 1 || !isText(it.name) || !isUrl(it.item)) problems.push(`breadcrumb item ${i + 1} malformed`);
    });
    if (items.at(-1)?.item !== expect.canonical) problems.push("the last breadcrumb must be the page itself");
  }
  return problems;
}
