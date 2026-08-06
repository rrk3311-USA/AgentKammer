import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { Resend } from "resend";

const CONTACT_INBOX = process.env.CONTACT_INBOX || "info@agentkammer.com";
const CONTACT_FALLBACK_INBOX = process.env.CONTACT_FALLBACK_INBOX || "rrk3311@gmail.com";
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

let emailTransporter: Transporter | null = null;
if (EMAIL_USER && EMAIL_PASS) {
  emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
}

async function notifyTelegram(name: string, phone?: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: `📥 New Contact Form\nName: ${name}\n${phone ? `Phone: ${phone}\n` : ""}Time: ${new Date().toLocaleString()}`,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    console.error("Telegram notify error:", err);
  }
}

export async function notifyContactSubmission(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const subject = `New Contact Form - ${data.name} - Agent Kammer`;
  const htmlContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
    <p><strong>Message:</strong></p>
    <pre style="font-family: Georgia, serif; white-space: pre-wrap; line-height: 1.5;">${data.message}</pre>
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    <p><em>Reply directly to ${data.email}</em></p>
  `;

  await notifyTelegram(data.name, data.phone);

  if (resend) {
    const recipients = [CONTACT_INBOX];
    if (CONTACT_FALLBACK_INBOX !== CONTACT_INBOX) {
      recipients.push(CONTACT_FALLBACK_INBOX);
    }

    for (const to of recipients) {
      try {
        const result = await resend.emails.send({
          from: "Agent Kammer <onboarding@resend.dev>",
          to,
          replyTo: data.email,
          subject,
          html: htmlContent,
        });
        if (!result.error) return;
        const message = result.error.message;
        const isSandboxRestriction = message.includes("only send testing emails");
        if (!isSandboxRestriction || to === recipients[recipients.length - 1]) {
          console.error("Resend contact notify error:", message);
          if (to === recipients[recipients.length - 1]) break;
        }
      } catch (err) {
        console.error("Resend contact notify error:", err);
        if (to === recipients[recipients.length - 1]) break;
      }
    }
  }

  if (emailTransporter && EMAIL_USER) {
    try {
      await emailTransporter.sendMail({
        from: `Agent Kammer <${EMAIL_USER}>`,
        to: CONTACT_INBOX,
        replyTo: data.email,
        subject,
        html: htmlContent,
      });
      return;
    } catch (err) {
      console.error("Email contact notify error:", err);
    }
  }

  console.warn(
    `Contact submission received but email not sent - configure RESEND_API_KEY or EMAIL_USER/EMAIL_PASS. Inbox: ${CONTACT_INBOX}`,
  );
}
