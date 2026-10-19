# Etites İklimlendirme web sitesi

etites.com.tr'nin yeni sürümü. Next.js 16 ile yazıldı ve düz HTML dosyaları olarak derlenir. Sunucuda Next.js ya da Node çalışmaz, sunucu yalnızca dosya gönderir.

## Komutlar

| Komut | Ne yapar |
| --- | --- |
| `npm install` | Bağımlılıkları kurar |
| `npm run dev` | Geliştirme sunucusu, http://localhost:3000 |
| `npm run build` | Siteyi `out` klasörüne derler, ardından `out/.htaccess` dosyasını yazar |
| `npm start` | Derlenen siteyi yerelde gösterir, http://localhost:3100 |
| `npm run lint` | Kod denetimi |

## Yayına alma (cPanel ya da başka bir Apache hosting)

1. `npm run build` çalıştır.
2. Sunucudaki eski siteyi yedekle, sonra `public_html` klasörünü boşalt.
3. `out` klasörünün içindekileri `public_html` klasörüne yükle. `.htaccess` gizli bir dosyadır, FTP programında ya da dosya yöneticisinde gizli dosyaları göster seçeneğini aç.
4. Kontrol et:
   - https://www.etites.com.tr açılıyor mu?
   - http://etites.com.tr adresi https://www.etites.com.tr adresine gidiyor mu?
   - Eski bir adres, örneğin https://www.etites.com.tr/dorce-prefabrik-fabrika-projesi/, yeni proje sayfasına gidiyor mu?
   - Olmayan bir adres 404 sayfasını gösteriyor mu?

`.htaccess` şunları yapar:

- http ve www'siz adresleri https://www.etites.com.tr adresine yönlendirir. Bunu yalnız bu alan adında yapar, deneme sunucusunda çalışmaz.
- Eski etites.com.tr adreslerini (`src/data/redirects.json`) yeni sayfalara kalıcı olarak yönlendirir. Bir yönlendirmenin hedef sayfası silinirse derleme hata verip durur.
- 404 sayfasını, önbelleği ve sıkıştırmayı ayarlar.

Site Apache dışında bir yere (Vercel, Netlify, Nginx) konursa bu yönlendirmeler o sunucunun ayarına taşınmalıdır.

## İçerik nerede

| İçerik | Dosya |
| --- | --- |
| Projeler | `src/data/projects.json` |
| Proje görselleri ve kaynakları | `src/data/stock.json`, `public/media/stok` |
| Referanslar | `src/data/references.json`, `public/referanslar` |
| Hizmetler | `src/data/services.ts` |
| Firma bilgileri | `src/data/site.ts` |
| Eski adres yönlendirmeleri | `src/data/redirects.json` |

## Ana sayfa filmi

`scripts/retime-home-video.py` filmi orijinal parçalardan bölüm bölüm hızlandırır. Siteye konacak flu kopyaları ve başlangıç görselini `public/media/video` klasörüne yazar.

Orijinal parçalar ve net arşiv kopyası `video/` klasöründedir. Büyük oldukları için GitHub'a konmaz, ayrıca yedeklenmelidir.

Gerekenler: Python 3 ile numpy, libx264 ve libsvtav1 destekli ffmpeg.
