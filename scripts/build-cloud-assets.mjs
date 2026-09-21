/**
 * The supplied cloud artwork arrived as JPEGs with the transparency
 * checkerboard baked in, so there is no alpha channel to work with. The clouds
 * are white on a near-black ground, which makes luminance a faithful stand-in
 * for opacity: map it onto the alpha channel, force every pixel to white, and
 * the checkerboard falls away with it.
 *
 *   node scripts/build-cloud-assets.mjs
 *
 * Reads  assets/clouds/*-source.jpg   (kept out of public/ — never shipped)
 * Writes public/bg/cloud-0N.png       (white cloud, real alpha)
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "assets/clouds";
const OUT_DIR = "public/bg";

/** Luminance below this is checkerboard, above it is cloud. */
const BLACK_POINT = 50;
/**
 * Luminance at or above this is fully opaque. Well below the artwork's peak
 * (246) on purpose: it drives the cloud body to solid white and keeps the soft
 * falloff for the wisps alone, so the mist reads dense rather than washed out.
 */
const WHITE_POINT = 150;
/** Alpha at or below this counts as empty when cropping. */
const VISIBLE_ALPHA = 3;
/** Plenty for a full-bleed strip once it is stretched across the viewport. */
const OUT_WIDTH = 2400;

async function convert(sourceFile) {
  const name = path.basename(sourceFile).replace("-source.jpg", ".png");
  const { data, info } = await sharp(sourceFile)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const rgba = Buffer.alloc(width * height * 4);
  const span = WHITE_POINT - BLACK_POINT;

  for (let i = 0, o = 0; i < data.length; i += channels, o += 4) {
    const luminance =
      0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const alpha = Math.round(
      Math.min(1, Math.max(0, (luminance - BLACK_POINT) / span)) * 255,
    );

    rgba[o] = 255;
    rgba[o + 1] = 255;
    rgba[o + 2] = 255;
    rgba[o + 3] = alpha;
  }

  // sharp's own trim() measures colour, not alpha, so find the box ourselves.
  let top = height;
  let left = width;
  let right = -1;
  let bottom = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (rgba[(y * width + x) * 4 + 3] <= VISIBLE_ALPHA) continue;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
      if (x < left) left = x;
      if (x > right) right = x;
    }
  }

  if (right < left || bottom < top) {
    throw new Error(`${sourceFile} has no visible pixels above the black point`);
  }

  const outFile = path.join(OUT_DIR, name);
  const result = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract({
      left,
      top,
      width: right - left + 1,
      height: bottom - top + 1,
    })
    .resize({ width: OUT_WIDTH, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: false })
    .toFile(outFile);

  console.log(
    `${outFile} — ${result.width}x${result.height}, ${(result.size / 1024).toFixed(0)} KB`,
  );
}

await mkdir(OUT_DIR, { recursive: true });
const sources = (await readdir(SOURCE_DIR))
  .filter((file) => file.endsWith("-source.jpg"))
  .sort();

for (const file of sources) {
  await convert(path.join(SOURCE_DIR, file));
}
