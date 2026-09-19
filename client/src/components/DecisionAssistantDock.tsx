import { CSSProperties, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowRight,
  X,
} from "lucide-react";
import {
  DECISION_ASSISTANT_NUDGE_CLEAR_EVENT,
  DECISION_ASSISTANT_NUDGE_EVENT,
  DECISION_ASSISTANT_OPEN_EVENT,
  clearDecisionAssistantNudge,
  nudgeDecisionAssistant,
} from "@/lib/decision-assistant";
import {
  buildContactOffer,
  hasContact,
  replyAsksForContact,
  shouldOfferContact,
} from "@/lib/decision-contact";
import { getPageContext } from "@/lib/knowledge-graph/page-context";
import { trackVisitorSignal } from "@/lib/visitor-signals";
import { resolveChatLanguage } from "@/data/site-language";
import {
  getPageEngagement,
  isColdConversation,
  type EngagementStarter,
} from "@/data/decision-guide-engagement";

const blueprintSegments = [
  { label: "Lifestyle" },
  { label: "Location" },
  { label: "Building" },
  { label: "Financial" },
  { label: "Timeline" },
  { label: "Trade-offs" },
];

const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const phonePattern = /(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/;
const sessionStorageKey = "akDecisionAssistantSessionId";
const navigationMemoryKey = "akDecisionAssistantNavigation";
const dwellNudgeKey = "akDecisionGuideDwellNudges";
const DEFAULT_GREETING = getPageEngagement("/").greeting;

function GuidanceAdvisorFace({ size = "sheet" }: { size?: "sheet" | "chip" }) {
  return (
    <span className={size === "chip" ? "ak-guidance-face is-chip" : "ak-guidance-face"}>
      <img
        src="/images/decision-guide-raphi.png"
        alt="Raphi, your Guidance Advisor"
        className="ak-guidance-face-photo"
      />
    </span>
  );
}

function GuidanceStarProgress({ completion }: { completion: number }) {
  const ratio = Math.max(0, Math.min(1, completion / blueprintSegments.length));
  const specks = completion === 0 ? 1 : Math.min(completion + 1, 6);
  return (
    <span
      className="ak-guidance-star"
      style={{ "--ak-star": String(Math.max(0.1, ratio)) } as CSSProperties}
      aria-label={`Guidance progress ${completion} of 6`}
    >
      <span className="ak-guidance-star-wake" aria-hidden />
      <span className="ak-guidance-star-head" aria-hidden />
      {Array.from({ length: specks }, (_, index) => (
        <span
          key={index}
          className="ak-guidance-star-speck"
          style={{ "--ak-speck": String(index) } as CSSProperties}
          aria-hidden
        />
      ))}
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
      path: "/situations/new-baby-growing-family-nyc",
      messages: [
        "Congratulations. I would not start with listings yet. A growing family usually changes daily rhythm more than bedroom count, so I would first separate space, commute, and school timing. If we pick one starting point, I would begin with Growing Family.",
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
        ? "I can already feel the clock in that. Before we chase buildings, let's make sure the decision itself is right. Timing first, then the one thing that could break the move. No rush to qualify anything. Just clarity."
        : "That already tells me something. Most people in your seat feel a little scattered here. I would start by naming the trigger, then the real constraint. Once those settle, neighborhoods get much easier.",
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
        "If you want this waiting for you, I can save a short note of what we figured out and what I would check next. Entirely optional. What email or mobile should I use?",
    });
  }

  return actions;
}

