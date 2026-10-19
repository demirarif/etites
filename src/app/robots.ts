import type { MetadataRoute } from "next";

// Statik çıktıda derleme sırasında dosyaya yazılır
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.etites.com.tr/sitemap.xml",
  };
}
