import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { serviceNav } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4rem)]">Halaman ini tidak ditemukan</h1>
        <p className="mt-6 text-lg text-ink-soft">
          Tautan yang Anda buka mungkin sudah berubah atau salah ketik. Silakan lanjut ke salah satu halaman berikut.
        </p>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          <li>
            <Link href="/" className="block py-4 font-display text-2xl hover:underline">
              Beranda
            </Link>
          </li>
          {serviceNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block py-4 font-display text-2xl hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/galeri/" className="block py-4 font-display text-2xl hover:underline">
              Galeri
            </Link>
          </li>
        </ul>
        <WhatsAppButton className="mt-10" />
      </div>
    </section>
  );
}
