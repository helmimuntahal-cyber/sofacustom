import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!site.allowIndexing) {
    // Staging/preview: jangan diindeks.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    // /wp-admin/ tetap ada di server karena WordPress lama masih menyimpan gambar.
    rules: { userAgent: "*", allow: "/", disallow: "/wp-admin/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
