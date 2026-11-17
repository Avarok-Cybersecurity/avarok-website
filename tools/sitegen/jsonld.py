"""Schema.org JSON-LD for each page, as one @graph, derived from src/data/site.json.

Every page carries the Organization, the founder's Person and the WebSite, so each page stands
alone for an agent that fetches only one. The Person @id is the founder's own
(https://thomaspbraun.com/#person): every family site using the same @id lets the entity graph
merge across domains. Products are SoftwareApplication nodes whose author and creator point at
that @id. Pure.
"""
import json

SPDX = "https://spdx.org/licenses/{}.html"


def licence_urls(expr: str) -> list[str] | str:
    ids = [part.strip() for part in expr.split(" OR ")]
    urls = [SPDX.format(i) for i in ids]
    return urls[0] if len(urls) == 1 else urls


def organization(data: dict) -> dict:
    org, origin = data["organization"], data["origin"]
    return {
        "@type": "Organization", "@id": org["id"], "name": org["name"], "alternateName": org["alternateName"],
        "legalName": org["legalName"], "url": origin + "/", "description": org["description"],
        "logo": {"@type": "ImageObject", "url": origin + "/icon-512.png", "width": 512, "height": 512},
        "image": origin + "/og-image.png", "email": org["email"],
        "address": {"@type": "PostalAddress", **org["address"]},
        "founder": {"@id": data["founder"]["id"]},
        "sameAs": org["sameAs"],
    }


def person(data: dict) -> dict:
    f = data["founder"]
    return {
        "@type": "Person", "@id": f["id"], "name": f["name"], "alternateName": f["alternateName"],
        "url": f["url"], "jobTitle": f["jobTitle"], "description": f["description"],
        "worksFor": {"@id": data["organization"]["id"]}, "sameAs": f["sameAs"],
    }


def website(data: dict) -> dict:
    return {"@type": "WebSite", "@id": data["origin"] + "/#website", "url": data["origin"] + "/",
            "name": data["organization"]["name"], "inLanguage": "en",
            "publisher": {"@id": data["organization"]["id"]}}


def software(data: dict, p: dict) -> dict:
    origin = data["origin"]
    if p["publisher"] == "avarok":
        publisher: dict = {"@id": data["organization"]["id"]}
    else:
        publisher = {"@type": "Organization", **data["atlasPublisher"], "founder": {"@id": data["founder"]["id"]}}
    node = {
        "@type": "SoftwareApplication", "@id": f'{origin}{p["path"]}#software', "name": p["name"],
        "alternateName": p["alternateName"], "url": p["site"], "mainEntityOfPage": origin + p["path"],
        "description": p["description"], "applicationCategory": p["category"], "operatingSystem": p["os"],
        "license": licence_urls(p["license"]), "isAccessibleForFree": p["free"],
        "author": {"@id": data["founder"]["id"]}, "creator": {"@id": data["founder"]["id"]},
        "publisher": publisher, "sameAs": [p["repo"], *p.get("extra", [])],
    }
    if p["free"]:
        node["offers"] = {"@type": "Offer", "price": "0", "priceCurrency": "USD"}
    return node


def breadcrumbs(data: dict, url: str, title: str) -> dict:
    return {"@type": "BreadcrumbList", "@id": url + "#breadcrumb", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": data["origin"] + "/"},
        {"@type": "ListItem", "position": 2, "name": title, "item": url},
    ]}


def graph(data: dict, meta: dict, url: str) -> str:
    """The page's JSON-LD. Home lists every product; a product page describes its own."""
    nodes = [organization(data), person(data), website(data)]
    page = {"@type": "AboutPage" if meta["path"] == "/about/" else "WebPage", "@id": url + "#webpage",
            "url": url, "name": meta["title"], "description": meta["description"],
            "isPartOf": {"@id": data["origin"] + "/#website"}, "dateModified": meta["updated"],
            "about": {"@id": data["organization"]["id"]}}
    if meta["path"] == "/about/":
        page["mainEntity"] = {"@id": data["founder"]["id"]}
    products = data["products"] if meta["path"] == "/" else [p for p in data["products"] if p["id"] == meta.get("product")]
    if meta.get("product"):
        page["about"] = {"@id": f'{data["origin"]}{meta["path"]}#software'}
    if meta["path"] != "/":
        crumb = breadcrumbs(data, url, meta.get("crumb", meta["title"]))
        page["breadcrumb"] = {"@id": crumb["@id"]}
        nodes.append(crumb)
    nodes.append(page)
    nodes += [software(data, p) for p in products]
    body = json.dumps({"@context": "https://schema.org", "@graph": nodes}, ensure_ascii=False, separators=(",", ":"))
    return '<script type="application/ld+json">' + body.replace("</", "<\\/") + "</script>"
