import { PropertyCard } from "./PropertyCard";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Property {
  id: string;
  image: string;
  price: number;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
  daysOnMarket?: number;
  dealScore?: number;
  originalPrice?: number;
  discountPercent?: number;
}

interface HorizontalPropertyScrollProps {
  title: string;
  subtitle?: string;
  properties: Property[];
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function HorizontalPropertyScroll({
  title,
  subtitle,
  properties,
  badge,
  icon: Icon,
}: HorizontalPropertyScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getIconAnimation = () => {
    if (!Icon) return "";
    const iconName = Icon.displayName || Icon.name || "";
    if (iconName.includes("Clock")) return "animate-clock";
    if (iconName.includes("Sparkles")) return "animate-sparkle-glow";
    if (iconName.includes("TrendingDown")) return "animate-bounce-down";
    return "";
  };

  return (
    <section className="py-10 lg:py-12 my-8 bg-gradient-to-br from-slate-50 via-blue-50/60 to-slate-100/60 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-800/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {Icon && (
              <div className="w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center shadow-lg">
                <Icon className={`h-6 w-6 text-primary ${getIconAnimation()}`} />
              </div>
            )}
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-1">
                {title}
              </h2>
              {subtitle && (
                <p className="text-muted-foreground text-sm">{subtitle}</p>
              )}
            </div>
          </div>
          {badge && (
            <Badge variant="secondary" className="rounded-full px-4 py-2 shadow-md">
              {badge}
            </Badge>
          )}
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {properties.map((property) => (
              <div key={property.id} className="flex-none w-[350px]">
                <PropertyCard {...property} />
              </div>
            ))}
          </div>

          {/* Bottom Controls Container */}
          <div className="relative mt-4">
            {/* Bowtie Navigation - Centered with Gold Bar */}
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={() => scroll("left")}
                className="group relative hover-elevate active-elevate-2 transition-all z-10"
                data-testid="button-scroll-left"
                aria-label="Scroll left"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" className="transition-transform group-hover:scale-110">
                  <path
                    d="M 30 10 L 10 20 L 30 30 Z"
                    fill="currentColor"
                    className="text-[#0a1628] dark:text-white/80 group-hover:text-[#0a1628] dark:group-hover:text-white"
                  />
                </svg>
              </button>
              {/* Gold Connector Bar */}
              <div className="h-1 w-16 bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] rounded-full shadow-sm" />
              <button
                onClick={() => scroll("right")}
                className="group relative hover-elevate active-elevate-2 transition-all z-10"
                data-testid="button-scroll-right"
                aria-label="Scroll right"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" className="transition-transform group-hover:scale-110">
                  <path
                    d="M 10 10 L 30 20 L 10 30 Z"
                    fill="currentColor"
                    className="text-[#0a1628] dark:text-white/80 group-hover:text-[#0a1628] dark:group-hover:text-white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
