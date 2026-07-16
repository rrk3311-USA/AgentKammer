import {
  ApiRequest,
  ApiResponse,
  generatePin,
  getCooldownWaitMs,
  getOrCreateVisitorId,
  hashPin,
  normalizeEmail,
  parseBody,
  sendPinEmail,
  setCooldownCookie,
  setPendingOtpCookie,
} from "./_shared";

// Start email + PIN verification (does not issue a member session).
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body = parseBody(req);
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    if (!email || !email.includes("@")) {
      return res.status(400).json({ ok: false, error: "Valid email is required" });
    }

    const now = Date.now();
    const waitMs = getCooldownWaitMs(req, now);
    if (waitMs > 0) {
      return res.status(429).json({
        ok: false,
        error: "Please wait a moment before requesting another code.",
        waitMs,
      });
    }

    const visitorId = getOrCreateVisitorId(req, res);
    const pin = generatePin();

    setPendingOtpCookie(res, {
      e: email,
      h: hashPin(email, pin),
      v: visitorId,
      a: typeof body.assistantSessionId === "string" ? body.assistantSessionId : null,
      s: typeof body.signalSessionId === "string" ? body.signalSessionId : null,
      d: typeof body.displayName === "string" ? body.displayName : null,
      at: 0,
      exp: now + 15 * 60 * 1000,
    });
    setCooldownCookie(res, now);

    const mail = await sendPinEmail(email, pin);

    const payload: Record<string, unknown> = {
      ok: true,
      needsVerification: true,
      email,
      message: mail.sent
        ? "We sent a 6-digit code to your email. Enter it to open your Decision Hub."
        : "Enter the verification code to open your Decision Hub.",
    };

    // Never expose the PIN in production responses or logs.
    if (!mail.sent && process.env.NODE_ENV !== "production") {
      payload.devPin = pin;
      console.info(`[account-otp] PIN for ${email}: ${pin}`);
    }

    return res.status(200).json(payload);
  } catch (err) {
    console.error("Account claim error:", err);
    return res.status(500).json({ ok: false, error: "Failed to start verification" });
  }
}
