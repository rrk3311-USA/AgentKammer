import { cn } from "@/lib/utils";

type AkMonogramMarkProps = {
  className?: string;
  variant?: "ivory" | "midnight";
};

const sources = {
  ivory: "/brand/ak-monogram-ivory.png",
  midnight: "/brand/ak-monogram-midnight.png",
} as const;

/** Serif AK ligature from brand system */
export function AkMonogramMark({ className, variant = "ivory" }: AkMonogramMarkProps) {
  return (
    <img
      src={sources[variant]}
      alt=""
      aria-hidden
      className={cn("h-10 w-auto shrink-0 object-contain object-left", className)}
      decoding="async"
    />
  );
}
