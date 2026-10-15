import React from "react";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-stone focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy";

const bar =
  "absolute left-[7px] h-[2px] rounded-full bg-[#D8D1C7] transition-[transform,width,opacity,top] duration-300 ease-brand-out origin-center";

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
      <span
        className="relative block h-8 w-8"
        aria-hidden
        data-testid="mobile-menu-mark"
      >
        <span className="absolute inset-0 rounded-[1px] border border-[#D8D1C7]/80" />
        <span
          className={cn(
            bar,
            open
              ? "top-[15px] w-[18px] translate-y-0 rotate-45"
              : "top-[8px] w-[18px]",
          )}
        />
        <span
          className={cn(
            bar,
            open
              ? "top-[15px] w-[10px] opacity-0"
              : "top-[15px] w-[10px] opacity-100",
          )}
        />
        <span
          className={cn(
            bar,
            open
              ? "top-[15px] w-[18px] -rotate-45"
              : "top-[22px] w-[14px]",
          )}
        />
      </span>
    </button>
  );
}
