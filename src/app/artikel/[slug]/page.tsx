import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleCard, ArticleCover } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { ARTICLES_PATH, articlePath, formatDate } from "@/lib/article-types";
import { getAllArticles, getArticle, getRelatedArticles, toMeta } from "@/lib/articles";
import { articleSchema } from "@/lib/schema";

// Static export: hanya slug yang dibuat saat build yang ada; slug lain → 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const path = articlePath(article.slug);
  const fullTitle = `${article.title} | ${site.brand}`;
  const images = article.coverImage ? [{ url: article.coverImage, alt: article.coverImageAlt }] : undefined;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: path },
    authors: [{ name: article.author }],
    openGraph: {
      type: "article",
      locale: site.locale,
      siteName: site.brand,
      url: path,
      title: fullTitle,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author],
      section: article.category,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: fullTitle,
      description: article.description,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = articlePath(article.slug);
  const related = getRelatedArticles(article).map(toMeta);
  const meta = toMeta(article);
  // Daftar isi hanya untuk artikel yang cukup panjang.
  const toc = article.headings.filter((h) => h.level === 2);
  const showToc = toc.length >= 4;
  const waMessage = `Halo Sofa Custom, saya baru membaca artikel "${article.title}" di website dan ingin berkonsultasi. Saya akan mengirimkan foto dan detail kebutuhan saya.`;

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.description,
          path,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          author: article.author,
          category: article.category,
          image: article.coverImage,
        })}
      />
      <article>
        <header className="border-b border-line">
          <div className="container-page max-w-4xl pb-12 pt-8 md:pb-16">
            <div className="mb-10 md:mb-12">
              <Breadcrumbs
                trail={[
                  { name: "Artikel", path: ARTICLES_PATH },
                  { name: article.title, path },
                ]}
              />
            </div>
            <p className="eyebrow mb-4">{article.category}</p>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)]">{article.title}</h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">{article.description}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
              <span>{article.author}</span>
              <span aria-hidden="true" className="text-taupe">
                ·
              </span>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              {article.updatedAt && (
                <>
                  <span aria-hidden="true" className="text-taupe">
                    ·
                  </span>
                  <span>
                    Diperbarui <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                  </span>
                </>
              )}
              <span aria-hidden="true" className="text-taupe">
                ·
              </span>
              <span>{article.readingMinutes} menit baca</span>
            </p>
          </div>
        </header>

        <div className="container-page max-w-4xl py-12 md:py-16">
          {article.coverImage && <ArticleCover article={meta} priority className="mb-12 aspect-[16/9] rounded-[var(--radius-media)]" />}

          {showToc && (
            <nav aria-labelledby="toc-title" className="mb-12 rounded-[var(--radius-card)] border border-line bg-white p-6 sm:p-8">
              <h2 id="toc-title" className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
                Daftar isi
              </h2>
              <ol className="mt-4 space-y-2 text-ink-soft">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="underline-offset-4 hover:text-charcoal hover:underline">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <ArticleBody blocks={article.blocks} />

          <p className="mt-14 border-t border-line pt-8">
            <Link href={ARTICLES_PATH} className="font-semibold underline underline-offset-4">
              <span aria-hidden="true">←</span> Kembali ke semua artikel
            </Link>
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="terkait-title" className="section-y border-t border-line bg-cream">
          <div className="container-page">
            <h2 id="terkait-title" className="text-[clamp(1.7rem,3.6vw,2.4rem)]">
              Artikel terkait
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title="Ingin berdiskusi tentang sofa Anda?"
        body={
          <p>
            Kirim foto, ukuran, atau gambaran sofa yang Anda inginkan. Lihat juga layanan kami:{" "}
            <Link href="/pembuatan-sofa-custom/" className="underline underline-offset-4">
              sofa custom
            </Link>{" "}
            dan{" "}
            <Link href="/servis-sofa/" className="underline underline-offset-4">
              servis sofa
            </Link>
            .
          </p>
        }
        message={waMessage}
        label="Konsultasi via WhatsApp"
      />
    </>
  );
}
