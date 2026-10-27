import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteImage } from "@/components/SiteImage";
import { site } from "@/config/site";
import { getImage } from "@/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tentang Kami",
  description:
    "Sofa Custom adalah merek dari CV. Halim Cipta Kreasi yang menerima pembuatan sofa custom, servis sofa, serta penggantian kain, kulit, dan busa sofa.",
  path: "/tentang-kami/",
  imageId: "set-sofa-kayu-klasik",
});

const principles = [
  {
    title: "Mendengar dulu",
    body: "Sofa dipakai bertahun-tahun. Karena itu kami mulai dari pertanyaan: siapa yang memakai, untuk apa, dan di ruang seperti apa.",
  },
  {
    title: "Terbuka soal biaya",
    body: "Rincian pekerjaan dan biaya disampaikan sebelum dikerjakan, dan setiap perubahan dibicarakan lebih dulu.",
  },
  {
    title: "Jujur soal kondisi",
    body: "Bila sebuah sofa lebih masuk akal diganti daripada diperbaiki, kami sampaikan apa adanya.",
  },
];

export default function AboutPage() {
  const { profile, legalName, brand } = site;

  return (
    <>
      <PageHeader
        trail={[{ name: "Tentang Kami", path: "/tentang-kami/" }]}
        eyebrow="Tentang kami"
        title={`${brand} — ${legalName}`}
        intro={
          <p>
            {brand} adalah merek dari {legalName} untuk layanan pembuatan sofa custom, servis dan renovasi sofa, serta
            penggantian kain, kulit, dan busa sofa.
          </p>
        }
        imageId="set-sofa-kayu-klasik"
      />

      <section aria-labelledby="cerita-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading id="cerita-title" eyebrow="Siapa kami" title="Workshop sofa yang bekerja dari kebutuhan Anda" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              {profile.story ? (
                profile.story.split("\n\n").map((para) => <p key={para.slice(0, 32)}>{para}</p>)
              ) : (
                <>
                  <p>
                    Kami membantu dua kebutuhan yang paling sering muncul: membuat sofa baru yang benar-benar pas dengan ruang,
                    dan menghidupkan kembali sofa lama yang rangkanya masih layak dipertahankan.
                  </p>
                  <p>
                    Setiap pekerjaan dimulai dari konsultasi. Anda mengirim foto dan ukuran, kami menjelaskan pilihan
                    pengerjaan dan biayanya, lalu pekerjaan dimulai setelah Anda setuju.
                  </p>
                </>
              )}
            </div>
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-ink-soft">Nama perusahaan</dt>
                <dd className="mt-1 font-semibold">{legalName}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Merek</dt>
                <dd className="mt-1 font-semibold">{brand}</dd>
              </div>
              {profile.foundedYear && (
                <div>
                  <dt className="text-sm text-ink-soft">Berdiri sejak</dt>
                  <dd className="mt-1 font-semibold">{profile.foundedYear}</dd>
                </div>
              )}
              {site.address && (
                <div>
                  <dt className="text-sm text-ink-soft">Workshop</dt>
                  <dd className="mt-1 font-semibold">
                    {site.address.locality}, {site.address.region}
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <SiteImage image={getImage("pengiriman-sofa-krem")} ratio="4 / 5" className="rounded-[var(--radius-media)]" />
        </div>
      </section>

      <section aria-labelledby="prinsip-title" className="section-y bg-cream">
        <div className="container-page">
          <SectionHeading id="prinsip-title" eyebrow="Cara kami bekerja" title="Tiga hal yang kami pegang" />
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title} className="border-t border-charcoal/15 pt-6">
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="mt-3 text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-lg">
            Lihat layanan kami:{" "}
            <Link href="/pembuatan-sofa-custom/" className="text-taupe-deep underline underline-offset-4">
              pembuatan sofa custom
            </Link>
            ,{" "}
            <Link href="/servis-sofa/" className="text-taupe-deep underline underline-offset-4">
              servis sofa
            </Link>
            , dan{" "}
            <Link href="/ganti-kain-sofa/" className="text-taupe-deep underline underline-offset-4">
              ganti kain sofa
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="Ada sofa yang ingin dibicarakan?"
        body="Ceritakan kebutuhan Anda lewat WhatsApp. Kami senang membantu, bahkan bila Anda baru sekadar membandingkan pilihan."
      />
    </>
  );
}
