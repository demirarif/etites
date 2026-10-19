import type { Metadata } from "next";
import { CtaBand, PageHero, ProcessLine, SectionHead } from "@/components/Blocks";
import ServiceScroller from "@/components/ServiceScroller";
import { visibleServices } from "@/data/services";
import { serviceImage } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Çözümler",
  path: "/cozumler",
  description:
    "Isıtma ve soğutma, VRF klima, havalandırma, sıhhi tesisat, yangın tesisatı, otomasyon, kazan dairesi, projelendirme ve bakım.",
});

export default function SolutionsPage() {
  const items = visibleServices.map((s) => ({
    slug: s.slug,
    title: s.title,
    intro: s.intro,
    scope: s.scope,
    img: serviceImage(s.image),
  }));

  return (
    <>
      <PageHero title="Çözümler" />
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <ServiceScroller items={items} />
        </div>
      </section>
      <section className="section section--gray" aria-labelledby="proc-title">
        <div className="wrap">
          <SectionHead id="proc-title" title="Çalışma süreci" />
          <ProcessLine />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
