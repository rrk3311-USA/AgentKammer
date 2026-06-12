import nodemailer from "nodemailer";
import { Resend } from "resend";
import { z } from "zod";

const leadSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  name: z.string().optional(),
  leadSource: z.string().min(1),
  conversationSummary: z.string().optional(),
  communicationStyle: z.string().optional(),
  leadScore: z.number().optional(),
  marketInterest: z.string().optional(),
  reportUrl: z.string().optional(),
  audiobookTitle: z.string().optional(),
});

const CONTACT_INBOX = process.env.CONTACT_INBOX || "info@successchemistry.com";
const CONTACT_FALLBACK_INBOX = process.env.CONTACT_FALLBACK_INBOX || "rrk3311@gmail.com";

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => { json: (body: unknown) => void };
};

function buildLeadHtml(data: z.infer<typeof leadSchema>) {
  const rows = Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `<p><strong>${key}:</strong> ${String(value)}</p>`)
    .join("");

  return `
    <h2>New Lead — ${data.leadSource}</h2>
    ${rows}
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    ${data.email ? `<p><em>Reply directly to ${data.email}</em></p>` : ""}
  `;
}

async function sendViaResend(to: string, subject: string, html: string, replyTo?: string) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const result = await resend.emails.send({
    from: "Agent Kammer <onboarding@resend.dev>",
    to,
    replyTo: replyTo || CONTACT_INBOX,
    subject,
    html,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}

async function sendViaGmail(to: string, subject: string, html: string, replyTo?: string) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  if (!emailUser || !emailPass) {
    throw new Error("Gmail not configured");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: emailUser, pass: emailPass },
  });

  await transporter.sendMail({
    from: `Agent Kammer <${emailUser}>`,
    to,
    replyTo: replyTo || emailUser,
    subject,
    html,
  });
}

async function notifyLead(data: z.infer<typeof leadSchema>) {
  const subject = `New Lead — ${data.leadSource} — Agent Kammer`;
  const html = buildLeadHtml(data);
  const replyTo = data.email;
  const recipients = [CONTACT_INBOX];
  if (CONTACT_FALLBACK_INBOX !== CONTACT_INBOX) {
    recipients.push(CONTACT_FALLBACK_INBOX);
  }

  if (process.env.RESEND_API_KEY) {
    for (const to of recipients) {
      try {
        await sendViaResend(to, subject, html, replyTo);
        return;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        const isSandboxRestriction = message.includes("only send testing emails");
        if (!isSandboxRestriction || to === recipients[recipients.length - 1]) {
          if (to === recipients[recipients.length - 1]) throw err;
        }
      }
    }
    return;
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    await sendViaGmail(CONTACT_INBOX, subject, html, replyTo);
    return;
  }

  throw new Error("No email provider configured on server");
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const validated = leadSchema.parse(body);

    if (!validated.email && !validated.phone) {
      return res.status(400).json({ error: "Email or phone required" });
    }

    await notifyLead(validated);

    return res.status(200).json({
      ok: true,
      id: crypto.randomUUID(),
      leadSource: validated.leadSource,
      email: validated.email ?? null,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid lead data", details: error.errors });
    }
    console.error("Lead submission error:", error);
    return res.status(500).json({ error: "Failed to save lead" });
  }
}
