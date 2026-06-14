import { Fragment } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { acquisitionSteps, advisoryTeamTiers } from "@/data/acquisition-crew";

function ComplexityBars({ level }: { level: 1 | 2 | 3 | 4 }) {
  return (
    <div className="flex items-end gap-1" aria-hidden>
      {[1, 2, 3, 4].map((bar) => (
        <span
          key={bar}
          className={`w-1.5 rounded-sm ${
            bar <= level ? "bg-brand-champagne" : "bg-brand-ivory/20"
          }`}
          style={{ height: `${bar * 6 + 8}px` }}
        />
      ))}
    </div>
  );
}

function TierMeta({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne">{label}</p>
      <p className="mt-1 font-serif text-lg font-semibold leading-none text-brand-ivory">{value}</p>
      <p className="mt-1 text-xs leading-5 text-brand-ivory/72">{detail}</p>
    </div>
  );
}

export function AcquisitionCrewOverview() {
  return (
    <section className="bg-brand-midnight px-6 pb-14 pt-2 text-brand-ivory lg:px-10 lg:pb-16 lg:pt-3">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-3xl font-serif text-3xl font-semibold leading-tight text-brand-ivory md:text-4xl lg:text-[2.65rem]">
          Who Is Usually Involved — And How The Team Grows
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-brand-ivory/88">
          Complexity, risk, and timeline expand together. The advisory team should reflect what is actually at stake — not
          the square footage on a floor plan.
        </p>

        <div className="mt-6 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-1.5">
          {acquisitionSteps.map((step, idx) => (
            <Fragment key={step.title}>
              <div className="flex-1 border border-brand-midnight/10 bg-brand-ivory px-4 py-4 lg:px-5 lg:py-5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-champagne-dark">
                  0{idx + 1}
                </p>
                <p className="mt-1 font-serif text-base font-semibold leading-snug text-brand-midnight lg:text-[1.05rem]">
                  {step.title}
                </p>
              </div>
              {idx < acquisitionSteps.length - 1 && (
                <>
                  <ChevronDown
                    className="mx-auto h-4 w-4 shrink-0 text-brand-champagne/40 lg:hidden"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <ChevronRight
                    className="hidden h-4 w-4 shrink-0 text-brand-champagne/40 lg:block"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </>
              )}
            </Fragment>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:mt-8 lg:gap-5">
          {advisoryTeamTiers.map((tier) => (
            <article
              key={tier.id}
              className="border border-brand-ivory/20 bg-brand-sapphire/25 px-4 py-5 lg:px-6 lg:py-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-[160px] flex-col gap-1 lg:w-44 lg:shrink-0">
                  <h3 className="font-serif text-2xl font-semibold leading-tight text-brand-ivory">{tier.band}</h3>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne">
                    {tier.subtitle}
                  </p>
                </div>

                <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <TierMeta label="Team size" value={tier.teamSize} detail="Typical headcount" />
                  <TierMeta label="Risk level" value={tier.risk} detail={tier.riskDetail} />
                  <TierMeta label="Typical duration" value={tier.duration} detail={tier.durationDetail} />
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne">
                      Complexity
                    </p>
                    <div className="mt-2 flex items-end gap-3">
                      <ComplexityBars level={tier.complexity} />
                      <p className="text-xs leading-5 text-brand-ivory/72">Level {tier.complexity} of 4</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-brand-ivory/12 pt-5">
                {tier.roles.map((role) => (
                  <span
                    key={role}
                    className="border border-brand-ivory/22 bg-brand-midnight/55 px-3 py-1.5 text-sm leading-none text-brand-ivory/92"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </article>
            ))}

          <div className="border border-brand-ivory/20 bg-brand-ivory/[0.04] px-4 py-5 lg:px-6">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-brand-ivory/55">
              Typical Buyer Profiles
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {advisoryTeamTiers.map((tier) => (
                <div key={tier.id}>
                  <p className="font-serif text-base font-semibold text-brand-ivory">{tier.band}</p>
                  <ul className="mt-3 space-y-1.5">
                    {tier.buyerProfiles.map((profile) => (
                      <li key={profile} className="text-sm leading-6 text-brand-ivory/78">
                        {profile}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="mt-6 border border-brand-champagne/30 bg-brand-sapphire/20 px-5 py-4 lg:px-6">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">
            Strategic Observation
          </p>
          <p className="mt-2 font-serif text-base leading-relaxed text-brand-ivory md:text-lg">
            Above $20M, ownership structure often becomes more important than negotiating the final purchase price.
          </p>
        </aside>

        <blockquote className="mt-8 max-w-3xl border-l-2 border-brand-champagne pl-5">
          <p className="font-serif text-xl leading-relaxed text-brand-ivory md:text-2xl">
            Sophisticated buyers purchase certainty, coordination, and expertise — not expensive correction.
          </p>
          <p className="mt-3 text-base leading-7 text-brand-ivory/78">The residence is only part of the decision.</p>
        </blockquote>
      </div>
    </section>
  );
}
