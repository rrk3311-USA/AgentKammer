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
            className="bg-[#d4af37] border-[#d4af37] text-black text-xs px-3 py-1 font-medium"
            data-testid={`source-${idx}`}
          >
            {source}
          </Badge>
        ))}
      </div>
    </div>
  );
}
