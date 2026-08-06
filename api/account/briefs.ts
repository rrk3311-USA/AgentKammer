import {
  ApiRequest,
  ApiResponse,
  appendBrief,
  capDecisionMap,
  getMemberFromRequest,
  getOrCreateVisitorId,
  normalizeEmail,
  parseBody,
  publicHub,
  setMemberCookie,
} from "./_shared.js";

// Save a recommendation brief into the member's Decision Hub. Only
// authenticated members (verified email + PIN / cookie session) - never
// save a brief by email alone.
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body = parseBody(req);
    getOrCreateVisitorId(req, res);

    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const title = typeof body.title === "string" ? body.title.trim() : "Decision recommendation brief";
    const briefBody = typeof body.body === "string" ? body.body.trim() : "";
    if (!briefBody) {
      return res.status(400).json({ ok: false, error: "Brief body is required" });
    }

    const member = getMemberFromRequest(req);
    if (!member) {
      return res.status(401).json({
        ok: false,
        needsVerification: true,
        error: email
          ? "Verify your email with the PIN we send before saving briefs to your Decision Hub."
          : "Create an account first so recommendation briefs can be saved to your Decision Hub.",
      });
    }

    const decisionMap = capDecisionMap(body.decisionMap);
    const score = typeof body.score === "number" ? body.score : null;
    const source = body.source === "recap" ? "recap" : "manual";

    const { member: nextMember, brief } = appendBrief(member, {
      title,
      body: briefBody,
      source,
      score,
      decisionMap,
    });

    setMemberCookie(res, nextMember);

    return res.status(200).json({
      ok: true,
      brief: { id: brief.id, title: brief.t, body: brief.b, source: brief.src, score: brief.sc, createdAt: brief.ca },
      hub: publicHub(nextMember),
    });
  } catch (err) {
    console.error("Account brief error:", err);
    return res.status(500).json({ ok: false, error: "Failed to save recommendation brief" });
  }
}
