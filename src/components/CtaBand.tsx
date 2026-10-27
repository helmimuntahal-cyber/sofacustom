import type { ReactNode } from "react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import type { WhatsAppContext } from "@/lib/whatsapp";

interface Props {
  title: string;
  body: ReactNode;
  context?: WhatsAppContext;
  label?: string;
  checklist?: string[];
}

/** CTA penutup berlatar charcoal, dipakai di akhir hampir semua halaman. */
export function CtaBand({ title, body, context = "general", label = "Konsultasi via WhatsApp", checklist }: Props) {
  return (
    <section aria-labelledby="cta-title" className="section-y">
      <div className="container-page">
        <div className="grid gap-10 rounded-[2rem] bg-charcoal px-6 py-12 text-ivory sm:px-10 md:py-16 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:px-16">
          <div>
            <h2 id="cta-title" className="max-w-[18ch] text-[clamp(1.9rem,4vw,2.9rem)]">
              {title}
            </h2>
            <div className="mt-5 max-w-[52ch] text-lg leading-relaxed text-cream">{body}</div>
            <WhatsAppButton context={context} label={label} className="mt-8" />
          </div>
          {checklist && (
            <div className="rounded-[var(--radius-card)] border border-white/15 p-6 sm:p-8">
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white">Siapkan untuk konsultasi</p>
              <ul className="mt-5 space-y-3">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-3 text-cream">
                    <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-taupe" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const defaultChecklist = [
  "Foto sofa dari depan, samping, dan bagian yang bermasalah",
  "Perkiraan ukuran: panjang, kedalaman, dan tinggi",
  "Jenis pekerjaan yang Anda inginkan",
  "Bahan atau warna yang Anda bayangkan",
  "Lokasi Anda (kota/kecamatan)",
];
