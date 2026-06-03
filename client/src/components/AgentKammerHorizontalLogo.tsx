import { cn } from "@/lib/utils";
import homepageLogo from "@assets/agent-kammer-homepage-logo.png";

interface AgentKammerHorizontalLogoProps {
  className?: string;
}

export function AgentKammerHorizontalLogo({ className }: AgentKammerHorizontalLogoProps) {
  return (
    <img
      src={homepageLogo}
      alt="Agent Kammer"
      className={cn("h-12 w-auto max-w-[17rem] object-contain mix-blend-multiply sm:h-14 sm:max-w-[22rem]", className)}
      loading="eager"
    />
  );
}
