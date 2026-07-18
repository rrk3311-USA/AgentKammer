import { createHmac, timingSafeEqual } from "crypto";
import type { Request } from "express";

/** Verify Attio webhook signature when ATTIO_WEBHOOK_SECRET is set. */
export function verifyAttioWebhookSignature(req: Request, rawBody: string): boolean {
  const secret = process.env.ATTIO_WEBHOOK_SECRET?.trim();
  if (!secret) return false;

  const header =
    (req.headers["attio-signature"] as string | undefined) ||
    (req.headers["x-attio-signature"] as string | undefined);
  if (!header) return false;

  const digest = createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    const a = Buffer.from(digest);
    const b = Buffer.from(header.replace(/^sha256=/, ""));
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
