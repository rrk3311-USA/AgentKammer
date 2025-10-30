import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Building, Home } from "lucide-react";

interface TickerItem {
  id: string;
  address: string;
  price: number;
  type: "sale" | "listing";
  trend: "up" | "down";
  daysOnMarket: number;
}

export function LiveTicker() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const tickerRef = useRef<HTMLDivElement>(null);

  // TODO: Replace with real API data from Manhattan real estate feeds
  const residentialData: TickerItem[] = [
    { id: "1", address: "432 Park Ave", price: 8500000, type: "sale", trend: "up", daysOnMarket: 12 },
    { id: "2", address: "220 Central Park S", price: 12000000, type: "listing", trend: "down", daysOnMarket: 3 },
    { id: "3", address: "15 Central Park W", price: 15500000, type: "sale", trend: "up", daysOnMarket: 45 },
    { id: "4", address: "One57", price: 9800000, type: "listing", trend: "down", daysOnMarket: 8 },
    { id: "5", address: "56 Leonard St", price: 7200000, type: "sale", trend: "up", daysOnMarket: 22 },
    { id: "6", address: "111 W 57th St", price: 18000000, type: "listing", trend: "up", daysOnMarket: 5 },
    { id: "7", address: "520 Park Ave", price: 6500000, type: "sale", trend: "down", daysOnMarket: 67 },
    { id: "8", address: "The Plaza", price: 25000000, type: "listing", trend: "up", daysOnMarket: 15 },
  ];

  const commercialData: TickerItem[] = [
    { id: "c1", address: "1 Wall St", price: 45000000, type: "sale", trend: "up", daysOnMarket: 28 },
    { id: "c2", address: "350 Park Ave", price: 85000000, type: "listing", trend: "down", daysOnMarket: 11 },
    { id: "c3", address: "660 Madison Ave", price: 52000000, type: "sale", trend: "up", daysOnMarket: 33 },
    { id: "c4", address: "Times Square Tower", price: 120000000, type: "listing", trend: "up", daysOnMarket: 7 },
    { id: "c5", address: "Chrysler Building", price: 95000000, type: "sale", trend: "down", daysOnMarket: 52 },
    { id: "c6", address: "Trump Tower", price: 78000000, type: "listing", trend: "up", daysOnMarket: 19 },
  ];

  const residentialDuplicated = [...residentialData, ...residentialData, ...residentialData];
  const commercialDuplicated = [...commercialData, ...commercialData, ...commercialData];

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t-2 border-primary/40 shadow-2xl scale-125 origin-bottom" style={{ transformOrigin: 'bottom' }}>
      <div className="flex items-center gap-4 px-6 py-3 border-b border-primary/30 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50" />
          <span className="text-sm font-bold text-primary uppercase tracking-wider">
            Live Manhattan Activity
          </span>
        </div>
      </div>
      
      <div className="flex">
        <div className="flex flex-col bg-black/60 border-r border-primary/30">
          <button
            onClick={() => setActiveTab("residential")}
            className={`px-4 py-3 flex items-center gap-2 text-xs font-semibold border-b border-primary/20 transition-all ${
              activeTab === "residential" 
                ? "bg-primary text-foreground" 
                : "text-primary/70 hover:bg-primary/10 hover:text-primary"
            }`}
            data-testid="badge-residential"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Residential</span>
          </button>
          <button
            onClick={() => setActiveTab("commercial")}
            className={`px-4 py-3 flex items-center gap-2 text-xs font-semibold transition-all ${
              activeTab === "commercial" 
                ? "bg-primary text-foreground" 
                : "text-primary/70 hover:bg-primary/10 hover:text-primary"
            }`}
            data-testid="badge-commercial"
          >
            <Building className="h-3.5 w-3.5" />
            <span>Commercial</span>
          </button>
        </div>

        <div className="flex-1">
          <div className="relative overflow-hidden h-14 bg-gradient-to-r from-black/20 to-black/40">
            <div
              className="flex items-center gap-10 animate-scroll whitespace-nowrap py-3"
              style={{
                animation: activeTab === "residential" ? "scroll 30s linear infinite" : "scroll 35s linear infinite",
              }}
            >
              {(activeTab === "residential" ? residentialDuplicated : commercialDuplicated).map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="text-white/90 font-semibold">{item.address}</span>
                  <span className="text-green-400 font-serif font-bold text-base">
                    {formatPrice(item.price)}
                  </span>
                  <Badge
                    variant={item.type === "sale" ? "default" : "outline"}
                    className="text-xs rounded-full bg-primary/20 text-primary border-primary/40"
                  >
                    {item.type === "sale" ? "SOLD" : "NEW"}
                  </Badge>
                  <span className="text-white/50 text-xs font-medium">{item.daysOnMarket}d</span>
                  {item.trend === "up" ? (
                    <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                  )}
                  <span className="text-primary/30">•</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden h-14 bg-gradient-to-r from-black/40 to-black/20 border-t border-primary/20">
            <div
              className="flex items-center gap-10 animate-scroll whitespace-nowrap py-3"
              style={{
                animation: activeTab === "residential" ? "scroll-reverse 35s linear infinite" : "scroll-reverse 30s linear infinite",
              }}
            >
              {(activeTab === "residential" ? commercialDuplicated : residentialDuplicated).map((item, index) => (
                <div
                  key={`${item.id}-${index}-alt`}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="text-white/80 font-medium">{item.address}</span>
                  <span className="text-green-400 font-serif font-bold text-base">
                    {formatPrice(item.price)}
                  </span>
                  <Badge
                    variant={item.type === "sale" ? "default" : "outline"}
                    className="text-xs rounded-full bg-primary/20 text-primary border-primary/40"
                  >
                    {item.type === "sale" ? "SOLD" : "NEW"}
                  </Badge>
                  <span className="text-white/50 text-xs font-medium">{item.daysOnMarket}d</span>
                  {item.trend === "up" ? (
                    <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                  )}
                  <span className="text-primary/30">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes scroll-reverse {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
