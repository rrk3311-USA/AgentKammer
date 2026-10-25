import { CTA } from "@/components/site-shell";
import { SituationGuide } from "@/components/SituationGuide";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { grammar } from "@/components/visual-grammar";

export default function Services() {
  usePageMetadata({
    title: "Situations",
    description: "Start from what changed. Twelve life changes, then a private read if you want one.",
    path: "/situations",
  });

  return (
    <main className="bg-brand-ivory">
      <section className="bg-brand-navy text-brand-ivory">
        <div className="mx-auto flex w-full max-w-site flex-col items-start px-5 py-10 text-left sm:px-6 lg:px-10 lg:py-14">
          <p className={grammar.eyebrowOnDark}>Situations</p>
          <h1 className={`mt-3 max-w-[16ch] ${grammar.displayOnDark}`}>Start from what changed.</h1>
          <p className={`mt-4 max-w-xl ${grammar.bodyOnDark}`}>
            Name the life change. We will sit with that before anything else.
          </p>
          <div className="mt-10 w-full" data-ak-situations-guide>
            <SituationGuide />
          </div>
        </div>
      </section>

      <CTA
        title="When you want us to look with you."
        description="If one of these already feels like your week, write to us. We will read the situation before we recommend a next step."
        href="/belonging"
        label="Request a Situation Assessment"
        eyebrow="Request a Situation Assessment"
        showEyebrow={false}
        align="center"
        compact
        tone="ivory"
      />
    </main>
  );
}
