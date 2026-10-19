"use client";

import { useEffect, useRef, type ReactNode } from "react";

const headerH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 76;

/**
 * Plakalar bir öncekinin üstüne kayar. Üstü kapanan katman hafifçe kararır ve küçülür,
 * yerine oturan plakanın görseli renklenir. Telefonda ve hareket azaltma ayarında efekt yok.
 */
export default function PlateDeck({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const plates = [...root.querySelectorAll<HTMLElement>(".plate")];
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const first = root.firstElementChild as HTMLElement | null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 900px)");
    let raf = 0;

    const coverOf = (nextTop: number, vh: number, hh: number) => Math.min(1, Math.max(0, (vh - nextTop) / (vh - hh)));

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const hh = headerH();
      const motion = !reduce.matches && !small.matches;

      if (hero && first) hero.style.setProperty("--cover", motion ? coverOf(first.getBoundingClientRect().top, vh, hh).toFixed(3) : "0");

      plates.forEach((pl, i) => {
        const r = pl.getBoundingClientRect();
        const next = plates[i + 1];
        const cover = next && motion ? coverOf(next.getBoundingClientRect().top, vh, hh) : 0;
        pl.style.setProperty("--cover", cover.toFixed(3));
        const seated = small.matches ? r.top < vh * 0.6 && r.bottom > vh * 0.4 : r.top <= hh + vh * 0.14 && r.bottom > hh + 80;
        pl.dataset.lit = String(seated && cover < 0.55);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      hero?.style.removeProperty("--cover");
    };
  }, []);

  return (
    <div ref={ref} className="deck">
      {children}
    </div>
  );
}
