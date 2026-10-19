import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, SectionHead } from "@/components/Blocks";
import Faq from "@/components/Faq";
import { ArrowRight } from "@/components/Icons";
import { ProjectCard } from "@/components/ProjectCards";
import { TeklifMesaji } from "@/components/teklif/TeklifProvider";
import { getService, services, visibleServices } from "@/data/services";
import { toCard } from "@/lib/cards";
import { serviceImage } from "@/lib/media";
import { projects, projectsForSystems } from "@/lib/projects";
import { pageMetadata } from "@/lib/metadata";

// Mevcut sitedeki kök adresler korunur: /havalandirma-sistemleri, /vrf-klima-sistemleri ...
export function generateStaticParams() {
  return services.map((s) => ({ hizmet: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[hizmet]">): Promise<Metadata> {
  const { hizmet } = await params;
  const s = getService(hizmet);
  if (!s) notFound();
  return pageMetadata({ title: s.title, description: s.short, path: `/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/[hizmet]">) {
  const { hizmet } = await params;
  const s = getService(hizmet);
  if (!s) notFound();

  const img = serviceImage(s.image);
  const related = (
    s.slug === "bakim-ve-onarim-hizmetleri"
      ? projects.filter((p) => /bakım|revizyon|yenileme|değişimi|tadilat/i.test(p.title)).slice(0, 6)
      : s.slug === "mekanik-tesisat-projeleri"
        ? projectsForSystems(["isitma", "havalandirma", "vrf"], 6)
        : projectsForSystems(s.systemKeys, 6)
  ).map(toCard);
  const others = visibleServices.filter((x) => x.slug !== s.slug);

  return (
    <>
      <TeklifMesaji text={`Merhaba, ${s.title.toLocaleLowerCase("tr")} için bir projem var. Görüşmek isterim.`} />

      <section className="pagehero">
        <div className="wrap pd">
          <div className="pagehero__inner">
            {!s.hidden && (
              <nav className="crumbs" aria-label="Konum">
                <Link href="/cozumler">Çözümler</Link>
              </nav>
            )}
            <h1 className="h1">{s.title}</h1>
            <p className="lead">{s.intro}</p>
          </div>
          {img && (
            <figure className="figure">
              <div className="figure__frame tone">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} width={img.w} height={img.h} />
              </div>
            </figure>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <h2 className="h2">Kapsam</h2>
          <ul className="list">
            {s.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--gray">
          <div className="wrap">
            <SectionHead
              title="Uygulamalardan örnekler"
              aside={
                <Link href="/projeler" className="textlink">
                  Tüm projeler <ArrowRight />
                </Link>
              }
            />
            <div className="pgrid">
              {related.map((p) => (
                <ProjectCard key={p.slug} item={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {s.faq.length > 0 && (
        <section className="section">
          <div className="wrap split">
            <h2 className="h2">Sık sorulanlar</h2>
            <Faq items={s.faq} />
          </div>
        </section>
      )}

      <CtaBand />

      <section className="section section--tight">
        <div className="wrap" style={{ display: "grid", gap: 16 }}>
          <h2 className="label">Diğer çözümler</h2>
          <div className="links">
            {others.map((o) => (
              <Link key={o.slug} href={`/${o.slug}`} className="textlink">
                {o.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
