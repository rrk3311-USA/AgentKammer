import type { IStorage } from "../storage";
import {
  buildPipelineBoard,
  computeStrategyScore,
  derivePipelineStage,
  emptyFunnelCounts,
  type FunnelCounts,
  type PipelinePerson,
  type StrategyScoreBreakdown,
} from "@shared/crm-pipeline";

export type AdminTodayItem = {
  id: string;
  label: string;
  detail: string;
  score?: number;
  stage?: string;
  hrefHint?: string;
};

export type AdminDashboard = {
  generatedAt: string;
  storageMode: "memory" | "database";
  pipeline: ReturnType<typeof buildPipelineBoard>;
  today: {
    highIntent: AdminTodayItem[];
    returning: AdminTodayItem[];
    profilesChanged: AdminTodayItem[];
    reportsGenerated: AdminTodayItem[];
    callsRequested: AdminTodayItem[];
    needsFollowUp: AdminTodayItem[];
  };
  funnel: {
    steps: Array<{ id: keyof FunnelCounts; label: string; count: number }>;
    conversionRates: Array<{ from: string; to: string; rate: number }>;
    sources: Array<{ source: string; count: number; avgScore: number }>;
  };
  scoring: {
    distribution: Array<{ band: string; min: number; max: number; count: number }>;
    topSignals: Array<{ type: string; count: number; totalPoints: number }>;
    strategyNotes: string[];
    avgScore: number;
    medianScore: number;
  };
  people: PipelinePerson[];
  recentSignals: Array<{
    id: string;
    type: string;
    source: string | null;
    path: string | null;
    detail: string | null;
    at: string;
  }>;
  counts: {
    leads: number;
    contacts: number;
    conversations: number;
    rboProfiles: number;
    signals: number;
  };
};

export type MarketingSignal = {
  id: string;
  type: string;
  source?: string | null;
  path?: string | null;
  referrer?: string | null;
  sessionId?: string | null;
  visitorId?: string | null;
  detail?: string | null;
  createdAt: Date;
};

