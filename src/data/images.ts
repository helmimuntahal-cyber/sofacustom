/**
 * PUSAT DATA GAMBAR
 * ---------------------------------------------------------------------------
 * Semua URL gambar ada di sini. Untuk mengganti gambar, ubah `src` (dan
 * `width`/`height` bila ukurannya berubah) — komponen lain cukup memanggil id.
 *
 * `provenance` menjelaskan status keaslian foto (diperiksa visual 27-10-2026):
 *  - "own"          : dokumentasi hasil kerja Sofa Custom. Pemilik mengonfirmasi
 *                     (27-10-2026) bahwa foto yang diunggahnya adalah hasil kerjanya;
 *                     diterapkan pada foto lapangan yang konsisten dengan itu.
 *  - "unverified"   : asal-usul belum jelas; keterangan dibuat netral.
 *  - "illustration" : terlihat seperti foto dari internet/foto studio (interior luar
 *                     negeri, kolase viral, foto katalog). Tetap diberi label
 *                     "Ilustrasi" sampai pemilik mengonfirmasi foto itu SATU PER SATU.
 *
 * `hidden: true` = tidak ditampilkan di situs (lihat `note`).
 */

export type ImageCategory =
  | "katalog"
  | "custom"
  | "servis"
  | "sebelum-sesudah"
  | "proses"
  | "pengiriman";

export type Provenance = "own" | "unverified" | "illustration";

export interface SiteImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  categories: ImageCategory[];
  provenance: Provenance;
  hidden?: boolean;
  note?: string;
}

const BASE = "https://azure-ibis-657822.hostingersite.com/wp-content/uploads/2026/10";

