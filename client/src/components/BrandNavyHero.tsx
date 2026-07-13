import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { readingContainer, sectionY, siteContainer, typeBody, typeEyebrow, typeEyebrowOnDark, typeH1 } from "@/lib/design-system";

type BrandNavyHeroProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  compact?: boolean;
  titleClassName?: string;
  tone?: "light" | "navy";
};

export function BrandNavyHero({
  eyebrow,
  title,
  description,
  children,
  className,
  compact = false,
  titleClassName,
  tone = "light",
}: BrandNavyHeroProps) {
  const isLight = tone === "light";

  return (
    <section
      className={cn(
        "border-b border-brand-border",
        isLight ? "bg-brand-ivory text-brand-ink" : "bg-brand-navy text-brand-ivory",
        compact ? "py-12 lg:py-16" : sectionY,
        className,
      )}
    >
      <div className={siteContainer}>
        <div className={readingContainer}>
          <p className={isLight ? typeEyebrow : typeEyebrowOnDark}>{eyebrow}</p>
          <h1 className={cn(typeH1, "mt-6", !isLight && "text-brand-ivory", titleClassName)}>{title}</h1>
          {description ? (
            <div className={cn(typeBody, "mt-8", !isLight && "text-brand-ivory/78", compact && "mt-6")}>{description}</div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
