import React, { type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Homepage-locked type. Reuse these; do not invent sizes per module. */
export const grammar = {
  eyebrow: "text-[11px] uppercase tracking-[0.26em] text-brand-cocoa",
  eyebrowOnDark: "text-[11px] uppercase tracking-[0.26em] text-brand-stone",
  display: "font-display text-[clamp(3.25rem,6vw,4.5rem)] leading-[0.92] text-brand-navy",
  displayOnDark: "font-display text-[clamp(3.25rem,6vw,4.5rem)] leading-[0.92] text-brand-ivory",
  section: "font-display text-[clamp(2.25rem,4vw,2.75rem)] leading-[1.02] text-brand-navy",
  sectionOnDark: "font-display text-[clamp(2.25rem,4vw,2.75rem)] leading-[1.02] text-brand-ivory",
  quote: "font-display text-[clamp(1.75rem,2.4vw,2rem)] leading-[1.2] tracking-[-0.02em] text-brand-navy",
  body: "max-w-xl text-[17px] leading-8 text-brand-graphite",
  bodyWide: "text-[17px] leading-8 text-brand-graphite",
  bodyOnDark: "max-w-xl text-base leading-8 text-brand-ivory/74 lg:text-[17px]",
  rowTitle: "font-display text-[1.65rem] leading-none text-brand-navy md:text-[1.85rem]",
  textLink:
    "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy transition-colors hover:text-brand-navy-secondary",
  pad: "mx-auto w-full max-w-site px-6 py-20 lg:px-10 lg:py-24",
  padLoose: "mx-auto w-full max-w-site px-6 py-24 lg:px-10 lg:py-28",
} as const;

const moduleSurface: Record<"ivory" | "white" | "mist" | "stone", string> = {
  ivory: "bg-brand-ivory",
  white: "bg-white",
  mist: "bg-brand-mist",
  stone: "bg-brand-soft-stone",
};

export function ModuleSection({
  id,
  surface = "ivory",
  children,
}: {
  id?: string;
  surface?: keyof typeof moduleSurface;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28", moduleSurface[surface])}>
      {children}
    </section>
  );
}

export function ModuleIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className={grammar.eyebrow}>{eyebrow}</p>
      <h2 className={cn("mt-4", grammar.section)}>{title}</h2>
      {description ? <p className={cn("mt-5", grammar.body)}>{description}</p> : null}
    </div>
  );
}

export type ModuleCardItem = {
  label: string;
  href: string;
  text?: string;
};

export function ModuleCards({
  items,
  columns = 2,
  size = "standard",
}: {
  items: readonly ModuleCardItem[];
  columns?: 2 | 3 | 4;
  size?: "standard" | "compact" | "editorial";
}) {
  const cols =
    columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  const pad = size === "compact" ? "px-5 py-5" : size === "editorial" ? "p-8 lg:p-10" : "p-7";
  const titleClass = grammar.rowTitle;

  return (
    <div className={cn("mt-12 grid gap-px bg-brand-border", cols)}>
      {items.map((item) => (
        <Link
          key={item.href + item.label}
          href={item.href}
          className={cn("group bg-white/80 transition-colors hover:bg-white", pad)}
        >
          <span className={cn(titleClass, "transition-colors group-hover:text-brand-navy-secondary")}>{item.label}</span>
          {item.text ? <p className="mt-3 line-clamp-2 text-base leading-7 text-brand-graphite">{item.text}</p> : null}
        </Link>
      ))}
    </div>
  );
}

export function CompactLinkRow({ items }: { items: readonly ModuleCardItem[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
      {items.map((item) => (
        <Link key={item.href + item.label} href={item.href} className={grammar.textLink}>
          {item.label}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      ))}
    </div>
  );
}

export function EditorialHero({
  eyebrow,
  title,
  description,
  quote,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  quote?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-brand-border bg-brand-ivory">
      <div className={grammar.pad}>
        <p className={grammar.eyebrow}>{eyebrow}</p>
        <h1 className={cn("mt-4 max-w-[18ch]", grammar.display)}>{title}</h1>
        <p className={cn("mt-6", grammar.body)}>{description}</p>
        {quote ? (
          <blockquote className="mt-8 max-w-xl border-l border-brand-stone pl-5">
            <p className={grammar.quote}>{quote}</p>
          </blockquote>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

export function DarkStatement({
  eyebrow,
  title,
  description,
  href,
  label,
  onClick,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  label?: string;
  onClick?: () => void;
}) {
  const actionClass =
    "group inline-flex items-center justify-between gap-6 rounded-button border border-brand-ivory/20 px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:border-brand-stone";
  const actionInner = (
    <>
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
    </>
  );

  return (
    <section className="border-b border-brand-border bg-brand-navy text-brand-ivory">
      <div className={cn(grammar.pad, "grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end")}>
        <div>
          <p className={grammar.eyebrowOnDark}>{eyebrow}</p>
          <h2 className={cn("mt-4 max-w-xl", grammar.sectionOnDark)}>{title}</h2>
          <p className={cn("mt-6", grammar.bodyOnDark)}>{description}</p>
        </div>
        {onClick && label ? (
          <button type="button" onClick={onClick} className={actionClass}>
            {actionInner}
          </button>
        ) : href && label ? (
          <Link href={href} className={actionClass}>
            {actionInner}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export type LibraryItem = {
  eyebrow?: string;
  title: string;
  text: string;
  href: string;
  cta?: string;
};

export function LibraryList({ items, columns = 2 }: { items: readonly LibraryItem[]; columns?: 2 | 3 }) {
  return (
    <div className={cn("mt-12 grid gap-px bg-brand-border", columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
      {items.map((item) => {
        const body = (
          <>
            {item.eyebrow ? <p className={cn(grammar.eyebrow, "tracking-[0.18em]")}>{item.eyebrow}</p> : null}
            <p className={cn(item.eyebrow ? "mt-3" : "", grammar.rowTitle, "transition-colors group-hover:text-brand-navy-secondary")}>
              {item.title}
            </p>
            <p className="mt-3 line-clamp-2 text-base leading-7 text-brand-graphite">{item.text}</p>
            {item.cta ? (
              <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-brand-navy">
                {item.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </span>
            ) : null}
          </>
        );
        const className = "group bg-brand-ivory p-7 transition-colors hover:bg-white";
        if (item.href.endsWith(".html")) {
          return (
            <a key={item.href + item.title} href={item.href} className={className}>
              {body}
            </a>
          );
        }
        return (
          <Link key={item.href + item.title} href={item.href} className={className}>
            {body}
          </Link>
        );
      })}
    </div>
  );
}

export function GrammarRows({
  items,
}: {
  items: readonly { eyebrow?: string; title: string; text?: ReactNode }[];
}) {
  return (
    <div className="mt-12 border-t border-brand-border">
      {items.map((item) => (
        <article key={item.title} className="border-b border-brand-border py-7">
          {item.eyebrow ? <p className={cn(grammar.eyebrow, "tracking-[0.18em]")}>{item.eyebrow}</p> : null}
          <p className={cn(item.eyebrow ? "mt-3" : "", grammar.rowTitle)}>{item.title}</p>
          {item.text ? <div className="mt-3 max-w-2xl text-base leading-7 text-brand-graphite">{item.text}</div> : null}
        </article>
      ))}
    </div>
  );
}
