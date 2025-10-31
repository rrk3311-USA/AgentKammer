import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin } from "lucide-react";
import heroImage from "@assets/generated_images/NYC_luxury_penthouse_interior_hero_88d3b5ec.png";

const propertyTypes = ["Condo", "Co-op", "Townhouse", "Penthouse"];
const bedrooms = ["Studio", "1", "2", "3", "4+"];
const bathrooms = ["1", "1.5", "2", "2.5", "3+"];
const popularCategories = ["With Balcony", "No HOA", "1500+ sqft", "2000+ sqft", "Pet Friendly", "Doorman"];

export function HeroSearch() {
  const [priceRange, setPriceRange] = useState([500000, 5000000]);
  const [sqftRange, setSqftRange] = useState([500, 3000]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedBeds, setSelectedBeds] = useState<string>("");
  const [selectedBaths, setSelectedBaths] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const formatSqft = (value: number) => {
    return `${value.toLocaleString()} sqft`;
  };

  const handleSearch = () => {
    console.log("Search triggered with:", {
      priceRange,
      sqftRange,
      selectedPropertyTypes,
      selectedBeds,
      selectedBaths,
      selectedCategories,
      location,
    });
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-white mb-4">
            Discover Your Perfect Home
          </h1>
          <p className="text-xl text-white/90 font-light">
            Live where you belong
          </p>
        </div>

        <Card className="p-6 lg:p-8 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-base font-medium">
              Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Manhattan, Brooklyn, Queens..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
                data-testid="input-location"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={100000}
                max={10000000}
                step={100000}
                className="w-full"
                data-testid="slider-price-range"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">
                Square Footage: {formatSqft(sqftRange[0])} - {formatSqft(sqftRange[1])}
              </Label>
              <Slider
                value={sqftRange}
                onValueChange={setSqftRange}
                min={500}
                max={5000}
                step={100}
                className="w-full"
                data-testid="slider-sqft-range"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Popular Categories</Label>
            <div className="flex flex-wrap gap-2">
              {popularCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => toggleCategory(category)}
                  data-testid={`badge-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Property Type</Label>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <Badge
                  key={type}
                  variant={selectedPropertyTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => togglePropertyType(type)}
                  data-testid={`badge-property-${type.toLowerCase()}`}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-base font-medium">Bedrooms</Label>
              <div className="flex flex-wrap gap-2">
                {bedrooms.map((bed) => (
                  <Badge
                    key={bed}
                    variant={selectedBeds === bed ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2"
                    onClick={() => setSelectedBeds(bed === selectedBeds ? "" : bed)}
                    data-testid={`badge-bed-${bed}`}
                  >
                    {bed}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Bathrooms</Label>
              <div className="flex flex-wrap gap-2">
                {bathrooms.map((bath) => (
                  <Badge
                    key={bath}
                    variant={selectedBaths === bath ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2"
                    onClick={() => setSelectedBaths(bath === selectedBaths ? "" : bath)}
                    data-testid={`badge-bath-${bath}`}
                  >
                    {bath}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full rounded-full text-base font-semibold uppercase tracking-wide text-black"
            onClick={handleSearch}
            data-testid="button-search-properties"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Properties
          </Button>
        </Card>
      </div>
    </section>
  );
}
