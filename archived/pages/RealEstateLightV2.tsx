import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Search, SlidersHorizontal, MapPin, Bed, Bath, Square, ArrowUpRight, Activity, ShieldCheck, LineChart } from "lucide-react";

const LISTINGS = [
  {
    id: "v2-1",
    title: "Chelsea Corner Residence",
    area: "Chelsea, Manhattan",
    price: "$3,420,000",
    beds: 2,
    baths: 2,
    sqft: "1,740",
  },
  {
    id: "v2-2",
    title: "Pacific Heights View Home",
    area: "San Francisco, CA",
    price: "$4,180,000",
    beds: 4,
    baths: 3,
    sqft: "2,960",
  },
  {
    id: "v2-3",
    title: "Lakefront Modern Estate",
    area: "Incline Village, NV",
    price: "$2,980,000",
    beds: 4,
    baths: 3,
    sqft: "2,810",
  },
];

const SYSTEM_BLOCKS = [
  {
    title: "Signal-First Discovery",
    body: "Market scan, pricing drift, and timing signals organized into one search system.",
    icon: Activity,
  },
  {
    title: "Risk-Managed Offers",
    body: "Offer structure designed around certainty, leverage, and downside protection.",
    icon: ShieldCheck,
  },
  {
    title: "Live Decision Intelligence",
    body: "Execution dashboard with milestones, lender checkpoints, and negotiation pivots.",
    icon: LineChart,
  },
];

export default function RealEstateLightV2() {
  return (
    <div className="min-h-screen bg-[#f2f4f7] text-[#172026]">
      <section className="border-b border-[#d7dde3] bg-gradient-to-b from-[#eef2f5] to-[#f7f9fb]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="mb-4 inline-flex items-center gap-2">
            <Badge className="bg-[#d9f1ee] text-[#0d6f67] hover:bg-[#d9f1ee]">Concept V2</Badge>
            <Badge variant="outline" className="border-[#c8d0d8] text-[#4b5a67]">
              Grey + Teal
            </Badge>
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight lg:text-5xl">
            Modern Real Estate Operations, Built For Clarity
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-[#5a6976]">
            A cleaner interface with focused search, stronger structure, and faster buy/sell execution.
          </p>

          <Card className="mt-8 border-[#d7dde3] bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#d7dde3] px-3 py-2">
                <Search className="h-4 w-4 text-[#6f7d89]" />
                <Input
                  placeholder="Search by area, address, or MLS keyword"
                  className="h-8 border-0 bg-transparent p-0 shadow-none placeholder:text-[#95a3af] focus-visible:ring-0"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Button variant="outline" className="border-[#ced6de] bg-white text-[#2b3945]">
                  NYC
                </Button>
                <Button variant="outline" className="border-[#ced6de] bg-white text-[#2b3945]">
                  California
                </Button>
                <Button variant="outline" className="border-[#ced6de] bg-white text-[#2b3945]">
                  Nevada
                </Button>
                <Button variant="outline" className="border-[#ced6de] bg-white text-[#2b3945]">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Live Opportunity Feed</h2>
          <span className="text-sm text-[#60717f]">Updated every 15 minutes</span>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {LISTINGS.map((listing) => (
            <Card key={listing.id} className="border-[#d5dce3] bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#e6f7f4] px-2.5 py-1 text-xs font-medium text-[#0d6f67]">
                <MapPin className="h-3.5 w-3.5" />
                {listing.area}
              </div>
              <h3 className="text-lg font-semibold">{listing.title}</h3>
              <p className="mt-2 text-2xl font-semibold text-[#172026]">{listing.price}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-[#60717f]">
                <span className="inline-flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  {listing.beds}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  {listing.baths}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  {listing.sqft}
                </span>
              </div>
              <Button className="mt-5 w-full bg-[#0d6f67] text-white hover:bg-[#0b5f58]">
                Open Brief
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#d7dde3] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 py-10 lg:grid-cols-3">
          {SYSTEM_BLOCKS.map((block) => (
            <Card key={block.title} className="border-[#d5dce3] bg-[#f9fbfc] p-5 shadow-sm">
              <block.icon className="mb-3 h-5 w-5 text-[#0d6f67]" />
              <h3 className="text-lg font-semibold">{block.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#62727f]">{block.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <Card className="border-[#c7d2dc] bg-[#eaf1f6] p-8 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold">Prefer this V2 direction?</h3>
              <p className="mt-2 text-[#5f6f7c]">I can evolve this into a full replacement flow after your approval.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/real-estate-light">
                <Button variant="outline" className="border-[#b7c2cc] bg-white text-[#2b3945]">
                  Compare V1
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-[#0d6f67] text-white hover:bg-[#0b5f58]">Use This Direction</Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
