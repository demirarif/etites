// Siteye özel çizilmiş çizgi ikonlar (24px ızgara, 1.75 kalınlık). Emoji veya hazır paket yok.
type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
};

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 12h16M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3v16M6 13l6 6 6-6" />
  </svg>
);

export const Chevron = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const Phone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  </svg>
);

export const Mail = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 5h18v14H3z" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);

export const Pin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
    <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  </svg>
);

export const Clock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Copy = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 8h12v12H8z" />
    <path d="M16 8V4H4v12h4" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} strokeWidth={2.5} {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const Upload = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 16V4M7 9l5-5 5 5M4 15v5h16v-5" />
  </svg>
);

export const Route = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="18" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5" />
  </svg>
);

// WhatsApp: sohbet balonu + ahize, çizgi diliyle yeniden çizildi
export const Whatsapp = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 20.5 5.6 16.6A8.5 8.5 0 1 1 8.6 19.6Z" />
    <path d="M9.2 8.2h1.6l.9 2.2-1 .8a5.6 5.6 0 0 0 2.6 2.6l.8-1 2.2.9v1.6a1 1 0 0 1-1.1 1A7 7 0 0 1 8.2 9.3a1 1 0 0 1 1-1.1Z" strokeWidth={1.4} />
  </svg>
);

export const Instagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17 7h.01" strokeWidth={2.6} />
  </svg>
);

export const Linkedin = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
    <path d="M8 10.5V16.5" />
    <path d="M8 7.4v.2" strokeWidth={2.4} />
    <path d="M11.5 16.5v-6M11.5 13a2.5 2.5 0 0 1 5 0v3.5" />
  </svg>
);

export const Facebook = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4A20 20 0 0 0 15.3 4c-2.3 0-3.9 1.4-3.9 4v2.5H8.8v3h2.6V21" />
  </svg>
);

// X (eski Twitter): kalın şerit + ince çizgi, kapatma ikonuyla karışmasın diye
export const XLogo = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 4h4.6L20 20h-4.6Z" fill="currentColor" stroke="none" />
    <path d="M19.4 4 13.4 10.8M10.6 13.2 4.6 20" />
  </svg>
);

export const socialIcon: Record<string, (p: P) => React.ReactElement> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  x: XLogo,
};
