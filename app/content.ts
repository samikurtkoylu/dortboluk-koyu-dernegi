/**
 * Site içerik kaydı.
 *
 * Menüdeki ve alt bilgideki her bağlantı buradaki bir slug'a karşılık gelir;
 * app/[...slug]/page.tsx bu kayıttan sayfayı üretir. Bir bağlantı eklerken
 * karşılığını buraya da eklemek gerekir — tests/links.test.mjs boşta kalan
 * bağlantı bırakılmadığını doğrular.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "facts"; items: Array<{ label: string; value: string }> }
  | { type: "gallery"; images: string[]; caption?: string }
  | { type: "figure"; src: string; caption?: string }
  | { type: "note"; text: string }
  | { type: "cta"; label: string; href: string };

export type ContentPage = {
  slug: string;
  title: string;
  group: string;
  hero: string;
  /**
   * Görseller 4:3, hero şeridi ise 2.8:1. Kırpma varsayılan olarak ortadan
   * yapılır; konusu üstte veya altta kalan görsellerde bunu geçersiz kıl.
   */
  heroPosition?: string;
  lead: string;
  blocks: Block[];
  /** "soon" → sayfa tasarımlı bir "yapım aşamasında" paneliyle açılır. */
  status?: "soon";
};

export const groups: Record<string, string> = {
  hakkimizda: "Derneğimiz",
  koyumuz: "Köyümüz",
  mezralar: "Mezralar",
  faaliyetler: "Faaliyetler",
  haberler: "Haberler",
  baskandan: "Başkandan",
  canli: "Canlı Yayın",
  iletisim: "İletişim",
  aidat: "Üye İşlemleri",
};

const mezraPhotos = (
  folder: string,
  prefix: string,
  numbers: number[],
  ext: "jpg" | "png" | "webp" = "jpg",
): string[] =>
  numbers.map(
    (n) => `/assets/mezralar/${folder}/${prefix}-${String(n).padStart(3, "0")}.${ext}`,
  );

