import { useEffect, useState } from "react";
import { Clock, Zap, ArrowRight, Database, FileText, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import agiBrainImage from "@assets/generated_images/Grok-5_AGI_Technology_Visualization_7ad79357.png";

export function AgenticActionsInfographic() {
  const [computeNumbers, setComputeNumbers] = useState<string[]>([]);

  useEffect(() => {
    // Generate random compute numbers
    const generateNumbers = () => {
      const numbers = [];
      for (let i = 0; i < 25; i++) {
        numbers.push(Math.floor(Math.random() * 1000000).toString());
      }
      setComputeNumbers(numbers);
    };

    generateNumbers();
    const interval = setInterval(generateNumbers, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes number-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .compute-number {
          animation: number-pulse ${Math.random() * 0.5 + 0.3}s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 50px rgba(255, 255, 255, 0.2); }
        }
      `}} />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-8">
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

        {/* Compact All-in-One Card */}
        <Card className="bg-black text-white border-white/10 shadow-2xl overflow-hidden mb-8" data-testid="card-compute-engine">
          <CardContent className="p-0">
            {/* Massive Compute Engine with Brain Background */}
            <div className="relative h-[300px] overflow-hidden">
              {/* Background Image - Cropped to show brain center */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                  backgroundImage: `url(${agiBrainImage})`,
                  backgroundPosition: 'center 35%',
                  backgroundSize: '150%',
                  filter: 'brightness(0.6) contrast(1.2)'
                }}
              />
              
              {/* Animated Numbers Overlay in Brain Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1 opacity-80" style={{ width: '200px', height: '150px' }}>
                  {computeNumbers.map((num, idx) => (
                    <div
                      key={idx}
                      className="compute-number text-[10px] font-mono text-white/70 text-center"
                      style={{
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      {num.slice(0, 4)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Title Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  Massive Compute Engine
                </h3>
                <p className="text-sm text-white/90 drop-shadow-md">AI-Powered NYC Property Intelligence</p>
              </div>

              {/* Bottom Actions Strip - Black & White */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/20 p-4">
                <div className="flex items-center justify-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-white font-medium">Continuous Market Scanning</span>
                  </div>
                  <div className="h-4 w-px bg-white/30" />
                  <div className="flex items-center gap-2">
                    <Zap className="h-3 w-3 text-white" />
                    <span className="text-white font-medium">Instant Alert Processing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics - Compact */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 border-t border-white/10 p-6">
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div className="flex items-center justify-center gap-3">
                  <Clock className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-2xl font-serif font-bold text-white">240hrs</p>
                    <p className="text-xs text-white/70">Average buyer search time</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 border-l-0 md:border-l border-white/20 md:pl-6">
                  <Zap className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-2xl font-serif font-bold text-white">240+ hrs saved</p>
                    <p className="text-xs text-white/70">With Agent Kammer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Sources - Ultra Compact */}
            <div className="bg-white/5 border-t border-white/10 p-6">
              <div className="space-y-4 text-xs">
                {/* Primary Sources */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-4 w-4 text-white" />
                    <h4 className="font-semibold text-white">Primary Sources</h4>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    <span className="text-white font-medium">MLS:</span> OneKey MLS, NY State MLS, Zillow Bridge API, Realtor.com, Redfin. 
                    <span className="text-white font-medium"> Government:</span> NYC ACRIS, Rolling Sales, Property Valuation via NYC Open Data.
                  </p>
                </div>

                {/* Manhattan APIs */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-white" />
                    <h4 className="font-semibold text-white">Manhattan APIs</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "OneKey MLS",
                      "Zillow",
                      "Realtor.com",
                      "PropertyShark",
                      "NYC Open Data"
                    ].map((api, index) => (
                      <Badge key={index} variant="outline" className="text-[10px] bg-white/10 text-white border-white/20">
                        {api}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lenders Competition Section - Compact */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 lg:p-8 shadow-xl">
          <div className="text-center">
            <p className="text-xl lg:text-2xl font-serif font-semibold text-foreground mb-2">
              "When lenders compete, you win"
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Get the best rates by having multiple lenders compete for your business
            </p>

            <div className="bg-background/50 backdrop-blur-sm border border-primary/20 rounded-xl p-4">
              <p className="text-base font-medium text-foreground mb-4">
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
