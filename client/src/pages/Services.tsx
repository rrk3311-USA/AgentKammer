import { CTA } from "@/components/site-shell";
import { SituationJourney } from "@/components/SituationJourney";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export default function Services() {
  usePageMetadata({
    title: "Situations",
    description: "Start from what changed. Twelve life changes, then a private read if you want one.",
    path: "/situations",
  });

  return (
    <main className="bg-brand-ivory">
      <SituationJourney
        eyebrow="Situations"
        title="Start from what changed."
        description="Name the life change. We will sit with that before anything else."
        heading="h1"
      />

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
