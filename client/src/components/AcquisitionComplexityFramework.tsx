import type { ReactNode } from "react";
import { User } from "lucide-react";
import { frameworkSteps, frameworkTiers } from "@/data/acquisition-framework";
import { eyebrowOnDark } from "@/lib/brand-typography";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">{children}</p>
  );
}

function TeamVisual({ count, label }: { count: number; label: string }) {
  return (
    <div className="px-4 py-4 sm:px-5 sm:py-5">
      <SectionLabel>Team size</SectionLabel>
      <div className="mt-3 flex flex-wrap gap-1.5" aria-label={`${label} professionals`}>
        {Array.from({ length: count }).map((_, i) => (
          <User key={i} className="h-4 w-4 text-brand-champagne/90" strokeWidth={1.5} aria-hidden />
        ))}
      </div>
      <p className="mt-2 font-serif text-xl font-semibold text-brand-ivory">{label}</p>
      <p className="mt-1 text-xs text-brand-ivory/58">professionals typically involved</p>
    </div>
  );
}

function MetricCell({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-brand-ivory/10 px-4 py-4 sm:border-t-0 sm:border-l sm:px-5 sm:py-5 first:sm:border-l-0">
      <SectionLabel>{label}</SectionLabel>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function FrameworkStepsStrip() {
  return (
    <div className="mt-8 border border-brand-ivory/15 bg-brand-ivory/[0.03]">
      <div className="border-b border-brand-ivory/12 px-4 py-3 sm:px-5">
        <SectionLabel>Acquisition sequence</SectionLabel>
      </div>
      <div className="grid sm:grid-cols-5">
        {frameworkSteps.map((step, idx) => (
          <div
            key={step}
            className="border-b border-brand-ivory/10 px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-3 sm:py-4 sm:last:border-r-0 lg:px-4"
          >
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-brand-champagne/90">
              0{idx + 1}
            </p>
            <p className="mt-1 font-serif text-sm font-semibold leading-snug text-brand-ivory lg:text-[0.95rem]">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LevelProgression() {
  return (
    <div className="mt-8 border border-brand-ivory/15 bg-brand-ivory/[0.03]">
      <div className="border-b border-brand-ivory/12 px-4 py-3 sm:px-5">
        <SectionLabel>Complexity progression</SectionLabel>
      </div>
      <div className="grid lg:grid-cols-4">
        {frameworkTiers.map((tier) => (
          <div
            key={tier.id}
            className="border-b border-brand-ivory/10 px-4 py-5 last:border-b-0 lg:border-b-0 lg:border-r lg:px-5 lg:last:border-r-0"
          >
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-brand-champagne">
              Level {tier.level}
            </p>
            <p className="mt-2 font-serif text-lg font-semibold leading-snug text-brand-ivory">{tier.levelName}</p>
            <p className="mt-2 border-t border-brand-ivory/10 pt-2 text-xs text-brand-ivory/58">{tier.band}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TierLevelHeader({
  level,
  levelName,
  band,
}: {
  level: number;
  levelName: string;
  band: string;
}) {
  return (
    <header className="border-b border-brand-ivory/12 bg-brand-ivory/[0.04] px-5 py-5 sm:px-6 sm:py-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Level {level}</SectionLabel>
          <h3 className="mt-2 font-serif text-3xl font-semibold text-brand-ivory">{levelName}</h3>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-ivory/62">{band}</p>
      </div>
    </header>
  );
}

export function AcquisitionComplexityFramework() {
  return (
    <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-brand-ivory/12 pb-10">
          <p className={eyebrowOnDark}>Acquisition Complexity Framework™</p>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight text-brand-ivory md:text-4xl lg:text-[2.65rem]">
            How Complexity, Risk, And Team Scale Progress Together
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-ivory/88">
            Four levels of Manhattan acquisition — from core coordination to family-office scale. Each level adds
            structure, duration, and specialized roles.
          </p>

          <FrameworkStepsStrip />
          <LevelProgression />
        </div>

        <div className="mt-12 space-y-10 lg:mt-14">
          {frameworkTiers.map((tier) => (
            <article key={tier.id} className="border border-brand-ivory/15 bg-brand-sapphire/10">
              <TierLevelHeader level={tier.level} levelName={tier.levelName} band={tier.band} />

              <div className="grid sm:grid-cols-2 xl:grid-cols-4">
                <TeamVisual count={tier.teamVisualCount} label={tier.teamSize} />
                <MetricCell label="Risk level">
                  <p className="font-serif text-xl font-semibold text-brand-ivory">{tier.risk}</p>
                </MetricCell>
                <MetricCell label="Typical duration">
                  <p className="font-serif text-xl font-semibold text-brand-ivory">{tier.duration}</p>
                </MetricCell>
                <MetricCell label="Typical buyer">
                  <ul className="space-y-1 text-sm leading-6 text-brand-ivory/82">
                    {tier.typicalBuyers.map((buyer) => (
                      <li key={buyer}>{buyer}</li>
                    ))}
                  </ul>
                </MetricCell>
              </div>

              <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:divide-x lg:divide-brand-ivory/12">
                <div className="border-t border-brand-ivory/12">
                  <div className="border-b border-brand-ivory/10 px-5 py-4 sm:px-6">
                    <SectionLabel>Why this matters</SectionLabel>
                  </div>
                  <div className="px-5 py-5 sm:px-6 sm:py-6">
                    <p className="max-w-2xl text-base leading-7 text-brand-ivory/88">{tier.whyItMatters}</p>
                  </div>

                  <div className="border-t border-brand-ivory/12">
                    <div className="border-b border-brand-ivory/10 px-5 py-4 sm:px-6">
                      <SectionLabel>Advisory team</SectionLabel>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                      {tier.roleGroups.map((group, idx) => (
                        <div
                          key={group.label}
                          className={`border-b border-brand-ivory/10 px-5 py-5 sm:px-6 ${
                            idx % 2 === 0 ? "sm:border-r sm:border-brand-ivory/10" : ""
                          } lg:border-b-0 lg:border-r lg:last:border-r-0`}
                        >
                          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne">
                            {group.label}
                          </p>
                          <ul className="mt-3 space-y-1.5 text-sm leading-6 text-brand-ivory/85">
                            {group.roles.map((role) => (
                              <li key={role}>{role}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <aside className="border-t border-brand-ivory/12 bg-brand-ivory/[0.03] lg:border-t-0">
                  <div className="border-b border-brand-ivory/10 px-5 py-4 sm:px-6">
                    <SectionLabel>Strategic observation</SectionLabel>
                  </div>
                  <div className="px-5 py-6 sm:px-6 sm:py-8">
                    <p className="font-serif text-xl leading-relaxed text-brand-ivory/92 lg:text-[1.35rem] lg:leading-[1.55]">
                      {tier.strategicObservation}
                    </p>
                  </div>
                </aside>
              </div>
            </article>
          ))}
        </div>

        <blockquote className="mt-14 border-t border-brand-ivory/12 pt-10">
          <SectionLabel>Bottom line</SectionLabel>
          <p className="mt-4 max-w-3xl font-serif text-xl leading-relaxed text-brand-ivory md:text-2xl">
            Sophisticated buyers purchase certainty, coordination, expertise — and fewer expensive errors.
          </p>
          <p className="mt-3 text-base leading-7 text-brand-ivory/72">The apartment is only part of the decision.</p>
        </blockquote>
      </div>
    </section>
  );
}
