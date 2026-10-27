import { site } from "@/config/site";

/**
 * Pesan pembuka WhatsApp per konteks. Ubah teks di sini — semua tombol
 * memakai kunci ini, jadi tidak perlu mengedit komponen satu per satu.
 */
export const whatsappMessages = {
  general:
    "Halo Sofa Custom, saya ingin konsultasi mengenai pembuatan atau servis sofa. Saya akan mengirimkan foto dan detail kebutuhan saya.",
  custom:
    "Halo Sofa Custom, saya ingin konsultasi pembuatan sofa custom. Saya akan mengirimkan ukuran ruang, referensi model, dan bahan yang saya inginkan.",
  service:
    "Halo Sofa Custom, saya ingin konsultasi servis sofa. Saya akan mengirimkan foto kondisi sofa dan penjelasan kerusakannya.",
  fabric:
    "Halo Sofa Custom, saya ingin mengganti kain/kulit sofa. Saya akan mengirimkan foto sofa, ukurannya, dan bahan atau warna yang saya inginkan.",
  estimate:
    "Halo Sofa Custom, saya ingin meminta estimasi biaya. Saya akan mengirimkan foto sofa, ukuran, kondisi, dan pekerjaan yang saya butuhkan.",
  gallery:
    "Halo Sofa Custom, saya melihat galeri di website dan ingin berkonsultasi tentang sofa yang mirip. Saya akan mengirimkan foto referensinya.",
} as const;

export type WhatsAppContext = keyof typeof whatsappMessages;

/** True jika nomor WA bisnis sudah diisi dengan format valid. */
export const isWhatsAppConfigured = site.contact.whatsapp !== null;

/**
 * URL click-to-chat resmi (https://wa.me/<nomor>?text=<pesan>).
 * Mengembalikan null bila nomor belum dikonfigurasi, supaya pemanggil bisa
 * mengarahkan ke halaman kontak alih-alih membuat tombol tanpa tujuan.
 */
export function buildWhatsAppUrl(message: string): string | null {
  if (!site.contact.whatsapp) return null;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** URL WA untuk konteks tertentu, atau "/kontak/" sebagai fallback yang tetap berfungsi. */
export function whatsappHref(context: WhatsAppContext = "general"): string {
  return buildWhatsAppUrl(whatsappMessages[context]) ?? "/kontak/";
}
