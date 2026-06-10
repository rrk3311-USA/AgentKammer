import type { LucideIcon } from "lucide-react";
import {
  Coffee,
  Dumbbell,
  Eye,
  KeyRound,
  Landmark,
  Shield,
  ShoppingBag,
  TrainFront,
  Trees,
  Waves,
  Wine,
  Wifi,
} from "lucide-react";
import type { BuildingAmenityKey } from "@/data/buildings";

export const buildingAmenityIconMap: Record<BuildingAmenityKey, LucideIcon> = {
  pool: Waves,
  gym: Dumbbell,
  "river-view": Eye,
  concierge: KeyRound,
  doorman: Shield,
  park: Trees,
  "wine-room": Wine,
  lounge: Coffee,
  security: Shield,
  transit: TrainFront,
  skyline: Landmark,
  valet: KeyRound,
  "pet-friendly": Trees,
  "work-from-home": Wifi,
  shopping: ShoppingBag,
  cafe: Coffee,
};

export const buildingAmenityIconProps = {
  strokeWidth: 1.45,
  className: "h-[1.125rem] w-[1.125rem] shrink-0 text-brand-hero-champagne",
} as const;
