import type { ReactNode } from "react";

export interface Topic {
  id?: string;
  title: string;
  body: ReactNode;
}

/** Grid topik berjudul H3 (dipakai di halaman layanan). Anchor `id` opsional untuk tautan internal. */
export function TopicGrid({ topics, columns = 2 }: { topics: Topic[]; columns?: 2 | 3 }) {
  return (
    <div className={`grid gap-x-12 gap-y-10 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {topics.map((t) => (
        <section key={t.title} id={t.id} aria-labelledby={t.id ? `${t.id}-title` : undefined} className="border-t border-charcoal/15 pt-6">
          <h3 id={t.id ? `${t.id}-title` : undefined} className="font-display text-[1.6rem]">
            {t.title}
          </h3>
          <div className="mt-3 text-ink-soft prose-sofa">{t.body}</div>
        </section>
      ))}
    </div>
  );
}

/** Daftar periksa sederhana dengan garis aksen. */
export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.8em] h-px w-5 shrink-0 bg-taupe" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
