import { HeroSearch } from "@/components/HeroSearch";
import { HorizontalPropertyScroll } from "@/components/HorizontalPropertyScroll";
import { EmailDigestPreview } from "@/components/EmailDigestPreview";
import { AppDownload } from "@/components/AppDownload";
import { AgenticActionsInfographic } from "@/components/AgenticActionsInfographic";
import { LuxuryBackground } from "@/components/LuxuryBackground";
import { ListingReportSection } from "@/components/ListingReportSection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Clock, Sparkles } from "lucide-react";
import { useState } from "react";
import property1 from "@assets/generated_images/Modern_Manhattan_condo_exterior_bdf30aa9.png";
import property2 from "@assets/generated_images/Brooklyn_brownstone_townhouse_exterior_43d55d05.png";
import property3 from "@assets/generated_images/NYC_apartment_living_space_interior_ba500d46.png";
import property4 from "@assets/generated_images/Manhattan_penthouse_rooftop_terrace_25c2682e.png";
import property5 from "@assets/generated_images/Upper_West_Side_co-op_building_1e75d246.png";

export default function Home() {
  const [midtownFilter, setMidtownFilter] = useState<"midtown" | "above" | "below">("midtown");

  // TODO: Replace with real API data from real estate services (Zillow, Realtor.com, StreetEasy)
  // Current data is mock/staged for prototype demonstration
  const featuredProperties = [
    {
      id: "1",
      image: property1,
      price: 2500000,
      title: "Modern Luxury Condo",
      address: "450 West 42nd Street, Manhattan, NY 10036",
      beds: 2,
      baths: 2,
      sqft: 1450,
      propertyType: "Condo",
    },
    {
      id: "2",
      image: property2,
      price: 4200000,
      title: "Historic Brooklyn Brownstone",
      address: "125 Berkeley Place, Brooklyn, NY 11217",
      beds: 4,
      baths: 3,
      sqft: 2800,
      propertyType: "Townhouse",
    },
    {
      id: "3",
      image: property3,
      price: 1850000,
      title: "Elegant Upper West Side",
      address: "201 West 72nd Street, Manhattan, NY 10023",
      beds: 3,
      baths: 2,
      sqft: 1600,
      propertyType: "Co-op",
    },
    {
      id: "4",
      image: property4,
      price: 8500000,
      title: "Penthouse with Rooftop Terrace",
      address: "75 Wall Street, Manhattan, NY 10005",
      beds: 3,
      baths: 3,
      sqft: 2400,
      propertyType: "Penthouse",
    },
    {
      id: "5",
      image: property5,
      price: 3100000,
      title: "Classic Pre-War Co-op",
      address: "145 Central Park West, Manhattan, NY 10023",
      beds: 2,
      baths: 2,
      sqft: 1800,
      propertyType: "Co-op",
    },
    {
      id: "6",
      image: property1,
      price: 1950000,
      title: "Contemporary Chelsea Loft",
      address: "520 West 28th Street, Manhattan, NY 10001",
      beds: 2,
      baths: 1.5,
      sqft: 1350,
      propertyType: "Condo",
    },
  ];

  const digestProperties = [
    {
      id: "1",
      image: property1,
      price: 2500000,
      title: "Modern Luxury Condo",
      address: "450 West 42nd Street, Manhattan, NY 10036",
      beds: 2,
      baths: 2,
      sqft: 1450,
    },
    {
      id: "2",
      image: property2,
      price: 4200000,
      title: "Historic Brooklyn Brownstone",
      address: "125 Berkeley Place, Brooklyn, NY 11217",
      beds: 4,
      baths: 3,
      sqft: 2800,
    },
    {
      id: "3",
      image: property3,
      price: 1850000,
      title: "Elegant Upper West Side",
      address: "201 West 72nd Street, Manhattan, NY 10023",
      beds: 3,
      baths: 2,
      sqft: 1600,
    },
  ];

  // TODO: Replace with real API data - properties with longest days on market
  const allLongestOnMarket = [
    {
      id: "lom1",
      image: property5,
      price: 2900000,
      title: "Upper East Side Classic Six",
      address: "520 Park Avenue, Manhattan, NY 10065",
      beds: 3,
      baths: 2,
      sqft: 2100,
      propertyType: "Co-op",
      daysOnMarket: 145,
      location: "above",
    },
    {
      id: "lom2",
      image: property2,
      price: 5200000,
      title: "Cobble Hill Townhouse",
      address: "234 Congress Street, Brooklyn, NY 11201",
      beds: 5,
      baths: 3.5,
      sqft: 3400,
      propertyType: "Townhouse",
      daysOnMarket: 128,
      location: "below",
    },
    {
      id: "lom3",
      image: property3,
      price: 2100000,
      title: "Financial District Loft",
      address: "90 William Street, Manhattan, NY 10038",
      beds: 2,
      baths: 2,
      sqft: 1700,
      propertyType: "Condo",
      daysOnMarket: 112,
      location: "below",
    },
    {
      id: "lom4",
      image: property4,
      price: 3400000,
      title: "Midtown West Luxury",
      address: "625 West 57th Street, Manhattan, NY 10019",
      beds: 3,
      baths: 2.5,
      sqft: 1950,
      propertyType: "Condo",
      daysOnMarket: 98,
      location: "midtown",
    },
    {
      id: "lom5",
      image: property1,
      price: 4200000,
      title: "Midtown East Penthouse",
      address: "301 East 50th Street, Manhattan, NY 10022",
      beds: 4,
      baths: 3,
      sqft: 2400,
      propertyType: "Condo",
      daysOnMarket: 105,
      location: "midtown",
    },
  ];

  const longestOnMarket = allLongestOnMarket.filter(prop => prop.location === midtownFilter);

  // TODO: Replace with real API data - properties with recent price reductions
  const mostDiscounted = [
    {
      id: "md1",
      image: property2,
      price: 3800000,
      originalPrice: 4500000,
      discountPercent: 15,
      title: "Brooklyn Heights Townhouse",
      address: "125 Montague Street, Brooklyn, NY 11201",
      beds: 4,
      baths: 3,
      sqft: 2900,
      propertyType: "Townhouse",
    },
    {
      id: "md2",
      image: property5,
      price: 2550000,
      originalPrice: 3000000,
      discountPercent: 15,
      title: "Upper West Side Classic",
      address: "88 Central Park West, Manhattan, NY 10023",
      beds: 3,
      baths: 2,
      sqft: 1900,
      propertyType: "Co-op",
    },
    {
      id: "md3",
      image: property3,
      price: 1700000,
      originalPrice: 2100000,
      discountPercent: 19,
      title: "Chelsea Modern Loft",
      address: "245 West 19th Street, Manhattan, NY 10011",
      beds: 2,
      baths: 2,
      sqft: 1500,
      propertyType: "Condo",
    },
  ];

  return (
    <div className="min-h-screen pb-32 relative">
      <LuxuryBackground />
      <div className="relative z-10">
        <HeroSearch />

      <HorizontalPropertyScroll
        title="Featured Listings"
        subtitle="Handpicked exceptional homes in Manhattan's most sought-after neighborhoods"
        properties={featuredProperties}
        icon={Sparkles}
      />

      <HorizontalPropertyScroll
        title="Most Discounted"
        subtitle="Exceptional value - recent price reductions on premium properties"
        properties={mostDiscounted}
        icon={TrendingDown}
      />

      <section className="py-10 lg:py-12 my-8 bg-gradient-to-br from-slate-50 via-blue-50/60 to-slate-100/60 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-800/40" data-testid="section-longest-on-market">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-primary animate-clock" />
              </div>
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-1">
                  Longest on Market
                </h2>
                <p className="text-muted-foreground text-sm">Prime opportunities - properties with extended market presence</p>
              </div>
            </div>
            <div className="flex items-center bg-muted rounded-2xl p-1 shadow-inner gap-1 w-fit">
              <button
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  midtownFilter === "above" 
                    ? "bg-primary text-black shadow-md" 
                    : "text-muted-foreground hover-elevate"
                }`}
                onClick={() => setMidtownFilter("above")}
                data-testid="badge-filter-above-midtown"
              >
                Above Midtown
              </button>
              <button
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  midtownFilter === "midtown" 
                    ? "bg-primary text-black shadow-md" 
                    : "text-muted-foreground hover-elevate"
                }`}
                onClick={() => setMidtownFilter("midtown")}
                data-testid="badge-filter-midtown"
              >
                Midtown
              </button>
              <button
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  midtownFilter === "below" 
                    ? "bg-primary text-black shadow-md" 
                    : "text-muted-foreground hover-elevate"
                }`}
                onClick={() => setMidtownFilter("below")}
                data-testid="badge-filter-below-midtown"
              >
                Below Midtown
              </button>
            </div>
          </div>
        </div>
        <HorizontalPropertyScroll
          title=""
          properties={longestOnMarket}
        />
      </section>

      <AppDownload />

      <AgenticActionsInfographic />

        <EmailDigestPreview properties={digestProperties} />

        <ListingReportSection />

        <section className="py-16 lg:py-24 bg-[#0a1628] text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-4">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of New Yorkers who trust Agent Kammer to find their perfect property
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full px-8"
              data-testid="button-get-started"
            >
              Get Started Today
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
