"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { brand, nav, site, whatsappUrl, defaultWhatsappMessage } from "@/data/site";
import TeklifButton from "./teklif/TeklifButton";
import { ArrowRight, Phone, Whatsapp } from "./Icons";
import { useDialogFocus } from "./useDialogFocus";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const headerH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 76;

// Kaydırma, boyut ve sayfa değişiminde yeniden ölçülür
function subscribe(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  window.addEventListener("resize", cb);
  const main = document.querySelector("main");
  const mo = main ? new MutationObserver(cb) : null;
  if (main && mo) mo.observe(main, { childList: true, subtree: true });
  return () => {
    window.removeEventListener("scroll", cb);
    window.removeEventListener("resize", cb);
    mo?.disconnect();
  };
}

/** Girişin üstündeyken menü şeffaf, altındaki plaka menüye değince antrasit */
function overHeroSnapshot() {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return "none";
  return window.scrollY < hero.offsetHeight - headerH() - 1 ? "true" : "false";
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useDialogFocus(menuOpen, navigationRef, menuButtonRef, closeMenu);
  const serverSnapshot = useCallback(() => (pathname === "/" ? "true" : "none"), [pathname]);
  const overHero = useSyncExternalStore(subscribe, overHeroSnapshot, serverSnapshot);

  // Sayfa değişince menüyü kapat
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1101px)");
    const onChange = () => { if (desktop.matches) closeMenu(); };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [closeMenu]);

  const over = menuOpen || overHero === "none" ? undefined : overHero;

  return (
    <div ref={navigationRef} role={menuOpen ? "dialog" : undefined} aria-modal={menuOpen || undefined} aria-label={menuOpen ? "Ana menü" : undefined}>
      <header className="hdr" data-over-hero={over}>
        <div className="wrap hdr__inner">
          <Link href="/" className="hdr__logo" aria-label="Etites İklimlendirme ana sayfa">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.white} alt="Etites" width={brand.w} height={brand.h} />
          </Link>

          <nav className="hdr__nav" aria-label="Ana menü">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hdr__link"
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <TeklifButton className="hdr__cta" onActivate={closeMenu} />

          <button
            ref={menuButtonRef}
            type="button"
            className="hdr__menu"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            aria-controls="mobil-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav id="mobil-menu" className="mnav" data-open={menuOpen} aria-hidden={!menuOpen} inert={!menuOpen} aria-label="Mobil ana menü">
        <div className="wrap" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <ul className="mnav__list">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="mnav__link"
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <ArrowRight />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mnav__foot on-dark">
            <a
              className="btn btn--primary btn--block"
              href={whatsappUrl(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="btn__body">
                <span className="btn__label">
                  <Whatsapp className="ico-inline" />
                  WhatsApp&apos;tan yazın
                </span>
                <span className="btn__icon">
                  <ArrowRight />
                </span>
              </span>
            </a>
            <a className="btn btn--ghost btn--block" href={site.phoneHref} tabIndex={menuOpen ? 0 : -1}>
              <span className="btn__body">
                <span className="btn__label">
                  <Phone className="ico-inline" />
                  {site.phoneDisplay}
                </span>
                <span className="btn__icon">
                  <ArrowRight />
                </span>
              </span>
            </a>
            <p className="mnav__addr">
              {site.address.line2}, {site.address.line3}
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
}
