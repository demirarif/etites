// Derlemeden sonra out/.htaccess dosyasını yazar (npm run build ardından kendiliğinden çalışır).
// Apache için https ve www yönlendirmesi, eski etites.com.tr adresleri, hata sayfası ve önbellek ayarı.
// Bir yönlendirmenin hedefi derlenen sitede yoksa ya da eski adres bir sayfanın üstüne düşüyorsa durur.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const redirects = JSON.parse(readFileSync("src/data/redirects.json", "utf8"));

const withSlash = (path) => (path.endsWith("/") ? path : `${path}/`);
const pageFile = (path) => join(OUT, withSlash(path), "index.html");
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const problems = [];
if (!existsSync(join(OUT, "404.html"))) problems.push("out/404.html yok");
for (const { source, destination } of redirects) {
  if (!existsSync(pageFile(destination))) problems.push(`hedef sayfa yok: ${source} -> ${destination}`);
  if (existsSync(pageFile(source))) problems.push(`eski adres bir sayfanın üstüne düşüyor: ${source}`);
}
if (problems.length) {
  console.error(`.htaccess yazılmadı:\n${problems.join("\n")}`);
  process.exit(1);
}

const rules = redirects.map(
  ({ source, destination }) =>
    `RewriteRule ^${escapeRegex(source.replace(/^\/|\/$/g, ""))}/?$ ${withSlash(destination)} [R=301,L,NC]`,
);

const htaccess = `# Etites İklimlendirme, Apache ayarları
# scripts/write-htaccess.mjs üretir, elle düzenleme. Eski adresler: src/data/redirects.json

Options -Indexes
ErrorDocument 404 /404.html

AddType video/webm .webm
AddType video/mp4 .mp4
AddType image/webp .webp
AddType image/svg+xml .svg
AddType font/woff2 .woff2
AddDefaultCharset utf-8
AddCharset utf-8 .css .js .txt .xml .json .svg

<IfModule mod_rewrite.c>
RewriteEngine On

# http ve www'siz adres tek adımda https://www.etites.com.tr adresine gider. Başka alan adında (deneme sunucusu) çalışmaz.
RewriteCond %{HTTP_HOST} ^(www\\.)?etites\\.com\\.tr$ [NC]
RewriteCond %{HTTPS} !=on
RewriteCond %{HTTP:X-Forwarded-Proto} !=https
RewriteRule ^ https://www.etites.com.tr%{REQUEST_URI} [R=301,L,NE]
RewriteCond %{HTTP_HOST} ^etites\\.com\\.tr$ [NC]
RewriteRule ^ https://www.etites.com.tr%{REQUEST_URI} [R=301,L,NE]

# Eski etites.com.tr adresleri yeni sayfalara kalıcı olarak gider (${redirects.length} adres)
${rules.join("\n")}
</IfModule>

<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-Frame-Options "SAMEORIGIN"

# Sayfalar her açılışta yenisi var mı diye sorulur
<FilesMatch "\\.(html|txt|xml|json)$">
Header set Cache-Control "no-cache"
</FilesMatch>
# Adı her derlemede değişen dosyalar bir yıl saklanır
<FilesMatch "\\.(js|css|woff2)$">
Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
# Görseller ve film bir hafta saklanır
<FilesMatch "\\.(webp|jpg|jpeg|png|svg|ico|webm|mp4)$">
Header set Cache-Control "public, max-age=604800"
</FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
<IfModule mod_filter.c>
AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json image/svg+xml
</IfModule>
</IfModule>
`;

writeFileSync(join(OUT, ".htaccess"), htaccess);
console.log(`out/.htaccess yazıldı, ${redirects.length} eski adres yönlendirmesi`);
