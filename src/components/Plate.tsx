import Link from "next/link";
import type { ShownImg } from "@/lib/media";
import { ArrowRight } from "./Icons";

export type PlateRow = { title: string; scope: string; meta: string; href: string };

/** Ana sayfa plakası: solda sektör ve öne çıkan işler, sağda büyük görsel */
export default function Plate({
  id,
  title,
  meta,
  rows,
  more,
  img,
  last = false,
}: {
  id: string;
  title: string;
  meta: string;
  rows: PlateRow[];
  more: { href: string; label: string };
  img: ShownImg | null;
  last?: boolean;
}) {
  return (
    <section className={`plate${last ? " plate--last" : ""}`} aria-labelledby={`plate-${id}`} data-lit="false">
      <div className="plate__inner">
        <div className="plate__text">
          <div className="plate__body">
            <h2 id={`plate-${id}`} className="plate__title">
              {title}
            </h2>
            <p className="plate__meta">{meta}</p>
            <ul className="plate__list">
              {rows.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="plate__row">
                    <div className="plate__project">
                      <b>{r.title}</b>
                      <span className="plate__scope">{r.scope}</span>
                    </div>
                    <span className="mono">{r.meta}</span>
                    <ArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href={more.href} className="textlink plate__more">
            {more.label} <ArrowRight />
          </Link>
        </div>
        <div className="plate__media">
          {img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img.src} alt={img.alt} loading="lazy" />
          )}
        </div>
      </div>
    </section>
  );
}
