type KnowledgeMetadata = {
  audience: string[];
  decisionStage: string[];
  transactionType: string[];
  neighborhood: string[];
  topic: string[];
  authority: "core" | "advisory" | "reference";
};

export type DecisionGuideKnowledgeDocument = {
  id: string;
  title: string;
  content: string;
  metadata: KnowledgeMetadata;
};

export const decisionGuideKnowledgeBase: DecisionGuideKnowledgeDocument[] = [
  {
    id: "framework-decision-under-uncertainty",
    title: "Decision Under Uncertainty",
    content:
      "Agent Kammer begins with uncertainty, not listings. The order is: what changed, why it matters, what options exist, what trade-offs control the choice, and which path has the highest expected value. A strong recommendation can still be to wait, renew, stay put, or do nothing.",
    metadata: {
      audience: ["buyer", "seller", "owner"],
      decisionStage: ["exploring", "defined-need", "qualified"],
      transactionType: ["buy", "sell", "rent", "hold", "wait"],
      neighborhood: ["manhattan"],
      topic: ["decision framework", "uncertainty", "recommendation"],
      authority: "core",
    },
  },
  {
    id: "framework-trigger-first",
    title: "Life Change Before Transaction",
    content:
      "People do not wake up wanting to buy a condo or list a home. They wake up because life changed. The advisor should diagnose the trigger first: relocation, family change, divorce, retirement, investment pressure, timing pressure, or uncertainty about what to do next.",
    metadata: {
      audience: ["buyer", "seller", "owner"],
      decisionStage: ["anonymous", "exploring"],
      transactionType: ["buy", "sell", "rent", "hold"],
      neighborhood: ["manhattan"],
      topic: ["life event", "motivation", "triage"],
      authority: "core",
    },
  },
  {
    id: "buyer-strategy-rent-vs-buy",
    title: "Rent vs Buy Guidance",
    content:
      "Rent versus buy should usually be decided through expected length of stay, liquidity, financing readiness, uncertainty level, commute, and how costly a wrong purchase would be. Renting can be the smarter strategic move when timeline is short or the market is still unfamiliar.",
    metadata: {
      audience: ["buyer"],
      decisionStage: ["exploring", "defined-need", "qualified"],
      transactionType: ["rent", "buy"],
      neighborhood: ["manhattan"],
      topic: ["rent vs buy", "timeline", "liquidity", "risk"],
      authority: "core",
    },
  },
  {
    id: "seller-strategy-sell-vs-keep",
    title: "Sell vs Keep Guidance",
    content:
      "Sell versus keep should be evaluated through timeline, debt and carrying costs, rental viability, tax consequences, management tolerance, and alternative uses of capital. Holding a property is not automatically conservative if the asset or ownership structure creates drag or risk.",
    metadata: {
      audience: ["seller", "owner", "investor"],
      decisionStage: ["defined-need", "qualified"],
      transactionType: ["sell", "hold", "rent-current-home"],
      neighborhood: ["manhattan"],
      topic: ["sell vs keep", "rental strategy", "capital allocation"],
      authority: "core",
    },
  },
  {
    id: "building-intelligence-core",
    title: "Building Intelligence Principles",
    content:
      "Building intelligence means looking beyond the apartment itself. The advisor should consider service quality, building rules, reserve strength, layout efficiency, maintenance trajectory, resale friction, sponsor or board dynamics, and whether the building actually fits the client's brief.",
    metadata: {
      audience: ["buyer", "owner"],
      decisionStage: ["defined-need", "qualified", "call-ready"],
      transactionType: ["buy", "hold"],
      neighborhood: ["manhattan"],
      topic: ["building intelligence", "resale", "service", "rules"],
      authority: "core",
    },
  },
  {
    id: "neighborhood-fit-core",
    title: "Neighborhood Fit",
    content:
      "Neighborhood fit should be treated as a daily-life decision, not a branding exercise. The useful variables are commute, routine, schools, quiet versus energy, access, walkability, and whether the neighborhood supports the next phase of life.",
    metadata: {
      audience: ["buyer", "renter", "family"],
      decisionStage: ["exploring", "defined-need"],
      transactionType: ["buy", "rent"],
      neighborhood: ["manhattan"],
      topic: ["neighborhood", "commute", "lifestyle"],
      authority: "core",
    },
  },
  {
    id: "relocation-guidance",
    title: "Executive and Corporate Relocation",
    content:
      "Relocation decisions should start with how long the client expects to stay, work location, industry rhythm, privacy needs, and whether flexibility is worth more than immediate ownership. Buying too quickly in an unfamiliar market can be more expensive than renting first.",
    metadata: {
      audience: ["executive", "corporate", "physician", "finance"],
      decisionStage: ["exploring", "defined-need", "qualified"],
      transactionType: ["rent", "buy", "wait"],
      neighborhood: ["midtown", "downtown", "manhattan"],
      topic: ["relocation", "commute", "privacy", "flexibility"],
      authority: "core",
    },
  },
  {
    id: "seller-life-transition",
    title: "Divorce, Estate, and Life Transition Sales",
    content:
      "In divorce, estate, or emotionally heavy transitions, the recommendation should pace the transaction around readiness, risk, and practical constraints. The right move may be to wait, simplify, hold, or sell with a more controlled timeline instead of forcing immediate exposure.",
    metadata: {
      audience: ["seller", "family", "estate"],
      decisionStage: ["defined-need", "qualified"],
      transactionType: ["sell", "wait", "hold"],
      neighborhood: ["manhattan"],
      topic: ["divorce", "estate", "probate", "timing"],
      authority: "core",
    },
  },
  {
    id: "agent-kammer-boundaries",
    title: "Agent Kammer Services and Boundaries",
    content:
      "Agent Kammer is positioned as a real estate decision guide first, not a broker-first website. The sale or purchase is the outcome of a sound decision. The advisor can guide strategy, building intelligence, decision frameworks, and next steps, while remaining careful not to invent facts or overstate certainty.",
    metadata: {
      audience: ["all"],
      decisionStage: ["anonymous", "exploring", "defined-need"],
      transactionType: ["buy", "sell", "rent", "hold", "wait"],
      neighborhood: ["manhattan"],
      topic: ["brand positioning", "services", "boundaries"],
      authority: "core",
    },
  },
];

