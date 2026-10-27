import Link from "next/link";
import { BeforeAfterGrid } from "@/components/BeforeAfterGrid";
import { CtaBand, defaultChecklist } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { Gallery } from "@/components/Gallery";
import { ArrowIcon } from "@/components/icons";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteImage } from "@/components/SiteImage";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { faqs } from "@/data/faq";
import { getImage, heroImageId } from "@/data/images";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { isWhatsAppConfigured, whatsappHref } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Jasa Pembuatan Sofa Custom & Servis Sofa | Sofa Custom",
  absoluteTitle: true,
  description:
    "Pembuatan sofa custom sesuai ukuran ruang, servis dan renovasi sofa, serta ganti kain, kulit, dan busa sofa. Kirim foto via WhatsApp untuk konsultasi.",
  path: "/",
});

const trustPoints = [
  {
    title: "Konsultasi dari foto",
    body: "Cukup kirim foto sofa atau ruangan lewat WhatsApp. Dari situ kita mulai membahas pilihan yang masuk akal.",
  },
  {
    title: "Biaya dijelaskan di depan",
    body: "Rincian pekerjaan, bahan, dan biaya disampaikan sebelum pengerjaan. Tidak ada pekerjaan yang dimulai tanpa persetujuan Anda.",
  },
  {
    title: "Jujur soal kondisi sofa",
    body: "Bila sofa lebih baik diganti daripada diperbaiki, kami sampaikan apa adanya supaya Anda bisa memutuskan dengan tenang.",
  },
];

const strengths = [
  { title: "Desain menyesuaikan ruang", body: "Ukuran, bentuk lengan, tinggi sandaran, dan kedalaman dudukan disesuaikan dengan ruangan dan kebiasaan duduk Anda." },
  { title: "Pilihan bahan sesuai ketersediaan", body: "Kain atau kulit sintetis dipilih bersama dari bahan yang tersedia, lengkap dengan pertimbangan perawatannya." },
  { title: "Konsultasi kebutuhan", body: "Kami bertanya dulu: siapa yang memakai sofa, untuk apa, dan seberapa sering — baru menyarankan bahan dan busa." },
  { title: "Biaya dijelaskan sebelum dikerjakan", body: "Penawaran memuat rincian pekerjaan. Bila ada temuan baru saat pengerjaan, Anda dikabari sebelum ada tambahan biaya." },
  { title: "Komunikasi yang jelas", body: "Satu jalur komunikasi lewat WhatsApp, dari konsultasi pertama sampai sofa diserahkan." },
];

const beforeAfterIds = ["sebelum-sesudah-chaise", "sebelum-sesudah-dua-dudukan", "sebelum-sesudah-kulit-hitam"];

// Lima foto + sel "Lihat semua foto" (prop moreHref) = enam sel grid.
const galleryPreviewIds = [
  "set-sofa-kayu-klasik",
  "set-recliner-hitam",
  "kursi-recliner",
  // Bukan "sebelum-sesudah-chesterfield": file PNG-nya 3,2 MB, terlalu berat untuk beranda.
  "pengiriman-sofa-krem",
  "pengiriman-sofa-hitam",
];
// Gambar hero, kartu layanan unggulan, dan bagian keunggulan sengaja tidak ada di daftar ini
// agar tidak ada foto yang tampil dua kali di beranda.

const homeFaqIds = ["cara-pesan-custom", "estimasi-servis", "info-whatsapp", "sofa-lama-diperbaiki", "harga"];

