"use client";

import { useState } from "react";
import { Check, Copy } from "./Icons";

export default function CopyButton({ text, label, tabIndex }: { text: string; label: string; tabIndex?: number }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      setDone(false);
    }
  }

  return (
    <button type="button" className="iconbtn" onClick={copy} aria-label={done ? "Kopyalandı" : label} tabIndex={tabIndex}>
      {done ? <Check /> : <Copy />}
    </button>
  );
}
