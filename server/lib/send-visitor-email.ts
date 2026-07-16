import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { Resend } from "resend";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const FROM_ADDRESS = process.env.ACCOUNT_EMAIL_FROM || "Agent Kammer <onboarding@resend.dev>";

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

export async function sendVisitorPinEmail(input: {
  email: string;
  pin: string;
  resumeUrl?: string;
}) {
  const resume = input.resumeUrl || "https://www.agentkammer.com/account";
  const subject = "Your Agent Kammer verification code";
  const html = `
    <div style="font-family: Georgia, serif; line-height: 1.6; color: #20242B;">
      <p>Your verification code is:</p>
      <p style="font-size: 28px; letter-spacing: 0.2em; font-weight: 600;">${input.pin}</p>
      <p>It expires in 15 minutes. Enter it to reopen your Decision Hub.</p>
      <p><a href="${resume}">Resume My Decision</a></p>
      <p style="color: #5c6570; font-size: 13px;">If you did not request this, you can ignore this email.</p>
    </div>
  `;
  const text = `Your Agent Kammer verification code is ${input.pin}. It expires in 15 minutes.\n\nResume: ${resume}`;

  if (resend) {
    try {
      const result = await resend.emails.send({
        from: FROM_ADDRESS,
        to: input.email,
        subject,
        html,
        text,
      });
      if (!result.error) {
        return { sent: true as const, provider: "resend" as const };
      }
      console.error("Resend PIN email error:", result.error.message);
    } catch (err) {
      console.error("Resend PIN email error:", err);
    }
  }

  if (emailTransporter && EMAIL_USER) {
    try {
      await emailTransporter.sendMail({
        from: `Agent Kammer <${EMAIL_USER}>`,
        to: input.email,
        subject,
        html,
        text,
      });
      return { sent: true as const, provider: "gmail" as const };
    } catch (err) {
      console.error("Gmail PIN email error:", err);
    }
  }

  return { sent: false as const, provider: null };
}
