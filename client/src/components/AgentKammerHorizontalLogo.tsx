import { cn } from "@/lib/utils";
import { AkMonogramMark } from "@/components/AkMonogramMark";

interface AgentKammerHorizontalLogoProps {
  className?: string;
  variant?: "default" | "light" | "midnight";
  showTagline?: boolean;
  layout?: "horizontal" | "stacked";
  wordmarkOnly?: boolean;
  emphasis?: "default" | "header";
}

export function AgentKammerHorizontalLogo({
  className,
  variant = "default",
  showTagline = false,
  layout = "horizontal",
  wordmarkOnly = false,
  emphasis = "default",
}: AgentKammerHorizontalLogoProps) {
  const markVariant = variant === "default" || variant === "midnight" ? "midnight" : "ivory";
  const textTone = markVariant === "midnight" ? "text-brand-navy" : "text-brand-ivory";
  const accentTone = markVariant === "midnight" ? "text-brand-graphite" : "text-brand-ivory/72";
  const stacked = layout === "stacked";
  const headerStyle = emphasis === "header";

  return (
    <div
      className={cn(
        "flex shrink-0",
        stacked ? "flex-col items-start gap-4" : "items-center gap-3",
        className,
      )}
      aria-label="Agent Kammer"
    >
      {!wordmarkOnly ? (
        <AkMonogramMark
          variant={markVariant}
          className={cn(
            stacked ? "h-14 sm:h-16" : headerStyle ? "h-11 sm:h-12 xl:h-14" : "h-9 sm:h-10 xl:h-11",
          )}
        />
      ) : null}
      <div className={cn("flex flex-col", stacked ? "items-start" : "items-start")}>
        <span
          className={cn(
            "font-display uppercase leading-none text-balance",
            stacked
              ? "text-[1.4rem] tracking-[0.28em] sm:text-[1.55rem]"
              : wordmarkOnly
                ? "text-[1rem] tracking-[0.28em] sm:text-[1.08rem] xl:text-[1.16rem]"
                : headerStyle
                  ? "text-[1.45rem] tracking-[0.12em] sm:text-[1.75rem] xl:text-[2.1rem]"
                  : "text-[0.82rem] tracking-[0.24em] sm:text-[0.9rem] xl:text-[0.96rem]",
            textTone,
          )}
        >
          Agent Kammer
        </span>
        {showTagline ? (
          <p
            className={cn(
              "mt-2 uppercase leading-none",
              stacked ? "text-[0.6rem] tracking-[0.28em]" : "text-[0.46rem] tracking-[0.22em] sm:text-[0.5rem]",
              accentTone,
            )}
          >
            Buildings Before Listings.
          </p>
        ) : null}
      </div>
    </div>
  );
}
