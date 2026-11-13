#!/usr/bin/env python3
"""Generate site/ from src/. No dependencies beyond the Python standard library.

src/pages/*.html carry a small front-matter block (title, description, path, layout) and the
page body. Shared pieces (head, nav, links, CSS, JS) live once in src/ and are stamped into
every page, so the output is plain static HTML with inline CSS and one deferred script.
Run:  python3 tools/build.py
"""
import base64
import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
SITE = ROOT / "site"
ORIGIN = "https://avarok.net"

CLOSE_ICON = ('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/>'
              '<path d="m6 6 12 12"/></svg>')


def read(p: pathlib.Path) -> str:
    return p.read_text(encoding="utf-8")


def one(pattern: str) -> str:
    hits = sorted((SITE / "img").glob(pattern))
    if len(hits) != 1:
        sys.exit(f"expected exactly one site/img/{pattern}, found {[h.name for h in hits]}")
    return hits[0].name


def minify_css(css: str) -> str:
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"\s*\n\s*", "", css)
    return css.strip()


def front_matter(text: str, name: str) -> tuple[dict, str]:
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    if not m:
        sys.exit(f"{name}: missing front matter")
    meta = dict(line.split(": ", 1) for line in m.group(1).splitlines())
    for key in ("title", "description", "path", "layout"):
        if key not in meta:
            sys.exit(f"{name}: front matter lacks '{key}'")
    return meta, text[m.end():]


def main() -> None:
    images = {
        "HERO_SM": one("hero-sm.*.webp"),
        "HERO_MD": one("hero-1280.*.webp"),
        "HERO_LG": one("hero-1920.*.webp"),
        "LOGO": one("logo-160.*.webp"),
    }

    css = minify_css(read(SRC / "style.css"))
    for k, v in images.items():
        css = css.replace("{{" + k + "}}", v)
    if "{{" in css:
        sys.exit("unresolved placeholder in style.css")
    style_hash = base64.b64encode(hashlib.sha256(css.encode()).digest()).decode()

    js = read(SRC / "main.js")
    js_name = f"main.{hashlib.sha256(js.encode()).hexdigest()[:10]}.js"
    (SITE / "js").mkdir(parents=True, exist_ok=True)
    for old in (SITE / "js").glob("main.*.js"):
        old.unlink()
    (SITE / "js" / js_name).write_text(js, encoding="utf-8")

    head_t = read(SRC / "partials" / "head.html")
    links = read(SRC / "partials" / "links.html").strip()
    nav = (read(SRC / "partials" / "nav.html").strip()
           .replace("{{LINKS}}", links).replace("{{LOGO}}", images["LOGO"]))

    hero_preload = (
        f'<link rel="preload" as="image" href="/img/{images["HERO_SM"]}" media="(max-width:640px)" fetchpriority="high">\n'
        f'<link rel="preload" as="image" href="/img/{images["HERO_MD"]}" media="(min-width:641px) and (max-width:1280px)" fetchpriority="high">\n'
        f'<link rel="preload" as="image" href="/img/{images["HERO_LG"]}" media="(min-width:1281px)" fetchpriority="high">\n'
    )

    sitemap = []
    for page in sorted((SRC / "pages").glob("*.html")):
        meta, body = front_matter(read(page), page.name)
        path, layout = meta["path"], meta["layout"]
        canonical = ORIGIN + path
        head = (head_t.replace("{{TITLE}}", meta["title"])
                .replace("{{DESCRIPTION}}", meta["description"])
                .replace("{{ORIGIN}}", ORIGIN)
                .replace("{{STYLE}}", css)
                .replace("{{SCRIPT}}", js_name)
                .replace("{{PRELOAD}}", hero_preload if layout == "home" else ""))
        if layout == "bare":
            head = re.sub(r'<link rel="canonical"[^>]*>\n|<meta property="og:url"[^>]*>\n', "", head)
        head = head.replace("{{CANONICAL}}", canonical)

        if layout == "home":
            content = f"{nav}\n{body.strip()}"
        elif layout == "legal":
            content = (f'{nav}\n<main class="legal-page">\n<article class="doc">\n'
                       f'<a class="close" href="/" aria-label="Close and return to the home page">{CLOSE_ICON}</a>\n'
                       f"{body.strip()}\n</article>\n</main>")
        elif layout == "bare":
            content = body.strip()
        else:
            sys.exit(f"{page.name}: unknown layout {layout}")

        html = f"{head}<body>\n{content}\n</body>\n</html>\n"
        if "{{" in html:
            sys.exit(f"{page.name}: unresolved placeholder")
        if path == "/":
            out = SITE / "index.html"
        elif path.endswith(".html"):
            out = SITE / path.lstrip("/")
        else:
            out = SITE / path.strip("/") / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(html, encoding="utf-8")
        if layout != "bare":
            sitemap.append(canonical)
        print(f"wrote {out.relative_to(ROOT)}")

    urls = "".join(f"  <url><loc>{u}</loc></url>\n" for u in sorted(sitemap))
    (SITE / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}</urlset>\n", encoding="utf-8")
    (SITE / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\n\nSitemap: {ORIGIN}/sitemap.xml\n", encoding="utf-8")

    headers = read(SRC / "_headers").replace("{{STYLE_HASH}}", style_hash)
    (SITE / "_headers").write_text(headers, encoding="utf-8")
    print("wrote site/sitemap.xml site/robots.txt site/_headers")


if __name__ == "__main__":
    main()
