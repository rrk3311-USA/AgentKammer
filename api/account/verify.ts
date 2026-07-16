import {
  ApiRequest,
  ApiResponse,
  MAX_ATTEMPTS,
  clearPendingOtpCookie,
  createOrMergeMember,
  getMemberFromRequest,
  getOrCreateVisitorId,
  getPendingOtp,
  hashPin,
  normalizeEmail,
  parseBody,
  publicHub,
  setMemberCookie,
  setPendingOtpCookie,
} from "./_shared.js";

// Verify PIN and issue a signed, httpOnly member session cookie.
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body = parseBody(req);
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const pin = typeof body.pin === "string" ? body.pin.trim() : "";
    if (!email || !email.includes("@") || !/^\d{6}$/.test(pin)) {
      return res.status(400).json({ ok: false, error: "Email and 6-digit code are required" });
    }

    const pending = getPendingOtp(req);
    if (!pending || pending.e !== email) {
      return res.status(401).json({ ok: false, error: "No pending verification for this email. Request a new code." });
    }
    if (Date.now() > pending.exp) {
      clearPendingOtpCookie(res);
      return res.status(401).json({ ok: false, error: "That code expired. Request a new one." });
    }
    if (pending.at >= MAX_ATTEMPTS) {
      clearPendingOtpCookie(res);
      return res.status(401).json({ ok: false, error: "Too many attempts. Request a new code." });
    }
    if (pending.h !== hashPin(email, pin)) {
      // Re-sign the same pending payload with an incremented attempt count so
      // brute-forcing the 6-digit PIN is still bounded even though state
      // lives in the (httpOnly, HMAC-signed) cookie rather than a server DB.
      setPendingOtpCookie(res, { ...pending, at: pending.at + 1 });
      return res.status(401).json({ ok: false, error: "Incorrect code. Try again." });
    }
    clearPendingOtpCookie(res);

    const visitorId = getOrCreateVisitorId(req, res);
    const existing = getMemberFromRequest(req);
    const member = createOrMergeMember(email, existing, {
      visitorId: pending.v || visitorId,
      displayName: pending.d,
    });

    setMemberCookie(res, member);

    return res.status(200).json({
      ok: true,
      verified: true,
      claimedConversations: 0,
      hasChatHistory: false,
      hub: publicHub(member),
    });
  } catch (err) {
    console.error("Account verify error:", err);
    return res.status(500).json({ ok: false, error: "Failed to verify code" });
  }
}
