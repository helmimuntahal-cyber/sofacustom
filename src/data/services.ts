import { site } from "@/config/site";
import type { WhatsAppContext } from "@/lib/whatsapp";

/**
 * Daftar layanan. `href` diisi bila layanan punya halaman sendiri; layanan
 * lain mengarah ke halaman induknya (anchor) agar tidak ada tautan mati.
 */
export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  href: string;
  imageId: string;
  whatsapp: WhatsAppContext;
}

const allServices: (Service & { enabled: boolean })[] = [
  {
    slug: "pembuatan-sofa-custom",
    title: "Pembuatan Sofa Custom",
    short: "Sofa baru yang dibuat mengikuti ukuran ruang, model, dan bahan pilihan Anda.",
    description:
      "Mulai dari ukuran ruang dan cara sofa akan dipakai sehari-hari, lalu kita tentukan model, kedalaman dudukan, bahan pelapis, dan warna bersama.",
    href: "/pembuatan-sofa-custom/",
    // Bukan gambar hero, agar beranda tidak menampilkan foto yang sama dua kali.
    imageId: "sofa-hitam-tiga-dudukan",
    whatsapp: "custom",
    enabled: true,
  },
  {
    slug: "servis-sofa",
    title: "Servis & Renovasi Sofa",
    short: "Perbaikan sofa ambles, busa kempis, pelapis rusak, hingga renovasi menyeluruh.",
    description:
      "Kondisi sofa diperiksa lebih dulu dari foto atau secara langsung, lalu kami jelaskan pekerjaan yang dibutuhkan dan perkiraan biayanya.",
    href: "/servis-sofa/",
    imageId: "sebelum-sesudah-chaise",
    whatsapp: "service",
    enabled: true,
  },
  {
    slug: "ganti-kain-sofa",
    title: "Ganti Kain & Kulit Sofa",
    short: "Pelapis baru untuk sofa yang rangkanya masih kokoh tetapi tampilannya sudah lelah.",
    description:
      "Kain atau kulit sintetis yang robek, pudar, atau mengelupas diganti dengan bahan baru sesuai pilihan yang tersedia.",
    href: "/ganti-kain-sofa/",
    imageId: "sebelum-sesudah-dua-dudukan",
    whatsapp: "fabric",
    enabled: true,
  },
  {
    slug: "ganti-busa-sofa",
    title: "Ganti Busa Sofa",
    short: "Dudukan yang kempis atau tidak nyaman lagi diganti busa baru sesuai kebutuhan.",
    description:
      "Kepadatan busa dipilih berdasarkan cara sofa dipakai — untuk duduk tegak, bersantai, atau dipakai banyak orang setiap hari.",
    href: "/servis-sofa/#busa-kempis",
    imageId: "sebelum-sesudah-kulit-hitam",
    whatsapp: "service",
    enabled: true,
  },
  {
    slug: "perbaikan-rangka-sofa",
    title: "Perbaikan Rangka Sofa",
    short: "Rangka yang goyang, patah, atau berbunyi diperiksa dan diperkuat.",
    description:
      "Rangka adalah fondasi sofa. Setelah pelapis dibuka, kondisi kayu dan sambungan diperiksa sebelum diputuskan bagian mana yang diperbaiki atau diganti.",
    href: "/servis-sofa/#rangka",
    imageId: "rangka-sofa-ilustrasi",
    whatsapp: "service",
    enabled: true,
  },
  {
    slug: "servis-sofa-elektrik",
    title: "Servis Sofa Elektrik & Recliner",
    short: "Pemeriksaan sofa dan kursi recliner, termasuk pelapis dan mekanismenya.",
    description:
      "Untuk sofa atau kursi recliner yang pelapisnya rusak atau mekanismenya perlu diperiksa.",
    href: "/servis-sofa/",
    imageId: "kursi-recliner",
    whatsapp: "service",
    // Tampil hanya setelah layanan ini dikonfirmasi tersedia (lihat src/config/site.ts).
    enabled: site.offersElectricSofaService,
  },
];

export const services: Service[] = allServices.filter((s) => s.enabled);

/** Tiga layanan yang punya halaman sendiri (untuk menu & tautan internal). */
export const servicePages = services.filter((s) => !s.href.includes("#"));
