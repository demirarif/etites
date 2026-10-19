"use client";

import { useSyncExternalStore } from "react";
import { whatsappUrl } from "@/data/site";
import { ArrowRight, Whatsapp } from "../Icons";
import { useTeklif } from "./TeklifProvider";

const HANDHELD_QUERY = "(max-width: 760px), (pointer: coarse)";
function isHandheld() {
  return window.matchMedia(HANDHELD_QUERY).matches;
}
function subscribeHandheld(callback: () => void) {
  const media = window.matchMedia(HANDHELD_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/**
 * Telefonda doğrudan WhatsApp'a (sayfaya göre hazır mesajla) gider,
 * masaüstünde WhatsApp / QR / telefon / form seçeneklerini içeren paneli açar.
 */
export default function TeklifButton({
  className = "",
  label = "Teklif Al",
  variant = "header",
  onActivate,
}: {
  className?: string;
  label?: string;
  variant?: "header" | "large";
  onActivate?: () => void;
}) {
  const { message, open, isOpen } = useTeklif();
  const handheld = useSyncExternalStore(subscribeHandheld, isHandheld, () => false);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    onActivate?.();
    if (isHandheld()) return; // bağlantı WhatsApp'ı açar
    e.preventDefault();
    open();
  }

  return (
    <a
      href={whatsappUrl(message)}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn--primary ${variant === "header" ? "teklif" : ""} ${className}`}
      aria-haspopup={handheld ? undefined : "dialog"}
      aria-expanded={handheld ? undefined : isOpen}
      aria-controls={handheld ? undefined : "teklif-panel"}
    >
      <span className="btn__body">
        <span className="btn__label">
          {variant === "large" && <Whatsapp className="ico-inline" />}
          {label}
        </span>
        <span className="btn__icon">
          <ArrowRight />
        </span>
      </span>
    </a>
  );
}
