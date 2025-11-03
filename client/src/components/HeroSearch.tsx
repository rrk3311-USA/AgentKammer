import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Sparkles, MousePointer } from "lucide-react";
import heroImage from "@assets/BBD593A1-EF8F-40A7-BD11-A6F13773084E_1_105_c_1762128066935.jpg";

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
    <>
      {/* Top Section - White Background */}
      <section className="bg-white dark:bg-background py-8 lg:py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Your Perfect Home<br />Discovered
          </h1>
          
          {/* Navy Section - Full Width Horizontal Bar */}
          <div className="bg-[#0a1628] py-6 -mx-6 px-6">
            <p className="text-sm text-white font-light leading-relaxed mb-3 max-w-2xl mx-auto">
              Leverage agentic AI to do the heavy lifting for you. Agent Kammer will automatically scan the whole city for you every second of the day. Set your alert, set your preferences and beat your competition to your dream house.
            </p>
            <p className="font-serif text-2xl text-white font-semibold mb-3">
              Live where you belong
            </p>
            
            <div className="flex items-center justify-center gap-1 text-primary mb-2">
              <Sparkles className="w-2 h-2 animate-pulse opacity-60" />
              <MousePointer className="w-2 h-2 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <Sparkles className="w-2 h-2 animate-pulse opacity-40" style={{ animationDelay: '0.4s' }} />
              <MousePointer className="w-2 h-2 animate-pulse" style={{ animationDelay: '0.6s' }} />
              <Sparkles className="w-2 h-2 animate-pulse opacity-60" style={{ animationDelay: '0.8s' }} />
              <MousePointer className="w-2 h-2 animate-pulse" style={{ animationDelay: '1s' }} />
              <Sparkles className="w-2 h-2 animate-pulse opacity-40" style={{ animationDelay: '1.2s' }} />
              <MousePointer className="w-2 h-2 animate-pulse" style={{ animationDelay: '1.4s' }} />
              <Sparkles className="w-2 h-2 animate-pulse opacity-60" style={{ animationDelay: '1.6s' }} />
            </div>
            <p className="text-xs text-white/60 font-light">
              Download the app
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Section - Search Widget with Background Image */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-background">
        <div
          className="absolute inset-0 bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-12">
          <Card className="p-4 lg:p-6 space-y-4 bg-gradient-to-br from-sky-100/40 via-blue-50/30 to-slate-100/40 backdrop-blur-xl border border-white/60 shadow-2xl">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">
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

            <div className="space-y-3">
              <Label className="text-sm font-medium">
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
            <Label className="text-sm font-medium">Popular Categories</Label>
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
            <Label className="text-sm font-medium">Property Type</Label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Bedrooms</Label>
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
              <Label className="text-sm font-medium">Bathrooms</Label>
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
            className="w-full rounded-full text-sm font-semibold uppercase tracking-wide text-black"
            onClick={handleSearch}
            data-testid="button-search-properties"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Properties
          </Button>
          </Card>
        </div>
      </section>
    </>
  );
}
