# Ana sayfa filmi, görseller ve logolar

18 Ekim 2026. Yerel önizleme http://localhost:3100/.

## Giriş filmi

Film kare kare hareket ve yeşil vurgu ölçümüyle bölüm bölüm hızlandırıldı. Süre 37,7 saniyeden 24,1 saniyeye, site kopyası 38,4 MB'tan 24,8 MB'a indi. Eski site kopyası video/anasayfa/etites-anasayfa-web-onceki.mp4 olarak duruyor. Tekrar üretmek için scripts/retime-home-video.py, ardından çıktı public/media/video/etites-anasayfa.mp4 dosyasına kopyalanır.

| Kaynak saniye | Bölüm | Hız |
| --- | --- | --- |
| 0-5 | Plazaya yaklaşma | 1,45 |
| 5-7,4 | Penthouse yeşil vurgu | 1,35 |
| 7,4-8,7 | Vurgu sonrası durağan an | 3,0 |
| 8,7-13,1 | Cephe boyunca iniş | 1,6 |
| 13,45-15,2 | Kafe yeşil vurgu | 1,3 |
| 15,2-16,6 | Vurgu sonrası durağan an | 3,0 |
| 16,6-19,6 | Fabrikaya hızlı geçiş | 1,15 |
| 19,6-20,9 | Fabrika önünde duruş | 2,6 |
| 20,9-23,4 | Fabrika yeşil vurgu | 1,4 |
| 23,4-24,9 | Vurgu sonrası durağan an | 3,0 |
| 24,9-28,2 | Savunma tesisine geçiş | 1,35 |
| 28,2-31 | Kapıya yaklaşma | 1,7 |
| 31-32,6 | Kapalı kapı önünde bekleme | 3,2 |
| 32,6-37,7 | Kapı açılır, araç çıkar | 1,25 |

Hız değişimleri 0,4 saniyede yumuşar. Hızlanan yerlerde komşu kareler harmanlanır, kare atlaması titreme yapmaz.

Film üstündeki bar alta ortalandı ve içeriği kadar daraldı: solda firma adı ve tek satır tanım, sağda ince çizgiyle ayrılmış rakamlar. Duraklat ve Baştan izle düğmesi kaldırıldı. Sol üstte görülen "1.00", tarayıcıya kurulu video hızı eklentisinin göstergesidir. Sitede .vsc-controller kuralıyla gizlendi.

## Metin ve tipografi

- Orta nokta (·) sitenin her yerinden kaldırıldı. 27 proje adında virgüle döndü. Sayaçlar "7 ilde 23 proje", konum ve yıl "Ankara, 2020", sekme başlığında ayırıcı "|".
- Yazı tipi: Apple aygıtlarında sistemin SF Pro yazı tipi, diğer aygıtlarda Inter. Archivo ve IBM Plex Mono kaldırıldı.
- Menü yazıları 16,5 px. Teklif Al üstündeki nokta kaldırıldı, sadece hafif sallanma kaldı.
- Referans şeridinde link metni "Tümünü keşfet".

## Logolar

- Mevcut logo, çizimi değişmeden siyah ve beyaz vektöre çevrildi (public/brand/etites-logo-beyaz.svg ve -siyah.svg). Kaynakla örtüşme IoU 0,976.
- Tarayıcı sekmesi simgesi: src/app/favicon.ico, icon.svg ve apple-icon.png. 16 px boyutta sembol ayrıntısı seçilmiyor, 32 px ve üstünde tanınıyor.
- Referans logolarından 8'i güncel resmi logolarıyla değişti: Arabica, AselsanNet, GYMFIT, Simit Teknesi, Telsam, Sestek, Dekom, IMER Group. 15 logo güncel, Türk Kızılay korumalı amblem olduğu için değişmedi, 9 firmanın resmi kaynağı bulunamadı.

## Görseller

