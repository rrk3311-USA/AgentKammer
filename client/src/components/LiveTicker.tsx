import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Building, Home } from "lucide-react";

interface TickerItem {
  id: string;
  address: string;
  price: number;
  type: "sale" | "listing";
  trend: "up" | "down";
}

export function LiveTicker() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const tickerRef = useRef<HTMLDivElement>(null);

  // TODO: Replace with real API data from Manhattan real estate feeds
  const residentialData: TickerItem[] = [
    { id: "1", address: "432 Park Ave", price: 8500000, type: "sale", trend: "up" },
    { id: "2", address: "220 Central Park S", price: 12000000, type: "listing", trend: "down" },
    { id: "3", address: "15 Central Park W", price: 15500000, type: "sale", trend: "up" },
    { id: "4", address: "One57", price: 9800000, type: "listing", trend: "down" },
    { id: "5", address: "56 Leonard St", price: 7200000, type: "sale", trend: "up" },
    { id: "6", address: "111 W 57th St", price: 18000000, type: "listing", trend: "up" },
    { id: "7", address: "520 Park Ave", price: 6500000, type: "sale", trend: "down" },
    { id: "8", address: "The Plaza", price: 25000000, type: "listing", trend: "up" },
  ];

  const commercialData: TickerItem[] = [
    { id: "c1", address: "1 Wall St", price: 45000000, type: "sale", trend: "up" },
    { id: "c2", address: "350 Park Ave", price: 85000000, type: "listing", trend: "down" },
    { id: "c3", address: "660 Madison Ave", price: 52000000, type: "sale", trend: "up" },
    { id: "c4", address: "Times Square Tower", price: 120000000, type: "listing", trend: "up" },
    { id: "c5", address: "Chrysler Building", price: 95000000, type: "sale", trend: "down" },
    { id: "c6", address: "Trump Tower", price: 78000000, type: "listing", trend: "up" },
  ];

  const currentData = activeTab === "residential" ? residentialData : commercialData;
  const duplicatedData = [...currentData, ...currentData, ...currentData];

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f1729] border-t border-primary/20">
      <div className="flex items-center gap-4 px-6 py-2 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Live Manhattan Activity
          </span>
        </div>
        <div className="flex gap-2 ml-auto">
          <Badge
            variant={activeTab === "residential" ? "default" : "outline"}
            className="cursor-pointer rounded-full"
            onClick={() => setActiveTab("residential")}
            data-testid="badge-residential"
          >
            <Home className="h-3 w-3 mr-1" />
            Residential
          </Badge>
          <Badge
            variant={activeTab === "commercial" ? "default" : "outline"}
            className="cursor-pointer rounded-full"
            onClick={() => setActiveTab("commercial")}
            data-testid="badge-commercial"
          >
            <Building className="h-3 w-3 mr-1" />
            Commercial
          </Badge>
        </div>
      </div>
      
      <div className="relative overflow-hidden h-12">
        <div
          ref={tickerRef}
          className="flex items-center gap-8 animate-scroll whitespace-nowrap"
          style={{
            animation: "scroll 60s linear infinite",
          }}
        >
          {duplicatedData.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-2 text-sm"
            >
              <span className="text-primary/60 font-medium">{item.address}</span>
              <span className="text-primary font-serif font-semibold">
                {formatPrice(item.price)}
              </span>
              <Badge
                variant={item.type === "sale" ? "secondary" : "outline"}
                className="text-xs rounded-full"
              >
                {item.type === "sale" ? "SOLD" : "NEW"}
              </Badge>
              {item.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className="text-primary/40">|</span>
            </div>
          ))}
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
      `}</style>
    </div>
  );
}
