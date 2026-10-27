# Sofa Custom — sofacustom.my.id

Website untuk **Sofa Custom** (CV. Halim Cipta Kreasi): pembuatan sofa custom, servis sofa, serta ganti kain, kulit, dan busa sofa.

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- **Static export**: `npm run build` menghasilkan folder `out/` berisi HTML/CSS/JS biasa yang bisa diunggah ke hosting apa pun (termasuk shared hosting Hostinger). Tidak butuh server Node.js, database, atau CMS.
- Tanpa API berbayar, tanpa cookie, tanpa analitik.

> **Status:** nomor WhatsApp sudah dikonfigurasi di `.env.local` (lokal, tidak di-commit). Beberapa data bisnis dan izin foto masih perlu dilengkapi — lihat [Data yang perlu dilengkapi](#data-yang-perlu-dilengkapi) dan [Audit gambar](#audit-gambar-diperiksa-27-10-2026). Website ini **belum** dipasang di domain mana pun.

---

## Menjalankan proyek

Butuh Node.js 20.9 atau lebih baru (proyek diuji dengan Node 24 LTS).

```bash
npm install            # sekali saja
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev            # http://localhost:3000
```

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server development dengan hot reload |
| `npm run build` | Build produksi → folder `out/` |
| `npm start` | Menyajikan folder `out/` secara lokal (cek hasil build) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Pemeriksaan tipe TypeScript |
| `npm run check` | typecheck + lint + build sekaligus |
| `npm run check:images` | Mengecek semua URL gambar (status, ukuran, dimensi asli vs konfigurasi) |
| `npm run package` | Membuat `sofacustom-out.zip` (isi `out/`) untuk diunggah ke Hostinger |

Proyek ini belum memiliki unit test; `npm run check` adalah gerbang kualitasnya.

---

## Struktur proyek

```
src/
  config/site.ts        ← DATA BISNIS: kontak, alamat, wilayah, jam, kebijakan, logo
  data/
    images.ts           ← SEMUA URL gambar + alt text + keterangan + status keaslian
    services.ts         ← daftar layanan
    faq.ts              ← pertanyaan & jawaban FAQ
    process.ts          ← langkah alur kerja
    materials.ts        ← katalog bahan (masih kosong)
    navigation.ts       ← menu header & footer
  lib/
    whatsapp.ts         ← pesan WhatsApp per konteks + pembuat URL wa.me
    seo.ts              ← metadata per halaman (title, description, canonical, Open Graph)
    schema.ts           ← structured data JSON-LD
  components/           ← Header, Footer, WhatsAppButton, FloatingWhatsApp, Gallery,
                          ContactForm, SiteImage, PageHeader, FaqList, CtaBand, dll.
  app/                  ← halaman (satu folder = satu URL)
    page.tsx                    /
    pembuatan-sofa-custom/      /pembuatan-sofa-custom/
    servis-sofa/                /servis-sofa/
    ganti-kain-sofa/            /ganti-kain-sofa/
    galeri/                     /galeri/
    tentang-kami/               /tentang-kami/
    faq/                        /faq/
    kontak/                     /kontak/
    kebijakan-privasi/          /kebijakan-privasi/
    not-found.tsx               halaman 404
    sitemap.ts, robots.ts       /sitemap.xml, /robots.txt
    globals.css                 ← DESIGN TOKENS (warna, font, radius)
public/.htaccess        ← konfigurasi Apache/LiteSpeed untuk Hostinger (ikut ke out/)
scripts/check-images.mjs
```

---

## Cara mengubah konten

Setelah mengubah file apa pun, jalankan `npm run build` lagi lalu unggah ulang folder `out/`.

### Nomor WhatsApp
Sudah diisi di `.env.local`. Nilai ini dibaca **saat build**, jadi `npm run build` untuk produksi harus dijalankan di komputer yang memiliki `.env.local` (atau environment variable yang sama). Untuk mengganti nomor:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=62xxxxxxxxxx
```
Format internasional, **hanya angka**: tanpa `+`, spasi, tanda hubung, atau `0` di depan (0812… → 62812…).
Opsional: tampilan nomor yang mudah dibaca di `site.contact.whatsappDisplay` (`src/config/site.ts`).

**Selama nomor belum diisi atau formatnya salah:**
- semua tombol WhatsApp mengarah ke halaman `/kontak/` (tidak ada tombol tanpa tujuan);
- tombol WhatsApp melayang tidak ditampilkan;
- formulir kontak menampilkan pesan bahwa pengiriman belum dapat digunakan.

### Pesan WhatsApp per konteks
`src/lib/whatsapp.ts` → `whatsappMessages`: `general`, `custom`, `service`, `fabric`, `estimate`, `gallery`.

### Alamat, kota, wilayah layanan, jam operasional, email
`src/config/site.ts`. Semua field bernilai `null` / `[]` = belum dikonfirmasi dan **tidak ditampilkan** ke pengunjung (diganti kalimat netral seperti "tanyakan via WhatsApp").
- Mengisi `address` otomatis: menampilkan alamat di kontak & footer, dan mengubah schema dari `Organization` menjadi `FurnitureStore` (LocalBusiness).
- `address.mapsEmbedUrl` menampilkan Google Maps di halaman kontak — isi **hanya** setelah alamat pasti.
- `serviceAreas` dipakai di FAQ, kontak, footer, dan schema `areaServed`.

### Garansi, lama pengerjaan, pengambilan & pengiriman
`site.policies` di `src/config/site.ts`. Selama `null`, FAQ menampilkan jawaban netral yang tidak menjanjikan apa pun.

### Layanan servis sofa elektrik / recliner
Tersembunyi. Setelah dikonfirmasi tersedia, ubah `offersElectricSofaService: true` di `src/config/site.ts`.

### Logo
Letakkan file di `public/` (mis. `public/logo.svg`), lalu isi `logo: "/logo.svg"` di `src/config/site.ts`. Selama `null`, dipakai wordmark teks "Sofa · Custom".
Favicon: tambahkan `src/app/icon.png` (atau `icon.svg`) — Next.js memasangnya otomatis.

### Gambar
Semua di `src/data/images.ts`. Ganti `src` (dan `width`/`height` bila dimensinya berubah — cek dengan `npm run check:images`). Komponen memanggil gambar lewat `id`, jadi tidak perlu mengedit halaman.

Kolom `provenance`:
| Nilai | Arti | Tampilan |
|---|---|---|
| `own` | Dokumentasi Sofa Custom, dikonfirmasi pemilik | normal |
| `unverified` | Terlihat seperti dokumentasi lapangan, **belum** dikonfirmasi | normal, keterangan netral |
| `illustration` | Gambar contoh/internet/studio | label **"Ilustrasi"** + catatan di lightbox |

`hidden: true` menyembunyikan gambar dari situs.

### Teks halaman, layanan, FAQ, harga
- Teks halaman: langsung di `src/app/<halaman>/page.tsx`.
- Layanan: `src/data/services.ts`. FAQ: `src/data/faq.ts`. Katalog bahan: `src/data/materials.ts`.
- **Harga:** sengaja tidak ada harga di situs (belum ada data). Bila ingin menampilkan "mulai dari", tambahkan ke `services.ts` dan tampilkan di halaman layanan — pastikan angkanya resmi.

### Warna & font
`src/app/globals.css` → blok `@theme`. Font diatur di `src/app/layout.tsx` (Fraunces untuk judul, Plus Jakarta Sans untuk teks), di-host sendiri oleh Next.js saat build.
Catatan kontras: taupe `#A48C76` hanya ≈2,9:1 di atas ivory — jangan dipakai untuk teks; gunakan `taupe-deep`.

### Domain & indexing
`.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://sofacustom.my.id   # canonical, sitemap, Open Graph
NEXT_PUBLIC_ALLOW_INDEXING=true                  # "false" untuk staging → noindex + robots Disallow
```

---

## Deployment

Hasil `npm run build` adalah folder `out/` (±2,6 MB): HTML statis dengan `trailingSlash` aktif, sehingga setiap halaman menjadi `folder/index.html` (mis. `out/servis-sofa/index.html` → `/servis-sofa/`). Isi `out/`:

```
.htaccess            ← dari public/.htaccess (404, DirectoryIndex, redirect wp-sitemap, header)
_next/static/.htaccess ← cache 1 tahun untuk aset ber-hash (dibuat scripts/postbuild.mjs)
index.html  404.html  robots.txt  sitemap.xml
pembuatan-sofa-custom/  servis-sofa/  ganti-kain-sofa/  galeri/
tentang-kami/  faq/  kontak/  kebijakan-privasi/
_next/static/        ← JS, CSS, font (nama ber-hash)
```

**Hostinger:** ikuti **[DEPLOYMENT.md](DEPLOYMENT.md)** langkah demi langkah (backup, upload, purge CDN, pengujian, rollback). Ringkasnya:

```bash
npm run check      # typecheck + lint + build + postbuild (cek file wajib & nomor WA)
npm run package    # → sofacustom-out.zip berisi ISI out/, siap di-Extract di public_html
```

Hal yang paling penting:
- sofacustom.my.id saat ini menjalankan WordPress, dan **semua foto situs baru berada di `wp-content/uploads` WordPress itu**. Unggah situs baru **berdampingan** dengan WordPress; jangan hapus file WordPress.
- HTTPS dan www→non-www sudah dipaksa oleh CDN Hostinger; `.htaccess` sengaja tidak memuat aturan paksa-HTTPS (berisiko redirect berulang di belakang CDN).
- Setelah upload, purge cache CDN di hPanel.

**Alternatif:** Vercel, Netlify, atau Cloudflare Pages — hubungkan repository, build command `npm run build`, output directory `out`, dan isi environment variable di dashboard.

---

## Hubungan dengan WordPress + Elementor

Brief awal menargetkan WordPress + Elementor, lalu diganti (override) menjadi **website kode langsung**. Konsekuensinya:

- Website ini **bukan** tema WordPress dan **tidak** bisa diedit lewat Elementor. Perubahan konten dilakukan di file `src/` lalu build ulang.
- Gambar tetap dimuat dari server WordPress lama (`azure-ibis-657822.hostingersite.com/wp-content/uploads/…`). **Jangan hapus** instalasi WordPress itu atau file media tersebut selama URL di `src/data/images.ts` masih menunjuk ke sana. Alternatif jangka panjang: salin gambar ke `public/images/` dan ganti `src` di `images.ts`.
- Bila domain sofacustom.my.id saat ini menjalankan WordPress, mengganti isinya dengan folder `out/` akan **menggantikan** situs WordPress di domain itu. Cadangkan dulu.
- Tidak ada plugin SEO yang terlibat, jadi metadata & schema hanya berasal dari situs ini (tidak ada duplikasi).
- Bila nanti tetap ingin membangun ulang di Elementor: warna di `globals.css` → Global Colors; Fraunces/Plus Jakarta Sans → Global Fonts; kontainer maks. 78rem (1248px); breakpoint Tailwind sm 640 / md 768 / lg 1024 / xl 1280; rasio gambar yang dipakai 4:3, 4:5, 1:1, 16:10; urutan section beranda ada di `src/app/page.tsx`.

---

## SEO yang sudah diterapkan

- Satu `<h1>` per halaman, H2/H3 berurutan; HTML semantik (`header`, `nav`, `main`, `footer`, `figure`, `dl`).
- Title & meta description unik per halaman, canonical URL, Open Graph & Twitter card (`src/lib/seo.ts`).
- `sitemap.xml` & `robots.txt` (`src/app/sitemap.ts`, `src/app/robots.ts`).
- Breadcrumb (visual + `BreadcrumbList` JSON-LD) di semua halaman dalam.
- JSON-LD: `Organization` + `WebSite` global, `Service` di tiga halaman layanan. Hanya data yang ada di `site.ts` yang dikeluarkan — tidak ada alamat, rating, atau harga karangan.
- **FAQPage schema sengaja tidak dipakai**: sejak 2023 Google hanya menampilkan rich result FAQ untuk situs pemerintah/kesehatan.
- Tautan internal antar-halaman layanan, galeri, FAQ, dan kontak.
- Keyword lokasi belum dipakai sampai wilayah operasional dikonfirmasi. Jangan membuat halaman kota massal dengan konten duplikat.

## Aksesibilitas & performa

- Skip link, fokus terlihat, menu & dropdown bisa dioperasikan keyboard (Esc menutup), `aria-expanded`/`aria-current`.
- FAQ memakai `<details>` (berfungsi tanpa JavaScript). Lightbox memakai `<dialog>` bawaan (Esc, panah kiri/kanan, fokus kembali ke pemicu).
- Formulir: label eksplisit, pesan error per isian (`aria-invalid`, `aria-describedby`), ringkasan error `role="alert"`, fokus ke isian pertama yang salah.
- `prefers-reduced-motion` dihormati; tidak ada slider atau animasi berat.
- Gambar hero dimuat `eager` + `fetchpriority="high"`; gambar lain `loading="lazy"`; semua gambar di kotak `aspect-ratio` tetap (mencegah layout shift); fallback elegan bila gambar gagal dimuat.
- Tombol WhatsApp melayang disembunyikan saat footer atau formulir kontak terlihat.
- Target sentuh ≥ 44px. Belum ada pengukuran Core Web Vitals — lakukan dengan PageSpeed Insights setelah situs online.

---

## Data yang perlu dilengkapi

| # | Data | Lokasi | Dampak bila kosong |
|---|---|---|---|
| 1 | ~~Nomor WhatsApp bisnis~~ | `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Sudah diisi** |
| 2 | Tampilan nomor WA (opsional) | `site.contact.whatsappDisplay` | Nomor tidak tertulis sebagai teks di footer/kontak (tombol WA tetap berfungsi) |
| 3 | Email bisnis | `site.contact.email` | Tidak ditampilkan |
| 4 | Alamat workshop (+ embed Maps) | `site.address` | Tidak ada alamat/peta; schema tetap Organization |
| 5 | Kota utama | `site.primaryCity` | Belum dipakai di copy/keyword |
| 6 | Wilayah layanan | `site.serviceAreas` | FAQ & kontak memakai kalimat netral |
| 7 | Jam operasional | `site.openingHours` | Kalimat netral |
| 8 | Ketentuan garansi | `site.policies.warranty` | FAQ: "tanyakan saat konsultasi" |
| 9 | Estimasi lama pengerjaan | `site.policies.leadTime` | FAQ: "disampaikan bersama penawaran" |
| 10 | Ketentuan pengambilan/pengiriman | `site.policies.pickupDelivery` | Kalimat netral |
| 11 | Layanan sofa elektrik/recliner tersedia? | `site.offersElectricSofaService` | Layanan disembunyikan |
| 12 | Profil usaha (tahun berdiri, cerita) | `site.profile` | Tentang Kami memakai teks umum |
| 13 | Katalog bahan | `src/data/materials.ts` | Placeholder "minta contoh bahan via WhatsApp" |
| 14 | Logo final & favicon | `site.logo`, `src/app/icon.png` | Wordmark teks, tanpa favicon |
| 15 | Harga / kisaran harga | belum ada field | Tidak ada harga di situs |
| 16 | Media sosial | `site.social` | Tidak ditampilkan |
| 17 | Konfirmasi foto (lihat bawah) | `src/data/images.ts` | Lihat tabel audit gambar |
| 18 | Domain siap dipakai | `NEXT_PUBLIC_SITE_URL` | Canonical sudah mengarah ke sofacustom.my.id |

---

## Audit gambar (diperiksa 27-10-2026)

Ke-18 URL merespons **HTTP 200**. Setiap gambar dilihat secara visual sebelum diberi alt text dan posisi.

Pada 27-10-2026 pemilik mengonfirmasi bahwa foto yang diunggahnya adalah hasil pekerjaannya sendiri. Status saat ini:

| Status | Foto | Keterangan |
|---|---|---|
| **Portofolio (`own`), tampil** | `set-sofa.jpeg` (hero), `pembuatan-sofa-custom.webp`, `set-sofa-kayu.webp`, `sebelum-dan-sesudah-service.webp`, `ganti-kulit-sofa-service.jpeg`, `service-sofa-before-after.jpeg`, `sofa-lama-jadi-baru-service-custom.png`, `pengiriman-sofa-ke-konsumen.webp` | Aman ditampilkan |
| **Portofolio, tampil — izin disarankan** | `Sofa-Modern.jpeg` | Pantulan wajah seorang perempuan terlihat jelas di cermin (tampil di beranda). Minta izin pemilik rumah atau ganti foto |
| | `pengiriman-sofa-service.webp`, `sofa-electric-service.webp` | Watermark kamera "Maman Surahman". Pastikan pemilik nama setuju; watermark tidak dihapus otomatis |
| **Portofolio, DISEMBUNYIKAN** | `Sofa-Service-Satu-Set.jpeg` | Wajah anak terlihat jelas. Tampilkan (`hidden: false`) hanya dengan izin orang tua, atau ganti dengan versi di-crop/blur |
| **DISEMBUNYIKAN — ganti** | `pekerja-service-sofa.webp` | Watermark **"SILVIANI SOFA"** (nama usaha lain). Tetap `unverified` |
| **Ilustrasi (label tampil)** | `serivice-sofa-before-after.webp`, `before-after-service-sofa-mewah.jpeg`, `before-after-ganti-bahan-sofa.jpeg`, `berfore-after-service-sofa.jpeg`, `sofa-bagus.webp` | Ciri visual foto internet/studio (interior luar negeri, kolase viral, foto katalog). Ubah ke `own` hanya bila pemilik mengonfirmasi foto tersebut **satu per satu** |

Catatan lain:
- `getImage()` menggagalkan build bila halaman memakai gambar `hidden`, sehingga foto yang disembunyikan tidak bisa tampil tanpa sengaja.
- `sofa-electric-service.webp` sebenarnya **kursi recliner** dengan panel tombol; alt text ditulis sesuai isi foto.
- **Optimasi ukuran (disarankan):** `sofa-lama-jadi-baru-service-custom.png` berukuran **3,2 MB** — pada koneksi lambat bisa butuh puluhan detik. Konversi ke WebP (±200 KB), unggah ke WordPress sebagai file **baru** (file lama jangan dihapus), lalu perbarui `src`, `width`, `height` di `images.ts` dan jalankan `npm run check:images`. Saat ini dipakai (lazy-load) di `/servis-sofa/` dan `/galeri/`, tidak di beranda.
- `npm run check:images` mencoba ulang hingga 3 kali per gambar, karena server gambar/jaringan kadang memutus unduhan besar.

**Pengelompokan:** katalog/hero (`set-sofa.jpeg` sebagai hero), custom, servis, sebelum–sesudah, pengiriman — lihat field `categories` di `images.ts`.

---

## Keterbatasan

- Belum ada backend formulir: formulir kontak menyusun pesan dan membuka WhatsApp; tidak ada email yang dikirim.
- Gambar tidak dioptimasi ulang (tanpa `srcset`/resize) karena memakai URL asli dari WordPress pada static export. Untuk performa terbaik, sediakan versi WebP yang lebih kecil di server lalu perbarui `src`.
- Belum diuji di perangkat fisik; pemeriksaan layout dilakukan lewat build dan tinjauan kode.
