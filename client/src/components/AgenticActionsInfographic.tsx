import { Clock, Zap, TrendingUp, Search, Bell, Shield, ArrowRight, Database, FileText, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export function AgenticActionsInfographic() {
  const actions = [
    { icon: Search, label: "Continuous Market Scanning", color: "text-primary" },
    { icon: Zap, label: "Instant Alert Processing", color: "text-primary" },
    { icon: TrendingUp, label: "Price Trend Analysis", color: "text-primary" },
    { icon: Bell, label: "Smart Notifications", color: "text-primary" },
  ];

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Animated flowing particles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flowData {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.3); }
          50% { box-shadow: 0 0 40px rgba(234, 179, 8, 0.6), 0 0 60px rgba(234, 179, 8, 0.3); }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes float-up {
          0% { transform: translateY(0px); opacity: 0.6; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
        .compute-engine-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .branch-line {
          stroke-dasharray: 4 4;
          animation: dash-flow 1s linear infinite;
        }
        .data-particle {
          offset-path: path('M 50% 0 L 50% 100');
          animation: flowData 2s ease-in-out infinite;
        }
        .data-particle-1 { animation-delay: 0s; }
        .data-particle-2 { animation-delay: 0.4s; }
        .data-particle-3 { animation-delay: 0.8s; }
        .data-particle-4 { animation-delay: 1.2s; }
        .data-particle-5 { animation-delay: 1.6s; }
        .float-particle {
          animation: float-up 4s ease-out infinite;
        }
      `}} />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Powered by AI
          </Badge>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-2">
            Agentic Actions
          </h2>
          <p className="text-muted-foreground">
            While you sleep, Agent Kammer works — performing massive compute to find your perfect home
          </p>
        </div>

        {/* Top Hat Icon at Center with floating particles */}
        <div className="flex justify-center mb-8 relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center shadow-xl compute-engine-glow">
            <div className="text-4xl">🎩</div>
          </div>
          {/* Floating data particles around top hat */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/60 float-particle"
              style={{
                left: `${50 + Math.cos((i * Math.PI * 2) / 6) * 50}%`,
                top: `${50 + Math.sin((i * Math.PI * 2) / 6) * 50}%`,
                animationDelay: `${i * 0.7}s`
              }}
            />
          ))}
        </div>

        {/* Connecting Line */}
        <div className="flex justify-center mb-8">
          <div className="w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent" />
        </div>

        {/* Branching Actions */}
        <div className="relative mb-16">
          {/* Center Node - 3D Manhattan Map with Massive Compute */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-4xl bg-gradient-to-br from-card to-card/50 border-2 border-primary/30 rounded-2xl shadow-2xl compute-engine-glow relative overflow-hidden"
                 style={{ minHeight: '288px' }}>
              <div className="relative h-full flex flex-col items-center justify-center p-8">
                {/* Title */}
                <div className="text-center z-20 mb-6">
                  <p className="font-serif text-3xl font-bold mb-1">Massive Compute Engine</p>
                  <p className="text-sm text-muted-foreground">AI-Powered NYC Property Intelligence</p>
                </div>
                
                {/* 3D Manhattan Map Icon */}
                <div className="relative" style={{ animation: 'float-brain 3s ease-in-out infinite' }}>
                  <svg width="280" height="180" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      {/* Gold glow filter */}
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* 3D Isometric Manhattan island shape */}
                    {/* Base/ground - black */}
                    <path d="M 140,150 L 80,120 L 100,30 L 160,10 L 220,30 L 200,120 Z" 
                          fill="#0a0a0a" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth="2" 
                          opacity="0.9" />
                    
                    {/* Grid lines on surface - gold */}
                    <g opacity="0.4" stroke="hsl(var(--primary))" strokeWidth="0.5">
                      {/* Horizontal grid lines */}
                      <line x1="90" y1="110" x2="190" y2="110" />
                      <line x1="95" y1="90" x2="185" y2="90" />
                      <line x1="100" y1="70" x2="180" y2="70" />
                      <line x1="105" y1="50" x2="175" y2="50" />
                      <line x1="110" y1="30" x2="170" y2="30" />
                      
                      {/* Vertical grid lines */}
                      <path d="M 110,115 L 120,25" />
                      <path d="M 130,118 L 140,20" />
                      <path d="M 150,118 L 160,20" />
                      <path d="M 170,115 L 180,25" />
                    </g>
                    
                    {/* 3D blocks representing neighborhoods - varying heights */}
                    {/* Downtown (tallest) */}
                    <g>
                      <polygon points="125,95 115,90 115,50 125,55" fill="#1a1a1a" stroke="hsl(var(--primary))" strokeWidth="1" />
                      <polygon points="125,55 115,50 135,42 145,47" fill="#0d0d0d" stroke="hsl(var(--primary))" strokeWidth="1" />
                      <polygon points="145,47 145,87 125,95 125,55" fill="#151515" stroke="hsl(var(--primary))" strokeWidth="1" />
                      {/* Flowing data particle */}
                      <circle r="1.5" fill="hsl(var(--primary))" filter="url(#glow)">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M 135,90 L 135,50" />
                      </circle>
                    </g>
                    
                    {/* Midtown */}
                    <g>
                      <polygon points="155,90 145,85 145,60 155,65" fill="#1a1a1a" stroke="hsl(var(--primary))" strokeWidth="1" />
                      <polygon points="155,65 145,60 165,52 175,57" fill="#0d0d0d" stroke="hsl(var(--primary))" strokeWidth="1" />
                      <polygon points="175,57 175,82 155,90 155,65" fill="#151515" stroke="hsl(var(--primary))" strokeWidth="1" />
                      {/* Flowing data particle */}
                      <circle r="1.5" fill="hsl(var(--primary))" filter="url(#glow)">
                        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 165,85 L 165,55" />
                      </circle>
                    </g>
                    
                    {/* Upper Manhattan */}
                    <g>
                      <polygon points="140,55 130,50 130,35 140,40" fill="#1a1a1a" stroke="hsl(var(--primary))" strokeWidth="1" />
                      <polygon points="140,40 130,35 150,27 160,32" fill="#0d0d0d" stroke="hsl(var(--primary))" strokeWidth="1" />
                      <polygon points="160,32 160,47 140,55 140,40" fill="#151515" stroke="hsl(var(--primary))" strokeWidth="1" />
                      {/* Flowing data particle */}
                      <circle r="1.5" fill="hsl(var(--primary))" filter="url(#glow)">
                        <animateMotion dur="3.5s" repeatCount="indefinite" path="M 150,50 L 150,30" />
                      </circle>
                    </g>
                    
                    {/* West Side */}
                    <g>
                      <polygon points="105,100 95,95 95,70 105,75" fill="#1a1a1a" stroke="hsl(var(--primary))" strokeWidth="1" />
                      <polygon points="105,75 95,70 115,62 125,67" fill="#0d0d0d" stroke="hsl(var(--primary))" strokeWidth="1" />
                      <polygon points="125,67 125,92 105,100 105,75" fill="#151515" stroke="hsl(var(--primary))" strokeWidth="1" />
                      {/* Flowing data particle */}
                      <circle r="1.5" fill="hsl(var(--primary))" filter="url(#glow)">
                        <animateMotion dur="2.8s" repeatCount="indefinite" path="M 115,95 L 115,65" />
                      </circle>
                    </g>
                    
                    {/* East Side */}
                    <g>
                      <polygon points="175,95 165,90 165,68 175,73" fill="#1a1a1a" stroke="hsl(var(--primary))" strokeWidth="1" />
                      <polygon points="175,73 165,68 185,60 195,65" fill="#0d0d0d" stroke="hsl(var(--primary))" strokeWidth="1" />
                      <polygon points="195,65 195,87 175,95 175,73" fill="#151515" stroke="hsl(var(--primary))" strokeWidth="1" />
                      {/* Flowing data particle */}
                      <circle r="1.5" fill="hsl(var(--primary))" filter="url(#glow)">
                        <animateMotion dur="3.2s" repeatCount="indefinite" path="M 185,90 L 185,63" />
                      </circle>
                    </g>
                    
                    {/* Pulsing data points across the map */}
                    <circle cx="120" cy="80" r="2" fill="hsl(var(--primary))" opacity="0.8" filter="url(#glow)">
                      <animate attributeName="r" values="2;3.5;2" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="155" cy="70" r="2" fill="hsl(var(--primary))" opacity="0.8" filter="url(#glow)">
                      <animate attributeName="r" values="2;3.5;2" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;1;0.8" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="140" cy="45" r="2" fill="hsl(var(--primary))" opacity="0.8" filter="url(#glow)">
                      <animate attributeName="r" values="2;3.5;2" dur="2.3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;1;0.8" dur="2.3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="180" cy="75" r="2" fill="hsl(var(--primary))" opacity="0.8" filter="url(#glow)">
                      <animate attributeName="r" values="2;3.5;2" dur="2.1s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;1;0.8" dur="2.1s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Scanning lines effect */}
                    <line x1="85" x2="195" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5">
                      <animate attributeName="y1" values="120;30;120" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="y2" values="120;30;120" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;0.7;0" dur="4s" repeatCount="indefinite" />
                    </line>
                  </svg>
                </div>

                {/* Small Action Cards - Black & Gold */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6 px-4">
                  {actions.map((action, index) => (
                    <div
                      key={index}
                      className="bg-black/80 border border-primary/40 rounded-lg p-2 text-center"
                      data-testid={`card-action-${index}`}
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-1">
                        <action.icon className={`h-3 w-3 ${action.color}`} />
                      </div>
                      <p className="text-[9px] font-medium leading-tight text-primary">{action.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            @keyframes data-flow {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(400%); }
            }
            @keyframes float-brain {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
          `}} />

          {/* Data Sources Detail */}
          <div className="flex justify-center mt-12 mb-8">
            <Card className="max-w-4xl bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-xl">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Primary Sources */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-sm">Primary Sources for NYC/Manhattan Real Estate Listings</h4>
                    </div>
                    <div className="space-y-3 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground">MLS:</span> Core source for active, pending, sold, under contract, escrow statuses. NYC uses OneKey MLS (NY Metro) and NY State MLS. Zillow, Redfin, Realtor.com aggregate from MLS feeds.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Zillow:</span> Gets data from MLS via Bridge API; provides APIs for listings, sales, metrics (restricted access).
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Other sites:</span> PropertyShark (NYC public records), RealtyHop, Trulia, Redfin – aggregate MLS/public data.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Government:</span> NYC Dept of Finance – ACRIS (deeds/sales since 1966), Rolling Sales Data (last 12 months), Property Valuation/Assessment Data via NYC Open Data portal. DCAS IPIS for City properties. No live listings; historical sales/tax only.
                      </div>
                    </div>
                  </div>

                  {/* Access Methods */}
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-sm">All Access Methods</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground">Active/for sale:</span> MLS APIs/IDX feeds.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Sold/pending/escrow:</span> MLS status, post-closing public records.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Pre-sale/unlisted:</span> Agent networks/pocket listings (non-public); ownership via public records.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Comprehensive:</span> Combine MLS + government datasets.
                      </div>
                    </div>
                  </div>

                  {/* Manhattan APIs */}
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-sm">Manhattan APIs to Pull From</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "OneKey MLS (RESO/RETS)",
                        "Zillow Bridge/Property APIs",
                        "Realtor.com API",
                        "Redfin API",
                        "PropertyShark",
                        "Onboard Informatics Property API",
                        "RentCast API",
                        "NYC Open Data APIs (Socrata)"
                      ].map((api, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {api}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics Banner */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 lg:p-10 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-4xl lg:text-5xl font-serif font-bold text-black dark:text-white">240hrs</p>
                  <p className="text-sm text-black dark:text-white">Average time buyers spend searching</p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left border-l-0 md:border-l-2 border-primary/20 md:pl-8">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Zap className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-4xl lg:text-5xl font-serif font-bold text-black dark:text-white">Saves 240+ hours</p>
                  <p className="text-sm text-black dark:text-white">Agent Kammer's automated search</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dotted Divider */}
          <div className="mt-10 mb-8 flex justify-center">
            <div className="w-32 border-t-2 border-dotted border-primary/40" />
          </div>

          <div className="text-center">
            <p className="text-2xl lg:text-3xl font-serif font-semibold text-foreground mb-2">
              "When lenders compete, you win"
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Get the best rates by having multiple lenders compete for your business
            </p>

            {/* Power Position Message */}
            <div className="bg-background/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 mb-6">
              <p className="text-lg font-medium text-foreground mb-4">
                Your first step to be in a position of power is getting prequalified
              </p>
              <Link href="/services/get-preapproved">
                <Button size="lg" className="rounded-full" data-testid="button-get-prequalified">
                  Get Prequalified Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
