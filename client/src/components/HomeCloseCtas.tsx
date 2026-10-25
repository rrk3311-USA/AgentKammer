import { Link } from "wouter";

export function HomeCloseCtas() {
  return (
    <div data-ak-home-close-ctas className="ak-home-cta-pair">
      <Link href="/calculator" className="ak-pair-btn">
        Calculate
      </Link>
      <Link href="/contact" className="ak-pair-btn">
        Contact
      </Link>
    </div>
  );
}
