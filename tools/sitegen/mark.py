"""The Avarok mark as SVG strings: the "A" whose apex rises into an arrow, on the family's tile.

The one source for every rendering of the mark: the header (inline), favicon.svg, logo.svg and
the rasters tools/brand.py derives from them. Pure: a brand dict in, a string out.
"""

# The glyph in a 32-unit box: two legs, a crossbar, and the arrow leaving the apex up and right.
GLYPH = ("M9.5 25 16 8.2 22.5 25 M11.6 19.6H20.4 M16 8.2 21 3.6", "M17.6 3.2H21.4V7")

# AVAROK in strokes, each letter in a 14x20 cell, 6 units apart, so no SVG needs a font.
WORDMARK = ("M0 20 7 0 14 20M2.6 13H11.4"
            "M20 0 27 20 34 0"
            "M40 20 47 0 54 20M42.6 13H51.4"
            "M60 20V0H67a5.5 5.5 0 0 1 0 11H60M66 11 73 20"
            "M86 0a7 10 0 1 0 .01 0"
            "M100 0V20M113 0 100.5 12.5M105 8.2 113 20")


def glyph(stroke: str, width: float) -> str:
    return "".join(f'<path d="{d}" fill="none" stroke="{stroke}" stroke-width="{width}" '
                   'stroke-linecap="round" stroke-linejoin="round"/>' for d in GLYPH)


def tile_body(brand: dict) -> str:
    return (f'<rect width="32" height="32" rx="7" fill="{brand["primary"]}"/>'
            '<rect x=".5" y=".5" width="31" height="31" rx="6.5" fill="none" stroke="#fff" stroke-opacity=".16"/>'
            f'<g transform="translate(0 .9)">{glyph("#fff", 2.2)}</g>')


def tile_svg(brand: dict, size: int) -> str:
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="{size}" height="{size}">'
            f'{tile_body(brand)}</svg>')


def inline_tile(brand: dict, size: int) -> str:
    """For use inside HTML: decorative, because the brand name is always beside it as text."""
    return (f'<svg viewBox="0 0 32 32" width="{size}" height="{size}" aria-hidden="true" focusable="false">'
            f'{tile_body(brand)}</svg>')


def maskable_svg(brand: dict) -> str:
    # Full bleed; the glyph sits inside the central 60% so every platform mask keeps it whole.
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
            f'<rect width="32" height="32" fill="{brand["primary"]}"/>'
            f'<g transform="translate(16 16) scale(.62) translate(-16 -14.2)">{glyph("#fff", 2.4)}</g></svg>')


def logo_svg(brand: dict) -> str:
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 252 64" width="252" height="64" '
            'role="img" aria-label="Avarok">'
            f'<style>.w{{stroke:{brand["ink"]}}}@media (prefers-color-scheme:dark){{.w{{stroke:{brand["inkDark"]}}}}}</style>'
            f'<g transform="scale(2)">{tile_body(brand)}</g>'
            f'<path class="w" transform="translate(84 18) scale(1.4)" d="{WORDMARK}" fill="none" '
            'stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>')
