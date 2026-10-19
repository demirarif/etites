import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Blocks";
import { LogoWall } from "@/components/Logos";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Referanslar",
  path: "/referanslar",
  description: "Etites İklimlendirme ile çalışan kurumlar, markalar, şirketler ve mimarlık ofisleri.",
});

export default function ReferencesPage() {
  return (
    <>
      <PageHero title="Referanslar" />
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <LogoWall />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
