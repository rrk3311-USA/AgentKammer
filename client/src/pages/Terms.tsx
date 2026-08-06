import { Link } from "wouter";
import { PageHero } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export default function Terms() {
  usePageMetadata({
    title: "Terms",
    description:
      "Terms of use for Agent Kammer advisory guidance, Decision Hub, and related digital tools.",
    path: "/terms",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        description="These terms govern use of agentkammer.com, the Guidance Advisor, Decision Assessment, and Decision Hub."
        art="decision-framework"
      />
      <article className="mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-sm text-brand-graphite/70">Last updated: July 2026</p>

        <h2 className="mt-10 font-display text-3xl text-brand-navy">Advisory, not brokerage inventory</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          Agent Kammer provides strategic housing guidance. Content and AI outputs are informational decision support - not a substitute for licensed local brokerage, legal, tax, or inspection advice. Recommendations may include staying, waiting, renovating, renting, buying, selling, or doing nothing.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">No guarantee of outcomes</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          Markets, buildings, and personal circumstances change. We do not guarantee prices, timing, financing, board approval, or transaction results. You remain responsible for decisions you make.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Accounts and verification</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          Decision Hub access requires email verification (one-time PIN or, when available, a magic link). You agree to provide accurate contact details and not to attempt to access another person’s hub.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Acceptable use</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          Do not misuse the site, scrape at scale, reverse-engineer systems, submit unlawful content, or interfere with other visitors. We may suspend access for abuse or security risk.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Intellectual property</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          Site design, Decision Briefs, Building Reports, and brand materials are owned by Agent Kammer or licensors. You may not copy them for commercial redistribution without permission.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Limitation of liability</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          To the fullest extent permitted by law, Agent Kammer is not liable for indirect, incidental, or consequential damages arising from use of the site or reliance on guidance. Some jurisdictions do not allow certain limitations; those limits may not apply to you.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Contact</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          Questions:{" "}
          <a className="text-brand-navy underline decoration-brand-brass/50 underline-offset-4" href="mailto:info@agentkammer.com">
            info@agentkammer.com
          </a>
          .
        </p>

        <p className="mt-12 text-sm text-brand-graphite">
          See also <Link href="/privacy" className="text-brand-navy underline underline-offset-4">Privacy</Link> and{" "}
          <Link href="/licenses" className="text-brand-navy underline underline-offset-4">Licenses</Link>.
        </p>
      </article>
    </main>
  );
}
