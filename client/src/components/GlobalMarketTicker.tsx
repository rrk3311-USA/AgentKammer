import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, DollarSign, Percent, CreditCard, Building2 } from "lucide-react";

interface MarketRate {
  label: string;
  value: string;
  change: number;
  icon: typeof DollarSign;
}

const FALLBACK_RATES: MarketRate[] = [
  { label: "30Y Fixed", value: "6.82%", change: -0.03, icon: Percent },
  { label: "Prime Rate", value: "8.50%", change: 0, icon: Building2 },
  { label: "Fed Rate", value: "5.50%", change: 0, icon: DollarSign },
  { label: "Avg APR", value: "24.6%", change: 0.2, icon: CreditCard },
];

export function GlobalMarketTicker() {
  const [rates, setRates] = useState<MarketRate[]>(FALLBACK_RATES);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rates.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [rates.length]);

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-red-400" />;
    if (change < 0) return <TrendingDown className="h-3 w-3 text-green-400" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-red-400";
    if (change < 0) return "text-green-400";
    return "text-gray-400";
  };

  return (
    <div className="flex items-center gap-3 md:gap-6 overflow-hidden" data-testid="global-market-ticker">
      {rates.map((rate, index) => {
        const IconComponent = rate.icon;
        return (
          <div
            key={rate.label}
            className={`flex items-center gap-2 px-3 py-1.5 bg-black/50 border border-[#d4af37]/30 rounded-sm transition-all duration-500 ${
              index === currentIndex ? "border-[#d4af37] scale-105" : ""
            }`}
          >
            <IconComponent className="h-3.5 w-3.5 text-[#d4af37]" />
            <div className="flex flex-col">
              <span className="text-[7px] font-medium text-[#d4af37] uppercase tracking-wide leading-none">
                {rate.label}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="font-mono text-[11px] font-bold text-white tabular-nums">
                  {rate.value}
                </span>
                <div className="flex items-center gap-0.5">
                  {getTrendIcon(rate.change)}
                  <span className={`text-[9px] font-medium ${getTrendColor(rate.change)}`}>
                    {rate.change > 0 ? "+" : ""}{rate.change !== 0 ? rate.change.toFixed(2) : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
