import { HeroSearch } from "@/components/HeroSearch";
import { HorizontalPropertyScroll } from "@/components/HorizontalPropertyScroll";
import { PropertyCard } from "@/components/PropertyCard";
import { AgenticComputeSection } from "@/components/AgenticCompute/AgenticComputeSection";
import { LuxuryMoodBoard } from "@/components/LuxuryMoodBoard";
import { LuxuryBackground } from "@/components/LuxuryBackground";
import { ListingReportSection } from "@/components/ListingReportSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TrendingDown, Clock, Sparkles, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import property1 from "@assets/generated_images/Modern_Manhattan_condo_exterior_bdf30aa9.png";
import property2 from "@assets/generated_images/Brooklyn_brownstone_townhouse_exterior_43d55d05.png";
import property3 from "@assets/generated_images/NYC_apartment_living_space_interior_ba500d46.png";
import property4 from "@assets/generated_images/Manhattan_penthouse_rooftop_terrace_25c2682e.png";
import property5 from "@assets/generated_images/Upper_West_Side_co-op_building_1e75d246.png";
import storefrontImg from "@assets/BBD593A1-EF8F-40A7-BD11-A6F13773084E_1_105_c_1762128066935.jpg";
import agentKammerWelcoming from "@assets/generated_images/Agent_Kammer_back_view_welcoming_f4ea9ab9.png";

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
      daysOnMarket: 12,
      dealScore: 8.5,
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
      daysOnMarket: 8,
      dealScore: 9.2,
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
      daysOnMarket: 15,
      dealScore: 8.8,
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
      daysOnMarket: 5,
      dealScore: 9.5,
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
      daysOnMarket: 18,
      dealScore: 8.3,
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
      daysOnMarket: 22,
      dealScore: 7.9,
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
      dealScore: 8.5,
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
      dealScore: 7.8,
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
      dealScore: 8.2,
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
      dealScore: 7.5,
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
      dealScore: 9.1,
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
      daysOnMarket: 87,
      dealScore: 9.3,
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
      daysOnMarket: 62,
      dealScore: 8.9,
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
      daysOnMarket: 45,
      dealScore: 9.5,
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

      <section className="bg-[#0a1628]" data-testid="section-longest-on-market">
        <div className="max-w-7xl mx-auto px-6 pt-10 lg:pt-12 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
              <Clock className="h-6 w-6 text-[#d4af37] animate-clock" />
            </div>
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-1 text-white">
                Longest on Market
              </h2>
              <p className="text-white/70 text-sm">Prime opportunities - properties with extended market presence</p>
            </div>
          </div>
          <div className="flex items-center bg-muted rounded-2xl p-1 shadow-inner gap-1 w-fit">
            <button
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                midtownFilter === "above" 
                  ? "bg-primary shadow-md" 
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
                  ? "bg-primary shadow-md" 
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
                  ? "bg-primary shadow-md" 
                  : "text-muted-foreground hover-elevate"
              }`}
              onClick={() => setMidtownFilter("below")}
              data-testid="badge-filter-below-midtown"
            >
              Below Midtown
            </button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 max-w-7xl mx-auto px-6" style={{ scrollbarWidth: "none" }}>
          {longestOnMarket.map((property) => (
            <div key={property.id} className="flex-none w-[350px]">
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-10 lg:pb-12">
          <div className="flex items-center justify-center gap-0 mt-4">
            <button
              onClick={() => {
                const container = document.querySelector('[data-testid="section-longest-on-market"] .overflow-x-auto');
                if (container) {
                  container.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
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
            <button
              onClick={() => {
                const container = document.querySelector('[data-testid="section-longest-on-market"] .overflow-x-auto');
                if (container) {
                  container.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
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
          
          {/* Bubbly Map Button */}
          <div className="flex justify-center mt-8">
            <Link href="/live-deal-map">
              <button
                className="group relative hover:scale-105 active:scale-95 transition-all duration-300"
                data-testid="button-live-deal-map"
              >
                <div className="relative">
                  {/* Orb glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37] to-[#c49b2a] rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  {/* Main button */}
                  <div className="relative bg-gradient-to-br from-[#d4af37] to-[#c49b2a] rounded-2xl px-8 py-4 shadow-2xl border-2 border-white/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-serif text-xl font-bold text-white mb-0.5">
                          Live Deal Map
                        </div>
                        <div className="text-xs text-white/90 font-medium">
                          Explore NYC Luxury Deals
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </section>

      <AgenticComputeSection />

        <ListingReportSection />

        <LuxuryMoodBoard />

        <section className="py-8 lg:py-12 bg-[#0a1628] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side: Text and CTA */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-4 relative inline-block">
                  <span className="relative">
                    Ready to Find Your Dream Home?
                    {/* Sonar pulse effect */}
                    <div 
                      className="absolute inset-0 overflow-visible pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(244,208,63,0.3) 30%, transparent 70%)',
                        animation: 'sonarPulse 8s ease-in-out infinite',
                        mixBlendMode: 'screen',
                        filter: 'blur(1px)',
                      }}
                    />
                    {/* Scanning beam */}
                    <div 
                      className="absolute inset-0 overflow-hidden pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.2) 45%, rgba(244,208,63,0.5) 50%, rgba(212,175,55,0.2) 55%, transparent 100%)',
                        animation: 'slowScan 10s ease-in-out infinite',
                        mixBlendMode: 'screen',
                      }}
                    />
                    {/* Magical sparks */}
                    <div 
                      className="absolute inset-0 overflow-visible pointer-events-none"
                      style={{
                        animation: 'sparkle 3s linear infinite',
                      }}
                    >
                      <div className="absolute" style={{ left: '10%', top: '-20%', animation: 'twinkle 2s ease-in-out infinite' }}>
                        <div className="w-1 h-1 bg-[#d4af37] rounded-full" style={{ boxShadow: '0 0 4px 2px rgba(212,175,55,0.8)' }} />
                      </div>
                      <div className="absolute" style={{ left: '30%', top: '120%', animation: 'twinkle 2.5s ease-in-out infinite 0.5s' }}>
                        <div className="w-1.5 h-1.5 bg-[#f4d03f] rounded-full" style={{ boxShadow: '0 0 6px 3px rgba(244,208,63,0.8)' }} />
                      </div>
                      <div className="absolute" style={{ left: '60%', top: '-10%', animation: 'twinkle 2.2s ease-in-out infinite 1s' }}>
                        <div className="w-1 h-1 bg-[#d4af37] rounded-full" style={{ boxShadow: '0 0 4px 2px rgba(212,175,55,0.8)' }} />
                      </div>
                      <div className="absolute" style={{ left: '80%', top: '110%', animation: 'twinkle 3s ease-in-out infinite 1.5s' }}>
                        <div className="w-1.5 h-1.5 bg-[#f4d03f] rounded-full" style={{ boxShadow: '0 0 6px 3px rgba(244,208,63,0.8)' }} />
                      </div>
                      <div className="absolute" style={{ left: '90%', top: '50%', animation: 'twinkle 2.8s ease-in-out infinite 0.8s' }}>
                        <div className="w-1 h-1 bg-[#d4af37] rounded-full" style={{ boxShadow: '0 0 4px 2px rgba(212,175,55,0.8)' }} />
                      </div>
                    </div>
                  </span>
                </h2>
                <style>{`
                  @keyframes slowScan {
                    0%, 100% { transform: translateX(-120%); opacity: 0; }
                    10% { opacity: 1; }
                    50% { transform: translateX(120%); opacity: 1; }
                    60% { opacity: 0; }
                  }
                  @keyframes sonarPulse {
                    0%, 100% { 
                      transform: scale(0.5); 
                      opacity: 0; 
                    }
                    25% { 
                      transform: scale(1.5); 
                      opacity: 0.6; 
                    }
                    50% { 
                      transform: scale(2.5); 
                      opacity: 0; 
                    }
                    75% { 
                      transform: scale(1.2); 
                      opacity: 0.4; 
                    }
                  }
                  @keyframes twinkle {
                    0%, 100% { 
                      opacity: 0; 
                      transform: scale(0.5) translateY(0); 
                    }
                    50% { 
                      opacity: 1; 
                      transform: scale(1.5) translateY(-5px); 
                    }
                  }
                  @keyframes sparkle {
                    0%, 100% { filter: brightness(1); }
                    50% { filter: brightness(1.3); }
                  }
                `}</style>
                <p className="text-lg mb-8 opacity-90">
                  Join thousands of New Yorkers who trust Agent Kammer to find their perfect property
                </p>
                
                {/* Cell Number CTA Form */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const phone = formData.get('phone');
                  console.log('Phone submitted:', phone);
                  // Show success message
                  const toast = document.createElement('div');
                  toast.textContent = 'Thank you! We\'ll be in touch soon.';
                  toast.className = 'fixed top-4 right-4 bg-white text-gray-800 px-6 py-3 rounded-lg shadow-lg z-50';
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 3000);
                  e.currentTarget.reset();
                }} className="max-w-md mx-auto lg:mx-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Your cell number"
                      required
                      className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      data-testid="input-dream-home-phone"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 px-8 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black font-semibold hover:opacity-90"
                      data-testid="button-dream-home-submit"
                    >
                      Get Started
                    </Button>
                  </div>
                </form>
              </div>

              {/* Right side: Agent Kammer welcoming clients into luxury apartment */}
              <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center bg-[#0a1628] rounded-lg overflow-hidden order-1 lg:order-2">
                <img 
                  src={agentKammerWelcoming} 
                  alt="Agent Kammer in top hat welcoming clients into luxury apartment" 
                  className="w-full h-full object-cover shadow-2xl"
                  style={{ objectPosition: 'center' }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
