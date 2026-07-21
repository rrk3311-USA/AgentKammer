import { Link, Redirect } from "wouter";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { InternationalStrategyForm } from "@/components/InternationalStrategyForm";
import {
  internationalCountryMap,
  isInternationalCountrySlug,
} from "@/data/international-hub";
import { usePageMetadata } from "@/hooks/usePageMetadata";

function InternationalCountryContent({ country }: { country: string }) {
  const page = internationalCountryMap[country];
  const { ui } = page;

  usePageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/international/${page.slug}`,
    locale: page.languageCode,
  });

  return (
    <main className="bg-brand-ivory" lang={page.languageCode}>
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroDescription}
        art="international"
      />

      <PageSection className="max-w-[42rem]">
        <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">
          {page.flagEmoji} {page.countryName} · {page.countryNameNative}
        </p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[0.94] text-brand-navy">
          {page.introTitle}
        </h2>
        {page.introBody.map((para) => (
          <p key={para.slice(0, 40)} className="mt-6 text-lg leading-9 text-brand-graphite">
            {para}
          </p>
        ))}
        <p className="mt-6 text-sm text-brand-graphite/80">
          <Link href="/international" className="underline underline-offset-4">
            {ui.backToHub}
          </Link>
        </p>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading eyebrow={ui.faqEyebrow} title={ui.faqTitle} />
          <div className="mt-10 divide-y divide-brand-border border-y border-brand-border">
            {page.faqs.map((faq) => (
              <details key={faq.q} className="py-6">
                <summary className="cursor-pointer list-none font-display text-xl text-brand-navy">
                  {faq.q}
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-graphite">{faq.a}</p>
              </details>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading eyebrow={ui.neighborhoodsEyebrow} title={ui.neighborhoodsTitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {page.neighborhoods.map((n) => (
            <div key={n.name} className="border border-brand-border bg-white p-7">
              <h3 className="font-display text-2xl text-brand-navy">{n.name}</h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-brand-brass">
                {n.typicalBuyer}
              </p>
              <p className="mt-4 text-sm leading-7 text-brand-graphite">{n.blurb}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading eyebrow={ui.processEyebrow} title={ui.processTitle} />
          <ol className="mt-12 space-y-8">
            {page.processSteps.map((step, i) => (
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
      </section>

      <PageSection>
        <SectionHeading eyebrow={ui.mistakesEyebrow} title={ui.mistakesTitle} />
        <ul className="mt-10 max-w-3xl space-y-4">
          {page.commonMistakes.map((m) => (
            <li
              key={m}
              className="border-l-2 border-brand-brass pl-4 text-base leading-8 text-brand-graphite"
            >
              {m}
            </li>
          ))}
        </ul>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow={ui.teamEyebrow}
            title={ui.teamTitle}
            description={ui.teamDescription}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {page.team.map((member) => (
              <div key={member.role} className="border border-brand-border bg-brand-ivory p-7">
                <h3 className="font-display text-2xl text-brand-navy">{member.role}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">{member.description}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading eyebrow={ui.resourcesEyebrow} title={ui.resourcesTitle} />
        <div className="mt-10 flex flex-wrap gap-4">
          {page.resources.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="border border-brand-border bg-white px-4 py-3 text-sm text-brand-navy hover:border-brand-navy"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white" id="strategy-request">
        <PageSection className="max-w-[52rem]">
          <InternationalStrategyForm
            sourcePage={`/international/${page.slug}`}
            countrySlug={page.slug}
            defaultCountry={page.countryName}
            defaultLanguage={page.preferredLanguageLabel}
            labels={{
              headline: page.formHeadline,
              subhead: page.formSubhead,
              specialistPromise: page.specialistPromise,
              submitLabel: ui.submitLabel,
              formEyebrow: ui.formEyebrow,
              successEyebrow: ui.successEyebrow,
              successTitle: ui.successTitle,
              successWait: ui.successWait,
              roadmapLabel: ui.roadmapLabel,
              fieldFullName: ui.fieldFullName,
              fieldEmail: ui.fieldEmail,
              fieldCountry: ui.fieldCountry,
              fieldLanguage: ui.fieldLanguage,
              fieldContactMethod: ui.fieldContactMethod,
              fieldContactDetail: ui.fieldContactDetail,
              fieldGoal: ui.fieldGoal,
              fieldBudget: ui.fieldBudget,
              fieldTimeline: ui.fieldTimeline,
              fieldFinancing: ui.fieldFinancing,
              fieldNeighborhoods: ui.fieldNeighborhoods,
              fieldHelp: ui.fieldHelp,
              fieldHowFound: ui.fieldHowFound,
            }}
          />
        </PageSection>
      </section>

      <CTA
        title={ui.ctaTitle}
        description={ui.ctaDescription}
        href={ui.ctaHref}
        label={ui.ctaLabel}
        eyebrow={ui.formEyebrow}
      />
    </main>
  );
}

export default function InternationalCountry({ country }: { country: string }) {
  if (!isInternationalCountrySlug(country)) {
    return <Redirect to="/international" />;
  }
  return <InternationalCountryContent country={country} />;
}
