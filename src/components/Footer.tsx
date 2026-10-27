import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "@/components/Logo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { mainNav, serviceNav } from "@/data/navigation";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact, address, openingHours, serviceAreas } = site;

  return (
    <footer id="site-footer" className="bg-charcoal text-cream">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
        <div className="text-ivory">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-cream">
            Pembuatan sofa custom, servis, dan penggantian pelapis sofa. Konsultasi dimulai dari foto dan ukuran yang Anda kirim.
          </p>
          <WhatsAppButton variant="light" size="sm" className="mt-6" />
        </div>

        <nav aria-label="Layanan">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white">Layanan</h2>
          <ul className="mt-4 space-y-1">
            {serviceNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1.5 hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Halaman">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white">Halaman</h2>
          <ul className="mt-4 space-y-1">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1.5 hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/kebijakan-privasi/" className="inline-block py-1.5 hover:text-white hover:underline">
                Kebijakan Privasi
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white">Kontak</h2>
          <dl className="mt-4 space-y-4 text-[0.95rem]">
            {contact.whatsappDisplay && (
              <div>
                <dt className="text-cream/80">WhatsApp</dt>
                <dd className="text-white">{contact.whatsappDisplay}</dd>
              </div>
            )}
            {contact.email && (
              <div>
                <dt className="text-cream/80">Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="text-white hover:underline">
                    {contact.email}
                  </a>
                </dd>
              </div>
            )}
            {address && (
              <div>
                <dt className="text-cream/80">Workshop</dt>
                <dd className="text-white">
                  {address.street}, {address.locality}, {address.region} {address.postalCode}
                </dd>
              </div>
            )}
            {openingHours.length > 0 && (
              <div>
                <dt className="text-cream/80">Jam operasional</dt>
                {openingHours.map((h) => (
                  <dd key={h.days} className="text-white">
                    {h.days}: {h.hours}
                  </dd>
                ))}
              </div>
            )}
            {serviceAreas.length > 0 && (
              <div>
                <dt className="text-cream/80">Wilayah layanan</dt>
                <dd className="text-white">{serviceAreas.join(", ")}</dd>
              </div>
            )}
          </dl>
          {!contact.email && !address && openingHours.length === 0 && (
            <p className="mt-4 text-[0.95rem] text-cream">
              Informasi lokasi, wilayah layanan, dan jadwal dapat ditanyakan langsung melalui WhatsApp.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-cream/85 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {site.brand} adalah merek dari {site.legalName}.
          </p>
          <p>Bahasa Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
