import type { ReactNode } from "react";

export function BeliefQuote({ children }: { children: ReactNode }) {
  return (
    <section className="border-y border-brand-midnight/10 bg-white px-6 py-16 lg:px-10 lg:py-20">
      <blockquote className="mx-auto max-w-3xl text-center font-serif text-2xl font-semibold leading-snug text-brand-midnight md:text-3xl lg:text-[2.15rem] lg:leading-[1.35]">
        {children}
      </blockquote>
    </section>
  );
}
