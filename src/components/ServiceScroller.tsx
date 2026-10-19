"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ShownImg } from "@/lib/media";
import { ArrowRight } from "./Icons";

export type ServiceItem = {
  slug: string;
  title: string;
  intro: string;
  scope: string[];
  img: ShownImg | null;
};

/** Solda sabit görsel, sağda alt alta hizmetler. Ekranın ortasına gelen hizmetin görseli solda renkli görünür. */
export default function ServiceScroller({ items }: { items: ServiceItem[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }),
      { rootMargin: "-48% 0px -48% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="svx">
      <div className="svx__media" aria-hidden>
        {items.map(
          (it, i) =>
            it.img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={it.slug} src={it.img.src} alt="" data-active={i === active} loading={i < 2 ? "eager" : "lazy"} />
            ),
        )}
      </div>

      <ol className="svx__list">
        {items.map((it, i) => (
          <li
            key={it.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-i={i}
            data-active={i === active}
            className="svx__item"
          >
            <h2>{it.title}</h2>
            <p>{it.intro}</p>
            <ul className="svx__scope">
              {it.scope.slice(0, 4).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <Link href={`/${it.slug}`} className="textlink" style={{ alignSelf: "flex-start" }}>
              Kapsam ve uygulamalar <ArrowRight />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
