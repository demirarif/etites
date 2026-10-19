"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Keeps an open overlay keyboard accessible and restores its trigger on close. */
export function useDialogFocus(
  open: boolean,
  containerRef: RefObject<HTMLElement | null>,
  initialFocusRef: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!open || !container) return;

    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const background = new Map<HTMLElement, boolean>();
    let branch: HTMLElement = container;

    // Keep the overlay's complete ancestor branch active, including its backdrop.
    while (branch.parentElement && branch !== document.body) {
      for (const sibling of branch.parentElement.children) {
        if (sibling instanceof HTMLElement && sibling !== branch && !["SCRIPT", "STYLE", "LINK"].includes(sibling.tagName)) {
          background.set(sibling, sibling.inert);
          sibling.setAttribute("inert", "");
        }
      }
      branch = branch.parentElement;
    }

    document.body.style.overflow = "hidden";

    const focusable = () => [...container.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => el.tabIndex >= 0 && !el.matches(":disabled") && !el.closest("[inert]") && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== "hidden",
    );
    const focusFirst = () => (initialFocusRef.current ?? focusable()[0] ?? container).focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (!first || !last) {
        event.preventDefault();
        container.focus({ preventScroll: true });
      } else if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !container.contains(event.target)) focusFirst();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    focusFirst();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
      background.forEach((inert, el) => {
        if (inert) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      });
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected && !trigger.closest("[inert]")) trigger.focus({ preventScroll: true });
    };
  }, [open, containerRef, initialFocusRef, onClose]);
}
