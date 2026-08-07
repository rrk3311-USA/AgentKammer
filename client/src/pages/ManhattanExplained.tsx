import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";

type Place = {
  name: string;
  meaning: string;
  aside?: string;
};

const dutch: Place[] = [
  {
    name: "Harlem",
    meaning: "Nieuw Haarlem - named for Haarlem in the Netherlands.",
  },
  {
    name: "Greenwich Village",
    meaning: 'From Dutch Groenwijck, a "green district" or green settlement.',
  },
  {
    name: "Gramercy",
    meaning: 'From Krom Moerasje - roughly "crooked little swamp."',
  },
  {
    name: "Bowery",
    meaning: "From bouwerij - farm. The road once led to the farms.",
  },
  {
    name: "Turtle Bay",
    meaning:
      "A former East River cove, most likely named for turtles that lived there.",
    aside:
      'A competing theory ties "Turtle" to a Dutch word (deutel/deutal) for a pin or the bay\'s shape. Historians still disagree.',
  },
  {
    name: "Stuyvesant",
    meaning:
      "After Peter Stuyvesant, last Dutch director-general of New Netherland.",
  },
];

const history: Place[] = [
  {
    name: "Wall Street",
    meaning:
      "Named for a defensive wall the Dutch built across lower Manhattan.",
  },
  {
    name: "Battery Park",
    meaning: "For the artillery batteries that once defended the harbor.",
  },
  {
    name: "Washington Heights",
    meaning: "After Fort Washington, the Revolutionary fort on the ridge.",
  },
  {
    name: "Fort George",
    meaning:
      "After a Revolutionary-era fort on the bluff, associated with King George - not George V.",
  },
  {
    name: "Hell's Kitchen",
    meaning: "A 19th-century nickname for a rough West Side district.",
    aside: "The exact origin is debated; several colorful stories survive.",
  },
  {
    name: "Tenderloin",
    meaning: 'Gilded Age slang for the "choice cut" of police graft territory.',
  },
];

const people: Place[] = [
  {
    name: "Hamilton Heights",
    meaning: "Alexander Hamilton lived nearby at The Grange.",
  },
  {
    name: "Carnegie Hill",
    meaning:
      "Industrialist Andrew Carnegie; his mansion still anchors the hill.",
  },
  {
    name: "Lenox Hill",
    meaning: "Merchant and landowner Robert Lenox.",
  },
  {
    name: "Times Square",
    meaning: "The New York Times moved its headquarters here in 1904.",
  },
  {
    name: "Chelsea",
    meaning: "Captain Thomas Clarke named his estate for Chelsea in London.",
    aside:
      'Sometimes linked to London\'s Chelsea / Royal Hospital Chelsea - not merely a "nursing home."',
  },
];

const streets: Place[] = [
  { name: "SoHo", meaning: "South of Houston Street." },
  { name: "NoHo", meaning: "North of Houston Street." },
  { name: "Tribeca", meaning: "Triangle Below Canal Street." },
  { name: "Nolita", meaning: "North of Little Italy." },
  {
    name: "Alphabet City",
    meaning: "Avenues A, B, C, and D - the far East Side grid made literal.",
  },
];

const chapters = [
  {
    id: "dutch",
    kicker: "Chapter I",
    title: "Dutch ground",
    lead: "Before the English renamed the colony, New Amsterdam left a vocabulary of farms, swamps, green districts, and Old World cities. Many of those words never left the map.",
    places: dutch,
    art: "/guides/manhattan/manhattan-chapter-dutch.png",
    artAlt:
      "Watercolor of a Dutch colonial farmhouse, orchard, and windmill across calm water",
    tone: "light" as const,
  },
  {
    id: "history",
    kicker: "Chapter II",
    title: "Forts, walls, nicknames",
    lead: "Some names are architecture and defense. Others are reputation - the city's informal memory of danger, graft, and wartime ground.",
    places: history,
    art: "/guides/manhattan/manhattan-chapter-history.png",
    artAlt: "Illustration of a stone fort and harbor battery at dusk",
    tone: "paper" as const,
  },
  {
    id: "people",
    kicker: "Chapter III",
    title: "People & institutions",
    lead: "A founder, a financier, a newspaper - Manhattan often names a place after whoever left the deepest mark on that block of time.",
    places: people,
    art: "/guides/manhattan/manhattan-chapter-people.png",
    artAlt: "Illustration of a Gilded Age mansion on a tree-lined hill",
    tone: "light" as const,
  },
  {
    id: "streets",
    kicker: "Chapter IV",
    title: "The map talking to itself",
    lead: "In the late twentieth century, downtown invented a new dialect: portmanteaus that describe location and nothing else - and somehow became permanent.",
    places: streets,
    art: "/guides/manhattan/manhattan-chapter-streets.png",
    artAlt: "Abstract navy and champagne street-grid map of downtown Manhattan",
    tone: "paper" as const,
  },
] as const;

function PlaceRow({ place }: { place: Place }) {
  return (
    <li className="group grid gap-2 border-t border-brand-navy/10 py-7 first:border-t-0 sm:grid-cols-[minmax(10rem,0.9fr)_minmax(0,1.4fr)] sm:gap-8 sm:py-8">
      <h3 className="font-display text-[clamp(1.65rem,2.6vw,2.15rem)] leading-[1.05] tracking-[-0.02em] text-brand-navy transition-colors group-hover:text-brand-brass">
        {place.name}
      </h3>
      <div>
        <p className="text-[15px] leading-7 text-brand-graphite/90 sm:text-base sm:leading-8">
          {place.meaning}
        </p>
        {place.aside ? (
          <p className="mt-3 max-w-xl text-sm leading-6 text-brand-graphite/65 italic">
            {place.aside}
          </p>
        ) : null}
      </div>
    </li>
  );
}

