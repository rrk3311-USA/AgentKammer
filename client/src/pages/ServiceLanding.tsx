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
    "The recommendation may be to buy, sell, rent, wait, renovate, or do nothing yet. Whichever protects the client best.";

  const quoteRaw =
    landing.depthNotes?.[1] ??
    "The first win is clarity: what changed, whether action is required, and which path protects the client best.";
  const quote = quoteRaw.replace(/^["“]|["”]$/g, "");

  const recommendation =
    landing.depthNotes?.[landing.depthNotes.length - 1] ??
    `For ${landing.navLabel.toLowerCase()}, begin with whether anything should change. Then choose the path with the highest expected value.`;

  return { paragraphOne, paragraphTwo, paragraphThree, quote, recommendation };
}

function nextBrief(slug: string) {
  if (slug === "corporate-relocation-buyers-nyc") {
    return serviceLandingMap["executive-relocation-nyc"] ?? serviceLandings[0];
  }
  if (slug === "condo-vs-coop") {
    return serviceLandingMap["coop-condo-condop-terms"] ?? serviceLandings[0];
  }
  if (slug === "coop-condo-condop-terms") {
    return serviceLandingMap["pied-a-terre-buyers-nyc"] ?? serviceLandings[0];
  }
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
  const editorialLayout = Boolean(landing?.heroImage) || landing?.slug === "rent-vs-buy-manhattan-relocation";

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
        <section
          className="relative w-full overflow-hidden border-b border-brand-border"
          style={{ backgroundColor: landing.heroPaper ?? "#F5E7CD" }}
        >
          <img
            src={`${landing.heroImage}?v=15`}
            alt=""
            className="block h-[clamp(270px,68vw,360px)] w-[112%] max-w-none translate-x-[6%] object-cover object-[62%_28%] opacity-[0.92] pt-6 sm:h-auto sm:w-full sm:max-w-full sm:translate-x-0 sm:object-contain sm:object-right sm:opacity-100 sm:pt-8 sm:max-h-[min(56vh,520px)] lg:max-h-[min(52vh,560px)] lg:pt-10"
          />
          {/* Mobile cream wash - light only, so the art still reads */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[55%] sm:hidden"
            style={{
              background: `linear-gradient(to right, ${landing.heroPaper ?? "#F5E7CD"}, ${landing.heroPaper ?? "#F5E7CD"}B3, transparent)`,
            }}
            aria-hidden
          />
          <div className="absolute inset-0 flex items-start sm:items-center">
            <div className="w-full px-6 pt-14 pb-10 sm:pt-20 md:pl-[12%] lg:px-10 lg:pb-12 lg:pl-[clamp(4rem,18vw,14rem)] lg:pt-24 xl:pl-[clamp(5rem,22vw,18rem)]">
              <p className="ak-kicker">{landing.eyebrow}</p>
              <h1 className="ak-display mt-5 max-w-[12ch] sm:mt-4 sm:max-w-[16ch]">
                {landing.title}
              </h1>
            </div>
          </div>
        </section>
      ) : editorialLayout ? (
        <section className="relative w-full overflow-hidden border-b border-brand-border bg-brand-ivory">
          <div className="relative grid min-h-[clamp(300px,78vw,420px)] w-full grid-cols-1 sm:min-h-[min(52vh,520px)] sm:grid-cols-[minmax(16rem,48%)_1fr] lg:min-h-[min(48vh,560px)]">
            {/* Title column - reserved width so it cannot collide with art */}
            <div className="relative z-10 flex items-start px-6 pb-8 pt-14 sm:items-center sm:pb-12 sm:pt-16 md:pl-[12%] lg:px-10 lg:pl-[clamp(4rem,18vw,14rem)] lg:pt-20 xl:pl-[clamp(5rem,22vw,18rem)]">
              <div className="w-full max-w-[18.5rem] sm:max-w-[26rem]">
                <p className="ak-kicker">{landing.eyebrow}</p>
                <h1 className="ak-display mt-4 max-w-[11ch] sm:max-w-[14ch]">
                  {landing.title}
                </h1>
              </div>
            </div>
            {/* Art column - only in the right grid track on sm+; lower/right on mobile */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] flex items-end justify-end overflow-hidden sm:static sm:inset-auto sm:flex sm:items-center sm:justify-end sm:pr-6 lg:pr-10">
              <ArchitecturalHeroDrawing
                eyebrow={landing.eyebrow}
                title={landing.title}
                variant={landing.art}
                className="mb-[-4%] mr-[-16%] w-[78%] max-w-[18rem] opacity-40 sm:mb-0 sm:mr-0 sm:w-[92%] sm:max-w-[30rem] sm:opacity-85 lg:max-w-[32rem]"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[82%] bg-gradient-to-r from-brand-ivory from-[48%] via-brand-ivory/90 to-transparent sm:hidden"
              aria-hidden
            />
          </div>
        </section>
      ) : (
        <section className="border-b border-brand-border">
          <div className="mx-auto max-w-site px-6 pb-10 pt-14 lg:px-10 lg:pb-14 lg:pt-20">
            <p className="ak-kicker">{landing.eyebrow}</p>
            <h1 className="ak-display mt-4 max-w-4xl">
              {landing.title}
            </h1>
          </div>
          <div className="relative mx-auto flex aspect-[16/9] max-h-[420px] w-full max-w-site items-center justify-center overflow-hidden bg-brand-paper lg:aspect-[21/9]">
            <ArchitecturalHeroDrawing
              eyebrow={landing.eyebrow}
              title={landing.title}
              variant={landing.art}
              className="flex w-full max-w-4xl items-center justify-center px-8 [&_svg]:max-w-none"
            />
          </div>
        </section>
      )}

      {/* Article body: three paragraphs + quote + recommendation */}
      <article className="border-b border-brand-border">
        <div
          className={
            editorialLayout
              ? "mx-auto max-w-[90%] pb-14 pt-7 text-left sm:mx-0 sm:ml-[clamp(1.5rem,18vw,22.5rem)] sm:mr-6 sm:max-w-[680px] sm:pb-16 sm:pt-8 lg:mr-10 lg:pb-24 lg:pt-10"
              : "mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24"
          }
        >
          {landing.slug === "condo-vs-coop" ? (
            <p className="mb-8 border border-brand-border bg-white/60 px-4 py-3 text-sm leading-6 text-brand-graphite">
              Keep a printable checklist:{" "}
              <a
                href="/guides/condo-coop-reference.html"
                className="text-brand-navy underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                condo vs co-op reference
              </a>
              . Vocabulary:{" "}
              <Link href="/situations/coop-condo-condop-terms" className="text-brand-navy underline underline-offset-4">
                co-op, condo &amp; condop terms
              </Link>
              . Buying from overseas?{" "}
              <Link href="/situations/condo-vs-coop-foreign-buyers-nyc" className="text-brand-navy underline underline-offset-4">
                Foreign-buyer structure brief
              </Link>
              .
            </p>
          ) : null}
          {landing.slug === "coop-condo-condop-terms" ? (
            <p className="mb-8 border border-brand-border bg-white/60 px-4 py-3 text-sm leading-6 text-brand-graphite">
              Keep the comparison chart open:{" "}
              <a
                href="/guides/coop-condo-condop-terms.html"
                className="text-brand-navy underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                co-op, condo &amp; condop terms
              </a>
              . Start with structure:{" "}
              <Link href="/situations/condo-vs-coop" className="text-brand-navy underline underline-offset-4">
                Condo vs co-op
              </Link>
              .
            </p>
          ) : null}
          {landing.slug === "corporate-relocation-buyers-nyc" ? (
            <p className="mb-8 border border-brand-border bg-white/60 px-4 py-3 text-sm leading-6 text-brand-graphite">
              Looking for the main relocation path? Start with{" "}
              <Link href="/situations/executive-relocation-nyc" className="text-brand-navy underline underline-offset-4">
                Executive Relocation
              </Link>{" "}
              or compare{" "}
              <Link href="/situations/rent-vs-buy-manhattan-relocation" className="text-brand-navy underline underline-offset-4">
                Rent vs Buy
              </Link>
              .
            </p>
          ) : null}
          <p
            className={
              editorialLayout
                ? "ak-lede"
                : "ak-lede"
            }
          >
            {copy.paragraphOne}
          </p>
          <p
            className={
              editorialLayout
                ? "ak-copy mt-6 sm:mt-8"
                : "ak-copy mt-8"
            }
          >
            {copy.paragraphTwo}
          </p>
          <p
            className={
              editorialLayout
                ? "ak-copy mt-6 sm:mt-8"
                : "ak-copy mt-8"
            }
          >
            {copy.paragraphThree}
          </p>

          <blockquote className="my-12 border-l-2 border-brand-border pl-6">
            <p className="ak-title">
              “{copy.quote}”
            </p>
          </blockquote>

          <div className="border-y border-brand-border py-8">
            <p className="ak-kicker">Recommendation</p>
            <p className="ak-heading mt-4">{copy.recommendation}</p>
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
        title="If this situation is yours."
        description={`For ${landing.navLabel.toLowerCase()}, start with the Situation Assessment, or request a Property Assessment if an address is already in play.`}
        href="/belonging"
        label="Situation Assessment"
        eyebrow="Start Here"
      />
    </main>
  );
}
