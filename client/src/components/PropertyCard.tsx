import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Bed, Bath, Maximize, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  id: string;
  image: string;
  price: number;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
}

export function PropertyCard({
  id,
  image,
  price,
  title,
  address,
  beds,
  baths,
  sqft,
  propertyType,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    console.log(`Property ${id} ${!isFavorite ? "added to" : "removed from"} favorites`);
  };

  const handleViewDetails = () => {
    console.log(`View details for property ${id}`);
  };

  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer group shadow-lg hover:shadow-xl" data-testid={`card-property-${id}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute top-4 left-4 backdrop-blur-md bg-background/80 rounded-full px-3 py-1">
          <span className="font-serif text-lg font-semibold text-primary">
            {formatPrice(price)}
          </span>
        </div>
        <div className="absolute top-4 right-4 backdrop-blur-md bg-background/80 rounded-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavorite}
            data-testid={`button-favorite-${id}`}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`}
            />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="backdrop-blur-md bg-background/90">
            {propertyType}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="font-serif text-xl font-medium mb-2 line-clamp-1">
          {title}
        </h3>
        <div className="flex items-start gap-2 text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{address}</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span>{beds} bd</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span>{baths} ba</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-muted-foreground" />
            <span>{sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          variant="outline"
          className="w-full rounded-full"
          onClick={handleViewDetails}
          data-testid={`button-view-details-${id}`}
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
