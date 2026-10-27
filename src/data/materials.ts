/**
 * KATALOG BAHAN — BELUM DIISI.
 * ---------------------------------------------------------------------------
 * Isi dengan bahan yang BENAR-BENAR tersedia. Selama array kosong, halaman
 * /ganti-kain-sofa/ menampilkan pesan bahwa contoh bahan dapat diminta via
 * WhatsApp (bukan daftar bahan karangan).
 *
 * Contoh entri:
 * {
 *   name: "Nama bahan dari supplier",
 *   type: "kain",
 *   description: "Karakter singkat bahan",
 *   colors: ["Abu muda", "Krem"],
 *   imageId: "id-gambar-di-src/data/images.ts",   // opsional
 * }
 */
export interface Material {
  name: string;
  type: "kain" | "kulit-sintetis" | "lainnya";
  description: string;
  colors?: string[];
  imageId?: string;
}

export const materials: Material[] = [];
