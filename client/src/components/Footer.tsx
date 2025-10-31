import { SiReplit, SiOpenai, SiGoogle, SiMeta } from "react-icons/si";
import { Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4">Agent Kammer</h3>
              <p className="text-sm text-muted-foreground">
                Luxury NYC real estate at your fingertips
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Property Search</li>
                <li>Pre-Approval</li>
                <li>Home Valuation</li>
                <li>Market Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
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
      <div className="bg-[#0a1628] py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-4">
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
                <SiOpenai className="h-5 w-5" />
                <span className="text-xs">OpenAI</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <SiGoogle className="h-5 w-5" />
                <span className="text-xs">Google AI</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <SiMeta className="h-5 w-5" />
                <span className="text-xs">Meta AI</span>
              </div>
            </div>
            <p className="text-center text-xs text-white/60 mt-2">
              Copyright 2025 - Agent Kammer ®
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
