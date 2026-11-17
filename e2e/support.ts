import { readFileSync } from 'node:fs';

export const DATA = JSON.parse(readFileSync(new URL('../src/data/site.json', import.meta.url), 'utf8'));

/** Width and height from a PNG's IHDR chunk; throws unless the bytes are a PNG. */
export function pngSize(buf: Buffer): { width: number; height: number } {
  if (buf.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('not a PNG');
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/** The square sizes in an .ico; throws unless the bytes are an icon directory. */
export function icoSizes(buf: Buffer): number[] {
  if (buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1) throw new Error('not an ICO');
  return Array.from({ length: buf.readUInt16LE(4) }, (_, i) => buf[6 + i * 16] || 256);
}

/** The pages to crawl: every sitemap URL rewritten onto the base under test, plus the 404 page. */
export function sitemapPaths(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}
