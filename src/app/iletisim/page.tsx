import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { PageHero } from "@/components/Blocks";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";
import { Clock, Mail, Phone, Pin, Route, Whatsapp } from "@/components/Icons";
import MapEmbed from "@/components/MapEmbed";
import { defaultWhatsappMessage, mapsDirectionsUrl, site, whatsappUrl } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "İletişim",
  path: "/iletisim",
  description: `${site.address.line1} ${site.address.line2}, ${site.address.line3}. Telefon ${site.phoneDisplay}.`,
});

export default function ContactPage() {
  return (
    <>
      <PageHero title="İletişim" />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap contact">
          <div>
            <div className="contact__actions">
              <ButtonLink href={whatsappUrl(defaultWhatsappMessage)} external icon={<Whatsapp />}>
                WhatsApp&apos;tan yazın
              </ButtonLink>
              <ButtonLink href={mapsDirectionsUrl()} external variant="ghost" icon={<Route />}>
                Yol tarifi al
              </ButtonLink>
            </div>

            <div className="contact__rows">
              <div className="crow">
                <span className="crow__icon">
                  <Pin />
                </span>
                <div>
                  <span className="crow__label">Adres</span>
                  <span className="crow__value">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <br />
                    {site.address.line3}
                  </span>
                </div>
                <CopyButton text={`${site.address.line1} ${site.address.line2} ${site.address.line3}`} label="Adresi kopyala" />
              </div>
              <div className="crow">
                <span className="crow__icon">
                  <Phone />
                </span>
                <div>
                  <span className="crow__label">Telefon ve WhatsApp</span>
                  <a className="crow__value" href={site.phoneHref}>
                    {site.phoneDisplay}
                  </a>
                </div>
                <CopyButton text={site.phoneDisplay} label="Telefon numarasını kopyala" />
              </div>
              <div className="crow">
                <span className="crow__icon">
                  <Mail />
                </span>
                <div>
                  <span className="crow__label">E-posta</span>
                  <a className="crow__value" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </div>
                <CopyButton text={site.email} label="E-posta adresini kopyala" />
              </div>
              <div className="crow">
                <span className="crow__icon">
                  <Clock />
                </span>
                <div>
                  <span className="crow__label">Çalışma saatleri</span>
                  <span className="crow__value">{site.hours}</span>
                </div>
                <span />
              </div>
            </div>

            <MapEmbed />
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
