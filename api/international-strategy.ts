import nodemailer from "nodemailer";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email().max(320),
  country: z.string().min(1).max(120),
  city: z.string().max(120).optional().nullable(),
  preferredLanguage: z.string().min(1).max(80),
  contactMethod: z.string().min(1).max(40),
  contactDetail: z.string().max(200).optional().nullable(),
  buyingGoal: z.string().min(1).max(120),
  budget: z.string().min(1).max(80),
  timeline: z.string().min(1).max(80),
  financing: z.string().min(1).max(80),
  neighborhoods: z.array(z.string().max(80)).max(20).optional().default([]),
  helpUnderstanding: z.string().max(4000).optional().nullable(),
  howFound: z.string().max(200).optional().nullable(),
  sourcePage: z.string().max(200).optional().nullable(),
  countrySlug: z.string().max(40).optional().nullable(),
});

const CONTACT_INBOX = process.env.CONTACT_INBOX || "info@agentkammer.com";
const CONTACT_FALLBACK_INBOX = process.env.CONTACT_FALLBACK_INBOX || "rrk3311@gmail.com";

type ApiRequest = { method?: string; body?: unknown };
type ApiResponse = { status: (code: number) => { json: (body: unknown) => void } };

function buildMessage(data: z.infer<typeof schema>) {
  return [
    "International Manhattan Strategy Request",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Country: ${data.country}`,
    data.city ? `City: ${data.city}` : null,
    `Preferred language: ${data.preferredLanguage}`,
    `Contact method: ${data.contactMethod}`,
    data.contactDetail ? `Contact detail: ${data.contactDetail}` : null,
    `Buying goal: ${data.buyingGoal}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
    `Financing: ${data.financing}`,
    data.neighborhoods?.length ? `Neighborhoods: ${data.neighborhoods.join(", ")}` : null,
    data.helpUnderstanding ? `Help understanding: ${data.helpUnderstanding}` : null,
    data.sourcePage ? `Source page: ${data.sourcePage}` : null,
    "",
    "ACTION: Assign a specialist who speaks the preferred language and follow up personally.",
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendEmail(data: z.infer<typeof schema>) {
  const subject = `International Strategy — ${data.preferredLanguage} — ${data.fullName}`;
  const html = `
    <h2>International Strategy Request</h2>
    <p><strong>Language match required:</strong> ${data.preferredLanguage}</p>
    <p>After submission, a specialist who speaks this language should get in touch.</p>
    <pre style="white-space:pre-wrap;font-family:Georgia,serif;line-height:1.5">${buildMessage(data)}</pre>
  `;
  const recipients = [CONTACT_INBOX];
  if (CONTACT_FALLBACK_INBOX !== CONTACT_INBOX) recipients.push(CONTACT_FALLBACK_INBOX);

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    for (const to of recipients) {
      try {
        const result = await resend.emails.send({
          from: "Agent Kammer <onboarding@resend.dev>",
          to,
          replyTo: data.email,
          subject,
          html,
        });
        if (result.error) throw new Error(result.error.message);
        return;
      } catch (err) {
        if (to === recipients[recipients.length - 1]) throw err;
      }
    }
    return;
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.sendMail({
      from: `Agent Kammer <${process.env.EMAIL_USER}>`,
      to: CONTACT_INBOX,
      replyTo: data.email,
      subject,
      html,
    });
    return;
  }

  console.log("[international-strategy] no email provider; logged only", data.email, data.preferredLanguage);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const validated = schema.parse(body);
    await sendEmail(validated);
    return res.status(200).json({
      ok: true,
      message:
        "A specialist who speaks your language will get in touch to review your goals and recommend the next step.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid form data", details: error.errors });
    }
    console.error("international-strategy error", error);
    return res.status(500).json({ error: "Failed to submit strategy request" });
  }
}
