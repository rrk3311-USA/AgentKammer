import { Badge } from "@/components/ui/badge";

const dataSources = [
  "OneKey MLS",
  "CRMLS (CA)",
  "Zillow Bridge",
  "Realtor.com",
  "Redfin",
  "PropertyShark",
  "Public Records",
  "Tax Assessments",
  "Valuations",
  "Google Maps",
  "School & Crime DBs",
  "Walkscore"
];

export function DataSources() {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wide">Data Sources</h3>
      <div className="flex flex-wrap gap-2">
        {dataSources.map((source, idx) => (
          <Badge
            key={idx}
            variant="outline"
            className="bg-black/30 border-[#d4af37]/20 text-white/70 text-xs px-3 py-1"
            data-testid={`source-${idx}`}
          >
            {source}
          </Badge>
        ))}
      </div>
    </div>
  );
}