export default function HomePage() {
  const hero = getImage(heroImageId);
  const [featured, ...otherServices] = services;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-10 pb-16 pt-10 md:pt-14 lg:grid-cols-[1fr_1.08fr] lg:items-center lg:gap-14 lg:pb-24">
          <div className="max-w-xl">
            <p className="eyebrow">Workshop sofa · CV. Halim Cipta Kreasi</p>
            <h1 className="mt-5 text-[clamp(2.5rem,7vw,4.6rem)] leading-[1.04]">
              Jasa Pembuatan Sofa Custom dan Servis Sofa
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">
              Buat sofa yang pas dengan ukuran dan gaya ruangan Anda, atau perbarui sofa lama lewat penggantian kain,
              busa, dan perbaikan rangka. Kirim fotonya — kami bantu jelaskan pilihan dan biayanya.
            </p>
            <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <WhatsAppButton context="general" label="Konsultasi via WhatsApp" />
              <Link
                href="/galeri/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-charcoal/25 px-6 font-semibold hover:border-charcoal"
              >
                Lihat Hasil Pekerjaan
                <ArrowIcon className="size-4" />
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-[0.95rem]">
              {[
                ["Sofa baru sesuai ukuran", "/pembuatan-sofa-custom/"],
                ["Servis & renovasi", "/servis-sofa/"],
                ["Ganti kain & kulit", "/ganti-kain-sofa/"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="inline-flex items-center gap-1.5 py-1 text-taupe-deep underline-offset-4 hover:underline">
                    {label}
                    <ArrowIcon className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <SiteImage image={hero} ratio="4 / 3" priority className="rounded-[var(--radius-media)] shadow-[0_40px_80px_-40px_rgb(41_41_41/0.45)]" />
            <div aria-hidden="true" className="absolute -bottom-6 -left-6 -z-10 hidden h-2/3 w-2/3 rounded-[var(--radius-media)] bg-cream lg:block" />
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section aria-labelledby="trust-title" className="bg-cream">
        <div className="container-page py-14 md:py-20">
          <h2 id="trust-title" className="sr-only">
            Cara kami bekerja dengan Anda
          </h2>
          <ul className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-charcoal/15">
            {trustPoints.map((p) => (
              <li key={p.title} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="mt-3 text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LAYANAN */}
      <section aria-labelledby="layanan-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="layanan-title"
            eyebrow="Layanan"
            title="Dari sofa baru sampai sofa lama yang ingin dipertahankan"
            intro="Pilih titik awal yang paling dekat dengan kebutuhan Anda. Bila belum yakin, ceritakan saja kondisinya — kami bantu arahkan."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <article className="group">
              <Link href={featured.href} className="block">
                <SiteImage image={getImage(featured.imageId)} ratio="5 / 4" className="rounded-[var(--radius-media)]" />
              </Link>
              <h3 className="mt-6 text-[clamp(1.7rem,3vw,2.3rem)]">
                <Link href={featured.href} className="underline-offset-4 hover:underline">
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-[52ch] text-lg text-ink-soft">{featured.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppButton context={featured.whatsapp} label="Konsultasi sofa custom" size="sm" />
                <Link href={featured.href} className="inline-flex min-h-11 items-center gap-2 px-2 font-semibold text-taupe-deep hover:underline">
                  Pelajari prosesnya <ArrowIcon className="size-4" />
                </Link>
              </div>
            </article>

            <ul className="divide-y divide-line border-y border-line self-start">
              {otherServices.map((s, i) => (
                <li key={s.slug}>
                  <Link href={s.href} className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-6">
                    <span aria-hidden="true" className="pt-1 font-display text-lg text-taupe">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-display text-[1.45rem] leading-tight group-hover:underline group-hover:underline-offset-4">
                        {s.title}
                      </span>
                      <span className="mt-2 block text-ink-soft">{s.short}</span>
                    </span>
                    <ArrowIcon className="mt-1.5 size-5 text-taupe-deep transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SEBELUM & SESUDAH */}
      <section aria-labelledby="ba-title" className="section-y bg-white">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="ba-title"
              eyebrow="Sebelum & sesudah"
              title="Rangka yang masih kokoh layak diberi kesempatan kedua"
              intro="Penggantian pelapis dan busa bisa mengubah tampilan sofa secara menyeluruh. Berikut beberapa hasil pengerjaan kami, ditampilkan apa adanya."
            />
            <Link href="/galeri/" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-taupe-deep hover:underline">
              Semua foto di galeri <ArrowIcon className="size-4" />
            </Link>
          </div>
          <div className="mt-12">
            <BeforeAfterGrid ids={beforeAfterIds} />
          </div>
        </div>
      </section>

      {/* PROSES */}
      <section aria-labelledby="proses-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="proses-title"
            eyebrow="Proses pengerjaan"
            title="Enam langkah, tanpa kejutan di tengah jalan"
            intro="Alurnya sama untuk sofa baru maupun servis: Anda tahu apa yang dikerjakan dan berapa biayanya sebelum kami mulai."
          />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section aria-labelledby="keunggulan-title" className="section-y bg-cream">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <SiteImage image={getImage("rangka-sofa-ilustrasi")} ratio="4 / 5" className="rounded-[var(--radius-media)]" />
          <div>
            <SectionHeading id="keunggulan-title" eyebrow="Mengapa Sofa Custom" title="Yang bisa Anda harapkan dari kami" />
            <dl className="mt-10 space-y-7">
              {strengths.map((s) => (
                <div key={s.title} className="grid gap-1 sm:grid-cols-[14rem_1fr] sm:gap-8">
                  <dt className="font-semibold">{s.title}</dt>
                  <dd className="text-ink-soft">{s.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section aria-labelledby="galeri-title" className="section-y">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="galeri-title" eyebrow="Galeri" title="Model, bahan, dan hasil pengerjaan" />
            <Link href="/galeri/" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-taupe-deep hover:underline">
              Buka galeri lengkap <ArrowIcon className="size-4" />
            </Link>
          </div>
          <div className="mt-12">
            <Gallery
              images={galleryPreviewIds.map(getImage)}
              whatsappHref={whatsappHref("gallery")}
              whatsappExternal={isWhatsAppConfigured}
              moreHref="/galeri/"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="section-y bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading id="faq-title" eyebrow="FAQ" title="Pertanyaan yang sering diajukan" />
            <Link href="/faq/" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-taupe-deep hover:underline">
              Lihat semua pertanyaan <ArrowIcon className="size-4" />
            </Link>
          </div>
          <FaqList items={faqs.filter((f) => homeFaqIds.includes(f.id))} />
        </div>
      </section>

      <CtaBand
        title="Ceritakan sofa yang Anda bayangkan"
        body="Kirim foto sofa atau ruangan Anda lewat WhatsApp. Kami bantu jelaskan pilihan pengerjaan, bahan, dan perkiraan biayanya."
        checklist={defaultChecklist}
      />
    </>
  );
}
