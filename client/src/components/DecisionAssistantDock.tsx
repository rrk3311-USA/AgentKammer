import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowRight,
  BrainCircuit,
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
  { label: "Financial", filled: false, icon: Landmark },
  { label: "Timeline", filled: false, icon: CalendarClock },
  { label: "Trade-offs", filled: false, icon: SlidersHorizontal },
];

const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const sessionStorageKey = "akDecisionAssistantSessionId";
const navigationMemoryKey = "akDecisionAssistantNavigation";

type Message = {
  role: "assistant" | "user";
  text: string;
};

type Answers = {
  situation?: string;
  details?: string;
  tradeOff?: string;
  email?: string;
};

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
    answers.situation ? "Lifestyle/Situation" : null,
    answers.details ? "Location/Building/Financial" : null,
    answers.tradeOff ? "Trade-offs/Priorities" : null,
  ].filter(Boolean);

  return [
    "New Decision Assistant lead",
    "",
    `Lead quality: ${classifyLead(score)}`,
    `Qualifier score: ${score}`,
    `Checked modules: ${checked.join(", ") || "Initial situation only"}`,
    "",
    `Situation: ${answers.situation || "Not provided"}`,
    `Details: ${answers.details || "Not provided"}`,
    `Trade-off / risk: ${answers.tradeOff || "Not provided"}`,
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
    answers.situation ? `Situation: ${answers.situation}` : null,
    answers.details ? `Details: ${answers.details}` : null,
    answers.tradeOff ? `Trade-off: ${answers.tradeOff}` : null,
    `Message count: ${messages.length}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function transcript(messages: Message[]) {
  return messages.map((message) => `${message.role === "assistant" ? "Assistant" : "Visitor"}: ${message.text}`).join("\n");
}

function getBlueprintStrength(label: string, complete: boolean, leadScore: number) {
  if (complete) return 92;
  if (label === "Lifestyle") return 24;
  if (label === "Location") return Math.min(68, 22 + leadScore * 12);
  if (label === "Building") return Math.min(64, 18 + leadScore * 10);
  if (label === "Financial") return Math.min(58, 12 + leadScore * 9);
  if (label === "Timeline") return Math.min(70, 16 + leadScore * 11);
  return Math.min(52, 10 + leadScore * 8);
}

export function DecisionAssistantDock() {
  const [location, setLocation] = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId] = useState(getSessionId);
  const [step, setStep] = useState<"situation" | "details" | "tradeoff" | "email" | "sent">("situation");
  const [answers, setAnswers] = useState<Answers>({});
  const [leadScore, setLeadScore] = useState(0);
  const [sending, setSending] = useState(false);
  const [memoryLoaded, setMemoryLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I'm your Decision Guide. I'll learn about your situation while you browse. What's changing?",
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
          setMessages([
            ...savedMessages,
            { role: "assistant", text: "Welcome back. I still have the context from this decision." },
          ]);
        }
        if (typeof memory.leadScore === "number") {
          setLeadScore(memory.leadScore);
        }
        if (memory.leadEmail) {
          setAnswers((current) => ({ ...current, email: memory.leadEmail }));
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
          categoryInterest: answers.details || answers.situation,
          leadScore,
          summary: summarizeMemory(messages, answers, leadScore),
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
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: "Decision Assistant Lead",
          email: nextAnswers.email,
          timeline: nextAnswers.details || nextAnswers.situation,
          financing: nextAnswers.details,
          motivation: nextAnswers.situation,
          communicationStyle: `Decision Assistant - ${classifyLead(nextScore)}`,
          conversationSummary: fullSummary,
          leadScore: nextScore,
          marketInterest: nextAnswers.details,
          leadSource: "decision_assistant",
        }),
      });
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: "Decision Assistant Lead",
          email: nextAnswers.email,
          message: fullSummary,
        }),
      });
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "I saved the lead and sent the recap. Based on what you shared, the next useful step is a tighter Decision Blueprint: timing, building filters, financing constraints, and the trade-offs to avoid before seeing listings.",
        },
      ]);
      setStep("sent");
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "I saved the recap locally in this conversation, but the database/email handoff did not complete. You can still keep answering and refine the Decision Blueprint here.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const answer = input.trim();
    if (!answer || sending) return;
    setExpanded(true);

    const foundEmail = answer.match(emailPattern)?.[0];
    const nextMessages: Message[] = [...messages, { role: "user", text: answer }];
    let nextAnswers = { ...answers };
    let nextStep = step;
    let nextScore = leadScore + scoreLead(answer);

    if (foundEmail) {
      nextAnswers = { ...nextAnswers, email: foundEmail };
      nextMessages.push({
        role: "assistant",
        text: "Got it. I will send the recap with the qualifiers checked so far and the recommended next step.",
      });
      setMessages(nextMessages);
      setAnswers(nextAnswers);
      setLeadScore(nextScore);
      setInput("");
      void sendRecap(nextAnswers, nextScore);
      return;
    }

    if (step === "situation") {
      nextAnswers = { ...nextAnswers, situation: answer };
      const lower = answer.toLowerCase();
      if (/(relocat|moving|move.*manhattan|new job|job)/.test(lower)) {
        setLocation("/services/executive-relocation-nyc");
        nextMessages.push({ role: "assistant", text: "Got it. You're relocating to Manhattan." });
        nextMessages.push({ role: "assistant", text: "Lifestyle updated. Opening Executive Relocation..." });
      } else if (/(divorce|separat)/.test(lower)) {
        setLocation("/services/divorce-property-sales-nyc");
        nextMessages.push({ role: "assistant", text: "I'm sorry you're dealing with that." });
        nextMessages.push({ role: "assistant", text: "The two biggest decisions are usually timing and whether keeping the home is realistic. Which one feels more important right now?" });
      } else {
        const leadType = classifyLead(nextScore);
        nextMessages.push({
          role: "assistant",
          text:
            leadType === "High-intent"
              ? "Got it. This sounds time-sensitive."
              : "Got it. I'll help make the decision feel less scattered.",
        });
      }
      nextMessages.push({
        role: "assistant",
        text: "I'd like to understand your timeline next.",
      });
      nextStep = "details";
    } else if (step === "details") {
      nextAnswers = { ...nextAnswers, details: answer };
      nextMessages.push({
        role: "assistant",
        text: "Timeline updated.",
      });
      if (nextScore >= 3) {
        nextMessages.push({
          role: "assistant",
          text: "I have enough to make the next step useful. Where should I send the recap?",
        });
        nextStep = "email";
      } else {
        nextMessages.push({
          role: "assistant",
          text: "What worries you most: price, commute, building rules, resale risk, layout, or timing?",
        });
        nextStep = "tradeoff";
      }
    } else if (step === "tradeoff") {
      nextAnswers = { ...nextAnswers, tradeOff: answer };
      nextMessages.push({
        role: "assistant",
        text: "Trade-off updated. If you want the recap, share the best email.",
      });
      nextStep = "email";
    } else {
      nextMessages.push({
        role: "assistant",
        text: "You can keep adding context here. If you want the recap sent, include an email address in your next message.",
      });
    }

    setMessages(nextMessages);
    setAnswers(nextAnswers);
    setLeadScore(nextScore);
    setStep(nextStep);
    setInput("");
  };

  const completedSegments = {
    Lifestyle: Boolean(answers.situation),
    Location: Boolean(answers.details),
    Building: Boolean(answers.details),
    Financial: Boolean(answers.details && leadScore >= 2),
    Timeline: Boolean(answers.details),
    "Trade-offs": Boolean(answers.tradeOff),
  };
  const blueprintCompletion = blueprintSegments.filter((segment) => completedSegments[segment.label as keyof typeof completedSegments]).length;
  const blueprintPercent = Math.round((blueprintCompletion / blueprintSegments.length) * 100);

  if (!expanded) {
    return (
      <aside
        id="decision-assistant"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-brass/35 bg-brand-midnight px-3 py-3 text-brand-ivory shadow-[0_-18px_38px_rgba(32,39,53,0.28)] md:px-6"
        aria-label="Decision Guide"
      >
        <div className="mx-auto grid max-w-site gap-4 lg:grid-cols-[minmax(220px,0.22fr)_minmax(240px,0.28fr)_minmax(340px,0.5fr)] lg:items-center">
          <div className="flex items-center justify-between gap-4 lg:block">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-brand-brass">Decision Guide</p>
              <p className="mt-1 text-sm font-medium text-brand-ivory">Decision Blueprint</p>
            </div>
            <p className="font-mono text-[10px] text-brand-ivory/58 lg:mt-1">{blueprintCompletion}/6 · {blueprintPercent}%</p>
          </div>
          <div aria-label="Decision Blueprint modules">
            <div className="grid grid-cols-6 gap-1" aria-hidden>
              {blueprintSegments.map((segment, index) => {
                const filled = completedSegments[segment.label as keyof typeof completedSegments];
                return (
                  <span key={segment.label} className="h-1.5 overflow-hidden bg-brand-ivory/20">
                    <span
                      className={filled ? "block h-full animate-blueprint-fill bg-brand-brass" : "block h-full animate-blueprint-fill bg-brand-ivory/34"}
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
              Lifestyle · Building · Financial · Timeline
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <label className="sr-only" htmlFor="decision-guide-compact-input">
              Tell the decision guide what is changing
            </label>
            <input
              id="decision-guide-compact-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="What's changing?"
              className="h-11 border border-brand-ivory/16 bg-brand-ivory/8 px-3 text-sm text-brand-ivory outline-none transition-colors placeholder:text-brand-ivory/48 focus:border-brand-brass"
            />
            <button
              type="submit"
              disabled={sending}
              className="inline-flex h-11 items-center justify-center gap-2 border border-brand-ivory/18 bg-brand-navy-secondary px-4 text-[10px] uppercase tracking-[0.14em] text-brand-ivory transition-colors hover:border-brand-brass disabled:cursor-wait disabled:opacity-70"
            >
              Send
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
          ? "fixed inset-x-3 bottom-3 z-40 max-h-[70vh] overflow-hidden border border-brand-navy/18 bg-brand-ivory p-3 shadow-[0_-12px_42px_rgba(42,52,71,0.18)] md:inset-x-auto md:bottom-6 md:right-6 md:top-40 md:h-auto md:max-h-none md:min-w-[24rem] md:w-[min(30rem,34vw)] md:max-w-[42rem] md:resize-x md:overflow-auto md:p-4"
          : "fixed inset-x-0 bottom-0 z-40 border-t border-brand-brass/35 bg-brand-midnight px-3 py-3 text-brand-ivory shadow-[0_-18px_38px_rgba(32,39,53,0.28)] md:px-6"
      }
      aria-label="Decision Guide"
    >
      <div className="mx-auto grid max-w-site gap-3">
        <div className={expanded ? "grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center md:grid-cols-1" : "grid gap-3 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center"}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-navy/18 bg-white text-brand-navy">
              <BrainCircuit className={expanded ? "h-4 w-4 animate-command-breathe" : "h-4 w-4"} strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-brand-brass">Decision Guide</p>
              <p className="text-sm font-medium text-brand-navy">
                {expanded ? "I'll learn while you browse." : "Build your Decision Blueprint"}
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
          <div className="border border-brand-border bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_1px_0_rgba(42,52,71,0.05)]" aria-label="Decision Blueprint modules">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-brand-brass">Decision Blueprint</p>
              <p className="font-mono text-[10px] text-brand-graphite">{blueprintCompletion}/6</p>
            </div>
            <div className="mt-3 grid grid-cols-6 gap-1" aria-hidden>
              {blueprintSegments.map((segment) => {
                const filled = completedSegments[segment.label as keyof typeof completedSegments];
                return <span key={segment.label} className={filled ? "h-2 bg-brand-navy" : "h-2 bg-brand-border/70"} />;
              })}
            </div>
            {expanded ? (
              <div className="mt-4 grid gap-3">
                {blueprintSegments.map((segment) => {
                  const filled = completedSegments[segment.label as keyof typeof completedSegments];
                  const strength = getBlueprintStrength(segment.label, Boolean(filled), leadScore);
                  return (
                    <div key={segment.label} className="grid grid-cols-[7rem_minmax(0,1fr)_1.5rem] items-center gap-3">
                      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-brand-graphite">
                        <segment.icon className="h-3.5 w-3.5 shrink-0 text-brand-brass" strokeWidth={1.5} />
                        <span className="truncate">{segment.label}</span>
                      </span>
                      <span className="h-2 overflow-hidden bg-brand-border/65" aria-hidden>
                        <span
                          className={filled ? "block h-full animate-blueprint-fill bg-brand-navy" : "block h-full animate-blueprint-fill bg-brand-brass/35"}
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
          <div className="border-t border-brand-border pt-3">
            <div ref={transcriptRef} className="max-h-[42vh] space-y-3 overflow-y-auto pr-1 md:max-h-[24rem]">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={message.role === "assistant" ? "mr-8 border border-brand-border bg-white p-3" : "ml-8 bg-brand-navy p-3 text-brand-ivory"}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-brand-brass">
                    {message.role === "assistant" ? "Guide" : "You"}
                  </p>
                  <p className="mt-2 text-sm leading-6">{message.text}</p>
                </div>
              ))}
            </div>
            {step !== "sent" ? (
              <form onSubmit={handleSubmit} className="mt-3 grid gap-2 md:grid-cols-[minmax(0,1fr)_auto]">
                <label className="sr-only" htmlFor="decision-assistant-input">
                  Answer the decision assistant
                </label>
                <textarea
                  id="decision-assistant-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={step === "email" ? "Email for the recap..." : "Type a short answer..."}
                  rows={2}
                  className="min-h-12 resize-none border border-brand-border bg-white px-3 py-2 text-sm text-brand-navy outline-none transition-colors placeholder:text-brand-graphite/55 focus:border-brand-brass"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex h-12 items-center justify-center gap-2 border border-brand-navy bg-brand-navy px-5 text-[11px] uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:bg-brand-navy-secondary disabled:cursor-wait disabled:opacity-70"
                >
                  {sending ? "Sending" : "Send"}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </form>
            ) : null}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
