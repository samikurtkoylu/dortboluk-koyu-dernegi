# Elazığ Dörtbölük Köyü Derneği

Derneğin tanıtım sitesi: köyün tarihi, mezralar, faaliyetler, yönetim kurulu,
duyurular ve iletişim bilgileri.

**Yayında:** https://samikurtkoylu.github.io/dortboluk-koyu-dernegi/

Site sunucu tarafında render edilen bir Next.js uygulaması olarak yazıldı, ama
GitHub Pages yalnızca dosya sunduğu için yayına **statik olarak dışa aktarılıyor**.
Bu ayrım aşağıdaki birkaç kararı açıklıyor.

## Gereksinimler

- Node.js `>=22.13.0`
- pnpm `11.9.0` (`packageManager` alanında sabitli; `corepack enable` yeterli)

## Başlarken

```bash
pnpm install
pnpm dev
```

## Komutlar

| Komut | Ne yapar |
| --- | --- |
| `pnpm dev` | Geliştirme sunucusu |
| `pnpm build` | Derleme çıktısını `dist/` altına üretir |
| `pnpm test` | Derler, sonra `tests/` altındaki 8 testi çalıştırır |
| `pnpm lint` | ESLint |
| `pnpm export:pages` | Derler ve statik siteyi `out/` altına yazar |
| `pnpm run db:generate` | Drizzle migration üretir (şu an kullanılmıyor) |

> `pnpm run deploy` bu tabloda yok çünkü **gerçek bir yayın tetikler** —
> şablondan kalan Cloudflare Workers hedefine `wrangler deploy` çalıştırır.
> Sitenin yayını GitHub Pages üzerinden yapılıyor; bu komuta ihtiyaç yok.

## İçerik nasıl düzenlenir

Sayfa metinleri koda gömülü değil, üç veri dosyasında toplanıyor:

- **[app/content.ts](app/content.ts)** — 51 içerik sayfası. Her sayfa bir `slug`,
  başlık, hero görseli ve `blocks` dizisinden oluşuyor (`p`, `h`, `ul`, `facts`,
  `gallery`, `figure`, `note`, `cta`). [app/\[...slug\]/page.tsx](<app/[...slug]/page.tsx>)
  bu kayıttan sayfayı üretir; yeni sayfa için buraya bir kayıt eklemek yeterli.
  `status: "soon"` verilen sayfalar "yapım aşamasında" paneliyle açılır.
- **[app/site-data.ts](app/site-data.ts)** — üst menü ve alt bilgi bağlantıları.
- **[app/board-data.ts](app/board-data.ts)** — yönetim kurulu listesi; hem
  `/yonetim` sayfası hem de şema bileşeni bunu kullanır.

Menüye bağlantı ekleyip karşılığını `content.ts`'e eklemeyi unutursan test
bunu yakalar (aşağıya bakın).

Ana sayfa ayrı: [app/page.tsx](app/page.tsx). Yönetim sayfası:
[app/yonetim/page.tsx](app/yonetim/page.tsx).

## Görseller

`public/assets/` altında, yaklaşık 43 MB. Fotoğraflar WebP; PNG kayıpsız bir
biçim olduğu için fotoğrafta gereksiz yere büyük kalıyor.
[scripts/convert-images.mjs](scripts/convert-images.mjs) dönüştürmeyi yapar ve
koddaki yolları günceller. Paylaşım kartı görselleri (`og-*.png`) ve
`logo-kucuk.png` bilerek dışarıda: bazı sosyal medya botları WebP okumuyor.

Sayfalarda `next/image` yerine düz `<img>` kullanılıyor — statik dışa aktarımda
görsel optimizasyon sunucusu bulunmuyor. ESLint bunun için 11 uyarı veriyor;
uyarılar bilinçli, hata değil.

## Testler

`pnpm test` derleyip [tests/](tests/) altındaki 8 testi çalıştırır. Testler
derlenmiş worker'ı doğrudan çağırıp yanıtları inceliyor:

