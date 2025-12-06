import { Heart } from "lucide-react";
import heroImage from "@assets/generated_images/luxury_living_room_concierge.jpeg";

export function HeroSearch() {
  return (
    <section 
      className="relative py-32 lg:py-40 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/70 to-black/75" />
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6">
          Your Perfect Home<br />Discovered
        </h1>
        
        {/* Description */}
        <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-light">
          Leverage agentic AI to do the heavy lifting for you. Agent Kammer will automatically scan multiple luxury markets for you every second of the day. Set your alert, set your preferences and beat your competition to your dream house.
        </p>
        
        {/* Live where you belong */}
        <div className="flex items-center justify-center gap-2">
          <Heart 
            className="w-5 h-5 text-[#d4af37] animate-pulse" 
            strokeWidth={2}
            fill="none"
          />
          <p className="font-serif text-2xl lg:text-3xl text-white font-semibold">
            Live where you belong
          </p>
          <Heart 
            className="w-5 h-5 text-[#d4af37] animate-pulse" 
            strokeWidth={2}
            fill="none"
            style={{ animationDelay: '0.3s' }}
          />
        </div>
      </div>
    </section>
  );
}
