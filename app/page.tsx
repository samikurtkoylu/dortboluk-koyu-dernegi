"use client";

import {
  ChevronLeft,
  ChevronRight,
  Landmark,
  Radio,
  Smartphone,
  Videotape,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollTop, SiteFooter, SiteHeader } from "./site-chrome";
import { asset } from "./asset";

/**
 * Manşetler köyün ve derneğin gerçek fotoğraflarından seçilir;
 * her manşet bir mesaj taşır ve gideceği sayfa bellidir.
 */
const heroSlides = [
  {
    image: "/assets/eski/dernek-acilis.jpg",
    position: "center 42%",
    eyebrow: "ELAZIĞ DÖRTBÖLÜK KÖYÜ DERNEĞİ",
    title: "Derneğimiz açıldı",
    text: "Köyümüzün ortak adresi artık tek çatı altında: haberler, duyurular, arşiv ve dayanışma.",
    cta: "Yönetim ve Kurullarımız",
    href: "/yonetim",
  },
  {
    image: "/assets/animeler/vadi-panorama.webp",
    position: "center 58%",
    eyebrow: "ESKİ ADIYLA PERDİK",
    title: "Köyümüzle bağımız sürüyor",
    text: "Dağ eteğinde kurulmuş, dört bölüğe ayrılmış bir köyün hikâyesi.",
    cta: "Dörtbölük'ün Tarihi",
    href: "/koyumuz/tarih",
  },
  {
    // Kırpma noktası yolu banner'ın ortasına getirir; manşet yollardan bahsediyor.
    image: "/assets/animeler/yesil-tepeler.webp",
    position: "center 88%",
    eyebrow: "PERDİK MERKEZ VE ALTI MEZRA",
    title: "Her yol aynı köye çıkar",
    text: "Suludere, Cellatlar, Haraba, Delolar, Kaldırım ve Gedik; her birinin kendi albümü var.",
    cta: "Mezralarımızı Gezin",
    href: "/mezralar",
  },
  {
    image: "/assets/animeler/koy-evi-agac.webp",
    position: "center 42%",
    eyebrow: "KÖY HAFIZASI",
    title: "Arşivimizi birlikte kuruyoruz",
    text: "Aile albümlerindeki eski kareler, tarih ve kişi bilgileriyle dijital arşive işleniyor.",
    cta: "Fotoğraf Arşivi",
    href: "/galeri",
  },
  {
    image: "/assets/eski/ortak-sofra.webp",
    position: "center 45%",
    eyebrow: "YAZ BULUŞMASI",
    title: "Köy meydanında buluşuyoruz",
    text: "Yılda bir kez, aynı sofrada. Bu yılın hazırlıkları başladı.",
    cta: "Buluşma Hazırlıkları",
    href: "/faaliyetler/yaz-bulusmasi",
  },
  {
    image: "/assets/ortak/cami-ve-agac.webp",
    position: "center 45%",
    eyebrow: "KÖYE AÇILAN EKRAN",
    title: "Köyümüzü canlı izleyeceksiniz",
    text: "Meydana kurulacak kamerayla, uzakta olsanız da köyü anlık görebileceksiniz.",
    cta: "Canlı Yayın Çalışması",
    href: "/canli/koy",
  },
  {
    image: "/assets/animeler/sonbahar-vadi.webp",
    position: "center 55%",
    eyebrow: "ÜYE İŞLEMLERİ",
    title: "Aidatınız köye dönüyor",
    text: "Taziye dayanışmasından yol takibine, eğitim desteğinden arşive kadar.",
    cta: "Aidat İşlemleri",
    href: "/aidat",
  },
];

const newsTabs = [
  { label: "DERNEKTEN HABERLER", href: "/haberler/dernek" },
  { label: "MUHTARIMIZDAN HABERLER", href: "/haberler/muhtarlik" },
  { label: "DÖRTBÖLÜK'TEN HABERLER", href: "/haberler/koy" },
];

