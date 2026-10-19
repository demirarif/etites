import Link from "next/link";
import { CtaBand, SectionHead } from "@/components/Blocks";
import Faq from "@/components/Faq";
import HeroFilm from "@/components/HeroFilm";
import { ArrowRight } from "@/components/Icons";
import { ReferenceMarquee } from "@/components/Logos";
import Plate, { type PlateRow } from "@/components/Plate";
import PlateDeck from "@/components/PlateDeck";
import { formatDate, posts } from "@/data/blog";
import { faq } from "@/data/content";
import { visibleServices } from "@/data/services";
import { pickImage, projectImage } from "@/lib/media";
import { pageMetadata, SITE_DESCRIPTION, SITE_NAME } from "@/lib/metadata";
import { arabica, getProject, joinTr, metaLine, projectsRounded, sectors, sectorProjects, sectorSummary, sinceYear, stats, systemsText } from "@/lib/projects";
import { restaurantBrand, restaurantBranches } from "@/lib/restaurant-branches";

export const metadata = pageMetadata({ title: SITE_NAME, description: SITE_DESCRIPTION, path: "/" });

const cafeProject = getProject("zeppelin-pub-mahall-ankara");
const PLATE_IMAGES = {
  "kamu-savunma": pickImage(["kurum-aselsan-01", "kurum-trt-01"], "ASELSAN Gölbaşı yerleşkesi"),
  "ofis-plaza": pickImage(["bina-regnum-01", "bina-mahall-02", "ofis-2"], "Regnum Sky Tower"),
  "restoran-kafe": cafeProject ? projectImage(cafeProject) : null,
};

const PLATE_SECTORS = ["kamu-savunma", "ofis-plaza", "restoran-kafe"] as const;
const cafeBranches = restaurantBranches(sectorProjects("restoran-kafe"), arabica.branchCount);

function plateRows(key: string): PlateRow[] {
  const s = sectorSummary(key);
  const rows: PlateRow[] = s.featured.map((p) => {
    const branch = key === "restoran-kafe" ? cafeBranches.find((b) => b.name === restaurantBrand(p)) : null;
    return {
      title: p.title,
      scope: systemsText(p.systems),
      meta: branch ? `${branch.count} ${branch.unit}` : metaLine(p),
      href: `/projeler/${p.slug}`,
    };
  });
  if (key === "restoran-kafe") {
    rows.unshift({
      title: "Arabica Coffee House",
      scope: "Mekanik tesisat",
      meta: `${arabica.branchCount} şube`,
      href: `/projeler/${arabica.slug}`,
    });
  }
  return rows.slice(0, 4);
}

function plateMeta(key: string) {
  const s = sectorSummary(key);
  if (key === "restoran-kafe") return "Markalara göre mekanik tesisat uygulamaları";
  return `${s.cityCount} ilde ${s.count} proje`;
}

export default function Home() {
  const [mainPost, ...otherPosts] = posts;

  return (
    <>
      <div className="intro">
        <HeroFilm>
          <div className="hero__body">
            <div className="wrap hero__inner">
              <div className="hero__kunye">
                <div className="hero__id">
                  <h1 id="hero-title" className="hero__title">
                    Etites İklimlendirme
                  </h1>
                  <p className="hero__desc">{sinceYear(stats.since)} beri Ankara&apos;da mekanik tesisat ve iklimlendirme</p>
                </div>
                <dl className="nums">
                  <div>
                    <dt>proje</dt>
                    <dd>{projectsRounded}</dd>
                  </div>
                  <div>
                    <dt>il</dt>
                    <dd>{stats.cities}</dd>
                  </div>
                  <div>
                    <dt>ülke</dt>
                    <dd>{stats.countries}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </HeroFilm>

        <PlateDeck>
          {PLATE_SECTORS.map((key, i) => {
            const s = sectorSummary(key);
            return (
              <Plate
                key={key}
                id={key}
                title={s.label}
                meta={plateMeta(key)}
                rows={plateRows(key)}
                more={{ href: `/projeler#${key}`, label: `${s.label} projeleri` }}
                img={PLATE_IMAGES[key]}
                last={i === PLATE_SECTORS.length - 1}
              />
            );
          })}
        </PlateDeck>
      </div>

      <div className="refbridge">
        <section className="refband" aria-labelledby="ref-title">
          <ReferenceMarquee />
          <div className="refband__head">
            <h2 id="ref-title" className="label">Referanslar</h2>
            <Link href="/referanslar" className="textlink">
              Tümünü keşfet <ArrowRight />
            </Link>
          </div>
        </section>
      </div>

      <section className="section section--sectors" aria-labelledby="sx-title">
        <div className="wrap">
          <SectionHead
            id="sx-title"
            title="Sektörler"
            aside={
              <Link href="/projeler" className="textlink">
                Tüm projeler <ArrowRight />
              </Link>
            }
          />
          <ul className="sx">
            {sectors.map((sec, i) => {
              const s = sectorSummary(sec.key);
              return (
                <li key={sec.key}>
                  <Link href={`/projeler#${sec.key}`} className="sx__row">
                    <span className="sx__n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="sx__name">{s.label}</span>
                    <span className="sx__ex">
                      {sec.key === "restoran-kafe"
                        ? cafeBranches.slice(0, 3).map((b) => `${b.name} ${b.count} ${b.unit}`).join(", ")
                        : joinTr(s.examples)}
                    </span>
                    <span className="sx__count">{sec.key === "restoran-kafe" ? "Şubeleri gör" : `${s.count} proje`}</span>
                    <span className="sx__go" aria-hidden>
                      <ArrowRight />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section section--gray" aria-labelledby="svc-title">
        <div className="wrap">
          <SectionHead
            id="svc-title"
            title="Çözümler"
            aside={
              <Link href="/cozumler" className="textlink">
                Tümü <ArrowRight />
              </Link>
            }
          />
          <ul className="svc">
            {visibleServices.map((s, i) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="svc__row">
                  <span className="svc__n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="svc__title">{s.title}</span>
                    <span className="svc__desc">{s.short}</span>
                  </span>
                  <span className="svc__go" aria-hidden>
                    <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />

      <section className="section" aria-labelledby="blog-title">
        <div className="wrap">
          <SectionHead id="blog-title" title="Blog" />
          <div className="bteaser">
            <Link href={`/blog/${mainPost.slug}`} className="post-card">
              <div className="post-card__meta">
                <span>{mainPost.topic}</span>
                {mainPost.date && <time dateTime={mainPost.date}>{formatDate(mainPost.date)}</time>}
              </div>
              <h3 className="post-card__title">{mainPost.title}</h3>
              <p className="post-card__excerpt">{mainPost.excerpt}</p>
              <span className="textlink">
                Yazıyı oku <ArrowRight />
              </span>
            </Link>
            <Link href="/blog" className="more">
              <ul className="more__list">
                {otherPosts.map((p) => (
                  <li key={p.slug}>{p.title}</li>
                ))}
              </ul>
              <span className="more__go">
                Devamını keşfet <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section id="sss" className="section section--gray" aria-labelledby="sss-title">
        <div className="wrap split">
          <h2 id="sss-title" className="h2">
            Sıkça sorulan sorular
          </h2>
          <Faq items={faq} />
        </div>
      </section>
    </>
  );
}
