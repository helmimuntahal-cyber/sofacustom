/**
 * Tipe dan helper artikel yang aman dipakai di server maupun client
 * (tanpa akses file). Pembacaan file Markdown ada di src/lib/articles.ts.
 */

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  /** Tanggal ISO (YYYY-MM-DD). */
  publishedAt: string;
  /** Tanggal ISO (YYYY-MM-DD), opsional. */
  updatedAt?: string;
  category: string;
  /** Path lokal di /public, mis. "/images/galeri/nama.webp". Opsional. */
  coverImage?: string;
  coverImageAlt?: string;
  author: string;
  featured: boolean;
  /** Perkiraan menit baca (dihitung dari jumlah kata). */
  readingMinutes: number;
}

export const ARTICLES_PATH = "/artikel/";

export function articlePath(slug: string): string {
  return `${ARTICLES_PATH}${slug}/`;
}

/** Contoh: "28 Oktober 2026". Zona waktu dikunci ke UTC agar server dan browser menghasilkan teks yang sama. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
