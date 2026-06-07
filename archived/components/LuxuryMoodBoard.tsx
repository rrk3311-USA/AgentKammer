import barImage1 from "@assets/IMG_1357_1762925446647.jpeg";
import barImage2 from "@assets/IMG_1356_1762925446647.jpeg";
import barImage3 from "@assets/IMG_1358_1762925446647.jpeg";
import interiorImage from "@assets/IMG_1355_1762925446647.jpeg";

export function LuxuryMoodBoard() {
  return (
    <section className="py-8 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <img 
              src={barImage1} 
              alt="Luxury bar interior" 
              className="w-full h-full object-cover"
              data-testid="img-mood-1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <img 
              src={barImage2} 
              alt="Elegant lighting fixtures" 
              className="w-full h-full object-cover"
              data-testid="img-mood-2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <img 
              src={barImage3} 
              alt="Luxury bar details" 
              className="w-full h-full object-cover"
              data-testid="img-mood-3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <img 
              src={interiorImage} 
              alt="Elegant interior design" 
              className="w-full h-full object-cover"
              data-testid="img-mood-4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