const list: SiteImage[] = [
  {
    id: "sebelum-sesudah-chaise",
    src: `${BASE}/sebelum-dan-sesudah-service.webp`,
    alt: "Kolase sebelum dan sesudah: sofa kayu berukir dengan jok kain hijau zaitun yang lepas, lalu tampil dengan jok kulit sintetis cokelat muda dan kayu yang mengilap",
    caption: "Sofa kayu berukir: jok kain lama diganti kulit sintetis cokelat muda",
    width: 1195,
    height: 896,
    categories: ["sebelum-sesudah", "servis"],
    provenance: "own",
  },
  {
    id: "pengiriman-sofa-krem",
    src: `${BASE}/pengiriman-sofa-service.webp`,
    alt: "Sofa tiga dudukan berlapis kulit sintetis krem dimuat di bak mobil pikap",
    caption: "Sofa kulit sintetis krem siap diantar dengan mobil pikap",
    width: 789,
    height: 1020,
    categories: ["pengiriman"],
    provenance: "own",
  },
  {
    id: "kursi-recliner",
    src: `${BASE}/sofa-electric-service.webp`,
    alt: "Kursi recliner berlapis kulit sintetis abu-abu muda dengan panel tombol di lengan kursi",
    caption: "Kursi recliner berlapis kulit sintetis abu-abu muda",
    width: 765,
    height: 1020,
    categories: ["servis"],
    provenance: "own",
  },
  {
    id: "sebelum-sesudah-chesterfield",
    src: `${BASE}/sofa-lama-jadi-baru-service-custom.png`,
    alt: "Kolase sebelum dan sesudah: sofa kayu berukir dengan jok kuning kusam dan alas anyaman terbuka, lalu tampil dengan jok kulit sintetis cokelat tua bermotif kancing",
    caption: "Sofa kayu klasik: jok kuning lama diganti kulit sintetis cokelat tua",
    width: 1254,
    height: 1254,
    categories: ["sebelum-sesudah", "servis"],
    provenance: "own",
    note: "File PNG 3,2 MB — disarankan dikonversi ke WebP di server WordPress lalu URL diperbarui.",
  },
  {
    id: "sofa-hitam-tiga-dudukan",
    src: `${BASE}/pembuatan-sofa-custom.webp`,
    alt: "Sofa tiga dudukan berlapis kulit sintetis hitam dengan lengan melengkung di teras berlantai teraso",
    caption: "Sofa tiga dudukan kulit sintetis hitam dengan lengan melengkung",
    width: 1020,
    height: 1020,
    categories: ["custom", "katalog"],
    provenance: "own",
  },
  {
    id: "set-sofa-kayu-klasik",
    src: `${BASE}/set-sofa-kayu.webp`,
    alt: "Set sofa rangka kayu klasik dengan sandaran kancing (tufted) berlapis kulit sintetis cokelat susu",
    caption: "Set sofa rangka kayu klasik dengan sandaran tufted",
    width: 1360,
    height: 1020,
    categories: ["custom", "katalog"],
    provenance: "own",
  },
  {
    id: "pekerja-servis",
    src: `${BASE}/pekerja-service-sofa.webp`,
    alt: "Pekerja memasang kain abu-abu pada rangka kursi sofa berlapis busa kuning di bengkel",
    caption: "Pemasangan kain baru pada rangka sofa",
    width: 1360,
    height: 1020,
    categories: ["proses"],
    provenance: "unverified",
    hidden: true,
    note: "Foto memuat watermark kamera bertuliskan nama usaha lain (\"SILVIANI SOFA\"). Disembunyikan sampai pemilik mengonfirmasi hak pakai / menyediakan versi tanpa watermark.",
  },
  {
    id: "sebelum-sesudah-recliner-abu",
    src: `${BASE}/serivice-sofa-before-after.webp`,
    alt: "Kolase sebelum dan sesudah: sofa recliner empat dudukan abu-abu dengan kulit mengelupas, lalu sofa serupa berlapis bahan krem",
    caption: "Contoh ilustrasi penggantian pelapis sofa recliner",
    width: 720,
    height: 868,
    categories: ["sebelum-sesudah"],
    provenance: "illustration",
  },
  {
    id: "sebelum-sesudah-sudut-hitam",
    src: `${BASE}/before-after-service-sofa-mewah.jpeg`,
    alt: "Kolase sebelum dan sesudah: sofa sudut kulit hitam dengan permukaan kusam, lalu tampil lebih rapi dan mengilap",
    caption: "Contoh ilustrasi perawatan sofa sudut berbahan kulit",
    width: 720,
    height: 720,
    categories: ["sebelum-sesudah"],
    provenance: "illustration",
  },
  {
    id: "sebelum-sesudah-kulit-hitam",
    src: `${BASE}/ganti-kulit-sofa-service.jpeg`,
    alt: "Kolase sebelum dan sesudah: dudukan sofa kulit sintetis hitam yang retak-retak, lalu dudukan dengan pelapis hitam baru yang mulus",
    caption: "Dudukan kulit sintetis hitam yang retak diganti pelapis baru",
    width: 720,
    height: 720,
    categories: ["sebelum-sesudah", "servis"],
    provenance: "own",
  },
  {
    id: "sebelum-sesudah-dua-dudukan",
    src: `${BASE}/service-sofa-before-after.jpeg`,
    alt: "Kolase sebelum dan sesudah: sofa dua dudukan berbahan cokelat yang kotor dan aus, lalu sofa dengan bentuk serupa berlapis bahan abu-abu",
    caption: "Sofa dua dudukan: pelapis cokelat yang aus diganti bahan abu-abu",
    width: 720,
    height: 720,
    categories: ["sebelum-sesudah", "servis"],
    provenance: "own",
  },
  {
    id: "sebelum-sesudah-kain-hijau",
    src: `${BASE}/before-after-ganti-bahan-sofa.jpeg`,
    alt: "Kolase sebelum dan sesudah: sofa kain abu-abu keunguan, lalu sofa serupa berlapis kain hijau dengan bantal bermotif bunga",
    caption: "Contoh ilustrasi penggantian kain sofa",
    width: 720,
    height: 720,
    categories: ["sebelum-sesudah"],
    provenance: "illustration",
  },
  {
    id: "sebelum-sesudah-recliner-cokelat",
    src: `${BASE}/berfore-after-service-sofa.jpeg`,
    alt: "Kolase sebelum dan sesudah: sofa recliner dengan pelapis hitam yang mengelupas parah, lalu sofa recliner berlapis kulit sintetis cokelat",
    caption: "Contoh ilustrasi penggantian kulit sofa recliner",
    width: 495,
    height: 619,
    categories: ["sebelum-sesudah"],
    provenance: "illustration",
  },
  {
    id: "sofa-l-krem",
    src: `${BASE}/Sofa-Service-Satu-Set.jpeg`,
    alt: "Sofa bentuk L berlapis kulit sintetis krem dengan tiga bantal sandaran dan kaki kayu, diletakkan di atas rumput sintetis",
    caption: "Sofa L kulit sintetis krem dengan kaki kayu",
    width: 899,
    height: 1599,
    categories: ["custom", "katalog"],
    provenance: "own",
    hidden: true,
    note: "Wajah anak terlihat jelas. Disembunyikan sampai ada izin orang tua, atau ganti dengan versi yang di-crop/blur.",
  },
  {
    id: "set-recliner-hitam",
    src: `${BASE}/Sofa-Modern.jpeg`,
    alt: "Set sofa recliner berlapis kulit sintetis hitam: satu kursi tunggal dan satu sofa tiga dudukan dengan sandaran kaki terbuka",
    caption: "Set sofa recliner kulit sintetis hitam",
    width: 1024,
    height: 768,
    categories: ["katalog", "servis"],
    provenance: "own",
  },
  {
    id: "sofa-lengkung-abu",
    src: `${BASE}/set-sofa.jpeg`,
    alt: "Sofa lengkung modern berbahan kain abu-abu dengan dua bantal merah dan pouf bundar di ruang kantor",
    caption: "Sofa lengkung kain abu-abu dengan pouf bundar",
    width: 1600,
    height: 1200,
    categories: ["custom", "katalog"],
    provenance: "own",
  },
  {
    id: "rangka-sofa-ilustrasi",
    src: `${BASE}/sofa-bagus.webp`,
    alt: "Ilustrasi dua tahap sofa: sofa lengkung bouclé oranye dengan bantal krem, dan rangka kayu sofa yang sama sebelum dilapisi",
    caption: "Ilustrasi: rangka kayu adalah fondasi bentuk sebuah sofa",
    width: 886,
    height: 1020,
    categories: ["custom"],
    provenance: "illustration",
  },
  {
    id: "pengiriman-sofa-hitam",
    src: `${BASE}/pengiriman-sofa-ke-konsumen.webp`,
    alt: "Sofa tiga dudukan berlapis kulit sintetis hitam dimuat di bak mobil pikap di depan rumah",
    caption: "Sofa kulit sintetis hitam dimuat untuk diantar",
    width: 1360,
    height: 1020,
    categories: ["pengiriman"],
    provenance: "own",
  },
];

/** Hanya gambar yang boleh tampil. */
export const images: SiteImage[] = list.filter((img) => !img.hidden);

/** Semua entri, termasuk yang disembunyikan (untuk skrip pemeriksaan URL). */
export const allImages: readonly SiteImage[] = list;

const byId = new Map(list.map((img) => [img.id, img]));

export function getImage(id: string): SiteImage {
  const img = byId.get(id);
  if (!img) throw new Error(`Gambar dengan id "${id}" tidak ditemukan di src/data/images.ts`);
  // Gagalkan build bila halaman memakai gambar yang disembunyikan (privasi/hak pakai).
  if (img.hidden) throw new Error(`Gambar "${id}" disembunyikan (hidden: true) dan tidak boleh dipakai: ${img.note ?? ""}`);
  return img;
}

export function imagesIn(category: ImageCategory): SiteImage[] {
  return images.filter((img) => img.categories.includes(category));
}

/** Gambar pembuka (LCP) beranda dan gambar default Open Graph. */
export const heroImageId = "sofa-lengkung-abu";
