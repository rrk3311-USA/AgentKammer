import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headphones, Play, Clock, Star } from "lucide-react";

const audiobooks = [
  {
    id: 1,
    title: "The Art of Luxury Living",
    author: "Victoria Sterling",
    duration: "8h 45m",
    rating: 4.8,
    description: "Master the principles of elevated living and refined taste in modern luxury real estate.",
    gradient: "from-amber-600 via-yellow-500 to-amber-400",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "Wealth Architecture",
    author: "Marcus Chen",
    duration: "6h 30m",
    rating: 4.9,
    description: "Strategic insights into building generational wealth through premium property investments.",
    gradient: "from-blue-900 via-blue-700 to-blue-500",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "Negotiation Mastery",
    author: "Diana Rothschild",
    duration: "7h 15m",
    rating: 4.7,
    description: "Elite strategies for winning in high-stakes real estate negotiations and closing power deals.",
    gradient: "from-purple-900 via-purple-600 to-pink-500",
    textColor: "text-white"
  },
  {
    id: 4,
    title: "Global Property Intelligence",
    author: "Alexander Kensington",
    duration: "9h 20m",
    rating: 4.9,
    description: "Navigate international luxury markets from NYC to California to Nevada and beyond.",
    gradient: "from-emerald-800 via-teal-600 to-cyan-500",
    textColor: "text-white"
  }
];

export default function Audiobooks() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-[#0a1628] via-[#1a2942] to-[#0a1628]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0aDRWMGgtNHptMCAxMGg0VjEwaC00em0wIDEwaDRWMjBoLTR6bTAgMTBoNFYzMGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Headphones className="h-12 w-12 text-[#d4af37]" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Luxury Audiobook Library
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Elevate your knowledge with our curated collection of premium audiobooks. 
            Learn from the world's leading experts in luxury real estate, wealth management, and strategic investments.
          </p>
        </div>
      </section>

      {/* Audiobooks Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {audiobooks.map((book) => (
              <Card 
                key={book.id}
                className="overflow-hidden hover-elevate transition-all duration-300"
                data-testid={`card-audiobook-${book.id}`}
              >
                <div className="flex flex-col md:flex-row gap-0">
                  {/* Book Cover */}
                  <div 
                    className={`w-full md:w-48 h-64 md:h-auto bg-gradient-to-br ${book.gradient} flex flex-col items-center justify-center p-8 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10 text-center">
                      <Headphones className="h-16 w-16 text-white/30 mb-4 mx-auto" />
                      <div className={`font-serif text-2xl font-bold ${book.textColor} mb-2 leading-tight`}>
                        {book.title}
                      </div>
                      <div className={`text-sm ${book.textColor} opacity-80 font-medium`}>
                        {book.author}
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-serif text-2xl font-semibold mb-1">
                          {book.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          by {book.author}
                        </p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        <Star className="h-3 w-3 mr-1 fill-[#d4af37] text-[#d4af37]" />
                        {book.rating}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                      {book.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {book.duration}
                      </div>
                      <Button 
                        className="gap-2"
                        data-testid={`button-play-${book.id}`}
                      >
                        <Play className="h-4 w-4" />
                        Listen Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold mb-6">
            Expand Your Luxury Knowledge
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Join our exclusive community and gain access to premium insights from industry leaders. 
            New audiobooks added monthly.
          </p>
          <Button size="lg" className="gap-2" data-testid="button-join-library">
            <Headphones className="h-5 w-5" />
            Join the Library
          </Button>
        </div>
      </section>
    </div>
  );
}
