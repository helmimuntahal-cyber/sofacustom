# Pengelolaan Artikel

Artikel website Sofa Custom adalah file Markdown di folder `content/articles/`. Tidak ada database atau dashboard admin: tambah file, simpan, kirim ke GitHub, dan Vercel membangun ulang website otomatis.

- Daftar artikel: `/artikel/`
- Halaman artikel: `/artikel/<slug>/`

## Membuat artikel baru di VS Code

1. Salin file artikel yang sudah ada di `content/articles/` (atau buat file baru) dengan nama berawalan nomor, mis. `11-nama-artikel.md`.
   Nama file hanya untuk urutan internal; **alamat halaman ditentukan oleh `slug`**, bukan nama file.
   Artikel dengan tanggal yang sama diurutkan menurut nama file.
2. Isi frontmatter (template di bawah) lalu tulis isinya.
3. Jalankan `npm run dev` dan buka http://localhost:3000/artikel/.

File yang namanya diawali `_` (mis. `_draf-ide.md`) diabaikan.

### Template frontmatter

```markdown
---
title: Judul Artikel yang Jelas dan Spesifik
slug: judul-artikel-yang-jelas
description: Ringkasan satu-dua kalimat untuk kartu artikel dan hasil pencarian Google (maksimal 200 karakter).
publishedAt: 2026-10-28
updatedAt: 2026-11-05
category: Servis Sofa
author: Tim Sofa Custom
coverImage: /images/galeri/nama-foto.webp
coverImageAlt: Deskripsi akurat isi foto
featured: false
draft: false
---

Paragraf pembuka...

## Judul bagian

Isi bagian...
```

| Field | Wajib | Keterangan |
|---|---|---|
| `title` | ya | Judul (H1) dan judul tab browser. |
| `slug` | ya | Huruf kecil, angka, tanda hubung; unik; **jangan diubah setelah terbit** (alamat berubah dan tautan lama rusak). |
| `description` | ya | Maks. 200 karakter, unik per artikel. Dipakai di kartu, meta description, dan Open Graph. |
| `publishedAt` | ya | Tanggal ISO nyata `YYYY-MM-DD`. |
| `updatedAt` | tidak | Isi bila artikel direvisi. Dipakai di sitemap dan structured data. |
| `category` | ya | Teks bebas; kategori yang sama otomatis menjadi satu filter dan dasar artikel terkait. Pakai ejaan konsisten. |
| `author` | ya | Mis. `Tim Sofa Custom`. |
| `coverImage` | tidak | Path lokal yang diawali `/images/`. File harus ada di `public/`. Tanpa ini, kartu memakai visual netral. |
| `coverImageAlt` | wajib bila ada `coverImage` | Deskripsikan isi foto secara akurat. |
| `featured` | tidak | `true` untuk artikel unggulan di `/artikel/` (satu artikel; bila lebih dari satu, yang terbaru dipakai). |
| `draft` | tidak | `true` = tersimpan di repo tetapi tidak diterbitkan dan tidak masuk sitemap. |

Build **gagal** dengan pesan yang jelas bila ada field wajib kosong, slug/tanggal tidak valid, slug ganda, atau file gambar tidak ditemukan.

## Menulis isi artikel

Yang didukung:

- `## Judul` (H2) dan `### Subjudul` (H3). **Jangan pakai `#`**: H1 dibuat otomatis dari `title`.
- Paragraf, daftar `- poin`, daftar bernomor `1. langkah`.
- Tabel:

  ```markdown
  | Kolom A | Kolom B |
  |---|---|
  | isi | isi |
  ```
- Kotak tips/catatan: awali baris dengan `> `.
- **Tebal**, *miring*, dan tautan `[teks](/servis-sofa/)`. Tautan internal diawali `/` dan diakhiri `/`; tautan luar otomatis dibuka di tab baru.
- Gambar: `![deskripsi akurat](/images/galeri/nama-foto.webp)` (file harus ada).

Daftar isi muncul otomatis bila artikel punya minimal 4 judul H2.

Pedoman isi:

- Jangan menulis harga, durasi, garansi, atau klaim pengalaman/testimoni yang belum dikonfirmasi pemilik.
- Jangan memakai angka statistik tanpa sumber.
- Tautkan ke halaman layanan dan artikel lain yang relevan.

## Menambahkan foto

1. Siapkan foto sesuai aturan di [`public/images/README.md`](../public/images/README.md) (nama huruf kecil dengan tanda hubung, format WebP, ukuran dikecilkan).
2. Salin ke folder yang sesuai di `public/images/` (mis. `public/images/galeri/`).
3. Isi `coverImage: /images/galeri/nama-foto.webp` dan `coverImageAlt` di frontmatter.

Jangan memakai gambar dari server WordPress lama atau URL luar untuk artikel; `coverImage` hanya menerima path lokal. Jangan memakai foto bukan milik sendiri, ber-watermark pihak lain, atau menampilkan orang tanpa izin.

## Menentukan slug

- Dari judul, huruf kecil, kata dipisah `-`, tanpa kata sambung yang tidak perlu: *Cara Merawat Sofa Kulit* → `cara-merawat-sofa-kulit`.
- Singkat dan deskriptif; jangan memasukkan tahun kecuali memang relevan.
- Cek tidak ada artikel lain dengan slug yang sama (build akan memberi tahu).

## Memeriksa secara lokal

```bash
npm run dev            # pratinjau di http://localhost:3000/artikel/
npm run check          # typecheck + lint + build
npm run check:articles # setelah build: periksa out/ (canonical, sitemap, JSON-LD, tautan, heading, alt)
```

`check:articles` memastikan setiap artikel punya satu H1, title dan description unik, canonical `https://sofacustom.my.id/artikel/<slug>/`, structured data `BlogPosting`, masuk `sitemap.xml`, serta tidak ada tautan internal yang rusak.

## Mempublikasikan lewat GitHub

```bash
git status
git add content/articles public/images
git commit -m "Tambah artikel: judul artikel"
git push origin main
```

Vercel otomatis membangun ulang website setelah push ke `main`.

## Melihat status deployment Vercel

1. Buka dashboard Vercel → project **sofacustom** → tab **Deployments**.
2. Deployment terbaru harus berstatus **Ready** (hijau). Status *Error* berarti build gagal; klik deployment untuk membaca log (biasanya pesan validasi artikel di atas).
3. Setelah *Ready*, buka `/artikel/<slug>/` untuk memastikan artikel tampil. Sitemap otomatis ikut diperbarui di `/sitemap.xml`.

## Catatan teknis

- Website memakai *static export*: semua artikel dibuat saat build dan dapat dibuka langsung maupun di-refresh. Slug yang tidak ada menampilkan halaman 404.
- Pencarian dan filter di `/artikel/` berjalan di browser; tanpa JavaScript semua artikel tetap tampil.
- Pagination muncul otomatis bila artikel melebihi 12 per halaman (`PAGE_SIZE` di `src/components/ArticleBrowser.tsx`).
- Kode: `src/lib/articles.ts` (membaca dan memvalidasi), `src/lib/markdown.ts` (parser), `src/app/artikel/`.
