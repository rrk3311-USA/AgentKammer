import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plane, UtensilsCrossed, ShoppingBag, Zap, Lightbulb, TrendingUp, Brain, BarChart3, ArrowRight } from "lucide-react";

const creditCards = [
  { name: "Platinum Rewards", issuer: "Global Bank", color: "from-blue-500 to-cyan-400", accent: "#00d4ff" },
  { name: "Travel Elite", issuer: "International Airways", color: "from-sky-400 to-blue-500", accent: "#0ea5e9" },
  { name: "Premium Cashback", issuer: "Finance Corp", color: "from-emerald-400 to-teal-500", accent: "#10b981" },
  { name: "Executive Black", issuer: "Luxury Banker", color: "from-slate-400 to-blue-600", accent: "#00d4ff" },
  { name: "Entrepreneur's Edge", issuer: "Business Finance", color: "from-purple-400 to-blue-500", accent: "#c084fc" },
  { name: "Premium Visa", issuer: "First Capital", color: "from-indigo-400 to-blue-600", accent: "#6366f1" },
  { name: "Business Elite", issuer: "Corporate Finance", color: "from-amber-400 to-orange-500", accent: "#fbbf24" },
  { name: "Student Plus", issuer: "Future Bank", color: "from-cyan-400 to-sky-500", accent: "#06b6d4" },
  { name: "Rewards Max", issuer: "Premium Partners", color: "from-pink-400 to-rose-500", accent: "#f472b6" },
  { name: "Luxury Card", issuer: "Wealth Management", color: "from-cyan-400 to-teal-500", accent: "#00d4ff" },
  { name: "Flex Rewards", issuer: "Credit Solutions", color: "from-teal-400 to-cyan-500", accent: "#14b8a6" },
  { name: "Signature Reserve", issuer: "Elite Banking", color: "from-yellow-400 to-amber-500", accent: "#fbbf24" },
];

const benefits = [
  { icon: Plane, label: "Airport Lounges", color: "from-blue-600/20 to-cyan-600/20" },
  { icon: UtensilsCrossed, label: "Fine Dining Credits", color: "from-amber-600/20 to-orange-600/20" },
  { icon: ShoppingBag, label: "Shopping Rewards", color: "from-pink-600/20 to-rose-600/20" },
  { icon: Zap, label: "Instant Cashback", color: "from-yellow-600/20 to-amber-600/20" },
  { icon: Lightbulb, label: "Travel Insurance", color: "from-purple-600/20 to-indigo-600/20" },
  { icon: TrendingUp, label: "Investment Perks", color: "from-green-600/20 to-emerald-600/20" },
];

