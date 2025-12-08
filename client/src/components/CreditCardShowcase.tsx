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
      </div>
    </section>
  );
}
