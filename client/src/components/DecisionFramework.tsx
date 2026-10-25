import React, { type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { grammar } from "@/components/visual-grammar";
import { cn } from "@/lib/utils";

export type DecisionFrameworkItem = {
  step: string;
  title: string;
  text: string;
  href?: string;
  cta?: string;
  onClick?: () => void;
};

export function DecisionFramework({
  eyebrow,
  title,
  description,
  items,
  action,
  figure,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  items: readonly DecisionFrameworkItem[];
  action?: ReactNode;
  figure?: ReactNode;
}) {
  return (
    <section className="border-b border-brand-border bg-brand-soft-stone">
      <div className={cn(grammar.pad, figure && "lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12")}>
        <div className={figure ? "lg:col-span-9" : undefined}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="max-w-2xl">
              <p className={grammar.eyebrow}>{eyebrow}</p>
              <h2 className={`mt-3 lg:mt-4 ${grammar.section}`}>{title}</h2>
              {description ? (
                <p className={`mt-4 lg:mt-5 ${grammar.body}`}>
                  {description}
                </p>
              ) : null}
            </div>
            {action}
          </div>
          <div className="ak-felt-rule mt-8 border-t sm:mt-12">
            {items.map((item) => (
              <article
                key={item.step + item.title}
                className="ak-felt-rule grid gap-1.5 border-b py-5 md:grid-cols-[80px_minmax(0,1fr)] md:items-baseline md:gap-8 md:py-7"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-brand-cocoa">{item.step}</p>
                <div>
                  <p className={grammar.rowTitle}>{item.title}</p>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-brand-graphite">{item.text}</p>
                  {item.onClick && item.cta ? (
                    <button type="button" onClick={item.onClick} className={`${grammar.textLink} mt-4`}>
                      {item.cta}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  ) : item.href && item.cta ? (
                    <Link href={item.href} className={`${grammar.textLink} mt-4`}>
                      {item.cta}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
        {figure ? (
          <figure
            data-ak-how-we-decide-art
            className="mx-0 mt-8 max-w-[11.5rem] lg:col-span-3 lg:mt-3 lg:max-w-none"
          >
            {figure}
          </figure>
        ) : null}
      </div>
    </section>
  );
}