export function CreditCardShowcase() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    if (scrollContainer.current) {
      setCanScrollLeft(scrollContainer.current.scrollLeft > 0);
      setCanScrollRight(
        scrollContainer.current.scrollLeft < 
        scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth - 10
      );
      
      // Calculate scroll progress for dot navigation
      const scrollPercentage = 
        (scrollContainer.current.scrollLeft / 
        (scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth)) * 100;
      setScrollProgress(scrollPercentage);
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
        {/* The Agentic Advantage Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge 
              className="mb-4 border-0" 
              style={{ 
                background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                color: '#000',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem'
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              The Agentic Advantage
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
              Three Steps to Perfect Matches
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our AI-powered engine matches you with financial products designed for your unique profile
            </p>
          </div>

          {/* Steps Grid - Strategic Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { 
                num: '1', 
                title: 'Build Your Profile', 
                desc: 'Income, credit band, location, goals—one time. Your profile powers all recommendations.',
                icon: Brain
              },
              { 
                num: '2', 
                title: 'AI Analyzes Offers', 
                desc: 'We screen hundreds of partner offers across categories, ranking them by your fit.',
                icon: BarChart3
              },
              { 
                num: '3', 
                title: 'You Choose - We Route', 
                desc: 'Go straight to the best matched lender, card, or tool. No guesswork.',
                icon: ArrowRight
              }
            ].map((step) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={step.num}
                  className="rounded-2xl overflow-hidden backdrop-blur-md border-2 transition-all duration-300 hover:scale-105 h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(25, 50, 100, 0.4) 100%)',
                    borderColor: 'rgba(212, 175, 55, 0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212,175,55,0.2)'
                  }}
                >
                  <div className="p-8 flex flex-col h-full">
                    {/* Step number badge */}
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-6 text-2xl font-bold text-white flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                        boxShadow: '0 8px 16px rgba(212, 175, 55, 0.3)'
                      }}
                    >
                      {step.num}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-white/75 mb-6 flex-1 leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Icon at bottom */}
                    <div className="flex justify-end">
                      <StepIcon className="h-8 w-8 text-[#d4af37]/50" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategy Pitch Section */}
        <div className="mb-16 bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Strategic Card Matching
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Forget generic recommendations. We match the perfect card to your perfect moment—when you need it most and where it matters most.
              </p>
              <ul className="space-y-3 text-white/70">
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">→</span>
                  <span><strong>Strategic Timing:</strong> Get recommended cards for upcoming travel, major purchases, or life events</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">→</span>
                  <span><strong>Reward Maximization:</strong> Book $7k flights for 85k points. Our game plans show you exactly how</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">→</span>
                  <span><strong>Personalized Playbooks:</strong> Unlock strategies tailored to your spending patterns and goals</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#d4af37]/10 to-white/5 rounded-lg p-6 border border-[#d4af37]/20">
              <div className="text-center">
                <div className="text-[#d4af37] text-sm font-bold mb-2 uppercase tracking-wide">Real Results</div>
                <div className="text-5xl font-bold text-white mb-2">85K</div>
                <div className="text-white/70">Points for a $7K Flight</div>
                <div className="text-xs text-white/50 mt-4">Using our strategic card recommendations and reward points optimization</div>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-3">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">
              Credit Cards That
            </h2>
            <h2 className="font-serif text-3xl md:text-5xl font-bold" style={{ background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 50%, #00d4ff 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Compete For You
            </h2>
          </div>
          <p className="text-base md:text-xl text-white/70 max-w-3xl mx-auto">
            100+ premium cards compared and ranked by your profile—from travel rewards to cashback to business advantages
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
            className="flex gap-6 overflow-x-auto scroll-smooth px-12 pb-8"
            style={{ 
              scrollBehavior: "smooth",
              scrollbarWidth: "auto",
              scrollbarColor: "#d4af37 rgba(15, 23, 42, 0.3)"
            } as React.CSSProperties}
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
                  <div 
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-cyan-300/50 backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 255, 136, 0.15) 100%)',
                    }}
                  >
                    0% APR
                  </div>
                  <div 
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-cyan-300/50 backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 255, 136, 0.15) 100%)',
                    }}
                  >
                    Rewards
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator Dots */}
          <style>{`
            div[data-testid="carousel-credit-cards"]::-webkit-scrollbar {
              height: 6px;
            }
            div[data-testid="carousel-credit-cards"]::-webkit-scrollbar-track {
              background: rgba(15, 23, 42, 0.3);
              border-radius: 10px;
            }
            div[data-testid="carousel-credit-cards"]::-webkit-scrollbar-thumb {
              background: linear-gradient(135deg, #d4af37 0%, #c9a02e 100%);
              border-radius: 10px;
            }
            div[data-testid="carousel-credit-cards"]::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(135deg, #e0c158 0%, #d4af37 100%);
            }
          `}</style>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-2 mt-6" data-testid="scroll-dots-navigation">
            {Array.from({ length: 12 }).map((_, idx) => {
              const dotProgress = (idx / 11) * 100;
              const isActive = scrollProgress >= dotProgress - 10 && scrollProgress <= dotProgress + 10;
              return (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive ? 'w-6 bg-[#d4af37]' : 'w-2 bg-white/30'
                  }`}
                  data-testid={`dot-${idx}`}
                />
              );
            })}
          </div>
        </div>

        {/* Benefits Collage */}
        <div className="mb-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#00ff88]">What You'll Unlock</h3>
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
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-base md:text-lg font-semibold text-[#00ff88]">{benefit.label}</p>
              </Card>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
}
