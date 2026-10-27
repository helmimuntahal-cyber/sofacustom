"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { mainNav, serviceNav } from "@/data/navigation";
import { whatsappHref, isWhatsAppConfigured } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname === href.replace(/\/$/, "");
}

/** Navigasi utama: dropdown layanan (desktop) dan panel menu (mobile). */
export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesId = useId();
  const mobileId = useId();

  // Tutup semua menu saat pindah halaman (penyesuaian state saat render,
  // bukan di dalam effect, sesuai rekomendasi React).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setServicesOpen(false);
    setMobileOpen(false);
  }

  // Dropdown: tutup dengan Escape atau klik di luar.
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  // Panel mobile: kunci scroll halaman dan tutup dengan Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const serviceActive = serviceNav.some((l) => isActive(pathname, l.href));
  const linkBase = "rounded-full px-3.5 py-2 text-[0.95rem] transition-colors hover:bg-cream";

  return (
    <>
      {/* Desktop */}
      <nav aria-label="Navigasi utama" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          <li
            ref={dropdownRef}
            className="relative"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
            }}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls={servicesId}
              onClick={() => setServicesOpen((v) => !v)}
              className={`${linkBase} inline-flex items-center gap-1 ${serviceActive ? "font-semibold" : ""}`}
            >
              Layanan
              <ChevronIcon className={`size-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <ul
              id={servicesId}
              hidden={!servicesOpen}
              className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-[0_18px_40px_-20px_rgb(41_41_41/0.35)]"
            >
              {serviceNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className="block rounded-xl px-4 py-3 text-[0.95rem] hover:bg-ivory aria-[current=page]:font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {mainNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`${linkBase} aria-[current=page]:font-semibold`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile */}
      <button
        ref={menuButtonRef}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full border border-charcoal/20 lg:hidden"
        aria-expanded={mobileOpen}
        aria-controls={mobileId}
        aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      <div
        id={mobileId}
        hidden={!mobileOpen}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-ivory lg:hidden"
      >
        <nav aria-label="Navigasi mobile" className="container-page flex min-h-full flex-col pb-10 pt-6">
          <p className="eyebrow mb-3">Layanan</p>
          <ul className="border-b border-line pb-5">
            {serviceNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className="block py-2.5 font-display text-2xl aria-[current=page]:text-taupe-deep"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="pt-5">
            <li>
              <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className="block py-2.5 text-lg aria-[current=page]:font-semibold">
                Beranda
              </Link>
            </li>
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className="block py-2.5 text-lg aria-[current=page]:font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <a
              href={whatsappHref("general")}
              {...(isWhatsAppConfigured ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-wa px-6 font-semibold text-white"
            >
              <WhatsAppIcon className="size-5" />
              Konsultasi via WhatsApp
            </a>
            <p className="mt-3 text-center text-sm text-ink-soft">Kirim foto sofa atau ruangan Anda untuk memulai.</p>
          </div>
        </nav>
      </div>
    </>
  );
}
