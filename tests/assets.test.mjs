import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import { pages } from "../app/content.ts";

/**
 * Sunucu, derlemede basePath verilmişse rotaları taban yolun altında karşılar.
 * Testler yayındaki derlemeyi denediği için aynı öneki kullanmalı.
 *
 * Sayfadan toplanan bağlantılar öneki zaten taşıyor; bu yüzden ekleme
 * tekrarlanabilir olmalı, yoksa taban yol iki kez yazılır.
 */
const BASE = process.env.BASE_PATH ?? "";
const withBase = (path) =>
  BASE && path.startsWith(`${BASE}/`) ? path : `${BASE}${path}`;


/**
 * Render edilen HTML'deki her görsel/video dosyası public/ altında gerçekten
 * var olmalı. Kaynak kodda düz metin arayan bir denetim yetmez: galeri yolları
 * mezraPhotos() ile üretiliyor, yani ancak sayfa render edildiğinde ortaya
 * çıkıyor. Bu test tam da o üretilmiş yolları yakalar.
 */

let workerPromise;

function getWorker() {
  if (!workerPromise) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    workerPromise = import(workerUrl.href).then((mod) => mod.default);
  }

  return workerPromise;
}

async function html(path) {
  const worker = await getWorker();
  const response = await worker.fetch(
    new Request(`http://localhost${withBase(path)}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200, `${path} → HTTP ${response.status}`);

  return response.text();
}

/**
 * Sayfadaki yollar yayın taban yolunu taşıyor (/dortboluk-koyu-dernegi/…);
 * dosya ise public/ altında öneksiz duruyor. Diskte ararken öneki düşürüyoruz.
 */
const stripBase = (path) =>
  BASE && path.startsWith(`${BASE}/`) ? path.slice(BASE.length) : path;

const exists = async (publicPath) => {
  try {
    await access(
      new URL(`../public${decodeURI(stripBase(publicPath))}`, import.meta.url),
    );
    return true;
  } catch {
    return false;
  }
};

test("hiçbir görsel veya video kırık değil", async () => {
  const routes = ["/", "/yonetim", ...pages.map((page) => `/${page.slug}`)];
  const missing = [];
  const seen = new Set();

  for (const route of routes) {
    const body = await html(route);

    const sources = [
      ...[...body.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]),
      ...[...body.matchAll(/<source[^>]+src="([^"]+)"/g)].map((m) => m[1]),
      ...[...body.matchAll(/poster="([^"]+)"/g)].map((m) => m[1]),
    ];

    for (const src of sources) {
      if (!src.startsWith("/")) continue;
      const key = `${route}|${src}`;
      if (seen.has(key)) continue;
      seen.add(key);

      if (!(await exists(src))) missing.push({ route, src });
    }
  }

  assert.deepEqual(
    missing,
    [],
    `Kırık görsel/video bulundu:\n${missing.map((m) => `  ${m.route} → ${m.src}`).join("\n")}`,
  );

  assert.ok(seen.size > 100, `Beklenenden az görsel denetlendi: ${seen.size}`);
});

test("dosya adlarında URL'de sorun çıkaracak karakter yok", async () => {
  const routes = ["/", "/yonetim", ...pages.map((page) => `/${page.slug}`)];
  const kotu = [];

  for (const route of routes) {
    const body = await html(route);
    const sources = [
      ...[...body.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]),
      ...[...body.matchAll(/<source[^>]+src="([^"]+)"/g)].map((m) => m[1]),
    ];

    for (const src of sources) {
      if (!src.startsWith("/assets/")) continue;
      // boşluk, parantez veya ASCII dışı karakter → kırılgan URL
      if (/[\s()]|[^\x20-\x7E]/.test(src)) kotu.push({ route, src });
    }
  }

  assert.deepEqual(kotu, [], `Sorunlu dosya adı:\n${kotu.map((k) => `  ${k.src}`).join("\n")}`);
});
