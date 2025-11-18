import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  CheckSquare,
  Calculator,
  BarChart3,
  Users,
  FileSpreadsheet,
  Star,
  Sparkles
} from "lucide-react";
import { SiNotion } from "react-icons/si";

export default function Downloads() {
  const featuredDownload = {
    id: "notion-crm",
    title: "Luxury Client CRM & Pipeline",
    subtitle: "Complete Notion Template",
    description: "A comprehensive Notion workspace designed specifically for luxury real estate professionals. Track your high-net-worth clients, manage property showings, monitor deal pipelines, and organize all client communications in one elegant system. Includes pre-built databases for clients, properties, showings, offers, and follow-ups with custom views and automations.",
    icon: SiNotion,
    fileType: "Notion Template",
    downloads: 2341,
    rating: 4.9,
    features: [
      "Client database with wealth scoring",
      "Property pipeline & stage tracking",
      "Automated showing scheduler",
      "Deal value calculator",
      "Communication history logs",
      "Custom dashboards & reporting"
    ]
  };

  const downloads = [
    {
      id: "property-comparison",
      title: "Property Comparison Matrix",
      description: "Excel/Sheets template for side-by-side luxury property analysis. Compare up to 5 properties across 30+ criteria including location scores, amenities, investment metrics, and client fit. Includes automated scoring system and visual comparison charts.",
      icon: FileSpreadsheet,
      fileType: "Excel/Sheets",
      downloads: 1847,
      category: "Analysis"
    },
    {
      id: "showing-checklist",
      title: "Luxury Showing Checklist",
      description: "Professional PDF checklist for conducting flawless luxury property showings. Covers pre-showing preparation, during-showing highlights, emotional engagement techniques, and post-showing follow-up protocols. Ensure every $5M+ showing is executed perfectly.",
      icon: CheckSquare,
      fileType: "PDF Guide",
      downloads: 3102,
      category: "Operations"
    },
    {
      id: "buyer-qualification",
      title: "UHNW Buyer Qualification Form",
      description: "Sophisticated buyer intake worksheet designed for ultra-high-net-worth clients. Captures financial qualification, lifestyle preferences, investment objectives, timeline, and decision-making authority while maintaining discretion and professionalism.",
      icon: Users,
      fileType: "PDF Form",
      downloads: 2654,
      category: "Sales"
    },
    {
      id: "deal-calculator",
      title: "Investment ROI Calculator",
      description: "Advanced Excel calculator for luxury real estate investment analysis. Calculate cash flow, cap rates, appreciation projections, tax implications, and total ROI. Includes scenarios for primary residence, investment property, and 1031 exchanges.",
      icon: Calculator,
      fileType: "Excel",
      downloads: 1923,
      category: "Finance"
    },
    {
      id: "market-analysis",
      title: "Comparative Market Analysis Template",
      description: "Professional CMA template for luxury properties. Generate branded market reports with comparable sales, active listings, market trends, and pricing recommendations. Includes charts, neighborhood insights, and investment outlook.",
      icon: BarChart3,
      fileType: "PowerPoint/PDF",
      downloads: 2198,
      category: "Marketing"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.1),transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-4">
            <Badge 
              className="mb-6 border-0" 
              style={{ 
                background: 'rgba(212,175,55,0.2)', 
                color: '#d4af37',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Free Resources
            </Badge>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-white">
              Professional Templates & Tools
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Elevate your luxury real estate practice with our curated collection of templates, 
              checklists, and calculators. Download instantly and start using today.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Download */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge 
              className="mb-4 border-0" 
              style={{ 
                background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                color: '#000',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem'
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Most Popular
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
              {featuredDownload.title}
            </h2>
            <p className="text-xl mt-2" style={{ color: '#d4af37' }}>
              {featuredDownload.subtitle}
            </p>
          </div>

          <Card 
            className="overflow-hidden border-0" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(15,32,55,0.95) 100%)',
              backdropFilter: 'blur(20px)'
            }}
            data-testid="card-featured-download"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left: Icon & Stats */}
              <div className="flex flex-col items-center justify-center space-y-6">
                <div 
                  className="w-48 h-48 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.3), rgba(212,175,55,0.05))',
                    border: '2px solid rgba(212,175,55,0.3)'
                  }}
                >
                  <featuredDownload.icon className="h-24 w-24" style={{ color: '#d4af37' }} />
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
                      <span className="font-bold text-white">{featuredDownload.rating}</span>
                    </div>
                    <p className="text-xs text-white/60">Rating</p>
                  </div>
                  <div className="h-8 w-px bg-white/20" />
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Download className="h-4 w-4 text-[#d4af37]" />
                      <span className="font-bold text-white">{featuredDownload.downloads.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-white/60">Downloads</p>
                  </div>
                </div>

                <Badge 
                  className="border-0" 
                  style={{ 
                    background: 'rgba(212,175,55,0.15)', 
                    color: '#d4af37',
                    padding: '0.5rem 1rem'
                  }}
                >
                  {featuredDownload.fileType}
                </Badge>
              </div>

              {/* Right: Details */}
              <div className="flex flex-col justify-center">
                <h3 className="font-serif text-3xl font-bold mb-4 text-white">
                  {featuredDownload.title}
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {featuredDownload.description}
                </p>

                <div className="space-y-3 mb-6">
                  <p className="text-sm font-semibold text-white/70 uppercase tracking-wide">Includes:</p>
                  <div className="grid gap-2">
                    {featuredDownload.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckSquare className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#d4af37' }} />
                        <span className="text-sm text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="gap-2 border-0 w-full"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                    color: '#000',
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                  data-testid="button-download-featured"
                >
                  <Download className="h-5 w-5" />
                  Download Template
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Additional Downloads */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(to bottom, #1e293b, #0f172a)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-white">
              More Professional Resources
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Essential tools and templates to streamline your luxury real estate operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloads.map((download) => (
              <Card 
                key={download.id}
                className="overflow-hidden border-0 flex flex-col"
                style={{ 
                  background: 'rgba(15,23,42,0.8)',
                  backdropFilter: 'blur(10px)'
                }}
                data-testid={`card-download-${download.id}`}
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: 'rgba(212,175,55,0.15)',
                        border: '1px solid rgba(212,175,55,0.3)'
                      }}
                    >
                      <download.icon className="h-7 w-7" style={{ color: '#d4af37' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold mb-1 text-white">
                        {download.title}
                      </h3>
                      <Badge 
                        className="border-0 text-xs" 
                        style={{ 
                          background: 'rgba(212,175,55,0.15)', 
                          color: '#d4af37'
                        }}
                      >
                        {download.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {download.description}
                  </p>

                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1 text-sm" style={{ color: 'rgba(212,175,55,0.8)' }}>
                      <Download className="h-4 w-4" />
                      <span>{download.downloads.toLocaleString()}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs"
                      style={{ 
                        borderColor: 'rgba(212,175,55,0.3)',
                        color: 'rgba(212,175,55,0.9)'
                      }}
                    >
                      {download.fileType}
                    </Badge>
                  </div>

                  <Button 
                    className="gap-2 border-0 w-full"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                      color: '#000',
                      fontWeight: 600
                    }}
                    data-testid={`button-download-${download.id}`}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
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
            Elevate Your Practice Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Join thousands of top-performing agents who use our professional templates to close more deals 
            and deliver exceptional client experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                color: '#000',
                fontWeight: 600
              }}
              data-testid="button-download-all"
            >
              <Download className="h-5 w-5" />
              Download All Templates
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2"
              data-testid="button-request-custom"
            >
              <FileText className="h-5 w-5" />
              Request Custom Template
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
