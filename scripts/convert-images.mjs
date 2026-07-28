/**
 * public/assets altındaki PNG fotoğrafları WebP'ye çevirir ve kodda geçen
 * yolları günceller.
 *
 * PNG kayıpsız bir biçim; fotoğraf için yanlış seçim. Aynı görsel WebP olarak
 * gözle ayırt edilemeyecek kalitede ve yaklaşık onda bir boyutta saklanır.
 *
 * public kökündeki og-*.png ve logo-kucuk.png dışarıda bırakılır: paylaşım
 * kartlarını okuyan botların bir kısmı WebP desteklemiyor.
 */

import { readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/**
 * sharp projeye dolaylı bağımlılık olarak geldiği için pnpm onu kök
 * node_modules'e bağlamıyor; doğrudan depodan çözülüyor. Bulunamazsa
 * kurulum bilgisi verip çıkıyoruz.
 */
function loadSharp() {
  for (const id of [
    "sharp",
    "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js",
  ]) {
    try {
      return require(id);
    } catch {}
  }

  console.error("sharp bulunamadı. Kurmak için: pnpm add -D sharp");
  process.exit(1);
}

const sharp = loadSharp();

const root = fileURLToPath(new URL("..", import.meta.url));
const assetsDir = join(root, "public", "assets");
const codeDirs = [join(root, "app"), join(root, "scripts")];

const QUALITY = 82;
/** Haritada ince çizgi ve yazı var; ona daha yüksek kalite verilir. */
const HIGH_QUALITY = new Set(["harita.png"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const pngs = [];
for await (const file of walk(assetsDir)) {
  if (extname(file).toLowerCase() === ".png") pngs.push(file);
}

console.log(`${pngs.length} PNG bulundu, dönüştürülüyor...\n`);

let before = 0;
let after = 0;
const renames = [];

for (const png of pngs) {
  const webp = png.replace(/\.png$/i, ".webp");
  const quality = HIGH_QUALITY.has(png.split(/[\\/]/).pop()) ? 92 : QUALITY;

  const originalSize = (await stat(png)).size;
  await sharp(png).webp({ quality, effort: 6 }).toFile(webp);
  const newSize = (await stat(webp)).size;

  before += originalSize;
  after += newSize;

  await rm(png);
  renames.push([
    "/" + relative(join(root, "public"), png).replace(/\\/g, "/"),
    "/" + relative(join(root, "public"), webp).replace(/\\/g, "/"),
  ]);

  const pct = Math.round((1 - newSize / originalSize) * 100);
  console.log(
    `  ${relative(assetsDir, png).replace(/\\/g, "/")}  ` +
      `${(originalSize / 1048576).toFixed(2)} → ${(newSize / 1048576).toFixed(2)} MB  (-%${pct})`,
  );
}

// Kod içindeki yolları güncelle
let touched = 0;
for (const dir of codeDirs) {
  for await (const file of walk(dir)) {
    if (![".ts", ".tsx", ".mjs", ".css"].includes(extname(file))) continue;

    const original = await readFile(file, "utf8");
    let updated = original;
    for (const [from, to] of renames) updated = updated.split(from).join(to);

    // mezraPhotos("cellatlar", ..., "png") çağrılarındaki uzantı da değişmeli
    updated = updated.replace(/"cellatlar", \[([^\]]+)\], "png"/g, '"cellatlar", [$1], "webp"');

    if (updated !== original) {
      await writeFile(file, updated, "utf8");
      touched++;
    }
  }
}

console.log(
  `\nToplam: ${(before / 1048576).toFixed(0)} MB → ${(after / 1048576).toFixed(0)} MB  ` +
    `(-%${Math.round((1 - after / before) * 100)})`,
);
console.log(`${touched} kaynak dosyada yol güncellendi.`);
