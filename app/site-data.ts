export type MegaColumn = {
  title: string;
  href: string;
  links: Array<{ label: string; href: string }>;
};

export type MenuItem = {
  label: string;
  href: string;
  columns?: MegaColumn[];
};

/**
 * Buradaki her href ya bir sayfa rotasına (app/content.ts slug'ı, /yonetim veya /)
 * ya da ana sayfadaki bir bölüm çapasına karşılık gelmelidir.
 * tests/links.test.mjs boşta bağlantı kalmadığını doğrular.
 */
export const menu: MenuItem[] = [
  {
    label: "HAKKIMIZDA",
    href: "/hakkimizda/tarihce",
    columns: [
      {
        title: "Derneğimiz",
        href: "/hakkimizda/tarihce",
        links: [
          { label: "Tarihçe", href: "/hakkimizda/tarihce" },
          { label: "Amaç ve İlkeler", href: "/hakkimizda/amac-ve-ilkeler" },
          { label: "Dernek Tüzüğü", href: "/hakkimizda/tuzuk" },
          { label: "Üyelik Bilgileri", href: "/hakkimizda/uyelik" },
          { label: "Kurumsal Kimlik", href: "/hakkimizda/kurumsal-kimlik" },
          { label: "Haberler", href: "/haberler" },
        ],
      },
      {
        title: "Kurumsal Yönetim",
        href: "/yonetim",
        links: [
          { label: "Başkanın Mesajı", href: "/yonetim" },
          { label: "Yönetim Şeması", href: "/yonetim#sema" },
          { label: "Yönetim Kurulu", href: "/yonetim#yonetim-kurulu" },
          { label: "Denetim Kurulu", href: "/yonetim#denetim-kurulu" },
          { label: "İstişare Kurulu", href: "/yonetim#istisare-kurulu" },
          { label: "Faaliyet Raporları", href: "/faaliyetler/raporlar" },
        ],
      },
      {
        title: "Köyümüz",
        href: "/koyumuz/tarih",
        links: [
          { label: "Dörtbölük'ün Tarihi", href: "/koyumuz/tarih" },
          { label: "Köy Bilgileri", href: "/koyumuz/bilgiler" },
          { label: "Mezralarımız", href: "/mezralar" },
          { label: "Fotoğraf Arşivi", href: "/galeri" },
          { label: "Harita ve Ulaşım", href: "/koyumuz/harita" },
          { label: "Sık Sorulanlar", href: "/koyumuz/sss" },
        ],
      },
    ],
  },
  {
    label: "YÖNETİM",
    href: "/yonetim",
    columns: [
      {
        title: "Başkanlık",
        href: "/yonetim",
        links: [
          { label: "Başkanın Mesajı", href: "/yonetim" },
          { label: "Başkan Orhan Akyürek", href: "/yonetim#sema" },
          { label: "Başkan Yardımcıları", href: "/yonetim#yonetim-kurulu" },
          { label: "Birlik ve Dayanışma", href: "/baskandan/birlik-ve-dayanisma" },
        ],
      },
      {
        title: "Kurullar",
        href: "/yonetim#sema",
        links: [
          { label: "Yönetim Kurulu", href: "/yonetim#yonetim-kurulu" },
          { label: "Denetim Kurulu", href: "/yonetim#denetim-kurulu" },
          { label: "İstişare Kurulu", href: "/yonetim#istisare-kurulu" },
          { label: "Finans Kurulu", href: "/yonetim#finans" },
        ],
      },
      {
        title: "Çalışma Birimleri",
        href: "/yonetim#gorevler",
        links: [
          { label: "Kadın ve Gençlik Kolları", href: "/yonetim#kollar" },
          { label: "Basın ve Medya", href: "/yonetim#gorevler" },
          { label: "Halkla İlişkiler", href: "/yonetim#gorevler" },
          { label: "Dernek Tüzüğü", href: "/hakkimizda/tuzuk" },
        ],
      },
    ],
  },
  {
    label: "MEZRALAR",
    href: "/mezralar",
    columns: [
      {
        title: "Dörtbölük Mezraları",
        href: "/mezralar",
        links: [
          { label: "Perdik Merkez", href: "/mezralar/perdik-merkez" },
          { label: "Suludere", href: "/mezralar/suludere" },
          { label: "Cellatlar", href: "/mezralar/cellatlar" },
          { label: "Haraba", href: "/mezralar/haraba" },
        ],
      },
      {
        title: "Yerleşimler",
        href: "/mezralar",
        links: [
          { label: "Delolar", href: "/mezralar/delolar" },
          { label: "Kaldırım", href: "/mezralar/kaldirim" },
          { label: "Gedik (Aşağı Köy)", href: "/mezralar/gedik-asagi" },
          { label: "Gedik (Yukarı Köy)", href: "/mezralar/gedik-yukari" },
        ],
      },
      {
        title: "Köy Rehberi",
        href: "/koyumuz/bilgiler",
        links: [
          { label: "Yol Durumu", href: "/mezralar/yol-durumu" },
          { label: "Hane ve Nüfus Bilgisi", href: "/koyumuz/nufus" },
          { label: "Arıcılık ve Üretim", href: "/koyumuz/aricilik" },
          { label: "Mezra Duyuruları", href: "/mezralar/duyurular" },
        ],
      },
    ],
  },
  {
    label: "FAALİYETLER",
    href: "/faaliyetler",
    columns: [
      {
        title: "Sosyal Dayanışma",
        href: "/faaliyetler",
        links: [
          { label: "Köy Ziyaretleri", href: "/faaliyetler/ziyaretler" },
          { label: "Taziye ve Dayanışma", href: "/faaliyetler/taziye" },
          { label: "Eğitim Destekleri", href: "/faaliyetler/egitim-destegi" },
        ],
      },
      {
        title: "Kültür ve Buluşmalar",
        href: "/faaliyetler/yaz-bulusmasi",
        links: [
          { label: "Yaz Buluşması", href: "/faaliyetler/yaz-bulusmasi" },
          { label: "Fotoğraf Arşivi", href: "/galeri" },
          { label: "Arıcılık ve Üretim", href: "/koyumuz/aricilik" },
        ],
      },
      {
        title: "Haber ve Arşiv",
        href: "/haberler",
        links: [
          { label: "Dernekten Haberler", href: "/haberler/dernek" },
          { label: "Muhtarlıktan Haberler", href: "/haberler/muhtarlik" },
          { label: "Dörtbölük'ten Haberler", href: "/haberler/koy" },
          { label: "Faaliyet Raporları", href: "/faaliyetler/raporlar" },
        ],
      },
    ],
  },
  {
    label: "BAŞKANDAN",
    href: "/baskandan/birlik-ve-dayanisma",
    columns: [
      {
        title: "Başkanın Mesajı",
        href: "/baskandan/birlik-ve-dayanisma",
        links: [
          { label: "Birlik ve Dayanışma", href: "/baskandan/birlik-ve-dayanisma" },
          { label: "Yeni Dönem Hedefleri", href: "/baskandan/yeni-donem-hedefleri" },
          {
            label: "Gurbetteki Hemşehrilerimize",
            href: "/baskandan/gurbetteki-hemsehrilerimize",
          },
        ],
      },
      {
        title: "Duyurular",
        href: "/baskandan/aylik-bilgilendirme",
        links: [
          { label: "Aylık Bilgilendirme", href: "/baskandan/aylik-bilgilendirme" },
          { label: "Toplantı Notları", href: "/baskandan/toplanti-notlari" },
          { label: "Faaliyet Raporları", href: "/faaliyetler/raporlar" },
        ],
      },
      {
        title: "Canlı Yayın",
        href: "/canli/baskan",
        links: [
          { label: "Başkan Canlı Yayını", href: "/canli/baskan" },
          { label: "Geçmiş Yayınlar", href: "/canli/gecmis" },
          { label: "Yayın Takvimi", href: "/canli/takvim" },
        ],
      },
    ],
  },
  {
    label: "İLETİŞİM",
    href: "/iletisim",
    columns: [
      {
        title: "Bize Ulaşın",
        href: "/iletisim",
        links: [
          { label: "İletişim Bilgileri", href: "/iletisim" },
          { label: "Konum ve Yol Tarifi", href: "/iletisim/konum" },
          { label: "Mesaj Gönderin", href: "/iletisim/mesaj" },
        ],
      },
      {
        title: "Üye İşlemleri",
        href: "/aidat",
        links: [
          { label: "Aidat Sorgula", href: "/aidat/sorgula" },
          { label: "Aidat Öde", href: "/aidat/ode" },
          { label: "Üyelik Başvurusu", href: "/iletisim/uyelik-basvurusu" },
        ],
      },
      {
        title: "Canlı Hatlar",
        href: "/canli/koy",
        links: [
          { label: "Köyü Canlı İzle", href: "/canli/koy" },
          { label: "Derneği Canlı İzle", href: "/canli/dernek" },
          { label: "Sosyal Medya", href: "/iletisim/sosyal-medya" },
        ],
      },
    ],
  },
];
