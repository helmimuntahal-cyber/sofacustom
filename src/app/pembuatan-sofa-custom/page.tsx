import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteImage } from "@/components/SiteImage";
import { Checklist, TopicGrid } from "@/components/TopicGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { faqsFor } from "@/data/faq";
import { getImage } from "@/data/images";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = "/pembuatan-sofa-custom/";
const DESCRIPTION =
  "Jasa pembuatan sofa custom: model, ukuran, bahan kain atau kulit, warna, dan busa disesuaikan dengan ruang Anda. Konsultasi dan penawaran via WhatsApp.";

export const metadata = pageMetadata({
  title: "Jasa Pembuatan Sofa Custom Sesuai Ukuran & Desain",
  description: DESCRIPTION,
  path: PATH,
  imageId: "sofa-hitam-tiga-dudukan",
});

const customizable = [
  {
    title: "Desain dan model",
    body: (
      <p>
        Kirimkan foto referensi dari mana saja — katalog, media sosial, atau sofa yang pernah Anda lihat. Bersama-sama kita
        tentukan bentuk lengan, sandaran, kaki, dan detail jahitan yang cocok dengan ruangan Anda.
      </p>
    ),
  },
  {
    title: "Ukuran yang pas",
    body: (
      <>
        <p>Sofa custom dibuat mengikuti ruang, bukan sebaliknya. Yang biasanya kami tanyakan:</p>
        <ul>
          <li>Panjang dinding atau area tempat sofa akan diletakkan</li>
          <li>Kedalaman dudukan yang nyaman untuk Anda</li>
          <li>Tinggi sandaran dan tinggi dudukan dari lantai</li>
          <li>Lebar pintu dan jalur masuk, agar sofa bisa dibawa masuk</li>
        </ul>
      </>
    ),
  },
  {
    title: "Kain atau kulit",
    body: (
      <p>
        Bahan pelapis dipilih dari yang tersedia saat pemesanan. Kami jelaskan perbedaan karakter tiap bahan — misalnya
        mana yang lebih mudah dibersihkan atau lebih cocok untuk rumah dengan anak dan hewan peliharaan. Lihat juga{" "}
        <Link href="/ganti-kain-sofa/">pilihan bahan di halaman ganti kain sofa</Link>.
      </p>
    ),
  },
  {
    title: "Warna",
    body: (
      <p>
        Warna sebaiknya dilihat langsung pada contoh bahan, karena tampilan di layar ponsel sering berbeda dengan aslinya.
        Ceritakan warna dinding, lantai, dan perabot di sekitarnya agar pilihannya selaras.
      </p>
    ),
  },
  {
    title: "Busa sesuai cara pakai",
    body: (
      <p>
        Busa yang lebih padat terasa kokoh dan cocok untuk duduk tegak atau ruang tamu yang sering dipakai; busa yang lebih
        lembut terasa santai untuk ruang keluarga. Pilihannya kita tentukan dari cara sofa akan dipakai sehari-hari.
      </p>
    ),
  },
  {
    title: "Rangka sebagai fondasi",
    body: (
      <p>
        Bentuk akhir sebuah sofa ditentukan oleh rangkanya. Model dengan lengkungan, sudut, atau dudukan lebar memerlukan
        rangka yang dirancang khusus, dan hal ini ikut kami bahas saat konsultasi.
      </p>
    ),
  },
];

const orderSteps = [
  { title: "Kirim referensi & ukuran", body: "Lewat WhatsApp, kirim foto ruangan, ukuran area, dan referensi model yang Anda suka." },
  { title: "Diskusi detail", body: "Kita bahas ukuran, bahan, warna, dan busa sampai rancangannya jelas." },
  { title: "Penawaran tertulis", body: "Anda menerima rincian spesifikasi dan biaya untuk dipertimbangkan." },
  { title: "Persetujuan", body: "Pembuatan dimulai setelah Anda menyetujui spesifikasi dan penawaran." },
  { title: "Pembuatan", body: "Sofa dibuat sesuai spesifikasi yang disepakati. Bila ada hal yang perlu dikonfirmasi, kami tanyakan dulu." },
  { title: "Pemeriksaan & serah terima", body: "Hasil diperiksa sebelum diserahkan, lalu dikirim atau diambil sesuai kesepakatan." },
];

