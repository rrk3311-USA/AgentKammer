import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  Check,
  Circle,
  Landmark,
  MapPinned,
  Minimize2,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";
import { DECISION_ASSISTANT_OPEN_EVENT } from "@/lib/decision-assistant";
import { getPageContext } from "@/lib/knowledge-graph/page-context";

const blueprintSegments = [
  { label: "Lifestyle", filled: true, icon: UsersRound },
  { label: "Location", filled: true, icon: MapPinned },
  { label: "Building", filled: true, icon: Building2 },
  { label: "Budget", filled: false, icon: Landmark },
  { label: "Timeline", filled: false, icon: CalendarClock },
  { label: "Trade-offs", filled: false, icon: SlidersHorizontal },
];

const blueprintMaterials: Record<string, { fill: string; track: string; icon: string }> = {
  Lifestyle: {
    fill: "bg-[#C9B48D]",
    track: "bg-[#E7DDCB]",
    icon: "text-[#B08D57]",
  },
  Location: {
    fill: "bg-[#AEB8BE]",
    track: "bg-[#E2E5E4]",
    icon: "text-[#7E8A91]",
  },
  Building: {
    fill: "bg-[#D8D1C7]",
    track: "bg-[#ECE7DE]",
    icon: "text-brand-brass",
  },
  Budget: {
    fill: "bg-brand-navy",
    track: "bg-[#D8D1C7]",
    icon: "text-brand-navy",
  },
  Timeline: {
    fill: "bg-[#8F8170]",
    track: "bg-[#E5DED3]",
    icon: "text-[#8F8170]",
  },
  "Trade-offs": {
    fill: "bg-brand-charcoal",
    track: "bg-[#DDD6CC]",
    icon: "text-brand-charcoal",
  },
};

const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const sessionStorageKey = "akDecisionAssistantSessionId";
const navigationMemoryKey = "akDecisionAssistantNavigation";
const openingPrompts = [
  "Tell me what's changing...",
  "I'm relocating to Manhattan...",
  "We need more space...",
  "I'm not sure if I should sell...",
  "I'm just exploring...",
  "My company transferred me...",
  "I'm buying my first home...",
];

const starterPrompts = [
  { label: "Relocation", text: "We're relocating.", path: "/services/executive-relocation-nyc" },
  { label: "More space", text: "We need more space.", path: "/services/school-district-planning-nyc" },
  { label: "First home", text: "I'm buying my first home.", path: "/buyer-advisory" },
  { label: "Upgrade", text: "We're considering an upgrade.", path: "/buyer-advisory" },
  { label: "Just exploring", text: "I'm just exploring.", path: "/buyer-advisory" },
];

