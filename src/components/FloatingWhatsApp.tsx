"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { isWhatsAppConfigured, whatsappHref } from "@/lib/whatsapp";

/**
 * Tombol WhatsApp melayang. Disembunyikan saat footer, formulir kontak, atau
 * elemen lain bertanda [data-hide-floating-wa] terlihat, agar tidak menutupi
 * konten maupun tombol lain di area tersebut.
 */
export function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setHidden(false);
  }

  // Dipasang ulang per halaman: elemen target berbeda di tiap halaman.
  useEffect(() => {
    const targets = document.querySelectorAll("#site-footer, [data-hide-floating-wa]");
    if (targets.length === 0 || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  if (!isWhatsAppConfigured) return null;

  return (
    <a
      href={whatsappHref("general")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi via WhatsApp (membuka WhatsApp di tab baru)"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex size-14 items-center justify-center gap-2 rounded-full bg-wa text-white shadow-[0_12px_30px_-10px_rgb(0_0_0/0.45)] transition-[opacity,transform] duration-300 hover:bg-wa-dark sm:right-6 md:size-auto md:min-h-13 md:px-5 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="hidden font-semibold md:inline">Chat WhatsApp</span>
    </a>
  );
}
