"""Page-body placeholders filled from src/data/site.json, so pages never restate the data.

Any page:      {{CARDS}} {{FAMILY}} {{OSS}} {{FOUNDER}}
Product pages (front matter `product: <id>`, and `h1:`):
               {{PRODUCT_HERO}} {{PRODUCT_FACTS}} {{PRODUCT_CTA}} {{RELATED}}
Pure: a string in, a string out.
"""
import sys

from .chrome import e, family_panel, oss_list, product_cards, related


def founder_link(data: dict) -> str:
    f = data["founder"]
    return f'<a href="{f["url"]}">{e(f["name"])}, founder of Avarok (thomaspbraun.com)</a>'


def hero(p: dict, h1: str) -> str:
    return (
        f'<header class="page-hero wrap acc-{p["id"]}"><div class="accent-bar"></div>'
        f'<p class="eyebrow">{e(p["kind"])}</p><h1>{e(h1)}</h1>'
        f'<p class="lede">{e(p["description"])}</p>'
        '<div class="actions">'
        f'<a class="btn btn-primary" href="{p["ctaHref"]}">{e(p["cta"])}</a>'
        f'<a class="btn btn-ghost" href="{p["repo"]}">{e(p["name"])} source code</a></div></header>')


def facts(data: dict, p: dict) -> str:
    maker = (f'Atlas Cybernetics, founded by {founder_link(data)}' if p["publisher"] == "atlas"
             else f'Avarok Cybersecurity, founded by {founder_link(data)}')
    rows = [("What it is", e(p["oneLiner"])), ("Made by", maker), ("Licence", e(p["license"])),
            ("Runs on", e(p["os"])), ("Website", f'<a href="{p["site"]}">{e(p["siteLabel"])}</a>'),
            ("Source", f'<a href="{p["repo"]}">{e(p["repo"].removeprefix("https://"))}</a>')]
    body = "".join(f"<dt>{k}</dt><dd>{v}</dd>" for k, v in rows)
    return f'<section aria-labelledby="facts-h"><h2 id="facts-h">{e(p["name"])} at a glance</h2><dl class="facts">{body}</dl></section>'


def cta(p: dict) -> str:
    return (f'<section class="card cta-box acc-{p["id"]}" aria-label="Get {e(p["name"])}">'
            f'<p><strong>{e(p["name"])}</strong>: {e(p["oneLiner"])}</p>'
            f'<a class="btn btn-ghost" href="{p["ctaHref"]}">{e(p["cta"])}</a></section>')


def fill(data: dict, meta: dict, body: str) -> str:
    body = (body.replace("{{CARDS}}", product_cards(data)).replace("{{FAMILY}}", family_panel(data))
            .replace("{{OSS}}", oss_list(data)).replace("{{FOUNDER}}", founder_link(data)))
    pid = meta.get("product")
    if pid is None:
        return body
    matches = [p for p in data["products"] if p["id"] == pid]
    if len(matches) != 1 or "h1" not in meta:
        sys.exit(f"{meta['path']}: product '{pid}' must name exactly one product and set h1")
    p = matches[0]
    return (body.replace("{{PRODUCT_HERO}}", hero(p, meta["h1"])).replace("{{PRODUCT_FACTS}}", facts(data, p))
            .replace("{{PRODUCT_CTA}}", cta(p)).replace("{{RELATED}}", related(data, pid)))
