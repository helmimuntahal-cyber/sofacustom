import type { MetadataRoute } from "next";
import { articlePath } from "@/lib/article-types";
import { getAllArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** Tambahkan path baru di sini setiap kali membuat halaman baru. */
const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/pembuatan-sofa-custom/", priority: 0.9 },
  { path: "/servis-sofa/", priority: 0.9 },
  { path: "/ganti-kain-sofa/", priority: 0.9 },
  { path: "/galeri/", priority: 0.7 },
  { path: "/artikel/", priority: 0.7 },
  { path: "/faq/", priority: 0.6 },
  { path: "/tentang-kami/", priority: 0.5 },
  { path: "/kontak/", priority: 0.6 },
  { path: "/kebijakan-privasi/", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority,
  }));
  const articles = getAllArticles().map((a) => ({
    url: absoluteUrl(articlePath(a.slug)),
    lastModified: new Date(`${a.updatedAt ?? a.publishedAt}T00:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...articles];
}