function DecisionGuideAvatar({ animated = false }: { animated?: boolean }) {
  return (
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-brass/35 bg-[radial-gradient(circle_at_50%_18%,#F7F2EA_0_18%,#C8CDD2_19%_44%,#6F7884_45%_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_1px_8px_rgba(42,52,71,0.18)]">
      <span
        className={
          animated
            ? "absolute inset-0 animate-command-breathe rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.55),transparent_42%,rgba(176,141,87,0.28))]"
            : "absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.55),transparent_42%,rgba(176,141,87,0.22))]"
        }
      />
      <span className="absolute top-[6px] h-[11px] w-[11px] rounded-full bg-[#D8B99E] shadow-[0_0_0_2px_rgba(245,242,235,0.55)]" />
      <span className="absolute top-[17px] h-[17px] w-[18px] rounded-t-[9px] bg-brand-navy" />
      <span className="absolute top-[18px] h-[15px] w-[7px] bg-brand-ivory" />
      <span className="absolute top-[18px] left-[9px] h-[15px] w-[8px] rotate-[15deg] bg-brand-midnight" />
      <span className="absolute top-[18px] right-[9px] h-[15px] w-[8px] rotate-[-15deg] bg-brand-midnight" />
      <span className="absolute top-[6px] h-[4px] w-[12px] rounded-t-full bg-brand-charcoal" />
      <span className="sr-only">Decision Guide advisor portrait</span>
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
  industry?: string;
  household?: string;
  neighborhoods?: string;
  buildingPreferences?: string;
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
    "industry",
    "household",
    "neighborhoods",
    "buildingPreferences",
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
    answers.industry ? "Industry" : null,
    answers.household ? "Household" : null,
    answers.neighborhoods ? "Neighborhood preferences" : null,
    answers.buildingPreferences ? "Building preferences" : null,
  ].filter(Boolean);

  return [
    "Decision Guide recommendation request",
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
    `Industry: ${answers.industry || "Not provided"}`,
    `Household: ${answers.household || "Not provided"}`,
    `Neighborhood preferences: ${answers.neighborhoods || "Not provided"}`,
    `Building preferences: ${answers.buildingPreferences || "Not provided"}`,
    `Buildings viewed: ${answers.buildingsViewed || "Not provided"}`,
    `Reports viewed: ${answers.reportsViewed || "Not provided"}`,
    `Questions asked: ${answers.questionsAsked || "Not provided"}`,
    `Recommendation history: ${answers.recommendationHistory || "Not provided"}`,
    "",
    "Recommended next step:",
    score >= 4
      ? "Prioritize fast follow-up. They gave strong timing/specificity signals; respond with a focused buyer/seller brief and ask for budget, target buildings, and availability."
      : score >= 2
        ? "Send a concise recap and invite a short advisory call. Clarify timing, budget, and building criteria."
        : "Keep nurturing. Send educational building intelligence and let them continue the diagnostic before pushing for a call.",
  ].join("\n");
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
    answers.industry ? `Industry: ${answers.industry}` : null,
    answers.household ? `Household: ${answers.household}` : null,
    answers.neighborhoods ? `Neighborhoods: ${answers.neighborhoods}` : null,
    answers.buildingPreferences ? `Building preferences: ${answers.buildingPreferences}` : null,
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

function getBlueprintStrength(label: string, complete: boolean, leadScore: number) {
  if (complete) return 92;
  if (label === "Lifestyle") return 24;
  if (label === "Location") return Math.min(68, 22 + leadScore * 12);
  if (label === "Building") return Math.min(64, 18 + leadScore * 10);
  if (label === "Budget") return Math.min(58, 12 + leadScore * 9);
  if (label === "Timeline") return Math.min(70, 16 + leadScore * 11);
  return Math.min(52, 10 + leadScore * 8);
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
      path: "/services/school-district-planning-nyc",
      messages: [
        "Congratulations. I would not start with listings yet. A first child usually changes daily rhythm more than bedroom count, so I would first separate space, commute, and school timing. If we pick one starting point, I would begin with daily routine.",
      ],
    };
  }
  if (/(company transferred|transferred|relocat|moving|move.*manhattan|new job|job)/.test(lower)) {
    return {
      path: "/services/executive-relocation-nyc",
      messages: [
        "Thanks. For a Manhattan relocation, I would lead with timeline because it decides whether renting or buying deserves more weight. Commute comes next, then building fit. If this is under three years, flexibility probably matters more than ownership.",
      ],
    };
  }
  if (/(divorce|separat)/.test(lower)) {
    return {
      path: "/services/divorce-property-sales-nyc",
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
        ? "That helps. This sounds time-sensitive, so I would avoid browsing broadly. I would first narrow the decision around timeline, budget, and the one constraint that can break the move."
        : "That helps. I would make this less scattered by identifying the trigger first, then the constraint. Once those are clear, buildings and neighborhoods become much easier to sort.",
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
      label: "Send recap",
      asksForEmail: true,
      response: "I can send a clean recap with the relevant briefs, what we learned, and the current recommendation. What email should I use?",
    });
  }

  return actions;
}

