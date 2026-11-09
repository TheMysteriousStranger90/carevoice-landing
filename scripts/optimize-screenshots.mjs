#!/usr/bin/env node
/**
 * Converts the PNG screenshots in assets-src/screenshots into responsive WebP files
 * in public/screenshots (800 px and 1600 px wide). All outputs share one aspect ratio,
 * so the <img> width/height attributes in the dev-diary component stay valid.
 *
 *   npm run images
 *
 * Re-shooting a screenshot? Drop the new PNG into assets-src/screenshots (same name)
 * and re-run this script.
 */
import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const srcDir = join(root, 'assets-src', 'screenshots');
const outDir = join(root, 'public', 'screenshots');

// Keep in sync with the width/height attributes in dev-diary.component.ts.
const WIDTHS = [800, 1600];
const ASPECT = 1600 / 726;

await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((f) => f.toLowerCase().endsWith('.png')).sort();
let inBytes = 0;
let outBytes = 0;

for (const file of files) {
  const input = sharp(join(srcDir, file));
  const meta = await input.metadata();
  // Crop (never stretch) to the shared aspect ratio, anchored top-left like the UI frame.
  const cropHeight = Math.min(meta.height, Math.round(meta.width / ASPECT));
  const cropWidth = Math.min(meta.width, Math.round(cropHeight * ASPECT));
  const { name } = parse(file);

  for (const width of WIDTHS) {
    const out = join(outDir, `${name}-${width}.webp`);
    const info = await sharp(join(srcDir, file))
      .extract({ left: 0, top: 0, width: cropWidth, height: cropHeight })
      .resize({ width, height: Math.round(width / ASPECT) })
      .webp({ quality: 80, effort: 5 })
      .toFile(out);
    outBytes += info.size;
  }
  inBytes += meta.size ?? 0;
  console.log(`${file}: ${meta.width}x${meta.height}`);
}

const kb = (n) => `${Math.round(n / 1024)} kB`;
console.log(
  `\n${files.length} screenshots → ${files.length * WIDTHS.length} WebP files (${kb(outBytes)})`
);
