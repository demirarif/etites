# Masaüstü düzeltmeleri

5 Ekim 2026

Bu çalışma [güncel tasarım kararları](../design-direction.md) doğrultusunda yapılmıştır. İlk QA raporundaki slogan ve dört yeni ana sayfa bölümü önerileri uygulanmadı. Üç kayar bölüm korundu. Genel açılış videosu üretilmedi. Mobil tasarım bu çalışmanın kapsamında değil.

## Uygulananlar

- Ana sayfadaki proje satırlarına mevcut kayıtlardan mekanik iş kapsamı eklendi.
- Ofis görseli, açık tavandaki mekanik altyapının göründüğü temsili ofis fotoğrafıyla değiştirildi. Kafe bölümünde mevcut Zeppelin Pub proje fotoğrafı kullanıldı.
- Temsili, kurum ve marka görsellerinin niteliği kartlarda ve kayar bölümlerde belirtildi. Temsili görsellerin alternatif metni proje adı yerine görünen içeriği açıklıyor.
- Kullanılmayan ana sayfa görsel anahtarları temizlendi. Mevcut plaza görseli gelecek genel film için yerinde tutuldu.
- Eksik Arabica konumları filtreye eklendi. Seçili konumdaki şube sayısı hesaplanıyor. Tekil proje bulunmasa bile ilgili Arabica bölümü açılıyor. Programın genel toplamları ile filtre sonuçları ayrı anlatılıyor.
- Kapalı proje panelleri klavye ve erişilebilirlik sırasından çıkarıldı.
- Teklif paneline odak döngüsü, arka planı geçici olarak erişime kapatma ve kapatılınca açan kontrole odak dönüşü eklendi. Ortak menü erişilebilirlik davranışı da düzeltildi, mobil yerleşim yeniden tasarlanmadı.
- Sayfalara canonical, Open Graph ve Twitter metadata eklendi. İşletme verisindeki bulunmayan logo dosyası mevcut renkli logoya bağlandı.
- Genel vaatler ve kesin sonuç ifadeleri sadeleştirildi. Eski sitede doğrulanmayan ücretsiz keşif ve tüm şubelerde aynı kapsam iddiaları kaldırıldı.
- Formdaki sahte tamamlanma akışı kaldırıldı. Gönderim kanalı belirlenene kadar düğme kapalı. Kullanıcı, formu doldurmadan önce e-posta seçeneğini görüyor.
- Metni bulunmayan KVKK onayı ve çalışmayan footer metinleri kaldırıldı. Onaylı belgeler temin edilince gerçek bağlantılarla eklenecek.

## Doğrulama

- ESLint başarılı.
- TypeScript kontrolü başarılı.
- Next.js üretim derlemesi başarılı. 155 statik sayfa üretildi.
- Ana sayfa 1440 x 1000 ve 1366 x 768 masaüstü boyutlarında kontrol edildi. Üç panelin metni kendi alanına sığıyor.
- Teklif panelinde Shift+Tab son kontrole dönüyor. Escape sonrasında odak Teklif Al bağlantısına geri geliyor.
- Kamu ve Savunma paneli kapatıldıktan sonra Tab, kapalı proje kartı yerine sonraki sektör başlığına geçiyor.
- İzmir seçilince 0 tekil proje ve 1 Arabica şubesi gösteriliyor. Restoran ve Kafe bölümü kendiliğinden açılıyor.
- Ana sayfa ve proje listesinde canonical adresleri tarayıcıda doğrulandı.
- TypeScript ve JSX içindeki metinler noktalı virgül, uzun tire ve kısa uzun tire karakterleri için tarandı. Eşleşme bulunmadı. Kaynak kodun sözdizimindeki noktalı virgüller bu kurala dahil değil.

## Tamamlanacaklar

- Formun hangi kanalla gönderileceği ve e-posta kullanılacaksa sağlayıcı bilgisi soruldu. Yanıt bekleniyor. Gerçek teslimat henüz test edilmedi.
- Onaylı KVKK ve çerez metinlerinin bağlantıları soruldu. Hukuki metin uydurulmadı.
- Açılış filmi haricen hazırlanacak. İstenen penthouse, kafe, fabrika ve savunma tesisi kapısı sırası tasarım yönü belgesinde kayıtlı.
- Mobil tasarım ayrı aşamada yapılacak.

Bu değişiklikler yerel projededir. Canlı etites.com.tr sitesine yayın yapılmadı.
