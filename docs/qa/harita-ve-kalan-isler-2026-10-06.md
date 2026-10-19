# Harita kontrolü ve kalan işler

6 Ekim 2026. Masaüstü geliştirme ortamı, localhost:3100.

Bu belge ilk harita kontrolünün kaydıdır. Aynı gün form ve blog tarihleri de ele alındı. Güncel sonuçlar ve kalan bilgi [masaüstü son kontrol raporunda](masaustu-son-kontrol-2026-10-06.md) yer alır.

## Tamamlanan değişiklik

İletişim sayfasındaki harita ilk ziyarette görünür. Google iframe kaldırıldı. Harita ve Etites logolu konum işareti siteden yüklenir. Haritayı görüntülemek için onay sayfasına yönlendirme veya üçüncü taraf harita isteği yapılmaz. Yol tarifi bağlantısı Google Maps'i yeni sekmede açar.

Harita gerçek OpenStreetMap yol ve yapı verisinden hazırlanmıştır. Astor Business Center yapısı vurgulanır. Veri kaynağı ve lisans bilgileri public/maps/README.md dosyasındadır. Bu görünüm statik bir konum haritasıdır. Yakınlaştırma ve sürükleme bulunmaz.

Konum haritası çerez ayarları sayfasından kapatılabilir. Kapatıldıktan sonra iletişim sayfasındaki Haritayı göster düğmesiyle yeniden açılır. Varsayılan açık olması takip izni alındığı anlamına gelmez. Sayfada harici harita servisi veya takip çerezi kullanılmaz.

## Kontrol sonucu

- Değişen TypeScript bileşenleri ve harita üretim betiği için ESLint geçti.
- Proje genelinde TypeScript kontrolü geçti.
- İlk ziyaret, kaydedilmiş açık ve kapalı tercih, eski sürüm, süresi dolmuş ve bozuk kayıt kontrol edildi.
- Tarayıcı depolaması engellendiğinde tercih aynı oturumda uygulanıyor.
- İletişim sayfası ve SVG harita HTTP 200 döndü. İlk HTML'de harita var, iframe ve onay bildirimi yok.
- 1440 piksel masaüstü ekran görüntüsünde harita, logo ve yol tarifi bağlantısı görsel olarak kontrol edildi.

Bu turda production build, mobil görünüm veya gerçek form gönderimi test edilmedi.

## Video dışında kalan işler

1. İletişim formunun gerçek gönderim kanalına bağlanması. E-posta teslimat altyapısı ve ek dosya yöntemi henüz belirlenmedi. Form şu anda gönderime kapalı, telefon, e-posta ve WhatsApp bağlantıları açık.
2. KVKK metnindeki tam ticari unvan, barındırma ve e-posta sağlayıcıları ile gerçek kayıt saklama uygulamasının netleştirilmesi. Mevcut metin taslak olarak ele alınmalı.
3. Blog yazılarındaki yayın tarihlerinin doğrulanması. Mevcut üç tarih doğrulanmış yayın kaydı değildir.
4. Kullanıcının sonraki aşamaya bıraktığı mobil tasarım.

Video eklendiğinde dosya boyutu, ilk yükleme, oynatma ve kaydırma geçişleri ayrıca kontrol edilecek. Canlı yayın henüz yapılmadı.
