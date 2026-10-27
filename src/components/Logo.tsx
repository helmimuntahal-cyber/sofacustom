import Link from "next/link";
import { site } from "@/config/site";

/** Wordmark teks; otomatis memakai file logo bila `site.logo` diisi. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const sub = tone === "dark" ? "text-ink-soft" : "text-cream";
  return (
    <Link href="/" className="group inline-flex flex-col leading-none" aria-label={`${site.brand} — beranda`}>
      {site.logo ? (
        <img src={site.logo} alt={site.brand} width={160} height={40} className="h-9 w-auto" />
      ) : (
        <>
          <span className="whitespace-nowrap font-display text-[1.45rem] font-medium tracking-tight">
            Sofa<span className="text-taupe"> · </span>Custom
          </span>
          <span className={`mt-1 whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.18em] ${sub}`}>{site.legalName}</span>
        </>
      )}
    </Link>
  );
}
