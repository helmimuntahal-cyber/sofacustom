# Folder foto website Sofa Custom

Semua foto yang disimpan di proyek ini ada di folder ini. File di `public/` dilayani apa adanya, jadi
`public/images/galeri/sofa-custom-minimalis-bandung.webp` bisa dipakai di website dengan path
`/images/galeri/sofa-custom-minimalis-bandung.webp`.

> Catatan: karena berada di `public/`, isi folder ini (termasuk README ini dan file `.gitkeep`) ikut
> dipublikasikan saat deploy. Jangan simpan foto yang belum siap tayang di sini — lihat
> [Foto yang belum siap dipublikasikan](#foto-yang-belum-siap-dipublikasikan).

## Fungsi tiap folder

| Folder | Isi | Contoh |
|---|---|---|
| `hero/` | Foto besar pembuka halaman (beranda dan header halaman) | `hero-sofa-custom-ruang-tamu.webp` |
| `pembuatan-sofa/` | Hasil dan proses pembuatan sofa custom | `sofa-custom-minimalis-bandung.webp` |
| `servis-sofa/` | Servis, ganti kain/kulit/busa, sebelum–sesudah | `servis-sofa-sebelum.webp`, `servis-sofa-sesudah.webp` |
| `galeri/` | Foto untuk halaman Galeri (portofolio umum) | `galeri-sofa-l-krem-kaki-kayu.webp` |
| `tentang-kami/` | Bengkel, tim, dan proses kerja | `bengkel-sofa-custom-tampak-depan.webp` |

## Aturan nama file

- Huruf kecil semua, kata dipisah tanda hubung (`-`). Tanpa spasi, huruf besar, atau garis bawah.
- Deskriptif: sebut isi foto (jenis sofa, bahan, gaya, lokasi bila relevan).
  Baik: `servis-sofa-sebelum.webp`. Kurang baik: `IMG_2041 (1).jpeg`.
- Pasangan sebelum–sesudah diberi akhiran `-sebelum` dan `-sesudah` dengan nama dasar yang sama.
- Hanya huruf a–z, angka 0–9, dan tanda hubung. Hindari karakter berakses atau emoji.
- Jangan memakai nama yang sudah ada kecuali memang mengganti fotonya.

## Format yang didukung

- **WebP** atau **AVIF**: pilihan utama untuk foto baru (ukuran kecil, kualitas baik).
- **JPEG** dan **PNG**: tetap didukung. PNG hanya cocok untuk logo/gambar dengan transparansi;
  foto sebaiknya jangan PNG karena file-nya besar.
- Saran ukuran: sisi terpanjang sekitar 1600 px, usahakan di bawah 300 KB per foto.
- Proyek ini memakai *static export* dengan `images.unoptimized`, jadi Next.js **tidak** mengecilkan
  gambar otomatis. Kecilkan dulu foto sebelum dimasukkan.

## Cara menambahkan foto baru

1. Siapkan foto: ganti nama sesuai aturan di atas, kecilkan ukurannya, dan simpan sebagai WebP.
2. Salin ke folder yang sesuai, misalnya lewat Explorer atau seret-lepas ke panel Explorer VS Code.
3. Path gambar = `/images/<folder>/<nama-file>`. Contoh: `/images/servis-sofa/servis-sofa-sebelum.webp`.
   (Di VS Code: klik kanan file → *Copy Relative Path*, lalu buang awalan `public`.)
4. Daftarkan foto di [`src/data/images.ts`](../../src/data/images.ts), karena semua halaman membaca
   gambar dari sana. Tambahkan satu entri baru di array `list`:

   ```ts
   {
     id: "servis-sofa-sebelum",
     src: "/images/servis-sofa/servis-sofa-sebelum.webp", // path lokal, tanpa BASE
     alt: "Sofa tiga dudukan dengan kulit sintetis mengelupas sebelum diservis",
     caption: "Sofa tiga dudukan sebelum ganti kulit",
     width: 1200,   // ukuran asli foto dalam piksel
     height: 900,
     categories: ["servis", "sebelum-sesudah"],
     provenance: "own", // "own" hanya untuk foto hasil kerja Sofa Custom sendiri
   },
   ```

   Untuk mengganti foto lama, cukup ubah `src` entri yang sudah ada.
5. Pakai di komponen lewat id-nya. Contoh:

   ```tsx
   import { getImage } from "@/data/images";
   import { SiteImage } from "@/components/SiteImage";

   <SiteImage image={getImage("servis-sofa-sebelum")} />
   ```

   Foto dengan kategori yang sesuai otomatis ikut tampil di galeri dan grid sebelum–sesudah.

## Melihat hasil secara lokal

```bash
npm install        # sekali saja
npm run dev        # buka http://localhost:3000
npm run check:images   # cek semua gambar (URL luar dan file lokal di public/)
npm run check      # typecheck + lint + build sebelum dikirim
```

## Mengirim perubahan ke GitHub dan deploy ke Vercel

```bash
git status
git add public/images src/data/images.ts
git commit -m "Tambah foto servis sofa"
git push origin main
```

Vercel otomatis membangun ulang setelah `git push` ke `main`. Pantau di dashboard Vercel
(project `sofacustom`); setelah statusnya *Ready*, foto tampil di website.

## Foto yang belum siap dipublikasikan

- Jangan simpan di `public/`: seluruh isinya ikut tayang.
- Simpan sementara di luar proyek (mis. folder `draft-foto` di komputer), atau jangan di-commit.
- Bila foto sudah di folder ini tetapi belum boleh tampil, tandai entrinya `hidden: true` di
  `src/data/images.ts` dan jelaskan alasannya di `note`.
- Jangan pakai foto ber-watermark pihak lain, foto dengan wajah orang tanpa izin, atau foto dari
  internet yang bukan milik sendiri. Foto contoh/ilustrasi diberi `provenance: "illustration"`
  agar tampil dengan label "Ilustrasi".
- Foto pengganti sementara (placeholder) jangan dipakai sebagai ganti foto asli.
