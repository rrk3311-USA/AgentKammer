import { BookOpen, Compass, Eye, Lock } from "lucide-react";

const pillars = [
  {
    label: "Clarity",
    text: "We cut through noise to identify what truly matters.",
    Icon: Eye,
  },
  {
    label: "Intelligence",
    text: "Market knowledge and public data, read carefully.",
    Icon: BookOpen,
  },
  {
    label: "Strategy",
    text: "Every move is intentional. Every detail considered.",
    Icon: Compass,
  },
  {
    label: "Discretion",
    text: "Your goals are personal. Your process should be too.",
    Icon: Lock,
  },
] as const;

export function HomeApproach() {
  return (
    <section data-ak-home-approach className="ak-home-approach">
      <div className="ak-home-approach-inner">
        <p className="ak-home-approach-kicker">The Agent Kammer Approach</p>
        <h2 className="ak-home-approach-title">Strategy over transactions.</h2>
        <i className="ak-home-approach-rule" aria-hidden="true" />
        <div className="ak-home-approach-grid">
          {pillars.map(({ label, text, Icon }) => (
            <article key={label} className="ak-home-approach-col">
              <Icon className="ak-home-approach-icon" strokeWidth={1.25} aria-hidden />
              <p className="ak-home-approach-label">{label}</p>
              <p className="ak-home-approach-copy">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
