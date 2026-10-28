import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { buildWhatsAppUrl, isWhatsAppConfigured, whatsappHref, type WhatsAppContext } from "@/lib/whatsapp";

const variants = {
  primary: "bg-charcoal text-ivory hover:bg-black",
  whatsapp: "bg-wa text-white hover:bg-wa-dark",
  outline: "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-white/60",
  light: "bg-ivory text-charcoal hover:bg-white",
} as const;

const sizes = {
  md: "min-h-12 px-6 text-[0.975rem]",
  sm: "min-h-11 px-4 text-sm",
} as const;

interface Props {
  context?: WhatsAppContext;
  /** Pesan pembuka khusus; bila diisi menggantikan pesan bawaan `context`. */
  message?: string;
  label?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  showIcon?: boolean;
}

/**
 * Tombol CTA WhatsApp. Bila nomor bisnis belum dikonfigurasi, tombol tetap
 * berfungsi dengan mengarah ke halaman /kontak/ (bukan tombol tanpa tujuan).
 */
export function WhatsAppButton({
  context = "general",
  message,
  label = "Konsultasi via WhatsApp",
  variant = "whatsapp",
  size = "md",
  className = "",
  showIcon = true,
}: Props) {
  const classes = `inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`;
  const href = message ? (buildWhatsAppUrl(message) ?? "/kontak/") : whatsappHref(context);
  const content = (
    <>
      {showIcon && <WhatsAppIcon className="size-5 shrink-0" />}
      <span>{label}</span>
    </>
  );

  if (!isWhatsAppConfigured) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (membuka WhatsApp di tab baru)`}
      data-wa-context={context}
    >
      {content}
    </a>
  );
}
