# Checklist Deployment — sofacustom.my.id (Hostinger)

Untuk orang yang mengunggah website lewat hPanel. Kerjakan berurutan dan centang setiap langkah.

## Penting dibaca dulu

- **Domain sofacustom.my.id saat ini menjalankan WordPress** (diperiksa 27-10-2026). Website baru akan **menggantikan halaman depan** WordPress tersebut.
- **Semua foto website baru masih tersimpan di WordPress itu** (`wp-content/uploads`). Karena itu **JANGAN menghapus** `wp-content`, `wp-admin`, `wp-includes`, `wp-config.php`, atau file WordPress lainnya. File website baru diunggah **berdampingan** dengan WordPress.
- HTTP→HTTPS dan www→tanpa-www **sudah otomatis** diatur CDN Hostinger. Tidak perlu (dan jangan) menambahkan aturan paksa-HTTPS di `.htaccess`.
- CDN Hostinger menyimpan cache halaman. **Setelah upload wajib purge cache CDN**, kalau tidak, pengunjung masih melihat halaman lama.

---

## A. Persiapan di komputer

- [ ] `.env.local` berisi nomor WhatsApp, domain, dan `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- [ ] Jalankan `npm run check` → harus selesai tanpa error dan menampilkan
      `postbuild: OK — file deployment lengkap, nomor WhatsApp terbaca saat build.`
- [ ] Jalankan `npm run check:images` → `18 gambar diperiksa, 0 gagal.`
- [ ] Keputusan foto sudah diambil (lihat README → "Audit gambar"), terutama foto yang memperlihatkan wajah anak.
- [ ] Jalankan `npm run package` → menghasilkan **`sofacustom-out.zip`** (±760 KB, 113 file) berisi isi folder `out/` **tanpa folder pembungkus**, termasuk `.htaccess`.

## B. Backup (jangan dilewati)

- [ ] hPanel → **Files → Backups** → buat backup file **dan** database, atau
      File Manager → pilih semua isi `public_html` → **Compress** → unduh ZIP-nya ke komputer.
- [ ] Unduh juga **`public_html/.htaccess` lama** secara terpisah dan simpan sebagai `htaccess-wordpress-lama.txt`.
- [ ] Buka file `.htaccess` lama itu. Catat bila ada baris pengatur versi PHP (mis. `AddHandler application/x-httpd-…` atau blok `# php -- BEGIN …`). Baris ini perlu disalin ke `.htaccess` baru (langkah C5).
- [ ] Bila WordPress memakai plugin **LiteSpeed Cache**: wp-admin → LiteSpeed Cache → **Purge All**.

## C. Upload

- [ ] C1. hPanel → **File Manager** → buka `public_html` (folder domain sofacustom.my.id).
- [ ] C2. Aktifkan **Show hidden files** (ikon pengaturan File Manager), agar `.htaccess` terlihat.
- [ ] C3. Unggah `sofacustom-out.zip` ke `public_html`.
- [ ] C4. Klik kanan ZIP → **Extract** → tujuan: `public_html` itu sendiri (**bukan** subfolder baru). Setujui penimpaan file (`.htaccess`, `robots.txt`).
      Hasil yang benar: ada `public_html/index.html` dan `public_html/_next/` — **bukan** `public_html/out/index.html` atau `public_html/sofacustom-out/…`.
- [ ] C5. Bila di langkah B ditemukan baris pengatur versi PHP: buka `public_html/.htaccess` (yang baru) → tempel baris itu di **paling atas** → simpan.
- [ ] C6. Pastikan `public_html/_next/static/.htaccess` ada.
- [ ] C7. Hapus `sofacustom-out.zip` dari `public_html`.
- [ ] C8. hPanel → **Performance → CDN** → **Flush/Purge cache**.

## D. Pengujian setelah upload

Buka di jendela penyamaran (incognito), lalu ulangi di ponsel.

