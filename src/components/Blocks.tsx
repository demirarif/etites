import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { process } from "@/data/content";
import TeklifButton from "./teklif/TeklifButton";
import CopyButton from "./CopyButton";

/** İç sayfa başlığı: konum yolu, başlık, isteğe bağlı kısa açıklama */
export function PageHero({
  title,
  lead,
  crumbs,
  children,
}: {
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: { href: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="pagehero">
      <div className="wrap pagehero__inner">
        {crumbs && (
          <nav className="crumbs" aria-label="Konum">
            {crumbs.map((c, i) => (
              <span key={`${i}-${c.label}`} style={{ display: "contents" }}>
                {i > 0 && <span aria-hidden>/</span>}
                <Link href={c.href}>{c.label}</Link>
              </span>
            ))}
          </nav>
        )}
        <h1 className="h1">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** Bölüm başlığı */
export function SectionHead({ id, label, title, aside }: { id?: string; label?: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <div className="sh">
      <div>
        {label && <p className="label">{label}</p>}
        <h2 id={id} className="h2">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}

/** Çalışma süreci: altı adım */
export function ProcessLine() {
  return (
    <ol className="proc">
      {process.map((s, i) => (
        <li key={s.title}>
          <span className="proc__n">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="proc__title">{s.title}</h3>
          <p className="proc__text">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Teklif bandı: açık zeminli iletişim alanı */
export function CtaBand({ text }: { text?: string }) {
  return (
    <section className="section cta" aria-labelledby="cta-title">
      <div className="wrap cta__inner">
        <div style={{ display: "grid", gap: 14 }}>
          <h2 id="cta-title" className="h2">
            Teklif ve keşif
          </h2>
          <p className="lead">{text ?? "Projenizin kapsamını ve ihtiyaçlarınızı birlikte değerlendirelim."}</p>
        </div>
        <div className="cta__side">
          <TeklifButton variant="large" label="WhatsApp'tan yazın" />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a className="cta__phone" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
            <CopyButton text={site.phoneDisplay} label="Telefon numarasını kopyala" />
          </div>
          <span className="muted" style={{ fontSize: 14.5 }}>
            {site.hours}
          </span>
        </div>
      </div>
    </section>
  );
}
