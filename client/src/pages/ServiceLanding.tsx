import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ArchitecturalHeroDrawing, CTA, PageSection } from "@/components/site-shell";
import { serviceLandings, serviceLandingMap, type ServiceLanding } from "@/data/service-landings";
import { usePageMetadata } from "@/hooks/usePageMetadata";

function editorialCopy(landing: ServiceLanding) {
  const paragraphOne = landing.summary;
  const paragraphTwo =
    landing.audience[0] && landing.considerations[0]
      ? `${landing.audience[0]} ${landing.considerations[0]}`
      : landing.considerations.slice(0, 2).join(" ");
  const paragraphThree =
    landing.depthNotes?.[0] ??
    landing.considerations[landing.considerations.length - 1] ??
    "The recommendation may be to buy, sell, rent, wait, renovate, or do nothing yet — whichever protects the client best.";

  const quoteRaw =
    landing.depthNotes?.[1] ??
    "The first win is clarity: what changed, whether action is required, and which path protects the client best.";
  const quote = quoteRaw.replace(/^["“]|["”]$/g, "");

  const recommendation =
    landing.depthNotes?.[landing.depthNotes.length - 1] ??
    `For ${landing.navLabel.toLowerCase()}, begin with whether anything should change — then choose the path with the highest expected value.`;

  return { paragraphOne, paragraphTwo, paragraphThree, quote, recommendation };
}

function nextBrief(slug: string) {
  const index = serviceLandings.findIndex((item) => item.slug === slug);
  if (index < 0) return serviceLandings[0];
  return serviceLandings[(index + 1) % serviceLandings.length];
}

