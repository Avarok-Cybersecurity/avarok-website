#!/usr/bin/env python3
"""Generate site/ from src/. Standard library only; site/ is wiped and rebuilt every run.

src/pages/*.html carry a front-matter block and the page body. Everything shared (head, header,
family footer, product cards, JSON-LD, crawl files, manifest, service worker, headers) is
derived from src/data/site.json and stamped in, so the output is plain static HTML with inline
CSS (pinned by hash in the CSP) and one deferred script. src/static/ (the identity set that
tools/brand.py writes) is copied to the site root unchanged.
Run:  python3 tools/build.py
"""
import base64
import hashlib
import json
import pathlib
import re
import shutil
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from sitegen import chrome, crawl, jsonld, product  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
SITE = ROOT / "site"
REQUIRED = ("title", "description", "path", "layout", "updated")
LAYOUTS = ("home", "page", "legal", "error")
SW_SHELL = ("/offline/", "/favicon.svg", "/logo.svg", "/site.webmanifest", "/icon-192.png")


def read(p: pathlib.Path) -> str:
    return p.read_text(encoding="utf-8")


def minify_css(css: str) -> str:
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    return re.sub(r"\s*\n\s*", "", css).strip()


def front_matter(text: str, name: str) -> tuple[dict, str]:
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    if not m:
        sys.exit(f"{name}: missing front matter")
    meta = dict(line.split(": ", 1) for line in m.group(1).splitlines())
    missing = [k for k in REQUIRED if k not in meta]
    if missing:
        sys.exit(f"{name}: front matter lacks {missing}")
    if meta["layout"] not in LAYOUTS:
        sys.exit(f"{name}: unknown layout {meta['layout']}")
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", meta["updated"]):
        sys.exit(f"{name}: 'updated' must be YYYY-MM-DD")
    return meta, text[m.end():]


def out_path(path: str) -> pathlib.Path:
    if path == "/":
        return SITE / "index.html"
    if path.endswith(".html"):
        return SITE / path.lstrip("/")
    return SITE / path.strip("/") / "index.html"


def render(data: dict, meta: dict, body: str, head_t: str, css: str, js_name: str) -> str:
    origin, layout = data["origin"], meta["layout"]
    url = origin + meta["path"]
    indexable = layout != "error"
    head = (head_t.replace("{{TITLE}}", chrome.e(meta["title"]))
            .replace("{{DESCRIPTION}}", chrome.e(meta["description"]))
            .replace("{{AUTHOR}}", chrome.e(data["founder"]["name"]))
            .replace("{{FOUNDER_URL}}", data["founder"]["url"])
            .replace("{{OG_TYPE}}", "website")
            .replace("{{OG_ALT}}", chrome.e(f'{data["organization"]["name"]}: {data["brand"]["tagline"]}'))
            .replace("{{THEME_LIGHT}}", data["brand"]["pageLight"])
            .replace("{{THEME_DARK}}", data["brand"]["pageDark"])
            .replace("{{STYLE}}", css).replace("{{SCRIPT}}", js_name)
            .replace("{{ROBOTS}}", '<meta name="robots" content="noindex">\n' if meta.get("noindex") == "true" else "")
            .replace("{{JSONLD}}", jsonld.graph(data, meta, url) if indexable else ""))
    if not indexable:
        head = re.sub(r'<link rel="canonical"[^>]*>\n|<meta property="og:url"[^>]*>\n', "", head)
    head = head.replace("{{CANONICAL}}", url).replace("{{ORIGIN}}", origin)

    body = product.fill(data, meta, body.strip())
    current = meta["path"] if meta["path"] in ("/open-source/", "/about/") else ""
    top = chrome.header(data, current)
    if layout == "page":
        top += "\n" + chrome.crumbs(meta.get("crumb", meta["title"]))
    if layout == "legal":
        body = f'<article class="doc wrap">\n{body}\n</article>'
    main = f'<main id="main" tabindex="-1">\n{body}\n</main>'
    html = f"{head}\n<body>\n{top}\n{main}\n{chrome.footer(data)}\n</body>\n</html>\n"
    if "{{" in html:
        sys.exit(f"{meta['path']}: unresolved placeholder {re.search(r'{{[A-Z_]+}}', html).group(0)}")
    return html


def service_worker(js_name: str) -> str:
    """sw.js prefixed with its precache list and a version that changes with any precached byte."""
    precache = [*SW_SHELL, f"/js/{js_name}"]
    template = read(SRC / "sw.js")
    digest = hashlib.sha3_256(template.encode())
    for url in precache:
        file = out_path(url) if url.endswith("/") else SITE / url.lstrip("/")
        digest.update(url.encode() + b"\n" + file.read_bytes())
    version = digest.hexdigest()[:16]
    return f"const VERSION = {json.dumps(version)};\nconst PRECACHE = {json.dumps(precache)};\n{template}"


def main() -> None:
    data = json.loads(read(SRC / "data" / "site.json"))
    if SITE.exists():
        shutil.rmtree(SITE)
    shutil.copytree(SRC / "static", SITE)

    css = minify_css(read(SRC / "style.css")) + chrome.accent_css(data)
    style_hash = base64.b64encode(hashlib.sha256(css.encode()).digest()).decode()
    js = read(SRC / "main.js")
    js_name = f"main.{hashlib.sha256(js.encode()).hexdigest()[:10]}.js"
    (SITE / "js").mkdir()
    (SITE / "js" / js_name).write_text(js, encoding="utf-8")

    head_t = read(SRC / "partials" / "head.html")
    pages, entries = [], []
    for page in sorted((SRC / "pages").glob("*.html")):
        meta, body = front_matter(read(page), page.name)
        out = out_path(meta["path"])
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(render(data, meta, body, head_t, css, js_name), encoding="utf-8")
        pages.append(meta)
        if meta["layout"] != "error":
            entries.append((data["origin"] + meta["path"], meta["updated"]))
        print(f"wrote {out.relative_to(ROOT)}")
    pages.sort(key=lambda m: (m["path"] != "/", m["path"]))

    (SITE / "sitemap.xml").write_text(crawl.sitemap(entries), encoding="utf-8")
    (SITE / "robots.txt").write_text(crawl.robots(data), encoding="utf-8")
    (SITE / "llms.txt").write_text(crawl.llms(data, pages), encoding="utf-8")
    (SITE / "site.webmanifest").write_text(crawl.manifest(data), encoding="utf-8")
    (SITE / "sw.js").write_text(service_worker(js_name), encoding="utf-8")
    headers = read(SRC / "_headers").replace("{{STYLE_HASH}}", style_hash)
    (SITE / "_headers").write_text(headers, encoding="utf-8")
    print("wrote site/sitemap.xml robots.txt llms.txt site.webmanifest sw.js _headers")


if __name__ == "__main__":
    main()
