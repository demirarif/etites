6 Ekim 2026 masaüstü revizeleri

| İstek | Uygulanan değişiklik |
| --- | --- |
| Restoran ve Kafe sayıları | 14 proje ve 137 şube toplamı kaldırıldı. Markaların yanında Etites'in proje kayıtlarındaki şube sayıları gösteriliyor. Arabica 137, Caffè Di Toeè 2 ve Let's Make Coffee 2. Tekil kafe ve restoran kayıtları 1 şube. Kuzu Effect bir mağaza uygulaması olduğu için 1 mekân. |
| Kayan panellerin kenarı | Giriş ve panel içerikleri kendi sınırlarında kesiliyor. Üç panelin katman sırası açıkça tanımlandı. Son paneldeki dış gölge kaldırıldı. Son panel de diğerleriyle aynı sticky düzenini kullanıyor. |
| Turuncu | Ana vurgu #FF7A1A, üzerine gelince #FF8D3D. Butonlar, koyu zemindeki sayılar ve harita vurgu halkası aynı paleti kullanıyor. |
| Referans şeridi | Panel grubundan çıkarıldı. Son kayan panelin hemen ardından, Sektörler bölümünün üstünde yer alıyor. Koyu blur etiketler, ortalı yazılar ve kayan logolar korunuyor. |

Şube sayıları markaların piyasadaki toplam şube sayıları değildir. Eski siteden aktarılan Etites proje kayıtları marka bazında gruplanır. Konum ve sistem filtresi uygulandığında yalnız eşleşen kayıtlar sayılır. Arabica'nın şubeleri ayrıca kendi şube listesinden hesaplanır.

Kontroller:

- ESLint ve TypeScript başarılı.
- Üretim derlemesi başarılı, 156 sayfa oluşturuldu. İlk denemede sandbox içindeki Google Fonts bağlantısı başarısız oldu. İzinli ağ erişimiyle gerçek font indirmesi ve üretim derlemesi tamamlandı.
- 1440 × 900 ve 1366 × 768 masaüstü boyutlarında kontrol edildi.
- Son panelin metni, proje bağlantıları ve görseli kendi alanına sığıyor.
- Referans şeridinin üst kenarı son panelin alt kenarıyla birleşiyor. Önceki panel içeriği bu sınırın dışına taşmıyor.
- Restoran başlığında ortak proje ve şube toplamı bulunmuyor. Marka bazlı sayılar ayrı gösteriliyor.
- İzmir filtresinde restoran başlığı yalnız Arabica Coffee House 1 şube gösteriyor. Filtre temizlenince tüm marka sayıları geri geliyor.

Görsel kayıtlar:

- [Referans şeridinin yeni konumu](assets/2026-10-06-revisions/references-after-panels.png)
- [Marka bazlı şube sayıları](assets/2026-10-06-revisions/restaurant-branch-counts.png)
- [1366 × 768 son panel](assets/2026-10-06-revisions/last-panel-1366.png)

Giriş filmi için tercih normal, sessiz oynatma. Filmdeki hızlı mekân geçişleri ve yeşil tesisat vurguları bu şekilde kendi temposunu korur. İlk üç proje paneli scroll ile kaymaya devam eder. Video dosyaları henüz teslim edilmediği için mevcut plaza görseli kullanılıyor. Dosyalar geldiğinde gerçek geçişler ve görüntü kadrajı incelenecek.
