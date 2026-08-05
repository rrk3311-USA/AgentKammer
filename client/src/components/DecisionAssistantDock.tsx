import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  Landmark,
  MapPinned,
  Minimize2,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";
import { DECISION_ASSISTANT_OPEN_EVENT } from "@/lib/decision-assistant";
import { getPageContext } from "@/lib/knowledge-graph/page-context";
import { trackVisitorSignal } from "@/lib/visitor-signals";
import { resolveChatLanguage } from "@/data/site-language";
import {
  getPageEngagement,
  isColdConversation,
  type EngagementStarter,
} from "@/data/decision-guide-engagement";

const blueprintSegments = [
  { label: "Lifestyle", filled: true, icon: UsersRound },
  { label: "Location", filled: true, icon: MapPinned },
  { label: "Building", filled: true, icon: Building2 },
  { label: "Budget", filled: false, icon: Landmark },
  { label: "Timeline", filled: false, icon: CalendarClock },
  { label: "Trade-offs", filled: false, icon: SlidersHorizontal },
];

const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const phonePattern = /(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/;
const sessionStorageKey = "akDecisionAssistantSessionId";
const navigationMemoryKey = "akDecisionAssistantNavigation";
const dwellNudgeKey = "akDecisionGuideDwellNudges";
const DEFAULT_GREETING = getPageEngagement("/").greeting;

function DecisionGuideAvatar({ animated = false }: { animated?: boolean }) {
  return (
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-brass/45 bg-brand-ivory p-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_8px_rgba(42,52,71,0.22)]">
      <span
        className={
          animated
            ? "absolute inset-0 animate-command-breathe rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.5),transparent_42%,rgba(176,141,87,0.24))]"
            : "absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.5),transparent_42%,rgba(176,141,87,0.18))]"
        }
      />
      <img
        src="/images/decision-guide-raphi.png"
        alt="Raphi, your Guidance Advisor"
        className="relative z-10 h-full w-full rounded-full object-cover object-[50%_20%]"
      />
    </span>
  );
}

