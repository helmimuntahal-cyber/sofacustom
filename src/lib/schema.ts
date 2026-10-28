import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * Structured data (JSON-LD). Hanya memuat fakta yang sudah ada di
 * src/config/site.ts — field yang masih null tidak dikeluarkan sama sekali.
 *
 * Catatan: FAQPage schema sengaja TIDAK dipakai. Sejak Agustus 2023 Google
 * hanya menampilkan rich result FAQ untuk situs pemerintah & kesehatan
 * terkemuka, jadi markup itu tidak memberi manfaat untuk situs ini.
 *
 * LocalBusiness baru dipakai otomatis setelah alamat workshop diisi; sebelum
 * itu cukup Organization.
 */

type Json = Record<string, unknown>;

const ORG_ID = `${site.url}/#organization`;

function compact<T extends Json>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)),
  ) as T;
}

export function organizationSchema(): Json {
  const sameAs = Object.values(site.social).filter((v): v is string => Boolean(v));
  const contactPoint = site.contact.whatsapp
    ? {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${site.contact.whatsapp}`,
        availableLanguage: ["id"],
      }
    : null;

  const base = compact({
    "@context": "https://schema.org",
    "@type": site.address ? "FurnitureStore" : "Organization",
    "@id": ORG_ID,
    name: site.legalName,
    alternateName: site.brand,
    url: site.url,
    logo: site.logo ? absoluteUrl(site.logo) : null,
    email: site.contact.email,
    telephone: site.contact.whatsapp ? `+${site.contact.whatsapp}` : null,
    contactPoint,
    sameAs,
    areaServed: site.serviceAreas.length > 0 ? site.serviceAreas : null,
  });

  if (site.address) {
    Object.assign(base, {
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: "ID",
      },
    });
  }
  return base;
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.brand,
    inLanguage: "id-ID",
    publisher: { "@id": ORG_ID },
  };
}

export function serviceSchema(input: { name: string; description: string; path: string; serviceType: string }): Json {
  return compact({
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": ORG_ID },
    areaServed: site.serviceAreas.length > 0 ? site.serviceAreas : null,
  });
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  image?: string;
}): Json {
  return compact({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(input.path) },
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: { "@type": "Organization", name: input.author },
    publisher: { "@id": ORG_ID },
    articleSection: input.category,
    inLanguage: "id-ID",
    image: input.image ? [absoluteUrl(input.image)] : null,
  });
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
