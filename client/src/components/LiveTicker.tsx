import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Building, Home } from "lucide-react";
import { FloatingChatAssistant } from "./FloatingChatAssistant";

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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-800 border-t border-neutral-700">
      <div className="flex items-center gap-3 px-6 py-3 border-b border-neutral-700">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-sm font-medium text-neutral-300 uppercase tracking-wide">
          Live Manhattan Activity
        </span>
      </div>
      
      <div className="flex w-full">
        <div className="flex flex-col bg-black">
          <div
            className="px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium border-b border-neutral-700 text-neutral-400"
            data-testid="badge-residential"
          >
            <span className="whitespace-nowrap">Residential</span>
          </div>
          <div
            className="px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium text-neutral-400"
            data-testid="badge-commercial"
          >
            <span className="whitespace-nowrap">Commercial</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative overflow-hidden h-12 bg-neutral-900">
            <div
              className="flex items-center gap-10 animate-scroll whitespace-nowrap py-3"
              style={{
                animation: "scroll 30s linear infinite",
              }}
            >
              {residentialDuplicated.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-4 text-base"
                >
                  <span className="text-neutral-200 font-medium">{item.address}</span>
                  <span className="text-green-500 font-semibold text-lg">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-neutral-500 text-sm">{item.daysOnMarket}d</span>
                  <span className="text-neutral-700">•</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden h-12 bg-neutral-900 border-t border-neutral-800">
            <div
              className="flex items-center gap-10 animate-scroll whitespace-nowrap py-3"
              style={{
                animation: "scroll 35s linear infinite",
              }}
            >
              {commercialDuplicated.map((item, index) => (
                <div
                  key={`${item.id}-${index}-alt`}
                  className="flex items-center gap-4 text-base"
                >
                  <span className="text-neutral-200 font-medium">{item.address}</span>
                  <span className="text-green-500 font-semibold text-lg">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-neutral-500 text-sm">{item.daysOnMarket}d</span>
                  <span className="text-neutral-700">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 border-l border-neutral-700 bg-black/40 relative">
          <FloatingChatAssistant />
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