function GuidanceAdvisorLabel({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const guidanceClass = tone === "dark" ? "text-brand-ivory/72" : "text-brand-cocoa";
  const advisorClass = tone === "dark" ? "text-brand-brass" : "text-brand-navy";
  return (
    <span className="block text-[10px] uppercase tracking-[0.22em]">
      <span className={guidanceClass}>Guidance</span>{" "}
      <span className={advisorClass}>Advisor</span>
    </span>
  );
}

type Message = {
  role: "assistant" | "user";
  text: string;
};

type Answers = {
  situation?: string;
  desire?: string;
  constraints?: string;
  tradeOff?: string;
  timeline?: string;
  budget?: string;
  financingStatus?: string;
  industry?: string;
  household?: string;
  geography?: string;
  neighborhoods?: string;
  buildingPreferences?: string;
  dealBreakers?: string;
  decisionMakers?: string;
  confidenceReadiness?: string;
  buildingsViewed?: string;
  reportsViewed?: string;
  questionsAsked?: string;
  recommendationHistory?: string;
  email?: string;
  phone?: string;
};

type QuickAction = {
  label: string;
  response: string;
  path?: string;
  asksForEmail?: boolean;
};

type DecisionGuideAction = {
  type: "open_page" | "update_blueprint" | "send_recap" | "recommend_page" | "none";
  label: string;
  path: string | null;
  reason: string;
};

type DecisionGuideAiTurn = {
  reply: string;
  profile?: Partial<Answers>;
  actions?: DecisionGuideAction[];
  leadQualification?: {
    score?: number;
    quality?: string;
    summary?: string;
    missing?: string[];
  };
};

function profileKeys() {
  return [
    "situation",
    "desire",
    "constraints",
    "tradeOff",
    "timeline",
    "budget",
    "financingStatus",
    "industry",
    "household",
    "geography",
    "neighborhoods",
    "buildingPreferences",
    "dealBreakers",
    "decisionMakers",
    "confidenceReadiness",
    "buildingsViewed",
    "reportsViewed",
    "questionsAsked",
    "recommendationHistory",
    "email",
    "phone",
  ] as const;
}

function scoreLead(text: string) {
  const lower = text.toLowerCase();
  let score = 0;
  if (/(immediate|asap|urgent|soon|this month|next month|30 days|60 days|90 days|next 3|relocat|offer|accepted)/.test(lower)) score += 2;
  if (/(cash|pre.?approved|approved|financing|mortgage|budget|\$|million|m\b|mm\b)/.test(lower)) score += 1;
  if (/(condo|co-op|coop|building|neighborhood|tribeca|soho|chelsea|ues|uws|upper east|upper west|downtown|manhattan)/.test(lower)) score += 1;
  if (/(buy|purchase|sell|1031|investment|executive|family|downsize|upsize)/.test(lower)) score += 1;
  if (/(exploring|curious|someday|not sure|just looking|research)/.test(lower)) score -= 1;
  return score;
}

function classifyLead(score: number) {
  if (score >= 4) return "High-intent";
  if (score >= 2) return "Qualified";
  return "Exploratory";
}

function buildRecap(answers: Answers, score: number) {
  const checked = [
    answers.situation ? "Trigger/What changed" : null,
    answers.desire ? "Desire/What they want next" : null,
    answers.constraints ? "Constraints/What is limiting them" : null,
    answers.tradeOff ? "Trade-offs/Priorities" : null,
    answers.timeline ? "Timeline" : null,
    answers.budget ? "Budget" : null,
    answers.financingStatus ? "Financing status" : null,
    answers.industry ? "Industry" : null,
    answers.household ? "Household" : null,
    answers.geography ? "Geography" : null,
    answers.neighborhoods ? "Neighborhood preferences" : null,
    answers.buildingPreferences ? "Building preferences" : null,
    answers.dealBreakers ? "Deal breakers" : null,
    answers.decisionMakers ? "Decision-makers" : null,
    answers.confidenceReadiness ? "Confidence/readiness" : null,
  ].filter(Boolean);

  return [
    "Guidance Advisor recommendation request",
    "",
    `Visitor quality: ${classifyLead(score)}`,
    `Qualifier score: ${score}`,
    `Checked modules: ${checked.join(", ") || "Initial situation only"}`,
    "",
    `Situation: ${answers.situation || "Not provided"}`,
    `Desire: ${answers.desire || "Not provided"}`,
    `Constraints: ${answers.constraints || "Not provided"}`,
    `Trade-off / risk: ${answers.tradeOff || "Not provided"}`,
    `Timeline: ${answers.timeline || "Not provided"}`,
    `Budget: ${answers.budget || "Not provided"}`,
    `Financing status: ${answers.financingStatus || "Not provided"}`,
    `Industry: ${answers.industry || "Not provided"}`,
    `Household: ${answers.household || "Not provided"}`,
    `Geography: ${answers.geography || "Not provided"}`,
    `Neighborhood preferences: ${answers.neighborhoods || "Not provided"}`,
    `Building preferences: ${answers.buildingPreferences || "Not provided"}`,
    `Deal breakers: ${answers.dealBreakers || "Not provided"}`,
    `Decision-makers: ${answers.decisionMakers || "Not provided"}`,
    `Confidence/readiness: ${answers.confidenceReadiness || "Not provided"}`,
    `Buildings viewed: ${answers.buildingsViewed || "Not provided"}`,
    `Reports viewed: ${answers.reportsViewed || "Not provided"}`,
    `Questions asked: ${answers.questionsAsked || "Not provided"}`,
    `Recommendation history: ${answers.recommendationHistory || "Not provided"}`,
    `Contact email: ${answers.email || "Not provided"}`,
    `Contact phone: ${answers.phone || "Not provided"}`,
    "",
    "Recommended next step:",
    score >= 4
      ? "Prioritize fast follow-up. They gave strong timing/specificity signals; respond with a focused buyer/seller brief and ask for budget, target buildings, and availability."
      : score >= 2
        ? "Send a concise recap and invite a short advisory call. Clarify timing, budget, and building criteria."
        : "Keep nurturing. Send educational building intelligence and let them continue the diagnostic before pushing for a call.",
  ].join("\n");
}

function hasContact(answers: Answers) {
  return Boolean(answers.email || answers.phone);
}

function meaningfulProfileCount(answers: Answers) {
  return [
    answers.situation,
    answers.desire,
    answers.constraints,
    answers.tradeOff,
    answers.timeline,
    answers.budget,
    answers.financingStatus,
    answers.household,
    answers.geography,
    answers.neighborhoods,
    answers.buildingPreferences,
    answers.dealBreakers,
    answers.decisionMakers,
    answers.confidenceReadiness,
  ].filter(Boolean).length;
}

function shouldOfferContact(answers: Answers, score: number, userMessageCount = 0) {
  if (hasContact(answers)) return false;
  // Court first — only invite contact after a real conversation and clear signal.
  const depth = meaningfulProfileCount(answers);
  const hasEnoughRapport = userMessageCount >= 4 || depth >= 4;
  const hasStrongIntent = score >= 4 && depth >= 3;
  return hasEnoughRapport && (hasStrongIntent || depth >= 5);
}

function buildContactOffer(_answers: Answers, _score: number) {
  return "We've got a clearer picture now. If you'd like, I can send you a short note with what I'd recommend next — no pressure either way. What's the best email or mobile?";
}

function nextDiagnosticStep(answers: Answers): "situation" | "desire" | "constraints" | "tradeoff" {
  if (!answers.situation) return "situation";
  if (!answers.desire) return "desire";
  if (!answers.constraints) return "constraints";
  return "tradeoff";
}

function getSessionId() {
  if (typeof window === "undefined") return "server-session";
  const existing = window.localStorage.getItem(sessionStorageKey);
  if (existing) return existing;
  const next = `ak-${crypto.randomUUID()}`;
  window.localStorage.setItem(sessionStorageKey, next);
  return next;
}

function summarizeMemory(messages: Message[], answers: Answers, score: number) {
  return [
    `Decision Assistant memory: ${classifyLead(score)}`,
    answers.email ? `Email: ${answers.email}` : null,
    answers.situation ? `Trigger: ${answers.situation}` : null,
    answers.desire ? `Desire: ${answers.desire}` : null,
    answers.constraints ? `Constraints: ${answers.constraints}` : null,
    answers.tradeOff ? `Trade-off: ${answers.tradeOff}` : null,
    answers.timeline ? `Timeline: ${answers.timeline}` : null,
    answers.budget ? `Budget: ${answers.budget}` : null,
    answers.financingStatus ? `Financing status: ${answers.financingStatus}` : null,
    answers.industry ? `Industry: ${answers.industry}` : null,
    answers.household ? `Household: ${answers.household}` : null,
    answers.geography ? `Geography: ${answers.geography}` : null,
    answers.neighborhoods ? `Neighborhoods: ${answers.neighborhoods}` : null,
    answers.buildingPreferences ? `Building preferences: ${answers.buildingPreferences}` : null,
    answers.dealBreakers ? `Deal breakers: ${answers.dealBreakers}` : null,
    answers.decisionMakers ? `Decision-makers: ${answers.decisionMakers}` : null,
    answers.confidenceReadiness ? `Confidence/readiness: ${answers.confidenceReadiness}` : null,
    answers.recommendationHistory ? `Recommendation history: ${answers.recommendationHistory}` : null,
    `Message count: ${messages.length}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function transcript(messages: Message[]) {
  return messages.map((message) => `${message.role === "assistant" ? "Assistant" : "Visitor"}: ${message.text}`).join("\n");
}

function mergeConsecutiveMessages(messages: Message[]) {
  return messages.reduce<Message[]>((merged, message) => {
    const previous = merged[merged.length - 1];
    if (previous?.role === message.role) {
      previous.text = `${previous.text}\n\n${message.text}`;
      return merged;
    }
    merged.push({ ...message });
    return merged;
  }, []);
}

function mergeDefinedProfile(current: Answers, profile?: Partial<Answers>) {
  if (!profile) return current;
  const next = { ...current };
  profileKeys().forEach((key) => {
    const value = profile[key];
    if (typeof value === "string" && value.trim()) {
      next[key] = value.trim();
    }
  });
  return next;
}

function BlueprintProgressBar({
  completion,
  tone,
}: {
  completion: number;
  tone: "dark" | "light";
}) {
  const percent = Math.max(0, Math.min(100, (completion / blueprintSegments.length) * 100));
  const trackClass = tone === "dark" ? "bg-brand-ivory/16" : "bg-brand-navy/10";
  return (
    <span className={`ak-blueprint-main-progress ${trackClass}`} aria-label={`Decision Blueprint progress ${completion} of 6`}>
      <span className="ak-blueprint-main-progress-fill" style={{ width: `${percent}%` }} />
      <span className="ak-blueprint-main-progress-grid" aria-hidden>
        {blueprintSegments.map((segment) => (
          <span key={segment.label} />
        ))}
      </span>
    </span>
  );
}

function getTradeoffGuidance(answer: string) {
  const lower = answer.toLowerCase();
  if (/(flex|rent|temporary|short|not sure|explor|option|optional)/.test(lower)) {
    return "Every move involves trade-offs. I think we're starting to identify yours: flexibility may matter more than ownership right now. I would review Rent vs Buy before comparing buildings.";
  }
  if (/(own|long|equity|invest|resale|appreciat|asset)/.test(lower)) {
    return "Every move involves trade-offs. I think we're starting to identify yours: long-term ownership may matter more than flexibility. I would compare Condo vs Co-op before narrowing buildings.";
  }
  if (/(commute|school|space|layout|bedroom|family)/.test(lower)) {
    return "Every move involves trade-offs. I think we're starting to identify yours: daily life is the real constraint, not just the building. Let's clarify commute, space, schools, and the trade-offs you will not accept.";
  }
  if (/(price|budget|financ|mortgage|cash|cost|monthly)/.test(lower)) {
    return "Every move involves trade-offs. I think we're starting to identify yours: budget may be the constraint that shapes the rest of the decision. It affects financing, carrying costs, building type, and timeline risk.";
  }
  return "Every move involves trade-offs. I think we're starting to identify yours. I would use that to decide which pages and buildings are worth your attention, and which ones to skip.";
}

function getSituationGuidance(answer: string, score: number) {
  const lower = answer.toLowerCase();
  if (/(pregnan|baby|child|kid|family|more space|bedroom|nursery|first child)/.test(lower)) {
    return {
      path: "/situations/school-district-planning-nyc",
      messages: [
        "Congratulations. I would not start with listings yet. A first child usually changes daily rhythm more than bedroom count, so I would first separate space, commute, and school timing. If we pick one starting point, I would begin with daily routine.",
      ],
    };
  }
  if (/(company transferred|transferred|relocat|moving|move.*manhattan|new job|job)/.test(lower)) {
    return {
      path: "/situations/executive-relocation-nyc",
      messages: [
        "Thanks. For a Manhattan relocation, I would lead with timeline because it decides whether renting or buying deserves more weight. Commute comes next, then building fit. If this is under three years, flexibility probably matters more than ownership.",
      ],
    };
  }
  if (/(divorce|separat)/.test(lower)) {
    return {
      path: "/situations/divorce-property-sales-nyc",
      messages: [
        "I'm sorry you're dealing with that. I would not start with listings. The first decision is usually whether timing or ownership risk is driving the move. I would start by clarifying whether keeping the home is realistic before comparing places.",
      ],
    };
  }
  if (/(should.*sell|should.*move|not sure|stay|keep|move or|sell or|just explor|exploring)/.test(lower)) {
    return {
      path: "/buyer-advisory",
      messages: [
        "That is the right starting point. You do not need to know whether moving is the answer yet. I would compare staying, renewing, renovating, renting, and moving before looking at buildings. The recommendation may be to do nothing for now, and that can be the right answer.",
      ],
    };
  }
  return {
    messages: [
      score >= 4
        ? "I can already feel the clock in that. Before we chase buildings, let's make sure the decision itself is right — timing first, then the one thing that could break the move. No rush to qualify anything; just clarity."
        : "That already tells me something. Most people in your seat feel a little scattered here — I'd start by naming the trigger, then the real constraint. Once those settle, neighborhoods get much easier.",
    ],
  };
}

function getUsefulActions(answers: Answers): QuickAction[] {
  const context = answers.tradeOff || answers.constraints || answers.desire || answers.situation || "what you've shared";
  const actions: QuickAction[] = [
    {
      label: "Read: Rent vs Buy",
      path: "/buyer-advisory",
      response: "I would start with Rent vs Buy because it separates flexibility from ownership. That should come before comparing buildings.",
    },
    {
      label: "Compare: Condo vs Co-op",
      path: "/building-reports",
      response: "Condo vs Co-op matters because it changes approval risk, financing, renovation control, resale, and how much flexibility you keep.",
    },
    {
      label: "Constraints",
      response: "What would disappoint you most if the decision went wrong: a long commute, high monthly cost, too little space, weak building quality, or losing flexibility?",
    },
    {
      label: "Recommendation so far",
      response: `Recommendation so far: use "${context}" as the first filter. Next, compare whether anything should change at all before looking at listings.`,
    },
  ];

  if (answers.constraints || answers.tradeOff) {
    actions.push({
      label: "Send a note",
      asksForEmail: true,
      response:
        "If you'd like, I can send a short note with what we've figured out and what I'd check next — entirely optional. What's the best email or mobile?",
    });
  }

  return actions;
}

export function DecisionAssistantDock() {
  const [location, setLocation] = useLocation();
  const [expanded, setExpanded] = useState(false);
  const guideOpenedRef = useRef(false);
  const lastPageHelperRef = useRef<string | null>(null);
  const [input, setInput] = useState("");
  const [sessionId] = useState(getSessionId);
  const [step, setStep] = useState<"situation" | "desire" | "constraints" | "tradeoff" | "email" | "sent">("situation");
  const [answers, setAnswers] = useState<Answers>({});
  const [leadScore, setLeadScore] = useState(0);
  const [leadQualification, setLeadQualification] = useState<DecisionGuideAiTurn["leadQualification"] | null>(null);
  const [sending, setSending] = useState(false);
  const [memoryLoaded, setMemoryLoaded] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  const [dwellNudge, setDwellNudge] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: DEFAULT_GREETING,
    },
  ]);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const engagement = getPageEngagement(location);
  const openingPrompts = engagement.prompts;
  const starterPrompts = engagement.starters;
  const cold = isColdConversation(messages);

  useEffect(() => {
    const open = () => {
      setExpanded(true);
      setDwellNudge(null);
    };
    window.addEventListener(DECISION_ASSISTANT_OPEN_EVENT, open);
    return () => window.removeEventListener(DECISION_ASSISTANT_OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (!expanded || guideOpenedRef.current) return;
    guideOpenedRef.current = true;
    trackVisitorSignal("decision_guide_open", location);
  }, [expanded, location]);

  useEffect(() => {
    const title = getPageContext(location).title;
    try {
      const current = JSON.parse(window.localStorage.getItem(navigationMemoryKey) || "[]") as string[];
      const next = [title, ...current.filter((item) => item !== title)].slice(0, 8);
      window.localStorage.setItem(navigationMemoryKey, JSON.stringify(next));
      setAnswers((answersNow) => {
        const viewed = next.join(", ");
        const isReport = /report|brief|intelligence/i.test(title);
        return {
          ...answersNow,
          reportsViewed: isReport ? viewed : answersNow.reportsViewed,
          buildingsViewed: /building/i.test(title) ? viewed : answersNow.buildingsViewed,
        };
      });
    } catch {
      window.localStorage.setItem(navigationMemoryKey, JSON.stringify([title]));
    }
  }, [location]);

  // Page-aware greeting when the visitor moves and has not started chatting yet.
  useEffect(() => {
    if (!memoryLoaded) return;
    const page = getPageEngagement(location);
    if (lastPageHelperRef.current === location) return;

    setMessages((current) => {
      if (!isColdConversation(current)) {
        lastPageHelperRef.current = location;
        return current;
      }
      const onlyAssistantGreeting =
        current.length <= 1 && current[0]?.role === "assistant";
      if (!onlyAssistantGreeting) {
        lastPageHelperRef.current = location;
        return current;
      }
      lastPageHelperRef.current = location;
      return [{ role: "assistant", text: page.greeting }];
    });
    setPromptIndex(0);
    setDwellNudge(null);
  }, [location, memoryLoaded]);

  // Soft dwell nudge — engage visitors who linger without opening chat.
  useEffect(() => {
    if (expanded || !memoryLoaded) return;
    const timer = window.setTimeout(() => {
      try {
        const nudged = JSON.parse(window.sessionStorage.getItem(dwellNudgeKey) || "[]") as string[];
        if (nudged.includes(location) || nudged.length >= 4) return;
        const tip = getPageEngagement(location).nudge;
        setDwellNudge(tip);
        window.sessionStorage.setItem(dwellNudgeKey, JSON.stringify([...nudged, location].slice(0, 8)));
        trackVisitorSignal("decision_guide_dwell_nudge", location);
      } catch {
        setDwellNudge(getPageEngagement(location).nudge);
      }
    }, 14000);
    return () => window.clearTimeout(timer);
  }, [location, expanded, memoryLoaded]);

  useEffect(() => {
    let cancelled = false;
    async function loadMemory() {
      try {
        const response = await fetch(`/api/decision-assistant/conversation/${encodeURIComponent(sessionId)}`, {
          credentials: "include",
        });
        if (!response.ok) return;
        const memory = await response.json();
        if (!memory || cancelled) return;

        const savedMessages = JSON.parse(memory.messages || "[]") as Message[];
        if (Array.isArray(savedMessages) && savedMessages.length > 0) {
          setMessages(savedMessages);
        }
        if (typeof memory.leadScore === "number") {
          setLeadScore(memory.leadScore);
        }
        if (memory.summary) {
          try {
            const summary = JSON.parse(memory.summary);
            if (summary?.profile && typeof summary.profile === "object") {
              setAnswers((current) => mergeDefinedProfile(current, summary.profile));
            }
          } catch {
            // Older saved summaries were plain text.
          }
        }
        if (memory.leadEmail) {
          setAnswers((current) => ({ ...current, email: memory.leadEmail }));
        }
        if (memory.leadPhone) {
          setAnswers((current) => ({ ...current, phone: memory.leadPhone }));
        }
      } catch {
        // Memory is additive; if it fails, the assistant should still work.
      } finally {
        if (!cancelled) setMemoryLoaded(true);
      }
    }

    void loadMemory();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, expanded]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPromptIndex((current) => (current + 1) % Math.max(openingPrompts.length, 1));
    }, 3600);
    return () => window.clearInterval(interval);
  }, [openingPrompts.length, location]);

  useEffect(() => {
    if (!memoryLoaded) return;
    const timeout = window.setTimeout(() => {
      void fetch("/api/decision-assistant/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          sessionId,
          messages,
          leadEmail: answers.email,
          leadPhone: answers.phone,
          categoryInterest: answers.desire || answers.situation,
          leadScore,
          summary: JSON.stringify({
            profile: answers,
            leadSummary: summarizeMemory(messages, answers, leadScore),
            pageContext: getPageContext(location),
            navigationHistory: (() => {
              try {
                return JSON.parse(window.localStorage.getItem(navigationMemoryKey) || "[]");
              } catch {
                return [];
              }
            })(),
            updatedAt: new Date().toISOString(),
          }),
        }),
      }).catch(() => {
        // Keep the chat usable even if memory persistence is temporarily unavailable.
      });
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, [answers, leadScore, memoryLoaded, messages, sessionId, location]);

  async function sendRecap(nextAnswers: Answers, nextScore: number) {
    if (!nextAnswers.email && !nextAnswers.phone) return;
    setSending(true);
    try {
      const recap = buildRecap(nextAnswers, nextScore);
      const fullSummary = `${recap}\n\nConversation transcript:\n${transcript(messages)}`;
      const leadResponse = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: "Guidance Advisor Visitor",
          email: nextAnswers.email,
          phone: nextAnswers.phone,
          timeline: nextAnswers.constraints || nextAnswers.situation,
          financing: nextAnswers.constraints,
          motivation: nextAnswers.situation,
          communicationStyle: `Guidance Advisor - ${classifyLead(nextScore)}`,
          conversationSummary: fullSummary,
          leadScore: nextScore,
          marketInterest: nextAnswers.desire || nextAnswers.constraints,
          leadSource: "decision_assistant",
          decisionProfile: nextAnswers,
          leadQualification,
          transcript: transcript(messages),
        }),
      });
      if (!leadResponse.ok) {
        const errorBody = await leadResponse.json().catch(() => null);
        const message = typeof errorBody?.error === "string" ? errorBody.error : "Lead handoff failed";
        throw new Error(message);
      }

      // Hub brief only when already verified (cookie session) — never auto-claim by email
      let hubSaved = false;
      try {
        const briefResponse = await fetch("/api/account/briefs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: nextAnswers.email,
            title: "Decision recommendation brief",
            body: fullSummary,
            source: "recap",
            score: nextScore,
            assistantSessionId: sessionId,
            decisionMap: {
              situation: nextAnswers.situation || null,
              desire: nextAnswers.desire || null,
              constraints: nextAnswers.constraints || null,
              tradeOff: nextAnswers.tradeOff || null,
              recommendation: leadQualification?.summary || null,
            },
          }),
        });
        hubSaved = briefResponse.ok;
      } catch {
        /* hub save is secondary to lead handoff */
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: nextAnswers.email
            ? hubSaved
              ? "Saved and submitted. Your recommendation brief is in your Decision Hub — verify email anytime to reopen it on another device."
              : "Saved and submitted to our team. To keep this in your Decision Hub, verify your email with a one-time code and Resume My Decision anytime."
            : "Got it. I saved the decision profile and I’ll use that context when we touch base.",
        },
      ]);
      setStep("sent");
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "I kept the recommendation here, but the email handoff did not complete. You can keep going.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function handleStarter(prompt: EngagementStarter) {
    const nextScore = leadScore + scoreLead(prompt.text);
    const nextAnswers = { ...answers, situation: prompt.text };
    const nextMessages: Message[] = [...messages, { role: "user", text: prompt.text }];
    const guidance = getSituationGuidance(prompt.text, nextScore);
    trackVisitorSignal("decision_guide_message", prompt.text.slice(0, 120));
    setDwellNudge(null);

    setLocation(guidance.path || prompt.path || location);
    guidance.messages.forEach((text) => nextMessages.push({ role: "assistant", text }));

    setExpanded(true);
    setQuickActions([]);
    setMessages(nextMessages);
    setAnswers(nextAnswers);
    setLeadScore(nextScore);
    setStep(shouldOfferContact(nextAnswers, nextScore, nextMessages.filter((m) => m.role === "user").length) ? "email" : "desire");
  }

  function handleQuickAction(action: QuickAction) {
    if (action.path) setLocation(action.path);
    setExpanded(true);
    setMessages((current) => [...current, { role: "assistant", text: action.response }]);
    if (action.asksForEmail) {
      setStep("email");
      setQuickActions([]);
    }
  }

  async function requestAiGuideTurn(
    latestMessage: string,
    profile: Answers,
    score: number,
    visibleMessages: Message[],
  ): Promise<DecisionGuideAiTurn | null> {
    try {
      const response = await fetch("/api/decision-guide/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          sessionId,
          latestMessage,
          messages: visibleMessages,
          profile,
          leadScore: score,
          pageContext: getPageContext(location),
          visitorState: {
            preferredLanguage: resolveChatLanguage() || undefined,
            navigationHistory: (() => {
              try {
                return JSON.parse(window.localStorage.getItem(navigationMemoryKey) || "[]");
              } catch {
                return [];
              }
            })(),
          },
        }),
      });

      if (!response.ok) return null;
      return (await response.json()) as DecisionGuideAiTurn;
    } catch {
      return null;
    }
  }

  function applyAiGuideTurn(
    aiTurn: DecisionGuideAiTurn | null,
    baseMessages: Message[],
    fallbackAnswers: Answers,
    fallbackScore: number,
  ) {
    if (!aiTurn?.reply) return;
    const mergedAnswers = mergeDefinedProfile(fallbackAnswers, aiTurn.profile);
    const nextScore = typeof aiTurn.leadQualification?.score === "number" ? Math.round(aiTurn.leadQualification.score) : fallbackScore;
    const replyMessages: Message[] = [...baseMessages, { role: "assistant", text: aiTurn.reply }];
    const userTurns = replyMessages.filter((message) => message.role === "user").length;
    const aiAskedForContact = /email|phone|mobile|contact|send|recap|touch base/i.test(aiTurn.reply);

    if (shouldOfferContact(mergedAnswers, nextScore, userTurns) && !aiAskedForContact) {
      replyMessages.push({ role: "assistant", text: buildContactOffer(mergedAnswers, nextScore) });
    }

    setMessages(replyMessages);
    setAnswers(mergedAnswers);
    setLeadScore(nextScore);
    setLeadQualification(aiTurn.leadQualification ?? null);
    setQuickActions([]);

    const openAction = aiTurn.actions?.find((action) => action.type === "open_page" && action.path);
    if (openAction?.path) {
      setLocation(openAction.path);
    }

    const shouldSendRecap = aiTurn.actions?.some((action) => action.type === "send_recap");
    if (shouldSendRecap && hasContact(mergedAnswers)) {
      void sendRecap(mergedAnswers, nextScore);
    } else if (shouldSendRecap && shouldOfferContact(mergedAnswers, nextScore, userTurns)) {
      setStep("email");
    } else if (shouldOfferContact(mergedAnswers, nextScore, userTurns)) {
      setStep("email");
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const answer = input.trim();
    if (!answer || sending) return;
    setExpanded(true);

    const foundEmail = answer.match(emailPattern)?.[0];
    const foundPhone = answer.match(phonePattern)?.[0];
    const baseMessages: Message[] = [...messages, { role: "user", text: answer }];
    const nextMessages: Message[] = [...baseMessages];
    let nextAnswers = { ...answers };
    let nextStep = step;
    let nextScore = leadScore + scoreLead(answer);
    const conversationStep = step === "email" ? nextDiagnosticStep(nextAnswers) : step;

    if (foundEmail || foundPhone) {
      nextAnswers = { ...nextAnswers, email: foundEmail || nextAnswers.email, phone: foundPhone || nextAnswers.phone };
      nextMessages.push({
        role: "assistant",
        text: foundEmail
          ? "Got it. I’ll send the recommendation with the relevant brief, the profile items we have so far, and the next best step."
          : "Got it. I saved the decision profile with what we have so far. I’ll use this context when we touch base.",
      });
      setMessages(nextMessages);
      setAnswers(nextAnswers);
      setLeadScore(nextScore);
      setQuickActions([]);
      setInput("");
      void sendRecap(nextAnswers, nextScore);
      return;
    }

    if (conversationStep === "situation") {
      nextAnswers = { ...nextAnswers, situation: answer };
      const guidance = getSituationGuidance(answer, nextScore);
      if (guidance.path) setLocation(guidance.path);
      guidance.messages.forEach((text) => nextMessages.push({ role: "assistant", text }));
      nextMessages.push({
        role: "assistant",
        text: "My next move is not to add search filters. It is to identify the outcome you want the housing decision to produce. What would a better result give you: more stability, more space, shorter routine, lower risk, or more flexibility?",
      });
      nextStep = "desire";
    } else if (conversationStep === "desire") {
      nextAnswers = { ...nextAnswers, desire: answer };
      nextMessages.push({
        role: "assistant",
        text: "That already helps. I'd treat that as the success condition. When you're ready, we can look at what usually blocks it — timing, budget, building rules, schools, or flexibility. No rush; which of those feels closest?",
      });
      nextStep = "constraints";
    } else if (conversationStep === "constraints") {
      nextAnswers = { ...nextAnswers, constraints: answer };
      nextMessages.push({
        role: "assistant",
        text: "Good — that constraint is the real filter. If everything can't fit, what should win first: size, location, building quality, flexibility, cost control, or long-term value?",
      });
      nextStep = "tradeoff";
    } else if (conversationStep === "tradeoff") {
      nextAnswers = { ...nextAnswers, tradeOff: answer };
      nextMessages.push({
        role: "assistant",
        text: getTradeoffGuidance(answer),
      });
      nextMessages.push({
        role: "assistant",
        text: "I'd read the relevant brief or compare ownership options before any tours. We're deciding what to do — not collecting listings for sport.",
      });
      nextStep = "tradeoff";
    } else {
      nextMessages.push({
        role: "assistant",
        text: "Keep telling me what matters. I'll stay with you and keep sharpening the decision — no forms, no rush. From what you've shared, I'd go next toward the biggest unresolved tension.",
      });
    }

    const userTurns = nextMessages.filter((message) => message.role === "user").length;
    if (shouldOfferContact(nextAnswers, nextScore, userTurns)) {
      nextMessages.push({
        role: "assistant",
        text: buildContactOffer(nextAnswers, nextScore),
      });
      nextStep = "email";
    }

    setMessages(nextMessages);
    setAnswers(nextAnswers);
    setLeadScore(nextScore);
    setStep(nextStep);
    setQuickActions([]);
    setInput("");
    void requestAiGuideTurn(answer, nextAnswers, nextScore, baseMessages).then((aiTurn) => {
      applyAiGuideTurn(aiTurn, baseMessages, nextAnswers, nextScore);
    });
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  };

  const completedSegments = {
    Lifestyle: Boolean(answers.situation),
    Location: Boolean(answers.desire),
    Building: Boolean(answers.desire || answers.constraints),
    Budget: Boolean(answers.constraints && leadScore >= 2),
    Timeline: Boolean(answers.constraints),
    "Trade-offs": Boolean(answers.tradeOff),
  };
  const blueprintCompletion = blueprintSegments.filter((segment) => completedSegments[segment.label as keyof typeof completedSegments]).length;
  const displayMessages = mergeConsecutiveMessages(messages);
  const recentMessages = cold ? displayMessages.slice(-3) : displayMessages.slice(-2);
  const renderCompactBlueprintProgress = (tone: "dark" | "light") => (
    <BlueprintProgressBar completion={blueprintCompletion} tone={tone} />
  );

  if (!expanded) {
    return (
      <aside
        id="decision-assistant"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-brass/35 bg-brand-midnight px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-brand-ivory shadow-[0_-18px_38px_rgba(32,39,53,0.28)] md:px-6"
        aria-label="Guidance Advisor"
      >
        {dwellNudge ? (
          <button
            type="button"
            onClick={() => {
              setDwellNudge(null);
              setExpanded(true);
            }}
            className="relative mx-auto mb-3 flex w-full max-w-site items-start gap-3 border border-brand-brass/40 bg-brand-navy/95 px-3.5 py-2.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-colors hover:border-brand-brass"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-brand-brass">On this page</span>
              <span className="mt-1 block text-sm leading-5 text-brand-ivory">{dwellNudge}</span>
            </span>
            <span className="shrink-0 self-center text-[10px] uppercase tracking-[0.14em] text-brand-brass">Ask</span>
            <span
              className="pointer-events-none absolute -bottom-[5px] left-7 h-2.5 w-2.5 rotate-45 border-b border-r border-brand-brass/40 bg-brand-navy/95"
              aria-hidden
            />
          </button>
        ) : null}
        <div className="mx-auto grid max-w-site gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center">
          <div className="grid min-w-0 gap-2">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setDwellNudge(null);
                  setExpanded(true);
                }}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                <DecisionGuideAvatar />
                <span className="min-w-0">
                  <GuidanceAdvisorLabel tone="dark" />
                  <span className="mt-0.5 block truncate text-sm font-medium text-brand-ivory">{engagement.headline}</span>
                </span>
              </button>
              <div className="flex shrink-0 items-center gap-2 lg:hidden">
                <p className="font-mono text-[10px] text-brand-ivory/58">{blueprintCompletion}/6</p>
                <button
                  type="button"
                  onClick={() => {
                    setDwellNudge(null);
                    setExpanded(true);
                  }}
                  className="border border-brand-ivory/16 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-brand-ivory/78 transition-colors hover:border-brand-brass hover:text-brand-ivory"
                >
                  Open
                </button>
              </div>
            </div>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:hidden">
              <span className="text-[10px] uppercase tracking-[0.16em] text-brand-brass">Progress</span>
              {renderCompactBlueprintProgress("dark")}
            </div>
          </div>
          <div className="hidden min-w-0 sm:block" aria-label="Decision Blueprint modules">
            <div className="flex min-w-0 items-center gap-3">
              <p className="hidden shrink-0 font-mono text-[10px] text-brand-ivory/58 lg:block">{blueprintCompletion}/6</p>
              <div className="min-w-0 flex-1">
                <BlueprintProgressBar completion={blueprintCompletion} tone="dark" />
              </div>
            </div>
            <div className="mt-2 hidden grid-cols-6 gap-x-2 gap-y-1 xl:grid">
              {blueprintSegments.map((segment) => (
                <span key={segment.label} className="truncate text-[10px] uppercase tracking-[0.1em] text-brand-ivory/72">
                  {segment.label}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-brand-ivory/64 xl:hidden">
              Six-part decision progress
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2">
            <label className="sr-only" htmlFor="decision-guide-compact-input">
              Tell the Guidance Advisor what is changing
            </label>
            <input
              id="decision-guide-compact-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={openingPrompts[promptIndex % openingPrompts.length]}
              onFocus={() => {
                setDwellNudge(null);
                setExpanded(true);
              }}
              className="h-11 min-w-0 border border-brand-ivory/16 bg-brand-ivory/8 px-3 text-sm text-brand-brass caret-brand-brass outline-none transition-colors placeholder:text-brand-brass/55 focus:border-brand-brass focus:bg-brand-ivory"
            />
            <button
              type="submit"
              disabled={sending}
              className="inline-flex h-11 w-12 items-center justify-center border border-brand-ivory/18 bg-brand-navy-secondary text-brand-ivory transition-colors hover:border-brand-brass disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:px-4"
            >
              <span className="hidden sm:inline">Send</span>
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </form>
        </div>
      </aside>
    );
  }

  return (
    <aside
      id="decision-assistant"
      className={
        expanded
          ? "fixed inset-x-0 bottom-0 z-40 max-h-[58dvh] w-full max-w-[100vw] overflow-hidden border-t border-brand-navy/18 bg-brand-ivory p-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_42px_rgba(42,52,71,0.18)] md:inset-x-auto md:bottom-6 md:right-6 md:max-h-[min(38rem,calc(100dvh-8rem))] md:min-w-[24rem] md:w-[min(30rem,34vw)] md:max-w-[42rem] md:resize-x md:overflow-auto md:border md:p-3"
          : "fixed inset-x-0 bottom-0 z-40 border-t border-brand-brass/35 bg-brand-midnight px-3 py-3 text-brand-ivory shadow-[0_-18px_38px_rgba(32,39,53,0.28)] md:px-6"
      }
      aria-label="Guidance Advisor"
    >
      <div className="mx-auto grid w-full max-w-full gap-2 overflow-hidden md:max-w-site">
        <div className={expanded ? "grid min-w-0 gap-2 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center md:grid-cols-1" : "grid min-w-0 gap-3 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center"}>
          <div className="flex min-w-0 items-center gap-3">
            <DecisionGuideAvatar animated={expanded} />
            <div className="min-w-0">
              <GuidanceAdvisorLabel tone="light" />
              <p className="text-sm font-medium text-brand-navy">{engagement.headline}</p>
            </div>
            {expanded ? (
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="ml-auto flex h-9 w-9 items-center justify-center border border-brand-border bg-white text-brand-graphite transition-colors hover:text-brand-navy"
                aria-label="Minimize Guidance Advisor"
              >
                <Minimize2 className="h-4 w-4" strokeWidth={1.5} />
              </button>
            ) : null}
          </div>
          {expanded ? (
            <div className="grid gap-1.5 sm:hidden">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-brand-brass">Progress</span>
                <span className="font-mono text-[10px] text-brand-graphite">{blueprintCompletion}/6</span>
              </div>
              {renderCompactBlueprintProgress("light")}
            </div>
          ) : null}
          <div className="hidden border border-brand-border bg-white p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_1px_0_rgba(42,52,71,0.05)] sm:block" aria-label="Decision Blueprint modules">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[9px] uppercase tracking-[0.2em] text-brand-brass">Decision Progress</p>
              <p className="font-mono text-[10px] text-brand-graphite">{blueprintCompletion}/6</p>
            </div>
            <div className="mt-2">
              <BlueprintProgressBar completion={blueprintCompletion} tone="light" />
            </div>
            {expanded ? (
              <div className="mt-2 grid grid-cols-3 gap-x-3 gap-y-1 md:grid-cols-6">
                {blueprintSegments.map((segment) => (
                  <span
                    key={segment.label}
                    className={
                      completedSegments[segment.label as keyof typeof completedSegments]
                        ? "truncate text-[9px] uppercase tracking-[0.1em] text-brand-navy"
                        : "truncate text-[9px] uppercase tracking-[0.1em] text-brand-graphite/52"
                    }
                  >
                    {segment.label}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 lg:grid-cols-6">
                {blueprintSegments.map((segment) => (
                  <span key={segment.label} className="text-[10px] uppercase tracking-[0.13em] text-brand-graphite">
                    {segment.label}
                  </span>
                ))}
              </div>
            )}
          </div>
          {!expanded ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="group grid border border-brand-navy/18 bg-brand-ivory px-5 py-3 text-left transition-colors hover:border-brand-brass/55 hover:bg-brand-surface md:min-w-[14rem]"
            >
              <span className="text-[10px] uppercase tracking-[0.24em] text-brand-brass">Continue</span>
              <span className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-brand-navy">
                Continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </span>
            </button>
          ) : null}
        </div>
        {expanded ? (
          <div className="min-w-0 max-w-full overflow-hidden border-t border-brand-border pt-2">
            <div ref={transcriptRef} className="max-h-[24dvh] max-w-full space-y-1.5 overflow-y-auto overflow-x-hidden pr-1 md:max-h-[17rem]">
              {recentMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "assistant"
                      ? "mr-2 max-w-full overflow-hidden border border-brand-navy bg-brand-navy p-2.5 text-brand-ivory md:mr-5"
                      : "ml-2 max-w-full overflow-hidden border border-brand-border bg-white p-2.5 text-brand-navy md:ml-5"
                  }
                >
                  <p
                    className={
                      message.role === "assistant"
                        ? "text-[9px] uppercase tracking-[0.16em] text-brand-brass"
                        : "text-[9px] uppercase tracking-[0.16em] text-brand-cocoa"
                    }
                  >
                    {message.role === "assistant" ? "Guidance Advisor" : "You"}
                  </p>
                  <p className="mt-1.5 whitespace-pre-line break-words text-sm leading-5">{message.text}</p>
                </div>
              ))}
            </div>
            {cold && step !== "sent" ? (
              <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Quick starters">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    type="button"
                    onClick={() => handleStarter(prompt)}
                    className="border border-brand-border bg-white px-2.5 py-1.5 text-[11px] text-brand-navy transition-colors hover:border-brand-navy"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            ) : null}
            {quickActions.length > 0 && step !== "sent" ? (
              <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Suggested actions">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => {
                      if (action.path) setLocation(action.path);
                      setInput(action.response);
                      setExpanded(true);
                    }}
                    className="border border-brand-brass/35 bg-brand-surface px-2.5 py-1.5 text-[11px] text-brand-navy transition-colors hover:border-brand-brass"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            ) : null}
            {step !== "sent" ? (
              <>
                <form onSubmit={handleSubmit} className="mt-2 grid w-full min-w-0 max-w-full grid-cols-[minmax(0,1fr)_auto] gap-2">
                  <label className="sr-only" htmlFor="decision-assistant-input">
                    Answer the Guidance Advisor
                  </label>
                  <textarea
                    id="decision-assistant-input"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder={step === "email" ? "Email or mobile for the recap..." : openingPrompts[promptIndex % openingPrompts.length]}
                    rows={1}
                    className="min-h-10 w-full min-w-0 resize-none border border-brand-border bg-white px-3 py-2 text-sm text-brand-navy outline-none transition-colors placeholder:text-brand-graphite/55 focus:border-brand-brass md:min-h-11"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex h-10 w-12 shrink-0 items-center justify-center gap-2 border border-brand-navy bg-brand-navy text-[11px] uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:bg-brand-navy-secondary disabled:cursor-wait disabled:opacity-70 md:h-11 md:w-auto md:px-4"
                  >
                    <span className="hidden md:inline">{sending ? "Sending" : "Send"}</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </form>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
