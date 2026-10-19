import type { MetadataRoute } from "next";
import { posts } from "@/data/blog";
import { services } from "@/data/services";
import { arabica, projects } from "@/lib/projects";

// Statik çıktıda derleme sırasında dosyaya yazılır
export const dynamic = "force-static";

const BASE = "https://www.etites.com.tr";

// Adresler sitedeki gibi / ile biter (next.config trailingSlash)
const url = (path: string) => `${BASE}${path}/`;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projeler", "/cozumler", "/referanslar", "/hakkimizda", "/iletisim", "/blog"];
  return [
    ...pages.map((p) => ({ url: url(p), priority: p === "" ? 1 : 0.8 })),
    ...["/kisisel-verilerin-korunmasi", "/cerez-ayarlari"].map((p) => ({ url: url(p), priority: 0.3 })),
    ...services.map((s) => ({ url: url(`/${s.slug}`), priority: 0.8 })),
    { url: url(`/projeler/${arabica.slug}`), priority: 0.7 },
    ...projects.map((p) => ({ url: url(`/projeler/${p.slug}`), priority: 0.5 })),
    ...posts.map((p) => ({ url: url(`/blog/${p.slug}`), lastModified: p.date, priority: 0.6 })),
  ];
}
