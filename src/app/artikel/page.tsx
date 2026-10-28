import type { Metadata } from "next";
import { ArticleBrowser } from "@/components/ArticleBrowser";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/config/site";
import { ARTICLES_PATH } from "@/lib/article-types";
import { getAllArticles, toMeta } from "@/lib/articles";

const DESCRIPTION =
  "Panduan sofa custom dan servis sofa di Bandung: memilih bahan, mengenali kerusakan, faktor biaya, dan cara merawat sofa. Tips praktis dari Sofa Custom.";

const TITLE = "Artikel dan Tips Sofa";

// Tanpa gambar OG: belum ada foto lokal yang mewakili halaman ini (jangan hotlink server lama).
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: ARTICLES_PATH },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.brand,
    url: ARTICLES_PATH,
    title: `${TITLE} | ${site.brand}`,
    description: DESCRIPTION,
  },
  twitter: { card: "summary", title: `${TITLE} | ${site.brand}`, description: DESCRIPTION },
};

export default function ArticlesPage() {
  const articles = getAllArticles().map(toMeta);

  return (
    <>
      <PageHeader
        trail={[{ name: "Artikel", path: ARTICLES_PATH }]}
        eyebrow="Artikel"
        title={TITLE}
        intro={
          <p>
            Panduan memilih sofa custom, memahami bahan upholstery, mengenali tanda sofa perlu diservis, dan merawat sofa agar
            nyaman lebih lama.
          </p>
        }
      />
      <section aria-labelledby="daftar-artikel" className="section-y pt-12">
        <div className="container-page">
          <h2 id="daftar-artikel" className="sr-only">
            Daftar artikel
          </h2>
          <ArticleBrowser articles={articles} />
        </div>
      </section>
      <CtaBand
        title="Masih bingung memilih?"
        body="Ceritakan kebutuhan ruang dan sofa Anda lewat WhatsApp. Kami bantu membahas pilihan yang masuk akal, tanpa tekanan untuk memesan."
        label="Konsultasi via WhatsApp"
      />
    </>
  );
}
