import Link from "next/link";
import { BeforeAfterGrid } from "@/components/BeforeAfterGrid";
import { CtaBand, defaultChecklist } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteImage } from "@/components/SiteImage";
import { TopicGrid, type Topic } from "@/components/TopicGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";
import { faqsFor } from "@/data/faq";
import { getImage } from "@/data/images";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = "/servis-sofa/";
const DESCRIPTION =
  "Servis dan renovasi sofa: perbaikan sofa ambles, ganti busa kempis, ganti kain atau kulit sintetis, dan perbaikan rangka. Kirim foto via WhatsApp untuk estimasi.";

export const metadata = pageMetadata({
  title: "Jasa Servis Sofa, Reparasi & Renovasi Sofa Lama",
  description: DESCRIPTION,
  path: PATH,
  imageId: "sebelum-sesudah-chaise",
});

const problems: Topic[] = [
  {
    id: "ambles",
    title: "Sofa ambles",
    body: (
      <p>
        Dudukan yang turun atau terasa “jatuh” bisa disebabkan busa yang sudah lelah, penyangga dudukan (per atau webbing)
        yang kendur, atau rangka yang bermasalah. Penyebabnya perlu dipastikan dulu, karena perbaikannya berbeda.
      </p>
    ),
  },
  {
    id: "busa-kempis",
    title: "Busa sofa kempis",
    body: (
      <p>
        Busa yang kempis membuat sofa tidak nyaman dan tampak kusut. Busa dapat diganti dengan kepadatan yang dipilih sesuai
        cara sofa dipakai — duduk tegak, bersantai, atau dipakai banyak orang setiap hari.
      </p>
    ),
  },
  {
    id: "kain-robek",
    title: "Kain robek atau usang",
    body: (
      <p>
        Kain yang robek, berbulu, pudar, atau bernoda permanen dapat diganti seluruhnya. Selengkapnya ada di halaman{" "}
        <Link href="/ganti-kain-sofa/">ganti kain sofa</Link>.
      </p>
    ),
  },
  {
    id: "kulit-sintetis",
    title: "Penggantian kulit sintetis",
    body: (
      <p>
        Kulit sintetis yang retak dan mengelupas tidak bisa “ditambal” dengan rapi dalam jangka panjang. Solusi yang umum
        adalah mengganti pelapisnya dengan bahan baru, baik pada bagian dudukan saja maupun seluruh sofa.
      </p>
    ),
  },
  {
    id: "rangka",
    title: "Perbaikan rangka",
    body: (
      <p>
        Sofa yang goyang, berbunyi, atau patah biasanya bermasalah di rangka atau sambungannya. Kondisi rangka baru terlihat
        jelas setelah pelapis dibuka, sehingga perkiraan awal dari foto bisa berubah setelah pemeriksaan.
      </p>
    ),
  },
  {
    id: "renovasi",
    title: "Renovasi sofa lama",
    body: (
      <p>
        Untuk sofa yang rangkanya masih kokoh — termasuk sofa kayu berukir — renovasi menyeluruh bisa mencakup busa baru,
        pelapis baru, dan perbaikan tampilan kayu sesuai kesepakatan.
      </p>
    ),
  },
];

if (site.offersElectricSofaService) {
  problems.push({
    id: "recliner",
    title: "Sofa elektrik & recliner",
    body: <p>Pelapis dan mekanisme sofa atau kursi recliner diperiksa terlebih dahulu sebelum diputuskan pekerjaannya.</p>,
  });
}

