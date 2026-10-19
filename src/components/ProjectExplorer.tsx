"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { Sector, SystemDef } from "@/lib/projects";
import type { ShownImg } from "@/lib/media";
import type { CardItem } from "@/lib/cards";
import { ProjectCard } from "./ProjectCards";
import { ArrowRight } from "./Icons";
import { restaurantBranches } from "@/lib/restaurant-branches";

type ArabicaSummary = {
  slug: string;
  title: string;
  branchCount: number;
  cityCount: number;
  cities: string[];
  branchCities: (string | null)[];
  systems: string[];
  image: ShownImg | null;
};

type Filters = { city: string | null; system: string | null };
const EMPTY: Filters = { city: null, system: null };

const MOBILE_Q = "(max-width: 760px)";
const isMobile = () => window.matchMedia(MOBILE_Q).matches;
function subscribeMobile(cb: () => void) {
  const mq = window.matchMedia(MOBILE_Q);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function subscribeHash(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}
const headerH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 76;

function matches(p: CardItem, f: Filters) {
  return (!f.city || p.city === f.city) && (!f.system || p.systems.includes(f.system));
}

export default function ProjectExplorer({
  items,
  sectors,
  systems,
  arabica,
}: {
  items: CardItem[];
  sectors: Sector[];
  systems: SystemDef[];
  arabica: ArabicaSummary;
}) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  // null: varsayılan durum. Adres bir sektörü gösteriyorsa o açık, yoksa masaüstünde ilk sektör açık, mobilde hepsi kapalı.
  const [openState, setOpenSet] = useState<Set<string> | null>(null);
  const isDesktop = useSyncExternalStore(subscribeMobile, () => !isMobile(), () => false);
  const hash = useSyncExternalStore(subscribeHash, () => decodeURIComponent(window.location.hash.slice(1)), () => "");
  const hashSector = sectors.some((s) => s.key === hash) ? hash : null;
  const openSet = openState ?? new Set(hashSector ? [hashSector] : isDesktop ? [sectors[0].key] : []);
  const listRef = useRef<HTMLDivElement>(null);
  const sectorRefs = useRef<Record<string, HTMLElement | null>>({});

  // Ana sayfadaki plakadan ya da sektör dizininden gelindiyse o sektörün başına in
  useEffect(() => {
    if (!hashSector) return;
    const section = sectorRefs.current[hashSector]?.closest("section");
    if (!section) return;
    const t = window.setTimeout(() => {
      const y = section.getBoundingClientRect().top + window.scrollY - headerH() - 8;
      window.scrollTo({ top: y, behavior: "auto" });
    }, 60);
    return () => window.clearTimeout(t);
  }, [hashSector]);

  const filtered = useMemo(() => items.filter((p) => matches(p, filters)), [items, filters]);
  const showArabica =
    (!filters.city || arabica.cities.includes(filters.city)) && (!filters.system || arabica.systems.includes(filters.system));
  const matchingBranches = filters.city
    ? arabica.branchCities.filter((city) => city === filters.city).length
    : arabica.branchCount;

  const groups = useMemo(
    () =>
      sectors.map((s) => ({
        ...s,
        items: filtered.filter((p) => p.sector === s.key).sort((a, b) => Number(b.own) - Number(a.own) || b.year - a.year),
        hasArabica: s.key === "restoran-kafe" && showArabica,
      })),
    [sectors, filtered, showArabica],
  );

  const cityOptions = useMemo(() => {
    const cities = new Set([...items.map((p) => p.city), ...arabica.cities].filter((city): city is string => Boolean(city)));
    return [...cities].sort((a, b) => a.localeCompare(b, "tr")).map((city) => ({
      city,
      projects: items.filter((p) => p.city === city).length,
      branches: arabica.branchCities.filter((branchCity) => branchCity === city).length,
    }));
  }, [items, arabica.cities, arabica.branchCities]);

  const systemOptions = useMemo(
    () =>
      systems
        .map((s) => [s.key, s.label, items.filter((p) => p.systems.includes(s.key)).length] as const)
        .filter(([, , n]) => n > 0),
    [systems, items],
  );

  const total = filtered.length;
  const active = Boolean(filters.city || filters.system);

  const scrollToList = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH() - 16;
    if (window.scrollY > y) window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  function applyFilter(next: Partial<Filters>) {
    const f = { ...filters, ...next };
    setFilters(f);
    if (f.city || f.system) {
      const arabicaMatches = (!f.city || arabica.cities.includes(f.city)) && (!f.system || arabica.systems.includes(f.system));
      setOpenSet(new Set(sectors.filter((s) =>
        items.some((p) => p.sector === s.key && matches(p, f)) || (s.key === "restoran-kafe" && arabicaMatches)
      ).map((s) => s.key)));
    } else {
      setOpenSet(null);
    }
    requestAnimationFrame(scrollToList);
  }

  function toggle(key: string) {
    const bar = sectorRefs.current[key];
    const wasOpen = openSet.has(key);
    const stuck = bar ? bar.getBoundingClientRect().top <= headerH() + 1 : false;

    const next = new Set(isMobile() ? [] : openSet);
    if (wasOpen) next.delete(key);
    else next.add(key);
    setOpenSet(next);

    // Kapatırken bar üstte yapışıksa sektörün başına dön, mobilde açarken barı üste getir
    if (bar && ((wasOpen && stuck) || (!wasOpen && isMobile()))) {
      requestAnimationFrame(() => {
        const section = bar.closest("section") as HTMLElement;
        const y = section.getBoundingClientRect().top + window.scrollY - headerH();
        window.scrollTo({ top: y, behavior: wasOpen ? "auto" : "smooth" });
      });
    }
  }

  return (
    <div className="explorer">
      <aside className="fpanel" aria-label="Projeleri filtrele">
        <div className="fpanel__head">
          <span className="fpanel__count" aria-live="polite">
            {total} proje
            {showArabica && <span className="fpanel__sub">ve Arabica&apos;nın {matchingBranches} şubesi</span>}
          </span>
          <button type="button" className="fpanel__clear" disabled={!active} onClick={() => applyFilter(EMPTY)}>
            Temizle
          </button>
        </div>

        <div className="fgroup">
          <h3>Sistem</h3>
          {systemOptions.map(([key, label, n]) => (
            <button
              key={key}
              type="button"
              className="fopt"
              aria-pressed={filters.system === key}
              onClick={() => applyFilter({ system: filters.system === key ? null : key })}
            >
              <span>{label}</span>
              <span>{n}</span>
            </button>
          ))}
        </div>

        <div className="fgroup">
          <h3>Konum</h3>
          {cityOptions.map(({ city, projects: projectCount, branches }) => (
            <button
              key={city}
              type="button"
              className="fopt"
              aria-pressed={filters.city === city}
              onClick={() => applyFilter({ city: filters.city === city ? null : city })}
            >
              <span>{city}</span>
              <span>{[projectCount ? `${projectCount} proje` : null, branches ? `${branches} şube` : null].filter(Boolean).join(" / ")}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="sectors" ref={listRef}>
        {groups.map((g) => {
          const isOpen = openSet.has(g.key);
          const count = g.items.length;
          const empty = count === 0 && !g.hasArabica;
          const branches = g.key === "restoran-kafe" ? restaurantBranches(g.items, g.hasArabica ? matchingBranches : 0) : null;
          const hint = [g.hasArabica ? "Arabica Coffee House" : null, ...g.items.slice(0, 4).map((p) => p.title.split(", ")[0])]
            .filter(Boolean)
            .join(", ");
          return (
            <section key={g.key} id={g.key} className="sector" data-open={isOpen && !empty} aria-labelledby={`sb-${g.key}`}>
              <h2 className="sector__h">
                <button
                  id={`sb-${g.key}`}
                  ref={(el) => {
                    sectorRefs.current[g.key] = el;
                  }}
                  type="button"
                  className={`sector__bar${branches ? " sector__bar--branches" : ""}`}
                  aria-expanded={isOpen && !empty}
                  aria-controls={`sp-${g.key}`}
                  disabled={empty}
                  style={empty ? { opacity: 0.4, cursor: "default" } : undefined}
                  onClick={() => toggle(g.key)}
                >
                  <span style={{ minWidth: 0 }}>
                    <span className="sector__name">{g.label}</span>
                    {branches && !empty ? (
                      <span className="sector__branches">
                        {branches.map((branch) => (
                          <span key={branch.name} className="sector__branch">
                            <span>{branch.name}</span>
                            <b>{branch.count} {branch.unit}</b>
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="sector__hint">{empty ? "Bu filtreyle eşleşen proje yok" : hint}</span>
                    )}
                  </span>
                  {!branches && <span className="sector__count">{count} proje</span>}
                  <span className="pm" data-open={isOpen && !empty} aria-hidden />
                </button>
              </h2>

              <div className="sector__panel" id={`sp-${g.key}`} role="region" aria-labelledby={`sb-${g.key}`} inert={!isOpen || empty} aria-hidden={!isOpen || empty}>
                <div>
                  {g.hasArabica && (
                    <Link href={`/projeler/${arabica.slug}`} className="program">
                      <div className="program__img tone">
                        {arabica.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={arabica.image.thumb} alt={arabica.image.alt} loading="lazy" />
                        )}
                      </div>
                      <div className="program__body">
                        <span className="label">Zincir mağaza</span>
                        <h3 className="program__title">{arabica.title}</h3>
                        <p className="muted" style={{ margin: 0 }}>
                          {filters.city ? `${filters.city} konumunda ${matchingBranches} şube. Aşağıdaki rakamlar tüm şubeleri kapsar.` : "Türkiye ve yurt dışındaki şubelerin mekanik tesisatı."}
                        </p>
                        <dl className="bignum">
                          <div>
                            <dt>şube</dt>
                            <dd>{arabica.branchCount}</dd>
                          </div>
                          <div>
                            <dt>il</dt>
                            <dd>{arabica.cityCount}</dd>
                          </div>
                          <div>
                            <dt>yurt dışı ülke</dt>
                            <dd>2</dd>
                          </div>
                        </dl>
                        <span className="textlink" style={{ marginTop: "auto", alignSelf: "flex-start" }}>
                          Şubeleri gör <ArrowRight />
                        </span>
                      </div>
                    </Link>
                  )}
                  <div className="pgrid">
                    {g.items.map((p) => (
                      <ProjectCard key={p.slug} item={p} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
