"""Shared page chrome derived from src/data/site.json: header, family footer, product cards.

Every cross-link to a family site is written here, once, with descriptive anchor text, so the
footer is identical on every page and the cards cannot drift from the data. Pure.
"""
from html import escape

from .mark import inline_tile

NAV = (("/#products", "Products"), ("/open-source/", "Open source"), ("/about/", "About"), ("/#contact", "Contact"))
MENU_ICON = ('<svg class="i-menu" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'
             '<svg class="i-x" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>')


def e(text: str) -> str:
    return escape(text, quote=True)


def nav_list(current: str) -> str:
    items = []
    for href, label in NAV:
        mark = ' aria-current="page"' if href == current else ""
        items.append(f'<li><a href="{href}"{mark}>{label}</a></li>')
    return f'<ul class="nav-links">{"".join(items)}</ul>'


def header(data: dict, current: str) -> str:
    links = nav_list(current)
    return (
        '<a class="skip" href="#main">Skip to content</a>\n'
        '<header class="site-header"><div class="wrap header-inner">'
        f'<a class="brand" href="/">{inline_tile(data["brand"], 32)}<span>Avarok <small>Cybersecurity</small></span></a>'
        f'<nav class="desk" aria-label="Main">{links}</nav>'
        f'<details class="mnav"><summary aria-label="Menu">{MENU_ICON}</summary>'
        f'<nav aria-label="Main, compact">{links}</nav></details>'
        '</div></header>')


def family_links(data: dict) -> list[tuple[str, str]]:
    """(href, anchor) for every family property, in the footer's order. Anchors name the topic."""
    by_id = {p["id"]: p for p in data["products"]}
    out = [(by_id[i]["site"], f'{by_id[i]["name"]}, {label}') for i, label in (
        ("citadel-workspace", "post-quantum collaboration"),
        ("synchronized-work", "coordination for coding agents"),
        ("atlas-inference", "pure Rust LLM inference"),
        ("certifiedcopy", "export iPhone messages to PDF"),
    )]
    out += [
        ("https://github.com/Avarok-Cybersecurity/Citadel-Protocol", "Citadel Protocol source on GitHub"),
        ("https://crates.io/crates/citadel_sdk", "citadel_sdk on crates.io"),
        ("https://blog.avarok.net/", "The Avarok blog"),
    ]
    return out


def footer(data: dict) -> str:
    org, founder, brand = data["organization"], data["founder"], data["brand"]
    a = org["address"]
    products = "".join(f'<li><a href="{p["path"]}">{e(p["name"])}</a></li>' for p in data["products"])
    family = "".join(f'<li><a href="{href}">{e(text)}</a></li>' for href, text in family_links(data))
    company = (
        f'<li><a href="/about/">About Avarok Cybersecurity</a></li>'
        f'<li><a href="{founder["url"]}">Founder: {e(founder["name"])}, thomaspbraun.com</a></li>'
        '<li><a href="/open-source/">Open-source projects</a></li>'
        '<li><a href="https://github.com/Avarok-Cybersecurity">Avarok on GitHub</a></li>'
        '<li><a href="/#contact">Contact</a></li>')
    legal = ('<a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · '
             '<a href="/cookie-policy/">Cookies</a> · <a href="/acceptable-use/">Acceptable use</a>')
    return (
        '<footer class="site-footer"><div class="wrap"><div class="foot-grid">'
        f'<div><a class="brand" href="/">{inline_tile(brand, 28)}<span>Avarok</span></a>'
        f'<p class="muted">{e(org["description"])}</p>'
        f'<p class="muted">{e(a["streetAddress"])}, {e(a["addressLocality"])}, {e(a["addressRegion"])} {e(a["postalCode"])}<br>'
        f'<a href="mailto:{org["email"]}">{org["email"]}</a></p></div>'
        f'<nav aria-label="Products"><h2>Products</h2><ul>{products}</ul></nav>'
        f'<nav aria-label="The Avarok family"><h2>The family</h2><ul>{family}</ul></nav>'
        f'<nav aria-label="Company"><h2>Company</h2><ul>{company}</ul></nav>'
        '</div>'
        f'<div class="legal-line"><p>© {e(org["legalName"])}. Founded by '
        f'<a href="{founder["url"]}">{e(founder["name"])}</a>.</p><p>{legal}</p></div>'
        '</div></footer>')


def product_card(p: dict) -> str:
    return (
        f'<li class="card product acc-{p["id"]}">'
        f'<p class="kind">{e(p["kind"])}</p><h3>{e(p["name"])}</h3><p>{e(p["oneLiner"])}</p>'
        f'<p class="meta">Licence: {e(p["license"])}</p>'
        '<div class="actions">'
        f'<a class="btn btn-ghost" href="{p["ctaHref"]}">{e(p["cta"])}</a>'
        f'<a class="more" href="{p["path"]}">About {e(p["name"])}</a></div></li>')


def product_cards(data: dict) -> str:
    return f'<ul class="grid">{"".join(product_card(p) for p in data["products"])}</ul>'


def family_panel(data: dict) -> str:
    items = "".join(
        f'<li><a class="acc-{p["id"]}" href="{p["path"]}"><i class="dot" aria-hidden="true"></i>'
        f'<div>{e(p["name"])}<span>{e(p["kind"])}</span></div></a></li>' for p in data["products"])
    return f'<ul class="family">{items}</ul>'


def oss_list(data: dict) -> str:
    items = []
    for o in data["openSource"]:
        docs = f' · <a href="{o["docs"]}">{e(o["name"])} documentation</a>' if "docs" in o else ""
        items.append(f'<li class="card"><a href="{o["url"]}">{e(o["name"])} on GitHub</a>'
                     f'<p>{e(o["text"])}</p><p class="lic">{e(o["license"])}{docs}</p></li>')
    return f'<ul class="oss">{"".join(items)}</ul>'


def crumbs(title: str) -> str:
    return ('<nav class="crumbs wrap" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li>'
            f'<li aria-current="page">{e(title)}</li></ol></nav>')


def related(data: dict, current_id: str) -> str:
    items = "".join(
        f'<li><a class="acc-{p["id"]}" href="{p["path"]}"><i class="dot" aria-hidden="true"></i>{e(p["name"])}</a></li>'
        for p in data["products"] if p["id"] != current_id)
    return f'<ul class="related">{items}</ul>'


def accent_css(data: dict) -> str:
    """One class per product carrying its family accent; the CSP forbids style attributes."""
    return "".join(f'.acc-{p["id"]}{{--accent:{p["accent"]}}}' for p in data["products"])
