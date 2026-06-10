export type BuildingAmenityKey =
  | "pool"
  | "gym"
  | "river-view"
  | "concierge"
  | "doorman"
  | "park"
  | "wine-room"
  | "lounge"
  | "security"
  | "transit"
  | "skyline"
  | "valet"
  | "pet-friendly"
  | "work-from-home"
  | "shopping"
  | "cafe";

export interface BuildingAmenity {
  key: BuildingAmenityKey;
  label: string;
}

export interface BuildingPrice {
  label: string;
  value: string;
}

export interface TrackedBuilding {
  name: string;
  area: string;
  descriptor: string;
  slug: string;
  price: BuildingPrice;
  /** Two signature identity markers for the watchlist card */
  knownFor: [string, string];
  amenities: BuildingAmenity[];
}

/** Watchlist facts sourced from developer sites, Related/Rockrose/Brookfield leasing, and official building materials. */
export const trackedBuildings: TrackedBuilding[] = [
  {
    name: "35 Hudson Yards",
    area: "Hudson Yards",
    descriptor: "Yards Landmark Tower",
    slug: "35-hudson-yards",
    price: { label: "Typical Lease", value: "$42K/mo" },
    knownFor: ["Private Equinox Access", "Hudson Yards Flagship"],
    amenities: [
      { key: "gym", label: "Equinox Club" },
      { key: "pool", label: "Indoor Pool" },
      { key: "lounge", label: "Stephen Starr" },
      { key: "concierge", label: "Concierge" },
    ],
  },
  {
    name: "15 Hudson Yards",
    area: "Hudson Yards",
    descriptor: "Sculptural Glass Tower",
    slug: "15-hudson-yards",
    price: { label: "Typical Lease", value: "$35K/mo" },
    knownFor: ["Cold-Bent Glass", "75ft Sky Pool"],
    amenities: [
      { key: "pool", label: "75ft Pool" },
      { key: "gym", label: "Wright Fit Gym" },
      { key: "wine-room", label: "Wine Tasting" },
      { key: "lounge", label: "Residents Lounge" },
    ],
  },
  {
    name: "One High Line",
    area: "West Chelsea",
    descriptor: "Modern Waterfront Tower",
    slug: "one-high-line",
    price: { label: "Typical Lease", value: "$28K/mo" },
    knownFor: ["BIG Architecture", "Faena Hospitality"],
    amenities: [
      { key: "pool", label: "75ft Lap Pool" },
      { key: "gym", label: "Fitness Studio" },
      { key: "lounge", label: "High Line Club" },
      { key: "river-view", label: "Hudson Views" },
    ],
  },
  {
    name: "Lantern House",
    area: "West Chelsea",
    descriptor: "Heatherwick Bay-Window Tower",
    slug: "lantern-house",
    price: { label: "Typical Residence", value: "$32K+" },
    knownFor: ["Heatherwick Design", "Lantern Windows"],
    amenities: [
      { key: "pool", label: "Indoor Pool" },
      { key: "gym", label: "Equinox Gym" },
      { key: "lounge", label: "Library Lounge" },
      { key: "park", label: "High Line" },
    ],
  },
  {
    name: "565 Broome",
    area: "SoHo",
    descriptor: "Renzo Piano SoHo Tower",
    slug: "565-broome",
    price: { label: "Typical Lease", value: "$26K/mo" },
    knownFor: ["Renzo Piano", "Saltwater Lap Pool"],
    amenities: [
      { key: "pool", label: "Saltwater Pool" },
      { key: "gym", label: "Fitness Center" },
      { key: "valet", label: "Auto Parking" },
      { key: "skyline", label: "SoHo Views" },
    ],
  },
  {
    name: "Manhattan West",
    area: "Penn District",
    descriptor: "Manhattan West Flagship Rental",
    slug: "manhattan-west",
    price: { label: "Typical Lease", value: "$30K/mo" },
    knownFor: ["La Palestra", "Rock Climbing Wall"],
    amenities: [
      { key: "gym", label: "La Palestra" },
      { key: "lounge", label: "Library Lounge" },
      { key: "shopping", label: "Whole Foods" },
      { key: "transit", label: "Penn Station" },
    ],
  },
  {
    name: "The Cortland",
    area: "West Side",
    descriptor: "RAMS Hudson River Tower",
    slug: "the-cortland",
    price: { label: "Typical Lease", value: "$24K/mo" },
    knownFor: ["Robert A.M. Stern", "75ft Lap Pool"],
    amenities: [
      { key: "pool", label: "75ft Lap Pool" },
      { key: "gym", label: "Fitness Center" },
      { key: "park", label: "Hudson River Park" },
      { key: "work-from-home", label: "Maker Space" },
    ],
  },
  {
    name: "Waterline Square",
    area: "Upper West Side",
    descriptor: "Riverside Club Campus",
    slug: "waterline-square",
    price: { label: "Typical Lease", value: "$22K/mo" },
    knownFor: ["Waterline Club", "Three-Tower Campus"],
    amenities: [
      { key: "pool", label: "Lap Pool" },
      { key: "gym", label: "Fitness Center" },
      { key: "lounge", label: "Waterline Club" },
      { key: "river-view", label: "Hudson Views" },
    ],
  },
  {
    name: "EŌS",
    area: "Midtown West",
    descriptor: "Durst NoMad Rental Tower",
    slug: "the-avery",
    price: { label: "Observed Range", value: "$4K–$11K/mo" },
    knownFor: ["Durst Tower", "Rooftop Lounge"],
    amenities: [
      { key: "pool", label: "Indoor Pool" },
      { key: "gym", label: "Fitness Center" },
      { key: "lounge", label: "Rooftop Lounge" },
      { key: "skyline", label: "Empire State Views" },
    ],
  },
  {
    name: "One Manhattan Square",
    area: "Two Bridges",
    descriptor: "Extell East River Tower",
    slug: "one-manhattan-square",
    price: { label: "Typical Lease", value: "$18K/mo" },
    knownFor: ["Extell Tower", "75ft Saltwater Pool"],
    amenities: [
      { key: "pool", label: "Saltwater Pool" },
      { key: "lounge", label: "Residents Club" },
      { key: "gym", label: "Fitness Center" },
      { key: "river-view", label: "East River Views" },
    ],
  },
  {
    name: "Tribeca Green",
    area: "Battery Park City",
    descriptor: "RAMS LEED Gold Residence",
    slug: "tribeca-green",
    price: { label: "Typical Lease", value: "$28K–$38K" },
    knownFor: ["Robert A.M. Stern", "LEED Gold"],
    amenities: [
      { key: "gym", label: "Fitness + Yoga" },
      { key: "lounge", label: "Billiards Lounge" },
      { key: "river-view", label: "Hudson Terrace" },
      { key: "park", label: "Teardrop Park" },
    ],
  },
  {
    name: "One Madison",
    area: "Flatiron",
    descriptor: "Madison Square Park Tower",
    slug: "one-madison",
    price: { label: "Observed Range", value: "$38K–$55K" },
    knownFor: ["Yabu Pushelberg", "One Club"],
    amenities: [
      { key: "pool", label: "Heated Lap Pool" },
      { key: "gym", label: "Fitness + Yoga" },
      { key: "lounge", label: "One Club" },
      { key: "park", label: "Madison Sq Park" },
    ],
  },
  {
    name: "111 West 57",
    area: "Midtown",
    descriptor: "Steinway Hall Supertall",
    slug: "111-west-57",
    price: { label: "Typical Residence", value: "$65K–$95K" },
    knownFor: ["Steinway Hall", "Club 111"],
    amenities: [
      { key: "pool", label: "82ft Lap Pool" },
      { key: "lounge", label: "Club 111" },
      { key: "skyline", label: "Central Park Views" },
      { key: "concierge", label: "Concierge" },
    ],
  },
  {
    name: "220 Central Park South",
    area: "Central Park South",
    descriptor: "Billionaires Row Limestone",
    slug: "220-central-park-south",
    price: { label: "Typical Residence", value: "$95K–$150K" },
    knownFor: ["Billionaires Row", "Jean-Georges Restaurant"],
    amenities: [
      { key: "pool", label: "Saltwater Pool" },
      { key: "park", label: "Central Park Views" },
      { key: "wine-room", label: "Wine Tasting" },
      { key: "lounge", label: "Residents Dining" },
    ],
  },
  {
    name: "432 Park Avenue",
    area: "Midtown",
    descriptor: "Midtown Supertall Residence",
    slug: "432-park-avenue",
    price: { label: "Typical Residence", value: "$75K–$110K" },
    knownFor: ["Viñoly Supertall", "Private Restaurant"],
    amenities: [
      { key: "pool", label: "75ft Lap Pool" },
      { key: "gym", label: "Wright Fit" },
      { key: "lounge", label: "Private Restaurant" },
      { key: "skyline", label: "Park Views" },
    ],
  },
  {
    name: "Brookfield Place",
    area: "Battery Park City",
    descriptor: "Battery Park City Waterfront",
    slug: "brookfield-place",
    price: { label: "Typical Lease", value: "$29K/mo" },
    knownFor: ["Brookfield Place", "Hudson Esplanade"],
    amenities: [
      { key: "shopping", label: "Brookfield Place" },
      { key: "river-view", label: "Hudson Esplanade" },
      { key: "transit", label: "PATH & Subway" },
      { key: "concierge", label: "Concierge" },
    ],
  },
  {
    name: "Lyra",
    area: "Hudson Yards",
    descriptor: "Hudson Yards Rental Tower",
    slug: "hudson-yards-residences",
    price: { label: "Typical Lease", value: "$33K/mo" },
    knownFor: ["Aurora Terrace", "Squash Court"],
    amenities: [
      { key: "gym", label: "Glow Fitness" },
      { key: "river-view", label: "Rooftop Terrace" },
      { key: "lounge", label: "Sky Lounge" },
      { key: "work-from-home", label: "Solarium Co-Work" },
    ],
  },
  {
    name: "606 West 30th",
    area: "West Chelsea",
    descriptor: "Green-Wall Chelsea Tower",
    slug: "the-symone",
    price: { label: "Typical Lease", value: "$27K/mo" },
    knownFor: ["Living Green Wall", "30/30 Club"],
    amenities: [
      { key: "pool", label: "Indoor Pool" },
      { key: "gym", label: "Fitness Center" },
      { key: "lounge", label: "30/30 Club" },
      { key: "river-view", label: "Hudson Views" },
    ],
  },
];
