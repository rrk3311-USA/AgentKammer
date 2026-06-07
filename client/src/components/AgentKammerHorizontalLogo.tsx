import { cn } from "@/lib/utils";
import logoEmblem from "@assets/agent-kammer-logo-emblem-gold-wreath.png";

interface AgentKammerHorizontalLogoProps {
  className?: string;
  /** `light` = ivory wordmark for dark backgrounds; `default` = standard header */
  variant?: "default" | "light";
}

export function AgentKammerHorizontalLogo({ className, variant = "default" }: AgentKammerHorizontalLogoProps) {
  const isLight = variant === "light";

  return (
    <div
      className={cn("flex shrink-0 items-center gap-3 sm:gap-3.5 lg:gap-4", className)}
      aria-label="Agent Kammer"
    >
      <img
        src={logoEmblem}
        alt=""
        aria-hidden
        className="h-12 w-12 shrink-0 object-contain sm:h-[3.25rem] sm:w-[3.25rem] lg:h-14 lg:w-14"
        loading="eager"
      />
      <div className="flex flex-col justify-center gap-1 lg:gap-1.5">
        <p
          className={cn(
            "whitespace-nowrap font-serif text-[1.35rem] font-semibold leading-none tracking-[0.06em] sm:text-[1.55rem] lg:text-[1.85rem]",
            isLight ? "text-brand-ivory" : "text-brand-ivory",
          )}
        >
          AGENT KAMMER
        </p>
        <p
          className={cn(
            "whitespace-nowrap text-[0.5625rem] font-semibold uppercase leading-none tracking-[0.24em] sm:text-[0.625rem] lg:text-[0.6875rem]",
            isLight ? "text-brand-champagne" : "text-brand-champagne",
          )}
        >
          Modern Manhattan Luxury
        </p>
      </div>
    </div>
  );
}