const newsByTab = [
  [
    {
      image: "/assets/eski/ortak-sofra.webp",
      title: "Yaz Buluşması Hazırlıkları Başladı",
      text: "Köy meydanında yapılması planlanan buluşma için ulaşım ve görev paylaşımı taslak programı hazırlandı.",
      href: "/faaliyetler/yaz-bulusmasi",
    },
    {
      image: "/assets/eski/koy-ziyareti.webp",
      title: "Yönetim Kurulu Köy Ziyaretini Tamamladı",
      text: "Öncelikli ihtiyaçlar, yol çalışmaları ve yeni dönem faaliyet takvimi hemşehrilerimizle değerlendirildi.",
      href: "/faaliyetler/ziyaretler",
    },
    {
      image: "/assets/animeler/koy-evi-agac.webp",
      title: "Köy Arşivi İçin Fotoğraf Çağrısı",
      text: "Aile albümlerindeki eski kareler, tarih ve kişi bilgileriyle dijital arşivimize ekleniyor.",
      href: "/galeri",
    },
    {
      image: "/assets/eski/koy-bulusmasi.webp",
      title: "Taziye ve Dayanışma Ağı Güncellendi",
      text: "Vefat haberlerinin aynı gün herkese ulaşması için iletişim zinciri yeniden düzenlendi.",
      href: "/faaliyetler/taziye",
    },
    {
      image: "/assets/eski/resmi-ziyaret.webp",
      title: "Yeni Dönem Görev Dağılımı Yayımlandı",
      text: "Yönetim, denetim ve istişare kurullarımızın görev dağılımı üyelerimizin bilgisine sunuldu.",
      href: "/yonetim#sema",
    },
    {
      image: "/assets/animeler/okul.webp",
      title: "Eğitim Desteği Başvuruları Açıldı",
      text: "Köyümüzden üniversite öğrenimi gören gençlerimize yönelik destek programının başvuruları başladı.",
      href: "/faaliyetler/egitim-destegi",
    },
  ],
  [
    {
      image: "/assets/bazi/tabela.jpg",
      title: "Mezra Yolları İçin Keşif Yapılacak",
      text: "Suludere, Cellatlar, Haraba, Delolar, Kaldırım ve Gedik bağlantılarında bakım noktaları belirlenecek.",
      href: "/mezralar/yol-durumu",
    },
    {
      image: "/assets/bazi/harita.webp",
      title: "Acil Durum İrtibat Listesi Yenileniyor",
      text: "Köyde kalan haneler ve mezra sorumluları için iletişim zinciri güncel bilgilerle yeniden düzenleniyor.",
      href: "/koyumuz/nufus",
    },
    {
      image: "/assets/ortak/koy-agaclar.webp",
      title: "Köy İçi Temizlik Çalışması Planlandı",
      text: "Ortak kullanım alanları ve çeşme çevreleri için gönüllü çalışma programı oluşturuldu.",
      href: "/mezralar/duyurular",
    },
    {
      image: "/assets/mezralar/kaldirim/kaldirim-008.jpg",
      title: "Kaldırım Mezrasında Su Hattı Bakımı",
      text: "Yaz dönemi öncesinde içme suyu hattının kontrolü ve gerekli onarımları için çalışma takvimi çıkarıldı.",
      href: "/mezralar/kaldirim",
    },
    {
      image: "/assets/mezralar/haraba/haraba-004.jpg",
      title: "Haraba Yolunda Menfez Çalışması",
      text: "Kış aylarında sorun yaşanan geçiş noktasında menfez yenileme talebi ilgili kurumlara iletildi.",
      href: "/mezralar/haraba",
    },
    {
      image: "/assets/mezralar/delolar/delolar-003.jpg",
      title: "Delolar'da Ortak Alan Düzenlemesi",
      text: "Mezra sakinlerinin talebiyle toplanma alanının çevre düzenlemesi için gönüllü ekip oluşturuldu.",
      href: "/mezralar/delolar",
    },
  ],
  [
    {
      image: "/assets/ortak/aricilik-kovanlar.webp",
      title: "Köy Balı Üretici Rehberi Güncelleniyor",
      text: "Arıcılıkla uğraşan haneler için doğrudan üreticiye ulaşılabilecek yeni iletişim rehberi hazırlanıyor.",
      href: "/koyumuz/aricilik",
    },
    {
      image: "/assets/bazi/sivrice-hazar.jpg",
      title: "Sivrice ve Hazar Çevresinden Yaz Notları",
      text: "Bölgedeki etkinlikler, ulaşım bilgileri ve yaz dönemine ilişkin kısa haberler bir araya getirildi.",
      href: "/koyumuz/harita",
    },
    {
      image: "/assets/mezralar/perdik-merkez/perdik-010.jpg",
      title: "Dörtbölük Albümüne Yeni Kareler Eklendi",
      text: "Köy yaşamından mevsimlik görüntüler ve ziyaret fotoğrafları arşiv sayfasında yayımlandı.",
      href: "/galeri",
    },
    {
      image: "/assets/bazi/bal.jpg",
      title: "Geleneksel Tariflerimiz Derleniyor",
      text: "Köy mutfağına ait tarifler, anlatanların adlarıyla birlikte kayıt altına alınıyor.",
      href: "/galeri",
    },
    {
      image: "/assets/mezralar/gedik/asagi-koy/gedik-asagi-001.jpg",
      title: "Gedik'ten Arşiv Kareleri Paylaşıldı",
      text: "Aşağı ve yukarı köy yerleşimlerine ait fotoğraflar mezra albümlerine eklendi.",
      href: "/mezralar/gedik-asagi",
    },
    {
      image: "/assets/ortak/yesil-cayir.webp",
      title: "Köyde Mevsim Değişti",
      text: "Bahar aylarında köy ve mezra çevresinden çekilen kareler fotoğraf arşivimizde yerini aldı.",
      href: "/galeri",
    },
  ],
];

