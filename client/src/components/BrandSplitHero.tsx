import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { sectionY, siteContainer, surfaceImage, typeBody, typeEyebrow, typeEyebrowOnDark, typeH1 } from "@/lib/design-system";

type BrandSplitHeroProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  tone?: "light" | "navy";
};

export function BrandSplitHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "object-center",
  children,
  className,
  titleClassName,
  tone = "light",
}: BrandSplitHeroProps) {
  const isLight = tone === "light";

  return (
    <section
      className={cn(
        "border-b border-brand-border",
        sectionY,
        isLight ? "bg-brand-ivory text-brand-ink" : "bg-brand-navy text-brand-ivory",
        className,
      )}
    >
      <div className={cn(siteContainer, "grid gap-16 lg:grid-cols-2 lg:items-center")}>
        <div className="max-w-reading lg:max-w-none">
          <p className={isLight ? typeEyebrow : typeEyebrowOnDark}>{eyebrow}</p>
          <h1 className={cn(typeH1, "mt-6", !isLight && "text-brand-ivory", titleClassName)}>{title}</h1>
          {description ? (
            <div className={cn(typeBody, "mt-8", !isLight && "text-brand-ivory/78")}>{description}</div>
          ) : null}
          {children}
        </div>
        <div className={cn(surfaceImage, "relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[480px]")}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className={cn("absolute inset-0 h-full w-full object-cover saturate-[0.9] contrast-[1.02]", imagePosition)}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
