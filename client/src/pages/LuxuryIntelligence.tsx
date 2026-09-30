import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { ContinueYourResearch } from "@/components/ContinueYourResearch";
import { IntelligenceReportsSubscribe } from "@/components/IntelligenceReportsSubscribe";
import { grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import {
  formatLuxuryIntelligenceDate,
  luxuryIntelligenceEdition,
  luxuryIntelligenceLibrary,
  luxuryIntelligencePath,
  luxuryIntelligenceSections,
  luxuryIntelligenceSummary,
} from "@/data/luxury-intelligence";

function Paragraphs({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line) => (
        <p key={line} className="mt-3 text-base leading-7 text-brand-graphite/78 first:mt-0">
          {line}
        </p>
      ))}
    </>
  );
}

export default function LuxuryIntelligence() {
  const edition = luxuryIntelligenceEdition;

  usePageMetadata({
    title: edition.title,
    description: luxuryIntelligenceSummary[1],
    path: luxuryIntelligencePath,
    keywords:
      "Manhattan luxury intelligence, modern Manhattan housing, building intelligence, executive relocation, Agent Kammer",
  });

  return (
    <main className="luxury-intelligence-edition min-h-screen bg-brand-ivory text-brand-graphite">
      <style>{`
        @media print {
          header, footer, [data-decision-assistant], .luxury-intelligence-chrome { display: none !important; }
          body, .ak-app-shell { background: #fff !important; }
          .luxury-intelligence-edition { background: #fff !important; color: #111 !important; }
          a { color: inherit !important; text-decoration: none !important; }
        }
      `}</style>

      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <Link href="/intelligence" className="luxury-intelligence-chrome">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-champagne transition hover:text-brand-ivory">
              ← Intelligence
            </span>
          </Link>
          <p className="mt-6 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand-ivory/62">
            {edition.series} · {edition.editionLabel} · {formatLuxuryIntelligenceDate(edition.publishedAt)} ·{" "}
            {edition.readMinutes} min read
          </p>
          <h1 className={`mt-4 ${grammar.displayOnDark}`}>{edition.title}</h1>
          <p className={`mt-4 ${grammar.bodyOnDark}`}>{edition.subtitle}</p>
          <div className="luxury-intelligence-chrome mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-12 items-center border border-brand-champagne/50 bg-transparent px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory transition hover:border-brand-ivory hover:text-brand-ivory"
            >
              Save as PDF
            </button>
            <a
              href="#library"
              className="inline-flex h-12 items-center border border-brand-ivory/20 px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-champagne transition hover:border-brand-champagne hover:text-brand-ivory"
            >
              Open the library
            </a>
          </div>
          <p className="luxury-intelligence-chrome mt-4 max-w-xl text-sm leading-6 text-brand-ivory/62">
            The web edition lives at this URL. Save as PDF writes a local copy from the browser print dialog.
          </p>
        </div>
      </section>

      <article className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Opening</p>
            <Paragraphs lines={luxuryIntelligenceSummary} />
          </section>

          <IntelligenceReportsSubscribe variant="light" className="luxury-intelligence-chrome" />
        </div>
      </article>

      <article className="border-t border-brand-midnight/10 px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {luxuryIntelligenceSections.map((section) => (
            <section key={section.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">{section.title}</p>
              <Paragraphs lines={section.paragraphs} />
              {"bullets" in section && section.bullets ? (
                <ul className="mt-4 space-y-2 border-l-2 border-brand-champagne/40 pl-5">
                  {section.bullets.map((item) => (
                    <li key={item} className="text-base leading-7 text-brand-graphite/78">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>

      <section id="library" className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Current library</p>
          <h2 className={`mt-3 ${grammar.section}`}>What is already written</h2>
          <p className="mt-4 text-base leading-7 text-brand-graphite/72">
            These are the live pieces this channel manages. The briefing is the door. The reports are the work.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {luxuryIntelligenceLibrary.map((item) => {
              const isStatic = item.href.startsWith("/resources") || item.href.endsWith(".html");
              const body = (
                <Card className="h-full rounded-none border border-brand-graphite/12 bg-brand-ivory/40 px-5 py-4 shadow-none transition hover:border-brand-champagne/45">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne-dark">
                    {item.kind}
                  </p>
                  <p className={`mt-2 ${grammar.rowTitle}`}>{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-brand-graphite/68">{item.description}</p>
                </Card>
              );
              return isStatic ? (
                <a key={item.href} href={item.href}>
                  {body}
                </a>
              ) : (
                <Link key={item.href} href={item.href}>
                  {body}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ContinueYourResearch />
      <IntelligenceReportsSubscribe variant="dark" className="luxury-intelligence-chrome border-t border-brand-midnight/10" />
    </main>
  );
}
