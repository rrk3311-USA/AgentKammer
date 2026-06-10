import nodemailer from "nodemailer";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
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

function buildContactHtml(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
    <p><strong>Message:</strong></p>
    <pre style="font-family: Georgia, serif; white-space: pre-wrap; line-height: 1.5;">${data.message}</pre>
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    <p><em>Reply directly to ${data.email}</em></p>
  `;
}

async function sendViaResend(to: string, subject: string, html: string, replyTo: string) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const result = await resend.emails.send({
    from: "Agent Kammer <onboarding@resend.dev>",
    to,
    replyTo,
    subject,
    html,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}

async function sendViaGmail(to: string, subject: string, html: string, replyTo: string) {
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
    replyTo,
    subject,
    html,
  });
}

async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const subject = `New Contact Form — ${data.name} — Agent Kammer`;
  const html = buildContactHtml(data);
  const recipients = [CONTACT_INBOX];
  if (CONTACT_FALLBACK_INBOX !== CONTACT_INBOX) {
    recipients.push(CONTACT_FALLBACK_INBOX);
  }

  if (process.env.RESEND_API_KEY) {
    for (const to of recipients) {
      try {
        await sendViaResend(to, subject, html, data.email);
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
    await sendViaGmail(CONTACT_INBOX, subject, html, data.email);
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
    const validated = contactSchema.parse({
      name: (body as { name?: string }).name?.trim(),
      email: (body as { email?: string }).email?.trim(),
      phone: (body as { phone?: string }).phone?.trim() || undefined,
      message: (body as { message?: string }).message?.trim(),
    });

    await sendContactEmail(validated);

    return res.status(200).json({
      ok: true,
      message: "Thank you! We'll be in touch within 24 hours.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid form data", details: error.errors });
    }
    console.error("Contact submission error:", error);
    return res.status(500).json({ error: "Failed to submit contact form" });
  }
}
