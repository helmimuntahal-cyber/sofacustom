import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { PageHeader } from "@/components/PageHeader";
import { faqs } from "@/data/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ Pembuatan Sofa Custom & Servis Sofa",
  description:
    "Jawaban seputar cara memesan sofa custom, meminta estimasi servis sofa, informasi yang perlu dikirim, faktor harga, pengiriman, garansi, dan wilayah layanan.",
  path: "/faq/",
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "FAQ", path: "/faq/" }]}
        eyebrow="FAQ"
        title="Pertanyaan yang sering diajukan"
        intro={
          <p>
            Belum menemukan jawabannya? Tanyakan langsung lewat WhatsApp atau melalui{" "}
            <Link href="/kontak/" className="text-taupe-deep underline underline-offset-4">
              halaman kontak
            </Link>
            .
          </p>
        }
      />
      <section aria-label="Daftar pertanyaan" className="section-y pt-12">
        <div className="container-page max-w-4xl">
          <FaqList items={faqs} headingLevel="h2" />
        </div>
      </section>
      <CtaBand
        title="Masih ada pertanyaan?"
        body="Kirim pertanyaan Anda beserta foto sofa atau ruangan lewat WhatsApp."
        context="general"
      />
    </>
  );
}
