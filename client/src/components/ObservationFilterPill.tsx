import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ObservationFilterPillProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function ObservationFilterPill({ active, onClick, children }: ObservationFilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition",
        active
          ? "border-brand-champagne bg-white text-brand-midnight shadow-[inset_0_0_0_1px_rgba(214,180,95,0.25)]"
          : "border-brand-champagne/22 bg-transparent text-brand-graphite/58 hover:border-brand-champagne/45 hover:text-brand-graphite/78",
      )}
    >
      {children}
    </button>
  );
}
