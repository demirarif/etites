"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { site, whatsappUrl } from "@/data/site";
import { ArrowRight, Close, Phone, Mail, Whatsapp } from "../Icons";
import { useTeklif } from "./TeklifProvider";
import CopyButton from "../CopyButton";
import { useDialogFocus } from "../useDialogFocus";

export default function TeklifPanel() {
  const { isOpen, close, message } = useTeklif();
  const [qr, setQr] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const url = whatsappUrl(message);

  useDialogFocus(isOpen, panelRef, closeRef, close);

  useEffect(() => {
    if (!isOpen) return;
    QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#0b0d10", light: "#0000" } })
      .then(setQr)
      .catch(() => setQr(""));
  }, [isOpen, url]);

  return (
    <div ref={panelRef} className="tpanel" data-open={isOpen} aria-hidden={!isOpen} inert={!isOpen}>
      <div className="tpanel__scrim" onClick={close} />
      <div id="teklif-panel" className="tpanel__sheet" role="dialog" aria-modal="true" aria-labelledby="tpanel-title">
        <div className="tpanel__top">
          <h2 id="tpanel-title" className="h2">
            Teklif ve keşif
          </h2>
          <button ref={closeRef} className="iconbtn" onClick={close} aria-label="Paneli kapat" tabIndex={isOpen ? 0 : -1}>
            <Close />
          </button>
        </div>


        <div className="bubble">
          {message}
          <small>WhatsApp&apos;ta bu mesajla açılır, göndermeden önce düzenleyebilirsiniz.</small>
        </div>

        <a className="btn btn--primary btn--block" href={url} target="_blank" rel="noopener noreferrer" tabIndex={isOpen ? 0 : -1}>
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

        <div className="qr">
          <div className="qr__code" aria-label="WhatsApp QR kodu" dangerouslySetInnerHTML={{ __html: qr }} />
          <div>
            <span style={{ fontWeight: 600 }}>Telefondan devam edin</span>
            <p>Kameranızla okutun, WhatsApp aynı mesajla telefonunuzda açılır.</p>
          </div>
        </div>

        <div className="tpanel__alt">
          <div className="crow">
            <span className="crow__icon">
              <Phone />
            </span>
            <div>
              <span className="crow__label">Telefon</span>
              <a className="crow__value" href={site.phoneHref} tabIndex={isOpen ? 0 : -1}>
                {site.phoneDisplay}
              </a>
            </div>
            <CopyButton text={site.phoneDisplay} label="Telefon numarasını kopyala" tabIndex={isOpen ? 0 : -1} />
          </div>
          <div className="crow">
            <span className="crow__icon">
              <Mail />
            </span>
            <div>
              <span className="crow__label">Form ile yazın</span>
              <Link className="crow__value" href="/iletisim#form" onClick={close} tabIndex={isOpen ? 0 : -1}>
                Teklif formunu açın
              </Link>
            </div>
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
