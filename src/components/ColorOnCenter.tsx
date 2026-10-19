"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Dokunmatik ekranda üstüne gelme olmadığı için gri görseller ekranın ortasından geçerken renklenir. */
export default function ColorOnCenter() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => ((e.target as HTMLElement).dataset.lit = String(e.isIntersecting))),
      { rootMargin: "-40% 0px -40% 0px" },
    );
    document.querySelectorAll<HTMLElement>(".tone").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