export function DecisionAssistantDock(_props?: { variant?: "embedded" | "dock" }) {
  const [location, setLocation] = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [nudge, setNudge] = useState<string | null>(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const sheetDrag = useRef<{ y: number } | null>(null);
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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: DEFAULT_GREETING,
    },
  ]);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const engagement = getPageEngagement(location);
  const openingPrompts = engagement.prompts;
  const starterPrompts = engagement.starters;
  const cold = isColdConversation(messages);

  useEffect(() => {
    const open = () => {
      setExpanded(true);
      setNudge(null);
      clearDecisionAssistantNudge();
      window.setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 280);
    };
    window.addEventListener(DECISION_ASSISTANT_OPEN_EVENT, open);
    return () => window.removeEventListener(DECISION_ASSISTANT_OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    const onNudge = (event: Event) => {
      const text = (event as CustomEvent<{ text?: string }>).detail?.text?.trim();
      if (text) setNudge(text);
    };
    const onClear = () => setNudge(null);
    window.addEventListener(DECISION_ASSISTANT_NUDGE_EVENT, onNudge);
    window.addEventListener(DECISION_ASSISTANT_NUDGE_CLEAR_EVENT, onClear);
    return () => {
      window.removeEventListener(DECISION_ASSISTANT_NUDGE_EVENT, onNudge);
      window.removeEventListener(DECISION_ASSISTANT_NUDGE_CLEAR_EVENT, onClear);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.advisor = expanded ? "open" : "closed";
    if (expanded) clearDecisionAssistantNudge();
    return () => {
      delete document.documentElement.dataset.advisor;
    };
  }, [expanded]);

  useEffect(() => {
    const nest = document.getElementById("resume-decision-nest");
    if (!nest || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setFooterVisible(visible);
        if (visible) document.documentElement.dataset.advisorFooter = "1";
        else delete document.documentElement.dataset.advisorFooter;
      },
      { rootMargin: "0px 0px -12px 0px", threshold: 0.4 },
    );
    observer.observe(nest);
    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.advisorFooter;
    };
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
    clearDecisionAssistantNudge();
  }, [location, memoryLoaded]);

  // Soft dwell nudge nests on Resume Decision; never a competing bar.
  useEffect(() => {
    if (expanded || !memoryLoaded) return;
    const timer = window.setTimeout(() => {
      try {
        const nudged = JSON.parse(window.sessionStorage.getItem(dwellNudgeKey) || "[]") as string[];
        if (nudged.includes(location) || nudged.length >= 4) return;
        const tip = getPageEngagement(location).nudge;
        nudgeDecisionAssistant(tip);
        window.sessionStorage.setItem(dwellNudgeKey, JSON.stringify([...nudged, location].slice(0, 8)));
        trackVisitorSignal("decision_guide_dwell_nudge", location);
      } catch {
        nudgeDecisionAssistant(getPageEngagement(location).nudge);
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

      // Hub brief only when already verified (cookie session) - never auto-claim by email
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
              ? "Saved and submitted. Your recommendation brief is in your Decision Hub. Verify email anytime to reopen it on another device."
              : "Saved and submitted to our team. To keep this in your Decision Hub, verify your email with a one-time code and Resume My Decision anytime."
            : "Noted. I saved the decision profile and will use that context when we next speak.",
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
    clearDecisionAssistantNudge();

    guidance.messages.forEach((text) => nextMessages.push({ role: "assistant", text }));

    setExpanded(true);
    setQuickActions([]);
    setMessages(nextMessages);
    setAnswers(nextAnswers);
    setLeadScore(nextScore);
    setStep(
      shouldOfferContact(nextAnswers, nextScore, nextMessages.filter((m) => m.role === "user").length, prompt.text)
        ? "email"
        : "desire",
    );
  }

  function handleQuickAction(action: QuickAction) {
    setExpanded(true);
    setMessages((current) => [...current, { role: "assistant", text: action.response }]);
    if (action.asksForEmail) {
      setStep("email");
      setQuickActions([]);
    }
    if (action.path) setLocation(action.path);
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
    const latestUserText = [...baseMessages].reverse().find((message) => message.role === "user")?.text ?? "";
    const offerContact = shouldOfferContact(mergedAnswers, nextScore, userTurns, latestUserText);
    const aiAskedForContact = replyAsksForContact(aiTurn.reply);

    if (offerContact && !aiAskedForContact) {
      replyMessages.push({ role: "assistant", text: buildContactOffer() });
    }

    setMessages(replyMessages);
    setAnswers(mergedAnswers);
    setLeadScore(nextScore);
    setLeadQualification(aiTurn.leadQualification ?? null);
    setQuickActions([]);

    const recommended = aiTurn.actions?.find(
      (action) => (action.type === "open_page" || action.type === "recommend_page") && action.path,
    );
    if (recommended?.path) {
      setQuickActions([
        {
          label: recommended.label || "Open recommended page",
          path: recommended.path,
          response: recommended.reason || "This page is the next useful read.",
        },
      ]);
    }

    const shouldSendRecap = offerContact && aiTurn.actions?.some((action) => action.type === "send_recap");
    if (shouldSendRecap && hasContact(mergedAnswers)) {
      void sendRecap(mergedAnswers, nextScore);
    } else if (offerContact && (shouldSendRecap || aiAskedForContact)) {
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
          ? "Thank you. I will send the recommendation with the relevant brief, the profile items we have so far, and the next best step."
          : "Thank you. I saved the decision profile with what we have so far, and I will use this context when we next speak.",
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
      guidance.messages.forEach((text) => nextMessages.push({ role: "assistant", text }));
      nextStep = "desire";
    } else if (conversationStep === "desire") {
      nextAnswers = { ...nextAnswers, desire: answer };
      nextMessages.push({
        role: "assistant",
        text: "That already helps. I would treat that as the success condition. When you are ready, we can look at what usually blocks it: timing, budget, building rules, schools, or flexibility. No rush. Which of those feels closest?",
      });
      nextStep = "constraints";
    } else if (conversationStep === "constraints") {
      nextAnswers = { ...nextAnswers, constraints: answer };
      nextMessages.push({
        role: "assistant",
        text: "Good. That constraint is the real filter. If everything cannot fit, what should win first: size, location, building quality, flexibility, cost control, or long-term value?",
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
        text: "I would read the relevant brief or compare ownership options before any tours. We are deciding what to do, not collecting listings for sport.",
      });
      nextStep = "tradeoff";
    } else {
      nextMessages.push({
        role: "assistant",
        text: "Keep telling me what matters. I will stay with you and keep sharpening the decision. No forms. No rush. From what you have shared, I would go next toward the biggest unresolved tension.",
      });
    }

    const userTurns = nextMessages.filter((message) => message.role === "user").length;
    if (shouldOfferContact(nextAnswers, nextScore, userTurns, answer)) {
      nextMessages.push({
        role: "assistant",
        text: buildContactOffer(),
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

  function collapseSheet() {
    setExpanded(false);
    inputRef.current?.blur();
  }

  function toggleSheet() {
    if (expanded) {
      collapseSheet();
      return;
    }
    setExpanded(true);
    setNudge(null);
    clearDecisionAssistantNudge();
    window.setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 280);
  }

  function beginSheetDrag(clientY: number) {
    sheetDrag.current = { y: clientY };
  }

  function finishSheetDrag(clientY: number) {
    if (!sheetDrag.current) return;
    if (clientY - sheetDrag.current.y > 48) collapseSheet();
    sheetDrag.current = null;
  }

  const completedSegments = {
    Lifestyle: Boolean(answers.situation),
    Location: Boolean(answers.desire || answers.geography || answers.neighborhoods),
    Building: Boolean(answers.buildingPreferences || answers.desire),
    Financial: Boolean(answers.budget || answers.financingStatus || (answers.constraints && leadScore >= 2)),
    Timeline: Boolean(answers.timeline || answers.constraints),
    "Trade-offs": Boolean(answers.tradeOff),
  };
  const blueprintCompletion = blueprintSegments.filter((segment) => completedSegments[segment.label as keyof typeof completedSegments]).length;
  const displayMessages = mergeConsecutiveMessages(messages);
  const recentMessages = cold ? displayMessages.slice(-3) : displayMessages.slice(-2);

  const chipLabel = messages.some((message) => message.role === "user") ? "Resume Decision" : "Guidance";

  return (
    <div className={expanded ? "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center" : "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3"}>
      {expanded ? (
        <aside
          id="decision-assistant"
          className="ak-guidance-sheet pointer-events-auto flex w-full flex-col"
          aria-label="Guidance Advisor"
          aria-expanded="true"
        >
          <div className="flex min-h-0 flex-1 flex-col">
            <div
              className="ak-guidance-sheet-chrome flex min-h-[5.15rem] min-w-0 items-center gap-2 px-4 py-2 [touch-action:none]"
              onPointerDown={(event) => beginSheetDrag(event.clientY)}
              onPointerUp={(event) => finishSheetDrag(event.clientY)}
              onPointerCancel={() => {
                sheetDrag.current = null;
              }}
            >
              <GuidanceAdvisorFace />
              <button
                type="button"
                onClick={toggleSheet}
                className="min-h-11 min-w-0 flex-1 text-left"
                aria-label="Collapse Guidance Advisor"
              >
                <GuidanceStarProgress completion={blueprintCompletion} />
                <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-[#b08d57]">
                  Guidance Advisor
                </span>
              </button>
              <button
                type="button"
                onClick={collapseSheet}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-button text-[#f5f2eb]/50 transition-colors hover:text-[#f5f2eb]"
                aria-label="Close Guidance Advisor"
                data-testid="button-guidance-close"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 pb-[max(0.85rem,env(safe-area-inset-bottom))] pt-3">
              <div ref={transcriptRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overflow-x-hidden pr-1">
              {recentMessages.map((message, index) => (
                <div key={`${message.role}-${index}`} className="max-w-full">
                  <p
                    className={
                      message.role === "assistant"
                        ? "text-[10px] uppercase tracking-[0.2em] text-[#b08d57]"
                        : "text-[10px] uppercase tracking-[0.2em] text-[#f5f2eb]/40"
                    }
                  >
                    {message.role === "assistant" ? "Guidance Advisor" : "You"}
                  </p>
                  <p className="mt-1.5 whitespace-pre-line break-words text-[14px] leading-6 text-[#f5f2eb]/90">{message.text}</p>
                </div>
              ))}
            </div>

              {cold && step !== "sent" ? (
              <div className="flex flex-wrap gap-2" aria-label="Quick starters">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    type="button"
                    onClick={() => handleStarter(prompt)}
                    className="min-h-10 rounded-button border border-[#d8d1c7]/35 px-3 text-[12px] text-[#f5f2eb]/80 transition-colors hover:border-[#d8d1c7]/60 hover:text-[#f5f2eb]"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            ) : null}

              {quickActions.length > 0 && step !== "sent" ? (
              <div className="flex flex-wrap gap-2" aria-label="Suggested actions">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => handleQuickAction(action)}
                    className="min-h-10 rounded-button border border-[#d8d1c7]/35 px-3 text-[12px] text-[#f5f2eb]/80 transition-colors hover:border-[#d8d1c7]/60 hover:text-[#f5f2eb]"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            ) : null}

              {step !== "sent" ? (
              <form onSubmit={handleSubmit} className="mt-auto grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-end gap-2 border-t border-[#d8d1c7]/25 pt-3">
                <label className="sr-only" htmlFor="decision-assistant-input">
                  Tell me what's changing
                </label>
                <textarea
                  ref={inputRef}
                  id="decision-assistant-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onFocus={() => clearDecisionAssistantNudge()}
                  onKeyDown={handleInputKeyDown}
                  placeholder={
                    step === "email"
                      ? "Email or mobile if you want this waiting for you..."
                      : openingPrompts[promptIndex % openingPrompts.length] || "Tell me what's changing..."
                  }
                  rows={2}
                  className="min-h-10 w-full min-w-0 resize-none border-0 bg-transparent px-0 py-2 text-sm text-[#f5f2eb] outline-none placeholder:text-[#f5f2eb]/32"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-button text-[#f5f2eb]/70 transition-colors hover:text-[#f5f2eb] disabled:cursor-wait disabled:opacity-70 md:w-auto md:px-2"
                >
                  <span className="sr-only">{sending ? "Sending" : "Send"}</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </form>
              ) : null}
            </div>
          </div>
        </aside>
      ) : (
        <div
          className={
            footerVisible
              ? "pointer-events-none hidden"
              : "pointer-events-auto flex w-full max-w-[22rem] flex-col items-center pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2"
          }
        >
          {nudge ? (
            <button
              type="button"
              onClick={toggleSheet}
              className="mb-2 w-full rounded-card border border-[#d8d1c7]/40 bg-[rgba(42,52,71,0.95)] px-3 py-2 text-left text-[#f5f2eb]"
            >
              <span className="block text-[10px] uppercase tracking-[0.18em] text-brand-stone">Guidance Advisor</span>
              <span className="mt-1 block text-sm leading-5">{nudge}</span>
            </button>
          ) : null}
          <button
            type="button"
            id="decision-assistant"
            onClick={toggleSheet}
            className="ak-guidance-chip"
            aria-expanded="false"
            aria-label={chipLabel === "Guidance" ? "Open Guidance Advisor" : "Resume Decision with Guidance Advisor"}
            data-testid="button-guidance-chip"
          >
            <GuidanceAdvisorFace size="chip" />
            <span>{chipLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
}
