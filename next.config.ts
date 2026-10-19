import type { NextConfig } from "next";

// Site düz dosyalar olarak derlenir (out klasörü), sunucuda Next.js çalışmaz.
// Her sayfa kendi klasöründe index.html olur, Apache bunu ek kural gerekmeden sunar.
// Eski etites.com.tr adresleri derlemeden sonra out/.htaccess dosyasına yazılır (scripts/write-htaccess.mjs).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
