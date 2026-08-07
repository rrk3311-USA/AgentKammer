import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const quickAnswers = [
  { q: "Lien imposed by law to secure payment of taxes?", a: "Tax lien" },
  { q: "Document making one claim junior to another?", a: "Subordination agreement" },
  { q: "Easement benefiting a person or entity, not a dominant estate?", a: "Easement in gross" },
  {
    q: "Permission to use another's land that is usually personal and revocable?",
    a: "License",
  },
  {
    q: "Architects hired, unpaid, and filed a claim for services?",
    a: "Mechanic's / construction lien (where statute allows design professionals)",
  },
  { q: "Lien created by the owner's agreement (e.g. mortgage)?", a: "Voluntary lien" },
  { q: "Lien created by law without the owner's consent?", a: "Involuntary lien" },
  { q: "Lien that can reach multiple assets of the debtor?", a: "General lien" },
  { q: "Lien that attaches only to a particular property?", a: "Specific lien" },
  { q: "Notice that a lawsuit may affect title?", a: "Lis pendens" },
  {
    q: "Easement created by express words in a deed or agreement?",
    a: "Easement by grant (express)",
  },
  {
    q: "Easement implied from circumstances / prior use patterns?",
    a: "Easement by implication",
  },
  {
    q: "Access easement when a landlocked parcel needs a way out?",
    a: "Easement by necessity",
  },
  {
    q: "Easement from open, notorious, continuous, hostile use for the statutory period?",
    a: "Easement by prescription",
  },
  {
    q: "Easement taken by government through eminent domain?",
    a: "Easement by condemnation",
  },
  { q: "Right to use another's land for a purpose (interest in land)?", a: "Easement" },
  { q: "Personal privilege to use land that usually does not run with title?", a: "License" },
  { q: "Anything that burdens title or use of property?", a: "Encumbrance" },
  {
    q: "Lien protecting unpaid labor or materials that improved the property?",
    a: "Mechanic's lien",
  },
  {
    q: "When does a judgment lien typically take effect against real property?",
    a: "When entered / docketed in the court record (rules vary by state)",
  },
  {
    q: "Is a property tax lien usually general or specific?",
    a: "Specific (it attaches to that property); federal tax liens are often general",
  },
] as const;

const lienTypes = [
  {
    title: "Voluntary",
    how: "Created by the owner (consensual)",
    example: "Mortgage / deed of trust",
    point: "Contractual security the owner agrees to.",
  },
  {
    title: "Involuntary",
    how: "Created by law",
    example: "Tax lien, mechanic's lien, judgment lien",
    point: "Not created by the owner's agreement.",
  },
  {
    title: "General",
    how: "Against the debtor personally",
    example: "Many judgment liens; federal tax liens (often)",
    point: "Creditor may pursue multiple assets, not just one parcel.",
  },
  {
    title: "Specific",
    how: "Against a particular property",
    example: "Mortgage, mechanic's lien, property tax lien",
    point: "Attaches to a defined parcel (or improvement claim on it).",
  },
  {
    title: "Mechanic's lien",
    how: "Statute protecting labor / materials",
    example: "Unpaid contractor or supplier",
    point: "Filed by those who improve the property (deadlines are strict).",
  },
] as const;

const easementTypes = [
  {
    title: "Easement appurtenant",
    detail:
      "Benefits a dominant estate and burdens a servient estate. Usually runs with the land when ownership changes.",
  },
  {
    title: "Easement in gross",
    detail: "Benefits a person or entity (often a utility), not a dominant estate.",
  },
  {
    title: "Easement by grant (express)",
    detail: "Created by clear written words in a deed or agreement.",
  },
  {
    title: "Easement by implication",
    detail:
      "Not written out, but implied from prior use when land was commonly owned and then divided (details vary by state).",
  },
  {
    title: "Easement by necessity",
    detail: "Arises when a conveyance leaves a parcel without reasonable access.",
  },
  {
    title: "Easement by prescription",
    detail:
      "Open, notorious, continuous, and hostile use for the statutory period. Hostile here means without permission, not 'angry.' Elements and years vary by state.",
  },
  {
    title: "Easement by condemnation",
    detail: "Created when government takes an easement interest through eminent domain.",
  },
] as const;

