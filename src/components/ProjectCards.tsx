import Link from "next/link";
import type { CardItem } from "@/lib/cards";
import { imageLabel } from "@/lib/image-label";

/** Proje kartı: gri görsel, üstüne gelince renkli. Altında ad, sistemler, il ve yıl. */
export function ProjectCard({ item }: { item: CardItem }) {
  return (
    <Link href={`/projeler/${item.slug}`} className="card">
      <div className="card__media tone">
        {item.img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.img.thumb} alt={item.img.alt} loading="lazy" />
        )}
      </div>
      <div className="card__body">
        {item.img && imageLabel(item.img) && <span className="card__source">{imageLabel(item.img)}</span>}
        <h3 className="card__title">{item.title}</h3>
        <span className="card__sys">{item.sys}</span>
        <span className="card__meta">{item.meta}</span>
      </div>
    </Link>
  );
}
