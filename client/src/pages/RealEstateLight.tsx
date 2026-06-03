import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Search, SlidersHorizontal, MapPin, Bed, Bath, Square, ArrowUpRight, Sparkles } from "lucide-react";

const FEATURED_LISTINGS = [
  {
    id: "l1",
    title: "Tribeca Loft With Private Terrace",
    neighborhood: "Tribeca, NYC",
    price: "$4,250,000",
    beds: 3,
    baths: 3,
    sqft: "2,180",
  },
  {
    id: "l2",
    title: "Sunset Strip View Residence",
    neighborhood: "Los Angeles, CA",
    price: "$3,980,000",
    beds: 4,
    baths: 4,
    sqft: "3,060",
  },
  {
    id: "l3",
    title: "Modern Lakefront Investment Home",
    neighborhood: "Incline Village, NV",
    price: "$2,620,000",
    beds: 4,
    baths: 3,
    sqft: "2,740",
  },
];

const WORKFLOW = [
  {
    title: "Clarify Search Profile",
    text: "Define budget, timing, neighborhood priorities, and deal constraints in one clean intake.",
  },
  {
    title: "Shortlist High-Conviction Options",
    text: "Filter noise fast, then focus tours and diligence only on properties that clear your criteria.",
  },
  {
    title: "Execute With Precision",
    text: "Tight offer positioning, negotiation leverage, and contract-to-close risk control.",
  },
];

export default function RealEstateLight() {
  return (
    <div className="min-h-screen bg-[#f7f8fb] text-[#111827]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <Badge className="mb-4 bg-[#eef3ff] text-[#2247d6] hover:bg-[#eef3ff]">
            Light Experience Concept
          </Badge>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight lg:text-5xl">
            Find Better Homes Faster With A Clear, Modern Search Workflow
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            A cleaner buy/sell experience with focused discovery, transparent process, and concierge-level execution.
          </p>

          <Card className="mt-8 border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                <Search className="h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search city, neighborhood, address, or ZIP"
                  className="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-auto">
                <Button variant="outline" className="justify-start border-slate-200">
                  NYC
                </Button>
                <Button variant="outline" className="justify-start border-slate-200">
                  California
                </Button>
                <Button variant="outline" className="justify-start border-slate-200">
                  Nevada
                </Button>
                <Button variant="outline" className="justify-start border-slate-200">
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
          <h2 className="text-2xl font-semibold">Featured Opportunities</h2>
          <Badge variant="outline" className="border-slate-300 text-slate-600">
            Updated Today
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {FEATURED_LISTINGS.map((listing) => (
            <Card key={listing.id} className="border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex rounded-full bg-[#eef3ff] px-2.5 py-1 text-xs font-medium text-[#2247d6]">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                {listing.neighborhood}
              </div>
              <h3 className="text-lg font-semibold leading-snug">{listing.title}</h3>
              <p className="mt-2 text-2xl font-semibold text-[#111827]">{listing.price}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
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
              <Button className="mt-5 w-full bg-[#1f4ae0] text-white hover:bg-[#1b3fc1]">
                View Property
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 lg:grid-cols-3">
          {WORKFLOW.map((item, idx) => (
            <Card key={item.title} className="border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#111827] text-sm font-semibold text-white">
                {idx + 1}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <Card className="border-slate-200 bg-gradient-to-r from-[#f8fbff] to-[#f2f6ff] p-8 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 text-[#2247d6]">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Concierge Support</span>
              </div>
              <h3 className="text-2xl font-semibold">Want this style promoted as the main experience?</h3>
              <p className="mt-2 text-slate-600">
                Keep current site as-is, or switch primary route after your approval.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/">
                <Button variant="outline" className="border-slate-300">
                  Back to Current Home
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-[#1f4ae0] text-white hover:bg-[#1b3fc1]">Request This Direction</Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
