# Etites ilk inceleme ve QA raporu

Güncelleme: Bu belge ilk değerlendirmeyi kaydeder. Sonraki kullanıcı kararları [tasarım yönü](../design-direction.md) belgesindedir. Slogan önerisi uygulanmayacak. Açılış filmi isimsiz mekânlarla genel anlatım olacak. Mevcut üç kayar panel korunacak. Mobil tasarım daha sonra ele alınacak. Aşağıdaki bulguların güncel düzeltme durumu ayrı çalışma notunda tutulur.

Tarih: 5 Ekim 2026. İncelenenler: canlı etites.com.tr ve etites-web klasöründeki yeni Next.js taslağı. Bu rapor ilk ürün, içerik ve işlevsellik incelemesidir. Video üretilmedi; uygulama kaynak kodu değiştirilmedi.

**Karar:** Yeni taslağın tipografi, menü ve proje sınıflandırması iyi bir temel oluşturuyor. Yayına hazır değil. Öncelik, gerçek talep iletimini tamamlamak ve ana sayfadaki görsel anlatıyı Etites'in yaptığı mekanik işe bağlamak.

**Ana tasarım görüşü**

Etites'in güçlü yanı farklı yapılarda üstlendiği teknik işlerin çeşitliliği. Canlı site bunu ağırlıklı olarak genel hizmet ve fiyat vaatleriyle anlatıyor. Yeni taslak projeleri daha görünür kılıyor; fakat büyük görseller hâlâ cepheleri, kuleleri ve mekânı öne çıkarıyor. Ziyaretçinin ilk dakikada “Bu yapının hangi sistemini Etites yaptı?” sorusuna cevap alması gerekiyor.

Önerilen ana fikir: **Mekânın arkasında çalışan mühendislik.** Açılış videosunun çevresindeki metin ve devamındaki scroll deneyimi bu fikri taşımalı. Başlık taslağı olarak “Mekânın arkasındaki mühendislik.” kullanılabilir; hemen altında havalandırma, iklimlendirme ve mekanik tesisat kapsamı açıkça belirtilmeli.

Mevcut yeni taslaktaki koyu zemin, beyaz tipografi ve sıcak vurgu rengi korunabilir. En büyük kazanım daha fazla efekt eklemekten önce doğru uygulama görselini ve doğru iş kapsamını seçmek olacaktır. Mevcut üst üste kayan sektör panelleri bir başlangıç; kullanıcının tarif ettiği tesisatın görünür hâle gelmesi henüz uygulanmamış.

**Önerilen ana sayfa ve scroll anlatısı**

Açılış/video → dört sektör bölümü → seçilmiş gerçek projeler ve referanslar → hizmet kapsamı → teklif/keşif. Blog ve SSS daha aşağıda kalabilir.

Her sektör aynı anlaşılır ritmi izlemeli: **mekân → mekanik altyapı → Etites'in yaptığı iş → ilgili proje.** İlk görüntü mekânı tanıtır; kaydırdıkça tavan, şaft veya teknik hacim görünür hâle gelir. Ekranda en fazla birkaç kısa açıklama bulunur. Sistem hatlarını izleyen renk vurguları kullanılabilir. Gerçek tesisatın görülmediği bir görüntüde hayalî hatlar uygulama kanıtı gibi sunulmamalı; temsili kesit ayrıca belirtilmeli.

| Bölüm | Görsel geçiş | Etites'in öne çıkacak işi | Arşivden aday / sınır |
|---|---|---|---|
| Mağaza / AVM | Müşteri alanından tavan üstü tesisata | Havalandırma, iklimlendirme ve varsa doğrulanmış yangın tesisatı | Vakko / Ankamall işleri. Mağaza içindeki iş tüm AVM'nin altyapısı gibi anlatılmamalı. |
| Savunma | Yerleşke veya hangardan teknik uygulamaya yaklaşma | Doğrulanmış VRF, ısıtma veya ısı merkezi işi | ASELSAN Gölbaşı VRF ve Jandarma hangar ısıtması farklı kapsamlardır; seçilen proje kendi işiyle anlatılmalı. |
| Kafe | Oturma alanından tavandaki hava kanallarına, varsa mutfak egzozuna | Taze hava, egzoz, iklimlendirme ve ilgili tesisat | Zeppelin Pub fotoğrafı kanalları ve boruları zaten gösteriyor. Arabica için şube bazında kapsam teyidi gerekli. |
| Fabrika | Üretim alanından havalandırma veya kazan dairesine | Üretim alanını destekleyen mekanik sistem | Dorçe fabrika havalandırması ve kazan işi ayrı kayıtlardır; birleştirilecekse gerçek proje ilişkisi doğrulanmalı. |

