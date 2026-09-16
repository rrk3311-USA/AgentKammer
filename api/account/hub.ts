import { ApiRequest, ApiResponse, getMemberFromRequest, publicHub, readCookie } from "./_shared.js";
import { loadMemberFromDatabase } from "./persist.js";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const header = req.headers.authorization || "";
    const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
    const cookieToken = readCookie(req.headers.cookie, "ak_member_token");
    if (!bearer && !cookieToken) {
      return res.status(401).json({ ok: false, error: "Sign in required" });
    }

    const session = getMemberFromRequest(req);
    if (!session) {
      return res.status(401).json({ ok: false, error: "Invalid or expired session" });
    }

    const member = await loadMemberFromDatabase(session.e, session);
    return res.status(200).json({ ok: true, hub: publicHub(member) });
  } catch (err) {
    console.error("Account hub error:", err);
    return res.status(500).json({ ok: false, error: "Failed to load Decision Hub" });
  }
}
