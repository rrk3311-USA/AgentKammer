import { useEffect, useState } from "react";

export function LiveInterestRate() {
  const FALLBACK_RATE = 6.82;
  const [rate, setRate] = useState(FALLBACK_RATE);
  const [isLive, setIsLive] = useState(false);
  const [displayRate, setDisplayRate] = useState(FALLBACK_RATE);

  useEffect(() => {
    const fetchMortgageRates = async () => {
      try {
        const apiKey = import.meta.env.VITE_MORTGAGE_API_KEY;
        
        if (!apiKey) {
          setRate(FALLBACK_RATE);
          setIsLive(false);
          return;
        }

        const response = await fetch('https://api.api-ninjas.com/v1/mortgagerate?state=NY', {
          headers: {
            'X-Api-Key': apiKey
          }
        });
        
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const data = await response.json();
        
        if (data && data.mortgage_rates && typeof data.mortgage_rates === 'object') {
          const thirtyYearRate = data.mortgage_rates['30_year_fixed'];
          
          if (typeof thirtyYearRate === 'number' && Number.isFinite(thirtyYearRate)) {
            setRate(thirtyYearRate);
            setIsLive(true);
          } else {
            setRate(FALLBACK_RATE);
            setIsLive(false);
          }
        } else {
          setRate(FALLBACK_RATE);
          setIsLive(false);
        }
      } catch (error) {
        console.error('Failed to fetch mortgage rates:', error);
        setRate(FALLBACK_RATE);
        setIsLive(false);
      }
    };

    fetchMortgageRates();
    
    const interval = setInterval(() => {
      fetchMortgageRates();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLive) {
      const animationInterval = setInterval(() => {
        const variation = (Math.random() - 0.5) * 0.02;
        setDisplayRate(rate + variation);
      }, 800);

      return () => clearInterval(animationInterval);
    } else {
      setDisplayRate(rate);
    }
  }, [rate, isLive]);

  const integerPart = Math.floor(displayRate);
  const decimalPart = (displayRate - integerPart).toFixed(3).substring(2);

  return (
    <div 
      className="inline-flex items-center gap-1.5 px-2 py-1 bg-black border border-[#d4af37] rounded-sm"
      data-testid="live-interest-rate-ticker"
    >
      <div className="flex flex-col">
        <span className="text-[7px] font-medium text-[#d4af37] uppercase tracking-wide leading-none">
          Current Rate
        </span>
        <div className="flex items-baseline gap-0.5 mt-0.5">
          <span 
            className="font-mono text-[11px] font-bold text-white tabular-nums"
            data-testid="text-current-rate"
            aria-live="polite"
          >
            {integerPart}.
            <span className={isLive ? "inline-block animate-pulse" : ""}>
              {decimalPart.substring(0, 2)}
            </span>
          </span>
          <span className="text-[10px] font-bold text-white">%</span>
        </div>
      </div>
      {isLive && (
        <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" title="Live data" />
      )}
    </div>
  );
}
