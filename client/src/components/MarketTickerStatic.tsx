import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, DollarSign, Percent, CreditCard, Building2, Clock } from "lucide-react";

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

export function MarketTickerStatic() {
  const [rates, setRates] = useState<MarketRate[]>(FALLBACK_RATES);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Fetch live market data from public APIs
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const fredApiKey = "45f54a01e27b13fab6a48d1f18ef16e8";
        
        const [primeRes, fedRes, mortgageRes] = await Promise.all([
          fetch(`https://api.stlouisfed.org/fred/series/data?series_id=MMNRNJ&api_key=${fredApiKey}&file_type=json&limit=1`),
          fetch(`https://api.stlouisfed.org/fred/series/data?series_id=FEDFUNDS&api_key=${fredApiKey}&file_type=json&limit=1`),
          fetch(`https://api.stlouisfed.org/fred/series/data?series_id=MORTGAGE30US&api_key=${fredApiKey}&file_type=json&limit=2`)
        ]);

        const primeData = await primeRes.json();
        const fedData = await fedRes.json();
        const mortgageData = await mortgageRes.json();

        if (primeData.observations?.length > 0 && fedData.observations?.length > 0 && mortgageData.observations?.length > 0) {
          const primeValue = parseFloat(primeData.observations[0].value) || 8.50;
          const fedValue = parseFloat(fedData.observations[0].value) || 5.50;
          const mortgageValue = parseFloat(mortgageData.observations[0].value) || 6.82;
          const mortgagePrev = mortgageData.observations[1]?.value ? parseFloat(mortgageData.observations[1].value) : mortgageValue;
          const mortgageChange = mortgageValue - mortgagePrev;

          setRates([
            { label: "30Y Fixed", value: mortgageValue.toFixed(2) + "%", change: mortgageChange, icon: Percent },
            { label: "Prime Rate", value: primeValue.toFixed(2) + "%", change: 0, icon: Building2 },
            { label: "Fed Rate", value: fedValue.toFixed(2) + "%", change: 0, icon: DollarSign },
            { label: "Avg APR", value: "24.6%", change: 0.2, icon: CreditCard },
          ]);
          setLastUpdate(new Date());
        }
      } catch (error) {
        console.log("Using fallback rates");
        setRates(FALLBACK_RATES);
      }
    };

    fetchLiveData();
    // Refresh every 30 minutes
    const interval = setInterval(fetchLiveData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full space-y-6" data-testid="market-ticker-static">
      {/* Clock & Last Update Headline */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] flex items-center justify-center relative bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5">
            <Clock className="h-7 w-7 text-[#d4af37]" />
            {/* Animated pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#d4af37] opacity-50" style={{
              animation: 'pulse 2s ease-in-out infinite'
            }} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-white">
              Last Updated
            </h3>
            <p className="text-sm text-[#d4af37] font-mono">
              {formatTime(lastUpdate)}
            </p>
            <p className="text-xs text-white/60">
              {formatDate(lastUpdate)}
            </p>
          </div>
        </div>
      </div>

      {/* Market Rates Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="market-rates-grid">
        {rates.map((rate) => {
          const IconComponent = rate.icon;
          return (
            <div
              key={rate.label}
              className="p-4 bg-black/50 border border-[#d4af37]/30 rounded-lg hover:border-[#d4af37]/60 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <IconComponent className="h-4 w-4 text-[#d4af37]" />
                <span className="text-[10px] font-medium text-[#d4af37] uppercase tracking-wide">
                  {rate.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-lg font-bold text-white">
                  {rate.value}
                </span>
                <div className="flex items-center gap-1">
                  {getTrendIcon(rate.change)}
                  <span className={`text-xs font-medium ${getTrendColor(rate.change)}`}>
                    {rate.change > 0 ? "+" : ""}{rate.change !== 0 ? rate.change.toFixed(2) : "—"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
