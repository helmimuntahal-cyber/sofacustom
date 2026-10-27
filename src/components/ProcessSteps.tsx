import { processSteps, type Step } from "@/data/process";

/** Alur kerja bernomor. Grid 1 → 2 → 3 kolom; nomor besar sebagai penanda visual. */
export function ProcessSteps({ steps = processSteps }: { steps?: Step[] }) {
  return (
    <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="relative border-t border-charcoal/15 pt-6">
          <span aria-hidden="true" className="font-display text-5xl leading-none text-taupe">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 font-sans text-lg font-semibold tracking-normal">
            <span className="sr-only">Langkah {i + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-2 text-ink-soft">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
