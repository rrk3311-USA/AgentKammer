import type { LucideIcon } from "lucide-react";
import { Building2, ChartColumn, Compass, Landmark, MapPin, TrainFront } from "lucide-react";
import type { PerspectiveContentType } from "@/data/perspectives";

export const perspectiveIconMap: Record<PerspectiveContentType, LucideIcon> = {
  building: Building2,
  neighborhood: MapPin,
  "market-note": ChartColumn,
  relocation: TrainFront,
  development: Landmark,
  lifestyle: Compass,
};

export const perspectiveIconProps = { strokeWidth: 1.5, className: "h-3.5 w-3.5 shrink-0" } as const;
