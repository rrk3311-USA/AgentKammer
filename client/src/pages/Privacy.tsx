import { Link } from "wouter";
import { PageHero, PageSection } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export default function Privacy() {
  usePageMetadata({
    title: "Privacy",
    description:
      "How Agent Kammer collects and uses conversation, contact, and behavioral data for housing decision advisory.",
    path: "/privacy",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        description="Agent Kammer is a private advisory practice. We collect only what we need to diagnose housing decisions and follow up with care."
        art="private-advisory"
      />
      <article className="mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-sm text-brand-graphite/70">Last updated: July 2026</p>

        <h2 className="mt-10 font-display text-3xl text-brand-navy">What we collect</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          When you use the site, Guidance Advisor, Decision Assessment, or contact forms, we may collect: name, email, phone, messages, decision-profile answers, pages viewed, approximate location derived from request metadata, and anonymous visitor identifiers stored in cookies.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">How we use it</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          We use this information to provide decision guidance, prepare Decision Profiles and briefs, respond to inquiries, improve the product, prevent abuse, and — when you ask — save and restore your Decision Hub. We do not sell personal information.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Cookies and sessions</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          We use httpOnly cookies for anonymous visitor continuity (`ak_visitor_id`) and, after email verification, member sessions (`ak_member_token`). Chat may also store a local session id so your conversation can resume on the same device.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Email verification</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          Saving or recovering a Decision Hub requires email plus a one-time PIN. We do not open member access from an email address alone.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Sharing</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          We may share information with infrastructure providers (hosting, email delivery, analytics) under contract, or with curated local professionals when you authorize a referral. We may disclose information if required by law.
        </p>

        <h2 className="mt-12 font-display text-3xl text-brand-navy">Retention and rights</h2>
        <p className="mt-4 text-lg leading-9 text-brand-graphite">
          We retain advisory records as long as needed for the relationship and legitimate business purposes. To access, correct, or delete personal data, email{" "}
          <a className="text-brand-navy underline decoration-brand-brass/50 underline-offset-4" href="mailto:info@agentkammer.com">
            info@agentkammer.com
          </a>
          .
        </p>

        <p className="mt-12 text-sm text-brand-graphite">
          See also <Link href="/terms" className="text-brand-navy underline underline-offset-4">Terms</Link> and{" "}
          <Link href="/licenses" className="text-brand-navy underline underline-offset-4">Licenses</Link>.
        </p>
      </article>
    </main>
  );
}