- kırık görsel veya video yok (koddaki her yol `public/` altında gerçekten var)
- dosya adlarında URL'yi bozacak karakter yok
- boşta bağlantı yok (menüdeki her `href` bir sayfaya karşılık geliyor)
- her sayfa gerçek içerik döndürüyor, bilinmeyen adres 404 veriyor
- yönetim sayfası gerçek kurul listesini basıyor
- şablondan kalan dosyalar siteye sızmamış

## Yayın

`main`'e her push'ta [.github/workflows/pages.yml](.github/workflows/pages.yml)
çalışır: kurulum → testler → statik dışa aktarım → GitHub Pages.

Dışa aktarımı [scripts/export-static.mjs](scripts/export-static.mjs) yapar.
vinext'te export komutu olmadığı için betik derlenmiş worker'ı doğrudan çağırıp
her rotanın HTML'ini diske yazar (53 sayfa: ana sayfa + `/yonetim` + 51 içerik
sayfası), sonra statik dosyaları yanına kopyalar. Ayrıca:

- Her sayfanın `.rsc` yükü de yazılır. `next/link` gezinirken önce bunu ister;
  olmazsa her tıklama 404 alıp tam sayfa yüklemesine düşerdi.
- `.nojekyll` ve `404.html` üretilir. GitHub Pages bilinmeyen adreslerde
  `404.html`'i kendiliğinden kullanır.

### Adres ve taban yol

Site depo alt dizininde yayınlandığı için iki değer workflow'da tanımlı
([pages.yml](.github/workflows/pages.yml)):

- `BASE_PATH` — tüm kök yolları `/dortboluk-koyu-dernegi/` önekine kaydırır.
- `SITE_ORIGIN` — paylaşım kartlarındaki mutlak adresler bundan üretilir
  ([app/layout.tsx](app/layout.tsx)). Statik çıktıda istek başlığı okunamadığı
  için origin derleme zamanında sabitlenmek zorunda.

**Özel alan adı bağlarsan:** `BASE_PATH`'i boşalt, `SITE_ORIGIN`'i yeni adrese
çevir, alan adını depo ayarlarından (Settings → Pages) tanımla. `BASE_PATH` dolu
kalırsa varlıklar var olmayan bir alt dizinden istenir.

## CI ve bağımlılıklar

- [.github/workflows/ci.yml](.github/workflows/ci.yml) — pull request'lerde lint,
  test ve dışa aktarımı çalıştırır; yayın yapmaz. Export adımı yayındakiyle aynı
  taban yolu kullanır, böylece bir rota bozulduğunda deploy anında değil PR'da
  görünür.
- [.github/dependabot.yml](.github/dependabot.yml) — action ve paket
  sürümlerini aylık tarar. Minör/yama güncellemeleri tek PR'da toplanır,
  major'lar ayrı gelir.

## Şablondan kalanlar

Proje `vinext-starter` şablonundan türedi ve bazı parçaları kullanılmadan duruyor.
Silmeden önce bilinsin diye not düşülüyor:

- **Cloudflare Workers** — [worker/index.ts](worker/index.ts) ve
  [vite.config.ts](vite.config.ts) içindeki satır içi Cloudflare yapılandırması
  (ayrı bir `wrangler.jsonc` yok) sitenin özgün hedefiydi. Yayın GitHub Pages'e
  alındı; worker artık yalnızca statik dışa aktarımda render motoru olarak
  kullanılıyor.
- **D1 / R2** — `.openai/hosting.json` içinde ikisi de `null`,
  [db/schema.ts](db/schema.ts) boş. Site veritabanı kullanmıyor.
- **ChatGPT oturum açma** — [app/chatgpt-auth.ts](app/chatgpt-auth.ts) hiçbir
  sayfada çağrılmıyor; site tamamen herkese açık.
