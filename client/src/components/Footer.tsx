import { SiReplit, SiNvidia, SiClaude } from "react-icons/si";
import { Brain } from "lucide-react";
import { LiveInterestRate } from "./LiveInterestRate";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="relative">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4">Agent Kammer</h3>
              <p className="text-sm text-muted-foreground">
                Your Luxury Agentic Real Estate & Travel Concierge
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Property Search
                  </Link>
                </li>
                <li>
                  <Link href="/services/get-preapproved" className="hover:text-foreground transition-colors">
                    Pre-Approval
                  </Link>
                </li>
                <li>
                  <Link href="/services/get-home-value" className="hover:text-foreground transition-colors">
                    Home Valuation
                  </Link>
                </li>
                <li>
                  <Link href="/commercial-investment" className="hover:text-foreground transition-colors" data-testid="link-commercial-investment">
                    Commercial Investment
                  </Link>
                </li>
                <li>
                  <Link href="/luxury-travel" className="hover:text-foreground transition-colors">
                    Luxury Travel
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/wellness-shop" className="hover:text-foreground transition-colors">
                    Wellness Products
                  </Link>
                </li>
                <li>
                  <Link href="/coaching" className="hover:text-foreground transition-colors">
                    Coaching Programs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>LinkedIn</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-[#0a1628] py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-3">
            <div className="mb-1">
              <LiveInterestRate />
            </div>
            <p className="text-center text-sm text-white/80">
              Powered by AI
            </p>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <SiReplit className="h-5 w-5" />
                <span className="text-xs">Replit</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <Brain className="h-5 w-5" />
                <span className="text-xs">Anthropic</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <SiClaude className="h-5 w-5" />
                <span className="text-xs">Claude</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <SiNvidia className="h-5 w-5" />
                <span className="text-xs">NVIDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-[#f5f1e8] py-3">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-medium" style={{ color: '#050505' }}>
            Copyright 2025 - Agent Kammer ®
          </p>
        </div>
      </div>
    </footer>
  );
}
