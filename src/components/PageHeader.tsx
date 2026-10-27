import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { SiteImage } from "@/components/SiteImage";
import { getImage } from "@/data/images";
import { breadcrumbSchema } from "@/lib/schema";

interface Props {
  /** Breadcrumb setelah "Beranda". Item terakhir = halaman ini. */
  trail: { name: string; path: string }[];
  eyebrow?: string;
  title: string;
  intro: ReactNode;
  actions?: ReactNode;
  imageId?: string;
}

/** Kepala halaman dalam: breadcrumb (+ JSON-LD), H1, intro, CTA, gambar opsional. */
export function PageHeader({ trail, eyebrow, title, intro, actions, imageId }: Props) {
  const crumbs = [{ name: "Beranda", path: "/" }, ...trail];
  const image = imageId ? getImage(imageId) : null;

  return (
    <section className="border-b border-line bg-ivory">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className={`container-page grid gap-10 pb-14 pt-8 md:pb-20 ${image ? "lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-16" : ""}`}>
        <div>
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-ink-soft md:mb-14">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={c.path} className="flex items-center gap-2">
                    {last ? (
                      <span aria-current="page" className="text-charcoal">
                        {c.name}
                      </span>
                    ) : (
                      <>
                        <Link href={c.path} className="underline-offset-4 hover:text-charcoal hover:underline">
                          {c.name}
                        </Link>
                        <span aria-hidden="true" className="text-taupe">
                          /
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="max-w-[16ch] text-[clamp(2.4rem,6vw,4.25rem)]">{title}</h1>
          <div className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-soft">{intro}</div>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {image && <SiteImage image={image} ratio="4 / 3" priority className="rounded-[var(--radius-media)]" />}
      </div>
    </section>
  );
}