export default function ServicePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Servis dan Renovasi Sofa",
          serviceType: "Servis sofa",
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <PageHeader
        trail={[{ name: "Servis Sofa", path: PATH }]}
        eyebrow="Layanan"
        title="Jasa Servis & Renovasi Sofa"
        intro={
          <p>
            Sofa ambles, busa kempis, pelapis robek, atau rangka goyang — banyak sofa lama masih bisa dipakai lagi dengan nyaman.
            Kirim fotonya, kami bantu menilai pekerjaan apa yang masuk akal untuk kondisi tersebut.
          </p>
        }
        actions={<WhatsAppButton context="service" label="Kirim foto sofa via WhatsApp" />}
        imageId="sebelum-sesudah-chaise"
      />

      <section aria-labelledby="masalah-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="masalah-title"
            eyebrow="Masalah yang sering ditangani"
            title="Kenali keluhan sofa Anda"
            intro="Tidak semua kerusakan dapat atau layak diperbaiki. Kepastiannya baru bisa disampaikan setelah kondisi sofa diperiksa."
          />
          <div className="mt-14">
            <TopicGrid topics={problems} columns={3} />
          </div>
        </div>
      </section>

      <section aria-labelledby="penilaian-title" className="section-y bg-cream">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading id="penilaian-title" eyebrow="Penilaian & estimasi" title="Bagaimana biaya servis ditentukan" />
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="font-sans text-lg font-semibold tracking-normal">1. Penilaian dari foto</h3>
                <p className="mt-2 text-ink-soft">
                  Foto dari beberapa sisi membantu kami memperkirakan jenis pekerjaan: ganti pelapis, ganti busa, perbaikan
                  rangka, atau kombinasinya.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-lg font-semibold tracking-normal">2. Estimasi awal</h3>
                <p className="mt-2 text-ink-soft">
                  Biaya dipengaruhi ukuran sofa, jumlah dudukan, bahan yang dipilih, dan tingkat kerusakan. Estimasi dari foto
                  bersifat awal.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-lg font-semibold tracking-normal">3. Konfirmasi sebelum dikerjakan</h3>
                <p className="mt-2 text-ink-soft">
                  Bila setelah pelapis dibuka ditemukan kerusakan lain, kami kabari dan jelaskan dulu. Pekerjaan tambahan
                  hanya dilakukan dengan persetujuan Anda.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-lg font-semibold tracking-normal">4. Pengambilan & pengiriman</h3>
                <p className="mt-2 text-ink-soft">
                  {site.policies.pickupDelivery ??
                    "Ketentuan pengambilan dan pengantaran sofa, termasuk biayanya bila ada, dibicarakan dan disepakati saat penawaran sesuai lokasi Anda."}
                </p>
              </div>
            </div>
            <WhatsAppButton context="estimate" label="Minta estimasi biaya" className="mt-10" />
          </div>
          <SiteImage image={getImage("pengiriman-sofa-hitam")} ratio="4 / 5" className="rounded-[var(--radius-media)]" />
        </div>
      </section>

      <section aria-labelledby="hasil-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="hasil-title"
            eyebrow="Sebelum & sesudah"
            title="Hasil servis dari workshop kami"
            intro={
              <p>
                Kolase sebelum–sesudah dari pekerjaan kami, ditampilkan apa adanya. Foto lainnya ada di <Link href="/galeri/" className="text-taupe-deep underline underline-offset-4">galeri</Link>.
              </p>
            }
          />
          <div className="mt-12">
            <BeforeAfterGrid
              ids={["sebelum-sesudah-chesterfield", "sebelum-sesudah-kulit-hitam", "sebelum-sesudah-dua-dudukan"]}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-servis-title" className="section-y bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="faq-servis-title" eyebrow="FAQ" title="Pertanyaan seputar servis sofa" />
          <FaqList items={faqsFor("servis")} />
        </div>
      </section>

      <CtaBand
        title="Kirim foto sofa Anda untuk estimasi"
        body={
          <p>
            Ingin sofa baru sekalian? Lihat{" "}
            <Link href="/pembuatan-sofa-custom/" className="underline underline-offset-4">
              pembuatan sofa custom
            </Link>
            .
          </p>
        }
        context="estimate"
        label="Minta estimasi via WhatsApp"
        checklist={defaultChecklist}
      />
    </>
  );
}
