"use client";

import { useState } from "react";
import { Button } from "./Button";
import { saveMapPreference, useMapPreference } from "@/lib/cookie-preferences";
import styles from "./CookieSettings.module.css";

export default function CookieSettings() {
  const saved = useMapPreference();
  const [draft, setDraft] = useState<boolean | null>(null);
  const [status, setStatus] = useState("");
  const checked = draft ?? saved;

  function save(value: boolean) {
    const persisted = saveMapPreference(value);
    setDraft(null);
    if (persisted) {
      setStatus("Tercihiniz kaydedildi.");
    } else {
      setStatus("Tercihiniz bu oturumda uygulandı ancak tarayıcıda saklanamadı.");
    }
  }

  return (
    <div className={styles.settings}>
      <div className={styles.row}>
        <div>
          <h2>Temel işlevler</h2>
          <p>Siteyi görüntülemek ve çerez tercihinizi hatırlamak için gereken işlevler.</p>
        </div>
        <span className={styles.fixed}>Her zaman açık</span>
      </div>
      <div className={styles.row}>
        <div>
          <label htmlFor="maps-preference" className={styles.title}>Konum haritası</label>
          <p id="maps-description">
            İletişim sayfasındaki Etites konum haritasını gösterir. Harita bu siteden yüklenir ve başlangıçta açıktır.
            İsterseniz görüntülenmesini kapatabilirsiniz. Yol tarifi bağlantısı Google Haritalar&apos;ı ayrı sayfada açar.
          </p>
        </div>
        <input
          id="maps-preference"
          type="checkbox"
          role="switch"
          checked={checked}
          aria-describedby="maps-description"
          onChange={(event) => { setDraft(event.target.checked); setStatus(""); }}
        />
      </div>
      <p className={styles.note}>Bu sitede reklam veya ziyaretçi analizi çerezleri kullanılmıyor.</p>
      <div className={styles.actions}>
        <Button variant="ink" icon={null} onClick={() => save(checked)}>Tercihleri kaydet</Button>
        <Button variant="ghost" icon={null} onClick={() => save(false)}>Konum haritasını kapat</Button>
      </div>
      <p className={styles.status} role="status">{status}</p>
    </div>
  );
}
