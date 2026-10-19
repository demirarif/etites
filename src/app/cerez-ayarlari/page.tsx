import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import CookieSettings from "@/components/CookieSettings";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Çerez ayarları",
  description: "Etites web sitesindeki çerez tercihlerinizi görüntüleyin ve değiştirin.",
  path: "/cerez-ayarlari",
});

export default function CookieSettingsPage() {
  return (
    <>
      <PageHero title="Çerez ayarları" lead="Site tercihlerinizi buradan değiştirebilirsiniz. Konum haritasını kapatmanız sitenin diğer bölümlerini kullanmanızı engellemez." />
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <CookieSettings />
          <div className="prose readable" style={{ marginTop: 32 }}>
            <p>
              Tercihiniz bu tarayıcıda 180 gün boyunca geçerli kalır. Süre dolduğunda veya site verilerini
              sildiğinizde konum haritası varsayılan olarak yeniden görünür olur. Sayfanın altındaki Çerez ayarları bağlantısından bu sayfaya her zaman ulaşabilirsiniz.
            </p>
            <Link href="/kisisel-verilerin-korunmasi#cerezler" className="textlink">Çerez politikası ve kişisel verilerin korunması</Link>
          </div>
        </div>
      </section>
    </>
  );
}
