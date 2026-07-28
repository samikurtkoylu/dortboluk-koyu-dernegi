import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, Hammer } from "lucide-react";
import { type Block, groups, pageBySlug, pages, pagesInGroup } from "../content";
import { ScrollTop, SiteFooter, SiteHeader } from "../site-chrome";
import { asset } from "../asset";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pageBySlug.get(slug.join("/"));

  if (!page) {
    return { title: "Sayfa bulunamadı" };
  }

  return { title: page.title, description: page.lead };
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h":
            return (
              <h3 className="h3" key={index}>
                {block.text}
              </h3>
            );
          case "p":
            return <p key={index}>{block.text}</p>;
          case "ul":
            return (
              <ul className="content-list" key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "facts":
            return (
              <dl className="fact-table" key={index}>
                {block.items.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            );
          case "gallery":
            return (
              <figure className="content-gallery" key={index}>
                <div className="gallery-grid">
                  {block.images.map((src) => (
                    <img alt="" key={src} loading="lazy" src={asset(src)} />
                  ))}
                </div>
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            );
          case "figure":
            return (
              <figure className="image" key={index}>
                <img alt={block.caption ?? ""} src={asset(block.src)} />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            );
          case "note":
            return (
              <p className="content-note" key={index}>
                {block.text}
              </p>
            );
          case "cta":
            return (
              <Link className="btn btn-outline btn-red content-cta" href={block.href} key={index}>
                {block.label}
              </Link>
            );
        }
      })}
    </>
  );
}

function SoonPanel({ title }: { title: string }) {
  return (
    <aside className="soon-panel">
      <span className="soon-icon" aria-hidden>
        <Hammer />
      </span>
      <div>
        <strong>Bu alan yapım aşamasındadır</strong>
        <p>
          {title} için hazırlıklarımız sürüyor. Çalışmalarımız tamamlandığında bu
          sayfa yayına alınacak ve üyelerimize duyurulacaktır.
        </p>
        <p className="soon-meta">
          <Clock3 /> Gelişmeler dernek duyurularımızdan paylaşılır.
        </p>
      </div>
    </aside>
  );
}

export default async function ContentRoute({ params }: Props) {
  const { slug } = await params;
  const page = pageBySlug.get(slug.join("/"));

  if (!page) {
    notFound();
  }

  const groupTitle = groups[page.group] ?? "";
  const siblings = pagesInGroup(page.group);

  return (
    <>
      <SiteHeader />

      <main id="main">
        <div className="hero-edge-bg">
          <div className="hero-spacer hero-inset-shadow">
            <img
              alt=""
              src={page.hero}
              style={page.heroPosition ? { objectPosition: page.heroPosition } : undefined}
            />
          </div>
        </div>

        <div className="pl-container">
          <div className="pl-row">
            <div className="pl-main">
              <article className="pl-card">
                <h1 className="pl-title">{page.title}</h1>

                <div className="pl-topbar">
                  <nav aria-label="Sayfa yolu" className="breadcrumb-nav">
                    <ol className="breadcrumb-list">
                      <li>
                        <Link href="/">Ana Sayfa</Link>
                      </li>
                      <li>{groupTitle}</li>
                      <li aria-current="page">{page.title}</li>
                    </ol>
                  </nav>
                </div>

                <div className="pl-content">
                  <div className="content-divider" />

                  <div className="article-content">
                    <p className="page-lead">{page.lead}</p>

                    {page.status === "soon" ? <SoonPanel title={page.title} /> : null}

                    <Blocks blocks={page.blocks} />
                  </div>
                </div>
              </article>
            </div>

            <aside className="pl-sidebar">
              <nav className="page-sidebar" aria-label="Bu bölümdeki sayfalar">
                <div className="page-sidebar-title">
                  <span className="sidebar-title">{groupTitle}</span>
                </div>
                <ul className="page-sidebar-menu">
                  {siblings.map((sibling) => (
                    <li
                      className={sibling.slug === page.slug ? "active" : undefined}
                      key={sibling.slug}
                    >
                      <Link href={`/${sibling.slug}`}>{sibling.title}</Link>
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
