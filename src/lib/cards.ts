import { metaLine, systemsText, type Project } from "./projects";
import { projectImage, type ShownImg } from "./media";

/** Proje kartının istemciye giden hâli: sadece kartın ve filtrenin ihtiyacı olan alanlar */
export type CardItem = {
  slug: string;
  title: string;
  sys: string;
  meta: string;
  img: ShownImg | null;
  sector: string;
  city: string | null;
  systems: string[];
  year: number;
  own: boolean;
};

export function toCard(p: Project): CardItem {
  const img = projectImage(p);
  return {
    slug: p.slug,
    title: p.title,
    sys: systemsText(p.systems.slice(0, 3)),
    meta: metaLine(p),
    img,
    sector: p.sector,
    city: p.city,
    systems: p.systems,
    year: p.year,
    own: img?.kind === "own",
  };
}
