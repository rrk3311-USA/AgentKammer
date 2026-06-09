import { cn } from "@/lib/utils";
import { getPerspectiveContentTypeMeta, type PerspectiveContentType } from "@/data/perspectives";

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

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em]",
        variant === "dark"
          ? "border-brand-champagne/40 bg-brand-ivory/[0.06] text-brand-champagne"
          : "border-brand-champagne/35 bg-[#f7f3ea]/80 text-brand-graphite/78",
        className,
      )}
    >
      <span aria-hidden="true">{meta.emoji}</span>
      {meta.label}
    </span>
  );
}
