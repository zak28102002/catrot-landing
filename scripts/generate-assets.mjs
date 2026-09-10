/**
 * Renders the raster assets that Next.js serves as the favicon, the Apple touch
 * icon and the Open Graph image, all from public/brand/app-icon.svg so there is
 * a single source of truth for the mark.
 *
 *   npm run assets
 *
 * Requires the Nunito TTFs to be installed on the machine for the Open Graph
 * text to rasterise correctly. The generated files are committed, so this only
 * needs re-running when the icon or the Open Graph layout changes.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const iconSvg = join(root, "public/brand/app-icon.svg");

const CREAM = "#FDF7ED";
const BROWN = "#38271C";
const ORANGE_DEEP = "#F0831A";

async function png(size, out) {
  await sharp(iconSvg, { density: 400 }).resize(size, size).png().toFile(join(root, out));
  console.log(`  ✓ ${out} (${size}×${size})`);
}

/** Minimal single-image .ico container wrapping a PNG payload. */
async function ico(size, out) {
  const payload = await sharp(iconSvg, { density: 400 }).resize(size, size).png().toBuffer();
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size < 256 ? size : 0, 6); // width
  header.writeUInt8(size < 256 ? size : 0, 7); // height
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(payload.length, 14);
  header.writeUInt32LE(22, 18); // offset of payload
  writeFileSync(join(root, out), Buffer.concat([header, payload]));
  console.log(`  ✓ ${out} (${size}×${size})`);
}

async function openGraph(out) {
  const icon = await sharp(iconSvg, { density: 400 }).resize(300, 300).png().toBuffer();
  const canvas = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="${CREAM}"/>
    <g fill="#A3DCC0">
      <circle cx="1104" cy="118" r="9"/><circle cx="1148" cy="168" r="5"/>
      <circle cx="72" cy="514" r="7"/>
    </g>
    <text x="556" y="286" font-family="Nunito" font-weight="900" font-size="112" letter-spacing="4" fill="${BROWN}">CATROT</text>
    <text x="560" y="360" font-family="Nunito" font-weight="800" font-size="46" fill="${ORANGE_DEEP}">Less scroll. More life.</text>
    <rect x="562" y="404" width="92" height="6" rx="3" fill="#FFD3B0"/>
    <text x="560" y="470" font-family="Nunito" font-weight="600" font-size="30" fill="#8A7365">Take back your screen time —</text>
    <text x="560" y="512" font-family="Nunito" font-weight="600" font-size="30" fill="#8A7365">and keep your cat happy.</text>
  </svg>`);

  await sharp(canvas)
    .composite([{ input: icon, top: 165, left: 176 }])
    .png()
    .toFile(join(root, out));
  console.log(`  ✓ ${out} (1200×630)`);
}

console.log("Generating CATROT assets from public/brand/app-icon.svg");
readFileSync(iconSvg); // fail loudly if the source mark is missing
await png(256, "src/app/icon.png");
await png(180, "src/app/apple-icon.png");
await ico(32, "src/app/favicon.ico");
await openGraph("src/app/opengraph-image.png");
console.log("Done.");
