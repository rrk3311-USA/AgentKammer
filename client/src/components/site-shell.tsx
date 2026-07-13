import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Decision Briefs", href: "/services" },
  { label: "Buildings", href: "/building-reports" },
  { label: "Reports", href: "/building-reports/market-briefs" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const buildingReportsNav = [
  { label: "Overview", href: "/building-reports" },
  { label: "Individual Buildings", href: "/building-reports/individual-buildings" },
  { label: "Neighborhood Guides", href: "/building-reports/neighborhood-guides" },
  { label: "Market Briefs", href: "/building-reports/market-briefs" },
] as const;

export function PageSection({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <section className={cn("mx-auto w-full max-w-site px-6 py-16 lg:px-10 lg:py-24", className)}>{children}</section>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">{eyebrow}</p>
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.94] tracking-[-0.03em] text-brand-navy">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 text-base leading-8 text-brand-graphite lg:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  kicker,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kicker?: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-brand-border bg-brand-navy text-brand-ivory">
      {image ? (
        <img
          src={image}
          alt={imageAlt ?? ""}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.58] saturate-[0.9] contrast-[1.05]"
        />
      ) : null}
      <div className="absolute inset-0 bg-brand-navy/58" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/72 to-brand-navy/32" />
      <PageSection className="relative grid gap-12 py-20 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.78fr)] lg:items-end lg:py-28">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-[-0.04em] text-brand-ivory">
            {title}
          </h1>
        </div>
        <div className="space-y-6">
          <p className="max-w-xl text-base leading-8 text-brand-ivory/78 lg:text-lg">{description}</p>
          {kicker ? (
            <div className="border border-brand-brass/30 bg-brand-navy/55 p-6 backdrop-blur-sm">{kicker}</div>
          ) : null}
        </div>
      </PageSection>
    </section>
  );
}

export function ReportSubnav() {
  const [location] = useLocation();

  return (
    <div className="overflow-x-auto border-b border-brand-border bg-brand-ivory">
      <div className="mx-auto flex w-full max-w-site gap-3 px-6 py-4 lg:px-10">
        {buildingReportsNav.map((item) => {
          const active = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors",
                active
                  ? "border-brand-brass bg-brand-brass text-brand-navy"
                  : "border-brand-border text-brand-graphite hover:border-brand-brass/40 hover:text-brand-navy",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function CTA({
  title,
  description,
  href = "/contact",
  label = "Request a Call",
}: {
  title: string;
  description: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="border-t border-brand-border bg-brand-ivory">
      <PageSection className="py-16 lg:py-20">
        <div className="grid gap-8 border border-brand-border bg-white p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_1px_0_rgba(42,52,71,0.06)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:p-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">Private Advisory</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.8vw,3.25rem)] leading-[0.95] tracking-[-0.03em] text-brand-navy">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-graphite">{description}</p>
          </div>
          {href === "/contact" ? (
            <div className="grid gap-3 sm:min-w-[16rem]">
              <Link
                href="/contact"
                className="group grid border border-brand-navy bg-brand-navy px-5 py-4 text-left text-brand-ivory transition-colors hover:border-brand-brass"
              >
                <span className="text-[10px] uppercase tracking-[0.24em] text-brand-brass">Private Advisory</span>
                <span className="mt-3 h-px w-full bg-brand-ivory/18" aria-hidden />
                <span className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.16em]">
                  {label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </Link>
              <a
                href="mailto:info@agentkammer.com"
                className="border border-brand-border px-5 py-3 text-center text-[10px] uppercase tracking-[0.16em] text-brand-navy transition-colors hover:border-brand-brass"
              >
                info@agentkammer.com
              </a>
            </div>
          ) : (
            <Link href={href}>
              <Button variant="brand" className="gap-2 uppercase tracking-nav">
                {label}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            </Link>
          )}
        </div>
      </PageSection>
    </section>
  );
}
