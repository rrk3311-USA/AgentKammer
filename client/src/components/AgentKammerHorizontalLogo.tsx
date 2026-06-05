import { cn } from "@/lib/utils";
import homepageLogoDark from "@assets/agent-kammer-logo-header-new.png";
import homepageLogoLight from "@assets/agent-kammer-logo-mark-light.png";

interface AgentKammerHorizontalLogoProps {
  className?: string;
  /** `light` = cream wordmark for dark backgrounds; `default` = uploaded dark logo */
  variant?: "default" | "light";
}

export function AgentKammerHorizontalLogo({ className, variant = "default" }: AgentKammerHorizontalLogoProps) {
  const src = variant === "light" ? homepageLogoLight : homepageLogoDark;

  return (
    <img
      src={src}
      alt="Agent Kammer"
      className={cn(
        "block h-14 w-auto max-w-[min(100vw-6rem,23rem)] object-contain object-left sm:h-16 sm:max-w-[25rem] lg:h-20 lg:max-w-[30rem]",
        className,
      )}
      loading="eager"
    />
  );
}
