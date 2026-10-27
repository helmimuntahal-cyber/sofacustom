import type { NextConfig } from "next";

/**
 * Static export: `npm run build` menghasilkan folder `out/` berisi HTML/CSS/JS
 * statis yang bisa diunggah ke hosting biasa (mis. public_html di Hostinger).
 * Gambar dimuat langsung dari URL aslinya (lihat src/data/images.ts), sehingga
 * Image Optimization bawaan Next.js tidak dipakai.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
