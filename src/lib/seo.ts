import type { Metadata } from "next";
import { site } from "@/config/site";
import { getImage, heroImageId } from "@/data/images";

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

interface PageMetaInput {
  /** Judul halaman tanpa nama brand; brand ditambahkan oleh template di layout. */
  title: string;
  description: string;
  /** Path kanonis dengan trailing slash, mis. "/servis-sofa/". */
  path: string;
  imageId?: string;
  /** Pakai judul apa adanya (tanpa template "| Sofa Custom"). */
  absoluteTitle?: boolean;
}

/** Metadata unik per halaman: title, description, canonical, Open Graph, Twitter. */
export function pageMetadata({ title, description, path, imageId, absoluteTitle }: PageMetaInput): Metadata {
  const image = getImage(imageId ?? heroImageId);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.brand}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.brand,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.src],
    },
  };
}
