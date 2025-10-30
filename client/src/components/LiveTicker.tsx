import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Building, Home } from "lucide-react";

interface TickerItem {
  id: string;
  address: string;
  price: number;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  daysOnMarket: number;
  agent: string;
  brokerage: string;
}

export function LiveTicker() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const tickerRef = useRef<HTMLDivElement>(null);

  // TODO: Replace with real API data from Manhattan real estate feeds
  const residentialData: TickerItem[] = [
    { id: "1", address: "432 Park Ave", price: 8500000, type: "Condo", beds: 4, baths: 5, sqft: 4500, daysOnMarket: 12, agent: "Sarah Chen", brokerage: "Douglas Elliman" },
    { id: "2", address: "220 Central Park S", price: 12000000, type: "Co-op", beds: 5, baths: 6, sqft: 6200, daysOnMarket: 3, agent: "Michael Torres", brokerage: "Sotheby's Intl" },
    { id: "3", address: "15 Central Park W", price: 15500000, type: "Condo", beds: 3, baths: 4, sqft: 3800, daysOnMarket: 45, agent: "Lisa Anderson", brokerage: "Corcoran Group" },
    { id: "4", address: "One57", price: 9800000, type: "Penthouse", beds: 6, baths: 7, sqft: 7500, daysOnMarket: 8, agent: "David Kim", brokerage: "Compass" },
    { id: "5", address: "56 Leonard St", price: 7200000, type: "Condo", beds: 4, baths: 5, sqft: 5100, daysOnMarket: 22, agent: "Jennifer Walsh", brokerage: "Brown Harris" },
    { id: "6", address: "111 W 57th St", price: 18000000, type: "Co-op", beds: 5, baths: 5, sqft: 4900, daysOnMarket: 5, agent: "Robert Martinez", brokerage: "Stribling" },
    { id: "7", address: "520 Park Ave", price: 6500000, type: "Condo", beds: 3, baths: 3, sqft: 3200, daysOnMarket: 67, agent: "Amanda Clarke", brokerage: "Halstead" },
    { id: "8", address: "The Plaza", price: 25000000, type: "Penthouse", beds: 7, baths: 8, sqft: 9500, daysOnMarket: 15, agent: "James Sullivan", brokerage: "Christie's" },
  ];

  const commercialData: TickerItem[] = [
    { id: "c1", address: "1 Wall St", price: 45000000, type: "Office", beds: 0, baths: 0, sqft: 25000, daysOnMarket: 28, agent: "Patricia Lee", brokerage: "CBRE" },
    { id: "c2", address: "350 Park Ave", price: 85000000, type: "Retail", beds: 0, baths: 0, sqft: 45000, daysOnMarket: 11, agent: "Thomas Wright", brokerage: "JLL" },
    { id: "c3", address: "660 Madison Ave", price: 52000000, type: "Mixed Use", beds: 0, baths: 0, sqft: 35000, daysOnMarket: 33, agent: "Emily Foster", brokerage: "Cushman" },
    { id: "c4", address: "Times Square Tower", price: 120000000, type: "Office", beds: 0, baths: 0, sqft: 280000, daysOnMarket: 7, agent: "Mark Stevens", brokerage: "Newmark" },
    { id: "c5", address: "Chrysler Building", price: 95000000, type: "Landmark", beds: 0, baths: 0, sqft: 38000, daysOnMarket: 52, agent: "Rachel Green", brokerage: "Savills" },
    { id: "c6", address: "Trump Tower", price: 78000000, type: "Retail", beds: 0, baths: 0, sqft: 22000, daysOnMarket: 19, agent: "Daniel Park", brokerage: "Colliers" },
  ];

  const allData = [...residentialData, ...commercialData];
  const allDuplicated = [...allData, ...allData, ...allData];

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-40 bg-neutral-900 border-t border-t-[0.5px] border-b border-b-[0.5px] border-black">
      <div className="relative overflow-hidden h-14 bg-neutral-900">
        <div
          className="flex items-center gap-10 animate-scroll whitespace-nowrap py-3.5"
          style={{
            animation: "scroll 10s linear infinite",
          }}
        >
          {allDuplicated.map((item, index) => {
            const isEven = index % 2 === 0;
            const fontWeight = isEven ? "font-bold" : "font-normal";
            return (
              <div
                key={`${item.id}-${index}`}
                className={`flex items-center gap-3 px-4 py-2 rounded text-base ${
                  isEven ? "bg-white text-black" : "bg-black text-white"
                } ${fontWeight}`}
              >
                <span>{item.address}</span>
                <span className="text-lg">
                  {formatPrice(item.price)}
                </span>
                <span>{item.type}</span>
                {item.beds > 0 && (
                  <span>
                    {item.beds}bd
                  </span>
                )}
                {item.baths > 0 && (
                  <span>
                    {item.baths}ba
                  </span>
                )}
                <span>
                  {item.sqft.toLocaleString()}sf
                </span>
                <span>
                  {item.daysOnMarket}d
                </span>
                <span>
                  {item.agent}
                </span>
                <span>
                  {item.brokerage}
                </span>
                <span className={isEven ? "text-gray-400" : "text-gray-600"}>•</span>
              </div>
            );
          })}
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
