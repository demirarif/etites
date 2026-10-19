import data from "@/data/projects.json";

export type Img = { src: string; thumb: string; w: number; h: number };
export type Project = {
  slug: string;
  title: string;
  legacyUrl: string;
  year: number;
  city: string | null;
  sector: string;
  systems: string[];
  images: Img[];
};
export type Sector = { key: string; label: string };
export type SystemDef = { key: string; label: string; service: string };

type Arabica = {
  slug: string;
  title: string;
  sector: string;
  branchCount: number;
  cityCount: number;
  abroad: string[];
  branches: { name: string; city: string | null }[];
  systems: string[];
  yearFrom: number;
};

const d = data as unknown as {
  stats: { projects: number; cities: number; countries: number; since: number; arabicaBranches: number };
  sectors: Sector[];
  systems: SystemDef[];
  projects: Project[];
  arabica: Arabica;
  hero: Img;
};

export const stats = d.stats;
export const sectors = d.sectors;
export const systems = d.systems;
export const projects = d.projects;
export const arabica = d.arabica;
/** Giriş görseli seçilemezse kullanılan yedek */
export const heroFallback = d.hero;

// 265 → "260+"
export const projectsRounded = `${Math.floor(stats.projects / 10) * 10}+`;

export function systemLabel(key: string) {
  return systems.find((s) => s.key === key)?.label ?? key;
}

/** Yılın ayrılma eki: 2013'ten, 2018'den, 2019'dan */
export function sinceYear(year: number) {
  const last: Record<number, string> = { 1: "den", 2: "den", 3: "ten", 4: "ten", 5: "ten", 6: "dan", 7: "den", 8: "den", 9: "dan" };
  const tens: Record<number, string> = { 1: "dan", 2: "den", 3: "dan", 4: "tan", 5: "den", 6: "tan", 7: "ten", 8: "den", 9: "dan" };
  const d = year % 10;
  const t = Math.floor(year / 10) % 10;
  const suffix = d ? last[d] : t ? tens[t] : "den";
  return `${year}'${suffix}`;
}

/** "a, b ve c" biçiminde Türkçe liste */
export function joinTr(items: string[]) {
  if (items.length < 2) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} ve ${items[items.length - 1]}`;
}

export function systemsText(keys: string[]) {
  return joinTr(keys.map(systemLabel));
}

export function sectorLabel(key: string) {
  return sectors.find((s) => s.key === key)?.label ?? key;
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function metaLine(p: Pick<Project, "city" | "year">) {
  return [p.city, p.year].filter(Boolean).join(", ");
}

export function relatedProjects(p: Project, n = 3) {
  const same = projects.filter((x) => x.sector === p.sector && x.slug !== p.slug);
  return [...same].sort((a, b) => Math.abs(a.year - p.year) - Math.abs(b.year - p.year) || b.year - a.year).slice(0, n);
}

export function projectsForSystems(keys: string[], n = 6) {
  if (!keys.length) return [];
  const hits = projects.filter((p) => p.systems.some((s) => keys.includes(s)));
  const score = (p: Project) => (featuredSet.has(p.slug) ? 2 : 0) + (p.sector === "kamu-savunma" ? 1 : 0);
  return [...hits].sort((a, b) => score(b) - score(a) || b.year - a.year).slice(0, n);
}

/** Sektörlerde öne çıkan işler. Ana sayfa plakaları ve sektör dizini buradan beslenir. */
export const sectorFeatured: Record<string, string[]> = {
  "kamu-savunma": [
    "btk-milli-monitor-merkezi",
    "aselsan-golbasi-yerleskesi-vrf-sistemi",
    "jandarma-havacilik-baskanligi-helikopter-hangarlari",
    "trt-turk-binasi",
  ],
  "ofis-plaza": [
    "koc-kuleler-ofisi",
    "regnum-sky-tower-ofisi",
    "telsam-telekom-merkez-ofisi-vrf-sistemi",
    "mahall-ankara-ofisi-band-interior-ile",
  ],
  "restoran-kafe": ["china-bloom-galleria-avm", "zeppelin-pub-mahall-ankara", "let-s-make-coffee"],
  "magaza-avm": ["vakko-ankara-magazasi-2-000-m2", "vakko-butik-ankamall", "prestige-accessories-acity-avm"],
  "saglik-spor": ["gymfit-next-level-4-500-m2", "dr-ekrem-civas-klinigi-koc-kuleler", "dent-group-cayyolu-subesi"],
  "endustri-enerji": ["dorce-prefabrik-fabrikasi", "imer-group-aksaray-vrf-sistemi", "bayar-enerji-isi-merkezi"],
  "konut-villa": ["hekimkoy-villalari", "vantage-umitkoy-konutlari-vrf-sistemi", "hayat-sebla-evleri-sebeke-suyu-hatti-ve-su-deposu"],
};

/** Sektör dizininde görünen kısa örnek adları */
export const sectorExamples: Record<string, string[]> = {
  "kamu-savunma": ["BTK Milli Monitör Merkezi", "ASELSAN Gölbaşı Yerleşkesi", "TRT Türk Binası"],
  "ofis-plaza": ["Koç Kuleler", "Regnum Sky Tower", "Telsam Telekom"],
  "restoran-kafe": ["Arabica Coffee House", "China Bloom", "Zeppelin Pub"],
  "magaza-avm": ["Vakko Ankara Mağazası", "Vakko Butik Ankamall", "Prestige Accessories"],
  "saglik-spor": ["GYMFIT Next Level", "Dr. Ekrem Civas Kliniği", "Dent Group"],
  "endustri-enerji": ["Dorçe Prefabrik Fabrikası", "IMER Group Aksaray", "Bayar Enerji"],
  "konut-villa": ["Hekimköy Villaları", "Vantage Ümitköy Konutları", "Hayat Sebla Evleri"],
};

export const featuredSet = new Set(Object.values(sectorFeatured).flat());

export function sectorProjects(key: string) {
  return projects.filter((p) => p.sector === key);
}

export function sectorSummary(key: string) {
  const list = sectorProjects(key);
  const cities = new Set(list.map((p) => p.city).filter(Boolean));
  const featured = (sectorFeatured[key] ?? []).map(getProject).filter(Boolean) as Project[];
  return {
    key,
    label: sectorLabel(key),
    count: list.length,
    cityCount: cities.size,
    featured,
    examples: sectorExamples[key] ?? [],
  };
}
