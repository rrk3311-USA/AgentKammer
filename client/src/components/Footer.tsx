import { SiReplit, SiNvidia, SiClaude, SiInstagram, SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import { Brain, FileText, Globe, Headphones, GraduationCap, Download } from "lucide-react";
import { LiveInterestRate } from "./LiveInterestRate";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="relative">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h3 className="font-serif text-base md:text-lg font-semibold mb-3">Agent Kammer</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3">
                Your Luxury Agentic Real Estate Concierge
              </p>
              <div className="space-y-2">
                <Link href="/document-portal" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <FileText className="h-4 w-4" />
                  <span>Strategic Document Portal</span>
                </Link>
                <Link href="/international-buyers" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-international-buyers">
                  <Globe className="h-4 w-4" />
                  <span>International Buyers</span>
                </Link>
                <Link href="/audiobooks" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-audiobooks">
                  <Headphones className="h-4 w-4" />
                  <span>Audiobooks</span>
                </Link>
                <Link href="/ecourses" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-ecourses">
                  <GraduationCap className="h-4 w-4" />
                  <span>Ecourses</span>
                </Link>
                <Link href="/downloads" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-downloads">
                  <Download className="h-4 w-4" />
                  <span>Downloads</span>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm">Services</h4>
              <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground">
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
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm">Connect</h4>
              <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/coaching" className="hover:text-foreground transition-colors">
                    Consulting
                  </Link>
                </li>
                <li>
                  <Link href="/commercial-investment" className="hover:text-foreground transition-colors" data-testid="link-commercial-investment">
                    Commercial
                  </Link>
                </li>
              </ul>
              <div className="flex items-center gap-3 mt-3">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiInstagram className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiFacebook className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiLinkedin className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiX className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-[#0a1628] py-3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-2">
            <div className="mb-1">
              <LiveInterestRate />
            </div>
            <p className="text-center text-sm text-white/80">
              Powered by AI
            </p>
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              <div className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
                <SiReplit className="h-4 w-4" />
                <span className="text-[0.625rem]">Replit</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
                <Brain className="h-4 w-4" />
                <span className="text-[0.625rem]">Anthropic</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
                <SiClaude className="h-4 w-4" />
                <span className="text-[0.625rem]">Claude</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
                <SiNvidia className="h-4 w-4" />
                <span className="text-[0.625rem]">NVIDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-[#f5f1e8] py-3">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-medium" style={{ color: '#050505' }}>
            Copyright 2025 - Agent Kammer
          </p>
        </div>
      </div>
    </footer>
  );
}
