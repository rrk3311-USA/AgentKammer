import { Link } from "wouter";
import { HomeApproach } from "@/components/HomeApproach";
import { HomeCloseCtas } from "@/components/HomeCloseCtas";
import { HomeSituationRows } from "@/components/HomeSituationRows";
import { DecisionFramework } from "@/components/DecisionFramework";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const howWeDecide = [
  { step: "01", title: "What's changing?", text: "Name the life event, pressure, or uncertainty. Neighborhoods and inventory come later." },
  { step: "02", title: "Should anything change?", text: "Sometimes the highest-value recommendation is to do nothing." },
  { step: "03", title: "Where do you belong?", text: "Even if you stay, is the environment still serving the life you want?" },
];

export default function Home() {
  usePageMetadata({
    title: "Agent Kammer | Private Housing Advisory",
    description:
      "Private housing guidance before the market gets loud. Local execution when needed. Stay, renovate, rent, buy, sell, or wait.",
    path: "/",
  });

  return (
    <main className="bg-[#F5F2EB] text-[#2F3136]">
      <section data-ak-home-hero className="ak-home-hero">
        <div className="ak-home-hero-copy">
          <h1 className="ak-home-hero-title">
            Live where
            <br />
            you belong
          </h1>
          <div className="ak-home-hero-aside">
            <i className="ak-home-hero-rule" aria-hidden="true" />
            <p className="ak-home-hero-sub">
              Private housing guidance before the market gets loud.
              <br />
              People do not wake up wanting to tour apartments.
              <br />
              They wake up because life changed.
            </p>
          </div>
          <Link href="/situations" className="ak-home-hero-btn">
            What's changing
          </Link>
        </div>
        <div className="ak-home-hero-photo">
          <img
            src="/images/manhattan-limestone-skyline.jpg"
            alt="Warm Manhattan skyline with the Empire State Building and limestone midtown facades. Photo by Pedro Lastra on Unsplash."
            className="ak-home-hero-img"
          />
        </div>
      </section>

      <HomeApproach />

      <DecisionFramework
        eyebrow="How We Decide"
        title="Three questions. Then judgment."
        items={howWeDecide}
      />

      <HomeSituationRows />

      <section data-ak-home-close className="ak-home-close">
        <div className="ak-home-close-inner">
          <p className="ak-home-close-copy">
            Work through the steps, starting with your Situation, for a clear recommendation, or write to us directly.
          </p>
          <HomeCloseCtas />
        </div>
      </section>
    </main>
  );
}
