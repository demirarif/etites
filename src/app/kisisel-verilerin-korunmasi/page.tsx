import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import styles from "./policy.module.css";

export const metadata = pageMetadata({
  title: "Kişisel verilerin korunması",
  description: "Etites web sitesi için KVKK aydınlatma metni, gizlilik, çerez politikası ve başvuru bilgileri.",
  path: "/kisisel-verilerin-korunmasi",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Kişisel verilerin korunması" lead="KVKK aydınlatma metni, gizlilik ve çerez politikası ile başvuru bilgilerine aşağıdaki başlıklardan ulaşabilirsiniz." />
      <section className="section" style={{ paddingTop: 40 }}>
        <div className={`wrap ${styles.layout}`}>
          <p className={styles.updated}>Güncelleme: 6 Ekim 2026</p>
          <div className={styles.documents}>
            <details open>
              <summary><h2>KVKK aydınlatma metni</h2><span aria-hidden>+</span></summary>
              <div className={`prose ${styles.body}`}>
                <p>
                  Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Etites web sitesini ziyaret eden ve
                  iletişim formu, telefon, e-posta veya WhatsApp üzerinden bizimle iletişime geçen kişileri bilgilendirmek için hazırlanmıştır.
                </p>
                <h3>Veri sorumlusu</h3>
                <p>
                  Veri sorumlusu {site.legalName}&apos;dir. İletişim adresimiz {site.address.line1}, {site.address.line2}, {site.address.line3}.
                  E-posta: <a href={`mailto:${site.email}`}>{site.email}</a>.
                </p>
                <h3>Veriler ve işleme amaçları</h3>
                <p>
                  Görüşme sırasında paylaştığınız ad, soyad, telefon, e-posta, proje adresi ve talep bilgileri, sorularınızı
                  yanıtlamak, keşif ve teklif hazırlamak, hizmet sürecini yürütmek ve talebinize ilişkin kayıtları takip etmek
                  amacıyla işlenebilir. İnternet bağlantısına ilişkin IP adresi, istek zamanı ve teknik hata kayıtları,
                  sitenin sunulması ve güvenliği için altyapı tarafından işlenebilir.
                </p>
                <h3>Toplama yöntemi ve hukuki sebepler</h3>
                <p>
                  İletişim bilgileri, sizin başlattığınız telefon, e-posta veya WhatsApp görüşmelerinden alınır.
                  Formdaki bilgiler tarayıcınızda bir WhatsApp mesajı hazırlamak için kullanılır. WhatsApp&apos;ta devam et
                  düğmesine bastığınızda hazırlanan metin WhatsApp bağlantısına eklenir. Mesajı göndermeyi WhatsApp&apos;ta tamamlarsınız.
                  Siteye erişim bilgileri elektronik ortamda oluşur. Teklif ve hizmet talepleri, sözleşmenin kurulması veya
                  yerine getirilmesiyle doğrudan ilgili olması halinde Kanun&apos;un 5/2-c maddesine dayanır. Yasal kayıtlar
                  hukuki yükümlülük kapsamında 5/2-ç, hakların korunması için gereken kayıtlar 5/2-e, sitenin güvenliğine
                  ilişkin ölçülü işlemler ise temel haklarınıza zarar vermemek koşuluyla 5/2-f kapsamında değerlendirilir.
                  Konum haritasının görünümü tarayıcınıza kaydettiğiniz site tercihine göre düzenlenir.
                </p>
                <h3>Hizmet sağlayıcılar ve harici platformlar</h3>
                <p>
                  Talebinizi iletmek için seçtiğiniz e-posta ve WhatsApp hizmetleri kendi altyapılarında veri işleyebilir.
                  Barındırma hizmeti, site isteklerini ve teknik kayıtları işler. Yasal yükümlülük veya bir hakkın korunması
                  gerektirdiğinde ilgili bilgiler yetkili kurumlarla paylaşılabilir. Harita, WhatsApp ve sosyal medya
                  bağlantıları üçüncü taraf hizmetlerine ulaşır. Bu hizmetlerin yurt dışındaki altyapıları bakımından
                  Kanun&apos;un 9. maddesindeki aktarım şartları ayrıca geçerlidir.
                </p>
                <h3>Haklarınız</h3>
                <p>
                  Kanun&apos;un 11. maddesi kapsamında kişisel verilerinizin işlenip işlenmediğini öğrenebilir, işlenmişse
                  bilgi isteyebilir, amacı ve aktarıldığı kişileri öğrenebilir, yanlış veya eksik verilerin düzeltilmesini,
                  şartları oluştuğunda silinmesini veya yok edilmesini ve bu işlemlerin aktarılan kişilere bildirilmesini
                  talep edebilirsiniz. Yalnız otomatik analiz sonucu aleyhinize oluşan bir sonuca itiraz edebilir,
                  hukuka aykırı işleme nedeniyle oluşan zararınızın giderilmesini isteyebilirsiniz.
                </p>
                <p>Başvuru yolları aşağıdaki İlgili kişi başvurusu bölümünde yer alır.</p>
              </div>
            </details>

            <details>
              <summary><h2>Gizlilik politikası</h2><span aria-hidden>+</span></summary>
              <div className={`prose ${styles.body}`}>
                <p>
                  Bu site, Etites&apos;in hizmetlerini, projelerini ve iletişim bilgilerini sunar. Üyelik, çevrim içi ödeme
                  ve reklam amaçlı ziyaretçi takibi kullanılmaz. İletişim formu bir WhatsApp mesajı hazırlar.
                  Form alanları site sunucusuna kaydedilmez. WhatsApp&apos;ta devam et düğmesine bastığınızda mesaj metni
                  WhatsApp bağlantısına aktarılır. Gönderimi ilgili uygulamada tamamlarsınız.
                </p>
                <p>
                  Telefon, e-posta ve WhatsApp kanallarından ilettiğiniz bilgiler talebinizin değerlendirilmesi ve hizmet
                  iletişimi için kullanılır. Gerekli olmayan kimlik, sağlık, banka veya diğer hassas bilgileri paylaşmayın.
                </p>
                <p>
                  Görüşme ve hizmet kayıtlarının tutulması, talebin gerektirdiği amaç ve uygulanacak yasal saklama
                  yükümlülükleriyle sınırlıdır. İşleme amacı ve geçerli hukuki sebep ortadan kalktığında verilerin
                  silinmesi, yok edilmesi veya anonimleştirilmesi gerekir.
                </p>
                <p>
                  Google Haritalar, WhatsApp ve sosyal medya bağlantılarını açtığınızda ilgili sağlayıcıların gizlilik
                  kuralları da uygulanır. İletişim sayfasındaki konum haritası ve logo doğrudan bu siteden yüklenir.
                </p>
              </div>
            </details>

            <details id="cerezler">
              <summary><h2>Çerez politikası</h2><span aria-hidden>+</span></summary>
              <div className={`prose ${styles.body}`}>
                <p>
                  Çerezler ve tarayıcının yerel depolaması, sitelerin cihazınızda küçük bilgiler tutmasına olanak verir.
                  Etites bu teknolojileri çerez tercihinizi hatırlamak için kullanır. Reklam, yeniden pazarlama veya
                  ziyaretçi analizi çerezleri kullanılmaz.
                </p>
                <h3>Tercihinizin saklanması</h3>
                <p>
                  Kaydettiğiniz harita tercihi, etites-cookie-preferences adıyla tarayıcınızın yerel depolamasında
                  180 gün boyunca geçerli olacak şekilde tutulur. Bu kayıt kimlik veya iletişim bilgisi içermez,
                  sunucuya gönderilmez ve başka bir cihazla paylaşılmaz. Süresi dolan kayıt dikkate alınmaz.
                </p>
                <h3>Konum haritası ve yol tarifi</h3>
                <p>
                  Konum haritası başlangıçta görünürdür ve bu sitede barındırılan bir görseldir. Haritayı görüntülemek
                  için üçüncü taraf bir harita hizmetine bağlanılmaz. Yol tarifi bağlantısını açmanız halinde Google
                  Haritalar&apos;a yönlendirilirsiniz. Bu aşamada ilgili sağlayıcının <a href="https://policies.google.com/privacy?hl=tr" target="_blank" rel="noopener noreferrer">gizlilik politikası</a> uygulanır.
                </p>
                <h3>Tercihi değiştirme</h3>
                <p>
                  <Link href="/cerez-ayarlari">Çerez ayarları</Link> sayfasından harita tercihinizi değiştirebilir veya
                  kapatabilirsiniz. Kapattığınız haritayı iletişim sayfasındaki Haritayı göster düğmesiyle yeniden açabilirsiniz.
                  Site verilerini temizlediğinizde harita varsayılan olarak yeniden görünür olur.
                </p>
                <p>
                  Sitede otomatik açılan bir çerez penceresi bulunmaz. Harita görünümünü kapatmanız diğer bölümleri
                  kullanmanızı engellemez. Yeni bir takip teknolojisi eklenirse bu metin ve gerekli izin alanları
                  buna göre güncellenir.
                </p>
              </div>
            </details>

            <details>
              <summary><h2>İlgili kişi başvurusu</h2><span aria-hidden>+</span></summary>
              <div className={`prose ${styles.body}`}>
                <p>
                  Başvurunuzu imzalı yazıyla {site.address.line1}, {site.address.line2}, {site.address.line3} adresine
                  iletebilirsiniz. Daha önce bize bildirdiğiniz ve kayıtlarımızda bulunan e-posta adresinizden
                  <a href={`mailto:${site.email}`}> {site.email}</a> adresine başvurabilirsiniz.
                </p>
                <p>
                  Başvuruda adınızı, soyadınızı, yazılı başvuruda imzanızı, tebligat adresinizi, varsa e-posta ve
                  telefon bilgilerinizi, talebinizin konusunu ve mevzuatın gerektirdiği kimlik bilgilerini belirtin.
                  Talebinizi destekleyen belgeleri gerektiği ölçüde ekleyin.
                </p>
                <p>
                  Başvurular, Kanun&apos;un 13. maddesi kapsamında en kısa sürede ve en geç 30 gün içinde
                  sonuçlandırılır. İşlemin ayrıca maliyet gerektirmesi halinde Kurul&apos;un belirlediği tarife uygulanabilir.
                  Başvuru yöntemi hakkında bilgi almak için <a href={`mailto:${site.email}`}>{site.email}</a> adresinden bize ulaşabilirsiniz.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
