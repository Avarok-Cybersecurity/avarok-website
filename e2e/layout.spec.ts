import { expect, test } from '@playwright/test';
import { sitemapPaths } from './support';

// No page scrolls sideways on a phone (WCAG 1.4.10): measured, not eyeballed.
for (const width of [390, 320]) {
  test(`no page overflows horizontally at ${width} px, in light or dark`, async ({ browser, request }) => {
    const paths = [...sitemapPaths(await (await request.get('/sitemap.xml')).text()), '/offline/', '/nope/'];
    const wide: string[] = [];
    for (const colorScheme of ['light', 'dark'] as const) {
      const page = await browser.newPage({ viewport: { width, height: 800 }, colorScheme });
      for (const p of paths) {
        await page.goto(p);
        // scrollWidth alone misses it: body{overflow-x:hidden} clips the box, yet the viewport
        // can still be panned. Try to scroll right and see whether the page moved.
        const over = await page.evaluate(() => {
          window.scrollTo(10_000, 0);
          const moved = window.scrollX;
          window.scrollTo(0, 0);
          return Math.max(moved, document.documentElement.scrollWidth - document.documentElement.clientWidth);
        });
        if (over > 0) wide.push(`${p} (${colorScheme}): ${over}px`);
      }
      await page.close();
    }
    expect(wide).toEqual([]);
  });
}