export default function ServiceLanding({ slug }: { slug: string }) {
  const landing = serviceLandingMap[slug];
  const pagePath = landing ? `/situations/${landing.slug}` : "/situations";
  const pageUrl = `https://www.agentkammer.com${pagePath}`;
  const next = landing ? nextBrief(landing.slug) : null;
  const copy = landing ? editorialCopy(landing) : null;

  const structuredData = landing
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${landing.title} Situation`,
          serviceType: "Manhattan real estate decision intelligence",
          provider: {
            "@type": "RealEstateAgent",
            name: "Agent Kammer",
            url: "https://www.agentkammer.com",
            areaServed: "New York City",
          },
          areaServed: {
            "@type": "City",
            name: "New York",
          },
          description: landing.summary,
          url: pageUrl,
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Agent Kammer",
              item: "https://www.agentkammer.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Situations",
              item: "https://www.agentkammer.com/situations",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: landing.title,
              item: pageUrl,
            },
          ],
        },
      ]
    : undefined;

  usePageMetadata({
    title: landing?.title ?? "Situations",
    description: landing?.summary ?? "Focused situation pages for Agent Kammer.",
    path: pagePath,
    keywords: landing?.searchTerms.join(", "),
    structuredData,
  });

  if (!landing || !copy || !next) {
    return (
      <main className="bg-brand-ivory">
        <PageSection>
          <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">Situations</p>
          <h1 className="mt-4 font-display text-4xl text-brand-navy">Situation page not found.</h1>
          <p className="mt-4 text-brand-graphite">This URL does not match one of the current Situation pages.</p>
          <Link href="/situations" className="mt-8 inline-flex text-[11px] uppercase tracking-[0.16em] text-brand-navy">
            Back to Situations
          </Link>
        </PageSection>
      </main>
    );
  }

  return (
    <main className="bg-brand-ivory">
      {landing.heroImage ? (
        <section className="relative w-full overflow-hidden border-b border-brand-border bg-[#FBF2E3]">
          <img
            src={`${landing.heroImage}?v=8`}
            alt=""
            className="block h-[clamp(270px,68vw,360px)] w-[112%] max-w-none translate-x-[6%] object-cover object-[58%_18%] opacity-[0.92] pt-6 sm:h-auto sm:w-full sm:max-w-full sm:translate-x-0 sm:object-contain sm:object-right sm:opacity-100 sm:pt-8 sm:max-h-[min(56vh,520px)] lg:max-h-[min(52vh,560px)] lg:pt-10"
          />
          {/* Mobile cream wash — light only, so the glass tower still reads */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#FBF2E3] via-[#FBF2E3]/70 to-transparent sm:hidden"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-start sm:items-center">
            <div className="w-full px-6 pt-14 pb-10 sm:pt-20 md:pl-[12%] lg:px-10 lg:pb-12 lg:pl-[clamp(4rem,18vw,14rem)] lg:pt-24 xl:pl-[clamp(5rem,22vw,18rem)]">
              <p className="text-[11px] uppercase tracking-[0.24em] text-brand-cocoa">{landing.eyebrow}</p>
              <h1 className="mt-6 max-w-[12ch] font-display text-[clamp(2.35rem,9vw,4.75rem)] leading-[0.92] tracking-[-0.03em] text-brand-navy sm:mt-4 sm:max-w-[16ch] sm:text-[clamp(2.4rem,5.2vw,4.75rem)]">
                {landing.title}
              </h1>
            </div>
          </div>
        </section>
      ) : (
        <section className="border-b border-brand-border">
          <div className="mx-auto max-w-site px-6 pb-10 pt-14 lg:px-10 lg:pb-14 lg:pt-20">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-cocoa">{landing.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[0.9] tracking-[-0.03em] text-brand-navy">
              {landing.title}
            </h1>
          </div>
          <div className="relative mx-auto flex aspect-[16/9] max-h-[520px] w-full max-w-site items-center justify-center overflow-hidden bg-brand-navy lg:aspect-[21/9]">
            <ArchitecturalHeroDrawing
              eyebrow={landing.eyebrow}
              title={landing.title}
              variant={landing.art}
              className="flex w-full max-w-4xl items-center justify-center px-8 [&_svg]:max-w-none"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-brand-navy/20" />
          </div>
        </section>
      )}

      {/* Article body: three paragraphs + quote + recommendation */}
      <article className="border-b border-brand-border">
        <div
          className={
            landing.heroImage
              ? "mx-auto max-w-[90%] pb-14 pt-7 text-left sm:mx-0 sm:ml-[clamp(1.5rem,18vw,22.5rem)] sm:mr-6 sm:max-w-[680px] sm:pb-16 sm:pt-8 lg:mr-10 lg:pb-24 lg:pt-10"
              : "mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24"
          }
        >
          <p
            className={
              landing.heroImage
                ? "text-[clamp(1.125rem,4.2vw,1.25rem)] leading-[1.55] text-brand-graphite sm:text-lg sm:leading-[1.7] lg:text-xl"
                : "text-lg leading-9 text-brand-graphite lg:text-xl lg:leading-10"
            }
          >
            {copy.paragraphOne}
          </p>
          <p
            className={
              landing.heroImage
                ? "mt-6 text-[1.05rem] leading-[1.55] text-brand-graphite sm:mt-8 sm:text-lg sm:leading-[1.7] lg:text-xl"
                : "mt-8 text-lg leading-9 text-brand-graphite lg:text-xl lg:leading-10"
            }
          >
            {copy.paragraphTwo}
          </p>
          <p
            className={
              landing.heroImage
                ? "mt-6 text-[1.05rem] leading-[1.55] text-brand-graphite sm:mt-8 sm:text-lg sm:leading-[1.7] lg:text-xl"
                : "mt-8 text-lg leading-9 text-brand-graphite lg:text-xl lg:leading-10"
            }
          >
            {copy.paragraphThree}
          </p>

          <blockquote className="my-14 border-l-2 border-brand-brass pl-6">
            <p className="font-display text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.15] text-brand-navy">
              “{copy.quote}”
            </p>
          </blockquote>

          <div className="border-y border-brand-border py-8">
            <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Recommendation</p>
            <p className="mt-4 font-display text-2xl leading-snug text-brand-navy md:text-3xl">{copy.recommendation}</p>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/belonging"
              className="ak-call-button inline-flex items-center justify-between gap-6 px-5 py-4 text-[11px] uppercase tracking-[0.16em]"
            >
              Find out if you belong
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <Link
              href={`/situations/${next.slug}`}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-brand-graphite transition-colors hover:text-brand-brass"
            >
              Next: {next.navLabel}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </article>

      <CTA
        title="Request Intelligence."
        description={`For ${landing.navLabel.toLowerCase()}, tell us the decision in front of you — Assessment, Snapshot, Report, or Dossier.`}
        href="/contact"
        label="Request Intelligence"
        eyebrow="Request Intelligence"
      />
    </main>
  );
}
