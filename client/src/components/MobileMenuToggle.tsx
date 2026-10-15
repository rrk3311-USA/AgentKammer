import React from "react";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-stone focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy";

const platinum =
  "bg-[linear-gradient(90deg,#F4F4F2_0%,#E5E4E2_52%,#C8CACD_100%)]";

const bar = cn(
  "absolute left-[8px] h-[3px] rounded-full shadow-[0_0_0.5px_rgba(232,232,230,0.35)]",
  "transition-[transform,width,opacity,top] duration-300 ease-brand-out origin-center",
  platinum,
);

export function MobileMenuToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative flex h-11 w-11 shrink-0 items-center justify-center lg:hidden",
        focusRing,
      )}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      data-testid="button-mobile-menu"
    >
      <span className="relative block h-11 w-11" aria-hidden data-testid="mobile-menu-mark">
        <span
          className={cn(
            bar,
            open ? "top-[20.5px] w-6 rotate-45" : "top-[11px] w-6",
          )}
        />
        <span
          className={cn(
            bar,
            open ? "top-[20.5px] w-[14px] opacity-0" : "top-[20.5px] w-[14px] opacity-100",
          )}
        />
        <span
          className={cn(
            bar,
            open ? "top-[20.5px] w-6 -rotate-45" : "top-[30px] w-5",
          )}
        />
      </span>
    </button>
  );
}
