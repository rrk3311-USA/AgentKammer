import { DigitalProducts } from "@/components/DigitalProducts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function EShop() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      {/* Header */}
      <section className="border-b border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-4" data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back Home
            </Button>
          </Link>
          <h1 className="text-5xl font-bold text-white mb-3">
            Agent Kammer <span style={{ color: "#d4af37" }}>E-Shop</span>
          </h1>
          <p className="text-xl text-white/70">
            Exclusive digital products, research reports, and proprietary tools to accelerate your financial decisions
          </p>
        </div>
      </section>

      {/* Products */}
      <DigitalProducts />
    </div>
  );
}
