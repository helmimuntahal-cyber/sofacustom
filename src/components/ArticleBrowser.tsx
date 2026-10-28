"use client";

import { useMemo, useRef, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleMeta } from "@/lib/article-types";

/** Jumlah kartu per halaman. Pagination hanya muncul bila hasil lebih banyak dari ini. */
const PAGE_SIZE = 12;
const ALL = "Semua";

function normalize(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Artikel unggulan, filter kategori, pencarian, grid, dan pagination. Tanpa JavaScript, semua artikel tetap tampil. */
export function ArticleBrowser({ articles }: { articles: ArticleMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => [ALL, ...Array.from(new Set(articles.map((a) => a.category)))], [articles]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return articles.filter(
      (a) => (category === ALL || a.category === category) && (q === "" || normalize(`${a.title} ${a.description}`).includes(q)),
    );
  }, [articles, query, category]);

  const isDefaultView = query.trim() === "" && category === ALL;
  const featured = isDefaultView ? (articles.find((a) => a.featured) ?? null) : null;
  const gridItems = featured ? filtered.filter((a) => a.slug !== featured.slug) : filtered;

  const pageCount = Math.max(1, Math.ceil(gridItems.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = gridItems.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function goToPage(n: number) {
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reset() {
    setQuery("");
    setCategory(ALL);
    setPage(1);
  }

  return (
    <div ref={topRef}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter kategori" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                setPage(1);
              }}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                category === c ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-white/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="w-full lg:max-w-sm">
          <label htmlFor="cari-artikel" className="sr-only">
            Cari artikel
          </label>
          <input
            id="cari-artikel"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Cari judul atau ringkasan artikel"
            autoComplete="off"
            className="min-h-12 w-full rounded-full border border-charcoal/25 bg-white px-5 text-base placeholder:text-ink-soft/80 focus:border-charcoal"
          />
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm text-ink-soft">
        {filtered.length === 0
          ? "Tidak ada artikel yang cocok."
          : isDefaultView
            ? `${articles.length} artikel`
            : `${filtered.length} artikel ditemukan`}
      </p>

      {featured && current === 1 && (
        <div className="mt-6">
          <p className="eyebrow mb-4">Artikel unggulan</p>
          <ArticleCard article={featured} featured />
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-[var(--radius-card)] border border-line bg-white p-8 text-center sm:p-12">
          <h3 className="font-display text-2xl">Artikel tidak ditemukan</h3>
          <p className="mx-auto mt-3 max-w-[46ch] text-ink-soft">
            Coba kata kunci lain yang lebih singkat, atau tampilkan semua artikel. Anda juga bisa bertanya langsung lewat WhatsApp.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-charcoal px-6 font-semibold text-ivory hover:bg-black"
          >
            Tampilkan semua artikel
          </button>
        </div>
      ) : (
        visible.length > 0 && (
          <ul className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${featured && current === 1 ? "mt-10" : "mt-8"}`}>
            {visible.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        )
      )}

      {pageCount > 1 && (
        <nav aria-label="Halaman artikel" className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            disabled={current === 1}
            onClick={() => goToPage(current - 1)}
            className="min-h-11 rounded-full border border-charcoal/25 px-4 text-sm font-semibold enabled:hover:border-charcoal disabled:opacity-40"
          >
            Sebelumnya
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              aria-current={n === current ? "page" : undefined}
              aria-label={`Halaman ${n}`}
              onClick={() => goToPage(n)}
              className={`size-11 rounded-full border text-sm font-semibold ${
                n === current ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/25 hover:border-charcoal"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={current === pageCount}
            onClick={() => goToPage(current + 1)}
            className="min-h-11 rounded-full border border-charcoal/25 px-4 text-sm font-semibold enabled:hover:border-charcoal disabled:opacity-40"
          >
            Berikutnya
          </button>
        </nav>
      )}
    </div>
  );
}
