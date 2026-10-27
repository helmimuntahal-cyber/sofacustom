import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, intro, align = "left", id, className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 id={id} className="text-[clamp(1.9rem,4.2vw,3rem)]">
        {title}
      </h2>
      {intro && <div className="mt-5 text-lg leading-relaxed text-ink-soft">{intro}</div>}
    </div>
  );
}
