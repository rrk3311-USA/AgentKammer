import { randomUUID } from "crypto";
import type { ChatConversation, MemberProfile } from "@shared/schema";
import type { IStorage } from "../storage";

export type RecommendationBrief = {
  id: string;
  title: string;
  body: string;
  source: "decision_guide" | "recap" | "claim" | "manual";
  score?: number | null;
  createdAt: string;
  decisionMap?: Record<string, unknown> | null;
};

function unique(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.filter((v): v is string => Boolean(v && v.trim()))));
}

function parseSummary(conversation?: ChatConversation | null) {
  if (!conversation?.summary) return {} as Record<string, any>;
  try {
    return JSON.parse(conversation.summary);
  } catch {
    return {} as Record<string, any>;
  }
}

export function parseMemberBriefs(member?: MemberProfile | null): RecommendationBrief[] {
  if (!member?.briefs) return [];
  try {
    const parsed = JSON.parse(member.briefs);
    return Array.isArray(parsed) ? (parsed as RecommendationBrief[]) : [];
  } catch {
    return [];
  }
}

function profileFromConversation(conversation?: ChatConversation | null) {
  const summary = parseSummary(conversation);
  const profile = summary.profile && typeof summary.profile === "object" ? summary.profile : {};
  const structured =
    summary.structuredProfile && typeof summary.structuredProfile === "object"
      ? summary.structuredProfile
      : {};

  const situation = profile.situation || structured.situation?.value || null;
  const desire = profile.desire || structured.desire?.value || null;
  const constraints = profile.constraints || structured.constraints?.value || null;
  const tradeOff = profile.tradeOff || structured.tradeOff?.value || null;

  return {
    situation,
    desire,
    constraints,
    tradeOff,
    timeline: profile.timeline || null,
    budget: profile.budget || null,
    email: profile.email || conversation?.leadEmail || null,
    phone: profile.phone || conversation?.leadPhone || null,
    leadScore: conversation?.leadScore ?? summary.leadQualification?.score ?? 0,
    qualification: summary.leadQualification ?? null,
    decisionMap: {
      situation,
      desire,
      constraints,
      tradeOff,
      recommendation: summary.leadQualification?.summary || null,
      missing: summary.leadQualification?.missing || [],
    },
  };
}

export async function appendRecommendationBrief(
  storage: IStorage,
  member: MemberProfile,
  brief: Omit<RecommendationBrief, "id" | "createdAt"> & { id?: string; createdAt?: string },
) {
  const existing = parseMemberBriefs(member);
  const next: RecommendationBrief = {
    id: brief.id || `brief_${randomUUID()}`,
    title: brief.title.slice(0, 160),
    body: brief.body.slice(0, 8000),
    source: brief.source,
    score: brief.score ?? null,
    createdAt: brief.createdAt || new Date().toISOString(),
    decisionMap: brief.decisionMap || null,
  };

  // Dedupe near-identical titles within 2 minutes
  const filtered = existing.filter((item) => {
    if (item.title !== next.title) return true;
    const delta = Math.abs(new Date(next.createdAt).getTime() - new Date(item.createdAt).getTime());
    return delta > 2 * 60 * 1000;
  });

  const briefs = [next, ...filtered].slice(0, 40);
  const updated = await storage.updateMemberProfile(member.id, {
    briefs: JSON.stringify(briefs),
    decisionMap: next.decisionMap ? JSON.stringify(next.decisionMap) : member.decisionMap,
    goals: (next.decisionMap?.desire as string) || member.goals,
    vision: (next.decisionMap?.situation as string) || member.vision,
    priorities: (next.decisionMap?.tradeOff as string) || (next.decisionMap?.constraints as string) || member.priorities,
  });

  return { member: updated || member, brief: next, briefs };
}

export async function findMemberForVisitor(
  storage: IStorage,
  input: { visitorId?: string | null; email?: string | null; accessToken?: string | null },
) {
  if (input.accessToken) {
    const byToken = await storage.getMemberProfileByAccessToken(input.accessToken);
    if (byToken) return byToken;
  }
  if (input.email) {
    const byEmail = await storage.getMemberProfileByEmail(input.email.trim().toLowerCase());
    if (byEmail) return byEmail;
  }
  if (input.visitorId) {
    return storage.getMemberProfileByVisitorId(input.visitorId);
  }
  return undefined;
}

