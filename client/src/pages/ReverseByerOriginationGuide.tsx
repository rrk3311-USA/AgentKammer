import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ReverseByerOriginationGuide() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-serif font-bold mb-4">Reverse Buyer Origination</h1>
        <p className="text-base text-muted-foreground mb-6">
          <strong>A private‑banking approach to luxury real estate.</strong>
        </p>
        <p className="text-base text-muted-foreground mb-8">
          Traditional home‑buying often means choosing one agent and one lender and hoping for the best. Reverse Buyer Origination flips the script: you build your buyer profile once, and trusted lenders and brokers compete to serve you. This concierge‑style model brings the competitive energy of private banking into the real‑estate world.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-12 mb-6">How it works</h2>
        <ol className="space-y-4 ml-6 list-decimal">
          <li>
            <strong>Luxury buyer profile.</strong>
            <p className="text-muted-foreground mt-2">Share your ideal price range, down payment, self‑reported credit band, monthly comfort and target cities. No hard credit pulls; no pressure.</p>
          </li>
          <li>
            <strong>Lenders quietly compete.</strong>
            <p className="text-muted-foreground mt-2">With your permission, we invite multiple trusted lenders to provide ranges for annual percentage rate (APR), estimated payments, potential credits and closing‑cost bands.</p>
          </li>
          <li>
            <strong>Brokerages quietly compete.</strong>
            <p className="text-muted-foreground mt-2">We compare traditional brands, 100 %‑commission models and boutique luxury shops to find lean fee structures that best fit your numbers.</p>
          </li>
          <li>
            <strong>One clear summary.</strong>
            <p className="text-muted-foreground mt-2">You receive a simple RBO report with APR ranges, estimated payments, available credits and a comparison against the traditional path. (Actual terms will depend on your qualifications and market conditions.)</p>
          </li>
        </ol>

        <h2 className="text-2xl font-serif font-bold mt-12 mb-6">Sample savings scenarios*</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold">Scenario</th>
                <th className="px-4 py-3 text-left font-semibold">APR range</th>
                <th className="px-4 py-3 text-left font-semibold">Commission</th>
                <th className="px-4 py-3 text-left font-semibold">Credits</th>
                <th className="px-4 py-3 text-left font-semibold">Approx. monthly</th>
                <th className="px-4 py-3 text-left font-semibold">Cost comparison</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3">Traditional route</td>
                <td className="px-4 py-3">~7.25%</td>
                <td className="px-4 py-3">2.5%</td>
                <td className="px-4 py-3">None</td>
                <td className="px-4 py-3">≈ $6,814</td>
                <td className="px-4 py-3 text-muted-foreground">Highest cost</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3">Some rate shopping</td>
                <td className="px-4 py-3">6.9–7.1%</td>
                <td className="px-4 py-3">2.5%</td>
                <td className="px-4 py-3">Minimal</td>
                <td className="px-4 py-3">≈ $6,650</td>
                <td className="px-4 py-3 text-muted-foreground">$20k+ extra (5 yr)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3">Discount broker + one lender</td>
                <td className="px-4 py-3">6.75–6.9%</td>
                <td className="px-4 py-3">~2%</td>
                <td className="px-4 py-3">Small</td>
                <td className="px-4 py-3">≈ $6,575</td>
                <td className="px-4 py-3 text-muted-foreground">$12k–$18k extra</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3">2–3 lenders + lean broker</td>
                <td className="px-4 py-3">6.50–6.70%</td>
                <td className="px-4 py-3">1.5–2%</td>
                <td className="px-4 py-3">$5k–$10k</td>
                <td className="px-4 py-3">≈ $6,450</td>
                <td className="px-4 py-3 text-muted-foreground">$20k–$30k saved</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><Badge className="bg-[#d4af37] text-[#0a1628]">RBO concierge</Badge></td>
                <td className="px-4 py-3 font-semibold text-[#d4af37]">6.10–6.40%</td>
                <td className="px-4 py-3 font-semibold text-[#d4af37]">1–1.5%</td>
                <td className="px-4 py-3 font-semibold text-[#d4af37]">$5k–$20k+</td>
                <td className="px-4 py-3 font-semibold text-[#d4af37]">≈ $6,200</td>
                <td className="px-4 py-3 font-semibold text-[#d4af37]">$35k–$55k saved</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4 italic">
          *Illustrative example for a $1 million purchase. Figures do not constitute a commitment to lend. Actual rates, payments and savings will vary based on qualifications and prevailing market conditions. APRs are expressed as annual percentage rates and are subject to change.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-12 mb-6">Why it's different</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-3">Agent & brokerage neutral</h3>
            <p className="text-sm text-muted-foreground">
              We're not tied to a single lender or broker. We collaborate with traditional brands, lean 100%‑commission models and boutique firms to find the right fit for you.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-3">Multiple lenders, one view</h3>
            <p className="text-sm text-muted-foreground">
              We consolidate APR ranges, payments, credits and cash‑to‑close bands into clear summaries, making comparison straightforward.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-3">White‑glove concierge</h3>
            <p className="text-sm text-muted-foreground">
              Our team coordinates lenders, negotiates broker fees and handles compliance so you can focus on finding your ideal home.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
