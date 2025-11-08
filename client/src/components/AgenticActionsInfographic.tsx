import { useEffect, useState } from "react";
import { Clock, Zap, ArrowRight, Database, FileText, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import agiBrainImage from "@assets/generated_images/Grok-5_AGI_Technology_Visualization_7ad79357.png";

interface CodeSnippet {
  text: string;
  yPos: number;
  speed: number;
  opacity: number;
  isGolden: boolean;
}

export function AgenticActionsInfographic() {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);

  useEffect(() => {
    // Programming languages and code snippets for waterfall
    const snippets = [
      "JavaScript", "Python", "Java", "Docker", "React", "TypeScript",
      "Node.js", "SQL", "MongoDB", "Redis", "GraphQL", "REST",
      "const data = {}", "function()", "async/await", "import {}", 
      "class Agent", "API.call()", "db.query()", "fetch()",
      "map()", "filter()", "reduce()", "Promise.all()",
      "124567", "892341", "567234", "981234", "345678"
    ];

    // Initialize waterfall items (doubled to 40)
    const initWaterfall = () => {
      const items: CodeSnippet[] = [];
      for (let i = 0; i < 40; i++) {
        items.push({
          text: snippets[Math.floor(Math.random() * snippets.length)],
          yPos: Math.random() * -200,
          speed: Math.random() * 0.5 + 0.3,
          opacity: Math.random() * 0.5 + 0.3,
          isGolden: Math.random() < 0.15 // 15% chance of golden glow
        });
      }
      setCodeSnippets(items);
    };

    initWaterfall();

    // Animate waterfall
    const animateInterval = setInterval(() => {
      setCodeSnippets(prev => 
        prev.map(snippet => {
          let newYPos = snippet.yPos + snippet.speed;
          if (newYPos > 100) {
            newYPos = -20;
            return {
              text: snippets[Math.floor(Math.random() * snippets.length)],
              yPos: newYPos,
              speed: Math.random() * 0.5 + 0.3,
              opacity: Math.random() * 0.5 + 0.3,
              isGolden: Math.random() < 0.15 // 15% chance of golden glow
            };
          }
          return { ...snippet, yPos: newYPos };
        })
      );
    }, 50);

    return () => clearInterval(animateInterval);
  }, []);

  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
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
            {/* Title Above Image */}
            <div className="bg-black text-center py-6 border-b border-white/10">
              <h3 className="font-serif text-3xl lg:text-4xl font-bold text-white">
                Massive Compute Engine
              </h3>
            </div>

            {/* Brain Background with Waterfall */}
            <div className="relative h-[220px] overflow-hidden">
              {/* Background Image - Only fade bottom half */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${agiBrainImage})`,
                  backgroundPosition: 'center 35%',
                  backgroundSize: '150%'
                }}
              />
              
              {/* Gradient fade on bottom half only */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 100%)'
                }}
              />
              
              {/* Waterfall Code Animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {codeSnippets.map((snippet, idx) => (
                  <div
                    key={idx}
                    className="absolute left-0 right-0 text-center font-mono text-xs"
                    style={{
                      top: `${snippet.yPos}%`,
                      opacity: snippet.isGolden ? Math.min(snippet.opacity + 0.3, 1) : snippet.opacity,
                      color: snippet.isGolden ? '#d4af37' : '#ffffff',
                      textShadow: snippet.isGolden 
                        ? '0 0 20px rgba(212, 175, 55, 1), 0 0 30px rgba(212, 175, 55, 0.8)' 
                        : '0 0 10px rgba(212, 175, 55, 0.5)',
                      fontWeight: snippet.isGolden ? '600' : '400'
                    }}
                  >
                    {snippet.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Market Property Intelligence - Gold on Black */}
            <div className="bg-black border-t border-white/10 py-3">
              <p className="text-center text-sm font-semibold tracking-wide" style={{ color: '#d4af37' }}>
                AI-Powered Multi-Market Property Intelligence
              </p>
            </div>

            {/* Bottom Actions Strip - Black & White */}
            <div className="bg-black/90 border-t border-white/20 py-3">
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
                    <span className="text-white font-medium">MLS:</span> OneKey MLS, CRMLS (CA), Zillow Bridge API, Realtor.com, Redfin. 
                    <span className="text-white font-medium"> Government:</span> Public Records, Tax Assessments, Property Valuations.
                  </p>
                </div>

                {/* Luxury Market APIs */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-white" />
                    <h4 className="font-semibold text-white">Luxury Market APIs</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "OneKey MLS",
                      "CRMLS",
                      "Zillow",
                      "Realtor.com",
                      "PropertyShark",
                      "Public Records"
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
