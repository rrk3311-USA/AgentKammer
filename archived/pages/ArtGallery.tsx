import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { 
  Palette,
  Brush,
  Box,
  CircleDot,
  Sparkles,
  Gem,
  ExternalLink,
  Mail,
  Send,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const elephantImage = "/buildings/432-park-avenue.jpg";
const spaceLizardImage = "/buildings/565-broome.jpg";

const CATEGORIES = [
  {
    id: '3d-printed',
    name: '3D Printed Collection',
    icon: Box,
    description: 'Geometric ceramic sculptures and miniatures produced with precision 3D printing technology',
    pieces: [
      {
        id: 'elephant-geo-1',
        title: 'Geometric Elephant - Large',
        subtitle: 'Low-poly ceramic sculpture',
        price: 1250,
        status: 'Available',
        description: 'Modern faceted elephant sculpture with angular geometric design. Each piece is 3D printed in ceramic and hand-finished.',
        image: elephantImage
      },
      {
        id: 'elephant-geo-2',
        title: 'Geometric Elephant - Medium',
        subtitle: 'Tabletop statement piece',
        price: 850,
        status: 'Available',
        description: 'Medium-scale geometric elephant perfect for console tables, shelving, or as a centerpiece.'
      },
      {
        id: 'miniature-set',
        title: 'Linear Miniatures Set',
        subtitle: 'Collection of 6 pieces',
        price: 650,
        status: 'Available',
        description: 'Set of 6 precision 3D printed ceramic miniatures with clean linear designs.'
      }
    ]
  },
  {
    id: 'signature',
    name: 'Signature Handmade',
    icon: Brush,
    description: 'One-of-a-kind artisan pieces handcrafted with unique designs - limited edition showstoppers',
    pieces: [
      {
        id: 'space-lizard-bowl',
        title: 'Electric Space Lizard Fruit Bowl',
        subtitle: 'Handmade statement piece',
        price: 2500,
        status: 'Commission Only',
        description: 'A striking handmade fruit bowl featuring an electric space lizard climbing the exterior. Each piece is completely unique and made to order.',
        image: spaceLizardImage
      },
      {
        id: 'sculptural-vase',
        title: 'Sculptural Art Vase',
        subtitle: 'Handcrafted ceramic',
        price: 1800,
        status: 'Available',
        description: 'Hand-thrown and sculpted vase with organic flowing forms. Perfect for luxury home staging.'
      }
    ]
  },
  {
    id: 'plates',
    name: 'Ceramic Dishware',
    icon: CircleDot,
    description: 'Artisan ceramic plates, bowls, and dishware for the discerning home',
    pieces: [
      {
        id: 'artisan-plate-set',
        title: 'Artisan Dinner Set',
        subtitle: '4-piece ceramic collection',
        price: 1250,
        status: 'Available',
        description: 'Hand-finished ceramic dinner set including 4 dinner plates with unique glazing patterns.'
      },
      {
        id: 'statement-bowl',
        title: 'Statement Serving Bowl',
        subtitle: 'Large centerpiece bowl',
        price: 750,
        status: 'Available',
        description: 'Large ceramic serving bowl with distinctive artisan finish. Perfect for entertaining.'
      }
    ]
  },
  {
    id: 'sculptures',
    name: 'Sculptures',
    icon: Sparkles,
    description: 'Statement sculptures for luxury homes - from tabletop to garden-scale pieces',
    pieces: [
      {
        id: 'abstract-form',
        title: 'Abstract Form I',
        subtitle: 'Gallery-quality sculpture',
        price: 3500,
        status: 'Available',
        description: 'Large-scale abstract ceramic sculpture suitable for prominent display in entryways or living spaces.'
      },
      {
        id: 'organic-curves',
        title: 'Organic Curves',
        subtitle: 'Flowing ceramic sculpture',
        price: 2200,
        status: 'Available',
        description: 'Elegant flowing sculpture with organic curves and premium glaze finish.'
      }
    ]
  },
  {
    id: 'polymer',
    name: 'Polymer Collection',
    icon: Gem,
    description: 'Colorful polymer clay creations - ornaments, magnets, and decorative mini pieces',
    pieces: [
      {
        id: 'christmas-ornament-set',
        title: 'Artisan Christmas Ornaments',
        subtitle: 'Set of 6 handmade ornaments',
        price: 185,
        status: 'Available',
        description: 'Festive polymer clay ornaments with intricate details. Each set includes 6 unique designs perfect for holiday decorating.'
      },
      {
        id: 'christmas-ornament-deluxe',
        title: 'Deluxe Ornament Collection',
        subtitle: 'Set of 12 premium ornaments',
        price: 325,
        status: 'Available',
        description: 'Premium collection of 12 handcrafted polymer ornaments featuring metallic accents and detailed patterns.'
      },
      {
        id: 'fridge-magnet-set',
        title: 'Artisan Fridge Magnets',
        subtitle: 'Set of 8 decorative magnets',
        price: 95,
        status: 'Available',
        description: 'Colorful polymer clay fridge magnets in whimsical designs. Strong magnets with artistic flair.'
      },
      {
        id: 'fridge-magnet-animals',
        title: 'Animal Magnet Collection',
        subtitle: 'Set of 6 creature magnets',
        price: 85,
        status: 'Available',
        description: 'Adorable polymer clay animal magnets including cats, dogs, birds, and more. Perfect for gifting.'
      },
      {
        id: 'mini-vase-trio',
        title: 'Mini Vase Trio',
        subtitle: 'Set of 3 bud vases',
        price: 145,
        status: 'Available',
        description: 'Charming set of 3 miniature polymer clay bud vases. Perfect for single stems or small dried flower arrangements.'
      },
      {
        id: 'mini-vase-collection',
        title: 'Mini Vase Collection',
        subtitle: 'Set of 6 decorative vases',
        price: 265,
        status: 'Available',
        description: 'Full collection of 6 unique mini vases in complementary colors. Display together or throughout the home.'
      }
    ]
  }
];

export default function ArtGallery() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('3d-printed');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const activeData = CATEGORIES.find(c => c.id === activeCategory);

  const handleCustomRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    toast({
      title: "Request Submitted",
      description: "We'll be in touch within 24 hours to discuss your custom piece."
    });
    setTimeout(() => {
      setShowCustomForm(false);
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', description: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="py-12 lg:py-16 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.3), rgba(212,175,55,0.05))',
              border: '2px solid rgba(212,175,55,0.3)'
            }}>
              <Palette className="h-7 w-7 text-[#d4af37]" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Art Gallery
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-4">
            Artisan ceramics and sculptures for luxury homes
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto">
            Each piece is crafted to complement modern and classic interiors. From 3D printed geometric designs to handmade signature pieces.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pb-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={activeCategory === category.id 
                  ? "bg-[#d4af37] text-black hover:bg-[#c19b2f]" 
                  : "border-slate-600 text-slate-300 hover:border-[#d4af37] hover:text-[#d4af37]"
                }
                onClick={() => setActiveCategory(category.id)}
                data-testid={`button-category-${category.id}`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            ))}
            <Button
              variant="outline"
              className="border-emerald-500/50 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/10"
              onClick={() => setShowCustomForm(true)}
              data-testid="button-custom-request"
            >
              <Mail className="h-4 w-4 mr-2" />
              Custom Request
            </Button>
          </div>
        </div>
      </section>

      {/* Category Content */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {activeData && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {activeData.name}
                </h2>
                <p className="text-slate-400">{activeData.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeData.pieces.map((piece) => (
                  <Card 
                    key={piece.id} 
                    className="bg-slate-800/50 border-slate-700/50 hover:border-[#d4af37]/50 transition-all hover-elevate overflow-hidden"
                    data-testid={`card-piece-${piece.id}`}
                  >
                    {/* Image Area */}
                    {'image' in piece && piece.image ? (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={piece.image as string} 
                          alt={piece.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div 
                        className="h-48 flex items-center justify-center relative"
                        style={{
                          background: piece.id.includes('elephant') 
                            ? 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #3b7ab8 100%)'
                            : piece.id.includes('lizard')
                            ? 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)'
                            : 'linear-gradient(135deg, #374151 0%, #4b5563 50%, #6b7280 100%)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <div className="text-center z-10">
                          <activeData.icon className="h-12 w-12 text-white/60 mx-auto mb-2" />
                          <p className="text-white/80 text-sm font-medium">{piece.title}</p>
                          <p className="text-white/50 text-xs">Image Coming Soon</p>
                        </div>
                      </div>
                    )}

                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-white text-lg">{piece.title}</CardTitle>
                          <p className="text-slate-400 text-sm">{piece.subtitle}</p>
                        </div>
                        <Badge 
                          className={piece.status === 'Available' 
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          }
                        >
                          {piece.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {piece.description}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                        <span className="text-2xl font-bold text-[#d4af37]">
                          ${piece.price.toLocaleString()}
                        </span>
                        <Button 
                          size="sm"
                          className="bg-[#d4af37] text-black hover:bg-[#c19b2f]"
                          onClick={() => setShowCustomForm(true)}
                          data-testid={`button-inquire-${piece.id}`}
                        >
                          Inquire
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Etsy Store Link */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="bg-gradient-to-r from-[#d4af37]/10 to-amber-500/10 border-[#d4af37]/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Shop on Etsy
              </h3>
              <p className="text-slate-300 mb-4">
                View our full collection and purchase directly through our Etsy store
              </p>
              <Button 
                className="bg-[#d4af37] text-black hover:bg-[#c19b2f]"
                onClick={() => window.open('https://www.etsy.com', '_blank')}
                data-testid="button-etsy-store"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Etsy Store
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Custom Request Modal */}
      {showCustomForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brush className="h-5 w-5 text-[#d4af37]" />
                Request Custom Piece
              </CardTitle>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Request Received</h3>
                  <p className="text-slate-400">We'll contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleCustomRequest} className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-300 mb-1 block">Name</label>
                    <Input 
                      placeholder="Your name"
                      className="bg-slate-700/50 border-slate-600 text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      data-testid="input-custom-name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 mb-1 block">Email</label>
                    <Input 
                      type="email"
                      placeholder="your@email.com"
                      className="bg-slate-700/50 border-slate-600 text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      data-testid="input-custom-email"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 mb-1 block">Phone (Optional)</label>
                    <Input 
                      placeholder="(555) 123-4567"
                      className="bg-slate-700/50 border-slate-600 text-white"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      data-testid="input-custom-phone"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 mb-1 block">Describe Your Vision</label>
                    <Textarea 
                      placeholder="Tell us about the piece you're imagining - size, style, colors, purpose..."
                      className="bg-slate-700/50 border-slate-600 text-white min-h-[100px]"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                      data-testid="textarea-custom-description"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button 
                      type="button"
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300"
                      onClick={() => setShowCustomForm(false)}
                      data-testid="button-cancel-custom"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 bg-[#d4af37] text-black hover:bg-[#c19b2f]"
                      data-testid="button-submit-custom"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Request
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
