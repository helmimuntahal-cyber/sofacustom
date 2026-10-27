import { Logo } from "@/components/Logo";
import { SiteNav } from "@/components/SiteNav";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function Header() {
  return (
    // Latar solid (tanpa backdrop-filter): backdrop-filter membuat panel menu
    // mobile yang `position: fixed` ikut terkunci di dalam header.
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ivory">
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Logo />
        <div className="flex items-center gap-2 lg:gap-6">
          <SiteNav />
          {/* Dibungkus: kelas display di dalam tombol akan menimpa `hidden`. Di mobile, CTA ada di menu & tombol melayang. */}
          <div className="hidden sm:block">
            <WhatsAppButton size="sm" label="Konsultasi" />
          </div>
        </div>
      </div>
    </header>
  );
}
