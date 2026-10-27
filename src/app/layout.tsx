import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

// Font di-host sendiri oleh Next.js saat build (tidak ada request ke Google saat runtime).
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const heading = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Jasa Pembuatan Sofa Custom & Servis Sofa | ${site.brand}`,
    template: `%s | ${site.brand}`,
  },
  description:
    "Sofa Custom (CV. Halim Cipta Kreasi): pembuatan sofa custom, servis dan renovasi sofa, serta ganti kain, kulit, dan busa sofa. Konsultasi lewat WhatsApp.",
  applicationName: site.brand,
  authors: [{ name: site.legalName }],
  formatDetection: { telephone: false, email: false, address: false },
  robots: site.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${body.variable} ${heading.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#konten"
          className="sr-only z-[60] rounded-full bg-charcoal px-5 py-3 font-semibold text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Langsung ke konten
        </a>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main id="konten" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
