# Etites masaüstü son kontrol

6 Ekim 2026. Yerel önizleme http://127.0.0.1:3100/.

## Son durum

Harita, çerez ayarları, referans şeridi ve iletişim akışı tamamlandı. Masaüstü önizleme çalışıyor. Bu çalışma siteyi canlıya yayınlamadı.

| Konu | Sonuç |
| --- | --- |
| Haritanın ilk açılışı | Varsayılan açık. Onay ekranı, popup veya başka sayfaya yönlendirme yok. |
| Haritanın görünümü | Gerçek yol ve yapı verisiyle açık gri harita, Etites logosu, ofis yapısı vurgusu ve yol tarifi bağlantısı. |
| Harita tercihi | Çerez ayarlarından kapatılabiliyor. Tercih sayfalar arasında korunuyor. Haritayı göster düğmesi aynı sayfada yeniden açıyor. |
| Harici harita bağlantısı | Harita görseli ve logo bu siteden yükleniyor. Google Maps yalnız yol tarifi bağlantısına basıldığında açılıyor. |
| Referans şeridi | Referanslar ve Tümü yazıları ortalı, kalın ve büyük. Koyu arka plan yüzde 96 opak, blur 24 piksel. |
| Blur düzeltmesi | CSS derleyicisinin yalnız eski vendor biçimini bırakmasına yol açan bildirim sırası düzeltildi. Chrome ve production CSS içinde gerçek blur özelliği doğrulandı. |
| Footer | Yatay sayfa bağlantıları, şirket iletişimi, sosyal hesaplar, KVKK ve çerez ayarları. Görsel kaynakları bağlantısı yok. |
| İletişim formu | Girilen bilgiler mevcut firma numarasına gönderilmek üzere bir WhatsApp mesajına dönüştürülüyor. Ziyaretçi gönderimi WhatsApp'ta tamamlıyor. |
| Dosya ekleme | İşlemeyen dosya yükleme alanı kaldırıldı. Proje dosyası WhatsApp görüşmesine eklenebiliyor. |
| Formun geri bildirimi | Gönderildi iddiası kullanılmıyor. Mesajınız hazır bilgisi ve gerektiğinde yeniden açma bağlantısı var. |
| Blog tarihleri | Doğrulanmamış tarihler görünümden ve makale meta bilgisinden kaldırıldı. |
| Firma adı | Doğrulanmamış Ltd. Şti. eki kaldırıldı. Mevcut firma adı Etites İklimlendirme kullanılıyor. |
| Ana sayfa geçişleri | Kullanıcının istediği üç kayarak gelen panel korunuyor. |

Harita statik bir konum görselidir. Yakınlaştırma ve sürükleme işlevi yok. Yol tarifi Google Maps üzerinde kullanılabilir.

## Doğrulama

- Proje kaynaklarının tamamı için ESLint geçti.
- TypeScript kontrolü geçti.
- Production build başarıyla tamamlandı. 156 statik sayfa üretildi.
- Ana sayfa, iletişim, çerez ayarları, KVKK, hakkımızda, blog ve SVG harita HTTP 200 döndü.
- Ayrı ve boş Chrome profilinde 1440 piksel masaüstü akışı kontrol edildi.
- İlk ziyaret, tercih değiştirme, kaydetme, sayfa değiştirme ve haritayı yerinde yeniden açma geçti.
- WhatsApp mesajında Türkçe karakterler, ampersand, satır sonu, proje alanı ve talep türü doğru taşındı.
- Arıza seçildiğinde proje alanı mesajdan çıkarılıyor. Geçersiz telefon mesaj hazırlamayı durduruyor.
- Form testinde WhatsApp açılması yakalandı. Gerçek ziyaretçi verisi veya mesaj gönderilmedi. WhatsApp içindeki son teslimat test edilmedi.
- Kontrol edilen ziyaretlerde harici harita veya analiz isteği oluşmadı.
- Referans şeridi, footer, harita ve çerez sayfası görsel olarak incelendi.

Kontrol kaydı: [desktop-checks.json](assets/2026-10-06/desktop-checks.json).

Görseller:

- [İletişim ve harita](assets/2026-10-06/contact-final-desktop.png)
- [Referans şeridi](assets/2026-10-06/references-final-desktop.png)
- [Footer](assets/2026-10-06/footer-final-desktop.png)
- [Çerez ayarları](assets/2026-10-06/cookie-final-desktop.png)

## Video dışında kalan bilgi

KVKK metnini gerçek işletme ve yayın altyapısıyla tamamlamak için tam ticari unvan, kullanılacak barındırma ve e-posta sağlayıcıları ile görüşme kayıtlarının gerçek saklama uygulaması henüz doğrulanmadı. Bu bilgiler uydurulmadı. Mevcut metin sitenin bugünkü teknik davranışını anlatıyor, işletmenin bu bilgileriyle son kez eşleştirilecek.

Veri sorumlusunun kimliği, işleme amacı, aktarım, toplama yöntemi ve hukuki sebep başlıkları [KVKK'nın aydınlatma yükümlülüğü açıklaması](https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-) esas alınarak kontrol edildi. İşletmeye ait eksik bilgiler bu açıklamadan çıkarılamaz.

Mobil tasarım kullanıcının isteğiyle sonraki aşamadadır. Video dosyası eklendiğinde dosya boyutu, oynatma ve kaydırma geçişi ayrıca kontrol edilecek.

## Video hazırlığı

video/anasayfa klasöründe beş parçalık akış planı, ilk parçanın JSON promptu, 10 ve 8 saniyelik Flow metinleri ve iki PNG kare var. İlk bitiş görseli ikinci parçanın başlangıç dosyası olarak tanımlı. Kare boyutları, dosya yolları, süre sınırı ve zincir kontrol edildi.

Yalnız ilk görsel çiftinin üretimi tamamlandı. Video üretilmedi. Sonraki görseller, tüm sahneleri birden üretmeme isteğine göre hazırlanacak. İlk Flow denemesinde hareket ve tesisat geometrisi ayrıca incelenmeli.
