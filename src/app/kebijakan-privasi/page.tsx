import { PageHeader } from "@/components/PageHeader";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kebijakan Privasi",
  description: `Bagaimana situs ${site.brand} menangani informasi yang Anda isi di formulir dan kirim melalui WhatsApp.`,
  path: "/kebijakan-privasi/",
});

/*
 * Isi halaman ini menggambarkan perilaku situs SAAT INI (tanpa server,
 * tanpa analitik, tanpa cookie). Bila nanti menambahkan analitik, pixel
 * iklan, atau backend formulir, halaman ini WAJIB diperbarui.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Kebijakan Privasi", path: "/kebijakan-privasi/" }]}
        title="Kebijakan Privasi"
        intro={<p>Penjelasan singkat tentang informasi apa yang diproses situs ini dan ke mana informasi itu dikirim.</p>}
      />
      <section className="section-y pt-12">
        <div className="container-page max-w-3xl prose-sofa text-lg leading-relaxed text-ink-soft">
          <h2 className="font-display text-3xl text-charcoal">Formulir konsultasi</h2>
          <p>
            Formulir di halaman kontak tidak mengirim atau menyimpan data ke server kami. Isian Anda disusun di browser menjadi
            pesan WhatsApp. Pesan baru terkirim ke {site.legalName} setelah Anda menekan tombol kirim di aplikasi WhatsApp.
          </p>
          <h2 className="font-display text-3xl text-charcoal">Percakapan WhatsApp</h2>
          <p>
            Informasi yang Anda kirim lewat WhatsApp (misalnya nama, lokasi, dan foto sofa) kami gunakan untuk menjawab
            pertanyaan dan menyiapkan penawaran. Penggunaan WhatsApp juga tunduk pada kebijakan privasi WhatsApp.
          </p>
          <h2 className="font-display text-3xl text-charcoal">Cookie dan analitik</h2>
          <p>Situs ini tidak memasang cookie pelacak maupun alat analitik.</p>
          <h2 className="font-display text-3xl text-charcoal">Gambar</h2>
          <p>
            Foto di situs ini dimuat dari server penyimpanan gambar yang terpisah. Seperti halnya memuat halaman web biasa,
            server tersebut menerima informasi teknis standar dari browser Anda, misalnya alamat IP.
          </p>
          <h2 className="font-display text-3xl text-charcoal">Pertanyaan</h2>
          <p>Bila ada pertanyaan tentang privasi, silakan hubungi kami melalui halaman kontak.</p>
        </div>
      </section>
    </>
  );
}
