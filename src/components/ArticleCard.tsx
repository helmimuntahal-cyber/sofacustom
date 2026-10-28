import Link from "next/link";
import { articlePath, formatDate, type ArticleMeta } from "@/lib/article-types";

/** Foto utama artikel, atau visual netral bila artikel belum punya foto. */
export function ArticleCover({ article, className = "", priority = false }: { article: ArticleMeta; className?: string; priority?: boolean }) {
  if (article.coverImage) {
    return (
      <div className={`relative overflow-hidden bg-cream ${className}`}>
        <img
          src={article.coverImage}
          alt={article.coverImageAlt ?? ""}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          className={`absolute inset-0 size-full ${article.coverFit === "contain" ? "object-contain" : "object-cover"}`}
        />
      </div>
    );
  }
  // Tanpa foto: blok warna netral dengan ikon sofa garis dan nama kategori (bukan foto pengganti).
  return (
    <div aria-hidden="true" className={`relative grid place-items-center overflow-hidden bg-cream ${className}`}>
      <div className="text-center text-taupe-deep">
        <svg viewBox="0 0 48 24" className="mx-auto h-8 w-16" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <path d="M4 20V11a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v9M9 8V5a2 2 0 0 1 2-2h26a2 2 0 0 1 2 2v3M2 20h44" strokeLinecap="round" />
        </svg>
        <p className="mt-3 px-4 text-xs font-semibold uppercase tracking-[0.14em]">{article.category}</p>
      </div>
    </div>
  );
}

function Meta({ article }: { article: ArticleMeta }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
      <span className="font-semibold text-taupe-deep">{article.category}</span>
      <span aria-hidden="true" className="text-taupe">
        ·
      </span>
      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      <span aria-hidden="true" className="text-taupe">
        ·
      </span>
      <span>{article.readingMinutes} menit baca</span>
    </p>
  );
}

/** Kartu artikel. Seluruh kartu dapat diklik lewat tautan pada judul. */
export function ArticleCard({ article, featured = false }: { article: ArticleMeta; featured?: boolean }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-shadow hover:shadow-[0_12px_32px_-18px_rgb(41_41_41/0.35)] ${
        featured ? "lg:grid lg:grid-cols-[1.1fr_1fr]" : ""
      }`}
    >
      <ArticleCover article={article} className={featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-80" : "aspect-[16/10]"} priority={featured} />
      <div className={`flex flex-1 flex-col p-6 ${featured ? "sm:p-8 lg:p-10" : ""}`}>
        <Meta article={article} />
        <h3 className={`mt-3 font-display ${featured ? "text-[clamp(1.7rem,3vw,2.4rem)]" : "text-[1.5rem]"}`}>
          <Link href={articlePath(article.slug)} className="after:absolute after:inset-0 after:content-[''] hover:underline hover:underline-offset-4">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 text-ink-soft">{article.description}</p>
        <p className="mt-auto pt-5 text-sm font-semibold text-charcoal">
          Baca selengkapnya <span aria-hidden="true">→</span>
        </p>
      </div>
    </article>
  );
}
