import { TrendingUp, TrendingDown, Minus, DollarSign, Percent, CreditCard, Building2, PiggyBank, Shield, Briefcase, Landmark, LineChart, Home, Wallet } from "lucide-react";

interface MarketRate {
  label: string;
  value: string;
  change: number;
  icon: typeof DollarSign;
}

const MARKET_RATES: MarketRate[] = [
  { label: "30Y Fixed", value: "6.82%", change: -0.03, icon: Home },
  { label: "15Y Fixed", value: "6.09%", change: -0.05, icon: Building2 },
  { label: "Prime Rate", value: "8.50%", change: 0, icon: Landmark },
  { label: "Fed Rate", value: "5.50%", change: 0, icon: DollarSign },
  { label: "Avg CC APR", value: "24.6%", change: 0.2, icon: CreditCard },
  { label: "S&P 500", value: "6,032.38", change: 33.64, icon: LineChart },
  { label: "DJIA", value: "44,910.65", change: -138.25, icon: TrendingDown },
  { label: "10Y Treasury", value: "4.19%", change: -0.02, icon: Percent },
  { label: "Bitcoin", value: "$97,284", change: 1205.40, icon: Wallet },
  { label: "Gold", value: "$2,684.20", change: 12.30, icon: PiggyBank },
  { label: "Savings APY", value: "5.05%", change: 0, icon: PiggyBank },
  { label: "CD Rate (1Y)", value: "4.85%", change: -0.10, icon: Shield },
];

export function LiveTicker() {
  const getTrendIcon = (change: number, isInverse: boolean = false) => {
    // For rates like APR where lower is better, inverse the color logic
    if (change > 0) return <TrendingUp className={`h-3 w-3 ${isInverse ? 'text-red-400' : 'text-green-400'}`} />;
    if (change < 0) return <TrendingDown className={`h-3 w-3 ${isInverse ? 'text-green-400' : 'text-red-400'}`} />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  const getTrendColor = (change: number, isInverse: boolean = false) => {
    if (change > 0) return isInverse ? "text-red-400" : "text-green-400";
    if (change < 0) return isInverse ? "text-green-400" : "text-red-400";
    return "text-gray-400";
  };

  const formatChange = (change: number) => {
    if (change === 0) return "—";
    const prefix = change > 0 ? "+" : "";
    // For larger numbers, show actual value
    if (Math.abs(change) >= 1) {
      return `${prefix}${change.toFixed(2)}`;
    }
    return `${prefix}${change.toFixed(2)}`;
  };

  // Determine if this is a rate where increase is bad (like APR, interest rates)
  const isInverseRate = (label: string) => {
    return label.includes("APR") || label.includes("Fixed") || label.includes("Prime") || label.includes("Fed");
  };

  // Create multiple copies for seamless scrolling
  const tickerItems = [...MARKET_RATES, ...MARKET_RATES, ...MARKET_RATES];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-40 bg-[#0a1628] border-t border-t-[0.5px] border-[#d4af37]/30 py-2">
      <div className="relative overflow-hidden h-8">
        <div
          className="flex items-center gap-6 whitespace-nowrap"
          style={{
            animation: "marketScroll 11s linear infinite",
          }}
        >
          {tickerItems.map((rate, index) => {
            const IconComponent = rate.icon;
            const inverse = isInverseRate(rate.label);
            return (
              <div
                key={`${rate.label}-${index}`}
                className="flex items-center gap-2 px-3 py-1 border border-[#d4af37]/40 rounded-sm bg-black/30"
                data-testid={`ticker-rate-${rate.label.toLowerCase().replace(/\s+/g, '-')}-${index}`}
              >
                <IconComponent className="h-3.5 w-3.5 text-[#d4af37]" />
                <span className="text-[10px] font-medium text-[#d4af37] uppercase tracking-wide">
                  {rate.label}
                </span>
                <span className="font-mono text-xs font-bold text-white tabular-nums">
                  {rate.value}
                </span>
                <div className="flex items-center gap-0.5">
                  {getTrendIcon(rate.change, inverse)}
                  <span className={`text-[10px] font-medium ${getTrendColor(rate.change, inverse)}`}>
                    {formatChange(rate.change)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marketScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
}
