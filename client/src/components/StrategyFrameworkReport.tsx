import { frameworkSteps, frameworkTiers } from "@/data/acquisition-framework";
import { eyebrowOnLight } from "@/lib/brand-typography";

const sectionTitle = "font-serif text-2xl font-semibold text-brand-midnight md:text-[1.75rem]";

function TeamDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {[1, 2, 3, 4].map((dot) => (
        <span
          key={dot}
          className={`h-2 w-2 rounded-full ${dot <= level ? "bg-brand-champagne" : "bg-brand-midnight/12"}`}
        />
      ))}
    </div>
  );
}

function FrameworkLevel({ tier, isLast }: { tier: (typeof frameworkTiers)[number]; isLast: boolean }) {
  return (
    <section className={isLast ? "" : "pb-16 md:pb-20"}>
      <div className="flex flex-col gap-6 border-t border-brand-midnight/10 pt-12 md:flex-row md:items-start md:justify-between md:gap-10 md:pt-14">
        <div className="md:w-48 md:shrink-0">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-brand-champagne-dark">
            Level 0{tier.level}
          </p>
          <h3 className="mt-2 font-serif text-3xl font-semibold leading-tight text-brand-midnight md:text-4xl">
            {tier.levelName}
          </h3>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-graphite/58">
            {tier.band}
          </p>
          <div className="mt-5">
            <TeamDots level={tier.level} />
          </div>
        </div>

        <div className="min-w-0 flex-1 md:max-w-2xl">
          <dl className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne-dark">
                Team size
              </dt>
              <dd className="mt-1 font-serif text-xl font-semibold text-brand-midnight">{tier.teamSize}</dd>
            </div>
            <div>
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne-dark">
                Risk
              </dt>
              <dd className="mt-1 font-serif text-xl font-semibold text-brand-midnight">{tier.risk}</dd>
            </div>
            <div>
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne-dark">
                Duration
              </dt>
              <dd className="mt-1 font-serif text-xl font-semibold text-brand-midnight">{tier.duration}</dd>
            </div>
          </dl>

          <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne-dark">
            Typical buyer
          </p>
          <p className="mt-2 text-base leading-7 text-brand-graphite/82">{tier.typicalBuyers.join(" · ")}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-14">
        <div className="space-y-10">
          <div>
            <h4 className={sectionTitle}>Why this matters</h4>
            <p className="mt-3 text-base leading-7 text-brand-graphite/82">{tier.whyItMatters}</p>
          </div>

          <div>
            <h4 className={sectionTitle}>Advisory team</h4>
            <dl className="mt-5 space-y-5">
              {tier.roleGroups.map((group) => (
                <div key={group.label} className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-6">
                  <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-midnight">
                    {group.label}
                  </dt>
                  <dd className="text-base leading-7 text-brand-graphite/82">{group.roles.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <blockquote className="border-l-2 border-brand-champagne pl-5 lg:mt-2">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne-dark">
            Strategic observation
          </p>
          <p className="mt-4 font-serif text-xl leading-relaxed text-brand-midnight">{tier.strategicObservation}</p>
        </blockquote>
      </div>
    </section>
  );
}

export function StrategyFrameworkReport() {
  return (
    <section className="bg-brand-ivory px-6 py-14 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <p className={eyebrowOnLight}>Acquisition Complexity Framework™</p>
        <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-brand-midnight md:text-5xl">
          Four Levels. One Progression.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-brand-graphite/82">
          As deal size increases, complexity, risk, and timeline expand together. The advisory team should reflect
          what is actually at stake — not the square footage on a floor plan.
        </p>

        <ol className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-graphite/68">
          {frameworkSteps.map((step, idx) => (
            <li key={step}>
              <span className="font-semibold text-brand-champagne-dark">{idx + 1}.</span> {step}
            </li>
          ))}
        </ol>

        <div className="mt-12 hidden md:grid md:grid-cols-4 md:gap-8">
          {frameworkTiers.map((tier) => (
            <div key={tier.id}>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne-dark">
                Level 0{tier.level}
              </p>
              <p className="mt-2 font-serif text-lg font-semibold text-brand-midnight">{tier.levelName}</p>
              <p className="mt-1 text-xs text-brand-graphite/58">{tier.band}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 md:mt-16">
          {frameworkTiers.map((tier, idx) => (
            <FrameworkLevel key={tier.id} tier={tier} isLast={idx === frameworkTiers.length - 1} />
          ))}
        </div>

        <div className="mt-16 border-t border-brand-midnight/10 pt-10">
          <p className="font-serif text-2xl leading-relaxed text-brand-midnight md:text-3xl">
            Sophisticated buyers purchase certainty, coordination, expertise — and fewer expensive errors.
          </p>
          <p className="mt-3 text-base leading-7 text-brand-graphite/72">The apartment is only part of the decision.</p>
        </div>
      </div>
    </section>
  );
}