export const pages: ContentPage[] = [
  /* ---------------------------------------------------------------- Derneğimiz */
  {
    slug: "hakkimizda/tarihce",
    title: "Tarihçe",
    group: "hakkimizda",
    hero: "/assets/animeler/koy-evi-agac.webp",
    lead: "Köyden ayrılanların bağını canlı tutmak için kurulan bir dayanışma geleneği.",
    blocks: [
      {
        type: "p",
        text: "Dörtbölük'ten şehirlere göç, diğer Anadolu köylerinde olduğu gibi kademeli yaşandı. Önce çalışmak için gidenler, ardından çocuklarını okutmak için taşınan aileler geldi. Köy boşalmadı; ama köyle bağ, her kuşakta biraz daha çaba isteyen bir şeye dönüştü.",
      },
      {
        type: "p",
        text: "Derneğimiz tam da bu noktada doğdu. Taziyede yan yana olmak, düğünde haberdar olmak, köye giden yolun durumunu öğrenmek için birbirini arayan insanların kurduğu gayriresmî ağ, zamanla düzenli toplantılara ve ortak bir bütçeye dönüştü.",
      },
      {
        type: "p",
        text: "Bugün yönetim kurulumuz, denetim ve istişare kurullarımız, finans kurulumuz ile kadın ve gençlik kollarımız bu geleneği kurumsal bir çerçevede sürdürüyor. Amaç aynı kaldı: Dörtbölük'ü, nerede yaşarsa yaşasın Dörtbölüklünün ortak adresi tutmak.",
      },
      { type: "cta", label: "Yönetim ve Kurullarımız", href: "/yonetim" },
    ],
  },
  {
    slug: "hakkimizda/amac-ve-ilkeler",
    title: "Amaç ve İlkeler",
    group: "hakkimizda",
    hero: "/assets/eski/ortak-sofra.webp",
    lead: "Ne yaptığımızı ve neden yaptığımızı belirleyen çerçeve.",
    blocks: [
      { type: "h", text: "Amacımız" },
      {
        type: "p",
        text: "Dörtbölük Köyü ve mezralarında yaşayanlar ile köyden ayrılmış hemşehrilerimiz arasındaki bağı güçlendirmek; sosyal dayanışmayı, kültürel mirasın korunmasını ve köyün ortak ihtiyaçlarının karşılanmasını sağlamak.",
      },
      { type: "h", text: "İlkelerimiz" },
      {
        type: "ul",
        items: [
          "Şeffaflık — gelir ve giderler üyelerimizin bilgisine açıktır.",
          "Eşit mesafe — dernek siyasi görüş, mezhep veya aile ayrımı gözetmez.",
          "Ortak akıl — kararlar kurullarda tartışılarak alınır, tek kişiye bırakılmaz.",
          "Gönüllülük — katkı, herkesin imkânı ölçüsündedir; kimse zorlanmaz.",
          "Kayıt tutma — yapılan her iş belgelenir, arşive işlenir.",
        ],
      },
      { type: "cta", label: "Dernek Tüzüğü", href: "/hakkimizda/tuzuk" },
    ],
  },
  {
    slug: "hakkimizda/tuzuk",
    title: "Dernek Tüzüğü",
    group: "hakkimizda",
    hero: "/assets/eski/koy-bulusmasi.webp",
    heroPosition: "center 40%",
    lead: "Üyelik, aidat, kurullar ve mali işleyişin yazılı kuralları.",
    blocks: [
      {
        type: "p",
        text: "Derneğin işleyişi, 5253 sayılı Dernekler Kanunu çerçevesinde hazırlanan tüzüğümüzle düzenlenir. Tüzük; üyelik şartlarını, aidatın belirlenme usulünü, üyelikten çıkma ve çıkarılma koşullarını, kurulların oluşumu ile görev sürelerini ve gelir-gider kalemlerinin nasıl raporlanacağını kapsar.",
      },
      { type: "h", text: "Tüzükte düzenlenen başlıca konular" },
      {
        type: "ul",
        items: [
          "Derneğin adı, merkezi ve faaliyet alanı",
          "Üye olma, üyelikten çıkma ve çıkarılma şartları",
          "Genel kurulun toplanma zamanı ve karar alma usulü",
          "Yönetim, denetim ve istişare kurullarının oluşumu ve görevleri",
          "Aidat tutarının belirlenmesi ve tahsil usulü",
          "Gelir-gider işlemlerinde tutulacak defter ve kayıtlar",
          "Derneğin feshi ve mal varlığının tasfiyesi",
        ],
      },
      {
        type: "note",
        text: "Tüzüğün tam metnini ve son genel kurul kararlarını yazılı olarak talep eden üyelerimize dernek sekreterliğimiz iletiyor.",
      },
      { type: "cta", label: "Yönetimle İletişime Geçin", href: "/iletisim" },
    ],
  },
  {
    slug: "hakkimizda/uyelik",
    title: "Üyelik Bilgileri",
    group: "hakkimizda",
    hero: "/assets/eski/dernek-onunde-toplu.webp",
    heroPosition: "center 38%",
    lead: "Kimler üye olabilir, aidat nasıl işler, üyelik ne sağlar?",
    blocks: [
      {
        type: "p",
        text: "Dörtbölük Köyü ve mezralarında doğmuş, buradan bir aileye mensup ya da köyle bağını sürdürmek isteyen 18 yaşını doldurmuş herkes derneğe üye olabilir. Başvurular yönetim kurulunda değerlendirilir.",
      },
      { type: "h", text: "Üyeliğin sağladıkları" },
      {
        type: "ul",
        items: [
          "Genel kurulda oy kullanma ve kurullara aday olma hakkı",
          "Faaliyet raporlarına ve mali tablolara erişim",
          "Toplantı, buluşma ve etkinlik duyurularının doğrudan iletilmesi",
          "Taziye ve dayanışma ağına dâhil olma",
        ],
      },
      { type: "h", text: "Aidat" },
      {
        type: "p",
        text: "Aidat tutarı genel kurulda belirlenir ve yıllık olarak tahsil edilir. Ödemeler dernek hesabına yapılır; tahsilat ve harcamalar denetim kurulunun incelemesine açıktır.",
      },
      { type: "cta", label: "Üyelik Başvurusu Yapın", href: "/iletisim/uyelik-basvurusu" },
    ],
  },
  {
    slug: "hakkimizda/kurumsal-kimlik",
    title: "Kurumsal Kimlik",
    group: "hakkimizda",
    hero: "/assets/ortak/tepeler.webp",
    lead: "Amblemimiz, renklerimiz ve iletişim dilimiz.",
    blocks: [
      {
        type: "p",
        text: "Derneğimizin amblemi, köyün dağlarla çevrili yerleşim düzenini ve Hazar çevresinin su varlığını sade bir madalyon içinde birleştirir. Amblem, dernek yazışmalarında, tabelalarda ve dijital mecralarda değiştirilmeden kullanılır.",
      },
      { type: "figure", src: "/logo-kucuk.png", caption: "Dernek amblemi" },
      { type: "h", text: "Kurum renkleri" },
      {
        type: "facts",
        items: [
          { label: "Koyu yeşil", value: "#00573F — ana renk, başlık ve menü" },
          { label: "Kiremit", value: "#9F2D00 — vurgu, çağrı butonları" },
          { label: "Toprak sarısı", value: "#956A1B — ikincil vurgu" },
          { label: "Kâğıt", value: "#F9F6F0 — sayfa zemini" },
        ],
      },
      { type: "h", text: "Dilimiz" },
      {
        type: "p",
        text: "Duyurularımızda abartısız, doğrudan ve herkesin anlayacağı bir dil kullanırız. Kişi adları tam yazılır, tarihler açık belirtilir, yapılmamış bir iş yapılmış gibi anlatılmaz.",
      },
    ],
  },

  /* -------------------------------------------------------------------- Köyümüz */
  {
    slug: "koyumuz/tarih",
    title: "Dörtbölük'ün Tarihi",
    group: "koyumuz",
    hero: "/assets/ortak/sonbahar-koy.webp",
    lead: "Eski adıyla Perdik: dağ eteğinde kurulmuş, dört bölüğe ayrılmış bir yerleşim.",
    blocks: [
      {
        type: "p",
        text: "Köyün eski adı Perdik'tir. Bugün kullanılan Dörtbölük adı, yerleşimin dört ayrı bölük hâlinde kümelenmiş yapısından gelir. Mezralar bu bölüklerin zamanla kendi adıyla anılır hâle gelmesiyle oluşmuştur.",
      },
      {
        type: "p",
        text: "Yerleşim, tarım ve hayvancılığa elverişli vadi tabanı ile yayla otlaklarının kesiştiği noktada kurulmuştur. Taş temelli, toprak damlı geleneksel evlerin bir bölümü hâlâ ayaktadır; bir bölümü ise betonarme yapılarla yenilenmiştir.",
      },
      {
        type: "p",
        text: "Köy hafızasının önemli bir kısmı yazılı değil, sözlüdür. Derneğimiz bu nedenle eski fotoğrafları, yer adlarını ve aile hikâyelerini kayda geçiren bir arşiv çalışması yürütüyor.",
      },
      {
        type: "figure",
        src: "/assets/animeler/koy-evi-agac.webp",
        caption: "Köy arşivinden bir kare",
      },
      { type: "cta", label: "Fotoğraf Arşivi", href: "/galeri" },
    ],
  },
  {
    slug: "koyumuz/bilgiler",
    title: "Köy Bilgileri",
    group: "koyumuz",
    hero: "/assets/animeler/vadi-panorama.webp",
    lead: "Konum, nüfus, geçim ve ulaşım hakkında temel bilgiler.",
    blocks: [
      {
        type: "facts",
        items: [
          { label: "İl / İlçe", value: "Elazığ / Sivrice" },
          { label: "Eski adı", value: "Perdik" },
          { label: "İlçe merkezine uzaklık", value: "15 km" },
          { label: "Hane sayısı", value: "70" },
          { label: "Yerleşik nüfus", value: "148" },
          { label: "Mezra sayısı", value: "6" },
          { label: "Başlıca geçim", value: "Arıcılık, hayvancılık, tarım" },
        ],
      },
      {
        type: "p",
        text: "Köy, Hazar Gölü çevresindeki yükseltilerin güney kesiminde yer alır. Kış aylarında yol koşulları zorlaşabilir; yaz aylarında ise köy nüfusu, ziyarete gelen hemşehrilerimizle birlikte belirgin biçimde artar.",
      },
      { type: "cta", label: "Harita ve Ulaşım", href: "/koyumuz/harita" },
    ],
  },
  {
    slug: "koyumuz/harita",
    title: "Harita ve Ulaşım",
    group: "koyumuz",
    hero: "/assets/bazi/sivrice-hazar.jpg",
    lead: "Köye nasıl gidilir, hangi yol hangi mevsimde kullanılır?",
    blocks: [
      { type: "figure", src: "/assets/bazi/harita.webp", caption: "Dörtbölük Köyü ve çevresi" },
      { type: "h", text: "Ulaşım" },
      {
        type: "ul",
        items: [
          "Elazığ merkezden Sivrice yönüne karayolu ile yaklaşık 60 dakika.",
          "Sivrice ilçe merkezinden köye 15 km; yolun tamamı araçla geçilebilir durumdadır.",
          "Mezra bağlantı yolları stabilizedir; kış aylarında kar nedeniyle kapanabilir.",
          "Toplu taşıma düzenli değildir; ziyaret öncesi köyden bilgi alınması önerilir.",
        ],
      },
      {
        type: "note",
        text: "Yol durumu, kar ve bakım çalışmalarına ilişkin güncel bilgiler mezra duyurularımızda paylaşılır.",
      },
      { type: "cta", label: "Yol Durumu Duyuruları", href: "/mezralar/yol-durumu" },
    ],
  },
  {
    slug: "koyumuz/nufus",
    title: "Hane ve Nüfus Bilgisi",
    group: "koyumuz",
    hero: "/assets/ortak/koy-agaclar.webp",
    lead: "Köyde ve mezralarda kim, nerede yaşıyor?",
    blocks: [
      {
        type: "p",
        text: "Dörtbölük merkez ve mezralarında toplam 70 hane, 148 yerleşik nüfus bulunmaktadır. Bu sayı yıl boyunca sabit değildir: yaz aylarında ziyarete gelen aileler ve mevsimlik dönüşlerle köy nüfusu birkaç katına çıkar.",
      },
      {
        type: "p",
        text: "Hane bilgileri, acil durumlarda iletişim zincirinin doğru işlemesi için derneğimiz tarafından düzenli olarak güncellenir. Köyde kalan haneler ve mezra sorumluları için ayrı bir irtibat listesi tutulur.",
      },
      {
        type: "note",
        text: "İletişim bilgileri yalnızca dernek içi koordinasyon amacıyla tutulur; üçüncü kişilerle paylaşılmaz.",
      },
      { type: "cta", label: "Mezralarımız", href: "/mezralar" },
    ],
  },
  {
    slug: "koyumuz/aricilik",
    title: "Arıcılık ve Üretim",
    group: "koyumuz",
    hero: "/assets/ortak/aricilik-kovanlar.webp",
    lead: "Köyün en bilinen üretimi: yüksek rakım balı.",
    blocks: [
      {
        type: "p",
        text: "Dörtbölük'te arıcılık, hem köyde kalan hanelerin başlıca geçim kaynağı hem de köyün dışarıya en çok bilinen yüzüdür. Yüksek rakımlı otlaklarda çiçeklenen bitki örtüsü, kısa ama verimli bir üretim dönemi sağlar.",
      },
      {
        type: "p",
        text: "Hayvancılık ve küçük ölçekli tarım da sürmektedir. Ceviz, dut ve meyve ağaçları çoğunlukla hane ihtiyacına yöneliktir; fazlası akrabalar arasında paylaşılır.",
      },
      {
        type: "gallery",
        images: [
          "/assets/bazi/bal.jpg",
          "/assets/albom/albom-01.jpg",
          "/assets/albom/albom-05.jpg",
          "/assets/ortak/tarlalar.webp",
        ],
        caption: "Köyden üretim kareleri",
      },
      {
        type: "note",
        text: "Doğrudan üreticiden alım yapmak isteyen hemşehrilerimiz için üretici iletişim rehberimiz hazırlanmaktadır.",
      },
    ],
  },
  {
    slug: "koyumuz/sss",
    title: "Sık Sorulanlar",
    group: "koyumuz",
    hero: "/assets/ortak/ilkbahar-yol.webp",
    lead: "Köy ve dernek hakkında en çok gelen sorular.",
    blocks: [
      { type: "h", text: "Köyün eski adı neydi?" },
      { type: "p", text: "Perdik. Dörtbölük adı, yerleşimin dört bölük hâlindeki yapısından gelir." },
      { type: "h", text: "Köye ne zaman gitmek uygun olur?" },
      {
        type: "p",
        text: "Haziran-Eylül arası hem yol koşulları hem de köydeki hareketlilik açısından en uygun dönemdir. Yaz buluşmamız da bu aylarda yapılır.",
      },
      { type: "h", text: "Derneğe üye olmak için köyde yaşamak gerekir mi?" },
      {
        type: "p",
        text: "Hayır. Köyle bağı olan, nerede yaşarsa yaşasın herkes üye olabilir. Üyelerimizin büyük bölümü şehirlerde yaşamaktadır.",
      },
      { type: "h", text: "Aidat zorunlu mu?" },
      {
        type: "p",
        text: "Aidat, üyelik hak ve yükümlülüklerinin bir parçasıdır; tutarı genel kurulda belirlenir. Ödeme güçlüğü olan üyelerimiz yönetim kuruluna başvurabilir.",
      },
      { type: "h", text: "Eski fotoğraflarımı arşive nasıl eklerim?" },
      {
        type: "p",
        text: "Fotoğrafı, çekildiği yıl ve karedeki kişilerin adlarıyla birlikte dernek iletişim kanallarımızdan iletmeniz yeterli. Aslını istemiyoruz; taranmış hâli yeterli.",
      },
      { type: "cta", label: "Bize Ulaşın", href: "/iletisim" },
    ],
  },

  /* ------------------------------------------------------------------ Mezralar */
  {
    slug: "mezralar",
    title: "Mezralarımız",
    group: "mezralar",
    hero: "/assets/ortak/genis-vadi.webp",
    lead: "Perdik Merkez ve altı mezra; her biri kendi hikâyesini taşıyan yerleşimler.",
    blocks: [
      {
        type: "p",
        text: "Dörtbölük tek bir yerleşim değil, birbirine yakın kümelerden oluşan bir köydür. Aşağıdaki yerleşimlerin her biri için ayrı bir sayfa ve fotoğraf albümü tutuyoruz.",
      },
      {
        type: "ul",
        items: [
          "Perdik Merkez — köyün merkez yerleşimi",
          "Suludere — su kaynağıyla anılan mezra",
          "Cellatlar — vadi içinde kurulu yerleşim",
          "Haraba — meyve ağaçlarıyla çevrili mezra",
          "Delolar — yayla otlaklarına en yakın yerleşim",
          "Kaldırım — köy yolunun üzerindeki mezra",
          "Gedik — aşağı ve yukarı köy olarak ikiye ayrılır",
        ],
      },
      {
        type: "gallery",
        images: [
          "/assets/mezralar/perdik-merkez/perdik-009.jpg",
          "/assets/mezralar/cellatlar/cellatlar-103.webp",
          "/assets/mezralar/delolar/delolar-002.jpg",
          "/assets/mezralar/haraba/haraba-005.jpg",
          "/assets/mezralar/kaldirim/kaldirim-008.jpg",
          "/assets/mezralar/gedik/yukari-koy/gedik-yukari-002.jpg",
        ],
        caption: "Mezralarımızdan kareler",
      },
    ],
  },
  {
    slug: "mezralar/perdik-merkez",
    title: "Perdik Merkez",
    group: "mezralar",
    hero: "/assets/ortak/cami-ve-agac.webp",
    heroPosition: "center 32%",
    lead: "Köyün merkez yerleşimi; okul, cami ve meydan buradadır.",
    blocks: [
      {
        type: "p",
        text: "Köyün eski adını taşıyan merkez yerleşim, ortak yaşamın toplandığı yerdir. Okul binası, cami ve köy meydanı burada bulunur; muhtarlık işleri de buradan yürütülür.",
      },
      {
        type: "p",
        text: "Yaz aylarında düzenlenen buluşmalar ve bayram ziyaretleri çoğunlukla merkez meydanda yapılır. Köye açılacak canlı yayın kamerası için de bu nokta planlanmaktadır.",
      },
      {
        type: "gallery",
        images: mezraPhotos("perdik-merkez", "perdik", [9, 10, 1, 11, 8, 12, 3, 5]),
        caption: "Perdik Merkez albümü",
      },
    ],
  },
  {
    slug: "mezralar/suludere",
    title: "Suludere",
    group: "mezralar",
    hero: "/assets/ortak/yesil-cayir.webp",
    lead: "Adını taşıdığı su kaynağıyla anılan mezra.",
    blocks: [
      {
        type: "p",
        text: "Suludere, adını yerleşimin kurulduğu derenin bol suyundan alır. Hayvancılık için elverişli otlaklara yakınlığı, mezranın uzun yıllar yerleşik kalmasını sağlamıştır.",
      },
      {
        type: "note",
        text: "Fotoğraf arşivimizde Suludere'ye ait ayrı bir albüm henüz bulunmuyor. Elinde Suludere'den kare olan hemşehrilerimizin katkısını bekliyoruz — fotoğrafı, çekildiği yıl ve karedeki kişilerin adlarıyla iletmeniz yeterli.",
      },
      { type: "cta", label: "Arşive Fotoğraf Gönderin", href: "/iletisim/mesaj" },
    ],
  },
  {
    slug: "mezralar/cellatlar",
    title: "Cellatlar",
    group: "mezralar",
    hero: "/assets/mezralar/cellatlar/cellatlar-103.webp",
    lead: "Vadi içinde, ağaçlarla çevrili kurulmuş yerleşim.",
    blocks: [
      {
        type: "p",
        text: "Cellatlar, vadi tabanına yakın konumu sayesinde köyün en yeşil kesimlerinden biridir. Evler yamaca yaslanacak biçimde sıralanmış, aralarında meyve bahçeleri kalmıştır.",
      },
      {
        type: "gallery",
        images: mezraPhotos("cellatlar", "cellatlar", [103, 118, 119, 111, 113, 116, 102, 120], "webp"),
        caption: "Cellatlar albümü",
      },
    ],
  },
  {
    slug: "mezralar/haraba",
    title: "Haraba",
    group: "mezralar",
    hero: "/assets/ortak/sonbahar-koy.webp",
    lead: "Meyve ağaçlarıyla çevrili, sonbaharda rengiyle tanınan mezra.",
    blocks: [
      {
        type: "p",
        text: "Haraba, vadi boyunca uzanan meyve ağaçlarıyla tanınır. Sonbaharda yaprakların aldığı renk, köyün en çok fotoğraflanan manzaralarından birini oluşturur.",
      },
      {
        type: "p",
        text: "Mezraya giden yol üzerindeki geçiş noktasında, kış aylarında sorun yaşanan menfezin yenilenmesi için ilgili kurumlara başvurulmuştur.",
      },
      {
        type: "gallery",
        images: mezraPhotos("haraba", "haraba", [5, 4, 3, 2, 9, 8, 1, 6]),
        caption: "Haraba albümü",
      },
    ],
  },
  {
    slug: "mezralar/delolar",
    title: "Delolar",
    group: "mezralar",
    hero: "/assets/animeler/cayir-daglar.webp",
    lead: "Yayla otlaklarına en yakın yerleşim.",
    blocks: [
      {
        type: "p",
        text: "Delolar, yükselti bakımından köyün üst kesiminde yer alır ve yayla otlaklarına en yakın mezradır. Hayvancılıkla uğraşan hanelerin yoğunlaştığı yerleşimdir.",
      },
      {
        type: "p",
        text: "Mezra sakinlerinin talebiyle ortak toplanma alanının çevre düzenlemesi için gönüllü bir çalışma ekibi oluşturulmuştur.",
      },
      {
        type: "gallery",
        images: mezraPhotos("delolar", "delolar", [2, 3, 1, 5, 11, 8, 6, 9]),
        caption: "Delolar albümü",
      },
    ],
  },
  {
    slug: "mezralar/kaldirim",
    title: "Kaldırım",
    group: "mezralar",
    hero: "/assets/ortak/ilkbahar-yol.webp",
    lead: "Köy yolunun üzerinde, geliş gidişin ilk uğrağı.",
    blocks: [
      {
        type: "p",
        text: "Kaldırım, köye giden yolun üzerinde yer aldığı için gelen gidenin ilk uğradığı yerleşimdir. Yol bakım çalışmalarında öncelikli güzergâhlardandır.",
      },
      {
        type: "p",
        text: "Yaz dönemi öncesinde içme suyu hattının kontrolü ve gerekli onarımları için çalışma takvimi çıkarılmıştır.",
      },
      {
        type: "gallery",
        images: mezraPhotos("kaldirim", "kaldirim", [8, 5, 6, 9, 12, 11, 1, 2]),
        caption: "Kaldırım albümü",
      },
    ],
  },
  {
    slug: "mezralar/gedik-asagi",
    title: "Gedik (Aşağı Köy)",
    group: "mezralar",
    hero: "/assets/ortak/tarlalar.webp",
    lead: "Gedik'in alt kesimi; geniş tarım arazileriyle çevrili.",
    blocks: [
      {
        type: "p",
        text: "Gedik, aşağı ve yukarı köy olarak iki kesimde yerleşmiştir. Aşağı köy, geniş tarım arazilerine yakınlığı ve düz zemini sayesinde ulaşımı daha kolay olan kesimdir.",
      },
      {
        type: "gallery",
        images: mezraPhotos("gedik/asagi-koy", "gedik-asagi", [1, 6, 12, 10, 3, 5, 9, 2]),
        caption: "Gedik (Aşağı Köy) albümü",
      },
    ],
  },
  {
    slug: "mezralar/gedik-yukari",
    title: "Gedik (Yukarı Köy)",
    group: "mezralar",
    hero: "/assets/ortak/genis-vadi.webp",
    lead: "Gedik'in üst kesimi; vadiye hâkim manzarasıyla bilinir.",
    blocks: [
      {
        type: "p",
        text: "Yukarı köy, vadiye hâkim konumu sayesinde köyün en geniş manzarasına sahiptir. Yerleşim, yamaç boyunca kademeli olarak sıralanmıştır.",
      },
      {
        type: "gallery",
        images: mezraPhotos("gedik/yukari-koy", "gedik-yukari", [2, 1, 6, 5, 3, 8, 10, 4]),
        caption: "Gedik (Yukarı Köy) albümü",
      },
    ],
  },
  {
    slug: "mezralar/yol-durumu",
    title: "Yol Durumu",
    group: "mezralar",
    hero: "/assets/animeler/koy-yamac.webp",
    lead: "Köy ve mezra yollarına ilişkin güncel bilgilendirmeler.",
    blocks: [
      {
        type: "p",
        text: "Köy ana yolu yıl boyunca araçla geçilebilir durumdadır. Mezra bağlantı yolları stabilize olduğundan, yoğun yağış ve kar dönemlerinde geçici olarak kapanabilir.",
      },
      { type: "h", text: "Mevsimlik durum" },
      {
        type: "ul",
        items: [
          "Aralık – Mart: Delolar ve Gedik yukarı köy bağlantıları karla kapanabilir.",
          "Nisan – Mayıs: Kar erimesi nedeniyle stabilize yollarda bozulma görülebilir.",
          "Haziran – Ekim: Tüm mezra yolları araçla geçilebilir durumdadır.",
        ],
      },
      {
        type: "note",
        text: "Yola çıkmadan önce köyden bilgi almanız önerilir. Suludere, Cellatlar, Haraba, Delolar, Kaldırım ve Gedik bağlantılarında bakım noktalarının belirlenmesi için keşif çalışması planlanmıştır.",
      },
      { type: "cta", label: "Mezra Duyuruları", href: "/mezralar/duyurular" },
    ],
  },
  {
    slug: "mezralar/duyurular",
    title: "Mezra Duyuruları",
    group: "mezralar",
    hero: "/assets/bazi/tabela.jpg",
    lead: "Mezralarımızı ilgilendiren çalışma ve bilgilendirmeler.",
    blocks: [
      { type: "h", text: "Mezra yolları için keşif yapılacak" },
      {
        type: "p",
        text: "Suludere, Cellatlar, Haraba, Delolar, Kaldırım ve Gedik bağlantılarında bakım gerektiren noktalar yerinde tespit edilecek ve ilgili kurumlara iletilecektir.",
      },
      { type: "h", text: "Acil durum irtibat listesi yenileniyor" },
      {
        type: "p",
        text: "Köyde kalan haneler ve mezra sorumluları için iletişim zinciri güncel bilgilerle yeniden düzenleniyor. Bilgisi değişen hemşehrilerimizin derneğe ulaşması rica olunur.",
      },
      { type: "h", text: "Köy içi temizlik çalışması planlandı" },
      {
        type: "p",
        text: "Ortak kullanım alanları ve çeşme çevreleri için gönüllü çalışma programı oluşturuldu. Katılmak isteyenler dernek iletişim kanallarından kayıt yaptırabilir.",
      },
      { type: "cta", label: "Tüm Haberler", href: "/haberler" },
    ],
  },

  /* --------------------------------------------------------------- Faaliyetler */
  {
    slug: "faaliyetler",
    title: "Faaliyetlerimiz",
    group: "faaliyetler",
    hero: "/assets/eski/ortak-sofra.webp",
    lead: "Ziyaretler, buluşmalar, dayanışma ve eğitim destekleri.",
    blocks: [
      {
        type: "p",
        text: "Derneğimizin faaliyetleri dört başlıkta toplanır: köy ziyaretleri, sosyal dayanışma, kültürel buluşmalar ve eğitim destekleri. Her faaliyet yönetim kurulunda karara bağlanır ve raporlanır.",
      },
      {
        type: "gallery",
        images: [
          "/assets/eski/koy-bulusmasi.webp",
          "/assets/eski/ortak-sofra.webp",
          "/assets/eski/koy-ziyareti.webp",
          "/assets/eski/dernek-onunde-toplu.webp",
        ],
        caption: "Dernek faaliyetlerinden kareler",
      },
      { type: "cta", label: "Faaliyet Raporları", href: "/faaliyetler/raporlar" },
    ],
  },
  {
    slug: "faaliyetler/ziyaretler",
    title: "Köy Ziyaretleri",
    group: "faaliyetler",
    hero: "/assets/eski/koy-ziyareti.webp",
    lead: "Yönetim kurulumuz köyü düzenli olarak yerinde ziyaret eder.",
    blocks: [
      {
        type: "p",
        text: "Yönetim kurulumuz, köyün önceliklerini masa başında değil yerinde belirlemek için düzenli ziyaretler yapar. Ziyaretlerde köyde kalan hanelerle, muhtarlıkla ve mezra sorumlularıyla görüşülür.",
      },
      {
        type: "p",
        text: "Son ziyarette öncelikli ihtiyaçlar, yol çalışmaları ve yeni dönem faaliyet takvimi hemşehrilerimizle birlikte değerlendirilmiştir.",
      },
      {
        type: "gallery",
        images: ["/assets/eski/koy-ziyareti.webp", "/assets/eski/koy-bulusmasi.webp", "/assets/eski/dernek-onunde-toplu.webp"],
        caption: "Ziyaretlerden kareler",
      },
    ],
  },
  {
    slug: "faaliyetler/yaz-bulusmasi",
    title: "Yaz Buluşması",
    group: "faaliyetler",
    hero: "/assets/eski/ortak-sofra.webp",
    lead: "Yılda bir kez, köy meydanında herkesin bir araya geldiği gün.",
    blocks: [
      {
        type: "p",
        text: "Yaz buluşması, derneğimizin en geniş katılımlı etkinliğidir. Köy meydanında kurulan sofra, yıl içinde ancak telefonla görüşebilen hemşehrilerimizi bir araya getirir.",
      },
      { type: "h", text: "Bu yılki hazırlıklar" },
      {
        type: "p",
        text: "Köy meydanında yapılması planlanan buluşma için ulaşım ve görev paylaşımı taslak programı hazırlandı. Kesin tarih, yol ve hava koşulları değerlendirildikten sonra duyurulacaktır.",
      },
      {
        type: "ul",
        items: [
          "Ulaşım: şehirlerden ortak araç düzenlemesi planlanıyor.",
          "Görev paylaşımı: kadın ve gençlik kollarımız koordinasyonu üstlenecek.",
          "Program: sabah köy gezisi, öğle ortak sofra, ikindi istişare toplantısı.",
        ],
      },
      { type: "cta", label: "Duyuruları Takip Edin", href: "/haberler/dernek" },
    ],
  },
  {
    slug: "faaliyetler/taziye",
    title: "Taziye ve Dayanışma",
    group: "faaliyetler",
    hero: "/assets/eski/koy-bulusmasi.webp",
    lead: "Acı günde yan yana olmak, derneğin en eski işidir.",
    blocks: [
      {
        type: "p",
        text: "Derneğimizin kuruluşundan önce de var olan tek şey vardı: bir hemşehrimizin vefatında haberin herkese ulaşması ve taziyede yan yana olunması. Bu geleneği kurumsal bir düzene kavuşturduk.",
      },
      { type: "h", text: "Nasıl işler?" },
      {
        type: "ul",
        items: [
          "Vefat haberi, dernek iletişim zinciri üzerinden aynı gün duyurulur.",
          "Taziye yeri ve zamanı, aileyle görüşülerek paylaşılır.",
          "Şehir dışından katılacaklar için ortak ulaşım düzenlenir.",
          "İhtiyaç hâlinde dayanışma desteği yönetim kurulunda görüşülür.",
        ],
      },
      {
        type: "note",
        text: "Vefat ve taziye duyurularının size ulaşması için iletişim bilgilerinizin güncel olması önemlidir.",
      },
      { type: "cta", label: "İletişim Bilgilerinizi Güncelleyin", href: "/iletisim/mesaj" },
    ],
  },
  {
    slug: "faaliyetler/egitim-destegi",
    title: "Eğitim Destekleri",
    group: "faaliyetler",
    hero: "/assets/animeler/okul.webp",
    heroPosition: "center 20%",
    lead: "Köyümüzden üniversite öğrenimi gören gençlerimize destek.",
    blocks: [
      {
        type: "p",
        text: "Köyümüzden üniversite öğrenimi gören gençlerimize yönelik destek programımızın başvuruları açıldı. Program, dernek bütçesi ve gönüllü bağışlarla yürütülür.",
      },
      { type: "h", text: "Başvuru koşulları" },
      {
        type: "ul",
        items: [
          "Dörtbölük Köyü veya mezralarından bir aileye mensup olmak",
          "Örgün öğretimde kayıtlı öğrenci olmak",
          "Öğrenci belgesi ve iletişim bilgileriyle başvurmak",
        ],
      },
      {
        type: "note",
        text: "Başvurular yönetim kurulunda değerlendirilir; öğrenci bilgileri gizli tutulur ve kamuya açıklanmaz.",
      },
      { type: "cta", label: "Başvuru İçin İletişim", href: "/iletisim" },
    ],
  },
  {
    slug: "faaliyetler/raporlar",
    title: "Faaliyet Raporları",
    group: "faaliyetler",
    hero: "/assets/eski/resmi-ziyaret.webp",
    heroPosition: "center 40%",
    lead: "Yapılan işlerin ve harcamaların yazılı dökümü.",
    blocks: [
      {
        type: "p",
        text: "Her faaliyet dönemi sonunda, yapılan işlerin ve harcamaların dökümünü içeren bir rapor hazırlanır. Rapor önce denetim kurulunun incelemesinden geçer, ardından genel kurulun bilgisine sunulur.",
      },
      { type: "h", text: "Raporlarda yer alan başlıklar" },
      {
        type: "ul",
        items: [
          "Dönem içinde yapılan ziyaret ve etkinlikler",
          "Aidat tahsilatı ve bağış gelirleri",
          "Yapılan harcamalar ve karşılıkları",
          "Kurul toplantıları ve alınan kararlar",
          "Sonraki dönem için öneriler",
        ],
      },
      {
        type: "note",
        text: "Dönem raporunun yazılı örneğini talep eden üyelerimize dernek sekreterliğimiz iletir.",
      },
      { type: "cta", label: "Denetim Kurulu", href: "/yonetim#denetim-kurulu" },
    ],
  },

  /* ------------------------------------------------------------------ Haberler */
  {
    slug: "haberler",
    title: "Tüm Haberler",
    group: "haberler",
    hero: "/assets/eski/dernek-onunde-toplu.webp",
    heroPosition: "center 38%",
    lead: "Dernekten, muhtarlıktan ve köyden güncel gelişmeler.",
    blocks: [
      {
        type: "p",
        text: "Haberlerimizi üç başlıkta topluyoruz: derneğin kendi çalışmaları, muhtarlık kaynaklı köy duyuruları ve Dörtbölük çevresinden genel gelişmeler.",
      },
      { type: "cta", label: "Dernekten Haberler", href: "/haberler/dernek" },
      { type: "cta", label: "Muhtarlıktan Haberler", href: "/haberler/muhtarlik" },
      { type: "cta", label: "Dörtbölük'ten Haberler", href: "/haberler/koy" },
    ],
  },
  {
    slug: "haberler/dernek",
    title: "Dernekten Haberler",
    group: "haberler",
    hero: "/assets/eski/koy-ziyareti.webp",
    lead: "Yönetim kurulumuzun çalışmaları ve dernek duyuruları.",
    blocks: [
      { type: "h", text: "Yaz Buluşması hazırlıkları başladı" },
      {
        type: "p",
        text: "Köy meydanında yapılması planlanan buluşma için ulaşım ve görev paylaşımı taslak programı hazırlandı.",
      },
      { type: "h", text: "Yönetim kurulu köy ziyaretini tamamladı" },
      {
        type: "p",
        text: "Öncelikli ihtiyaçlar, yol çalışmaları ve yeni dönem faaliyet takvimi hemşehrilerimizle değerlendirildi.",
      },
      { type: "h", text: "Köy arşivi için fotoğraf çağrısı" },
      {
        type: "p",
        text: "Aile albümlerindeki eski kareler, tarih ve kişi bilgileriyle dijital arşivimize ekleniyor.",
      },
      { type: "h", text: "Yeni dönem görev dağılımı yayımlandı" },
      {
        type: "p",
        text: "Yönetim, denetim ve istişare kurullarımızın görev dağılımı üyelerimizin bilgisine sunuldu.",
      },
      { type: "cta", label: "Yönetim Şeması", href: "/yonetim#sema" },
    ],
  },
  {
    slug: "haberler/muhtarlik",
    title: "Muhtarlıktan Haberler",
    group: "haberler",
    hero: "/assets/ortak/koy-agaclar.webp",
    lead: "Köy yönetiminden gelen bilgilendirmeler.",
    blocks: [
      { type: "h", text: "Mezra yolları için keşif yapılacak" },
      {
        type: "p",
        text: "Suludere, Cellatlar, Haraba, Delolar, Kaldırım ve Gedik bağlantılarında bakım noktaları belirlenecek.",
      },
      { type: "h", text: "Acil durum irtibat listesi yenileniyor" },
      {
        type: "p",
        text: "Köyde kalan haneler ve mezra sorumluları için iletişim zinciri güncel bilgilerle yeniden düzenleniyor.",
      },
      { type: "h", text: "Köy içi temizlik çalışması planlandı" },
      {
        type: "p",
        text: "Ortak kullanım alanları ve çeşme çevreleri için gönüllü çalışma programı oluşturuldu.",
      },
      { type: "cta", label: "Yol Durumu", href: "/mezralar/yol-durumu" },
    ],
  },
  {
    slug: "haberler/koy",
    title: "Dörtbölük'ten Haberler",
    group: "haberler",
    hero: "/assets/ortak/aricilik-kovanlar.webp",
    lead: "Köyden ve çevresinden genel gelişmeler.",
    blocks: [
      { type: "h", text: "Köy balı üretici rehberi güncelleniyor" },
      {
        type: "p",
        text: "Arıcılıkla uğraşan haneler için doğrudan üreticiye ulaşılabilecek yeni iletişim rehberi hazırlanıyor.",
      },
      { type: "h", text: "Sivrice ve Hazar çevresinden yaz notları" },
      {
        type: "p",
        text: "Bölgedeki etkinlikler, ulaşım bilgileri ve yaz dönemine ilişkin kısa haberler bir araya getirildi.",
      },
      { type: "h", text: "Dörtbölük albümüne yeni kareler eklendi" },
      {
        type: "p",
        text: "Köy yaşamından mevsimlik görüntüler ve ziyaret fotoğrafları arşiv sayfasında yayımlandı.",
      },
      { type: "cta", label: "Fotoğraf Arşivi", href: "/galeri" },
    ],
  },

  /* ----------------------------------------------------------------- Başkandan */
  {
    slug: "baskandan/birlik-ve-dayanisma",
    title: "Birlik ve Dayanışma",
    group: "baskandan",
    hero: "/assets/eski/dernek-onunde-toplu.webp",
    heroPosition: "center 38%",
    lead: "Başkanımız Orhan Akyürek'in dayanışma üzerine mesajı.",
    blocks: [
      {
        type: "p",
        text: "Köyümüzden ayrılalı yıllar oldu; kimimiz Elazığ'da, kimimiz İstanbul'da, kimimiz yurt dışında. Ama bir vefat haberi geldiğinde hepimizin telefonu aynı anda çalıyor. Bu, kendiliğinden olan bir şey değil — birilerinin kurduğu ve sürdürdüğü bir bağ.",
      },
      {
        type: "p",
        text: "Derneğimizin işi bu bağı kurumsallaştırmak. Kimsenin hatırına kalmadan, kimseyi unutmadan işleyen bir düzen kurmak. Taziyeden yol bakımına, eğitim desteğinden köy arşivine kadar yaptığımız her iş bunun parçası.",
      },
      {
        type: "p",
        text: "Köyümüzün değerlerini koruyarak dayanışmayı büyütmek, gençlerimize yaşayan bir Dörtbölük bırakmak için çalışıyoruz. Katkısı olan herkese teşekkür ederim.",
      },
      { type: "cta", label: "Yönetim ve Kurullarımız", href: "/yonetim" },
    ],
  },
  {
    slug: "baskandan/yeni-donem-hedefleri",
    title: "Yeni Dönem Hedefleri",
    group: "baskandan",
    hero: "/assets/eski/koy-bulusmasi.webp",
    lead: "Önümüzdeki dönemde önceliklendirdiğimiz başlıklar.",
    blocks: [
      {
        type: "p",
        text: "Yeni dönemde beş başlığı önceliklendirdik. Bunlar yönetim kurulunda tartışıldı, istişare kurulunun görüşü alındı ve genel kurulun bilgisine sunuldu.",
      },
      {
        type: "ul",
        items: [
          "Köy arşivi — eski fotoğrafların ve sözlü hafızanın dijital olarak kayda geçirilmesi",
          "Canlı yayın — köy meydanı ve dernek toplantıları için yayın altyapısının kurulması",
          "Yol ve altyapı — mezra bağlantı yollarında bakım noktalarının tespiti ve takibi",
          "Eğitim desteği — üniversite öğrencilerimize yönelik programın düzenli hâle getirilmesi",
          "Mali şeffaflık — dönem raporlarının üyelerimize sistematik biçimde ulaştırılması",
        ],
      },
      { type: "cta", label: "Faaliyet Raporları", href: "/faaliyetler/raporlar" },
    ],
  },
  {
    slug: "baskandan/gurbetteki-hemsehrilerimize",
    title: "Gurbetteki Hemşehrilerimize",
    group: "baskandan",
    hero: "/assets/animeler/cayir-daglar.webp",
    lead: "Köyden uzakta yaşayan hemşehrilerimize.",
    blocks: [
      {
        type: "p",
        text: "Köyden uzakta yaşamak, köyle bağı koparmak zorunda değil. Bunu en iyi, yılda bir kez de olsa köye gelen ve gelir gelmez her şeyi yerli yerinde bulan hemşehrilerimiz bilir.",
      },
      {
        type: "p",
        text: "Sizden istediğimiz büyük şeyler değil: iletişim bilgilerinizin güncel olması, duyurularımızı takip etmeniz, elinizdeki eski fotoğrafları arşivimize göndermeniz. Aidatınız da elbette önemli — ama bağ, aidattan önce haberdar olmakla kurulur.",
      },
      {
        type: "p",
        text: "Köye açacağımız canlı yayın da tam bu yüzden gündemimizde. Uzakta olsanız da köyün meydanını görebilmeniz, bizim için sembolik değil gerçek bir hedef.",
      },
      { type: "cta", label: "İletişim Bilgilerinizi İletin", href: "/iletisim/mesaj" },
    ],
  },
  {
    slug: "baskandan/aylik-bilgilendirme",
    title: "Aylık Bilgilendirme",
    group: "baskandan",
    hero: "/assets/ortak/tarlalar.webp",
    lead: "Her ay, o ay ne yaptığımızın kısa dökümü.",
    blocks: [
      {
        type: "p",
        text: "Üyelerimizin derneği takip etmek için toplantı beklemesine gerek kalmasın diye, her ay kısa bir bilgilendirme yayımlıyoruz. Bilgilendirme dört soruya cevap verir: ne yapıldı, ne harcandı, ne planlandı, kimden katkı bekleniyor.",
      },
      { type: "h", text: "Bu ayın başlıkları" },
      {
        type: "ul",
        items: [
          "Yaz buluşması için ulaşım ve görev paylaşımı taslağı hazırlandı.",
          "Köy arşivi çağrısına gelen fotoğraflar tasnif edildi.",
          "Mezra yolları keşif çalışması için takvim belirlendi.",
          "Eğitim desteği başvuruları açıldı.",
        ],
      },
      { type: "cta", label: "Toplantı Notları", href: "/baskandan/toplanti-notlari" },
    ],
  },
  {
    slug: "baskandan/toplanti-notlari",
    title: "Toplantı Notları",
    group: "baskandan",
    hero: "/assets/eski/resmi-ziyaret.webp",
    heroPosition: "center 40%",
    lead: "Kurul toplantılarında görüşülenlerin özeti.",
    blocks: [
      {
        type: "p",
        text: "Yönetim kurulu toplantılarında görüşülen konular ve alınan kararlar, kişisel bilgiler çıkarılarak üyelerimizin bilgisine sunulur. Amaç, kararların nasıl alındığının görünür olmasıdır.",
      },
      { type: "h", text: "Son toplantıda görüşülenler" },
      {
        type: "ul",
        items: [
          "Yaz buluşması tarihinin yol ve hava koşullarına göre belirlenmesi",
          "Köy arşivi için gelen fotoğrafların tasnif usulü",
          "Mezra yolları keşif çalışmasında görevlendirme",
          "Eğitim desteği başvuru koşullarının netleştirilmesi",
          "Canlı yayın altyapısı için maliyet araştırması yapılması",
        ],
      },
      {
        type: "note",
        text: "Toplantı notları özet niteliğindedir; resmî karar metinleri dernek defterinde tutulur.",
      },
      { type: "cta", label: "Aylık Bilgilendirme", href: "/baskandan/aylik-bilgilendirme" },
    ],
  },

  /* --------------------------------------------------------------- Canlı Yayın */
  {
    slug: "canli/koy",
    title: "Köyü Canlı İzle",
    group: "canli",
    status: "soon",
    hero: "/assets/ortak/cami-ve-agac.webp",
    heroPosition: "center 32%",
    lead: "Köy meydanına kurulacak kamera ile Dörtbölük'ü anlık izleyebileceksiniz.",
    blocks: [
      {
        type: "p",
        text: "Perdik Merkez'deki köy meydanına yerleştirilecek kamera, gurbetteki hemşehrilerimizi köyün gündelik hayatına yeniden bağlayacak. Yayın, gün ışığı boyunca kesintisiz ve sessiz olarak erişime açık olacak.",
      },
      { type: "h", text: "Hangi aşamadayız?" },
      {
        type: "ul",
        items: [
          "Kamera konumu belirlendi — köy meydanı, cami ve okul cephesini görecek açı.",
          "İnternet altyapısı için maliyet araştırması yapılıyor.",
          "Elektrik ve montaj işleri için köyden gönüllü ekip oluşturuldu.",
          "Yayın platformu ve erişim yöntemi yönetim kurulunda görüşülüyor.",
        ],
      },
    ],
  },
  {
    slug: "canli/dernek",
    title: "Derneği Canlı İzle",
    group: "canli",
    status: "soon",
    hero: "/assets/eski/dernek-onunde-toplu.webp",
    heroPosition: "center 38%",
    lead: "Toplantılara uzaktan katılabilmeniz için yayın altyapısı hazırlanıyor.",
    blocks: [
      {
        type: "p",
        text: "Yönetim kurulu toplantıları ve genel kurul oturumları, şehir dışındaki üyelerimizin de izleyebilmesi için canlı yayınlanacak. Böylece toplantıya katılamayan üyelerimiz gündemi eş zamanlı takip edebilecek.",
      },
      { type: "h", text: "Hangi aşamadayız?" },
      {
        type: "ul",
        items: [
          "Yayın yapılacak toplantı türleri belirlendi.",
          "Kayıt ve arşivleme usulü için tüzük uyumu inceleniyor.",
          "Ses ve görüntü donanımı için teklif toplanıyor.",
          "Üyelere özel erişim yöntemi değerlendiriliyor.",
        ],
      },
    ],
  },
  {
    slug: "canli/baskan",
    title: "Başkan Canlı Yayını",
    group: "canli",
    status: "soon",
    hero: "/assets/eski/resmi-ziyaret.webp",
    heroPosition: "center 40%",
    lead: "Başkanımızın dönem değerlendirmelerini canlı izleyebileceksiniz.",
    blocks: [
      {
        type: "p",
        text: "Başkanımızın dönem değerlendirmeleri ve üyelerimizin sorularını yanıtlayacağı canlı yayınlar planlanıyor. Yayın öncesinde soru gönderebilmeniz için bir form açılacak.",
      },
      { type: "h", text: "Hangi aşamadayız?" },
      {
        type: "ul",
        items: [
          "Yayın sıklığı ve süresi için öneri hazırlandı.",
          "Soru toplama yöntemi belirleniyor.",
          "Teknik altyapı, dernek canlı yayın çalışmasıyla birlikte yürütülüyor.",
        ],
      },
    ],
  },
  {
    slug: "canli/gecmis",
    title: "Geçmiş Yayınlar",
    group: "canli",
    status: "soon",
    hero: "/assets/animeler/koy-yamac.webp",
    lead: "Yayınlar başladığında kayıtlar bu sayfada arşivlenecek.",
    blocks: [
      {
        type: "p",
        text: "Canlı yayınlar başladıktan sonra, izin verilen oturumların kayıtları tarih ve konu bilgisiyle bu sayfada arşivlenecek. Böylece yayını kaçıran üyelerimiz sonradan izleyebilecek.",
      },
      {
        type: "note",
        text: "Kayıtların hangi oturumlar için tutulacağı ve ne kadar süre saklanacağı, tüzük uyumu incelendikten sonra netleşecektir.",
      },
    ],
  },
  {
    slug: "canli/takvim",
    title: "Yayın Takvimi",
    group: "canli",
    status: "soon",
    hero: "/assets/animeler/cayir-daglar.webp",
    lead: "Planlanan yayınların tarih ve saatleri burada duyurulacak.",
    blocks: [
      {
        type: "p",
        text: "Yayın altyapısı tamamlandığında, planlanan canlı yayınların tarih ve saatleri bu sayfada önceden duyurulacak. Takvim, toplantı gündemleriyle birlikte güncellenecek.",
      },
      {
        type: "note",
        text: "Yayın duyurularının size ulaşması için iletişim bilgilerinizin güncel olması yeterlidir.",
      },
    ],
  },

  /* ------------------------------------------------------------------ İletişim */
  {
    slug: "iletisim",
    title: "İletişim Bilgileri",
    group: "iletisim",
    hero: "/assets/ortak/tepeler.webp",
    lead: "Derneğimize ulaşmanın yolları.",
    blocks: [
      {
        type: "facts",
        items: [
          { label: "Adres", value: "Dörtbölük Köyü, Sivrice / Elazığ" },
          { label: "E-posta", value: "iletisim@dortbolukkoyu.org" },
          { label: "Çalışma saatleri", value: "Hafta içi 09.00 – 18.00" },
          { label: "Yazışma dili", value: "Türkçe" },
        ],
      },
      {
        type: "p",
        text: "Üyelik, aidat, taziye duyuruları, arşiv katkısı ve faaliyet önerileriniz için bize yazabilirsiniz. Yazılı başvurular yönetim kurulunun ilk toplantısında değerlendirilir.",
      },
      { type: "cta", label: "Mesaj Gönderin", href: "/iletisim/mesaj" },
    ],
  },
  {
    slug: "iletisim/konum",
    title: "Konum ve Yol Tarifi",
    group: "iletisim",
    hero: "/assets/bazi/sivrice-hazar.jpg",
    lead: "Dörtbölük Köyü'ne nasıl gidilir?",
    blocks: [
      { type: "figure", src: "/assets/bazi/harita.webp", caption: "Dörtbölük Köyü ve çevresi" },
      { type: "h", text: "Yol tarifi" },
      {
        type: "ul",
        items: [
          "Elazığ merkezden Sivrice yönüne ilerleyin (yaklaşık 60 dakika).",
          "Sivrice ilçe merkezinden köy yoluna dönün; köye 15 km kalmıştır.",
          "Köy tabelasından sonra merkez yerleşim (Perdik Merkez) yaklaşık 2 km ileridedir.",
          "Mezralara ulaşım, merkez yerleşimden ayrılan stabilize yollarla sağlanır.",
        ],
      },
      { type: "cta", label: "Yol Durumu", href: "/mezralar/yol-durumu" },
    ],
  },
  {
    slug: "iletisim/mesaj",
    title: "Mesaj Gönderin",
    group: "iletisim",
    hero: "/assets/eski/koy-bulusmasi.webp",
    lead: "Görüş, öneri, arşiv katkısı ve bilgi güncellemeleri için.",
    blocks: [
      {
        type: "p",
        text: "Aşağıdaki başlıklarda bize yazabilirsiniz. Mesajınıza dernek sekreterliğimiz en geç bir hafta içinde döner.",
      },
      {
        type: "ul",
        items: [
          "İletişim bilgisi güncelleme — adres, telefon veya e-posta değişikliği",
          "Arşiv katkısı — eski fotoğraf, belge veya sözlü hafıza aktarımı",
          "Faaliyet önerisi — etkinlik, dayanışma veya çalışma önerileri",
          "Üyelik ve aidat — başvuru, sorgu ve ödeme soruları",
          "Taziye bildirimi — vefat haberinin iletişim zincirine iletilmesi",
        ],
      },
      {
        type: "facts",
        items: [
          { label: "E-posta", value: "iletisim@dortbolukkoyu.org" },
          { label: "Adres", value: "Dörtbölük Köyü, Sivrice / Elazığ" },
        ],
      },
      {
        type: "note",
        text: "Çevrim içi mesaj formumuz hazırlanıyor. Bu süreçte e-posta ile ulaşabilirsiniz.",
      },
    ],
  },
  {
    slug: "iletisim/uyelik-basvurusu",
    title: "Üyelik Başvurusu",
    group: "iletisim",
    hero: "/assets/eski/dernek-acilis.jpg",
    heroPosition: "center 38%",
    lead: "Derneğe üye olmak için izlenecek adımlar.",
    blocks: [
      { type: "h", text: "Başvuru adımları" },
      {
        type: "ul",
        items: [
          "Ad, soyad, doğum yılı ve köyle bağınızı belirten bilgileri hazırlayın.",
          "Güncel adres, telefon ve e-posta bilgilerinizi ekleyin.",
          "Bilgileri dernek e-posta adresine gönderin.",
          "Başvurunuz ilk yönetim kurulu toplantısında değerlendirilir.",
          "Kabul edilen üyelere üye numarası ve aidat bilgisi iletilir.",
        ],
      },
      {
        type: "note",
        text: "Kişisel bilgileriniz yalnızca dernek işleyişi için kullanılır, üçüncü kişilerle paylaşılmaz.",
      },
      { type: "cta", label: "Üyelik Bilgileri", href: "/hakkimizda/uyelik" },
    ],
  },
  {
    slug: "iletisim/sosyal-medya",
    title: "Sosyal Medya",
    group: "iletisim",
    hero: "/assets/animeler/yesil-tepeler.webp",
    lead: "Derneğimizi sosyal ağlardan da takip edebilirsiniz.",
    blocks: [
      {
        type: "p",
        text: "Duyurularımızı, fotoğraf paylaşımlarımızı ve etkinlik çağrılarımızı sosyal medya hesaplarımızdan da yayımlıyoruz. Hesaplarımız dernek yönetimi adına basın ve medya sorumlumuz tarafından yürütülür.",
      },
      {
        type: "ul",
        items: [
          "Facebook — fotoğraf albümleri ve etkinlik duyuruları",
          "Instagram — köy ve mezralardan güncel kareler",
          "YouTube — tanıtım videoları ve ileride canlı yayın kayıtları",
          "WhatsApp — üyelerimize yönelik duyuru grubu",
        ],
      },
      {
        type: "note",
        text: "Dernek adına yapılan tek resmî paylaşım, yukarıdaki hesaplar üzerinden yapılandır. Başka hesaplar derneği temsil etmez.",
      },
      { type: "cta", label: "İletişim Bilgileri", href: "/iletisim" },
    ],
  },

  /* -------------------------------------------------------------- Üye İşlemleri */
  {
    slug: "aidat",
    title: "Aidat İşlemleri",
    group: "aidat",
    hero: "/assets/ortak/tarlalar.webp",
    lead: "Aidat sorgulama ve ödeme işlemleri.",
    blocks: [
      {
        type: "p",
        text: "Aidat, derneğin düzenli tek gelir kalemidir. Taziye dayanışmasından yol takibine, eğitim desteğinden arşiv çalışmasına kadar yaptığımız işlerin karşılığı buradan sağlanır.",
      },
      {
        type: "facts",
        items: [
          { label: "Tahsil dönemi", value: "Yıllık" },
          { label: "Tutar", value: "Genel kurulda belirlenir" },
          { label: "Ödeme yeri", value: "Dernek banka hesabı" },
          { label: "Denetim", value: "Denetim kurulu incelemesine açıktır" },
        ],
      },
      { type: "cta", label: "Aidat Sorgula", href: "/aidat/sorgula" },
      { type: "cta", label: "Aidat Öde", href: "/aidat/ode" },
    ],
  },
  {
    slug: "aidat/sorgula",
    title: "Aidat Sorgula",
    group: "aidat",
    status: "soon",
    hero: "/assets/ortak/yamac-cayir.webp",
    lead: "Üye numaranızla aidat durumunuzu görebileceksiniz.",
    blocks: [
      {
        type: "p",
        text: "Üye numaranızla geçmiş ödemelerinizi ve varsa bakiyenizi görebileceğiniz sorgulama ekranı hazırlanıyor. Ekran açılana kadar aidat durumunuzu dernek sekreterliğimizden öğrenebilirsiniz.",
      },
      { type: "h", text: "Hangi aşamadayız?" },
      {
        type: "ul",
        items: [
          "Üye kayıtlarının dijital ortama aktarımı sürüyor.",
          "Üye numarası ile sorgulama akışı tasarlandı.",
          "Kişisel veri güvenliği için erişim yöntemi değerlendiriliyor.",
        ],
      },
    ],
  },
  {
    slug: "aidat/ode",
    title: "Aidat Öde",
    group: "aidat",
    status: "soon",
    hero: "/assets/ortak/ciplak-yamac.webp",
    lead: "Çevrim içi ödeme altyapısı kuruluyor.",
    blocks: [
      {
        type: "p",
        text: "Aidatınızı çevrim içi ödeyebileceğiniz altyapı kuruluyor. Bu süreçte ödemelerinizi dernek banka hesabına havale veya EFT ile yapabilirsiniz; açıklama kısmına ad, soyad ve üye numaranızı yazmanız yeterli.",
      },
      { type: "h", text: "Hangi aşamadayız?" },
      {
        type: "ul",
        items: [
          "Ödeme altyapısı sağlayıcıları değerlendiriliyor.",
          "Dernek hesabı ile mutabakat akışı tasarlanıyor.",
          "Makbuz ve bildirim süreci yönetim kurulunda görüşülüyor.",
        ],
      },
      {
        type: "note",
        text: "Banka hesap bilgilerimizi dernek sekreterliğimizden veya iletişim sayfamızdan öğrenebilirsiniz.",
      },
    ],
  },

  /* -------------------------------------------------------------------- Galeri */
  {
    slug: "galeri",
    title: "Fotoğraf Arşivi",
    group: "koyumuz",
    hero: "/assets/animeler/sonbahar-vadi.webp",
    lead: "Köyümüzün ve mezralarımızın görsel hafızası.",
    blocks: [
      {
        type: "p",
        text: "Arşivimiz, hemşehrilerimizin aile albümlerinden ve köyde çekilen güncel karelerden oluşuyor. Her fotoğrafı, mümkün olduğunca çekildiği yer ve yıl bilgisiyle birlikte kaydediyoruz.",
      },
      {
        type: "gallery",
        images: [
          ...mezraPhotos("perdik-merkez", "perdik", [9, 10, 1, 11]),
          ...mezraPhotos("cellatlar", "cellatlar", [103, 118, 111, 114], "webp"),
          ...mezraPhotos("delolar", "delolar", [2, 3, 5, 11]),
          ...mezraPhotos("haraba", "haraba", [5, 4, 3, 9]),
          ...mezraPhotos("kaldirim", "kaldirim", [8, 5, 6, 9]),
          ...mezraPhotos("gedik/yukari-koy", "gedik-yukari", [2, 1, 6, 5]),
        ],
        caption: "Mezralarımızdan arşiv kareleri",
      },
      {
        type: "gallery",
        images: [
          "/assets/albom/albom-01.jpg",
          "/assets/animeler/okul.webp",
          "/assets/albom/albom-03.jpg",
          "/assets/albom/albom-04.jpg",
          "/assets/albom/albom-05.jpg",
          "/assets/albom/albom-06.jpg",
        ],
        caption: "Köy yaşamından mevsimlik kareler",
      },
      {
        type: "note",
        text: "Elinizdeki eski fotoğrafları arşivimize kazandırmak isterseniz, kareyi çekildiği yıl ve karedeki kişilerin adlarıyla birlikte bize iletmeniz yeterli.",
      },
      { type: "cta", label: "Arşive Katkıda Bulunun", href: "/iletisim/mesaj" },
    ],
  },
];

export const pageBySlug = new Map(pages.map((page) => [page.slug, page]));

export const pagesInGroup = (group: string) =>
  pages.filter((page) => page.group === group);
