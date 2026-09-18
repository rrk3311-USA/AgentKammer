import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { fetchToolsStatus, rememberToolsPreviewFromLocation, type ToolsStatus } from "@/lib/tools-client";
import { ToolsComingSoon } from "./ToolsComingSoon";

export default function ToolsHome() {
  usePageMetadata({
    title: "Tools",
    description: "Pay-to-run housing analyses from Agent Kammer. First tool: Livability Score.",
    path: "/tools",
    robots: "noindex, nofollow",
  });

  const [status, setStatus] = useState<ToolsStatus | null>(null);

  useEffect(() => {
    rememberToolsPreviewFromLocation();
    void fetchToolsStatus().then(setStatus).catch(() => {
      setStatus({
        ok: false,
        public: false,
        previewRequired: true,
        unlocked: false,
        stripeConfigured: false,
        paymentsStubbed: true,
        catalog: [],
      });
    });
  }, []);

  if (!status) {
    return <div className="bg-brand-navy px-6 py-24 text-brand-graphite">Opening the desk…</div>;
  }
  if (!status.unlocked) {
    return <ToolsComingSoon />;
  }

  return (
    <main className="bg-brand-navy">
      <PageHero
        eyebrow="Tools"
        title="Paid analyses, held in a quiet wallet."
        description="Run a Livability Score from an address, a listing link, or photos. The first run is free. After that, one credit is one dollar."
        art="decision-framework"
      />

      <PageSection>
        <SectionHeading
          eyebrow="Desk"
          title="Start with how a home lives."
          description="Not in the primary navigation. Same navy, ivory, and brass as the rest of the practice. More tools will share this wallet."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {status.catalog.map((tool) => {
            const live = tool.status === "live";
            const body = (
              <>
                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-cocoa">{tool.eyebrow || (live ? "Open" : "Later")}</p>
                <h2 className="mt-4 font-display text-3xl leading-[0.95] tracking-[-0.02em] text-brand-navy">
                  {tool.name}
                </h2>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">{tool.tagline || tool.description}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-brand-navy">
                  {live ? "Open tool" : "Scaffolded"}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </>
            );

            if (!live) {
              return (
                <div key={tool.slug} className="border border-brand-border bg-white/70 p-7 opacity-80">
                  {body}
                </div>
              );
            }

            return (
              <Link
                key={tool.slug}
                href={tool.href}
                className="group block border border-brand-border bg-white p-7 transition-colors hover:border-brand-navy/30"
              >
                {body}
              </Link>
            );
          })}
        </div>
      </PageSection>
    </main>
  );
}
