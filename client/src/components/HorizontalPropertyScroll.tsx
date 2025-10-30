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
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
      </div>
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10%" cy="50%" r="100" fill="none" stroke="rgba(42,88,145,0.1)" strokeWidth="0.5" />
        <circle cx="90%" cy="50%" r="120" fill="none" stroke="rgba(42,88,145,0.08)" strokeWidth="0.5" />
        <circle cx="50%" cy="30%" r="80" fill="none" stroke="rgba(184,134,11,0.06)" strokeWidth="0.5" />
      </svg>
      
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
