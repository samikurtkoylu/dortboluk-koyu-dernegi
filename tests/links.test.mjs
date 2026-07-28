import assert from "node:assert/strict";
import test from "node:test";

/**
 * Sitedeki hiçbir bağlantı boşa düşmemeli.
 * Ana sayfadan başlayarak iç bağlantıları gezer, her birinin 200 döndüğünü
 * ve hedefte gerçek içerik olduğunu doğrular. Çapalı bağlantılarda (#...)
 * hedef kimliğin sayfada gerçekten bulunduğunu da kontrol eder.
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

async function fetchPath(path) {
  const worker = await getWorker();

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const hrefsIn = (html) =>
  [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

const idsIn = (html) => new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));

test("hiçbir bağlantı boşta kalmıyor", async () => {
  const visited = new Map(); // path -> html
  const queue = ["/"];
  /** @type {Array<{from: string, href: string, reason: string}>} */
  const broken = [];
  // Çapa kontrolü için: hangi sayfada hangi çapa aranacak
  const anchorChecks = [];

  while (queue.length > 0) {
    const path = queue.shift();
    if (visited.has(path)) continue;

    const response = await fetchPath(path);
    if (response.status !== 200) {
      broken.push({ from: "(gezinme)", href: path, reason: `HTTP ${response.status}` });
      visited.set(path, "");
      continue;
    }

    const html = await response.text();
    visited.set(path, html);

    for (const href of hrefsIn(html)) {
      // Dış bağlantılar, statik dosyalar ve derleme çıktıları kapsam dışı
      if (!href.startsWith("/")) continue;
      if (/\.(png|jpe?g|svg|webp|woff2?|ico|pdf|css|m?js)$/i.test(href)) continue;
      if (href.startsWith("/assets/")) continue;

      const [target, hash] = href.split("#");
      const normalized = target === "" ? path : target;

      if (hash) {
        anchorChecks.push({ from: path, path: normalized, hash, href });
      }

      if (!visited.has(normalized) && !queue.includes(normalized)) {
        queue.push(normalized);
      }
    }
  }

  // Çapaların hedef sayfada gerçekten var olduğunu doğrula
  for (const check of anchorChecks) {
    const html = visited.get(check.path);
    if (html === undefined) continue;
    if (!idsIn(html).has(check.hash)) {
      broken.push({
        from: check.from,
        href: check.href,
        reason: `#${check.hash} hedef sayfada yok`,
      });
    }
  }

  assert.deepEqual(
    broken,
    [],
    `Boşta bağlantı bulundu:\n${broken
      .map((b) => `  ${b.from} → ${b.href}  (${b.reason})`)
      .join("\n")}`,
  );

  // Gezinme gerçekten iş yapmış olmalı
  assert.ok(visited.size > 40, `Beklenenden az sayfa gezildi: ${visited.size}`);
});

test("her sayfa gerçek içerik döndürüyor", async () => {
  const response = await fetchPath("/canli/koy");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Bu alan yapım aşamasındadır/);
  assert.match(html, /Köyü Canlı İzle/);
  // Yapım aşamasındaki sayfa bile boş olmamalı: durum bilgisi taşımalı
  assert.match(html, /Hangi aşamadayız/);
});

test("bilinmeyen adres 404 döndürüyor", async () => {
  const response = await fetchPath("/olmayan-sayfa");
  assert.equal(response.status, 404);
});
