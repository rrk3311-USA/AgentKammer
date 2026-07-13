import { cn } from "@/lib/utils";
import { getPerspectiveContentTypeMeta, type PerspectiveContentType } from "@/data/perspectives";
import { perspectiveIconMap, perspectiveIconProps } from "@/lib/perspective-icons";

type PerspectiveContentTagProps = {
  contentType: PerspectiveContentType;
  variant?: "light" | "dark";
  className?: string;
};

export function PerspectiveContentTag({
  contentType,
  variant = "light",
  className,
}: PerspectiveContentTagProps) {
  const meta = getPerspectiveContentTypeMeta(contentType);
  const Icon = perspectiveIconMap[contentType];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em]",
        variant === "dark"
          ? "border-brand-champagne/40 bg-brand-ivory/[0.06] text-brand-champagne"
          : "border-brand-champagne/35 bg-brand-warm/80 text-brand-graphite/78",
        className,
      )}
    >
      <Icon {...perspectiveIconProps} aria-hidden />
      {meta.label}
    </span>
  );
}
