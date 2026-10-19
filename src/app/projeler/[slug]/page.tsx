import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, SectionHead } from "@/components/Blocks";
import { ArrowRight } from "@/components/Icons";
import { ProjectCard } from "@/components/ProjectCards";
import { TeklifMesaji } from "@/components/teklif/TeklifProvider";
import { visibleServices } from "@/data/services";
import { toCard } from "@/lib/cards";
import { arabicaImages, imageCaption, projectGallery, projectImage, type ShownImg } from "@/lib/media";
import { arabica, getProject, projects, relatedProjects, sectorLabel, sinceYear, systems, systemsText } from "@/lib/projects";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [{ slug: arabica.slug }, ...projects.map((p) => ({ slug: p.slug }))];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projeler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (slug === arabica.slug) {
    return pageMetadata({
      title: "Arabica Coffee House şubeleri",
      description: `Arabica Coffee House şubelerinde ${systemsText(arabica.systems)} uygulamaları.`,
      path: `/projeler/${arabica.slug}`,
    });
  }
  const p = getProject(slug);
  if (!p) notFound();
  return pageMetadata({
    title: p.title,
    description: `${p.title}. ${systemsText(p.systems)}.`,
    path: `/projeler/${p.slug}`,
  });
}

/** Büyük görsel. Eski siteden gelen küçük fotoğraflar bulanık zeminin ortasında net durur. */
function StickyMedia({ img }: { img: ShownImg }) {
  const small = img.w < 1300;
  return (
    <div className={`pdmedia tone${small ? " pdmedia--small" : ""}`}>
      {small && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="pdmedia__bg" src={img.thumb} alt="" aria-hidden />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.src} alt={img.alt} width={img.w} height={img.h} fetchPriority="high" />
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projeler/[slug]">) {
  const { slug } = await params;
  if (slug === arabica.slug) return <ArabicaPage />;

  const p = getProject(slug);
  if (!p) notFound();

  const img = projectImage(p);
  const caption = img ? imageCaption(img) : null;
  const gallery = projectGallery(p);
  const related = relatedProjects(p, 3).map(toCard);
  const serviceLinks = [...new Set(p.systems.map((k) => systems.find((s) => s.key === k)?.service))]
    .map((slug) => visibleServices.find((s) => s.slug === slug))
    .filter((s): s is (typeof visibleServices)[number] => Boolean(s));

  return (
    <>
      <TeklifMesaji text={`Merhaba, ${p.title} benzeri bir projem var. Görüşmek isterim.`} />

      <header className="pdhead">
        <div className="wrap pdhead__inner">
          <nav className="crumbs" aria-label="Konum">
            <Link href="/projeler">Projeler</Link>
            <span aria-hidden>/</span>
            <Link href={`/projeler#${p.sector}`}>{sectorLabel(p.sector)}</Link>
          </nav>
          <h1 className="h1">{p.title}</h1>
          <p className="pdhead__meta">{[p.city, p.year].filter(Boolean).join(", ")}</p>
        </div>
      </header>

      {img && <StickyMedia img={img} />}

      <section className="pdsheet" aria-label="Proje künyesi">
        <div className="wrap pdsheet__inner">
          <div className="pdsheet__side">
            <span className="label">Künye</span>
            <dl className="spec">
              <dt>Sektör</dt>
              <dd>{sectorLabel(p.sector)}</dd>
              <dt>Konum</dt>
              <dd>{p.city ?? "Belirtilmemiş"}</dd>
              <dt>Yıl</dt>
              <dd>{p.year}</dd>
              <dt>Kapsam</dt>
              <dd>{systemsText(p.systems)}</dd>
            </dl>
            {caption && <p className="figcap">{caption}</p>}
          </div>

          <div className="pdsheet__side">
            {serviceLinks.length > 0 && (
              <>
                <span className="label">Kapsamdaki çözümler</span>
                <ul className="svc svc--single">
                  {serviceLinks.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${s.slug}`} className="svc__row svc__row--plain">
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
              </>
            )}
            {gallery.length > 0 && (
              <div className="gallery">
                {gallery.map((g) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={g.src} className="tone" src={g.thumb} alt={p.title} loading="lazy" />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--gray">
          <div className="wrap">
            <SectionHead
              title="Benzer projeler"
              aside={
                <Link href={`/projeler#${p.sector}`} className="textlink">
                  {sectorLabel(p.sector)} projeleri <ArrowRight />
                </Link>
              }
            />
            <div className="pgrid">
              {related.map((r) => (
                <ProjectCard key={r.slug} item={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

function ArabicaPage() {
  const byCity = new Map<string, string[]>();
  arabica.branches.forEach((b) => {
    const c = b.city ?? "Diğer";
    byCity.set(c, [...(byCity.get(c) ?? []), b.name]);
  });
  const [img, ...more] = arabicaImages();

  return (
    <>
      <TeklifMesaji text="Merhaba, zincir mağazalarımız için mekanik tesisat çözüm ortağı arıyoruz." />

      <header className="pdhead">
        <div className="wrap pdhead__inner">
          <nav className="crumbs" aria-label="Konum">
            <Link href="/projeler">Projeler</Link>
            <span aria-hidden>/</span>
            <Link href="/projeler#restoran-kafe">Restoran ve Kafe</Link>
          </nav>
          <h1 className="h1">Arabica Coffee House şubeleri</h1>
          <p className="pdhead__meta">{sinceYear(arabica.yearFrom)} bu yana Türkiye, Ukrayna ve Irak&apos;ta</p>
        </div>
      </header>

      {img && <StickyMedia img={img} />}

      <section className="pdsheet" aria-label="Arabica Coffee House künyesi">
        <div className="wrap pdsheet__inner">
          <div className="pdsheet__side">
            <dl className="bignum">
              <div>
                <dt>şube</dt>
                <dd>{arabica.branchCount}</dd>
              </div>
              <div>
                <dt>il</dt>
                <dd>{arabica.cityCount}</dd>
              </div>
              <div>
                <dt>yurt dışı ülke</dt>
                <dd>2</dd>
              </div>
            </dl>
            <div className="prose">
              <p>
                Arabica Coffee House&apos;un Türkiye&apos;deki ve yurt dışındaki açılışlarında mekanik tesisatı üstleniyoruz. Bugüne
                kadar {arabica.cityCount} ilde ve Ukrayna ile Irak&apos;ta (Erbil) toplam {arabica.branchCount} şubede çalıştık.
              </p>
              <p>Şubelerin mekanik tesisat projelerinde çözüm ortağı olarak çalışıyoruz.</p>
            </div>
            {img && <p className="figcap">{imageCaption(img)}</p>}
          </div>
          <div className="pdsheet__side">
            {more.length > 0 && (
              <div className="gallery">
                {more.map((g) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={g.src} className="tone" src={g.thumb} alt={g.alt} loading="lazy" />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="wrap">
          <SectionHead title="Şubeler" />
          <ul className="branches">
            {[...byCity.entries()]
              .sort((a, b) => b[1].length - a[1].length)
              .flatMap(([city, names]) =>
                names.map((n) => (
                  <li key={`${city}-${n}`}>
                    {n}
                    <span>{city}</span>
                  </li>
                )),
              )}
          </ul>
        </div>
      </section>

      <CtaBand text="Zincir markanızın yeni şubeleri için standart bir mekanik tesisat paketi hazırlayalım." />
    </>
  );
}
