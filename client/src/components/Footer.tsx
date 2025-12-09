import { SiReplit, SiNvidia, SiClaude, SiAnthropic, SiInstagram, SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import { Brain, Building2, Users, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { MarketTickerStatic } from "@/components/MarketTickerStatic";

export function Footer() {
  return (
    <footer className="relative">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* Market Ticker */}
          <div className="mb-8 pb-8 border-b border-border/30">
            <MarketTickerStatic />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-left">
            <div>
              <p className="text-xs md:text-sm text-foreground font-medium mb-2 block">
                Free Financial Tools
              </p>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground mb-4">
                <li>
                  <Link href="/services/get-home-value" className="hover:text-foreground transition-colors">
                    Home Valuation
                  </Link>
                </li>
                <li>
                  <Link href="/services/get-preapproved" className="hover:text-foreground transition-colors">
                    Pre-Approval
                  </Link>
                </li>
                <li>
                  <Link href="/investing" className="hover:text-foreground transition-colors">
                    Investment Accounts
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <Link href="/real-estate">
                <h4 className="font-medium mb-2 text-sm hover:text-foreground transition-colors cursor-pointer">Real Estate Concierge</h4>
              </Link>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground mb-4">
                <li>
                  <Link href="/refinancing" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Refinancing Rate Watch</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reverse-buyer-origination" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>Reverse Buyer Origination</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reverse-seller-architecture" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Users className="h-3.5 w-3.5" />
                    <span>Reverse Seller Architecture</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-sm text-foreground">Flagship Services</h4>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground mb-4">
                <li>
                  <Link href="/profile" className="hover:text-foreground transition-colors">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/credit-cards" className="hover:text-foreground transition-colors">
                    Credit Cards
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-[#0a1628] py-2">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-white/90">
              <Brain className="h-4 w-4 text-[#79d3ff]" />
              <span className="text-[0.625rem] font-medium">Powered by AI</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center text-[0.625rem]">
              <div className="flex items-center gap-1 text-white/90 hover:text-white transition-colors">
                <SiReplit className="h-3.5 w-3.5" />
                <span className="font-medium">Replit</span>
              </div>
              <div className="flex items-center gap-1 text-white/90 hover:text-white transition-colors">
                <SiAnthropic className="h-3.5 w-3.5" />
                <span className="font-medium">Anthropic</span>
              </div>
              <div className="flex items-center gap-1 text-white/90 hover:text-white transition-colors">
                <SiClaude className="h-3.5 w-3.5" />
                <span className="font-medium">Claude</span>
              </div>
              <div className="flex items-center gap-1 text-white/90 hover:text-white transition-colors">
                <SiNvidia className="h-3.5 w-3.5" />
                <span className="font-medium">NVIDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </footer>
  );
}
