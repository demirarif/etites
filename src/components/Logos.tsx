"use client";

import { useEffect, useRef } from "react";
import refs from "@/data/references.json";

export type Ref = (typeof refs)[number];
export const references = refs as Ref[];

export const groupLabel: Record<string, string> = {
  kurum: "Kurumlar",
  marka: "Markalar ve zincirler",
  sirket: "Şirketler",
  yapi: "Yapı ve inşaat",
  mimar: "Mimarlık ve mühendislik ofisleri",
};

/** Gri tonda logo, üstüne gelince (mobilde ekran ortasından geçerken) kendi rengi */
export function Logo({ r, scale = 1 }: { r: Ref; scale?: number }) {
  return (
    <span className="logo" style={{ width: r.w * scale, height: r.h * scale }} title={r.name}>
      <span className="logo__ink" style={{ maskImage: `url(${r.mask})`, WebkitMaskImage: `url(${r.mask})` }} aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo__color" src={r.src} alt={r.name} loading="lazy" />
    </span>
  );
}

export function useCenterLit(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => ((e.target as HTMLElement).dataset.lit = String(e.isIntersecting))),
      { rootMargin: "-42% 0px -42% 0px" },
    );
    el.querySelectorAll<HTMLElement>(".logo").forEach((l) => io.observe(l));
    return () => io.disconnect();
  }, [containerRef]);
}

export function LogoWall() {
  const ref = useRef<HTMLDivElement>(null);
  useCenterLit(ref);
  return (
    <div ref={ref}>
      {Object.keys(groupLabel).map((g) => {
        const list = references.filter((r) => r.group === g);
        return (
          <section key={g} className="lgroup" aria-labelledby={`lg-${g}`}>
            <h2 id={`lg-${g}`} className="h3">
              {groupLabel[g]}
            </h2>
            <div className="lwall">
              {list.map((r) => (
                <div key={r.name} className="lwall__cell">
                  <Logo r={r} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function ReferenceMarquee() {
  const order = ["kurum", "marka", "yapi", "sirket", "mimar"];
  const list = [...references].sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group));
  return (
    <div className="refband__viewport">
      <div className="refband__track">
        {[0, 1].map((copy) =>
          list.map((r) => (
            <span key={`${copy}-${r.name}`} aria-hidden={copy === 1 || undefined}>
              <Logo r={r} scale={0.92} />
            </span>
          )),
        )}
      </div>
    </div>
  );
}
