import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { decisionNavigationGroups } from "@/data/decision-navigation";

const items =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];

export function HomeSituationRows() {
  return (
    <section data-ak-whats-changing className="ak-pp-page ak-home-rows">
      <div className="ak-pp-frame" aria-hidden="true">
        <i className="rule-out" />
        <i className="rule-in" />
      </div>
      <div className="ak-home-rows-inner">
        <p className="ak-home-rows-kicker">What's Changing</p>
        <h2 className="ak-home-rows-title">Start from what changed.</h2>
        <nav aria-label="What's Changing" className="ak-home-rows-list">
          {items.map((item) => (
            <Link key={item.href + item.label} href={item.href} className="ak-home-row">
              <span className="ak-home-row-label">{item.label}</span>
              <ArrowRight className="ak-home-row-arrow" strokeWidth={1.25} aria-hidden />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
