import { SiteImage } from "@/components/SiteImage";
import { getImage } from "@/data/images";

/**
 * Kolase sebelum–sesudah. Setiap gambar sudah berupa satu kolase (bukan dua
 * foto terpisah yang dipasangkan), jadi tidak ada klaim "proyek yang sama"
 * yang dibuat oleh situs ini. Keterangan diambil dari src/data/images.ts.
 */
export function BeforeAfterGrid({ ids }: { ids: string[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {ids.map((id, i) => {
        const img = getImage(id);
        // Gambar pertama dibuat lebih lebar di layar besar agar grid tidak monoton.
        const wide = i === 0 && ids.length % 2 === 1;
        return (
          <li key={id} className={wide ? "sm:col-span-2" : ""}>
            <figure>
              <SiteImage
                image={img}
                ratio={wide ? "16 / 10" : "1 / 1"}
                fit="contain"
                className="rounded-[var(--radius-media)] bg-cream"
              />
              <figcaption className="mt-3 flex items-start gap-3 text-[0.95rem] text-ink-soft">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-6 shrink-0 bg-taupe" />
                {img.caption}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
