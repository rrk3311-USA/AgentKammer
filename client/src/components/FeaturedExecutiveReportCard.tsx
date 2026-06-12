import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { featuredExecutiveHousingReport } from "@/data/executive-housing-reports";

type FeaturedExecutiveReportCardProps = {
  variant?: "light" | "dark";
};

export function FeaturedExecutiveReportCard({ variant = "light" }: FeaturedExecutiveReportCardProps) {
  const report = featuredExecutiveHousingReport;
  const href = `/perspectives/reports/${report.slug}`;
  const isDark = variant === "dark";

  return (
    <div
      className={
        isDark
          ? "border border-brand-ivory/14 bg-brand-midnight p-8 lg:p-10"
          : "border border-brand-champagne/40 bg-white p-8 shadow-[0_2px_24px_rgba(15,23,42,0.05)] lg:p-10"
      }
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.24em] ${isDark ? "text-brand-champagne" : "text-brand-champagne-dark"}`}
      >
        Featured Report ⭐
      </p>
      <h2 className={`mt-3 font-serif text-3xl font-semibold md:text-4xl ${isDark ? "text-brand-ivory" : "text-brand-midnight"}`}>
        {report.title}
      </h2>
      <p className={`mt-4 max-w-2xl text-base leading-7 ${isDark ? "text-brand-ivory/82" : "text-brand-graphite/72"}`}>
        The definitive guide for executives, founders, investors, and relocating professionals considering Manhattan.
      </p>
      <Link href={href} className="mt-8 inline-block">
        <Button variant={isDark ? "brand" : "brandOutline"}>Explore Report</Button>
      </Link>
    </div>
  );
}