type RetrievalInput = {
  latestMessage: string;
  currentPage?: {
    path?: string;
    title?: string;
    topics?: string[];
    prerequisites?: string[];
    related?: string[];
  };
  profile: Record<string, string | null | undefined>;
  navigationHistory: string[];
};

function tokenize(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((token) => token.length > 2);
}

export function retrieveDecisionGuideKnowledge(input: RetrievalInput, limit = 5) {
  const queryTerms = new Set<string>([
    ...tokenize(input.latestMessage),
    ...tokenize(input.currentPage?.title ?? ""),
    ...(input.currentPage?.topics ?? []).flatMap(tokenize),
    ...Object.values(input.profile)
      .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
      .flatMap(tokenize),
    ...input.navigationHistory.flatMap(tokenize),
  ]);

  const scored = decisionGuideKnowledgeBase
    .map((doc) => {
      const haystack = [
        doc.title,
        doc.content,
        ...doc.metadata.audience,
        ...doc.metadata.decisionStage,
        ...doc.metadata.transactionType,
        ...doc.metadata.neighborhood,
        ...doc.metadata.topic,
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const term of Array.from(queryTerms)) {
        if (haystack.includes(term)) score += 1;
      }
      if (doc.metadata.authority === "core") score += 2;
      return { doc, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(3, Math.min(limit, 6)));

  return scored.map(({ doc, score }) => ({
    id: doc.id,
    title: doc.title,
    content: doc.content,
    metadata: doc.metadata,
    score,
  }));
}
