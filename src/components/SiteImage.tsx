"use client";

import { useCallback, useState } from "react";
import type { SiteImage as SiteImageData } from "@/data/images";

interface Props {
  image: SiteImageData;
  /**
   * Rasio kotak gambar (CSS aspect-ratio), mis. "4 / 3". Mencegah layout shift.
   * Default: rasio asli gambar. `null` = atur rasio lewat className
   * (mis. "aspect-[4/3] lg:aspect-[4/5]") untuk rasio berbeda per breakpoint.
   */
  ratio?: string | null;
  fit?: "cover" | "contain";
  /** true untuk gambar utama di atas lipatan (LCP): eager + fetchpriority high. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Tampilkan label "Ilustrasi" untuk foto yang bukan dokumentasi sendiri. */
  showProvenance?: boolean;
}

/**
 * Gambar dengan rasio tetap, lazy loading, dan fallback bila URL gagal dimuat.
 * Memakai <img> biasa agar URL asli tetap dipakai pada static export.
 */
export function SiteImage({
  image,
  ratio,
  fit = "cover",
  priority = false,
  className = "",
  imgClassName = "",
  showProvenance = true,
}: Props) {
  const [failed, setFailed] = useState(false);

  // Gambar bisa gagal sebelum React terhidrasi (onError tidak sempat terpasang),
  // jadi status gambar juga dicek saat elemen dipasang.
  const checkBroken = useCallback((el: HTMLImageElement | null) => {
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden bg-cream ${className}`}
      style={ratio === null ? undefined : { aspectRatio: ratio ?? `${image.width} / ${image.height}` }}
    >
      {failed ? (
        <div role="img" aria-label={image.alt} className="absolute inset-0 grid place-items-center p-6 text-center">
          <div>
            <svg viewBox="0 0 48 24" className="mx-auto mb-3 h-6 w-12 text-taupe" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
              <path d="M4 20V11a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v9M9 8V5a2 2 0 0 1 2-2h26a2 2 0 0 1 2 2v3M2 20h44" strokeLinecap="round" />
            </svg>
            <p className="text-sm text-ink-soft">Gambar sedang tidak dapat dimuat.</p>
          </div>
        </div>
      ) : (
        <img
          ref={checkBroken}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          onError={() => setFailed(true)}
          className={`absolute inset-0 size-full ${fit === "cover" ? "object-cover" : "object-contain"} ${imgClassName}`}
        />
      )}
      {showProvenance && image.provenance === "illustration" && !failed && (
        <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-2.5 py-1 text-xs font-semibold text-charcoal">
          Ilustrasi
        </span>
      )}
    </div>
  );
}
