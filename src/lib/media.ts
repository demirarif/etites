import stock from "@/data/stock.json";
import { featuredSet, projects, sectors, type Project } from "./projects";

// Görsel sırası: firmanın kendi fotoğrafı, kurumun ya da yapının kamuya açık görseli, sektöre uygun stok.
export type StockImg = {
  key: string;
  category: string;
  src: string;
  thumb: string;
  w: number;
  h: number;
  description: string;
  credit: string;
  license: string;
  source: string;
  kind: "stock" | "public" | "brand";
  projects?: string[];
  /** Aynı tesisin tek fotoğrafı, listelenen projelerin hepsinde kullanılır */
  shared?: boolean;
};

export type ShownImg = {
  src: string;
  thumb: string;
  w: number;
  h: number;
  kind: "own" | "stock" | "public" | "brand";
  credit?: string;
  license?: string;
  source?: string;
  alt: string;
};

export const stockImages = stock as StockImg[];

function byCategory(cat: string) {
  return stockImages.filter((s) => s.category === cat);
}

function byKey(key: string) {
  return stockImages.find((s) => s.key === key);
}

/** Eski sitedeki görsellerden kullanılmayanlar: yazılı pano, boş inşaat alanı, başka projede tekrar eden render. */
const OWN_SKIP = new Set([
  "mustafa-demiralp-make-up-hair-studio",
  "mahall-ankara-212-no-lu-ofis",
  "mahall-ankara-b-blok-185-no-lu-ofis",
  "mahall-ankara-e-blok-45-no-lu-ofis",
  "eskisehir-osmangazi-universitesi-tip-fakultesi-hastanesi",
  "1071-cukurambar-ofisi-usta-insaat",
  "yildiz-kule-ofisi",
  "turkerler-mahall-ankara-havalandirma-tadilati",
  "mahall-ankara-f07-kurumsal-ofisi",
  "mahall-ankara-44-no-lu-ofis",
]);

/** Sektörün stok havuzu, öncelik sırasıyla */
const SECTOR_POOL: Record<string, string[]> = {
  "kamu-savunma": ["kamu", "teknik"],
  "ofis-plaza": ["ofis"],
  "restoran-kafe": ["kafe"],
  "magaza-avm": ["magaza"],
  "saglik-spor": ["saglik", "spor"],
  "endustri-enerji": ["endustri", "teknik"],
  "konut-villa": ["konut"],
};

function poolFor(p: Project) {
  let cats = SECTOR_POOL[p.sector] ?? ["teknik"];
  if (p.sector === "saglik-spor") cats = /gym|spor|fit/i.test(p.title) ? ["spor", "saglik"] : ["saglik", "spor"];
  return cats.flatMap(byCategory).filter((s) => !s.projects?.length);
}

function fromStock(s: StockImg, alt: string): ShownImg {
  return { src: s.src, thumb: s.thumb, w: s.w, h: s.h, kind: s.kind, credit: s.credit, license: s.license, source: s.source, alt: s.kind === "stock" ? s.description : alt };
}

/**
 * Atama bir kez, derleme sırasında yapılır. Aynı sektör listesinde aynı görsel iki kez çıkmaz.
 * Öne çıkan işler en iyi görselleri önce alır.
 */
const assigned = (() => {
  const out = new Map<string, ShownImg>();
  const usedExplicit = new Set<string>();

  for (const sector of sectors) {
    const list = projects
      .filter((p) => p.sector === sector.key)
      .sort((a, b) => Number(featuredSet.has(b.slug)) - Number(featuredSet.has(a.slug)) || b.year - a.year || a.slug.localeCompare(b.slug));
    const usedInSector = new Set<string>();

    // 1) Kendi fotoğrafı ya da projeye özel kurum ve yapı görseli
    const pending: Project[] = [];
    for (const p of list) {
      const own = p.images[0];
      if (own && !OWN_SKIP.has(p.slug)) {
        out.set(p.slug, { ...own, kind: "own", alt: p.title });
        continue;
      }
      const explicit = stockImages.find((s) => s.projects?.includes(p.slug) && (s.shared || !usedExplicit.has(s.key)));
      if (explicit) {
        usedExplicit.add(explicit.key);
        usedInSector.add(explicit.key);
        out.set(p.slug, fromStock(explicit, p.title));
        continue;
      }
      pending.push(p);
    }

    // 2) Sektör havuzundan, tekrarsız. Havuz biterse en az kullanılandan devam eder.
    const useCount = new Map<string, number>();
    for (const p of pending) {
      const pool = poolFor(p);
      if (!pool.length) continue;
      const free = pool.find((s) => !usedInSector.has(s.key));
      const pick = free ?? [...pool].sort((a, b) => (useCount.get(a.key) ?? 0) - (useCount.get(b.key) ?? 0))[0];
      usedInSector.add(pick.key);
      useCount.set(pick.key, (useCount.get(pick.key) ?? 0) + 1);
      out.set(p.slug, fromStock(pick, p.title));
    }
  }
  return out;
})();

export function projectImage(p: Project): ShownImg | null {
  return assigned.get(p.slug) ?? null;
}

export function projectGallery(p: Project) {
  return OWN_SKIP.has(p.slug) ? p.images : p.images.slice(1);
}

/** Çözüm sayfası görseli: services.ts içinde anahtarıyla seçilir */
export function serviceImage(key: string): ShownImg | null {
  const img = byKey(key);
  return img ? fromStock(img, img.description) : null;
}

// Arabica görsellerinin sırası: geniş cephe önce, yurt dışı şubesi ilk üçte
const ARABICA_ORDER = ["arabica-01", "arabica-04", "arabica-02", "arabica-03", "arabica-05", "arabica-06", "arabica-1"];

export function arabicaImages(): ShownImg[] {
  const rank = (k: string) => (ARABICA_ORDER.includes(k) ? ARABICA_ORDER.indexOf(k) : ARABICA_ORDER.length);
  return byCategory("arabica")
    .sort((a, b) => rank(a.key) - rank(b.key))
    .map((s) => fromStock(s, s.description ? `Arabica Coffee House, ${s.description}` : "Arabica Coffee House şubesi"));
}

export function arabicaImage(): ShownImg | null {
  return arabicaImages()[0] ?? null;
}

/** İlk bulunan anahtar. Ana sayfa girişi ve plakalar için elle seçilen görseller. */
export function pickImage(keys: string[], alt: string): ShownImg | null {
  for (const k of keys) {
    const s = byKey(k);
    if (s) return fromStock(s, alt);
  }
  return null;
}

/** Görselin altındaki kaynak notu. Kendi fotoğrafında not yok. */
export function imageCaption(img: ShownImg) {
  if (img.kind === "own") return null;
  // Creative Commons görsellerinde lisans adı künyede görünmeli
  const license = img.license ?? "";
  const withLicense = /^CC/i.test(license) && !(img.credit ?? "").includes(license);
  const credit = [img.credit, withLicense ? license : null].filter(Boolean).join(", ");
  if (img.kind === "stock") return `Temsili görsel. ${credit}`.trim();
  return credit || null;
}
