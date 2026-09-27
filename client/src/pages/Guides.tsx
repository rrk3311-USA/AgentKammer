import { useEffect } from "react";
import { PageHero, ReportSubnav } from "@/components/site-shell";
import { DarkStatement, ModuleCards, ModuleIntro, ModuleSection, grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { manhattanNeighborhoodGuides } from "@/data/manhattan-neighborhoods";

export default function Guides() {
  usePageMetadata({
    title: "Guides",
    description:
      "Decide the frame first: neighborhood fit, then a Situation Assessment. Field guides and Property Assessments live on the Resource Hub.",
    path: "/guides",
  });

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Guides"
        title="Decide the frame before the listing."
        description="Neighborhoods first. Then a Situation Assessment if you want a structured read. Field guides and Property Assessments sit on the Resource Hub."
        art="guides"
      />
      <ReportSubnav />

      <div className="mx-auto w-full max-w-site px-6 pt-10 lg:px-10">
        <p className="max-w-2xl text-base leading-7 text-brand-graphite">
          Field guides and Property Assessments are on the{" "}
          <a href="/resources" className="text-brand-navy underline underline-offset-4">
            Resource Hub
          </a>
          .
        </p>
      </div>

      <ModuleSection id="neighborhoods" surface="stone">
        <div className={grammar.padLoose}>
          <ModuleIntro
            eyebrow="Neighborhoods"
            title="Geography before inventory."
            description="Tribeca, Chelsea, Hudson Yards, the Upper West Side, and the other Manhattan Situations. Lock one or two districts before comparing buildings."
          />
          <ModuleCards
            columns={3}
            items={manhattanNeighborhoodGuides.map((item) => ({
              label: item.name,
              text: item.note,
              href: item.href,
            }))}
          />
        </div>
      </ModuleSection>

      <DarkStatement
        eyebrow="Assessment"
        title="If you want a structured answer."
        description="Guides stay the research library. The Situation Assessment is how you figure out your situation."
        href="/belonging"
        label="Request a Situation Assessment"
      />
    </main>
  );
}