function parseJsonSafe(raw: string | null | undefined): Record<string, unknown> {
  if (!raw) return {};
  try {
    const v = JSON.parse(raw);
    return v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function profileKeysFromSummary(summary: string | null | undefined): string[] {
  const data = parseJsonSafe(summary);
  const profile =
    (data.profile && typeof data.profile === "object" ? data.profile : null) ||
    (data.structuredProfile && typeof data.structuredProfile === "object"
      ? data.structuredProfile
      : null);
  if (!profile) return [];
  const keys: string[] = [];
  for (const [k, v] of Object.entries(profile as Record<string, unknown>)) {
    if (v == null) continue;
    if (typeof v === "string" && v.trim()) keys.push(k);
    else if (typeof v === "object" && v && "value" in (v as object)) {
      const val = (v as { value?: unknown }).value;
      if (typeof val === "string" && val.trim()) keys.push(k);
    }
  }
  return keys;
}

function messageCountFromMessages(messages: string | null | undefined): number {
  if (!messages) return 0;
  try {
    const parsed = JSON.parse(messages);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return messages.split("\n").filter(Boolean).length;
  }
}

function isSocialSource(source: string | null | undefined, referrer?: string | null): boolean {
  const s = `${source || ""} ${referrer || ""}`.toLowerCase();
  return /instagram|linkedin|twitter|x\.com|facebook|tiktok|youtube|reddit|threads/.test(s);
}

function looksLikeCallRequest(text: string | null | undefined): boolean {
  if (!text) return false;
  return /call|speak|schedule|consult|phone|talk with|book a/.test(text.toLowerCase());
}

function identityKey(parts: {
  email?: string | null;
  phone?: string | null;
  sessionId?: string | null;
  id: string;
}): string {
  if (parts.email?.trim()) return `email:${parts.email.trim().toLowerCase()}`;
  if (parts.phone?.trim()) return `phone:${parts.phone.replace(/\D/g, "")}`;
  if (parts.sessionId?.trim()) return `session:${parts.sessionId.trim()}`;
  return `id:${parts.id}`;
}

function median(nums: number[]): number {
  if (nums.length === 0) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
    : sorted[mid];
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function isToday(date: Date | string | null | undefined): boolean {
  if (!date) return false;
  const d = typeof date === "string" ? new Date(date) : date;
  return d.getTime() >= startOfToday().getTime();
}

export async function buildAdminDashboard(
  storage: IStorage,
  options: {
    storageMode: "memory" | "database";
    signals?: MarketingSignal[];
  },
): Promise<AdminDashboard> {
  const [leads, contacts, conversations, rboProfiles] = await Promise.all([
    storage.getAllLeads(),
    storage.getAllContactSubmissions(),
    storage.getAllChatConversations(),
    storage.getAllRboBuyerProfiles(),
  ]);

  const signals = options.signals ?? [];
  const peopleMap = new Map<string, PipelinePerson>();

  const upsert = (key: string, next: PipelinePerson) => {
    const prev = peopleMap.get(key);
    if (!prev) {
      peopleMap.set(key, next);
      return;
    }
    // Merge: keep higher score, union facts, latest activity
    const mergedScore =
      next.score >= prev.score ? next.scoreBreakdown : prev.scoreBreakdown;
    const facts = Array.from(new Set([...prev.profileFacts, ...next.profileFacts]));
    const lastActivityAt =
      new Date(next.lastActivityAt) > new Date(prev.lastActivityAt)
        ? next.lastActivityAt
        : prev.lastActivityAt;
    peopleMap.set(key, {
      ...prev,
      ...next,
      displayName:
        next.displayName !== "Anonymous visitor" ? next.displayName : prev.displayName,
      email: next.email || prev.email,
      phone: next.phone || prev.phone,
      sessionId: next.sessionId || prev.sessionId,
      source: next.source || prev.source,
      score: mergedScore.total,
      scoreBreakdown: mergedScore,
      stage: derivePipelineStage(mergedScore, {
        hasEmail: Boolean(next.email || prev.email),
        hasPhone: Boolean(next.phone || prev.phone),
        hasName: Boolean(
          (next.displayName !== "Anonymous visitor" && next.displayName) ||
            (prev.displayName !== "Anonymous visitor" && prev.displayName),
        ),
        profileKeys: facts,
        leadScore: Math.max(prev.score, next.score),
        contacted: Boolean(prev.rawRefs.contactId || next.rawRefs.contactId),
        callRequested:
          looksLikeCallRequest(next.summary) || looksLikeCallRequest(prev.summary),
        socialSource: isSocialSource(next.source) || isSocialSource(prev.source),
      }),
      summary: next.summary || prev.summary,
      profileFacts: facts,
      lastActivityAt,
      createdAt:
        new Date(next.createdAt) < new Date(prev.createdAt) ? next.createdAt : prev.createdAt,
      rawRefs: { ...prev.rawRefs, ...next.rawRefs },
      kind:
        next.kind === "opportunity" || prev.kind === "opportunity"
          ? "opportunity"
          : next.kind === "lead" || prev.kind === "lead"
            ? "lead"
            : next.kind === "contact" || prev.kind === "contact"
              ? "contact"
              : "visitor",
    });
  };

  for (const lead of leads) {
    const scoreInput = {
      hasEmail: Boolean(lead.email),
      hasPhone: Boolean(lead.phone),
      hasName: Boolean(lead.name),
      leadScore: lead.leadScore,
      timeline: lead.timeline,
      financing: lead.financing,
      commitment: lead.commitment,
      motivation: lead.motivation,
      marketInterest: lead.marketInterest,
      conversationSummary: lead.conversationSummary,
      reportUrl: lead.reportUrl,
      socialSource: isSocialSource(lead.leadSource),
      callRequested: looksLikeCallRequest(lead.conversationSummary),
    };
    const breakdown = computeStrategyScore(scoreInput);
    const stage = derivePipelineStage(breakdown, scoreInput);
    const key = identityKey({
      email: lead.email,
      phone: lead.phone,
      id: lead.id,
    });
    upsert(key, {
      id: key,
      kind: stage === "active" || stage === "call_ready" ? "opportunity" : "lead",
      displayName: lead.name?.trim() || lead.email || lead.phone || "Lead",
      email: lead.email,
      phone: lead.phone,
      sessionId: null,
      source: lead.leadSource,
      stage,
      score: breakdown.total,
      scoreBreakdown: breakdown,
      summary: lead.conversationSummary,
      profileFacts: [
        lead.timeline && `timeline:${lead.timeline}`,
        lead.financing && `financing:${lead.financing}`,
        lead.motivation && `motivation:${lead.motivation}`,
        lead.marketInterest && `market:${lead.marketInterest}`,
      ].filter(Boolean) as string[],
      lastActivityAt: lead.createdAt.toISOString(),
      createdAt: lead.createdAt.toISOString(),
      rawRefs: { leadId: lead.id },
    });
  }

  for (const contact of contacts) {
    const scoreInput = {
      hasEmail: true,
      hasPhone: Boolean(contact.phone),
      hasName: Boolean(contact.name),
      contacted: true,
      callRequested: looksLikeCallRequest(contact.message),
      messageCount: 1,
    };
    const breakdown = computeStrategyScore(scoreInput);
    const stage = derivePipelineStage(breakdown, scoreInput);
    const key = identityKey({
      email: contact.email,
      phone: contact.phone,
      id: contact.id,
    });
    upsert(key, {
      id: key,
      kind: "contact",
      displayName: contact.name || contact.email,
      email: contact.email,
      phone: contact.phone,
      sessionId: null,
      source: "contact_form",
      stage,
      score: breakdown.total,
      scoreBreakdown: breakdown,
      summary: contact.message,
      profileFacts: ["contact_form"],
      lastActivityAt: contact.createdAt.toISOString(),
      createdAt: contact.createdAt.toISOString(),
      rawRefs: { contactId: contact.id },
    });
  }

  for (const conv of conversations) {
    const summaryData = parseJsonSafe(conv.summary);
    const profileKeys = profileKeysFromSummary(conv.summary);
    const msgs = messageCountFromMessages(conv.messages);
    const scoreInput = {
      hasEmail: Boolean(conv.leadEmail),
      hasPhone: Boolean(conv.leadPhone),
      hasName: Boolean(conv.leadName),
      messageCount: msgs,
      leadScore: conv.leadScore,
      profileKeys,
      marketInterest: conv.categoryInterest,
      conversationSummary: conv.summary,
      returning: Boolean(summaryData.returning),
      callRequested: looksLikeCallRequest(conv.summary) || looksLikeCallRequest(conv.categoryInterest),
    };
    const breakdown = computeStrategyScore(scoreInput);
    const stage = derivePipelineStage(breakdown, scoreInput);
    const key = identityKey({
      email: conv.leadEmail,
      phone: conv.leadPhone,
      sessionId: conv.sessionId,
      id: conv.id,
    });
    upsert(key, {
      id: key,
      kind: conv.leadEmail || conv.leadPhone ? "lead" : "visitor",
      displayName:
        conv.leadName?.trim() ||
        conv.leadEmail ||
        conv.leadPhone ||
        `Visitor ${conv.sessionId.slice(0, 8)}`,
      email: conv.leadEmail,
      phone: conv.leadPhone,
      sessionId: conv.sessionId,
      source: "decision_guide",
      stage,
      score: breakdown.total,
      scoreBreakdown: breakdown,
      summary:
        typeof summaryData.leadSummary === "string"
          ? summaryData.leadSummary
          : conv.summary,
      profileFacts: profileKeys,
      lastActivityAt: (conv.updatedAt || conv.createdAt).toISOString(),
      createdAt: conv.createdAt.toISOString(),
      rawRefs: { conversationId: conv.id },
    });
  }

  for (const rbo of rboProfiles) {
    const scoreInput = {
      hasPhone: true,
      leadScore: rbo.leadScore,
      financing: rbo.downPayment || rbo.creditBand,
      marketInterest: rbo.targetCities?.join(", ") || rbo.priceRange,
      profileKeys: [
        rbo.priceRange && "priceRange",
        rbo.downPayment && "downPayment",
        rbo.creditBand && "creditBand",
        rbo.monthlyComfort && "monthlyComfort",
      ].filter(Boolean) as string[],
    };
    const breakdown = computeStrategyScore(scoreInput);
    const stage = derivePipelineStage(breakdown, scoreInput);
    const key = identityKey({ phone: rbo.phone, id: rbo.id });
    upsert(key, {
      id: key,
      kind: "lead",
      displayName: rbo.phone,
      email: null,
      phone: rbo.phone,
      sessionId: null,
      source: "reverse_buyer_origination",
      stage,
      score: breakdown.total,
      scoreBreakdown: breakdown,
      summary: [rbo.priceRange, rbo.targetCities?.join(", ")].filter(Boolean).join(" · ") || null,
      profileFacts: scoreInput.profileKeys || [],
      lastActivityAt: rbo.createdAt.toISOString(),
      createdAt: rbo.createdAt.toISOString(),
      rawRefs: { rboId: rbo.id },
    });
  }

  // Attach recent marketing signals to anonymous/session buckets
  for (const signal of signals) {
    if (!signal.sessionId && !signal.visitorId) continue;
    const key = identityKey({
      sessionId: signal.sessionId || signal.visitorId,
      id: signal.id,
    });
    if (peopleMap.has(key)) continue;
    const social = isSocialSource(signal.source, signal.referrer);
    const scoreInput = {
      socialSource: social,
      returning: signal.type === "returning_visit",
      messageCount: signal.type === "decision_guide_message" ? 1 : 0,
      reportUrl: signal.type === "report_view" ? signal.path : null,
      callRequested: signal.type === "call_request",
    };
    const breakdown = computeStrategyScore(scoreInput);
    peopleMap.set(key, {
      id: key,
      kind: "visitor",
      displayName: `Visitor ${(signal.sessionId || signal.visitorId || signal.id).slice(0, 8)}`,
      email: null,
      phone: null,
      sessionId: signal.sessionId || signal.visitorId || null,
      source: signal.source || signal.type,
      stage: derivePipelineStage(breakdown, scoreInput),
      score: breakdown.total,
      scoreBreakdown: breakdown,
      summary: signal.detail || signal.path || null,
      profileFacts: [signal.type],
      lastActivityAt: signal.createdAt.toISOString(),
      createdAt: signal.createdAt.toISOString(),
      rawRefs: {},
    });
  }

  const people = Array.from(peopleMap.values()).sort((a, b) => b.score - a.score);
  const pipeline = buildPipelineBoard(people);

  // Funnel from people + signals
  const funnelCounts = emptyFunnelCounts();
  funnelCounts.source = Math.max(
    people.length,
    new Set(signals.map((s) => s.sessionId || s.visitorId || s.id)).size,
  );
  funnelCounts.page = Math.max(
    people.length,
    signals.filter((s) => s.type === "page_view").length,
  );
  funnelCounts.conversation = people.filter(
    (p) =>
      p.source === "decision_guide" ||
      p.rawRefs.conversationId ||
      p.scoreBreakdown.signals.some((s) => s.type === "decision_guide_message"),
  ).length;
  funnelCounts.report = people.filter(
    (p) =>
      p.scoreBreakdown.signals.some((s) => s.type === "report_view") ||
      p.profileFacts.some((f) => /report|building/i.test(f)),
  ).length;
  funnelCounts.email = people.filter((p) => p.email).length;
  funnelCounts.call = people.filter(
    (p) => p.stage === "call_ready" || p.stage === "active" || p.rawRefs.contactId,
  ).length;
  funnelCounts.client = people.filter((p) => p.stage === "active").length;

  const stepOrder = [
    { id: "source" as const, label: "Source" },
    { id: "page" as const, label: "Page" },
    { id: "conversation" as const, label: "Conversation" },
    { id: "report" as const, label: "Report" },
    { id: "email" as const, label: "Email" },
    { id: "call" as const, label: "Call" },
    { id: "client" as const, label: "Client" },
  ];

  const conversionRates: AdminDashboard["funnel"]["conversionRates"] = [];
  for (let i = 0; i < stepOrder.length - 1; i++) {
    const from = stepOrder[i];
    const to = stepOrder[i + 1];
    const fromCount = funnelCounts[from.id] || 0;
    const toCount = funnelCounts[to.id] || 0;
    conversionRates.push({
      from: from.label,
      to: to.label,
      rate: fromCount > 0 ? Math.round((toCount / fromCount) * 100) : 0,
    });
  }

  const sourceMap = new Map<string, { count: number; scoreSum: number }>();
  for (const person of people) {
    const src = person.source || "unknown";
    const cur = sourceMap.get(src) || { count: 0, scoreSum: 0 };
    cur.count += 1;
    cur.scoreSum += person.score;
    sourceMap.set(src, cur);
  }
  const sources = Array.from(sourceMap.entries())
    .map(([source, v]) => ({
      source,
      count: v.count,
      avgScore: v.count ? Math.round(v.scoreSum / v.count) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Scoring analytics
  const bands = [
    { band: "Cold 0–24", min: 0, max: 24 },
    { band: "Warm 25–49", min: 25, max: 49 },
    { band: "Hot 50–74", min: 50, max: 74 },
    { band: "Priority 75–100", min: 75, max: 100 },
  ];
  const distribution = bands.map((b) => ({
    ...b,
    count: people.filter((p) => p.score >= b.min && p.score <= b.max).length,
  }));

  const signalAgg = new Map<string, { count: number; totalPoints: number }>();
  for (const person of people) {
    for (const sig of person.scoreBreakdown.signals) {
      const cur = signalAgg.get(sig.type) || { count: 0, totalPoints: 0 };
      cur.count += 1;
      cur.totalPoints += sig.points;
      signalAgg.set(sig.type, cur);
    }
  }
  const topSignals = Array.from(signalAgg.entries())
    .map(([type, v]) => ({ type, ...v }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 12);

  const scores = people.map((p) => p.score);
  const avgScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  const strategyNotes: string[] = [];
  const priority = people.filter((p) => p.score >= 75).length;
  const noIdentity = people.filter((p) => !p.email && !p.phone && p.score >= 30).length;
  const social = people.filter((p) => isSocialSource(p.source)).length;
  if (priority > 0) {
    strategyNotes.push(
      `${priority} priority lead${priority === 1 ? "" : "s"} (score 75+) — work call-ready first.`,
    );
  }
  if (noIdentity > 0) {
    strategyNotes.push(
      `${noIdentity} engaged visitor${noIdentity === 1 ? "" : "s"} still anonymous — push email/phone after value preview.`,
    );
  }
  if (funnelCounts.conversation > 0 && funnelCounts.email / funnelCounts.conversation < 0.25) {
    strategyNotes.push(
      "Conversation→email conversion is under 25%. Capture email after a meaningful Decision Brief preview.",
    );
  }
  if (social > 0) {
    strategyNotes.push(
      `${social} social-sourced contact${social === 1 ? "" : "s"} — tag campaign UTM and route high-intent DMs to call-ready.`,
    );
  }
  if (people.length === 0) {
    strategyNotes.push(
      "No CRM rows yet. Decision Guide chats, contact form, and /api/signals will populate this board.",
    );
  }
  if (strategyNotes.length === 0) {
    strategyNotes.push("Pipeline healthy — prioritize highest readiness scores for outreach today.");
  }

  const todayHigh = people
    .filter((p) => p.score >= 60)
    .slice(0, 8)
    .map((p) => ({
      id: p.id,
      label: p.displayName,
      detail: `${p.stage.replace(/_/g, " ")} · score ${p.score}`,
      score: p.score,
      stage: p.stage,
    }));

  const todayReturning = people
    .filter((p) => p.scoreBreakdown.signals.some((s) => s.type === "returning_visit"))
    .slice(0, 8)
    .map((p) => ({
      id: p.id,
      label: p.displayName,
      detail: p.source || "return visit",
      score: p.score,
      stage: p.stage,
    }));

  const profilesChanged = people
    .filter((p) => isToday(p.lastActivityAt) && p.profileFacts.length >= 2)
    .slice(0, 8)
    .map((p) => ({
      id: p.id,
      label: p.displayName,
      detail: p.profileFacts.slice(0, 4).join(", "),
      score: p.score,
      stage: p.stage,
    }));

  const reportsGenerated = people
    .filter(
      (p) =>
        p.scoreBreakdown.signals.some((s) => s.type === "report_view") ||
        Boolean(leads.find((l) => l.id === p.rawRefs.leadId && l.reportUrl)),
    )
    .slice(0, 8)
    .map((p) => ({
      id: p.id,
      label: p.displayName,
      detail: "Report / brief signal",
      score: p.score,
      stage: p.stage,
    }));

  const callsRequested = people
    .filter((p) => p.stage === "call_ready" || p.stage === "active" || p.rawRefs.contactId)
    .slice(0, 8)
    .map((p) => ({
      id: p.id,
      label: p.displayName,
      detail: p.email || p.phone || p.summary?.slice(0, 80) || "Call path",
      score: p.score,
      stage: p.stage,
    }));

  const needsFollowUp = people
    .filter(
      (p) =>
        (p.stage === "qualified" || p.stage === "call_ready" || p.stage === "profiled") &&
        (p.email || p.phone),
    )
    .slice(0, 10)
    .map((p) => ({
      id: p.id,
      label: p.displayName,
      detail: `Follow up · ${p.stage.replace(/_/g, " ")} · ${p.email || p.phone}`,
      score: p.score,
      stage: p.stage,
    }));

  return {
    generatedAt: new Date().toISOString(),
    storageMode: options.storageMode,
    pipeline,
    today: {
      highIntent: todayHigh,
      returning: todayReturning,
      profilesChanged,
      reportsGenerated,
      callsRequested,
      needsFollowUp,
    },
    funnel: {
      steps: stepOrder.map((s) => ({ ...s, count: funnelCounts[s.id] })),
      conversionRates,
      sources,
    },
    scoring: {
      distribution,
      topSignals,
      strategyNotes,
      avgScore,
      medianScore: median(scores),
    },
    people: people.slice(0, 100),
    recentSignals: signals
      .slice()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 40)
      .map((s) => ({
        id: s.id,
        type: s.type,
        source: s.source ?? null,
        path: s.path ?? null,
        detail: s.detail ?? null,
        at: s.createdAt.toISOString(),
      })),
    counts: {
      leads: leads.length,
      contacts: contacts.length,
      conversations: conversations.length,
      rboProfiles: rboProfiles.length,
      signals: signals.length,
    },
  };
}

/** Re-export for stage labels used by routes if needed */
export type { StrategyScoreBreakdown, PipelinePerson };
