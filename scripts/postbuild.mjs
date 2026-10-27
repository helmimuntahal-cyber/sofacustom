// Dijalankan otomatis oleh npm setelah `npm run build`.
// 1. Memasang aturan cache jangka panjang khusus untuk out/_next/static/.
// 2. Memastikan file wajib untuk deployment ada di out/.
// 3. Memastikan nomor WhatsApp terbaca saat build (tanpa menampilkan nomornya).
import { copyFile, readFile, stat } from "node:fs/promises";

const out = new URL("../out/", import.meta.url);
await copyFile(new URL("static-cache.htaccess", import.meta.url), new URL("_next/static/.htaccess", out));

const required = [".htaccess", "index.html", "404.html", "robots.txt", "sitemap.xml", "_next/static/.htaccess"];
const missing = [];
for (const f of required) {
  await stat(new URL(f, out)).catch(() => missing.push(f));
}
if (missing.length) {
  console.error(`postbuild: file wajib tidak ada di out/: ${missing.join(", ")}`);
  process.exit(1);
}

const home = await readFile(new URL("index.html", out), "utf8");
if (!home.includes("https://wa.me/")) {
  console.warn(
    "postbuild: PERINGATAN — tidak ada tautan wa.me di beranda. NEXT_PUBLIC_WHATSAPP_NUMBER belum diisi atau formatnya salah; tombol WhatsApp mengarah ke /kontak/.",
  );
} else {
  console.log("postbuild: OK — file deployment lengkap, nomor WhatsApp terbaca saat build.");
}
