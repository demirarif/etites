import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Blocks";
import ProjectExplorer from "@/components/ProjectExplorer";
import { toCard } from "@/lib/cards";
import { arabicaImage } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import { arabica, projects, projectsRounded, sectors, stats, systems } from "@/lib/projects";

export const metadata: Metadata = pageMetadata({
  title: "Projeler",
  path: "/projeler",
  description: `${stats.cities} ilde ve ${stats.countries} ülkede tamamlanan mekanik tesisat ve iklimlendirme projeleri.`,
});

export default function ProjectsPage() {
  const arabicaSummary = {
    slug: arabica.slug,
    title: arabica.title,
    branchCount: arabica.branchCount,
    cityCount: arabica.cityCount,
    cities: [...new Set(arabica.branches.map((b) => b.city).filter(Boolean) as string[])],
    branchCities: arabica.branches.map((b) => b.city),
    systems: arabica.systems,
    image: arabicaImage(),
  };

  return (
    <>
      <PageHero title="Projeler">
        <div className="stats">
          <div>
            <b>{projectsRounded}</b>
            <span>proje</span>
          </div>
          <div>
            <b>{stats.cities}</b>
            <span>il</span>
          </div>
          <div>
            <b>{stats.countries}</b>
            <span>ülke</span>
          </div>
        </div>
      </PageHero>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <ProjectExplorer items={projects.map(toCard)} sectors={sectors} systems={systems} arabica={arabicaSummary} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
