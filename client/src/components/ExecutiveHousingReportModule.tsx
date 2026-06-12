import { Link } from "wouter";
import { featuredExecutiveHousingReport } from "@/data/executive-housing-reports";

type ExecutiveHousingReportModuleProps = {
  variant?: "inline" | "compact";
  className?: string;
};

export function ExecutiveHousingReportModule({
  variant = "inline",
  className = "",
}: ExecutiveHousingReportModuleProps) {
  const report = featuredExecutiveHousingReport;
  const href = `/perspectives/reports/${report.slug}`;

  if (variant === "compact") {
    return (
      <aside
        className={`border-y border-brand-champagne/35 bg-[#f7f3ea] px-6 py-8 ${className}`}
        aria-label="Related intelligence"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-champagne-dark">
            Related Intelligence
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-brand-midnight">{report.title}</h2>
          <p className="mt-3 text-sm leading-6 text-brand-graphite/72">
            A quarterly briefing on Manhattan housing trends, building intelligence, and executive relocation patterns.
          </p>
          <Link href={href} className="mt-4 inline-block font-serif text-sm text-brand-midnight transition hover:text-brand-champagne-dark">
            Read the full report →
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`border border-brand-champagne/40 bg-white px-6 py-8 ${className}`}
      aria-label="Executive Housing Report"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-5 h-px w-16 bg-brand-champagne/60" aria-hidden />
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brand-champagne-dark">
          Executive Housing Report 2026
        </p>
        <p className="mx-auto mt-4 max-w-md font-serif text-lg leading-8 text-brand-graphite/82">
          A quarterly briefing on Manhattan housing trends, building intelligence, and executive relocation patterns.
        </p>
        <Link
          href={href}
          className="mt-5 inline-block border border-brand-midnight/20 px-6 py-2.5 font-serif text-sm text-brand-midnight transition hover:border-brand-champagne hover:text-brand-champagne-dark"
        >
          Read Report
        </Link>
        <div className="mx-auto mt-5 h-px w-16 bg-brand-champagne/60" aria-hidden />
      </div>
    </aside>
  );
}
