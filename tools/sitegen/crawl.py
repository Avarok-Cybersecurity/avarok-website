"""The files crawlers and installers read: sitemap.xml, robots.txt, llms.txt, site.webmanifest.

All derived from src/data/site.json and the pages' front matter. A sitemap may only list URLs on
its own host (sitemaps.org protocol), so the founder and family sites are linked from llms.txt and
from the pages themselves, not from the sitemap. Pure: strings out.
"""
import json


def sitemap(entries: list[tuple[str, str]]) -> str:
    """entries: (absolute URL, YYYY-MM-DD last modified), one per indexable page."""
    urls = "".join(f"  <url><loc>{u}</loc><lastmod>{d}</lastmod></url>\n" for u, d in sorted(entries))
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + "</urlset>\n")


def robots(data: dict) -> str:
    c = data["crawlers"]
    search = "".join(f"User-agent: {b}\n" for b in c["search"])
    training = "".join(f"User-agent: {b}\n" for b in c["training"])
    rule = "Allow: /" if c["trainingAllowed"] else "Disallow: /"
    return (
        "# avarok.net crawler policy.\n"
        "# Search engines and AI answer engines (retrieval at question time) may fetch every page,\n"
        "# so the products can be found and cited.\n"
        f"{search}Allow: /\n\n"
        "# Crawlers that collect text for model training: "
        f"{'allowed' if c['trainingAllowed'] else 'not allowed'}.\n"
        f"{training}{rule}\n\n"
        f"# Everything else. Content signals for this site, sent as a header too: {c['contentSignal']}\n"
        "User-agent: *\nAllow: /\n\n"
        f"Sitemap: {data['origin']}/sitemap.xml\n")


def llms(data: dict, pages: list[dict]) -> str:
    org, f, origin = data["organization"], data["founder"], data["origin"]
    lines = [f"# {org['name']}", "", f"> {org['description']}", "",
             f"Avarok Cybersecurity ({origin}) is the company behind the Citadel Protocol and a family of "
             f"products built on post-quantum cryptography and Rust. It was founded by {f['name']} "
             f"({f['url']}). Every product below is open source.", "", "## Products", ""]
    for p in data["products"]:
        lines.append(f"- [{p['name']}]({origin}{p['path']}): {p['oneLiner']} Site: {p['site']} "
                     f"Source: {p['repo']} (licence {p['license']}).")
    lines += ["", "## Founder", "",
              f"- [{f['name']}]({f['url']}): {f['description']} Holder of {f['patent']}.", "",
              "## Open source", ""]
    lines += [f"- [{o['name']}]({o['url']}): {o['text']}" for o in data["openSource"]]
    lines += ["", "## Company pages", ""]
    lines += [f"- [{pg['title']}]({origin}{pg['path']}): {pg['description']}"
              for pg in pages if pg["layout"] in ("home", "page")]
    lines += ["", "## Optional", ""]
    lines += [f"- [{pg['title']}]({origin}{pg['path']})" for pg in pages if pg["layout"] == "legal"]
    return "\n".join(lines) + "\n"


def manifest(data: dict) -> str:
    b, org = data["brand"], data["organization"]
    icons = [{"src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
             {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
             {"src": "/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]
    return json.dumps({"id": "/", "name": org["name"], "short_name": b["shortName"], "description": org["description"],
                       "start_url": "/", "scope": "/", "display": "standalone", "lang": "en",
                       "theme_color": b["pageLight"], "background_color": b["pageLight"], "icons": icons},
                      indent=2) + "\n"
