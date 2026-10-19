"use client";

import { brand, mapsDirectionsUrl } from "@/data/site";
import { saveMapPreference, useMapPreference } from "@/lib/cookie-preferences";
import { ArrowRight } from "./Icons";

// Harita ve logo bu siteden yüklenir. Harici hizmet yalnız yol tarifi bağlantısı açıldığında kullanılır.
export default function MapEmbed() {
  const allowed = useMapPreference();
  return (
    <div className={`mapbox${allowed ? "" : " mapbox--hidden"}`}>
      {allowed ? (
        <>
          <div className="mapbox__canvas">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="mapbox__image" src="/maps/office-map.svg" alt="Ankara Astor Business Center çevresindeki yollar ve Etites ofis konumu" width={1200} height={780} loading="lazy" />
            <span className="mapbox__point" aria-hidden />
            <a className="mapbox__marker" href={mapsDirectionsUrl()} target="_blank" rel="noopener noreferrer" aria-label="Etites ofisine yol tarifi al">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={brand.color} alt="Etites" width={brand.w} height={brand.h} />
            </a>
            <a className="mapbox__credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a>
          </div>
          <div className="mapbox__caption">
            <div><b>Astor Business Center</b><span>OSTİM, Ankara</span></div>
            <a href={mapsDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="textlink">Yol tarifi al <ArrowRight /></a>
          </div>
        </>
      ) : (
        <div className="mapbox__notice">
          <h3 className="h3">Ofis konumu</h3>
          <p>Konum haritasını tercihlerinizden kapattınız. Buradan yeniden görüntüleyebilirsiniz.</p>
          <button className="textlink" type="button" onClick={() => saveMapPreference(true)}>Haritayı göster <ArrowRight /></button>
        </div>
      )}
    </div>
  );
}
