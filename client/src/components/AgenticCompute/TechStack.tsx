import { Badge } from "@/components/ui/badge";

const techStack = [
  "OpenAI",
  "LangChain",
  "MongoDB",
  "Cloudflare Workers",
  "Zillow/MLS APIs",
  "PostgreSQL",
  "Node/Express",
  "Python",
  "Redis",
  "Airflow",
  "Vector Search",
  "S3/Cloud Storage"
];

export function TechStack() {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wide">Tech Stack</h3>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech, idx) => (
          <Badge
            key={idx}
            variant="secondary"
            className="bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs px-3 py-1"
            data-testid={`tech-${idx}`}
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}