const reminders = [
  {
    title: "Lien effect",
    detail: "Priority and attachment often turn on recording / docketing rules in that state.",
  },
  {
    title: "Tax liens",
    detail:
      "Property tax liens are typically involuntary and specific. Broader 'tax lien' exam language sometimes means a general federal tax lien - read the question.",
  },
  {
    title: "Mechanic's liens",
    detail: "Protect unpaid labor or materials; filing windows and notice rules are unforgiving.",
  },
  {
    title: "Lis pendens",
    detail:
      "Public notice that litigation may affect title. It warns buyers and lenders; it is not itself a money lien or the lawsuit.",
  },
] as const;

const memoryTips = [
  "Property tax lien: involuntary + specific (usually superior priority)",
  "Federal / many judgment liens: can be general",
  "Lis pendens: notice of pending litigation - not itself a money lien",
  "Mechanic's lien: unpaid labor or materials that improved the property",
  "Easement: right to use (interest in land)",
  "License: permission (usually personal / revocable)",
  "Encumbrance: anything that burdens title or use",
] as const;

const chapters = [
  {
    id: "liens",
    kicker: "Chapter I",
    title: "Types of liens",
    lead: "A lien is a claim against property to secure a debt or obligation. Sort every lien by how it was created and what it attaches to.",
    art: "/guides/liens-easements/liens-chapter-liens.png",
    artAlt: "Illustration of a townhouse with a sealed lien notice motif",
  },
  {
    id: "easements",
    kicker: "Chapter II",
    title: "Types of easements",
    lead: "An easement is a right to use someone else's land for a purpose. Creation method is the exam distinction that matters.",
    art: "/guides/liens-easements/liens-chapter-easements.png",
    artAlt: "Parcel map showing an easement path between two lots",
  },
  {
    id: "license",
    kicker: "Chapter III",
    title: "Easement vs license",
    lead: "These get confused constantly. One is an interest in land. The other is usually a personal permission.",
    art: "/guides/liens-easements/liens-chapter-license.png",
    artAlt: "Split illustration of a map path versus a key and permission document",
  },
  {
    id: "memory",
    kicker: "Chapter IV",
    title: "Quick answers & memory",
    lead: "Drill the distinctions, then use the quick-answer list when a question is really asking for a definition.",
    art: "/guides/liens-easements/liens-chapter-memory.png",
    artAlt: "Editorial study desk with notebook and fountain pen",
  },
] as const;

