export type AcquisitionStep = {
  title: string;
  text: string;
};

export type AdvisoryTeamTier = {
  id: string;
  band: string;
  subtitle: string;
  teamSize: string;
  risk: string;
  riskDetail: string;
  duration: string;
  durationDetail: string;
  complexity: 1 | 2 | 3 | 4;
  roles: string[];
};

export const acquisitionSteps: AcquisitionStep[] = [
  {
    title: "Property Analysis",
    text: "Building fit, comparables, and the specific opportunity — before terms are discussed.",
  },
  {
    title: "Risk Analysis",
    text: "Board dynamics, insurance, renovation exposure, liquidity, and timing risks listings rarely surface.",
  },
  {
    title: "Ownership Structure",
    text: "Entity selection, financing posture, tax consequences, and balance-sheet fit.",
  },
  {
    title: "Advisory Team",
    text: "Who belongs on the advisory team at this price point — and when each role enters.",
  },
  {
    title: "Acquisition Roadmap",
    text: "Sequenced execution: who engages when, and how mistakes get prevented early.",
  },
];

export const advisoryTeamTiers: AdvisoryTeamTier[] = [
  {
    id: "under-5m",
    band: "Under $5M",
    subtitle: "Core coordination",
    teamSize: "3–5",
    risk: "Moderate",
    riskDetail: "Financing, inspection, and closing coordination",
    duration: "60–90 days",
    durationDetail: "Typical contract to close",
    complexity: 1,
    roles: ["Agent", "Attorney", "Mortgage broker", "Inspector"],
  },
  {
    id: "5m-20m",
    band: "$5M–$20M",
    subtitle: "Expanded structure",
    teamSize: "5–8",
    risk: "Elevated",
    riskDetail: "Tax posture, insurance, and entity questions enter early",
    duration: "90–120 days",
    durationDetail: "More diligence before commitment",
    complexity: 2,
    roles: [
      "Agent",
      "Attorney",
      "CPA",
      "Mortgage or private bank",
      "Inspector",
      "Insurance advisor",
    ],
  },
  {
    id: "20m-50m",
    band: "$20M–$50M",
    subtitle: "Full advisory team",
    teamSize: "8–12",
    risk: "High",
    riskDetail: "Estate, liquidity, renovation, and multi-counsel coordination",
    duration: "4–6 months",
    durationDetail: "Structure before offer architecture",
    complexity: 3,
    roles: [
      "Lead agent",
      "Real estate attorney",
      "Trust and estate attorney",
      "CPA",
      "Private banker",
      "Insurance specialist",
      "Family office advisor",
      "Architect",
      "Interior designer",
    ],
  },
  {
    id: "50m-plus",
    band: "$50M+",
    subtitle: "Institutional scale",
    teamSize: "12–20+",
    risk: "Very high",
    riskDetail: "International, security, succession, and staffing considerations",
    duration: "6–12+ months",
    durationDetail: "Extended planning and phased execution",
    complexity: 4,
    roles: [
      "Lead agent",
      "Family office",
      "Tax attorney",
      "Estate attorney",
      "International counsel",
      "Wealth advisor",
      "Private bank",
      "Security consultant",
      "Architect",
      "Construction advisor",
      "Insurance team",
      "Household staffing consultant",
    ],
  },
];
