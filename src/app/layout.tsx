import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ColorOnCenter from "@/components/ColorOnCenter";
import { TeklifProvider } from "@/components/teklif/TeklifProvider";
import { site } from "@/data/site";
import { pageMetadata, SITE_DESCRIPTION, SITE_LOGO, SITE_NAME, SITE_URL } from "@/lib/metadata";

// Apple aygıtlarında sistemin SF Pro yazı tipi kullanılır (globals.css --f-sans). Inter diğer aygıtlar için.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMetadata({ title: SITE_NAME, description: SITE_DESCRIPTION, path: "/" }),
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#1f2326",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: site.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}${SITE_LOGO}`,
  telephone: "+90 543 254 09 21",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1} ${site.address.line2}`,
    addressLocality: "Yenimahalle",
    addressRegion: "Ankara",
    addressCountry: "TR",
  },
  openingHours: "Mo-Sa 09:00-19:00",
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <TeklifProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TeklifProvider>
        <ColorOnCenter />
      </body>
    </html>
  );
}
