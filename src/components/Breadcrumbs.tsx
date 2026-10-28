import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

/** Breadcrumb dengan JSON-LD. Item terakhir = halaman ini (tidak berupa tautan). */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  const crumbs = [{ name: "Beranda", path: "/" }, ...trail];
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
      <JsonLd data={breadcrumbSchema(crumbs)} />
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
  );
}
