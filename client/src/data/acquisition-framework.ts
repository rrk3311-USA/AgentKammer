export type RoleGroup = {
  label: string;
  roles: string[];
};

export type FrameworkTier = {
  id: string;
  level: number;
  levelName: string;
  band: string;
  teamSize: string;
  teamVisualCount: number;
  risk: string;
  duration: string;
  typicalBuyers: string[];
  whyItMatters: string;
  strategicObservation: string;
  roleGroups: RoleGroup[];
};

export const frameworkTiers: FrameworkTier[] = [
  {
    id: "level-1",
    level: 1,
    levelName: "Core Acquisition",
    band: "Under $5M",
    teamSize: "3–5",
    teamVisualCount: 4,
    risk: "Moderate",
    duration: "60–90 days",
    typicalBuyers: ["Executive relocating", "Physician", "First luxury buyer"],
    whyItMatters:
      "Most buyers focus on the apartment. At this level, mistakes are usually financing, inspection, or contract related — not the floor plan.",
    strategicObservation:
      "The decision is still primarily about building fit and execution discipline. The team stays small because the risks are manageable — if the process is coordinated.",
    roleGroups: [
      { label: "Advisory", roles: ["Agent"] },
      { label: "Legal", roles: ["Attorney"] },
      { label: "Financial", roles: ["Mortgage broker"] },
      { label: "Property", roles: ["Inspector"] },
    ],
  },
  {
    id: "level-2",
    level: 2,
    levelName: "Structured Acquisition",
    band: "$5M–$20M",
    teamSize: "5–8",
    teamVisualCount: 6,
    risk: "Elevated",
    duration: "90–120 days",
    typicalBuyers: ["Senior executive", "Dual-income professional household", "Upgrade buyer"],
    whyItMatters:
      "Tax posture, insurance, and entity questions enter early. A smaller team that moves fast can create expensive gaps in structure and diligence.",
    strategicObservation:
      "Above $5M, the question is rarely whether you can afford the residence. It is whether the ownership structure matches how you actually hold assets.",
    roleGroups: [
      { label: "Advisory", roles: ["Agent"] },
      { label: "Legal", roles: ["Attorney"] },
      { label: "Financial", roles: ["CPA", "Mortgage or private bank"] },
      { label: "Property", roles: ["Inspector"] },
      { label: "Protection", roles: ["Insurance advisor"] },
    ],
  },
  {
    id: "level-3",
    level: 3,
    levelName: "Private Wealth Acquisition",
    band: "$20M–$50M",
    teamSize: "8–12",
    teamVisualCount: 10,
    risk: "High",
    duration: "4–6 months",
    typicalBuyers: ["Founder", "Managing partner", "Family office client"],
    whyItMatters:
      "Estate planning, liquidity, renovation scope, and multi-counsel coordination can matter as much as the residence. The apartment is no longer the hardest part.",
    strategicObservation:
      "At $20M+, ownership structure often becomes more important than negotiating the final price.",
    roleGroups: [
      { label: "Advisory", roles: ["Lead agent", "Family office advisor"] },
      { label: "Legal", roles: ["Real estate attorney", "Trust and estate attorney"] },
      { label: "Financial", roles: ["CPA", "Private banker"] },
      { label: "Property", roles: ["Architect", "Interior designer"] },
      { label: "Protection", roles: ["Insurance specialist"] },
    ],
  },
  {
    id: "level-4",
    level: 4,
    levelName: "Family Office Acquisition",
    band: "$50M+",
    teamSize: "12–20+",
    teamVisualCount: 14,
    risk: "Very high",
    duration: "6–12+ months",
    typicalBuyers: ["Ultra-high-net-worth principal", "International principal", "Multi-generational family"],
    whyItMatters:
      "Succession, international exposure, security, staffing, and balance-sheet impact can outlast the transaction itself. The decision becomes institutional.",
    strategicObservation:
      "At this level, buyers are purchasing coordination across tax, estate, property, and household systems — not square footage with better amenities.",
    roleGroups: [
      { label: "Advisory", roles: ["Lead agent", "Family office", "Wealth advisor", "Household staffing consultant"] },
      { label: "Legal", roles: ["Tax attorney", "Estate attorney", "International counsel"] },
      { label: "Financial", roles: ["Private bank"] },
      { label: "Property", roles: ["Architect", "Construction advisor"] },
      { label: "Protection", roles: ["Security consultant", "Insurance team"] },
    ],
  },
];

export const frameworkSteps = [
  "Property Analysis",
  "Risk Analysis",
  "Ownership Structure",
  "Advisory Team",
  "Acquisition Roadmap",
];
