import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowUpRight,
  ShieldCheck,
  Radar,
  CalendarCheck2,
} from "lucide-react";

const V3_LISTINGS = [
  { id: "a", name: "West Village Corner Loft", area: "West Village, NYC", price: "$4,120,000", beds: 3, baths: 2, sqft: "2,050" },
  { id: "b", name: "Brentwood Modern Estate", area: "Los Angeles, CA", price: "$5,380,000", beds: 5, baths: 5, sqft: "4,260" },
  { id: "c", name: "Lake Tahoe View Residence", area: "Incline Village, NV", price: "$3,100,000", beds: 4, baths: 3, sqft: "2,920" },
];

const V3_STEPS = [
  {
    title: "Precision Intake",
    text: "Define range, timing, risk constraints, and negotiation posture in one structured profile.",
    icon: Radar,
  },
  {
    title: "Targeted Opportunity Feed",
    text: "Surface only high-fit inventory with pricing context and timing signals.",
    icon: ShieldCheck,
  },
  {
    title: "Execution Calendar",
    text: "Run every milestone from pre-approval through closing with clear accountability.",
    icon: CalendarCheck2,
  },
];

export default function RealEstateLightV3() {
  return (
    <div className="min-h-screen bg-[#eef1f4] text-[#15232d]">
      <section className="border-b border-[#d4dde4] bg-gradient-to-b from-[#e8edf1] to-[#f5f7f9]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="mb-4 flex items-center gap-2">
            <Badge className="bg-[#d8efe9] text-[#0d6f67] hover:bg-[#d8efe9]">Concept V3</Badge>
            <Badge variant="outline" className="border-[#c4d0d9] text-[#5a6976]">
              Full UX Lift
            </Badge>
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight lg:text-5xl">
            A More Disciplined Real Estate Interface
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-[#5b6c7a]">
            Modern search, cleaner execution, and stronger decision support across buying, selling, and refinancing.
          </p>

          <Card className="mt-8 border-[#d4dde4] bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#d4dde4] px-3 py-2">
                <Search className="h-4 w-4 text-[#6e7f8c]" />
                <Input
                  placeholder="Search address, neighborhood, or intent"
                  className="h-8 border-0 bg-transparent p-0 shadow-none placeholder:text-[#94a2af] focus-visible:ring-0"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Button variant="outline" className="border-[#cad4dc] bg-white text-[#2b3944]">NYC</Button>
                <Button variant="outline" className="border-[#cad4dc] bg-white text-[#2b3944]">California</Button>
                <Button variant="outline" className="border-[#cad4dc] bg-white text-[#2b3944]">Nevada</Button>
                <Button variant="outline" className="border-[#cad4dc] bg-white text-[#2b3944]">
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
          <h2 className="text-2xl font-semibold">Priority Listings</h2>
          <p className="text-sm text-[#60707d]">Curated for strategic fit</p>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {V3_LISTINGS.map((item) => (
            <Card key={item.id} className="border-[#d3dce3] bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#e4f4f0] px-2.5 py-1 text-xs font-medium text-[#0d6f67]">
                <MapPin className="h-3.5 w-3.5" />
                {item.area}
              </div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="mt-2 text-2xl font-semibold">{item.price}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-[#60707d]">
                <span className="inline-flex items-center gap-1"><Bed className="h-4 w-4" />{item.beds}</span>
                <span className="inline-flex items-center gap-1"><Bath className="h-4 w-4" />{item.baths}</span>
                <span className="inline-flex items-center gap-1"><Square className="h-4 w-4" />{item.sqft}</span>
              </div>
              <Button className="mt-5 w-full bg-[#0d6f67] text-white hover:bg-[#0b5f58]">
                Open Deal Brief
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#d4dde4] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 py-10 lg:grid-cols-3">
          {V3_STEPS.map((step) => (
            <Card key={step.title} className="border-[#d4dde4] bg-[#f8fafb] p-5 shadow-sm">
              <step.icon className="mb-3 h-5 w-5 text-[#0d6f67]" />
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-[#60707d]">{step.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <Card className="border-[#c8d4de] bg-[#e8eef4] p-8 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold">Use this as the main direction?</h3>
              <p className="mt-2 text-[#5c6d7a]">We can migrate this design system across home, buying, selling, and contact.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/real-estate-light-v2">
                <Button variant="outline" className="border-[#b9c6d0] bg-white text-[#2b3944]">Compare V2</Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-[#0d6f67] text-white hover:bg-[#0b5f58]">Proceed With V3</Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
