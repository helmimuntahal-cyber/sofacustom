import { PlusIcon } from "@/components/icons";
import type { FaqItem } from "@/data/faq";

/** Daftar FAQ berbasis <details>/<summary>: dapat diakses keyboard tanpa JavaScript. */
export function FaqList({ items, headingLevel = "h3" }: { items: FaqItem[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="faq-item group">
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-left">
            <Heading className="font-sans text-[1.075rem] font-semibold leading-snug tracking-normal">
              {item.question}
            </Heading>
            <span className="faq-icon mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-charcoal/20 transition-transform duration-200">
              <PlusIcon className="size-4" />
            </span>
          </summary>
          <p className="-mt-1 max-w-[65ch] pb-7 pr-12 text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
