// Firma bilgileri mevcut etites.com.tr sitesinden alındı (Ekim 2026).
export const site = {
  name: "Etites İklimlendirme",
  // Mevcut sitedeki firma adı. Tam ticari unvan yayın öncesinde firma tarafından doğrulanmalı.
  legalName: "Etites İklimlendirme",
  phoneDisplay: "0543 254 09 21",
  phoneHref: "tel:+905432540921",
  whatsappNumber: "905432540921",
  email: "info@etites.com.tr",
  address: {
    line1: "Turgut Özal Mah. 1461/1. Cad.",
    line2: "Astor Business Center No: 42/31-54",
    line3: "OSTİM, Yenimahalle / Ankara",
  },
  hours: "Pazartesi-Cumartesi, 09.00-19.00",
  mapsQuery: "Astor Business Center, Turgut Özal Mah. 1461/1. Cad. No:42, OSTİM, Yenimahalle, Ankara",
  // YouTube mevcut sitede kanalsız (sadece youtube.com) olduğu için alınmadı.
  social: [
    { key: "instagram", label: "Instagram", href: "https://www.instagram.com/etitesiklimlendirme/" },
    { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/etites-i%CC%87klimlendirme" },
    { key: "facebook", label: "Facebook", href: "https://facebook.com/etitesiklimlendirme" },
    { key: "x", label: "X", href: "https://twitter.com/etitesiklim" },
  ],
} as const;

// Mevcut logo. Koyu zeminde beyaz, açık zeminde renkli sürüm.
export const brand = {
  white: "/brand/etites-logo-beyaz.svg",
  black: "/brand/etites-logo-siyah.svg",
  color: "/brand/etites-logo-renkli.png",
  w: 443,
  h: 138,
} as const;

export const nav = [
  { href: "/", label: "Anasayfa" },
  { href: "/projeler", label: "Projeler" },
  { href: "/cozumler", label: "Çözümler" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const defaultWhatsappMessage = "Merhaba, bir projem var. Görüşmek isterim.";

export function whatsappUrl(message: string = defaultWhatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mapsDirectionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`;
}