const hamletTabs = [
  {
    label: "Perdik Merkez",
    href: "/mezralar/perdik-merkez",
    image: "/assets/ortak/cami-ve-agac.webp",
  },
  {
    label: "Cellatlar",
    href: "/mezralar/cellatlar",
    image: "/assets/mezralar/cellatlar/cellatlar-103.webp",
  },
  {
    label: "Delolar",
    href: "/mezralar/delolar",
    image: "/assets/animeler/cayir-daglar.webp",
  },
  {
    label: "Haraba",
    href: "/mezralar/haraba",
    image: "/assets/ortak/sonbahar-koy.webp",
  },
  {
    label: "Kaldırım",
    href: "/mezralar/kaldirim",
    image: "/assets/ortak/ilkbahar-yol.webp",
  },
  {
    label: "Gedik",
    href: "/mezralar/gedik-yukari",
    image: "/assets/ortak/genis-vadi.webp",
  },
];

const amountOptions = ["500 TL", "1.500 TL", "5.000 TL", "Diğer"];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeNews, setActiveNews] = useState(0);
  const [activeHamlet, setActiveHamlet] = useState(0);
  const [amount, setAmount] = useState("1.500 TL");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const changeSlide = (direction: number) => {
    setActiveSlide(
      (current) => (current + direction + heroSlides.length) % heroSlides.length,
    );
  };

  return (
    <>
      <SiteHeader />

      <main id="main">
        <section
          className="hero hero-inset-shadow"
          aria-roledescription="carousel"
          aria-label="Öne çıkan manşetler"
        >
          <div className="hero-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {heroSlides.map((slide, index) => (
              <div className="hero-slide" key={slide.image} aria-hidden={activeSlide !== index}>
                <Link href={slide.href} tabIndex={activeSlide === index ? undefined : -1}>
                  <img
                    src={asset(slide.image)}
                    alt=""
                    style={{ objectPosition: slide.position }}
                  />
                  <span className="hero-caption">
                    <span className="hero-caption-inner">
                      <span className="hero-eyebrow">{slide.eyebrow}</span>
                      <strong className="hero-title">{slide.title}</strong>
                      <span className="hero-text">{slide.text}</span>
                      <span className="hero-cta">
                        {slide.cta} <ChevronRight />
                      </span>
                    </span>
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <button
            className="hero-nav hero-prev"
            type="button"
            onClick={() => changeSlide(-1)}
            aria-label="Önceki manşet"
          >
            <ChevronLeft />
          </button>
          <button
            className="hero-nav hero-next"
            type="button"
            onClick={() => changeSlide(1)}
            aria-label="Sonraki manşet"
          >
            <ChevronRight />
          </button>

          <div className="hero-dots" role="tablist" aria-label="Manşet seçimi">
            {heroSlides.map((slide, index) => (
              <button
                aria-label={`${index + 1}. manşet: ${slide.title}`}
                aria-selected={activeSlide === index}
                className={activeSlide === index ? "is-active" : ""}
                key={slide.image}
                onClick={() => setActiveSlide(index)}
                role="tab"
                type="button"
              />
            ))}
          </div>
        </section>

        <div className="banner-grid">
          <div>
            <Link href="/canli/koy">
              <Videotape />
              <br />
              <span>
                Köyümüzü
                <br />
                Canlı İzle
              </span>
            </Link>
          </div>
          <div>
            <Link href="/aidat">
              <Landmark />
              <br />
              <span>
                Aidat
                <br />
                Sorgula
              </span>
            </Link>
          </div>
          <div>
            <Link href="/canli/dernek">
              <Radio />
              <br />
              <span>
                Derneği
                <br />
                Canlı İzle
              </span>
            </Link>
          </div>
        </div>

        <section className="section-donation" id="hakkimizda">
          <div className="section-container">
            <div className="donation-columns">
              <div id="koyu-canli">
                <h2 className="h2">Köyümüzü Canlı İzleyin</h2>
                <div className="body-copy">
                  <p>
                    Dörtbölük meydanı için hazırlanan canlı yayın, gurbetteki
                    hemşehrilerimizi köyün gündelik hayatına yeniden bağlayacak.
                  </p>
                </div>
                <Link className="btn btn-outline btn-green btn-block" href="/canli/koy">
                  Canlı Yayın Çalışması
                </Link>
              </div>

              <figure>
                <div className="aspect-video">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={asset("/assets/eski/dernek-onunde-toplu.webp")}
                  >
                    <source src={asset("/assets/videolar/dernek-tanitim.mp4")} type="video/mp4" />
                    Tarayıcınız video oynatmayı desteklemiyor.
                  </video>
                </div>
                <Link className="btn btn-outline btn-red btn-wide btn-center" href="/canli/takvim">
                  <ChevronRight /> Canlı Yayınlar, Duyurular ve Başkan Mesajları Hakkında Detaylı Bilgi
                </Link>
              </figure>

              <div id="dernek-canli">
                <h2 className="h2">Derneği Canlı İzleyin</h2>
                <div className="body-copy">
                  <p>
                    Başkan mesajları, toplantı özetleri ve dernek faaliyetleri
                    yayın başladığında bu alandan izlenebilecek.
                  </p>
                </div>
                <Link className="btn btn-outline btn-green btn-block" href="/canli/dernek">
                  Dernek Yayını
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-news" id="haberler">
          <div className="section-container">
            <h2 className="ds-sr-only">Haberler</h2>

            <div className="tabs">
              <div className="tabs-bar" role="tablist" aria-label="Haber kategorileri">
                {newsTabs.map((tab, index) => (
                  <button
                    aria-selected={activeNews === index}
                    className={`tab-btn ${activeNews === index ? "is-active" : ""}`}
                    key={tab.label}
                    onClick={() => setActiveNews(index)}
                    role="tab"
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <select
                aria-label="Haber kategorisi seçin"
                className="tabs-select"
                onChange={(event) => setActiveNews(Number(event.target.value))}
                value={activeNews}
              >
                {newsTabs.map((tab, index) => (
                  <option key={tab.label} value={index}>
                    {tab.label}
                  </option>
                ))}
              </select>

              <div className="tab-content">
                <div className="news-grid">
                  {newsByTab[activeNews].map((item) => (
                    <article className="card" key={item.title}>
                      <Link href={item.href}>
                        <img className="card-img" src={asset(item.image)} alt="" />
                      </Link>
                      <div className="card-body">
                        <h3 className="card-title">
                          <Link href={item.href}>{item.title}</Link>
                        </h3>
                        <p className="card-text">{item.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <Link
              className="btn btn-outline btn-red btn-wide btn-center"
              href={newsTabs[activeNews].href}
            >
              <ChevronRight /> Tüm Haberlere Göz Atın
            </Link>
          </div>
        </section>

        <section className="section-education hero-inset-shadow" id="koyumuz">
          <div className="section-container">
            <h2 className="section-title">
              Perdik&apos;ten beri &quot;Köyümüzle Bağımız Sürüyor&quot;
            </h2>

            <div className="education-columns">
              <figure>
                <div className="aspect-video">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={asset("/assets/animeler/vadi-panorama.webp")}
                  >
                    <source src={asset("/assets/videolar/koy-tanitim.mp4")} type="video/mp4" />
                    Tarayıcınız video oynatmayı desteklemiyor.
                  </video>
                </div>
                <Link className="btn btn-outline btn-red btn-wide btn-center" href="/koyumuz/tarih">
                  <ChevronRight /> Dörtbölük Köyü&apos;nü ve Mezralarını Keşfedin
                </Link>
              </figure>

              <div>
                <h3 className="h3">Dörtbölük Köyü</h3>
                <div className="body-copy">
                  <p>
                    Dörtbölük, Sivrice ilçe merkezine on beş kilometre uzaklıkta,
                    eski adı Perdik olan bir Elazığ köyüdür. Yetmiş hane ve yüz
                    kırk sekiz yerleşik nüfusuyla, altı mezrası ile birlikte
                    dağların arasında güçlü bir köy hafızası taşır.
                  </p>
                  <p>
                    Arıcılık, hayvancılık ve tarım köy yaşamının temelini
                    oluşturur. Gurbette yaşayan hemşehrilerimiz için köy, hâlâ
                    hafıza ve buluşma noktasıdır.
                  </p>
                  <p>
                    Derneğimiz; köyümüzle ilgili duyuruları, faaliyetleri, canlı
                    yayınları, muhtarlık haberlerini ve başkan mesajlarını tek
                    çatı altında toplamayı amaçlar.
                  </p>
                </div>
                <div className="education-links">
                  <Link className="btn btn-outline btn-green" href="/yonetim">
                    Yönetim
                  </Link>
                  <Link className="btn btn-outline btn-green" href="/mezralar">
                    Mezralar
                  </Link>
                  <Link className="btn btn-outline btn-green" href="/faaliyetler">
                    Faaliyetler
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-residence" id="mezralar">
          <div className="section-container">
            <h2 className="section-title section-title-accent">
              Sizin için &quot;Köye Açılan Ekran&quot;, köyümüz için &quot;Güçlü Bir Bağ&quot;
            </h2>

            <div className="residence-columns">
              <div className="residence-info">
                <h3 className="h3 h3-accent">DÖRTBÖLÜK MEZRALARI</h3>
                <div className="body-copy">
                  <p>
                    Perdik Merkez, Suludere, Cellatlar, Haraba, Delolar, Kaldırım
                    ve Gedik; her biri kendi hikâyesini taşıyan yerleşimlerimiz.
                  </p>
                  <p>
                    Mezralarımıza ait haber, fotoğraf, taziye, faaliyet ve yol
                    durumu duyurularını bu sayfadan düzenli olarak takip
                    edebilirsiniz. Aile albümlerinizdeki eski kareler de köy
                    arşivimize katkı sağlıyor.
                  </p>
                </div>
                <Link className="btn btn-outline btn-red btn-block" href="/mezralar">
                  <ChevronRight /> Mezraları Keşfedin
                </Link>
              </div>

              <div className="residence-gallery">
                <div className="tabs">
                  <div className="tabs-bar" role="tablist" aria-label="Mezralar">
                    {hamletTabs.map((tab, index) => (
                      <button
                        aria-selected={activeHamlet === index}
                        className={`tab-btn ${activeHamlet === index ? "is-active" : ""}`}
                        key={tab.label}
                        onClick={() => setActiveHamlet(index)}
                        role="tab"
                        type="button"
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <select
                    aria-label="Mezra seçin"
                    className="tabs-select"
                    onChange={(event) => setActiveHamlet(Number(event.target.value))}
                    value={activeHamlet}
                  >
                    {hamletTabs.map((tab, index) => (
                      <option key={tab.label} value={index}>
                        {tab.label}
                      </option>
                    ))}
                  </select>

                  <div className="tab-content">
                    <Link href={hamletTabs[activeHamlet].href}>
                      <img
                        className="gallery-frame"
                        src={hamletTabs[activeHamlet].image}
                        alt={`${hamletTabs[activeHamlet].label} mezrasından bir kare`}
                      />
                    </Link>
                  </div>
                </div>

                <Link
                  className="btn btn-outline btn-red btn-wide btn-center"
                  href={hamletTabs[activeHamlet].href}
                >
                  <ChevronRight /> {hamletTabs[activeHamlet].label} Hakkında Detaylı Bilgi
                </Link>
              </div>
            </div>
          </div>
        </section>

        <aside className="quick-donation" id="aidat">
          <div className="section-container">
            <h2 className="section-title section-title-light">Aidatınızı Ödeyin</h2>

            <form onSubmit={(event) => event.preventDefault()}>
              <fieldset>
                <legend className="ds-sr-only">Aidat tutarı seçin</legend>
                <div className="amount-options">
                  {amountOptions.map((option) => (
                    <label key={option}>
                      <input
                        checked={amount === option}
                        name="aidat-tutari"
                        onChange={() => setAmount(option)}
                        type="radio"
                        value={option}
                      />
                      {option}
                    </label>
                  ))}
                  <input
                    aria-label="Tutar"
                    className="amount-input"
                    inputMode="numeric"
                    placeholder="Tutar"
                  />
                </div>
              </fieldset>

              <div className="submit-row">
                <Link className="btn btn-fill btn-red" href="/aidat/ode">
                  Devam
                </Link>
              </div>
            </form>

            <p className="quick-donation-note">
              <Smartphone />
              Aidat ödeme ekranı üye numaranızla çalışacak şekilde hazırlanıyor.
              <Link href="/aidat">Ayrıntılar</Link>
            </p>
          </div>
        </aside>
      </main>

      <ScrollTop />
      <SiteFooter />
    </>
  );
}
