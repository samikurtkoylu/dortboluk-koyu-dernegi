import type { Metadata } from "next";
import "./globals.css";
import { asset } from "./asset";

/**
 * Sitenin yayınlanacağı adres. Statik dışa aktarımda istek başlığı okunamaz,
 * bu yüzden origin derleme zamanında sabitlenir. Farklı bir adrese yayınlarken
 * SITE_ORIGIN ortam değişkenini verin.
 *
 * Sonundaki eğik çizgi önemli: site bir depo alt dizininde yayınlandığında
 * (…/dortboluk-koyu-dernegi) çizgi olmadan URL çözümlemesi son parçayı atar ve
 * paylaşım kartı görseli yanlış adrese düşer.
 */
const base = process.env.SITE_ORIGIN ?? "https://dortbolukkoyu.org";
const origin = base.endsWith("/") ? base : `${base}/`;

export async function generateMetadata(): Promise<Metadata> {
  const image = new URL("og-v2.png", origin).toString();

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Elazığ Dörtbölük Köyü Derneği",
      template: "%s | Elazığ Dörtbölük Köyü Derneği",
    },
    description:
      "Elazığ Dörtbölük Köyü Derneği; köyümüz, faaliyetler, duyurular, yönetim kurulları ve canlı yayınlar.",
    // metadataBase'e göre çözülsün diye göreli; başta eğik çizgi olursa
    // alt dizin düşer.
    icons: {
      icon: "favicon.svg",
      shortcut: "favicon.svg",
    },
    openGraph: {
      title: "Elazığ Dörtbölük Köyü Derneği",
      description:
        "Dörtbölük Köyü, Sivrice / Elazığ. Köyümüzle bağımız sürüyor.",
      images: [{ url: image, width: 1792, height: 896, alt: "Dörtbölük Köyü Derneği" }],
      type: "website",
      locale: "tr_TR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Elazığ Dörtbölük Köyü Derneği",
      description:
        "Köyümüz, faaliyetler, duyurular, yönetim kurulları ve canlı yayınlar.",
      images: [image],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="preload"
          href={asset("/fonts/barlow-latin-400.woff2")}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href={asset("/fonts/barlow-latin-ext-400.woff2")}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href={asset("/fonts/barlow-latin-500.woff2")}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
