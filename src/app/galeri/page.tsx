import { CtaBand } from "@/components/CtaBand";
import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { isWhatsAppConfigured, whatsappHref } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Galeri Sofa Custom & Hasil Servis Sofa",
  description:
    "Galeri foto sofa custom, kolase sebelum dan sesudah servis sofa, penggantian kain dan kulit, serta pengiriman sofa. Klik foto untuk memperbesar.",
  path: "/galeri/",
  imageId: "set-sofa-kayu-klasik",
});

export default function GalleryPage() {
  // Urutan: foto model sofa lebih dulu, kolase sebelum–sesudah, lalu ilustrasi di akhir.
  const order = { own: 0, unverified: 0, illustration: 1 } as const;
  const sorted = [...images].sort((a, b) => order[a.provenance] - order[b.provenance]);

  return (
    <>
      <PageHeader
        trail={[{ name: "Galeri", path: "/galeri/" }]}
        eyebrow="Galeri"
        title="Galeri sofa dan hasil pengerjaan"
        intro={
          <p>
            Model sofa, kolase sebelum–sesudah, dan dokumentasi pengiriman. Foto bertanda <strong>Ilustrasi</strong> adalah
            gambar contoh untuk menjelaskan jenis pekerjaan, bukan dokumentasi proyek kami.
          </p>
        }
      />
      <section aria-label="Foto galeri" className="section-y pt-12">
        <div className="container-page">
          <Gallery images={sorted} filterable whatsappHref={whatsappHref("gallery")} whatsappExternal={isWhatsAppConfigured} />
        </div>
      </section>
      <CtaBand
        title="Melihat model yang Anda suka?"
        body="Kirim tangkapan layar foto tersebut lewat WhatsApp beserta ukuran ruangan Anda. Kami bantu membahas versi yang sesuai untuk ruang Anda."
        context="gallery"
        label="Tanya via WhatsApp"
      />
    </>
  );
}
