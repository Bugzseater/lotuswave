/**
 * Derives the transparent logo assets the UI uses from the supplied artwork.
 *
 *   public/logo/logo.jpg  →  public/logo/mark-light.png
 *                            public/logo/mark-brand.png
 *                            public/logo/logo-light.png
 *
 * The supplied file is a JPEG: white line art baked onto a flat brand-purple
 * field, stacked mark-over-wordmark and square. None of that suits a 72px
 * header, so this script lifts the line art off the purple — the artwork's
 * luminance becomes the alpha channel — and re-tints it. That gives a mark that
 * can be white over the hero and brand purple on a white header, from one
 * source of truth.
 *
 * Re-run after replacing the artwork:  node scripts/build-logo-assets.mjs
 *
 * If a vector original ever turns up, prefer it: drop an SVG at
 * public/logo/mark.svg, point `src/components/layout/logo.tsx` at it, and this
 * script can go.
 */

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "public/logo/logo.jpg");
const OUT = path.join(ROOT, "public/logo");

/** Measured from the artwork by scanning for bright pixels. */
const REGIONS = {
  /** Sri Lanka outline, lotus and wave. */
  mark: { left: 537, top: 283, width: 873, height: 1165 },
  /** Mark plus the two-line wordmark beneath it. */
  full: { left: 537, top: 283, width: 873, height: 1450 },
};

/**
 * Luminance → alpha. The purple field sits at ~73 and the strokes at ~255, so
 * the floor clears the field and its JPEG ringing while the ceiling keeps the
 * anti-aliased stroke edges soft.
 */
const ALPHA_FLOOR = 100;
const ALPHA_CEILING = 245;

/** Transparent breathing room, so no stroke lands flush against the edge. */
const PAD = 10;

const TINTS = {
  light: [255, 255, 255],
  /** --color-brand. Kept literal here for the same reason the SVG is: this
      runs outside the stylesheet and cannot read a CSS variable. */
  brand: [0x65, 0x2d, 0x90],
};

async function render({ region, tint, height, file }) {
  const { data, info } = await sharp(SRC)
    .extract(region)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const [r, g, b] = TINTS[tint];
  const span = ALPHA_CEILING - ALPHA_FLOOR;
  const rgba = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0; i < data.length; i++) {
    const alpha = Math.round(((data[i] - ALPHA_FLOOR) / span) * 255);
    const out = i * 4;
    rgba[out] = r;
    rgba[out + 1] = g;
    rgba[out + 2] = b;
    rgba[out + 3] = Math.min(255, Math.max(0, alpha));
  }

  const target = path.join(OUT, file);

  await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extend({
      top: PAD,
      bottom: PAD,
      left: PAD,
      right: PAD,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize({ height, fit: "contain" })
    .png({ compressionLevel: 9, palette: false })
    .toFile(target);

  const meta = await sharp(target).metadata();
  console.log(`${file.padEnd(18)} ${meta.width}x${meta.height}`);
}

await mkdir(OUT, { recursive: true });

await render({
  region: REGIONS.mark,
  tint: "light",
  height: 288,
  file: "mark-light.png",
});
await render({
  region: REGIONS.mark,
  tint: "brand",
  height: 288,
  file: "mark-brand.png",
});
await render({
  region: REGIONS.full,
  tint: "light",
  height: 512,
  file: "logo-light.png",
});