export default function ManhattanExplained() {
  usePageMetadata({
    title: "Manhattan Explained - Neighborhood Names",
    description:
      "An editorial guide to Manhattan neighborhood names - Dutch roots, Revolutionary forts, people & institutions, and street-map portmanteaus.",
    path: "/guides/manhattan-explained",
  });

  return (
    <main className="bg-brand-ivory text-brand-ink">
      <style>{`
 @keyframes me-fade-up {
 from { opacity: 0; transform: translateY(18px); }
 to { opacity: 1; transform: translateY(0); }
 }
 @keyframes me-ken {
 from { transform: scale(1.04); }
 to { transform: scale(1); }
 }
 .me-fade-up {
 animation: me-fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .me-fade-up-delay {
 animation: me-fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both;
 }
 .me-cover-zoom {
 animation: me-ken 14s ease-out both;
 }
 `}</style>

      {/* Cover art banner */}
      <section className="relative overflow-hidden bg-brand-midnight text-brand-ivory">
        <div className="relative min-h-[min(78vh,720px)] w-full">
          <img
            src="/guides/manhattan/manhattan-explained-cover.png"
            alt="Editorial cover: Lower Manhattan skyline at night with a translucent golden map of the island"
            className="me-cover-zoom absolute inset-0 h-full w-full object-cover object-[center_40%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-brand-midnight/55 to-brand-midnight/25"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-brand-midnight/80 via-brand-midnight/35 to-transparent"
            aria-hidden
          />

          <div className="relative mx-auto flex min-h-[min(78vh,720px)] max-w-site flex-col justify-end px-6 pb-14 pt-28 sm:px-8 lg:px-10 lg:pb-20">
            <p className="me-fade-up text-[10px] uppercase tracking-[0.28em] text-brand-champagne">
              Agent Kammer · Field notes
            </p>
            <h1 className="me-fade-up-delay mt-5 max-w-[12ch] font-display text-[clamp(3rem,7.5vw,6.25rem)] font-medium leading-[0.88] tracking-[-0.03em]">
              Manhattan Explained
            </h1>
            <p className="me-fade-up-delay mt-6 max-w-md text-lg leading-8 text-brand-ivory/80">
              The stories inside the names - from Lenape ground to Dutch farms
              to twentieth-century portmanteaus.
            </p>
          </div>
        </div>
      </section>

      {/* Opening essay */}
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto max-w-site px-6 py-16 sm:px-8 lg:grid lg:grid-cols-[1fr_1.35fr] lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">
              Opening
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] text-brand-navy">
              Island of many hills - and many names
            </h2>
          </div>
          <div className="mt-8 space-y-6 text-[17px] leading-8 text-brand-graphite lg:mt-0">
            <p>
              <span className="font-semibold text-brand-navy">Manhattan</span>{" "}
              comes from a Lenape name. A popular English gloss is "island of
              many hills," though scholars still discuss the exact original
              meaning. What is clearer is the layered map that followed: Dutch
              landscape words, English forts, private estates, and the slang of
              police captains and real-estate marketers.
            </p>
            <p>
              Read the island this way and the street signs stop being
              decoration. They become a compact history of who named what - and
              why the name stuck.
            </p>
          </div>
        </div>
      </section>

      {/* Quarter section topic art */}
      <section className="border-b border-brand-border bg-white">
        <div className="mx-auto max-w-site px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">
                The chapters
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.85rem,3vw,2.5rem)] leading-[0.95] text-brand-navy">
                Four ways a place gets named
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-brand-graphite/75">
              Dutch ground · forts & nicknames · people & institutions · the map
              talking to itself
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

      {/* Chapters with side art */}
      {chapters.map((chapter) => (
        <section
          key={chapter.id}
          id={chapter.id}
          className={
            chapter.tone === "paper"
              ? "scroll-mt-20 border-b border-brand-border bg-white"
              : "scroll-mt-20 border-b border-brand-border bg-brand-ivory"
          }
        >
          <div className="mx-auto max-w-site px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.35fr)] lg:gap-14">
              <figure className="overflow-hidden bg-brand-midnight/5">
                <img
                  src={chapter.art}
                  alt={chapter.artAlt}
                  className="aspect-[4/5] w-full object-cover sm:aspect-square lg:aspect-[4/5]"
                  loading="lazy"
                />
                <figcaption className="border-t border-brand-navy/10 px-1 py-3 text-[11px] uppercase tracking-[0.16em] text-brand-graphite/55">
                  {chapter.kicker}
                </figcaption>
              </figure>

              <div>
                <p className="text-[10px] uppercase tracking-[0.26em] text-brand-brass">
                  {chapter.kicker}
                </p>
                <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.92] tracking-[-0.02em] text-brand-navy">
                  {chapter.title}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-brand-graphite sm:text-lg">
                  {chapter.lead}
                </p>

                <ol className="mt-12 max-w-3xl">
                  {chapter.places.map((place) => (
                    <PlaceRow key={place.name} place={place} />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Closing */}
      <section className="bg-brand-midnight text-brand-ivory">
        <div className="mx-auto max-w-site px-6 py-16 sm:px-8 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-brand-champagne">
              Closing
            </p>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.94]">
              Every block has a story. Start with the name.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-brand-ivory/75">
              Popular maps compress contested histories. Where origins are
              debated - Turtle Bay, Hell's Kitchen - we leave the uncertainty
              visible. The rest is the city's own long memory, written in street
              language.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 lg:mt-0 lg:items-end">
            <Link
              href="/building-reports/neighborhood-guides"
              className="group inline-flex items-center gap-3 border border-brand-champagne/40 px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-brand-champagne transition hover:border-brand-champagne hover:bg-brand-champagne/10"
            >
              Neighborhood guides
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
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
