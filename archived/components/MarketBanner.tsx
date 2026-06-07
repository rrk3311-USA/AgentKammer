import { PropertyCard } from "./PropertyCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, Clock } from "lucide-react";

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

interface MarketBannerProps {
  type: "longest" | "discounted";
  properties: Property[];
}

export function MarketBanner({ type, properties }: MarketBannerProps) {
  const config = {
    longest: {
      icon: Clock,
      title: "Longest on Market",
      subtitle: "Prime opportunities - properties with extended market presence",
      badgeText: "Price Negotiable",
    },
    discounted: {
      icon: TrendingDown,
      title: "Most Discounted",
      subtitle: "Exceptional value - recent price reductions on premium properties",
      badgeText: "Price Reduced",
    },
  };

  const { icon: Icon, title, subtitle, badgeText } = config[type];

  return (
    <section className="py-16 lg:py-24 bg-accent/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-1">
                {title}
              </h2>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            {badgeText}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="relative">
              {type === "discounted" && property.discountPercent && (
                <div className="absolute -top-3 left-4 z-10">
                  <Badge variant="destructive" className="shadow-lg">
                    {property.discountPercent}% Off
                  </Badge>
                </div>
              )}
              {type === "longest" && property.daysOnMarket && (
                <div className="absolute -top-3 left-4 z-10">
                  <Badge variant="secondary" className="shadow-lg">
                    {property.daysOnMarket} Days on Market
                  </Badge>
                </div>
              )}
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full"
            data-testid={`button-view-all-${type}`}
          >
            View All {title}
          </Button>
        </div>
      </div>
    </section>
  );
}