| # | Buka | Hasil yang diharapkan |
|---|---|---|
| D1 | `https://sofacustom.my.id/` | Beranda baru (judul "Jasa Pembuatan Sofa Custom dan Servis Sofa"), foto hero tampil |
| D2 | `/pembuatan-sofa-custom/`, `/servis-sofa/`, `/ganti-kain-sofa/`, `/galeri/`, `/tentang-kami/`, `/faq/`, `/kontak/`, `/kebijakan-privasi/` | Semua tampil dengan gambar |
| D3 | `/servis-sofa` (tanpa garis miring akhir) | Diarahkan ke `/servis-sofa/` |
| D4 | `http://sofacustom.my.id/` dan `https://www.sofacustom.my.id/` | Diarahkan ke `https://sofacustom.my.id/` |
| D5 | `/halaman-yang-tidak-ada/` | Halaman 404 bergaya situs, bukan error server |
| D6 | `/sitemap.xml`, `/robots.txt` | Sitemap 9 URL; robots berisi `Sitemap: https://sofacustom.my.id/sitemap.xml` |
| D7 | `/wp-sitemap.xml` | Diarahkan ke `/sitemap.xml` |
| D8 | Tombol "Konsultasi via WhatsApp" (header, hero, halaman layanan, tombol melayang) | WhatsApp terbuka ke nomor bisnis dengan pesan sesuai halaman |
| D9 | Formulir di `/kontak/` | Isian kosong → muncul pesan error; isian lengkap → WhatsApp terbuka dengan pesan tersusun |
| D10 | Galeri → klik foto | Foto membesar; tombol panah dan Esc berfungsi |
| D11 | Menu di ponsel | Terbuka/tertutup, semua tautan berfungsi |
| D12 | `/wp-admin/` | Halaman login WordPress masih bisa dibuka (dibutuhkan untuk mengelola foto) |
| D13 | Klik kanan foto → buka di tab baru | URL foto merespons (tidak 404) |

Bila D1 masih menampilkan WordPress: purge cache CDN lagi (C8), tunggu beberapa menit, lalu cek ulang di incognito.

Bila **seluruh situs** menampilkan "500 Internal Server Error": buka `public_html/.htaccess`, beri tanda `#` di depan baris `Options -Indexes`, simpan, lalu cek ulang. (Hostinger umumnya mengizinkan baris ini, tetapi hanya bisa dipastikan di server.)

## E. Rollback (bila ada masalah serius)

Cara cepat — hapus file website baru dan kembalikan `.htaccess` lama:
1. Di `public_html` hapus: `index.html`, `index.txt`, `404.html`, `robots.txt`, `sitemap.xml`, semua file `__next.*.txt`, dan folder `_next`, `404`, `_not-found`, `pembuatan-sofa-custom`, `servis-sofa`, `ganti-kain-sofa`, `galeri`, `tentang-kami`, `faq`, `kontak`, `kebijakan-privasi`.
2. Unggah `htaccess-wordpress-lama.txt`, ganti namanya menjadi `.htaccess` (menimpa yang baru).
3. Purge cache CDN.
4. Cek `https://sofacustom.my.id/` → WordPress lama tampil kembali.

Cara lengkap — hPanel → **Backups** → pulihkan backup file dari langkah B.

Website baru tidak mengubah database WordPress, jadi rollback tidak memerlukan pemulihan database.

## F. Setelah online

- [ ] Google Search Console: tambahkan/verifikasi properti `https://sofacustom.my.id`, kirim `sitemap.xml`, hapus `wp-sitemap.xml` bila pernah dikirim.
- [ ] Ukur di PageSpeed Insights (mobile & desktop) untuk beranda dan satu halaman layanan. Catat hasilnya — Core Web Vitals belum pernah diukur.
- [ ] Rencanakan pemindahan gambar ke website baru (lihat README → "Hubungan dengan WordPress"), lalu WordPress lama bisa dinonaktifkan dengan aman.
- [ ] Selama WordPress masih ada: tetap perbarui WordPress dan plugin-nya, karena `/wp-admin/` tetap dapat diakses publik.

## Perubahan konten berikutnya

Ubah file → `npm run check` → `npm run package` → ulangi langkah C3–C8 dan D. Backup `.htaccess` dari langkah B tetap disimpan.