Bir bölümün metni şu sorulara cevap vermeli: Neresi? Hangi ihtiyaç vardı? Etites ne yaptı? Bunu hangi saha fotoğrafı veya sonuç gösteriyor? İşle bağlantısı olmayan genel bina fotoğrafı bu soruların yerini tutmuyor.

Açılıştaki tek videonun kurgusu ve scroll bölümleriyle ilişkisi sonraki görüşmede netleştirilebilir. Bu aşamada belirli bir video üretim tekniğine bağlanmak gerekmiyor. Video olmadan da başlık, proje kapsamı ve iletişim kullanılabilir kalmalı. Video metnin tek taşıyıcısı olmamalı; durdurma/atlama ve mobil için uygun alternatif görünüm düşünülmeli. Mobilde dört bölüm normal dikey akışla okunabilmeli, kullanıcı uzun bir animasyon içinde tutulmamalı. Hareket azaltma tercihi desteklenmeli.

**Canlı site QA — tarayıcıda doğrulanan bulgular**

Kaynaklar: [Ana sayfa](https://www.etites.com.tr/), [proje arşivi](https://www.etites.com.tr/tum-yaptigimiz-isler/), [iletişim](https://www.etites.com.tr/iletisim/).

P1: yüksek öncelik / yayından önce çözülmeli. P2: orta öncelik / işlev veya içerik kalitesi. P3: düşük öncelik / düzenleme.

| ID | Öncelik | Bulgu ve etkisi | Öneri |
|---|---|---|---|
| C-01 | P2 | Footer e-posta bağlantısı `mail:info@etites.com.tr`. Standart e-posta bağlantısı şeması kullanılmıyor. İletişim sayfasının ana gövdesindeki bağlantı ise `mailto:`. | Tüm e-posta bağlantılarını tutarlı `mailto:` yap. |
| C-02 | P2 | Ana sayfada H1 yok. Büyük açılış metni DOM'da başlık olarak işaretlenmemiş; bölüm başlıkları H2'den H5'e atlıyor. | Tek ana H1 ve mantıklı H2/H3 sırası kur. |
| C-03 | P2 | İletişim formunda beş alanın label içeriği boş; anlamlı aria-label da yok. Alanlar placeholder ile anlatılıyor ve erişilebilirlik ağacında adsız görünüyor. | Kalıcı ve alanla ilişkili görünür etiketler kullan. |
| C-04 | P2 | Portföy uzun şube/proje listeleri halinde sunuluyor. Sektör, sistem ve somut iş kapsamını karşılaştırmak zor. | Seçilmiş işleri öne çıkar; kalan arşivi filtrelenebilir tut. |
| C-05 | P2 | Ana sayfa ağırlıklı olarak genel kalite, fiyat ve ekip vaatlerine dayanıyor. Güçlü referansların teknik katkısı ana anlatıda açıklanmıyor. | Gerçek proje + yapılan sistem + uygulama görseli üçlüsünü öne çıkar. Bu bir tasarım/içerik değerlendirmesidir. |
| C-06 | P3 | Footer'daki YouTube bağlantısı şirket kanalı yerine YouTube ana sayfasına gidiyor. | Doğru kanal bağlantısı varsa kullan; yoksa ikonu kaldır. |
| C-07 | P3 | Yazım sorunları ve eski görünüm sinyalleri var: şube listesinde birleşmiş Kahramanmaraş/Mersin satırı, aralıksız Ankara/Başkent/OSB yazımı, hizmet metinlerinde dil hataları ve 2020 footer yılı. | İçeriği editöryal kontrolden geçir. Footer yılı tek başına şirketin veya işlerin güncel olmadığını kanıtlamaz. |

Canlı form gönderilmedi; gerçek teslimat, e-posta altyapısı ve spam koruması bu incelemede test edilmedi.

**Yeni yerel taslak QA — kaynak kod ve tarayıcı bulguları**

| ID | Öncelik | Bulgu ve etkisi | Kanıt / öneri |
|---|---|---|---|
| Y-01 | P1 | İletişim formu talep veya ek dosyayı bir servise iletmiyor. Gönderim, yalnızca önizleme durumuna geçiyor. Bu durum son ekranda MVP açıklamasıyla belirtiliyor; tamamlanmış bir başvuru akışı değil. | [ContactForm.tsx:25](C:/Users/arifdemir/Desktop/etites-web/src/components/ContactForm.tsx:25). Sunucu bağlantısı, gerçek başarı/hata ve dosya işleme tamamlanmalı. |
| Y-02 | P1 | Form KVKK metninin okunduğunu onaylatıyor, fakat metne bağlantı yok. Footer'daki KVKK ve Çerez Politikası da tıklanabilir değil. | [ContactForm.tsx:153](C:/Users/arifdemir/Desktop/etites-web/src/components/ContactForm.tsx:153), [Footer.tsx:71](C:/Users/arifdemir/Desktop/etites-web/src/components/Footer.tsx:71). Metinler ve bağlantıları tamamlanmalı. Bu işlevsel tespittir, hukuki uygunluk değerlendirmesi değildir. |
| Y-03 | P1 | Ana scroll akışı yalnız Kamu/Savunma, Ofis/Plaza ve Restoran/Kafe içeriyor. Kullanıcının istediği AVM ve fabrika ana anlatıda yok; sistem kapsamı da büyük panellerde görünmüyor. | [page.tsx:22](C:/Users/arifdemir/Desktop/etites-web/src/app/page.tsx:22), [Plate.tsx:43](C:/Users/arifdemir/Desktop/etites-web/src/components/Plate.tsx:43). Dört sektör ve gerçek mekanik iş anlatısı oluşturulmalı. |
| Y-04 | P1 | Stok görseller proje kartlarında gerçek proje fotoğrafı izlenimi verebiliyor. Temsili görsel açıklaması ancak detay künyesinde yer alıyor. | [ProjectCards.tsx:6](C:/Users/arifdemir/Desktop/etites-web/src/components/ProjectCards.tsx:6), [media.ts:164](C:/Users/arifdemir/Desktop/etites-web/src/lib/media.ts:164). Açıklama görselin görüldüğü yerde olmalı; öne çıkan işler gerçek saha arşivine dayanmalı. |
| Y-05 | P2 | İl filtresi yalnız tekil projelerden türetiliyor. Arabica şubelerinde bulunan Kayseri, İzmir ve Antalya gibi şehirler filtre seçeneklerinde yok. | [ProjectExplorer.tsx:88](C:/Users/arifdemir/Desktop/etites-web/src/components/ProjectExplorer.tsx:88). İki veri kümesinin şehirleri birleştirilmeli; proje/şube sayısı ayrımı korunmalı. Tarayıcıda da doğrulandı. |
| Y-06 | P2 | Kapatılan proje panelinin linkleri klavye sırasından çıkarılmıyor. Kamu/Savunma panelini kapatıp Tab'a basınca odak BTK proje bağlantısına gitti. | [ProjectExplorer.tsx:224](C:/Users/arifdemir/Desktop/etites-web/src/components/ProjectExplorer.tsx:224), [globals.css:2077](C:/Users/arifdemir/Desktop/etites-web/src/app/globals.css:2077). Kapalı içeriğin odaklanmasını önleyen davranış uygulanmalı. |
| Y-07 | P2 | Teklif paneli odağı içinde tutmuyor. Panel açıldıktan sonra Shift+Tab ile panel dışına geçilebildi. Escape sonrası odak açan kontrole dönmüyor. | [TeklifPanel.tsx:24](C:/Users/arifdemir/Desktop/etites-web/src/components/teklif/TeklifPanel.tsx:24). Modal odak yönetimi tamamlanmalı. |
| Y-08 | P2 | Canonical, Open Graph ve sosyal paylaşım görseli metadata'sı tanımlanmamış. Başlık ve açıklama mevcut. | [layout.tsx:24](C:/Users/arifdemir/Desktop/etites-web/src/app/layout.tsx:24). Sayfa kimliği ve paylaşım önizlemeleri tamamlanmalı. |
| Y-09 | P2 | Ana sayfada tercih edilen birçok görsel anahtarı veride yok. Yedek görsel seçimi çalıştığından kırık resim görünmüyor, fakat amaçlanan görseller kullanılmıyor. | [page.tsx:15](C:/Users/arifdemir/Desktop/etites-web/src/app/page.tsx:15), [media.ts:153](C:/Users/arifdemir/Desktop/etites-web/src/lib/media.ts:153). Hero MAIDAN renderına, kamu TRT dış cephesine, ofis genel kule fotoğrafına, kafe Arabica cephesine düşüyor. |

**İçerik ve görsel envanteri**

- Veri kümesinde 128 tekil proje ve 137 Arabica şubesi var: toplam 265. Ana sayfadaki 260+ ifadesi bu toplamla uyumlu. Sayıların gerçek dünyadaki güncelliği ayrıca teyit edilmeli.
- 128 tekil projenin 39'unda kaynak proje görseli var. Bunların 10'u ana görsel seçiminden bilinçli olarak çıkarılıyor; 29 proje kendi ana görseliyle, 99 proje stok ana görselle sunuluyor.
- Kayıtlarda birden fazla özgün görseli olan proje yok. Teknik işi açıklayan zengin bir galeri için ek saha arşivi gerekiyor.
- Tarihli tekil proje kayıtları 2013–2021 döneminde. Bu, 2021 sonrasında iş yapılmadığı anlamına gelmez; mevcut yeni taslağın son işleri göstermediğini gösterir.
- 14 projenin şehir bilgisi eksik.
- Mevcut proje veri modeli işin problemi, Etites'in tam sorumluluğu, teknik ölçüler ve sonucu için ayrı alanlar içermiyor. Özellikle dört ana hikâye için bu içerik hazırlanmalı.
- Arabica için tüm şubelerde aynı kapsamın kurulduğu anlatımı ayrıca doğrulanmalı. Görsel veri kaydındaki kullanım izni notu da yayın hazırlığında çözümlenmeli; mevcut izin durumu bu incelemede doğrulanmadı.

Yönü anlatan mevcut arşiv örneği: [Zeppelin Pub uygulama fotoğrafı](C:/Users/arifdemir/Desktop/etites-web/public/media/3018-760.webp). Tavandaki kanallar ve borular mekânla birlikte görülebiliyor. Bu fotoğraf yön referansıdır; tek başına hangi görünen parçayı Etites'in yaptığına kanıt oluşturmaz, kapsam proje kaydıyla eşleştirilmelidir.

**Geçen kontroller ve inceleme sınırı**

- `npm run lint` başarılı.
- `npx tsc --noEmit --incremental false` başarılı.
- 209 eski URL yönlendirmesi kaynak düzeyinde tarandı; kopya kaynak veya yerel rotalarla uyuşmayan hedef bulunmadı. Her URL canlı HTTP isteğiyle test edilmedi.
- JSON verilerinde kullanılan yerel görsel yolları mevcut.
- Yeni taslakta Türkçe belge dili, başlık/açıklama, sitemap, robots ve işletme JSON-LD var.
- Yeni ana sayfa 1440×1000 ve 390×844 boyutlarında incelendi. Bu örneklerde yatay sayfa taşması görülmedi. Mobil menü açılıp kapandı. Bu sonuç bütün sayfaların ve cihazların hatasız olduğunu göstermez.
- Canlı ana sayfa da masaüstünde, dar görünümde ve 390 piksel mobil görünümde incelendi; proje arşivi ve iletişim alanları okundu.
- Mobilde ve hareket azaltma tercihinde scroll efektinin sadeleştiği kaynak kodda görüldü; gerçek iOS/Android cihazında animasyon akıcılığı ölçülmedi.
- Production build, Lighthouse/Core Web Vitals, gerçek e-posta teslimatı, tüm sayfalarda ekran okuyucu testi ve güvenlik/penetrasyon testi bu ilk incelemenin kapsamında değildi. Performans puanı verilmedi.

**Önerilen çalışma sırası**

1. Dört ana sektör için birer gerçek proje, doğru iş kapsamı ve güçlü saha görsellerini seç.
2. Her bölümün mekân → tesisat → Etites kapsamı geçişini görsel taslakla netleştir; video teslim biçimini bu akışa göre konuş.
3. Form gönderimi ve metin bağlantıları başta olmak üzere P1 eksiklerini tamamla; stok görsellerin sunumunu düzelt.
4. Filtreler, klavye odağı ve metadata eksiklerini tamamla.
5. Video ve gerçek medya eklendikten sonra mobil cihaz, yavaş bağlantı ve üretim sürümü performans QA'sını yap.
