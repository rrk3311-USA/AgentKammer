import { cn } from "@/lib/utils";

/** Same graphite-on-cream situation drawing used on the Inheritance landing. */
export const HOW_WE_DECIDE_ART_SRC = "/images/situations/inheritance-housing-nyc.png";
export const HOW_WE_DECIDE_ART_PAPER = "#FDF3DF";

export function HowWeDecideArt({ className }: { className?: string } = {}) {
  return (
    <div className={cn("overflow-hidden bg-[#FDF3DF]", className)}>
      <img
        src={HOW_WE_DECIDE_ART_SRC}
        alt="Pencil drawing of a New York brownstone stoop"
        className="aspect-[4/5] h-auto w-full object-cover object-[78%_58%] sm:aspect-[3/4]"
      />
    </div>
  );
}
