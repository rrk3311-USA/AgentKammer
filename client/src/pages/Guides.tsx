import { Link } from "wouter";
import { ArrowRight, FileText, LayoutTemplate } from "lucide-react";
import { PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { publicGuides, type GuideEntry } from "@/data/guides";

function GuideCard({ guide }: { guide: GuideEntry }) {
  const external = guide.kind === "html";
  const Icon = guide.kind === "html" ? FileText : LayoutTemplate;

  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-9 w-9 items-center justify-center border border-brand-border bg-brand-surface text-brand-navy">
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-brand-cocoa">
          {guide.kind === "html" ? "HTML guide" : "Interactive page"}
        </span>
      </div>
      <h2 className="mt-6 font-display text-2xl leading-[0.98] tracking-[-0.02em] text-brand-navy sm:text-3xl">
        {guide.title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-brand-graphite">
        {guide.description}
      </p>
      <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy">
        Open guide
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={guide.href}
        className="group block border border-brand-border bg-white p-7 transition-colors hover:border-brand-navy/30 sm:p-8"
      >
        {body}
      </a>
    );
  }

  return (
    <Link
      href={guide.href}
      className="group block border border-brand-border bg-white p-7 transition-colors hover:border-brand-navy/30 sm:p-8"
    >
      {body}
    </Link>
  );
}

export default function Guides() {
  usePageMetadata({
    title: "Guides",
    description:
      "Educational guides from Agent Kammer - ownership structures, marketing funnel, and international buyer decision frameworks.",
    path: "/guides",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Guides"
        title="Clear frameworks before listings."
        description="Educational pages and shareable HTML guides — ownership, condo vs co-op, condop terms, and related decision frameworks."
        art="decision-framework"
      />

      <PageSection>
        <SectionHeading
          eyebrow="Library"
          title="Start with structure."
          description="These live on the site so you can return to them, share them, and use them before browsing buildings."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {publicGuides.map((guide) => (
            <GuideCard key={guide.href} guide={guide} />
          ))}
        </div>
        <p className="mt-12 text-sm text-brand-graphite">
          Looking for situations or building research?{" "}
          <Link
            href="/situations"
            className="text-brand-navy underline underline-offset-4"
          >
            What's Changing
          </Link>
          {" · "}
          <Link
            href="/intelligence"
            className="text-brand-navy underline underline-offset-4"
          >
            Intelligence
          </Link>
          {" · "}
          <Link
            href="/building-reports"
            className="text-brand-navy underline underline-offset-4"
          >
            Building Profiles
          </Link>
        </p>
      </PageSection>
    </main>
  );
}
