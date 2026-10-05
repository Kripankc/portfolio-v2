import { ReactNode } from "react";

/** A page section with a small label, a heading and optional intro text. */
export default function Section({ id, label, title, intro, children, className = "" }: {
  id?: string; label?: string; title: string; intro?: ReactNode; children: ReactNode; className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 ${className}`}>
      {label && <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-emerald-700">{label}</p>}
      <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl text-stone-600">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}
