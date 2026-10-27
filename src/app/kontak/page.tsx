import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { isWhatsAppConfigured } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Kontak & Konsultasi",
  description:
    "Hubungi Sofa Custom untuk konsultasi pembuatan sofa custom, servis sofa, dan ganti kain sofa. Kirim foto dan kebutuhan Anda melalui WhatsApp.",
  path: "/kontak/",
});

export default function ContactPage() {
  const { contact, address, openingHours, serviceAreas } = site;

  return (
    <>
      <PageHeader
        trail={[{ name: "Kontak", path: "/kontak/" }]}
        eyebrow="Kontak"
        title="Konsultasi sofa Anda"
        intro={
          <p>
            Cara tercepat adalah lewat WhatsApp: kirim foto sofa atau ruangan dan ceritakan kebutuhan Anda. Anda juga bisa
            mengisi formulir di bawah untuk menyusun pesan secara rapi.
          </p>
        }
        actions={isWhatsAppConfigured ? <WhatsAppButton context="general" label="Chat via WhatsApp" /> : undefined}
      />

      <section aria-labelledby="form-title" className="section-y pt-14">
        <div className="container-page grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div id="whatsapp">
            <SectionHeading
              id="form-title"
              title="Formulir konsultasi"
              intro="Isian Anda akan disusun menjadi pesan WhatsApp yang siap dikirim."
            />
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <aside aria-labelledby="info-title" className="self-start rounded-[var(--radius-card)] bg-cream p-7 sm:p-9">
            <h2 id="info-title" className="text-2xl">
              Informasi kontak
            </h2>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-taupe-deep">WhatsApp</dt>
                <dd className="mt-1.5">
                  {isWhatsAppConfigured ? (
                    <WhatsAppButton size="sm" label={contact.whatsappDisplay ?? "Chat via WhatsApp"} />
                  ) : (
                    <span className="text-ink-soft">Nomor WhatsApp akan segera tersedia di halaman ini.</span>
                  )}
                </dd>
              </div>
              {contact.email && (
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-taupe-deep">Email</dt>
                  <dd className="mt-1.5">
                    <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                      {contact.email}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-taupe-deep">Alamat workshop</dt>
                <dd className="mt-1.5 text-ink-soft">
                  {address ? (
                    <address className="not-italic text-charcoal">
                      {address.street}
                      <br />
                      {address.locality}, {address.region} {address.postalCode}
                    </address>
                  ) : (
                    "Kunjungan ke workshop dapat diatur lebih dulu melalui WhatsApp."
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-taupe-deep">Jam operasional</dt>
                {openingHours.length > 0 ? (
                  openingHours.map((h) => (
                    <dd key={h.days} className="mt-1.5">
                      {h.days}: {h.hours}
                    </dd>
                  ))
                ) : (
                  <dd className="mt-1.5 text-ink-soft">Tanyakan jadwal konsultasi atau kunjungan melalui WhatsApp.</dd>
                )}
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-taupe-deep">Wilayah layanan</dt>
                <dd className="mt-1.5 text-ink-soft">
                  {serviceAreas.length > 0 ? (
                    <span className="text-charcoal">{serviceAreas.join(", ")}</span>
                  ) : (
                    "Sebutkan kota atau kecamatan Anda saat menghubungi kami agar kami dapat memastikan jangkauan layanan."
                  )}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {address?.mapsEmbedUrl && (
          <div className="container-page mt-16">
            <iframe
              title={`Peta lokasi workshop ${site.brand}`}
              src={address.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[16/9] w-full rounded-[var(--radius-media)] border-0 md:aspect-[21/9]"
            />
          </div>
        )}
      </section>
    </>
  );
}
