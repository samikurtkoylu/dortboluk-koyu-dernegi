import type { Metadata } from "next";
import Link from "next/link";
import { OrgChart } from "../org-chart";
import { ScrollTop, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Yönetim ve Kurullarımız",
  description:
    "Elazığ Dörtbölük Köyü Derneği yönetim kurulu, denetim kurulu, istişare kurulu, finans kurulu ile kadın ve gençlik kollarımız.",
};

const sidebarLinks = [
  { label: "Başkanın Mesajı", href: "#baskanin-mesaji", active: true },
  { label: "Yönetim Şeması", href: "#sema" },
  { label: "Yönetim Kurulu", href: "#yonetim-kurulu" },
  { label: "Denetim Kurulu", href: "#denetim-kurulu" },
  { label: "İstişare Kurulu", href: "#istisare-kurulu" },
  { label: "Finans Kurulu", href: "#finans" },
  { label: "Diğer Görevler", href: "#gorevler" },
  { label: "Kadın ve Gençlik Kolları", href: "#kollar" },
  { label: "Dernek Tüzüğü", href: "#tuzuk" },
];

export default function Yonetim() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <div className="hero-edge-bg">
          <div className="hero-spacer hero-inset-shadow">
            <img src="/assets/eski/dernek-onunde-toplu.webp" alt="Dörtbölük Köyü Derneği buluşması" />
          </div>
        </div>

        <div className="pl-container">
          <div className="pl-row">
            <div className="pl-main">
              <article className="pl-card">
                <h1 className="pl-title">Yönetim ve Kurullarımız</h1>

                <div className="pl-topbar">
                  <nav aria-label="Sayfa yolu" className="breadcrumb-nav">
                    <ol className="breadcrumb-list">
                      <li>
                        <Link href="/">Ana Sayfa</Link>
                      </li>
                      <li>
                        <Link href="/hakkimizda/tarihce">Hakkımızda</Link>
                      </li>
                      <li aria-current="page">Yönetim ve Kurullarımız</li>
                    </ol>
                  </nav>
                </div>

                <div className="pl-content">
                  <div className="content-divider" />

                  <div className="article-content">
                    <h2 id="baskanin-mesaji">
                      &ldquo;Köyümüzün değerlerini koruyarak dayanışmayı büyütmek,
                      gençlerimize yaşayan bir Dörtbölük bırakmak için
                      çalışıyoruz.&rdquo;
                    </h2>

                    <figure className="image align-left">
                      <img src="/assets/eski/dernek-onunde-toplu.webp" alt="Dernek buluşmasından bir kare" />
                      <figcaption>
                        Elazığ Dörtbölük Köyü Derneği Yönetim Kurulu Başkanı Orhan Akyürek
                      </figcaption>
                    </figure>

                    <p>
                      Dörtbölük, Sivrice ilçe merkezine on beş kilometre uzaklıkta,
                      eski adı Perdik olan bir Elazığ köyüdür. Köyümüzden ayrılmış
                      olsak da bağımız hiç kopmadı; derneğimiz bu bağın kurumsal
                      karşılığıdır.
                    </p>

                    <p>
                      Yönetim, denetim ve istişare kurullarımız, finans kurulumuz ile
                      kadın ve gençlik kollarımız; köyümüzün ihtiyaçlarını birlikte
                      değerlendirir, kararları ortak akılla alır. Görev dağılımının
                      tamamı aşağıdaki şemada yer alıyor.
                    </p>

                    <p>
                      Kurullarımızın çalışmalarına, faaliyet raporlarına ve toplantı
                      notlarına ana sayfadaki haber bölümünden ulaşabilirsiniz.
                    </p>

                    <h3 className="h3" id="sema">
                      Yönetim Şeması
                    </h3>

                    <OrgChart />

                    <h3 className="h3" id="tuzuk">
                      Dernek Tüzüğü ve Mali Şeffaflık
                    </h3>
                    <p>
                      Üyelik şartları, aidatın belirlenme usulü, üyelikten çıkma ve
                      çıkarılma koşulları ile gelir-gider kalemlerinin nasıl
                      raporlanacağı dernek tüzüğümüzde düzenlenmiştir.
                    </p>

                    <Link className="btn btn-outline btn-red" href="/iletisim">
                      Yönetimle İletişime Geçin
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            <aside className="pl-sidebar">
              <nav className="page-sidebar" aria-label="Bu bölümdeki sayfalar">
                <div className="page-sidebar-title">
                  <Link className="sidebar-title" href="/yonetim">
                    Kurumsal Yönetim
                  </Link>
                </div>
                <ul className="page-sidebar-menu">
                  {sidebarLinks.map((link) => (
                    <li className={link.active ? "active" : undefined} key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </main>

      <ScrollTop />
      <SiteFooter />
    </>
  );
}
