import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Sparkles, MousePointer, Heart } from "lucide-react";
import heroImage from "@assets/generated_images/luxury_living_room_concierge.jpeg";

const propertyTypes = ["Condo", "Co-op", "Townhouse", "Penthouse"];
const bedrooms = ["Studio", "1", "2", "3", "4+"];
const bathrooms = ["1", "1.5", "2", "2.5", "3+"];
const popularCategories = ["With Balcony", "No HOA", "1500+ sqft", "2000+ sqft", "Pet Friendly", "Doorman"];

export function HeroSearch() {
  const [priceRange, setPriceRange] = useState([2000000, 6000000]);
  const [sqftRange, setSqftRange] = useState([1500, 3000]);
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
      {/* Top Section - Gradient Blend into Image */}
      <section className="bg-gradient-to-b from-white via-white/95 to-transparent dark:from-background dark:via-background/95 dark:to-transparent pt-8 lg:pt-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Your Perfect Home<br />Discovered
          </h1>
          
          {/* Luxury Markets */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-sm font-medium text-muted-foreground tracking-wide">LUXURY PROPERTIES IN</span>
            <div className="flex items-center gap-2 font-serif text-lg font-semibold" style={{ color: '#d4af37' }}>
              <span>NYC</span>
              <span className="text-muted-foreground">·</span>
              <span>CA</span>
              <span className="text-muted-foreground">·</span>
              <span>NV</span>
            </div>
          </div>
          
          {/* Navy Section - Full Width Horizontal Bar */}
          <div className="bg-[#0a1628] py-6 -mx-6 px-6 mb-0">
            <p className="text-sm text-white font-light leading-relaxed mb-3 max-w-2xl mx-auto">
              Leverage agentic AI to do the heavy lifting for you. Agent Kammer will automatically scan multiple luxury markets for you every second of the day. Set your alert, set your preferences and beat your competition to your dream house.
            </p>
            <div className="flex items-center justify-center gap-1.5">
              {/* Left Heart Bubbles */}
              <div className="flex gap-0.5 items-center">
                <Heart 
                  className="w-1.5 h-1.5 text-[#d4af37] animate-pulse -translate-y-0.5" 
                  strokeWidth={2}
                  fill="none"
                  style={{ animationDuration: '2.3s', animationDelay: '0.2s' }}
                />
                <Heart 
                  className="w-2 h-2 text-[#d4af37] animate-pulse translate-y-0.5" 
                  strokeWidth={2}
                  fill="none"
                  style={{ animationDuration: '1.8s' }}
                />
              </div>
              
              <p className="font-serif text-2xl text-white font-semibold">
                Live where you belong
              </p>
              
              {/* Right Heart Bubbles */}
              <div className="flex gap-0.5 items-center">
                <Heart 
                  className="w-1.5 h-1.5 text-[#d4af37] animate-pulse translate-y-0.5" 
                  strokeWidth={2}
                  fill="none"
                  style={{ animationDuration: '2.1s', animationDelay: '0.4s' }}
                />
                <Heart 
                  className="w-2 h-2 text-[#d4af37] animate-pulse -translate-y-0.5" 
                  strokeWidth={2}
                  fill="none"
                  style={{ animationDuration: '2.5s', animationDelay: '0.1s' }}
                />
              </div>
            </div>
          </div>
          
          {/* Full Width Animated Divider */}
          <div className="w-full px-12 py-2">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Heart className="w-3 h-3 animate-pulse opacity-60" />
              <MousePointer className="w-3 h-3 animate-pulse" style={{ animationDelay: '0.1s' }} />
              <Sparkles className="w-3 h-3 animate-pulse opacity-50" style={{ animationDelay: '0.2s' }} />
              <Heart className="w-3 h-3 animate-pulse opacity-40" style={{ animationDelay: '0.3s' }} />
              <MousePointer className="w-3 h-3 animate-pulse" style={{ animationDelay: '0.4s' }} />
              <Sparkles className="w-3 h-3 animate-pulse opacity-70" style={{ animationDelay: '0.5s' }} />
              <Heart className="w-3 h-3 animate-pulse opacity-60" style={{ animationDelay: '0.6s' }} />
              <MousePointer className="w-3 h-3 animate-pulse" style={{ animationDelay: '0.7s' }} />
              <Sparkles className="w-3 h-3 animate-pulse opacity-40" style={{ animationDelay: '0.8s' }} />
              <Heart className="w-3 h-3 animate-pulse opacity-70" style={{ animationDelay: '0.9s' }} />
              <MousePointer className="w-3 h-3 animate-pulse" style={{ animationDelay: '1s' }} />
              <Sparkles className="w-3 h-3 animate-pulse opacity-60" style={{ animationDelay: '1.1s' }} />
              <Heart className="w-3 h-3 animate-pulse opacity-50" style={{ animationDelay: '1.2s' }} />
              <MousePointer className="w-3 h-3 animate-pulse" style={{ animationDelay: '1.3s' }} />
              <Sparkles className="w-3 h-3 animate-pulse opacity-40" style={{ animationDelay: '1.4s' }} />
              <Heart className="w-3 h-3 animate-pulse opacity-60" style={{ animationDelay: '1.5s' }} />
              <MousePointer className="w-3 h-3 animate-pulse" style={{ animationDelay: '1.6s' }} />
              <Sparkles className="w-3 h-3 animate-pulse opacity-70" style={{ animationDelay: '1.7s' }} />
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
