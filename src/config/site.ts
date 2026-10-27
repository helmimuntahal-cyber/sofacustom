/**
 * KONFIGURASI BISNIS TERPUSAT
 * ---------------------------------------------------------------------------
 * Semua data bisnis (kontak, alamat, wilayah, jam, kebijakan) diatur di sini.
 *
 * Aturan placeholder:
 *  - Nilai `null` berarti data BELUM DIKONFIRMASI pemilik bisnis.
 *  - Komponen UI menyembunyikan field `null` atau menampilkan kalimat netral
 *    ("tanyakan via WhatsApp"), tidak pernah menampilkan data contoh/palsu.
 *  - Isi nilai asli lalu jalankan `npm run build` ulang.
 *
 * Daftar lengkap data yang masih kosong ada di README.md bagian "Data yang
 * perlu dilengkapi".
 */

const PLACEHOLDER_WHATSAPP = "GANTI_DENGAN_NOMOR_BISNIS";

/** Nomor WA valid: format internasional, hanya digit, tanpa "+" atau "0" di depan. */
function readWhatsAppNumber(): string | null {
  const raw = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? PLACEHOLDER_WHATSAPP).trim();
  return /^[1-9]\d{7,14}$/.test(raw) ? raw : null;
}

export const site = {
  brand: "Sofa Custom",
  legalName: "CV. Halim Cipta Kreasi",
  tagline: "Pembuatan sofa custom & servis sofa",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofacustom.my.id").replace(/\/$/, ""),
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false",
  locale: "id_ID",

  /** Logo: null = pakai wordmark teks. Isi path di /public, mis. "/logo.svg". */
  logo: null as string | null,

  contact: {
    /** Diisi lewat NEXT_PUBLIC_WHATSAPP_NUMBER. null = belum dikonfigurasi. */
    whatsapp: readWhatsAppNumber(),
    /** Tampilan nomor untuk manusia, mis. "0812-xxxx-xxxx". BELUM DIKONFIRMASI. */
    whatsappDisplay: null as string | null,
    /** Email bisnis. BELUM DIKONFIRMASI. */
    email: null as string | null,
  },

  /** Alamat workshop. BELUM DIKONFIRMASI — biarkan null sampai alamat pasti. */
  address: null as null | {
    street: string;
    locality: string; // kota/kabupaten
    region: string; // provinsi
    postalCode: string;
    /** URL embed Google Maps (opsional), hanya setelah alamat dikonfirmasi. */
    mapsEmbedUrl?: string;
  },

  /** Kota utama operasional. BELUM DIKONFIRMASI. */
  primaryCity: null as string | null,

  /** Wilayah layanan, mis. ["Jakarta Selatan", "Depok"]. BELUM DIKONFIRMASI. */
  serviceAreas: [] as string[],

  /** Jam operasional, mis. [{ days: "Senin–Sabtu", hours: "08.00–17.00" }]. BELUM DIKONFIRMASI. */
  openingHours: [] as { days: string; hours: string }[],

  /**
   * Kebijakan yang tampil di FAQ & halaman layanan. null = belum dikonfirmasi,
   * UI akan menampilkan kalimat netral yang mengarahkan ke konsultasi.
   */
  policies: {
    warranty: null as string | null,
    leadTime: null as string | null,
    pickupDelivery: null as string | null,
  },

  /** Layanan servis sofa elektrik/recliner — tampil hanya jika true. BELUM DIKONFIRMASI. */
  offersElectricSofaService: false as boolean,

  /** Profil usaha (tahun berdiri, pengalaman, dll). BELUM DIKONFIRMASI. */
  profile: {
    foundedYear: null as number | null,
    story: null as string | null,
  },

  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
  },
} as const;

export type Site = typeof site;
