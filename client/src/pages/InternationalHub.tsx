import { Link } from "wouter";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { InternationalStrategyForm } from "@/components/InternationalStrategyForm";
import {
  INTERNATIONAL_HUB,
  INTERNATIONAL_HUB_FAQS,
  INTERNATIONAL_PROCESS,
  INTERNATIONAL_REGIONS,
  countriesByRegion,
} from "@/data/international-hub";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export default function InternationalHub() {
  usePageMetadata({
    title: INTERNATIONAL_HUB.metaTitle,
    description: INTERNATIONAL_HUB.metaDescription,
    path: INTERNATIONAL_HUB.path,
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow={INTERNATIONAL_HUB.eyebrow}
        title={INTERNATIONAL_HUB.title}
        description={INTERNATIONAL_HUB.description}
        art="international"
      />

      <PageSection>
        <SectionHeading
          eyebrow="Where are you buying from?"
          title="Start with your country."
          description="Each page follows the same premium structure - localized for your language and common questions - then ends with a strategy request. After you submit, a specialist who speaks your language will get in touch."
        />
        <div className="mt-14 space-y-16">
          {INTERNATIONAL_REGIONS.map((region) => {
            const countries = countriesByRegion(region);
            if (countries.length === 0) return null;
            return (
              <div key={region}>
                <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">{region}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {countries.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/international/${c.slug}`}
                      className="group border border-brand-border bg-white p-8 transition hover:border-brand-navy"
                    >
                      <p className="text-2xl" aria-hidden>
                        {c.flagEmoji}
                      </p>
                      <h3 className="mt-4 font-display text-2xl text-brand-navy group-hover:underline">
                        {c.countryName}
                      </h3>
                      <p className="mt-1 text-sm text-brand-cocoa">{c.countryNameNative}</p>
                      <p className="mt-4 text-sm leading-7 text-brand-graphite line-clamp-3">
                        {c.heroDescription}
                      </p>
                      <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-brand-brass">
                        Open guide →
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-sm text-brand-graphite/80">
          Prefer the English Decision Brief first?{" "}
          <Link href="/situations/foreign-buyers-new-york" className="underline underline-offset-4">
            International Buyer Decision Brief
          </Link>
          .
        </p>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Essentials"
            title="Questions every international buyer asks."
          />
          <div className="mt-10 divide-y divide-brand-border border-y border-brand-border">
            {INTERNATIONAL_HUB_FAQS.map((faq) => (
              <details key={faq.q} className="group py-6">
                <summary className="cursor-pointer list-none font-display text-xl text-brand-navy marker:content-none">
                  {faq.q}
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-graphite">{faq.a}</p>
              </details>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading eyebrow="Process" title="How a Manhattan purchase typically unfolds." />
        <ol className="mt-12 space-y-8">
          {INTERNATIONAL_PROCESS.map((step, i) => (
            <li
              key={step.title}
              className="grid gap-3 border-b border-brand-border pb-8 lg:grid-cols-[80px_1fr]"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cocoa">
                0{i + 1}
              </p>
              <div>
                <p className="font-display text-2xl text-brand-navy">{step.title}</p>
                <p className="mt-2 max-w-2xl text-base leading-8 text-brand-graphite">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </PageSection>

      <section className="border-y border-brand-border bg-white" id="strategy-request">
        <PageSection className="max-w-[52rem]">
          <InternationalStrategyForm sourcePage="/international" />
        </PageSection>
      </section>

      <CTA
        title="Ready to request a Manhattan strategy?"
        description="Tell us your country, language, and goals - a specialist who speaks your language will get in touch."
        href="#strategy-request"
        label="Request your strategy"
        eyebrow="Strategy request"
      />
    </main>
  );
}
