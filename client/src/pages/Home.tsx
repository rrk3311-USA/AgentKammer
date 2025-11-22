import { HeroSearch } from "@/components/HeroSearch";
import { AgenticComputeSection } from "@/components/AgenticCompute/AgenticComputeSection";
import { LuxuryBackground } from "@/components/LuxuryBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import agentKammerWelcoming from "@assets/image_1763360901241.png";

export default function Home() {
  return (
    <div className="min-h-screen pb-32 relative">
      <LuxuryBackground />
      <div className="relative z-10">
        <HeroSearch />

        <AgenticComputeSection />

        <section className="py-8 lg:py-12 bg-[#0a1628] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side: Text and CTA */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-4 relative inline-block">
                  <span className="relative">
                    Ready to Find Your Dream Home?
                    {/* Sonar pulse effect */}
                    <div 
                      className="absolute inset-0 overflow-visible pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(244,208,63,0.3) 30%, transparent 70%)',
                        animation: 'sonarPulse 8s ease-in-out infinite',
                        mixBlendMode: 'screen',
                        filter: 'blur(1px)',
                      }}
                    />
                    {/* Scanning beam */}
                    <div 
                      className="absolute inset-0 overflow-hidden pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.2) 45%, rgba(244,208,63,0.5) 50%, rgba(212,175,55,0.2) 55%, transparent 100%)',
                        animation: 'slowScan 10s ease-in-out infinite',
                        mixBlendMode: 'screen',
                      }}
                    />
                    {/* Magical sparks */}
                    <div 
                      className="absolute inset-0 overflow-visible pointer-events-none"
                      style={{
                        animation: 'sparkle 3s linear infinite',
                      }}
                    >
                      <div className="absolute" style={{ left: '10%', top: '-20%', animation: 'twinkle 2s ease-in-out infinite' }}>
                        <div className="w-1 h-1 bg-[#d4af37] rounded-full" style={{ boxShadow: '0 0 4px 2px rgba(212,175,55,0.8)' }} />
                      </div>
                      <div className="absolute" style={{ left: '30%', top: '120%', animation: 'twinkle 2.5s ease-in-out infinite 0.5s' }}>
                        <div className="w-1.5 h-1.5 bg-[#f4d03f] rounded-full" style={{ boxShadow: '0 0 6px 3px rgba(244,208,63,0.8)' }} />
                      </div>
                      <div className="absolute" style={{ left: '60%', top: '-10%', animation: 'twinkle 2.2s ease-in-out infinite 1s' }}>
                        <div className="w-1 h-1 bg-[#d4af37] rounded-full" style={{ boxShadow: '0 0 4px 2px rgba(212,175,55,0.8)' }} />
                      </div>
                      <div className="absolute" style={{ left: '80%', top: '110%', animation: 'twinkle 3s ease-in-out infinite 1.5s' }}>
                        <div className="w-1.5 h-1.5 bg-[#f4d03f] rounded-full" style={{ boxShadow: '0 0 6px 3px rgba(244,208,63,0.8)' }} />
                      </div>
                      <div className="absolute" style={{ left: '90%', top: '50%', animation: 'twinkle 2.8s ease-in-out infinite 0.8s' }}>
                        <div className="w-1 h-1 bg-[#d4af37] rounded-full" style={{ boxShadow: '0 0 4px 2px rgba(212,175,55,0.8)' }} />
                      </div>
                    </div>
                  </span>
                </h2>
                <style>{`
                  @keyframes slowScan {
                    0%, 100% { transform: translateX(-120%); opacity: 0; }
                    10% { opacity: 1; }
                    50% { transform: translateX(120%); opacity: 1; }
                    60% { opacity: 0; }
                  }
                  @keyframes sonarPulse {
                    0%, 100% { 
                      transform: scale(0.5); 
                      opacity: 0; 
                    }
                    25% { 
                      transform: scale(1.5); 
                      opacity: 0.6; 
                    }
                    50% { 
                      transform: scale(2.5); 
                      opacity: 0; 
                    }
                    75% { 
                      transform: scale(1.2); 
                      opacity: 0.4; 
                    }
                  }
                  @keyframes twinkle {
                    0%, 100% { 
                      opacity: 0; 
                      transform: scale(0.5) translateY(0); 
                    }
                    50% { 
                      opacity: 1; 
                      transform: scale(1.5) translateY(-5px); 
                    }
                  }
                  @keyframes sparkle {
                    0%, 100% { filter: brightness(1); }
                    50% { filter: brightness(1.3); }
                  }
                `}</style>
                <p className="text-lg mb-8 opacity-90">
                  Join thousands of New Yorkers who trust Agent Kammer to find their perfect property
                </p>
                
                {/* Cell Number CTA Form */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const phone = formData.get('phone');
                  console.log('Phone submitted:', phone);
                  // Show success message
                  const toast = document.createElement('div');
                  toast.textContent = 'Thank you! We\'ll be in touch soon.';
                  toast.className = 'fixed top-4 right-4 bg-white text-gray-800 px-6 py-3 rounded-lg shadow-lg z-50';
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 3000);
                  e.currentTarget.reset();
                }} className="max-w-md mx-auto lg:mx-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Your cell number"
                      required
                      className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      data-testid="input-dream-home-phone"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 px-8 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black font-semibold hover:opacity-90"
                      data-testid="button-dream-home-submit"
                    >
                      Get Started
                    </Button>
                  </div>
                </form>
              </div>

              {/* Right side: Agent Kammer welcoming clients into luxury apartment */}
              <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center bg-[#0a1628] rounded-lg overflow-hidden order-1 lg:order-2">
                <img 
                  src={agentKammerWelcoming} 
                  alt="Agent Kammer in top hat welcoming clients into luxury apartment" 
                  className="w-full h-full object-cover shadow-2xl"
                  style={{ objectPosition: 'center' }}
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