export function DecisionAssistantDock() {
  const [location, setLocation] = useLocation();
  const [expanded, setExpanded] = useState(false);
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
      text: "Hi, I'm Raphi. Before you spend time looking at listings, I’ll help you decide whether anything should change at all. Sometimes doing nothing is right. Sometimes it is the mistake. What's changing?",
    },
  ]);
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const open = () => setExpanded(true);
    window.addEventListener(DECISION_ASSISTANT_OPEN_EVENT, open);
    return () => window.removeEventListener(DECISION_ASSISTANT_OPEN_EVENT, open);
  }, []);

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
      setPromptIndex((current) => (current + 1) % openingPrompts.length);
    }, 3600);
    return () => window.clearInterval(interval);
  }, []);

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
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [answers, leadScore, memoryLoaded, messages, sessionId]);

  async function sendRecap(nextAnswers: Answers, nextScore: number) {
    if (!nextAnswers.email) return;
    setSending(true);
    try {
      const recap = buildRecap(nextAnswers, nextScore);
      const fullSummary = `${recap}\n\nConversation transcript:\n${transcript(messages)}`;
      const leadResponse = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: "Decision Guide Visitor",
          email: nextAnswers.email,
          timeline: nextAnswers.constraints || nextAnswers.situation,
          financing: nextAnswers.constraints,
          motivation: nextAnswers.situation,
          communicationStyle: `Decision Guide - ${classifyLead(nextScore)}`,
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
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "Sent. I’ll keep the conversation here too, so you can keep refining the decision.",
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

  function handleStarter(prompt: (typeof starterPrompts)[number]) {
    const nextScore = leadScore + scoreLead(prompt.text);
    const nextAnswers = { ...answers, situation: prompt.text };
    const nextMessages: Message[] = [...messages, { role: "user", text: prompt.text }];
    const guidance = getSituationGuidance(prompt.text, nextScore);

    setLocation(guidance.path || prompt.path);
    guidance.messages.forEach((text) => nextMessages.push({ role: "assistant", text }));

    setExpanded(true);
    setQuickActions([]);
    setMessages(nextMessages);
    setAnswers(nextAnswers);
    setLeadScore(nextScore);
    setStep("desire");
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

    setMessages([...baseMessages, { role: "assistant", text: aiTurn.reply }]);
    setAnswers(mergedAnswers);
    setLeadScore(nextScore);
    setLeadQualification(aiTurn.leadQualification ?? null);
    setQuickActions([]);

    const openAction = aiTurn.actions?.find((action) => action.type === "open_page" && action.path);
    if (openAction?.path) {
      setLocation(openAction.path);
    }

    const shouldSendRecap = aiTurn.actions?.some((action) => action.type === "send_recap");
    if (shouldSendRecap && mergedAnswers.email) {
      void sendRecap(mergedAnswers, nextScore);
    } else if (shouldSendRecap) {
      setStep("email");
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const answer = input.trim();
    if (!answer || sending) return;
    setExpanded(true);

    const foundEmail = answer.match(emailPattern)?.[0];
    const baseMessages: Message[] = [...messages, { role: "user", text: answer }];
    const nextMessages: Message[] = [...baseMessages];
    let nextAnswers = { ...answers };
    let nextStep = step;
    let nextScore = leadScore + scoreLead(answer);

    if (foundEmail) {
      nextAnswers = { ...nextAnswers, email: foundEmail };
      nextMessages.push({
        role: "assistant",
        text: "Got it. I’ll send the recommendation with the Blueprint items checked so far and the next best step.",
      });
      setMessages(nextMessages);
      setAnswers(nextAnswers);
      setLeadScore(nextScore);
      setQuickActions([]);
      setInput("");
      void sendRecap(nextAnswers, nextScore);
      return;
    }

    if (step === "situation") {
      nextAnswers = { ...nextAnswers, situation: answer };
      const guidance = getSituationGuidance(answer, nextScore);
      if (guidance.path) setLocation(guidance.path);
      guidance.messages.forEach((text) => nextMessages.push({ role: "assistant", text }));
      nextStep = "desire";
    } else if (step === "desire") {
      nextAnswers = { ...nextAnswers, desire: answer };
      nextMessages.push({
        role: "assistant",
        text: "That helps. I would now check the constraint that can block this: budget, timing, financing, school district, pets, building rules, or uncertainty. Pick the one that feels most likely to create friction.",
      });
      nextStep = "constraints";
    } else if (step === "constraints") {
      nextAnswers = { ...nextAnswers, constraints: answer };
      nextMessages.push({
        role: "assistant",
        text: "That helps. Now I would decide the trade-off instead of adding more search criteria. If everything cannot fit, I would rank size, location, building quality, flexibility, cost control, and long-term value.",
      });
      nextStep = "tradeoff";
    } else if (step === "tradeoff") {
      nextAnswers = { ...nextAnswers, tradeOff: answer };
      nextMessages.push({
        role: "assistant",
        text: getTradeoffGuidance(answer),
      });
      nextMessages.push({
        role: "assistant",
        text: "My next move would be to read the relevant brief or compare ownership options before looking at listings.",
      });
      nextStep = "tradeoff";
    } else {
      nextMessages.push({
        role: "assistant",
        text: "You can keep adding context here. I’ll keep narrowing the next useful decision instead of turning this into a form.",
      });
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

  const completedSegments = {
    Lifestyle: Boolean(answers.situation),
    Location: Boolean(answers.desire),
    Building: Boolean(answers.desire || answers.constraints),
    Budget: Boolean(answers.constraints && leadScore >= 2),
    Timeline: Boolean(answers.constraints),
    "Trade-offs": Boolean(answers.tradeOff),
  };
  const blueprintCompletion = blueprintSegments.filter((segment) => completedSegments[segment.label as keyof typeof completedSegments]).length;
  const blueprintPercent = Math.round((blueprintCompletion / blueprintSegments.length) * 100);
  const displayMessages = mergeConsecutiveMessages(messages);
  const renderCompactBlueprintProgress = (tone: "dark" | "light") => (
    <span className="grid grid-cols-6 gap-1" aria-label={`Decision Blueprint progress ${blueprintCompletion} of 6`}>
      {blueprintSegments.map((segment, index) => {
        const filled = completedSegments[segment.label as keyof typeof completedSegments];
        const material = blueprintMaterials[segment.label];
        return (
          <span
            key={segment.label}
            className={tone === "dark" ? "h-2 overflow-hidden bg-brand-ivory/26" : `h-1.5 overflow-hidden ${material.track}`}
          >
            <span
              className={
                filled
                  ? `block h-full animate-blueprint-fill ${material.fill}`
                  : tone === "dark"
                    ? "block h-full animate-blueprint-fill bg-brand-ivory/34"
                    : `block h-full animate-blueprint-fill ${material.track}`
              }
              style={{
                animationDelay: `${index * 65}ms`,
                width: `${getBlueprintStrength(segment.label, Boolean(filled), leadScore)}%`,
              }}
            />
          </span>
        );
      })}
    </span>
  );

  if (!expanded) {
    return (
      <aside
        id="decision-assistant"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-brass/35 bg-brand-midnight px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-brand-ivory shadow-[0_-18px_38px_rgba(32,39,53,0.28)] md:px-6"
        aria-label="Decision Guide"
      >
        <div className="mx-auto grid max-w-site gap-3 lg:grid-cols-[minmax(210px,0.25fr)_minmax(220px,0.25fr)_minmax(340px,0.5fr)] lg:items-center">
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <button type="button" onClick={() => setExpanded(true)} className="flex min-w-0 items-center gap-3 text-left">
                <DecisionGuideAvatar />
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-brand-brass">Decision Guide</span>
                  <span className="mt-0.5 block truncate text-sm font-medium text-brand-ivory">What's changing?</span>
                </span>
              </button>
              <div className="flex shrink-0 items-center gap-2">
                <p className="font-mono text-[10px] text-brand-ivory/58">{blueprintCompletion}/6</p>
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
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
          <div className="hidden sm:block" aria-label="Decision Blueprint modules">
            <div className="grid grid-cols-6 gap-1" aria-hidden>
              {blueprintSegments.map((segment, index) => {
                const filled = completedSegments[segment.label as keyof typeof completedSegments];
                const material = blueprintMaterials[segment.label];
                return (
                  <span key={segment.label} className="h-1.5 overflow-hidden bg-brand-ivory/20">
                    <span
                      className={filled ? `block h-full animate-blueprint-fill ${material.fill}` : "block h-full animate-blueprint-fill bg-brand-ivory/34"}
                      style={{
                        animationDelay: `${index * 85}ms`,
                        width: `${getBlueprintStrength(segment.label, Boolean(filled), leadScore)}%`,
                      }}
                    />
                  </span>
                );
              })}
            </div>
            <div className="mt-2 hidden grid-cols-6 gap-x-4 gap-y-1 2xl:grid">
              {blueprintSegments.map((segment) => (
                <span key={segment.label} className="truncate text-[10px] uppercase tracking-[0.1em] text-brand-ivory/72">
                  {segment.label}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-brand-ivory/64 2xl:hidden">
              Lifestyle · Building · Budget · Timeline
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 lg:col-start-3">
            <label className="sr-only" htmlFor="decision-guide-compact-input">
              Tell the decision guide what is changing
            </label>
            <input
              id="decision-guide-compact-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={openingPrompts[promptIndex]}
              onFocus={() => setExpanded(true)}
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
          ? "fixed inset-x-0 bottom-0 z-40 max-h-[68dvh] w-full max-w-[100vw] overflow-hidden border-t border-brand-navy/18 bg-brand-ivory p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_42px_rgba(42,52,71,0.18)] md:inset-x-auto md:bottom-6 md:right-6 md:top-40 md:h-auto md:max-h-none md:min-w-[24rem] md:w-[min(30rem,34vw)] md:max-w-[42rem] md:resize-x md:overflow-auto md:border md:p-4"
          : "fixed inset-x-0 bottom-0 z-40 border-t border-brand-brass/35 bg-brand-midnight px-3 py-3 text-brand-ivory shadow-[0_-18px_38px_rgba(32,39,53,0.28)] md:px-6"
      }
      aria-label="Decision Guide"
    >
      <div className="mx-auto grid w-full max-w-full gap-3 overflow-hidden md:max-w-site">
        <div className={expanded ? "grid min-w-0 gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center md:grid-cols-1" : "grid min-w-0 gap-3 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center"}>
          <div className="flex min-w-0 items-center gap-3">
            <DecisionGuideAvatar animated={expanded} />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-brand-brass">Decision Guide</p>
              <p className="text-sm font-medium text-brand-navy">
                {expanded ? "What's changing?" : "Guidance before search"}
              </p>
            </div>
            {expanded ? (
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="ml-auto flex h-9 w-9 items-center justify-center border border-brand-border bg-white text-brand-graphite transition-colors hover:text-brand-navy"
                aria-label="Minimize decision assistant"
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
          <div className="hidden border border-brand-border bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_1px_0_rgba(42,52,71,0.05)] sm:block" aria-label="Decision Blueprint modules">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-brand-brass">Decision Progress</p>
              <p className="font-mono text-[10px] text-brand-graphite">{blueprintCompletion}/6</p>
            </div>
            <div className="mt-3 grid grid-cols-6 gap-1" aria-hidden>
              {blueprintSegments.map((segment) => {
                const filled = completedSegments[segment.label as keyof typeof completedSegments];
                const material = blueprintMaterials[segment.label];
                return <span key={segment.label} className={filled ? `h-2 ${material.fill}` : `h-2 ${material.track}`} />;
              })}
            </div>
            {expanded ? (
              <div className="mt-4 grid gap-3">
                {blueprintSegments.map((segment) => {
                  const filled = completedSegments[segment.label as keyof typeof completedSegments];
                  const strength = getBlueprintStrength(segment.label, Boolean(filled), leadScore);
                  const material = blueprintMaterials[segment.label];
                  return (
                    <div key={segment.label} className="grid grid-cols-[7rem_minmax(0,1fr)_1.5rem] items-center gap-3">
                      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-brand-graphite">
                        <segment.icon className={`h-3.5 w-3.5 shrink-0 ${material.icon}`} strokeWidth={1.5} />
                        <span className="truncate">{segment.label}</span>
                      </span>
                      <span className={`h-2 overflow-hidden ${material.track}`} aria-hidden>
                        <span
                          className={filled ? `block h-full animate-blueprint-fill ${material.fill}` : "block h-full animate-blueprint-fill bg-brand-ivory/70"}
                          style={{ width: `${strength}%` }}
                        />
                      </span>
                      <span className="flex justify-end">
                        {filled ? (
                          <Check className="h-3.5 w-3.5 text-brand-navy" strokeWidth={1.7} />
                        ) : (
                          <Circle className="h-3 w-3 text-brand-border" strokeWidth={1.7} />
                        )}
                      </span>
                    </div>
                  );
                })}
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
          <div className="min-w-0 max-w-full overflow-hidden border-t border-brand-border pt-3">
            <div ref={transcriptRef} className="max-h-[34dvh] max-w-full space-y-2 overflow-y-auto overflow-x-hidden pr-1 md:max-h-[24rem] md:space-y-3">
              {displayMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={message.role === "assistant" ? "mr-4 max-w-full overflow-hidden border border-brand-border bg-white p-3 md:mr-8" : "ml-4 max-w-full overflow-hidden bg-brand-navy p-3 text-brand-ivory md:ml-8"}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-brand-brass">
                    {message.role === "assistant" ? "Guide" : "You"}
                  </p>
                  <p className="mt-2 whitespace-pre-line break-words text-sm leading-6">{message.text}</p>
                </div>
              ))}
            </div>
            {step !== "sent" ? (
              <>
                <form onSubmit={handleSubmit} className="mt-3 grid w-full min-w-0 max-w-full grid-cols-[minmax(0,1fr)_auto] gap-2">
                  <label className="sr-only" htmlFor="decision-assistant-input">
                    Answer the decision assistant
                  </label>
                  <textarea
                    id="decision-assistant-input"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={step === "email" ? "Email for the recap..." : openingPrompts[promptIndex]}
                    rows={1}
                    className="min-h-11 w-full min-w-0 resize-none border border-brand-border bg-white px-3 py-2 text-sm text-brand-navy outline-none transition-colors placeholder:text-brand-graphite/55 focus:border-brand-brass md:min-h-12"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex h-11 w-12 shrink-0 items-center justify-center gap-2 border border-brand-navy bg-brand-navy text-[11px] uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:bg-brand-navy-secondary disabled:cursor-wait disabled:opacity-70 md:h-12 md:w-auto md:px-5"
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
