import type { Metadata } from "next";

export const SITE_URL = "https://www.etites.com.tr";
export const SITE_NAME = "Etites İklimlendirme";
export const SITE_DESCRIPTION =
  "Ankara OSTİM'de mekanik tesisat ve iklimlendirme. Isıtma, soğutma, VRF klima, havalandırma, yangın ve sıhhi tesisat hizmetleri.";
export const SITE_LOGO = "/brand/etites-logo-renkli.png";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadata): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const image = {
    url: SITE_LOGO,
    width: 443,
    height: 138,
    alt: SITE_NAME,
  };

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "tr_TR",
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
