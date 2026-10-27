"use client";

import { useId, useState, type FormEvent } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Formulir konsultasi. TIDAK ada server/email di belakangnya: setelah
 * divalidasi, isi formulir disusun menjadi pesan WhatsApp dan dibuka di
 * WhatsApp pengguna. Pesan baru terkirim setelah pengguna menekan "Kirim"
 * di WhatsApp — UI menyampaikan hal itu apa adanya.
 */

const serviceOptions = [
  "Pembuatan sofa custom",
  "Servis / renovasi sofa",
  "Ganti kain atau kulit sofa",
  "Ganti busa sofa",
  "Perbaikan rangka sofa",
  "Belum yakin, ingin konsultasi",
] as const;

type Field = "name" | "service" | "location" | "size" | "message";
type Errors = Partial<Record<Field, string>>;

function validate(data: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (data.name.length < 2) errors.name = "Isi nama Anda (minimal 2 huruf).";
  else if (data.name.length > 80) errors.name = "Nama terlalu panjang (maksimal 80 karakter).";
  if (!serviceOptions.includes(data.service as (typeof serviceOptions)[number])) errors.service = "Pilih jenis layanan.";
  if (data.location.length < 2) errors.location = "Isi kota atau kecamatan Anda.";
  else if (data.location.length > 80) errors.location = "Lokasi terlalu panjang (maksimal 80 karakter).";
  if (data.size.length > 120) errors.size = "Ukuran terlalu panjang (maksimal 120 karakter).";
  if (data.message.length < 10) errors.message = "Ceritakan kebutuhan Anda (minimal 10 karakter).";
  else if (data.message.length > 1000) errors.message = "Pesan terlalu panjang (maksimal 1.000 karakter).";
  return errors;
}

const fieldOrder: Field[] = ["name", "service", "location", "size", "message"];

export function ContactForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opened" | "unavailable">("idle");

  const fid = (f: Field) => `${id}-${f}`;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fieldOrder.map((f) => [f, String(fd.get(f) ?? "").trim()])) as Record<Field, string>;
    const found = validate(data);
    setErrors(found);

    const firstInvalid = fieldOrder.find((f) => found[f]);
    if (firstInvalid) {
      setStatus("idle");
      document.getElementById(fid(firstInvalid))?.focus();
      return;
    }

    const lines = [
      "Halo Sofa Custom, saya ingin berkonsultasi.",
      "",
      `Nama: ${data.name}`,
      `Layanan: ${data.service}`,
      `Lokasi: ${data.location}`,
      data.size ? `Ukuran: ${data.size}` : null,
      `Kebutuhan: ${data.message}`,
      "",
      "Saya akan mengirimkan foto sofa/ruangan setelah ini.",
    ].filter((l): l is string => l !== null);

    const url = buildWhatsAppUrl(lines.join("\n"));
    if (!url) {
      setStatus("unavailable");
      return;
    }
    // Tanpa fitur "noopener" di argumen ketiga: dengan itu window.open selalu
    // mengembalikan null, sehingga pop-up yang diblokir tidak bisa dideteksi.
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url; // pop-up diblokir → buka di tab yang sama
    setStatus("opened");
  }

  const inputBase =
    "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-charcoal placeholder:text-ink-soft/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal";
  const border = (f: Field) => (errors[f] ? "border-danger" : "border-line");
  const describe = (f: Field, hint?: boolean) =>
    [errors[f] ? `${fid(f)}-error` : null, hint ? `${fid(f)}-hint` : null].filter(Boolean).join(" ") || undefined;

  const errorCount = Object.keys(errors).length;

  return (
    <form noValidate onSubmit={onSubmit} data-hide-floating-wa className="space-y-6" aria-describedby={`${id}-note`}>
      {errorCount > 0 && (
        <div role="alert" className="rounded-xl border border-danger/40 bg-white px-4 py-3 text-[0.95rem] text-danger">
          Mohon periksa {errorCount} isian yang ditandai di bawah.
        </div>
      )}

      <div>
        <label htmlFor={fid("name")} className="font-semibold">
          Nama
        </label>
        <input
          id={fid("name")}
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={80}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describe("name")}
          className={`${inputBase} ${border("name")}`}
        />
        {errors.name && (
          <p id={`${fid("name")}-error`} className="mt-1.5 text-sm text-danger">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={fid("service")} className="font-semibold">
          Jenis layanan
        </label>
        <select
          id={fid("service")}
          name="service"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.service)}
          aria-describedby={describe("service")}
          className={`${inputBase} ${border("service")} min-h-12`}
        >
          <option value="" disabled>
            Pilih layanan
          </option>
          {serviceOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id={`${fid("service")}-error`} className="mt-1.5 text-sm text-danger">
            {errors.service}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={fid("location")} className="font-semibold">
            Kota / kecamatan
          </label>
          <input
            id={fid("location")}
            name="location"
            type="text"
            autoComplete="address-level2"
            required
            maxLength={80}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={describe("location")}
            className={`${inputBase} ${border("location")}`}
          />
          {errors.location && (
            <p id={`${fid("location")}-error`} className="mt-1.5 text-sm text-danger">
              {errors.location}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={fid("size")} className="font-semibold">
            Perkiraan ukuran <span className="font-normal text-ink-soft">(opsional)</span>
          </label>
          <input
            id={fid("size")}
            name="size"
            type="text"
            maxLength={120}
            placeholder="mis. panjang 200 cm"
            aria-invalid={Boolean(errors.size)}
            aria-describedby={describe("size")}
            className={`${inputBase} ${border("size")}`}
          />
          {errors.size && (
            <p id={`${fid("size")}-error`} className="mt-1.5 text-sm text-danger">
              {errors.size}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={fid("message")} className="font-semibold">
          Ceritakan kebutuhan Anda
        </label>
        <p id={`${fid("message")}-hint`} className="mt-1 text-sm text-ink-soft">
          Misalnya model yang diinginkan, kondisi sofa saat ini, atau bahan dan warna pilihan.
        </p>
        <textarea
          id={fid("message")}
          name="message"
          rows={5}
          required
          maxLength={1000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe("message", true)}
          className={`${inputBase} ${border("message")} resize-y`}
        />
        {errors.message && (
          <p id={`${fid("message")}-error`} className="mt-1.5 text-sm text-danger">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-wa px-7 font-semibold text-white transition-colors hover:bg-wa-dark sm:w-auto"
        >
          <WhatsAppIcon className="size-5" />
          Lanjutkan ke WhatsApp
        </button>
        <p id={`${id}-note`} className="mt-3 text-sm text-ink-soft">
          Formulir ini tidak menyimpan data. Isian Anda disusun menjadi pesan WhatsApp, dan pesan baru terkirim setelah
          Anda menekan &ldquo;Kirim&rdquo; di WhatsApp.
        </p>
      </div>

      <div aria-live="polite">
        {status === "opened" && (
          <p className="rounded-xl bg-cream px-4 py-3 text-[0.95rem]">
            WhatsApp sudah dibuka dengan pesan Anda. Periksa pesannya, lalu tekan <strong>Kirim</strong> di WhatsApp. Jangan lupa
            lampirkan foto sofa atau ruangan Anda.
          </p>
        )}
        {status === "unavailable" && (
          <p role="alert" className="rounded-xl border border-danger/40 bg-white px-4 py-3 text-[0.95rem] text-danger">
            Maaf, pengiriman lewat WhatsApp belum dapat digunakan saat ini. Silakan coba lagi nanti.
          </p>
        )}
      </div>
    </form>
  );
}