export async function claimVisitorToMember(
  storage: IStorage,
  input: {
    email: string;
    visitorId?: string | null;
    assistantSessionId?: string | null;
    signalSessionId?: string | null;
    displayName?: string | null;
  },
) {
  const email = input.email.trim().toLowerCase();
  const sessionCandidates = unique([
    input.visitorId,
    input.assistantSessionId,
    input.signalSessionId,
  ]);

  const conversations: ChatConversation[] = [];
  for (const sessionId of sessionCandidates) {
    const found = await storage.getChatConversationBySessionId(sessionId);
    if (found) conversations.push(found);
  }

  const primary =
    conversations.sort((a, b) => {
      const aScore = (a.summary?.length || 0) + (a.messages?.length || 0);
      const bScore = (b.summary?.length || 0) + (b.messages?.length || 0);
      return bScore - aScore;
    })[0] || null;

  const extracted = profileFromConversation(primary);
  const goals = extracted.desire || extracted.situation || null;
  const vision = extracted.situation || null;
  const priorities = extracted.tradeOff || extracted.constraints || null;
  const decisionMap = JSON.stringify(extracted.decisionMap);

  let member = await storage.getMemberProfileByEmail(email);
  const visitorIds = unique([...(member?.visitorIds || []), ...sessionCandidates]);
  const conversationIds = unique([
    ...(member?.conversationIds || []),
    ...conversations.map((c) => c.id),
  ]);

  // Seed a first brief from claimed chat recommendation if present
  const seededBriefs = parseMemberBriefs(member);
  if (extracted.decisionMap.recommendation || extracted.qualification?.summary) {
    const title = "Decision recommendation";
    const body = [
      extracted.decisionMap.recommendation || extracted.qualification?.summary,
      extracted.situation ? `Situation: ${extracted.situation}` : null,
      extracted.desire ? `Goal: ${extracted.desire}` : null,
      extracted.constraints ? `Constraints: ${extracted.constraints}` : null,
      extracted.tradeOff ? `Priority: ${extracted.tradeOff}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    if (body && !seededBriefs.some((b) => b.body === body)) {
      seededBriefs.unshift({
        id: `brief_${randomUUID()}`,
        title,
        body,
        source: "claim",
        score: Number(extracted.leadScore) || null,
        createdAt: new Date().toISOString(),
        decisionMap: extracted.decisionMap,
      });
    }
  }

  if (member) {
    member = (await storage.updateMemberProfile(member.id, {
      displayName: input.displayName || member.displayName || "Decision Hub Member",
      visitorIds,
      conversationIds,
      goals: goals || member.goals,
      vision: vision || member.vision,
      priorities: priorities || member.priorities,
      decisionMap: decisionMap || member.decisionMap,
      briefs: JSON.stringify(seededBriefs.slice(0, 40)),
      lastVisitorId: input.visitorId || member.lastVisitorId,
      progressStage: member.progressStage || "exploring",
    })) as MemberProfile;
  } else {
    member = await storage.createMemberProfile({
      email,
      displayName: input.displayName || "Decision Hub Member",
      accessToken: `akm_${randomUUID()}`,
      visitorIds,
      conversationIds,
      goals,
      vision,
      priorities,
      decisionMap,
      briefs: JSON.stringify(seededBriefs.slice(0, 40)),
      progressStage: "exploring",
      lastVisitorId: input.visitorId || sessionCandidates[0] || null,
    });
  }

  for (const conversation of conversations) {
    if (!conversation.leadEmail) {
      await storage.updateChatConversation(conversation.id, {
        leadEmail: email,
        leadName: member.displayName || "Decision Hub Member",
      });
    }
  }

  let leadId = member.leadId || null;
  if (!leadId) {
    const lead = await storage.createLead({
      name: member.displayName || "Decision Hub Member",
      email,
      phone: extracted.phone || undefined,
      timeline: extracted.timeline || extracted.constraints || undefined,
      motivation: extracted.situation || undefined,
      commitment: extracted.tradeOff || undefined,
      financing: extracted.budget || undefined,
      conversationSummary: primary?.summary || JSON.stringify(extracted.decisionMap),
      leadScore: Math.round(Number(extracted.leadScore) || 0),
      marketInterest: extracted.desire || undefined,
      leadSource: "decision_hub_claim",
      communicationStyle: "Decision Hub account claim",
    });
    leadId = lead.id;
    member = (await storage.updateMemberProfile(member.id, { leadId })) as MemberProfile;
  }

  await storage.createContactSubmission({
    name: member.displayName || "Decision Hub Member",
    email,
    message: [
      "Account claimed: Decision Hub member profile",
      `Visitor IDs: ${visitorIds.join(", ") || "none"}`,
      `Conversations claimed: ${conversationIds.length}`,
      `Briefs: ${seededBriefs.length}`,
      `Goals: ${goals || "n/a"}`,
      `Vision: ${vision || "n/a"}`,
    ].join("\n"),
  });

  return {
    member,
    claimedConversations: conversations.length,
    claimedSessions: sessionCandidates,
    decisionMap: extracted.decisionMap,
    hasChatHistory: conversations.length > 0,
    briefs: parseMemberBriefs(member),
  };
}

export function publicMemberHub(member: MemberProfile, decisionMap?: Record<string, unknown> | null) {
  let map = decisionMap || null;
  if (!map && member.decisionMap) {
    try {
      map = JSON.parse(member.decisionMap);
    } catch {
      map = null;
    }
  }

  return {
    id: member.id,
    email: member.email,
    displayName: member.displayName,
    goals: member.goals,
    vision: member.vision,
    priorities: member.priorities,
    progressStage: member.progressStage || "exploring",
    decisionMap: map,
    briefs: parseMemberBriefs(member),
    conversationCount: member.conversationIds?.length || 0,
    visitorCount: member.visitorIds?.length || 0,
    updatedAt: member.updatedAt,
  };
}
