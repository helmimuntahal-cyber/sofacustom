import Link from "next/link";
import { BeforeAfterGrid } from "@/components/BeforeAfterGrid";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteImage } from "@/components/SiteImage";
import { Checklist, TopicGrid } from "@/components/TopicGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { faqsFor } from "@/data/faq";
import { getImage } from "@/data/images";
import { materials } from "@/data/materials";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = "/ganti-kain-sofa/";
const DESCRIPTION =
  "Ganti kain sofa atau kulit sintetis yang robek, pudar, dan mengelupas. Kirim foto, ukuran, dan bahan yang diinginkan via WhatsApp untuk estimasi biaya.";

export const metadata = pageMetadata({
  title: "Ganti Kain Sofa & Kulit Sintetis",
  description: DESCRIPTION,
  path: PATH,
  imageId: "sebelum-sesudah-dua-dudukan",
});

const materialTypes = [
  {
    title: "Kain",
    body: (
      <p>
        Terasa hangat dan tidak lengket di kulit, dengan pilihan tekstur yang luas. Bahan bertekstur rapat umumnya lebih tahan
        dipakai sehari-hari dibanding tenunan yang longgar.
      </p>
    ),
  },
  {
    title: "Kulit sintetis",
    body: (
      <p>
        Permukaannya mudah dilap sehingga praktis untuk ruang yang sering dipakai. Kualitasnya sangat beragam, jadi
        ketahanannya perlu dibahas saat memilih bahan.
      </p>
    ),
  },
  {
    title: "Pertimbangan memilih",
    body: (
      <ul>
        <li>Ada anak kecil atau hewan peliharaan di rumah?</li>
        <li>Apakah sofa terkena sinar matahari langsung?</li>
        <li>Seberapa sering sofa dipakai dan dibersihkan?</li>
      </ul>
    ),
  },
];

const estimateInfo = [
  "Foto sofa dari depan, samping, dan belakang",
  "Foto dekat bagian kain yang rusak",
  "Ukuran sofa: panjang, kedalaman, dan tinggi",
  "Jumlah dudukan dan bantal (jika ada)",
  "Bahan dan warna yang Anda inginkan",
  "Apakah busa juga ingin diganti",
];

export default function FabricPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Ganti Kain dan Kulit Sofa",
          serviceType: "Penggantian pelapis sofa",
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <PageHeader
        trail={[{ name: "Ganti Kain Sofa", path: PATH }]}
        eyebrow="Layanan"
        title="Ganti Kain & Kulit Sofa"
        intro={
          <p>
            Bila rangka sofa masih kokoh, pelapis baru bisa memberi tampilan yang segar tanpa harus membeli sofa baru. Kain atau
            kulit sintetis yang robek, pudar, atau mengelupas diganti dengan bahan pilihan Anda.
          </p>
        }
        actions={<WhatsAppButton context="fabric" label="Konsultasi ganti kain" />}
        imageId="sebelum-sesudah-dua-dudukan"
      />

      <section aria-labelledby="bahan-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="bahan-title"
            eyebrow="Pilihan bahan"
            title="Memilih pelapis yang cocok dengan rumah Anda"
            intro="Ketersediaan bahan dan warna dapat berubah. Pilihan yang tersedia saat ini akan kami tunjukkan saat konsultasi."
          />
          <div className="mt-14">
            <TopicGrid topics={materialTypes} columns={3} />
          </div>
        </div>
      </section>

      <section aria-labelledby="katalog-title" className="section-y bg-cream">
        <div className="container-page">
          <SectionHeading id="katalog-title" eyebrow="Katalog bahan" title="Contoh bahan yang tersedia" />
          {materials.length > 0 ? (
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {materials.map((m) => (
                <li key={m.name} className="rounded-[var(--radius-card)] bg-white p-6">
                  {m.imageId && <SiteImage image={getImage(m.imageId)} ratio="1 / 1" className="mb-5 rounded-xl" />}
                  <p className="eyebrow">{m.type === "kulit-sintetis" ? "Kulit sintetis" : m.type === "kain" ? "Kain" : "Lainnya"}</p>
                  <h3 className="mt-2 font-display text-2xl">{m.name}</h3>
                  <p className="mt-2 text-ink-soft">{m.description}</p>
                  {m.colors && m.colors.length > 0 && <p className="mt-3 text-sm">Warna: {m.colors.join(", ")}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 flex flex-col gap-6 rounded-[var(--radius-card)] border border-dashed border-charcoal/25 bg-ivory p-8 md:flex-row md:items-center md:justify-between">
              <p className="max-w-[56ch] text-lg text-ink-soft">
                Katalog bahan sedang kami siapkan untuk halaman ini. Sementara itu, minta foto contoh bahan dan warna yang tersedia
                langsung lewat WhatsApp.
              </p>
              <WhatsAppButton context="fabric" label="Minta contoh bahan" className="shrink-0" />
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="ba-kain-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="ba-kain-title"
            eyebrow="Sebelum & sesudah"
            title="Pelapis baru, sofa yang sama"
            intro={
              <p>
                Lihat lebih banyak di <Link href="/galeri/" className="text-taupe-deep underline underline-offset-4">galeri</Link>.
              </p>
            }
          />
          <div className="mt-12">
            <BeforeAfterGrid ids={["sebelum-sesudah-chaise", "sebelum-sesudah-kulit-hitam", "sebelum-sesudah-kain-hijau"]} />
          </div>
        </div>
      </section>

      <section aria-labelledby="estimasi-title" className="section-y bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            id="estimasi-title"
            eyebrow="Minta estimasi"
            title="Estimasi berdasarkan foto, ukuran, kondisi, dan bahan"
            intro={
              <p>
                Biaya ganti kain bergantung pada ukuran sofa, jumlah bahan yang dibutuhkan, jenis bahan, dan kondisi busa serta
                rangka. Bila busa atau rangka juga perlu diperbaiki, lihat{" "}
                <Link href="/servis-sofa/" className="text-taupe-deep underline underline-offset-4">
                  servis sofa
                </Link>
                .
              </p>
            }
          />
          <div className="text-lg">
            <Checklist items={estimateInfo} />
            <WhatsAppButton context="estimate" label="Minta estimasi via WhatsApp" className="mt-9" />
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-kain-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="faq-kain-title" eyebrow="FAQ" title="Pertanyaan seputar ganti kain" />
          <FaqList items={faqsFor("kain")} />
        </div>
      </section>

      <CtaBand
        title="Siap memberi sofa Anda tampilan baru?"
        body="Kirim foto sofa dan ceritakan bahan atau warna yang Anda bayangkan. Kami bantu mencocokkan dengan bahan yang tersedia."
        context="fabric"
        label="Konsultasi ganti kain"
      />
    </>
  );
}
