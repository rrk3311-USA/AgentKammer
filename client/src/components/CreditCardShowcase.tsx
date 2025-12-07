import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plane, UtensilsCrossed, ShoppingBag, Zap, Skull, TrendingUp } from "lucide-react";

const creditCards = [
  { name: "Platinum Rewards", issuer: "Global Bank", color: "from-slate-600 to-slate-700", accent: "#d4af37" },
  { name: "Travel Elite", issuer: "International Airways", color: "from-blue-600 to-blue-700", accent: "#60a5fa" },
  { name: "Premium Cashback", issuer: "Finance Corp", color: "from-emerald-600 to-emerald-700", accent: "#10b981" },
  { name: "Executive Black", issuer: "Luxury Banker", color: "from-gray-900 to-black", accent: "#d4af37" },
  { name: "Entrepreneur's Edge", issuer: "Business Finance", color: "from-purple-600 to-purple-700", accent: "#a78bfa" },
  { name: "Premium Visa", issuer: "First Capital", color: "from-indigo-600 to-indigo-700", accent: "#818cf8" },
];

const benefits = [
  { icon: Plane, label: "Airport Lounges", color: "from-blue-600/20 to-cyan-600/20" },
  { icon: UtensilsCrossed, label: "Fine Dining Credits", color: "from-amber-600/20 to-orange-600/20" },
  { icon: ShoppingBag, label: "Shopping Rewards", color: "from-pink-600/20 to-rose-600/20" },
  { icon: Zap, label: "Instant Cashback", color: "from-yellow-600/20 to-amber-600/20" },
  { icon: Skull, label: "Travel Insurance", color: "from-purple-600/20 to-indigo-600/20" },
  { icon: TrendingUp, label: "Investment Perks", color: "from-green-600/20 to-emerald-600/20" },
];

export function CreditCardShowcase() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainer.current) {
      setCanScrollLeft(scrollContainer.current.scrollLeft > 0);
      setCanScrollRight(
        scrollContainer.current.scrollLeft < 
        scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const scrollAmount = 320;
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
            Credit Cards That <span style={{ color: "#d4af37" }}>Compete For You</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            100+ premium cards compared and ranked by your profile - from travel rewards to cashback to business advantages
          </p>
        </div>

        {/* Credit Cards Carousel */}
        <div className="relative mb-16">
          {/* Scroll Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#d4af37] hover:bg-[#c9a02e] text-black p-2 rounded-full transition-all"
              data-testid="button-scroll-cards-left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#d4af37] hover:bg-[#c9a02e] text-black p-2 rounded-full transition-all"
              data-testid="button-scroll-cards-right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Cards Container */}
          <div
            ref={scrollContainer}
            className="flex gap-6 overflow-x-auto scroll-smooth px-12 pb-4"
            style={{ scrollBehavior: "smooth" }}
            onScroll={checkScroll}
            data-testid="carousel-credit-cards"
          >
            {creditCards.map((card, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-80"
                data-testid={`card-carousel-item-${idx}`}
              >
                {/* Credit Card */}
                <div
                  className={`bg-gradient-to-br ${card.color} rounded-2xl p-8 h-48 relative overflow-hidden shadow-2xl hover-elevate transition-all`}
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--card-start, ${card.color}), var(--card-end))`,
                  }}
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6 text-white/30">
                    <div className="text-4xl font-bold opacity-50">{card.issuer.charAt(0)}</div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-white/70 text-sm mb-2">{card.issuer}</div>
                      <h3 className="text-2xl font-bold text-white">{card.name}</h3>
                    </div>

                    {/* Card Number Area */}
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex-1 h-2 bg-white/20 rounded opacity-50" />
                      ))}
                    </div>
                  </div>

                  {/* Chip */}
                  <div className="absolute bottom-6 left-6 w-12 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded opacity-80" />
                </div>

                {/* Card Stats */}
                <div className="mt-4 flex gap-4">
                  <Badge variant="outline" className="text-white/70 border-white/30">
                    0% APR
                  </Badge>
                  <Badge variant="outline" className="text-white/70 border-white/30">
                    Rewards
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Collage */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">What You'll Unlock</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, idx) => (
              <Card
                key={idx}
                className="p-6 bg-white/5 border-white/10 backdrop-blur-sm hover-elevate transition-all flex flex-col items-center text-center"
                data-testid={`benefit-card-${idx}`}
              >
                <div
                  className={`bg-gradient-to-br ${benefit.color} rounded-lg p-4 mb-3`}
                  style={{
                    background: `linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%)`,
                  }}
                >
                  <benefit.icon className="h-6 w-6 text-[#d4af37]" />
                </div>
                <p className="text-sm font-semibold text-white">{benefit.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-white/60 mb-4">
            Our AI analyzes all 100+ cards and ranks them by YOUR profile
          </p>
          <Badge
            className="border-0 inline-block"
            style={{
              background: "linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)",
              color: "#000",
              fontSize: "0.85rem",
              padding: "0.5rem 1rem",
            }}
          >
            See Your Personalized Rankings
          </Badge>
        </div>
      </div>
    </section>
  );
}
