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
  buyerProfiles: string[];
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
    riskDetail: "Financing, inspection, and closing",
    duration: "60–90 days",
    durationDetail: "Contract to close",
    complexity: 1,
    roles: ["Agent", "Attorney", "Mortgage broker", "Inspector"],
    buyerProfiles: ["Executive", "Physician", "Entrepreneur"],
  },
  {
    id: "5m-20m",
    band: "$5M–$20M",
    subtitle: "Expanded structure",
    teamSize: "5–8",
    risk: "Elevated",
    riskDetail: "Tax, insurance, and entity questions enter early",
    duration: "90–120 days",
    durationDetail: "Extended diligence before commitment",
    complexity: 2,
    roles: [
      "Agent",
      "Attorney",
      "CPA",
      "Mortgage or private bank",
      "Inspector",
      "Insurance advisor",
    ],
    buyerProfiles: ["Managing Director", "Founder", "Attorney Partner"],
  },
  {
    id: "20m-50m",
    band: "$20M–$50M",
    subtitle: "Full advisory team",
    teamSize: "8–12",
    risk: "High",
    riskDetail: "Estate, liquidity, renovation, and multi-counsel exposure",
    duration: "4–6 months",
    durationDetail: "Structure precedes offer architecture",
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
    buyerProfiles: ["Family Office Principal", "Hedge Fund Partner"],
  },
  {
    id: "50m-plus",
    band: "$50M+",
    subtitle: "Institutional scale",
    teamSize: "12–20+",
    risk: "Very high",
    riskDetail: "International, security, succession, and staffing exposure",
    duration: "6–12+ months",
    durationDetail: "Phased planning and execution",
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
    buyerProfiles: ["UHNW Family", "International Principal", "Institutional Buyer"],
  },
];
