import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const principles = [
  {
    title: "Advisory First",
    text: "The work starts with judgment and positioning, not volume or velocity.",
  },
  {
    title: "Building-Led Perspective",
    text: "Good decisions happen when the building, block, and buyer brief are understood together.",
  },
  {
    title: "Quiet Execution",
    text: "The tone is measured, private, and precise from first call through close.",
  },
];

export default function About() {
  usePageMetadata({
    title: "About",
    description: "About the Agent Kammer advisory approach and the principles behind the updated site.",
    path: "/about",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="About"
        title="A brand system built to reflect discretion, intelligence, and confidence."
        description="The updated site positions Agent Kammer less like a listing destination and more like a private advisory practice. The design language is editorial, the navigation is simplified, and the copy is structured around decision support."
      />

      <PageSection className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <SectionHeading
          eyebrow="Practice"
          title="An approach shaped by market fluency and a preference for precision over noise."
          description="The work spans acquisition strategy, relocation guidance, and report-based market framing. Every page in this version is written to clarify how the practice thinks, not just what it sells."
        />
        <div className="rounded-card border border-brand-border bg-white p-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">At a Glance</p>
          <div className="mt-6 grid gap-6">
            <div>
              <p className="font-display text-4xl leading-none text-brand-navy">New York</p>
              <p className="mt-2 text-sm leading-7 text-brand-graphite">Primary market perspective with building-specific context.</p>
            </div>
            <div>
              <p className="font-display text-4xl leading-none text-brand-navy">Private</p>
              <p className="mt-2 text-sm leading-7 text-brand-graphite">Communication designed for executive and principal-level clients.</p>
            </div>
            <div>
              <p className="font-display text-4xl leading-none text-brand-navy">Refined</p>
              <p className="mt-2 text-sm leading-7 text-brand-graphite">A restrained visual system with an 8-pixel rhythm and consistent navigation.</p>
            </div>
          </div>
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading eyebrow="Principles" title="Three ideas organize the public experience." align="center" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {principles.map((item) => (
              <div key={item.title} className="rounded-card border border-brand-border bg-brand-ivory p-8">
                <h3 className="font-display text-3xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">{item.text}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <CTA
        title="Continue into the advisory sections."
        description="From here, the strongest next routes are Buyer Advisory or Building Reports depending on the brief."
      />
    </main>
  );
}
