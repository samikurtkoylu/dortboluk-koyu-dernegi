import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Dörtbölük association site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="tr"/i);
  assert.match(html, /Elazığ Dörtbölük Köyü Derneği/);
  assert.match(html, /AİDAT ÖDE/);
  assert.match(html, /Köyümüzü(?:<!-- -->)?<br\/>Canlı İzle/);
  assert.match(html, /Derneği(?:<!-- -->)?<br\/>Canlı İzle/);
  assert.match(html, /DERNEKTEN HABERLER/);
  assert.match(html, /MUHTARIMIZDAN HABERLER/);
  assert.match(html, /DÖRTBÖLÜK&#x27;TEN HABERLER|DÖRTBÖLÜK'TEN HABERLER/);
  assert.match(html, /Orhan Akyürek/);
  assert.match(html, /Suludere/);
  assert.match(html, /class="super-menu"/);
  assert.match(html, /class="banner-grid"/);
  assert.match(html, /\/fonts\/barlow-latin-400\.woff2/);
  assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
  // Tanıtım videoları YouTube gömüsü değil, kendi dosyalarımızdan oynatılır.
  assert.match(html, /\/assets\/videolar\/koy-tanitim\.mp4/);
  assert.match(html, /\/assets\/videolar\/dernek-tanitim\.mp4/);
  assert.doesNotMatch(html, /youtube\.com|youtu\.be/i);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|react-loading-skeleton|Bağış Yap|Aylık Düzenli|Özel Gün|Darüşşafaka/i);
});

test("server-renders the yönetim page with the real board roster", async () => {
  const response = await render("/yonetim");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Yönetim ve Kurullarımız/);
  assert.match(html, /class="pl-card"/);
  assert.match(html, /class="page-sidebar"/);

  // Dernek şemasındaki gerçek isimler kaybolmamalı.
  for (const name of [
    "Orhan Akyürek",
    "Hayati Oğuz",
    "Yasemin Kaygun",
    "Serdar Aytekin",
    "Hikmet Aytekin",
    "Özgür Deniz",
    "Murat Ayata",
    "Cengiz Oğuz",
    "Aydın Deniz",
    "Habip Anıtaş",
    "Enes Akyürek",
    "Hakan Yener",
    "Cengiz Tosun",
    "Elif Anıtaş",
    "Nihal Akyürek Gülbaş",
    "Zeycan Anıtaş",
  ]) {
    assert.match(html, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  // Ortak header/footer her iki sayfada da aynı olmalı.
  assert.match(html, /class="super-menu"/);
  assert.match(html, /© 2026 Elazığ Dörtbölük Köyü Derneği/);
});

test("keeps starter files out of the customized site", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /heroSlides/);
  assert.match(page, /banner-grid/);
  assert.match(layout, /generateMetadata/);
  assert.match(css, /--color-primary:\s*#00573f/i);
  assert.match(css, /--color-accent:\s*#9f2d00/i);
  assert.match(css, /--color-surface:\s*#f9f6f0/i);
  assert.doesNotMatch(page + layout + css + packageJson, /SkeletonPreview|codex-preview|react-loading-skeleton/);

  await access(new URL("../public/og.jpg", import.meta.url));
  await access(new URL("../public/og-v2.png", import.meta.url));
  await access(new URL("../public/favicon.svg", import.meta.url));
  await access(new URL("../public/assets/videolar/koy-tanitim.mp4", import.meta.url));
  await access(new URL("../public/assets/videolar/dernek-tanitim.mp4", import.meta.url));
  await access(new URL("../public/assets/animeler/okul.webp", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
