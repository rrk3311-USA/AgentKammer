import { Link } from "wouter";
import Strategy from "@/pages/Strategy";

export default function StrategyFrameworkPreview() {
  return (
    <>
      <div className="border-b border-brand-champagne/30 bg-brand-midnight px-6 py-2.5 text-center">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne">
          Preview alias · Same as{" "}
          <Link href="/strategy" className="underline underline-offset-2 hover:text-brand-ivory">
            /strategy
          </Link>
        </p>
      </div>
      <Strategy />
    </>
  );
}
