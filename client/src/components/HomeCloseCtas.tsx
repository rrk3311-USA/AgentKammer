import { Link, useSearch } from "wouter";
import { cn } from "@/lib/utils";

export type HomeCtaMetal = "brass" | "silver";

export function readHomeCtaMetal(search: string | undefined | null): HomeCtaMetal {
  const raw = (search ?? "").replace(/^\?/, "");
  return new URLSearchParams(raw).get("cta") === "silver" ? "silver" : "brass";
}

export function HomeCloseCtas({ metal }: { metal?: HomeCtaMetal } = {}) {
  const search = useSearch();
  const finish = metal ?? readHomeCtaMetal(search);

  return (
    <div
      data-ak-home-close-ctas
      data-ak-cta-metal={finish}
      className="ak-home-cta-pair"
    >
      <Link href="/calculator" className={cn("ak-pair-btn ak-pair-btn--outline", `ak-pair-btn--${finish}`)}>
        Calculate
      </Link>
      <Link href="/contact" className={cn("ak-pair-btn ak-pair-btn--fill", `ak-pair-btn--${finish}`)}>
        Contact
      </Link>
    </div>
  );
}
