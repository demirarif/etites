"use client";

import { useId, useState } from "react";

export default function Faq({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();
  return (
    <div className="faq">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="faq__item" data-open={isOpen}>
            <h3 style={{ margin: 0 }}>
              <button
                className="faq__q"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {it.q}
                <span className="pm" data-open={isOpen} aria-hidden />
              </button>
            </h3>
            <div className="faq__a" id={`${id}-${i}`} role="region">
              <div>
                <p>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
