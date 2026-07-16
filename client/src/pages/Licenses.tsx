import { Link } from "wouter";
import { PageHero } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export default function Licenses() {
  usePageMetadata({
    title: "Licenses",
    description:
      "Professional credentials and licensing notes for Agent Kammer advisory practice.",
    path: "/licenses",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Legal"
        title="Licenses & credentials"
        description="Transparency on professional standing. Phase 1 is nationwide decision guidance; transaction execution uses the right local licensed professionals when needed."
        art="building"
      />
      <article className="mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-sm text-brand-graphite/70">Last updated: July 2026</p>

        <h2 className="mt-10 font-display text-3xl text-brand-navy">Real estate practice</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          Raphael Kammer’s New York State real estate salesperson license status is disclosed on client materials and updated as credentials advance. Where Agent Kammer is not the listing or buyer’s broker of record, we curate and coordinate with appropriately licensed local professionals for execution.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Building literacy</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          Training referenced in advisory work may include ICC Commercial Building Inspector coursework, blueprint / construction-document literacy, and OSHA 30. These credentials inform judgment; they are not a substitute for a full building inspection or engineer’s report when one is warranted.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Geographic scope</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          Phase 1 focuses on decision guidance available nationwide. Manhattan building intelligence deepens in Phase 2. Always confirm current license status for any jurisdiction before relying on transaction representation.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Requests</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          For current license numbers or partner brokerage details for a specific matter, contact{" "}
          <a className="text-brand-navy underline decoration-brand-brass/50 underline-offset-4" href="mailto:info@agentkammer.com">
            info@agentkammer.com
          </a>
          .
        </p>

        <p className="mt-12 text-sm text-brand-graphite">
          See also <Link href="/privacy" className="text-brand-navy underline underline-offset-4">Privacy</Link> and{" "}
          <Link href="/terms" className="text-brand-navy underline underline-offset-4">Terms</Link>.
        </p>
      </article>
    </main>
  );
}
