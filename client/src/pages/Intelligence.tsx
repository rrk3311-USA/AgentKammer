import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { GrammarRows } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const briefs = [
  {
    date: "July 2026",
    title: "Prime buildings still hold; secondary inventory needs sharper negotiation.",
    observation:
      "Well-positioned Manhattan condominiums with clear identity and service quality are retaining asking discipline. Secondary or less distinctive inventory is absorbing more buyer leverage.",
    implication:
      "If the brief points to a top-tier address, waiting for a dramatic price break may waste time. If the brief is flexible across buildings, negotiate harder and widen the shortlist.",
    posture: "Negotiate selectively · Do not force a weak building",
  },
  {
    date: "July 2026",
    title: "Relocation clients are buying turnkey service over raw square footage.",
    observation:
      "Executives and international movers on compressed timelines are prioritizing concierge quality, lock-and-leave ease, and predictable building operations. Even when that means fewer rooms.",
    implication:
      "For 60-120 day arrivals, rent-first or amenity-strong condominiums often beat a co-op board process. For longer horizons, co-op value can still win if board timing is realistic.",
    posture: "Rent first when the clock is short · Buy when residency is stable",
  },
  {
    date: "June 2026",
    title: "Neighborhood choice remains the highest-leverage decision before listings.",
    observation:
      "Buyers who start with apartments before geography burn weeks comparing incompatible lifestyles. UWS school logic, Tribeca loft scale, and FiDi commute convenience are different products.",
    implication:
      "Lock a neighborhood thesis, or a two-neighborhood band, before touring. Building reports only become efficient after geography is narrowed.",
    posture: "Choose geography first · Then study buildings",
  },
  {
    date: "June 2026",
    title: "New-development concessions are real; carrying costs still decide fit.",
    observation:
      "Sponsor incentives can improve entry price, but common charges, tax abatement cliffs, and resale depth determine whether the deal remains sensible five years later.",
    implication:
      "Model total cost of ownership against a comparable resale building before treating a concession as a win. Some buyers should still prefer established stock.",
    posture: "Pressure-test concessions · Compare against resale alternatives",
  },
];

export default function Intelligence() {
  usePageMetadata({
    title: "Market Briefs",
    description:
      "Manhattan market briefs on pricing pressure, relocation timing, neighborhood leverage, and whether to buy, wait, or negotiate.",
    path: "/building-reports/market-briefs",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Reports"
        title="Market Briefs"
        description="Short reads that answer one question: what should this change in your decision. Timing, budget, neighborhood, building selection, or negotiation posture?"
        art="market-briefs"
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Current Briefs"
          title="Market notes should change a recommendation, not just describe the weather."
          description="Each brief pairs an observation with a decision implication and a recommended posture: move, negotiate, wait, widen the search, or do nothing yet."
        />
        <GrammarRows
          items={briefs.map((brief) => ({
            eyebrow: brief.date,
            title: brief.title,
            text: (
              <>
                <p>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-brand-cocoa">Observation. </span>
                  {brief.observation}
                </p>
                <p className="mt-3">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-brand-cocoa">Implication. </span>
                  {brief.implication}
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-brand-navy">Posture: {brief.posture}</p>
              </>
            ),
          }))}
        />
      </PageSection>

      <CTA
        title="Need the brief translated into a live decision?"
        description="Write if you want market context turned into a recommendation for your timing, building target, or neighborhood plan."
        href="/contact"
        label="Contact"
        eyebrow="Contact"
      />
    </main>
  );
}
