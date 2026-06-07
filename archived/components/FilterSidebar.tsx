import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const amenities = [
  "Doorman",
  "Gym",
  "Pool",
  "Parking",
  "Roof Deck",
  "Laundry",
  "Pet Friendly",
  "Storage",
];

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([500000, 5000000]);
  const [sqftRange, setSqftRange] = useState([500, 3000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceOpen, setPriceOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [amenitiesOpen, setAmenitiesOpen] = useState(true);

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const removeAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => prev.filter((a) => a !== amenity));
  };

  const clearAll = () => {
    setPriceRange([500000, 5000000]);
    setSqftRange([500, 3000]);
    setSelectedAmenities([]);
    console.log("All filters cleared");
  };

  const applyFilters = () => {
    console.log("Filters applied:", {
      priceRange,
      sqftRange,
      selectedAmenities,
    });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedAmenities.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {selectedAmenities.map((amenity) => (
                <Badge
                  key={amenity}
                  variant="secondary"
                  className="gap-1"
                  data-testid={`badge-active-${amenity.toLowerCase()}`}
                >
                  {amenity}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeAmenity(amenity)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full" data-testid="button-toggle-price">
            <Label className="text-base font-medium cursor-pointer">Price Range</Label>
            {priceOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
            <div className="text-sm text-muted-foreground">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={100000}
              max={10000000}
              step={100000}
              data-testid="slider-filter-price"
            />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={sizeOpen} onOpenChange={setSizeOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full" data-testid="button-toggle-size">
            <Label className="text-base font-medium cursor-pointer">Square Feet</Label>
            {sizeOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
            <div className="text-sm text-muted-foreground">
              {sqftRange[0].toLocaleString()} - {sqftRange[1].toLocaleString()} sqft
            </div>
            <Slider
              value={sqftRange}
              onValueChange={setSqftRange}
              min={300}
              max={5000}
              step={100}
              data-testid="slider-filter-sqft"
            />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={amenitiesOpen} onOpenChange={setAmenitiesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full" data-testid="button-toggle-amenities">
            <Label className="text-base font-medium cursor-pointer">Amenities</Label>
            {amenitiesOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-4">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => toggleAmenity(amenity)}
                  data-testid={`checkbox-${amenity.toLowerCase()}`}
                />
                <Label
                  htmlFor={amenity}
                  className="text-sm cursor-pointer"
                >
                  {amenity}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <div className="pt-4 space-y-2 border-t">
          <Button
            className="w-full rounded-full"
            onClick={applyFilters}
            data-testid="button-apply-filters"
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full"
            onClick={clearAll}
            data-testid="button-clear-filters"
          >
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
