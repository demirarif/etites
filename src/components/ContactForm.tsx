"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { Whatsapp } from "./Icons";
import { whatsappUrl } from "@/data/site";
import { CONTACT_TYPES, contactMessage, type ContactType } from "@/lib/contact-message";

// Mesaj tarayıcıda hazırlanır. Ziyaretçi gönderimi WhatsApp'ta tamamlar.
export default function ContactForm() {
  const [type, setType] = useState<ContactType>("teklif");
  const [readyUrl, setReadyUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const current = CONTACT_TYPES.find((t) => t.key === type)!;

  function clearStatus() {
    setError(null);
    setReadyUrl(null);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = contactMessage(type, new FormData(e.currentTarget));
    if ("error" in result) {
      setError(result.error);
      setReadyUrl(null);
      return;
    }
    const url = whatsappUrl(result.message);
    setError(null);
    setReadyUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form id="form" className="form" onSubmit={onSubmit} onChange={clearStatus}>
      <h2 className="h2" style={{ fontSize: "1.5rem" }}>
        Talebinizi iletin
      </h2>
      <p className="form__notice" id="form-availability">
        Bilgileri doldurun, mesajınızı WhatsApp&apos;ta açıp gönderin.
      </p>

      <div className="seg" role="group" aria-label="Talep tipi">
        {CONTACT_TYPES.map((t) => (
          <button key={t.key} type="button" aria-pressed={type === t.key} onClick={() => { setType(t.key); clearStatus(); }}>
            {t.label}
          </button>
        ))}
      </div>
      <p className="form__hint">{current.hint}</p>

      <div className="form__row">
        <div className="field">
          <label htmlFor="f-ad">
            Ad soyad *
          </label>
          <input id="f-ad" name="ad" autoComplete="name" required maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="f-firma">
            Firma / kurum
          </label>
          <input id="f-firma" name="firma" autoComplete="organization" maxLength={160} />
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="f-tel">
            Telefon *
          </label>
          <input id="f-tel" name="telefon" type="tel" autoComplete="tel" placeholder="05xx xxx xx xx" required maxLength={30} />
        </div>
        <div className="field">
          <label htmlFor="f-mail">
            E-posta
          </label>
          <input id="f-mail" name="eposta" type="email" autoComplete="email" maxLength={254} />
        </div>
      </div>

      {(type === "teklif" || type === "kesif") && (
        <div className="form__row">
          <div className="field">
            <label htmlFor="f-il">
              Proje yeri (il / ilçe)
            </label>
            <input id="f-il" name="il" placeholder="Ankara / Çankaya" maxLength={160} />
          </div>
          <div className="field">
            <label htmlFor="f-alan">
              Yaklaşık alan (m²)
            </label>
            <input id="f-alan" name="alan" type="number" min="1" step="any" placeholder="ör. 850" />
          </div>
        </div>
      )}

      <div className="field">
        <label htmlFor="f-mesaj">
          {type === "ariza" ? "Arızayı kısaca anlatın *" : type === "bakim" ? "Bakım ihtiyacınızı anlatın *" : "Projenizi kısaca anlatın *"}
        </label>
        <textarea
          id="f-mesaj"
          name="mesaj"
          required
          maxLength={2000}
          placeholder={
            type === "ariza"
              ? "Hangi sistem, ne zamandan beri, nasıl bir belirti?"
              : type === "bakim" ? "Bakım yapılacak sistemler, mevcut durum, takvim..." : "Yapı tipi, istenen sistemler, takvim..."
          }
        />
      </div>

      {(type === "teklif" || type === "kesif") && (
        <p className="form__hint">Proje veya çizim dosyanız varsa WhatsApp&apos;ta mesaja ekleyebilirsiniz.</p>
      )}

      <p className="form__privacy">
        Bilgileriniz talebinizi değerlendirmek için kullanılır. <Link href="/kisisel-verilerin-korunmasi">Aydınlatma metni</Link>
      </p>

      {error && (
        <p className="form__error" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" block icon={<Whatsapp />}>
        WhatsApp&apos;ta devam et
      </Button>

      {readyUrl && (
        <p className="form__status" role="status">
          Mesajınız hazır. Gönderimi WhatsApp&apos;ta tamamlayabilirsiniz. <a href={readyUrl} target="_blank" rel="noopener noreferrer">Mesajı aç</a>
        </p>
      )}
    </form>
  );
}
