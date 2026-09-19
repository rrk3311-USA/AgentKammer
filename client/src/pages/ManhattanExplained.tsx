import { Link } from "wouter";
import { DarkStatement, grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";

type Place = {
  name: string;
  meaning: string;
  aside?: string;
};

const dutch: Place[] = [
  {
    name: "Harlem",
    meaning: "Nieuw Haarlem. Named for Haarlem in the Netherlands.",
  },
  {
    name: "Greenwich Village",
    meaning: 'From Dutch Groenwijck, a "green district" or green settlement.',
  },
  {
    name: "Gramercy",
    meaning: 'From Krom Moerasje. Roughly "crooked little swamp."',
  },
  {
    name: "Bowery",
    meaning: "From bouwerij. Farm. The road once led to the farms.",
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
      "After a Revolutionary-era fort on the bluff, associated with King George, not George V.",
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
      'Sometimes linked to London\'s Chelsea / Royal Hospital Chelsea, not merely a "nursing home."',
  },
];

const streets: Place[] = [
  { name: "SoHo", meaning: "South of Houston Street." },
  { name: "NoHo", meaning: "North of Houston Street." },
  { name: "Tribeca", meaning: "Triangle Below Canal Street." },
  { name: "Nolita", meaning: "North of Little Italy." },
  {
    name: "Alphabet City",
    meaning: "Avenues A, B, C, and D. The far East Side grid made literal.",
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
    lead: "Some names are architecture and defense. Others are reputation. The city's informal memory of danger, graft, and wartime ground.",
    places: history,
    art: "/guides/manhattan/manhattan-chapter-history.png",
    artAlt: "Illustration of a stone fort and harbor battery at dusk",
    tone: "paper" as const,
  },
  {
    id: "people",
    kicker: "Chapter III",
    title: "People & institutions",
    lead: "A founder, a financier, a newspaper. Manhattan often names a place after whoever left the deepest mark on that block of time.",
    places: people,
    art: "/guides/manhattan/manhattan-chapter-people.png",
    artAlt: "Illustration of a Gilded Age mansion on a tree-lined hill",
    tone: "light" as const,
  },
  {
    id: "streets",
    kicker: "Chapter IV",
    title: "The map talking to itself",
    lead: "In the late twentieth century, downtown invented a new dialect: portmanteaus that describe location and nothing else. And somehow became permanent.",
    places: streets,
    art: "/guides/manhattan/manhattan-chapter-streets.png",
    artAlt: "Abstract navy and champagne street-grid map of downtown Manhattan",
    tone: "paper" as const,
  },
] as const;

function PlaceRow({ place }: { place: Place }) {
  return (
    <li className="group grid gap-2 border-t border-brand-navy/10 py-7 first:border-t-0 sm:grid-cols-[minmax(10rem,0.9fr)_minmax(0,1.4fr)] sm:gap-8 sm:py-8">
      <h3 className={`${grammar.rowTitle} transition-colors group-hover:text-brand-navy-secondary`}>
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
    title: "Manhattan Explained. Neighborhood Names",
    description:
      "An editorial guide to Manhattan neighborhood names. Dutch roots, Revolutionary forts, people & institutions, and street-map portmanteaus.",
    path: "/guides/manhattan-explained",
  });

  return (
    <main className="bg-brand-ivory text-brand-ink">
      <section className="relative overflow-hidden bg-brand-navy text-brand-ivory">
        <div className="relative min-h-[min(62vh,560px)] w-full">
          <img
            src="/guides/manhattan/manhattan-explained-cover.png"
            alt="Editorial cover: Lower Manhattan skyline at night with a translucent golden map of the island"
            className="absolute inset-0 h-full w-full object-cover object-[center_40%] saturate-[0.68] contrast-[0.98] brightness-[0.74]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-navy/92 via-brand-navy/28 to-brand-navy/10"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-brand-navy/28 via-transparent to-brand-navy/12"
            aria-hidden
          />

          <div className="relative mx-auto flex min-h-[min(62vh,560px)] max-w-site flex-col justify-end px-6 pb-14 pt-28 lg:px-10 lg:pb-20">
            <p className={grammar.eyebrowOnDark}>Agent Kammer · Field notes</p>
            <h1 className={`mt-4 max-w-[12ch] ${grammar.displayOnDark}`}>Manhattan Explained</h1>
            <p className={`mt-6 ${grammar.bodyOnDark}`}>
              The stories inside the names. From Lenape ground to Dutch farms
              to twentieth-century portmanteaus.
            </p>
          </div>
        </div>
      </section>

      {/* Opening essay */}
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto max-w-site px-6 py-16 sm:px-8 lg:grid lg:grid-cols-[1fr_1.35fr] lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className={grammar.eyebrow}>Opening</p>
            <h2 className={`mt-4 ${grammar.section}`}>Island of many hills. And many names</h2>
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
              decoration. They become a compact history of who named what. And
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
              <p className={grammar.eyebrow}>The chapters</p>
              <h2 className={`mt-3 ${grammar.section}`}>Four ways a place gets named</h2>
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
                    className="h-full w-full object-cover"
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
                  <p className={`mt-1 ${grammar.rowTitle} text-brand-ivory`}>
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
                <p className={grammar.eyebrow}>{chapter.kicker}</p>
                <h2 className={`mt-4 ${grammar.section}`}>{chapter.title}</h2>
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

      <DarkStatement
        eyebrow="Closing"
        title="Every block has a story. Start with the name."
        description="Popular maps compress contested histories. Where origins are debated. Turtle Bay, Hell's Kitchen. We leave the uncertainty visible. The rest is the city's own long memory, written in street language."
        href="/guides#neighborhoods"
        label="Neighborhoods"
      />
    </main>
  );
}