const prepare = [
  "Foto ruangan tempat sofa akan diletakkan",
  "Ukuran area: panjang dinding dan ruang gerak di depannya",
  "Foto referensi model yang Anda suka",
  "Perkiraan jumlah dudukan atau bentuk (lurus, L, U, lengkung)",
  "Preferensi bahan dan warna, bila sudah ada",
  "Lokasi pengiriman (kota/kecamatan)",
];

export default function CustomSofaPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Pembuatan Sofa Custom",
          serviceType: "Pembuatan sofa custom",
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <PageHeader
        trail={[{ name: "Pembuatan Sofa Custom", path: PATH }]}
        eyebrow="Layanan"
        title="Jasa Pembuatan Sofa Custom"
        intro={
          <p>
            Sofa yang dibuat untuk ruangan Anda: ukurannya pas, modelnya sesuai selera, dan bahannya dipilih dengan
            mempertimbangkan cara sofa itu akan dipakai setiap hari.
          </p>
        }
        actions={
          <>
            <WhatsAppButton context="custom" label="Konsultasi sofa custom" />
            <Link
              href="/galeri/"
              className="inline-flex min-h-12 items-center rounded-full border border-charcoal/25 px-6 font-semibold hover:border-charcoal"
            >
              Lihat galeri
            </Link>
          </>
        }
        imageId="sofa-hitam-tiga-dudukan"
      />

      <section aria-labelledby="sesuaikan-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="sesuaikan-title"
            eyebrow="Apa yang bisa disesuaikan"
            title="Setiap bagian sofa bisa dibicarakan"
            intro="Kami tidak memasang katalog model dan daftar harga tetap, karena setiap sofa custom dimulai dari ruang dan kebutuhan yang berbeda."
          />
          <div className="mt-14">
            <TopicGrid topics={customizable} columns={3} />
          </div>
        </div>
      </section>

      <section aria-label="Contoh model sofa" className="pb-4">
        {/* Mobile: foto lebar di atas, dua foto tegak di bawah. Desktop: tiga kolom sejajar. */}
        <div className="container-page grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-[1fr_1.4fr_1fr]">
          <figure>
            <SiteImage image={getImage("set-sofa-kayu-klasik")} ratio="3 / 4" className="rounded-[var(--radius-card)]" />
            <figcaption className="mt-2.5 text-sm text-ink-soft">{getImage("set-sofa-kayu-klasik").caption}</figcaption>
          </figure>
          <figure className="col-span-2 row-start-1 lg:col-span-1 lg:row-start-auto">
            <SiteImage
              image={getImage("sofa-lengkung-abu")}
              ratio={null}
              className="aspect-[4/3] rounded-[var(--radius-card)] lg:aspect-[21/20]"
            />
            <figcaption className="mt-2.5 text-sm text-ink-soft">{getImage("sofa-lengkung-abu").caption}</figcaption>
          </figure>
          <figure>
            <SiteImage image={getImage("rangka-sofa-ilustrasi")} ratio="3 / 4" className="rounded-[var(--radius-card)]" />
            <figcaption className="mt-2.5 text-sm text-ink-soft">{getImage("rangka-sofa-ilustrasi").caption}</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="pesan-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="pesan-title"
            eyebrow="Proses pemesanan"
            title="Cara memesan sofa custom"
            intro="Pembuatan baru dimulai setelah spesifikasi dan biaya disetujui."
          />
          <div className="mt-14">
            <ProcessSteps steps={orderSteps} />
          </div>
        </div>
      </section>

      <section aria-labelledby="siapkan-title" className="section-y bg-cream">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            id="siapkan-title"
            eyebrow="Sebelum konsultasi"
            title="Informasi yang membantu kami memahami kebutuhan Anda"
            intro="Tidak harus lengkap. Kirim yang sudah ada, sisanya bisa kita lengkapi bersama saat berdiskusi."
          />
          <div className="text-lg">
            <Checklist items={prepare} />
            <WhatsAppButton context="custom" label="Kirim informasi via WhatsApp" className="mt-9" />
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-custom-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="faq-custom-title" eyebrow="FAQ" title="Pertanyaan seputar pembuatan sofa" />
          <FaqList items={faqsFor("custom")} />
        </div>
      </section>

      <CtaBand
        title="Mulai dari foto ruangan Anda"
        body={
          <p>
            Punya sofa lama yang ingin dipertahankan? Lihat juga{" "}
            <Link href="/servis-sofa/" className="underline underline-offset-4">
              layanan servis sofa
            </Link>
            .
          </p>
        }
        context="custom"
        label="Konsultasi sofa custom"
      />
    </>
  );
}
