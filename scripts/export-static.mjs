/**
 * Statik dışa aktarım.
 *
 * vinext'te export komutu yok; site normalde Cloudflare Worker'ında sunucu
 * tarafında render ediliyor. GitHub Pages ise yalnızca dosya sunar. Bu betik
 * derlenmiş worker'ı doğrudan çağırıp her rotanın HTML'ini diske yazar,
 * ardından statik dosyaları yanına kopyalar.
 *
 * Kullanım:  node scripts/export-static.mjs [--base /depo-adi]
 */

import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const outDir = join(root, "out");

const baseArgIndex = process.argv.indexOf("--base");
const rawBase = baseArgIndex === -1 ? "" : process.argv[baseArgIndex + 1] ?? "";
const base = rawBase.replace(/\/+$/, ""); // "/depo-adi" veya ""

const { pages } = await import(new URL("../app/content.ts", import.meta.url).href);
const routes = ["/", "/yonetim", ...pages.map((page) => `/${page.slug}`)];

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
const { default: worker } = await import(workerUrl.href);

async function render(route) {
  const response = await worker.fetch(
    new Request(`https://dortbolukkoyu.org${route}`, {
      headers: { accept: "text/html", host: "dortbolukkoyu.org" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (response.status !== 200) {
    throw new Error(`${route} → HTTP ${response.status}`);
  }

  return response.text();
}

/** Kök yolları depo alt dizinine kaydır: /assets/x → /depo-adi/assets/x */
function applyBase(html) {
  if (!base) return html;

  return html
    .replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`)
    .replace(/url\(\/(?!\/)/g, `url(${base}/`);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

/**
 * next/link önce RSC yükünü ister (/mezralar.rsc?_rsc=...). Bu dosyaları da
 * yazmazsak her tıklama önce 404 alıp tam sayfa yüklemesine düşer. Statik
 * sunucular sorgu dizesini yok saydığı için ".rsc" dosyası doğrudan eşleşir.
 */
async function renderRsc(route) {
  const path = route === "/" ? "/.rsc" : `${route}.rsc`;
  const response = await worker.fetch(
    new Request(`https://dortbolukkoyu.org${path}?_rsc`, {
      headers: { host: "dortbolukkoyu.org" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (response.status !== 200) {
    throw new Error(`${path} → HTTP ${response.status}`);
  }

  return { path, body: await response.text() };
}

let written = 0;
for (const route of routes) {
  const html = applyBase(await render(route));
  const target =
    route === "/" ? join(outDir, "index.html") : join(outDir, route, "index.html");

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");

  const rsc = await renderRsc(route);
  const rscTarget = join(outDir, rsc.path);
  await mkdir(dirname(rscTarget), { recursive: true });
  await writeFile(rscTarget, applyBase(rsc.body), "utf8");

  written++;
}

// Statik varlıklar (public/ + derlenmiş js/css) worker çıktısının yanında duruyor
await cp(join(root, "dist", "client"), outDir, { recursive: true });

// CSS içindeki kök yolları da kaydır
if (base) {
  const cssDir = join(outDir, "assets");
  for (const name of await readdir(cssDir)) {
    if (!name.endsWith(".css")) continue;
    const file = join(cssDir, name);
    await writeFile(file, applyBase(await readFile(file, "utf8")), "utf8");
  }
}

// Jekyll'in _ ile başlayan dizinleri yok saymasını engelle
await writeFile(join(outDir, ".nojekyll"), "", "utf8");

// Bilinmeyen adresler için: GitHub Pages 404.html'i otomatik kullanır
await writeFile(
  join(outDir, "404.html"),
  applyBase(await render("/")).replace(
    "<title>",
    "<title>Sayfa bulunamadı — ",
  ),
  "utf8",
);

/**
 * Eski sitenin adresleri.
 *
 * Site aynı taban adreste yayınlandığı için, elinde eski bir link, yer imi ya
 * da paylaşılmış bir adres kalan herkes 404 alıyordu. GitHub Pages sunucu
 * tarafında yönlendirme yapamaz; bu yüzden her eski adrese meta refresh + JS
 * yönlendirmesi taşıyan küçük bir sayfa yazıyoruz. Tarayıcısı ikisini de
 * çalıştırmayan biri için görünür bir bağlantı da bırakılıyor.
 *
 * index.html bilerek listede yok: ana sayfanın kendisi orada duruyor.
 */
const legacyRedirects = {
  "dernegimiz.html": "/hakkimizda/tarihce",
  "koyumuz.html": "/koyumuz/tarih",
  "faaliyetlerimiz.html": "/faaliyetler",
  "duyurular.html": "/haberler",
  "iletisim.html": "/iletisim",
  "canli.html": "/canli/koy",
  "uye-ol.html": "/hakkimizda/uyelik",
  "vefat-taziye.html": "/faaliyetler/taziye",
  "admin.html": "/",
};

for (const [from, to] of Object.entries(legacyRedirects)) {
  const target = `${base}${to}`;
  await writeFile(
    join(outDir, from),
    `<!doctype html>
<html lang="tr">
<meta charset="utf-8">
<title>Sayfa taşındı — Elazığ Dörtbölük Köyü Derneği</title>
<link rel="canonical" href="${target}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)})</script>
<p>Bu sayfa taşındı. <a href="${target}">Yeni adrese gidin</a>.</p>
`,
    "utf8",
  );
}

async function dirSize(dir) {
  let total = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    total += entry.isDirectory() ? await dirSize(full) : (await stat(full)).size;
  }
  return total;
}

console.log(`${written} sayfa yazıldı → ${relative(root, outDir)}/`);
console.log(`Taban yol: ${base || "/"}`);
console.log(`Toplam boyut: ${(await dirSize(outDir) / 1048576).toFixed(0)} MB`);
