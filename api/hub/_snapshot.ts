import { nextStepForRoute } from "../../shared/get-qualified.js";
import { resolveHubProgress } from "../../server/lib/get-qualified.js";
import { unsignProgress } from "../../server/lib/hub-progress-cookie.js";
import { getMemberFromRequest, readCookie } from "../account/_shared.js";

type ApiRequest = {
  method?: string;
  headers: { cookie?: string; authorization?: string };
};

type ApiResponse = {
  status: (code: number) => { json: (body: unknown) => void };
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const member = getMemberFromRequest(req);
    const progressCookie = unsignProgress(readCookie(req.headers.cookie, "ak_hub_progress"));
    const email = member?.e || progressCookie?.e || null;

    const progress = await resolveHubProgress({
      email,
      memberId: member?.id || null,
      cookie: progressCookie,
    });

    if (!progress.getQualifiedComplete && !member) {
      return res.status(404).json({
        error: "No housing profile yet. Start the Decision Guide to begin.",
      });
    }

    const qualifyNext = progress.qualifyRoute ? nextStepForRoute(progress.qualifyRoute) : null;

    return res.status(200).json({
      hub: {
        visitorId: member?.id || "qualify",
        email: email || null,
        displayName: member?.dn || progressCookie?.n || null,
        currentObjective: progress.getQualifiedComplete
          ? "Your plan is waiting"
          : member?.g || "Clarify what is changing",
        timeline: null,
        nextRecommendedStep: qualifyNext || "Ask another question in the Decision Guide",
        conversationSummary: null,
        upcomingReview: null,
        roadmapMilestone: member?.ps || "exploring",
        getQualifiedComplete: progress.getQualifiedComplete,
        sessionBooked: progress.sessionBooked,
        strategySessionHeld: progress.strategySessionHeld,
        qualifyRoute: progress.qualifyRoute,
        calendarUrl:
          progress.qualifyRoute === "raphi_calendar" ? process.env.RAPHI_CALENDAR_URL || null : null,
        diegoUrl: progress.qualifyRoute === "diego_handoff" ? process.env.DIEGO_ELLIMAN_URL || null : null,
        goals: [],
        saved: [],
        reviews: [],
      },
    });
  } catch (error) {
    console.error("[hub/snapshot] failed", error);
    return res.status(500).json({ error: "Failed to load hub" });
  }
}
