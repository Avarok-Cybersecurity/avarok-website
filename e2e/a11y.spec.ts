import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { sitemapPaths } from './support';

// axe-core (WCAG 2.2 AA tags) on every page, at phone and desktop widths, in light and dark,
// under the site's real CSP: zero serious or critical violations.
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

for (const [width, height] of [[390, 844], [1280, 900]] as const) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`axe finds nothing serious at ${width} px, ${colorScheme}`, async ({ browser, request }) => {
      test.setTimeout(120_000);
      const paths = [...sitemapPaths(await (await request.get('/sitemap.xml')).text()), '/offline/', '/nope/'];
      const context = await browser.newContext({ viewport: { width, height }, colorScheme, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const found: string[] = [];
      for (const p of paths) {
        await page.goto(p);
        const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
        for (const v of violations.filter((x) => x.impact === 'serious' || x.impact === 'critical')) {
          found.push(`${p}: ${v.id} (${v.impact}) ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
        }
      }
      await context.close();
      expect(found).toEqual([]);
    });
  }
}
