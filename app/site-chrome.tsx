"use client";

import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Heart,
  Languages,
  Menu,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { menu } from "./site-data";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";

export const socials = [
  { label: "Facebook", href: "/iletisim/sosyal-medya", Icon: FacebookIcon },
  { label: "Instagram", href: "/iletisim/sosyal-medya", Icon: InstagramIcon },
  { label: "X", href: "/iletisim/sosyal-medya", Icon: XIcon },
  { label: "LinkedIn", href: "/iletisim/sosyal-medya", Icon: LinkedinIcon },
  { label: "YouTube", href: "/canli/gecmis", Icon: YoutubeIcon },
  { label: "WhatsApp", href: "/iletisim/sosyal-medya", Icon: WhatsappIcon },
];

function BrandCopy() {
  return (
    <span className="header-logo-copy">
      <strong>Elazığ Dörtbölük</strong>
      <span>KÖYÜ DERNEĞİ</span>
      <small>Köyümüzle Bağımız Sürüyor</small>
    </span>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a className="skip-to-content" href="#main">
        İçeriğe geç
      </a>

      <header className="mobile-header">
        <div className="mobile-header-bar">
          <Link className="header-logo" href="/" aria-label="Ana sayfa">
            <img src="/logo-kucuk.png" alt="Dörtbölük Köyü Derneği amblemi" />
            <BrandCopy />
          </Link>
          <div className="mobile-actions">
            <Link className="btn btn-fill btn-red" href="/aidat">
              <CreditCard /> AİDAT ÖDE
            </Link>
            <button
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              className="btn btn-outline btn-green"
              onClick={() => setMobileOpen((open) => !open)}
              type="button"
            >
              {mobileOpen ? <X /> : <Menu />} Menü
            </button>
          </div>
        </div>

        <nav className={`mobile-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Mobil menü">
          {menu.map((item) => (
            <details key={item.label}>
              <summary>
                {item.label}
                <ChevronDown />
              </summary>
              <div className="mobile-nav-links">
                {(item.columns ?? []).flatMap((column) => column.links).map((link) => (
                  <Link href={link.href} key={link.label} onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                {!item.columns && (
                  <Link href={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                )}
              </div>
            </details>
          ))}
          <Link className="btn btn-fill btn-green" href="/aidat" onClick={() => setMobileOpen(false)}>
            <CreditCard /> Aidat Öde
          </Link>
        </nav>
      </header>

      <header className="desktop-header" id="top">
        <div className="header-inner">
          <Link
            className="header-logo"
            href="/"
            aria-label="Elazığ Dörtbölük Köyü Derneği ana sayfa"
          >
            <img src="/logo-kucuk.png" alt="Dörtbölük Köyü Derneği amblemi" />
            <BrandCopy />
          </Link>

          <div className="header-actions">
            <nav className="social-links" aria-label="Sosyal medya bağlantıları">
              {socials.map(({ label, href, Icon }) => (
                <Link href={href} key={label} aria-label={label} title={label}>
                  <Icon />
                </Link>
              ))}
            </nav>

            <button className="btn btn-outline btn-green" type="button">
              <Search /> ARA
            </button>

            <Link className="btn btn-outline btn-red" href="/iletisim">
              <Languages /> EN
              <span className="ds-sr-only">Switch to English</span>
            </Link>

            <div className="header-donate">
              <Link className="btn btn-fill btn-red" href="/aidat">
                <Heart /> AİDAT ÖDE
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="super-menu-wrapper">
        <nav className="super-menu" aria-label="Ana menü">
          <ul className="main">
            {menu.map((item) => (
              <li className={item.columns ? "dropdown" : undefined} key={item.label}>
                <Link className={item.columns ? "dropdown-toggle" : undefined} href={item.href}>
                  {item.label}
                  {item.columns ? <ChevronDown /> : null}
                </Link>
                {item.columns ? (
                  <div className="mega-drop">
                    {item.columns.map((column) => (
                      <div className="mega-column" key={column.title}>
                        <Link className="mega-column-header" href={column.href}>
                          {column.title}
                        </Link>
                        <ul>
                          {column.links.map((link) => (
                            <li key={link.label}>
                              <Link href={link.href}>{link.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-top">
      <button
        aria-label="Sayfanın başına dön"
        className={`scroll-top-link ${visible ? "is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        type="button"
      >
        <ChevronUp />
      </button>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer id="alt-bilgi">
      <div className="footer-top">
        <div className="footer-columns">
          <div className="footer-brand">
            <Link href="/">
              <img src="/logo-kucuk.png" alt="" />
              <span>
                <strong>Dörtbölük</strong>
                <small>KÖYÜ DERNEĞİ</small>
              </span>
            </Link>
            <div className="social-links-light">
              {socials.map(({ label, href, Icon }) => (
                <Link href={href} key={label} aria-label={label}>
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          <nav aria-label="Sık kullanılanlar">
            <dl>
              <dt>Sık Kullanılanlar</dt>
              <dd>
                <Link href="/aidat">Aidat Öde</Link>
              </dd>
              <dd>
                <Link href="/haberler">Duyurular</Link>
              </dd>
              <dd>
                <Link href="/yonetim">Yönetim</Link>
              </dd>
              <dd>
                <Link href="/canli/koy">Canlı Yayın</Link>
              </dd>
            </dl>
          </nav>

          <nav aria-label="Hızlı erişim">
            <dl>
              <dt>Hızlı Erişim</dt>
              <dd>
                <Link href="/mezralar">Mezralar</Link>
              </dd>
              <dd>
                <Link href="/faaliyetler">Faaliyetler</Link>
              </dd>
              <dd>
                <Link href="/baskandan/birlik-ve-dayanisma">Başkandan Mesajlar</Link>
              </dd>
              <dd>
                <Link href="/iletisim">İletişim</Link>
              </dd>
            </dl>
          </nav>

          <div className="footer-newsletter">
            <b>Haberdar Olun</b>
            <p>Aşağıdaki bağlantıdan dernek duyuru listesine katılabilirsiniz.</p>
            <Link className="btn btn-outline btn-white" href="/iletisim">
              E-Bültenimize Üye Olun
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-divider">
        <hr />
      </div>

      <div className="footer-bottom">
        <div className="social-links-light">
          {socials.map(({ label, href, Icon }) => (
            <Link href={href} key={label} aria-label={label}>
              <Icon />
            </Link>
          ))}
        </div>
        <small>© 2026 Elazığ Dörtbölük Köyü Derneği</small>
      </div>
    </footer>
  );
}
