"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowIcon, CloseIcon } from "@/components/icons";
import { SiteImage } from "@/components/SiteImage";
import type { ImageCategory, SiteImage as SiteImageData } from "@/data/images";

const filterLabels: { value: ImageCategory | "semua"; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "katalog", label: "Model sofa" },
  { value: "sebelum-sesudah", label: "Sebelum & sesudah" },
  { value: "servis", label: "Servis" },
  { value: "pengiriman", label: "Pengiriman" },
];

interface Props {
  images: SiteImageData[];
  /** Tampilkan tombol filter kategori (halaman galeri penuh). */
  filterable?: boolean;
  whatsappHref: string;
  whatsappExternal: boolean;
  /** Bila diisi, sel terakhir grid berisi tautan "Lihat semua foto" ke alamat ini. */
  moreHref?: string;
}

/** Grid galeri dengan lightbox <dialog> bawaan browser (Esc, panah kiri/kanan). */
export function Gallery({ images, filterable = false, whatsappHref, whatsappExternal, moreHref }: Props) {
  const [filter, setFilter] = useState<ImageCategory | "semua">("semua");
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const shown = useMemo(
    () => (filter === "semua" ? images : images.filter((img) => img.categories.includes(filter))),
    [filter, images],
  );

  const open = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive(index);
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback(
    (delta: number) => setActive((i) => (i === null ? i : (i + delta + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setActive(null);
      triggerRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const current = active === null ? null : shown[active];
  const isComposite = (img: SiteImageData) => img.categories.includes("sebelum-sesudah");

  return (
    <div>
      {filterable && (
        <div role="group" aria-label="Filter galeri" className="-mx-1 mb-10 flex flex-wrap gap-2">
          {filterLabels
            .filter((f) => f.value === "semua" || images.some((img) => img.categories.includes(f.value as ImageCategory)))
            .map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
                className="min-h-11 rounded-full border border-charcoal/20 px-5 text-[0.95rem] transition-colors hover:border-charcoal aria-pressed:border-charcoal aria-pressed:bg-charcoal aria-pressed:text-ivory"
              >
                {f.label}
              </button>
            ))}
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {shown.map((img, i) => (
          <li key={img.id}>
            <figure>
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="group block w-full overflow-hidden rounded-[var(--radius-card)] text-left"
                aria-label={`Perbesar foto: ${img.caption}`}
              >
                <SiteImage
                  image={img}
                  ratio="4 / 5"
                  fit={isComposite(img) ? "contain" : "cover"}
                  className="rounded-[var(--radius-card)]"
                  imgClassName="transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                />
              </button>
              <figcaption className="mt-2.5 text-sm leading-snug text-ink-soft sm:text-[0.95rem]">{img.caption}</figcaption>
            </figure>
          </li>
        ))}
        {moreHref && (
          <li>
            <Link
              href={moreHref}
              className="group flex aspect-[4/5] flex-col justify-end rounded-[var(--radius-card)] bg-charcoal p-5 text-ivory transition-colors hover:bg-black sm:p-7"
            >
              <span className="font-display text-[clamp(1.35rem,3vw,2rem)] leading-tight">Lihat semua foto</span>
              <span className="mt-3 inline-flex items-center gap-2 text-sm text-cream">
                Buka galeri
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
              </span>
            </Link>
          </li>
        )}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? current.caption : "Foto galeri"}
        className="lightbox m-auto max-h-[100dvh] w-full max-w-5xl bg-transparent p-3 text-ivory sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-cream" aria-live="polite">
                {(active ?? 0) + 1} / {shown.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Tutup"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
            <img
              key={current.id}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              className="mx-auto max-h-[70dvh] w-auto rounded-xl object-contain"
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-ivory">{current.caption}</p>
                {current.provenance === "illustration" && (
                  <p className="mt-1 text-sm text-cream">Foto ilustrasi — bukan dokumentasi proyek kami.</p>
                )}
                {current.provenance === "own" && <p className="mt-1 text-sm text-cream">Dokumentasi pekerjaan Sofa Custom.</p>}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="inline-flex size-11 rotate-180 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                  aria-label="Foto sebelumnya"
                >
                  <ArrowIcon className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                  aria-label="Foto berikutnya"
                >
                  <ArrowIcon className="size-5" />
                </button>
                <a
                  href={whatsappHref}
                  {...(whatsappExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="ml-2 inline-flex min-h-11 items-center rounded-full bg-ivory px-4 text-sm font-semibold text-charcoal hover:bg-white"
                >
                  Tanya sofa seperti ini
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
