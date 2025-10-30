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

  return (
    <section className="py-12 lg:py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(42,88,145,0.08)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(42,88,145,0.05)_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {Icon && (
              <div className="w-14 h-14 rounded-full bg-[#1a2438] border border-primary/20 flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
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
            <Badge variant="secondary" className="rounded-full px-4 py-2 bg-[#1a2438] border border-primary/20">
              {badge}
            </Badge>
          )}
        </div>

        <div className="relative group">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-background/95 backdrop-blur"
            onClick={() => scroll("left")}
            data-testid="button-scroll-left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

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

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-background/95 backdrop-blur"
            onClick={() => scroll("right")}
            data-testid="button-scroll-right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