Görsel havuzu 46'dan 176'ya çıktı. Yedi sektör listesinin hiçbirinde aynı görsel iki kez çıkmıyor (ofiste 54 kartın 54'ü farklı).

| Grup | Adet | Kaynak |
| --- | --- | --- |
| Arabica şubeleri, güncel logolu | 6 | Marka sitesi |
| Kamu ve savunma kurumları | 15 | Kurum siteleri, Wikimedia Commons |
| Ofis kuleleri, AVM'ler ve markalar | 41 | Resmi siteler, Wikimedia Commons |
| Ofis stok | 26 | Unsplash, Pexels |
| Diğer sektör stok | 42 | Unsplash, Pexels, Wikimedia Commons |

Proje detay sayfalarında görselin altında künye var. Creative Commons görsellerinde lisans adı da yazar, kırpılanlarda "kırpıldı" notu var. Kaynakla aynı olan iki tekrar ve daha önce yanıltıcı bulunup kaldırılan Ankara Radyosu görseli havuza alınmadı. Dorçe fabrika fotoğrafı, eski sitede konumu Kahramanmaraş yazan projeye bağlanmadı, çünkü fotoğrafın hangi fabrikaya ait olduğu belli değil.

## Kontroller

- TypeScript ve ESLint geçti. Üretim derlemesi 158 sayfa.
- 21 sayfada konsol hatası, kırık görsel, orta nokta, noktalı virgül, taşma ve h1 sayısı kontrol edildi, sorun yok.
- Ana sayfa plakaları, projeler, proje detayı ve referans şeridi 1440 x 900 ekranda incelendi.

## Kalan kararlar

- Tataroğlu logosunun yazısı beyaz, şeritte sadece bina simgesi görünüyor. Firmadan koyu sürüm istenebilir ya da yazı antrasite boyanabilir.
- Koç Kuleleri, BTK, Emniyet Genel Müdürlüğü ve ASELSAN MTAL için yeterli çözünürlükte resmi görsel bulunamadı. Firmadan istenebilir.
- Gerçek proje fotoğrafları geldiğinde stok ve temsili görsellerin yerini alacak.
- Mobil tasarım sonraki aşamada.

## 19 Ekim güncellemesi

- Film üstündeki panel ekranın ortasına alındı ve yaklaşık 3 kat büyüdü (1440 x 900 ekranda 743 x 351 px). Firma adı 5vw, altında tanım, ince çizginin altında rakamlar.
- Kayan plakaların görsellerinin sağ altındaki yazılar kaldırıldı.
- Film yeniden üretildi, süre 21 saniye. Açılış ve tepeye yaklaşma 1,8 ile 2,8 kat, penthouse sonrası ve kafeye iniş 3,2 ile 4 kat hızlandı. Penthouse vurgusu 2,0. saniyede, kafe vurgusu 5,4. saniyede başlıyor.
- Film artık ara kopyadan değil, Flow'dan gelen orijinal parçalardan tek seferde kodlanıyor.
  - AV1 kopya: public/media/video/etites-anasayfa.webm, 28,7 MB. Chrome, Edge ve Firefox bunu oynatır.
  - H.264 kopya: etites-anasayfa.mp4, 32,5 MB, diğer tarayıcılar için.
  - Arşiv ana kopyaya göre PSNR: AV1 37,9 dB, H.264 37,2 dB. Önceki site kopyası iki kez sıkıştırılmış ve 8 Mbps idi.
- Aynı gün film sitede hafif flu yapıldı. Öndeki cam bar 22 px flu, film Gauss sigma 5,5. Flu dosyaya işlendi, tarayıcı ayrıca hesaplamaz. Site kopyaları küçüldü: AV1 3,5 MB, H.264 12,3 MB. Net kopyalar video/anasayfa/etites-anasayfa-web-net.* adıyla saklandı.
- Dorçe'nin iki projesinin şehri Ankara oldu (fabrika Kahramankazan'da, eski sitedeki Kahramanmaraş yazım hatası kabul edildi). Dorçe hava fotoğrafı iki projede de görünüyor.
- Site statik çıktı olarak derleniyor (out klasörü), sunucuda Next.js çalışmıyor. Apache için .htaccess derlemeden sonra yazılıyor. Ayrıntı README'de.
