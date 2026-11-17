#!/usr/bin/env python3
"""Derive avarok.net's identity set from one mark geometry and src/data/site.json.

Writes into src/static/ (committed; tools/build.py copies it into site/):
  favicon.svg, logo.svg, favicon.ico (16/32/48), apple-touch-icon.png (180),
  icon-192.png, icon-512.png, icon-maskable-512.png, og-image.png (1200x630).

The mark itself lives in tools/sitegen/mark.py (shared with the header).
Rasterising needs `rsvg-convert` (librsvg) and Pillow; the og-image
text is set in Inter (OFL, tools/brand/fonts). Run: python3 tools/brand.py
"""
import io
import json
import pathlib
import shutil
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from sitegen.mark import logo_svg, maskable_svg, tile_svg  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "static"
FONTS = ROOT / "tools" / "brand" / "fonts"
DATA = json.loads((ROOT / "src" / "data" / "site.json").read_text(encoding="utf-8"))
BRAND = DATA["brand"]

def raster(svg: str, size: int) -> Image.Image:
    exe = shutil.which("rsvg-convert")
    if exe is None:
        sys.exit("rsvg-convert (librsvg) is required to rasterise the mark")
    png = subprocess.run([exe, "-w", str(size), "-h", str(size), "-f", "png"],
                         input=svg.encode(), capture_output=True, check=True).stdout
    return Image.open(io.BytesIO(png)).convert("RGBA")


def save_png(img: Image.Image, name: str) -> None:
    img.save(OUT / name, format="PNG", optimize=True)


def hex_rgb(h: str) -> tuple[int, int, int]:
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))  # type: ignore[return-value]


def og_image() -> Image.Image:
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), hex_rgb(BRAND["pageDark"]))
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for i in range(40, 0, -1):
        a = int(5 * (41 - i) / 4)
        gd.ellipse((900 - i * 14, -260 - i * 6, 900 + i * 14, 140 + i * 6), fill=(*hex_rgb(BRAND["primary"]), a))
    img.paste(glow, (0, 0), glow)
    tile = raster(tile_svg(BRAND, 32), 168)
    img.paste(tile, (88, 96), tile)
    bold = ImageFont.truetype(str(FONTS / "Inter-Bold.ttf"), 76)
    reg = ImageFont.truetype(str(FONTS / "Inter-Regular.ttf"), 34)
    small = ImageFont.truetype(str(FONTS / "Inter-Bold.ttf"), 24)
    d = ImageDraw.Draw(img)
    d.text((88, 300), DATA["organization"]["name"], font=bold, fill=hex_rgb(BRAND["inkDark"]))
    d.text((88, 398), BRAND["tagline"] + ", built in Rust.", font=reg, fill=(214, 209, 232))
    names = [p["name"] for p in DATA["products"]]
    half = (len(names) + 1) // 2
    for row, chunk in enumerate((names[:half], names[half:])):
        d.text((88, 500 + row * 40), "  ·  ".join(chunk), font=small, fill=hex_rgb(BRAND["primaryDark"]))
    d.rectangle((88, 470, 168, 474), fill=hex_rgb(BRAND["green"]))
    return img


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "favicon.svg").write_text(tile_svg(BRAND, 32) + "\n", encoding="utf-8")
    (OUT / "logo.svg").write_text(logo_svg(BRAND) + "\n", encoding="utf-8")
    base = raster(tile_svg(BRAND, 32), 256)
    base.save(OUT / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    flat = Image.new("RGBA", (180, 180), hex_rgb(BRAND["primary"]) + (255,))
    flat.alpha_composite(raster(maskable_svg(BRAND), 180))
    save_png(flat.convert("RGB"), "apple-touch-icon.png")
    save_png(raster(tile_svg(BRAND, 32), 192), "icon-192.png")
    save_png(raster(tile_svg(BRAND, 32), 512), "icon-512.png")
    save_png(raster(maskable_svg(BRAND), 512), "icon-maskable-512.png")
    save_png(og_image(), "og-image.png")
    print("wrote", ", ".join(sorted(p.name for p in OUT.iterdir())))


if __name__ == "__main__":
    main()