export default function LiensEasements() {
  usePageMetadata({
    title: "Liens, Easements & Related Concepts",
    description:
      "A clear guide to voluntary and involuntary liens, easement types, easement vs license, lis pendens, and encumbrances - educational overview.",
    path: "/guides/liens-easements",
  });

  return (
    <main className="bg-brand-ivory text-brand-ink">
      <style>{`
        @keyframes le-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes le-ken {
          from { transform: scale(1.04); }
          to { transform: scale(1); }
        }
        .le-fade-up { animation: le-fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .le-fade-up-delay { animation: le-fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both; }
        .le-cover-zoom { animation: le-ken 14s ease-out both; }
      `}</style>

      <section className="relative overflow-hidden bg-brand-midnight text-brand-ivory">
        <div className="relative min-h-[min(78vh,720px)] w-full">
          <img
            src="/guides/liens-easements/liens-easements-cover.png"
            alt="Editorial cover art: survey map with an easement path and lien seal motifs"
            className="le-cover-zoom absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-brand-midnight/60 to-brand-midnight/30"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-brand-midnight/85 via-brand-midnight/40 to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto flex min-h-[min(78vh,720px)] max-w-site flex-col justify-end px-6 pb-14 pt-28 sm:px-8 lg:px-10 lg:pb-20">
            <p className="le-fade-up text-[10px] uppercase tracking-[0.28em] text-brand-champagne">
              Educational guide
            </p>
            <h1 className="le-fade-up-delay mt-5 max-w-[14ch] font-display text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.03em]">
              Liens, Easements & Related Concepts
            </h1>
            <p className="le-fade-up-delay mt-6 max-w-lg text-lg leading-8 text-brand-ivory/80">
              Pass the distinction test: what burdens title, what creates a right to use, and what is only permission.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto max-w-site px-6 py-16 sm:px-8 lg:grid lg:grid-cols-[1fr_1.35fr] lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">Opening</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] text-brand-navy">
              Know the difference
            </h2>
          </div>
          <div className="mt-8 space-y-6 text-[17px] leading-8 text-brand-graphite lg:mt-0">
            <p>
              Liens secure money claims. Easements create rights to use land. Licenses grant permission. Encumbrance is
              the umbrella word for burdens on title or use. Educational overview only - not legal advice. State rules
              (especially mechanic's liens and prescription periods) vary.
            </p>
            <p>
              When a question asks "what is it?", answer with the category first, then the example. When it asks "how
              was it created?", look for consent, statute, necessity, or long use.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-white">
        <div className="mx-auto max-w-site px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">The chapters</p>
              <h2 className="mt-3 font-display text-[clamp(1.85rem,3vw,2.5rem)] leading-[0.95] text-brand-navy">
                Four ways to hold the map
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-brand-graphite/75">
              Liens · easements · license contrast · quick answers
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {chapters.map((chapter, index) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="group relative block overflow-hidden bg-brand-midnight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-brass"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={chapter.art}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brand-midnight/90 via-brand-midnight/25 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-brand-champagne/85 sm:text-[10px]">
                    {chapter.kicker}
                  </p>
                  <p className="mt-1 font-display text-[clamp(1.05rem,2vw,1.35rem)] leading-tight text-brand-ivory">
                    {chapter.title}
                  </p>
                </div>
                <span className="sr-only">
                  Jump to {chapter.title}, section {index + 1}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="liens" className="scroll-mt-20 border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto max-w-site px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-14">
            <figure className="overflow-hidden bg-brand-midnight/5">
              <img
                src={chapters[0].art}
                alt={chapters[0].artAlt}
                className="aspect-[4/5] w-full object-cover sm:aspect-square lg:aspect-[4/5]"
                loading="lazy"
              />
              <figcaption className="border-t border-brand-navy/10 px-1 py-3 text-[11px] uppercase tracking-[0.16em] text-brand-graphite/55">
                {chapters[0].kicker}
              </figcaption>
            </figure>
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-brand-brass">{chapters[0].kicker}</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.92] tracking-[-0.02em] text-brand-navy">
                {chapters[0].title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-brand-graphite sm:text-lg">{chapters[0].lead}</p>

              <div className="mt-10 overflow-x-auto border border-brand-navy/10 bg-white">
                <table className="min-w-[640px] w-full text-left text-[13px]">
                  <thead className="bg-brand-navy text-[10px] uppercase tracking-[0.12em] text-brand-ivory">
                    <tr>
                      <th className="px-3 py-3 font-semibold">Type</th>
                      <th className="px-3 py-3 font-semibold">How created</th>
                      <th className="px-3 py-3 font-semibold">Example</th>
                      <th className="px-3 py-3 font-semibold">Key point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lienTypes.map((row, i) => (
                      <tr key={row.title} className={i % 2 === 0 ? "bg-[#eef2f7]" : "bg-white"}>
                        <td className="border-l-4 border-brand-brass px-3 py-3 font-semibold text-brand-navy">
                          {row.title}
                        </td>
                        <td className="px-3 py-3 text-brand-graphite">{row.how}</td>
                        <td className="px-3 py-3 text-brand-graphite">{row.example}</td>
                        <td className="px-3 py-3 text-brand-graphite">{row.point}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {reminders.map((item) => (
                  <div key={item.title} className="border border-brand-navy/10 bg-white px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-brass">
                      {item.title}
                    </p>
                    <p className="mt-2 text-[13px] leading-6 text-brand-graphite">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="easements" className="scroll-mt-20 border-b border-brand-border bg-white">
        <div className="mx-auto max-w-site px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-14">
            <figure className="overflow-hidden bg-brand-midnight/5">
              <img
                src={chapters[1].art}
                alt={chapters[1].artAlt}
                className="aspect-[4/5] w-full object-cover sm:aspect-square lg:aspect-[4/5]"
                loading="lazy"
              />
              <figcaption className="border-t border-brand-navy/10 px-1 py-3 text-[11px] uppercase tracking-[0.16em] text-brand-graphite/55">
                {chapters[1].kicker}
              </figcaption>
            </figure>
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-brand-brass">{chapters[1].kicker}</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.92] tracking-[-0.02em] text-brand-navy">
                {chapters[1].title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-brand-graphite sm:text-lg">{chapters[1].lead}</p>
              <ol className="mt-10 max-w-3xl">
                {easementTypes.map((item) => (
                  <li
                    key={item.title}
                    className="grid gap-2 border-t border-brand-navy/10 py-6 first:border-t-0 sm:grid-cols-[minmax(10rem,0.95fr)_minmax(0,1.3fr)] sm:gap-8"
                  >
                    <h3 className="font-display text-[clamp(1.35rem,2.2vw,1.75rem)] leading-tight text-brand-navy">
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-7 text-brand-graphite/90">{item.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="license" className="scroll-mt-20 border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto max-w-site px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-14">
            <figure className="overflow-hidden bg-brand-midnight/5">
              <img
                src={chapters[2].art}
                alt={chapters[2].artAlt}
                className="aspect-[4/5] w-full object-cover sm:aspect-square lg:aspect-[4/5]"
                loading="lazy"
              />
              <figcaption className="border-t border-brand-navy/10 px-1 py-3 text-[11px] uppercase tracking-[0.16em] text-brand-graphite/55">
                {chapters[2].kicker}
              </figcaption>
            </figure>
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-brand-brass">{chapters[2].kicker}</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.92] tracking-[-0.02em] text-brand-navy">
                {chapters[2].title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-brand-graphite sm:text-lg">{chapters[2].lead}</p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="border border-emerald-400/40 bg-emerald-50/80 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-800">Easement</p>
                  <ul className="mt-4 space-y-2.5 text-[13px] leading-6 text-brand-navy">
                    <li>Interest in land (a right to use for a purpose)</li>
                    <li>Often longer-term and more durable</li>
                    <li>Appurtenant easements usually run with the land</li>
                    <li>Not casually revoked the way a license often can be</li>
                  </ul>
                </div>
                <div className="border border-brand-brass/40 bg-[#fbf6ec] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a6f3a]">License</p>
                  <ul className="mt-4 space-y-2.5 text-[13px] leading-6 text-brand-navy">
                    <li>Permission / personal privilege (not an ownership interest)</li>
                    <li>Usually temporary or revocable</li>
                    <li>Does not typically run with the land</li>
                    <li>Think guest permission, ticket, short-term allowed use</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="memory" className="scroll-mt-20 border-b border-brand-border bg-white">
        <div className="mx-auto max-w-site px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-14">
            <figure className="overflow-hidden bg-brand-midnight/5">
              <img
                src={chapters[3].art}
                alt={chapters[3].artAlt}
                className="aspect-[4/5] w-full object-cover sm:aspect-square lg:aspect-[4/5]"
                loading="lazy"
              />
              <figcaption className="border-t border-brand-navy/10 px-1 py-3 text-[11px] uppercase tracking-[0.16em] text-brand-graphite/55">
                {chapters[3].kicker}
              </figcaption>
            </figure>
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-brand-brass">{chapters[3].kicker}</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.92] tracking-[-0.02em] text-brand-navy">
                {chapters[3].title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-brand-graphite sm:text-lg">{chapters[3].lead}</p>

              <ul className="mt-8 space-y-2">
                {memoryTips.map((tip) => (
                  <li
                    key={tip}
                    className="flex gap-2.5 border border-sky-200/80 bg-sky-50/70 px-3 py-2.5 text-[13px] leading-5 text-brand-navy"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                    {tip}
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy/55">
                  Quick answer drill
                </p>
                <ol className="mt-4 divide-y divide-brand-navy/10 border border-brand-navy/10 bg-brand-ivory">
                  {quickAnswers.map((item, index) => (
                    <li key={item.q} className="grid gap-1 px-4 py-3 sm:grid-cols-[2.5rem_minmax(0,1.2fr)_minmax(0,0.9fr)] sm:items-baseline sm:gap-4">
                      <span className="text-[11px] font-semibold text-brand-brass">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] leading-5 text-brand-graphite">{item.q}</span>
                      <span className="text-[13px] font-semibold text-emerald-800">{item.a}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight text-brand-ivory">
        <div className="mx-auto max-w-site px-6 py-16 sm:px-8 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-brand-champagne">Closing</p>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.94]">
              Focus on definitions. Understand the distinctions.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-brand-ivory/75">
              If you can sort claim vs right vs permission - and voluntary vs involuntary, general vs specific - most
              exam-style questions fall into place.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 lg:mt-0 lg:items-end">
            <Link
              href="/guides/real-estate-deeds"
              className="group inline-flex items-center gap-3 border border-brand-champagne/40 px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-brand-champagne transition hover:border-brand-champagne hover:bg-brand-champagne/10"
            >
              Deeds guide
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-ivory/55 transition hover:text-brand-ivory"
            >
              All guides
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
