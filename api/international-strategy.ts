import nodemailer from "nodemailer";
import { Resend } from "resend";
import { z } from "zod";

/**
 * Production serverless handler for International Strategy forms.
 * Always emails ops. When Attio env is present, also upserts CRM records
 * (People + Housing Advisory + Lead Pipeline) so leads are not inbox-only.
 */

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
  wantRoadmap: z.boolean().optional().default(false),
  sourcePage: z.string().max(200).optional().nullable(),
  countrySlug: z.string().max(40).optional().nullable(),
  referrer: z.string().max(500).optional().nullable(),
  utmSource: z.string().max(120).optional().nullable(),
  utmMedium: z.string().max(120).optional().nullable(),
  utmCampaign: z.string().max(120).optional().nullable(),
  landingLanguage: z.string().max(40).optional().nullable(),
});

type Payload = z.infer<typeof schema>;

const CONTACT_INBOX = process.env.CONTACT_INBOX || "info@agentkammer.com";
const CONTACT_FALLBACK_INBOX = process.env.CONTACT_FALLBACK_INBOX || "rrk3311@gmail.com";
const ATTIO_BASE = "https://api.attio.com/v2";

type ApiRequest = { method?: string; body?: unknown };
type ApiResponse = { status: (code: number) => { json: (body: unknown) => void } };

function budgetPoints(budget: string): number {
  if (budget.includes("10M")) return 25;
  if (budget.includes("5M")) return 22;
  if (budget.includes("3M")) return 18;
  if (budget.includes("1M")) return 12;
  return 4;
}

function timelinePoints(timeline: string): number {
  const t = timeline.toLowerCase();
  if (t.includes("ready now") || t.includes("within 3")) return 25;
  if (t.includes("3–6") || t.includes("3-6")) return 18;
  if (t.includes("6–12") || t.includes("6-12")) return 10;
  if (t.includes("more than") || t.includes("researching")) return 4;
  return 8;
}

function classify(data: Payload) {
  let score = 20;
  score += budgetPoints(data.budget);
  score += timelinePoints(data.timeline);
  if (data.neighborhoods?.length && !data.neighborhoods.includes("Not sure yet")) score += 8;
  if ((data.helpUnderstanding || "").trim().length > 40) score += 10;
  if (data.financing === "Cash purchase" || data.financing === "Both options") score += 6;
  if (data.wantRoadmap) score += 4;
  score = Math.max(0, Math.min(100, score));

  const urgent =
    /ready now|within 3/i.test(data.timeline) &&
    (data.budget.includes("3M") || data.budget.includes("5M") || data.budget.includes("10M"));

  let status = "Early Research";
  let nextAction = data.wantRoadmap ? "Send Manhattan Buying Roadmap" : "Follow up in 30 days";
  let lifecycleStage = "engaged";

  if (score < 20) {
    status = "Spam / Low Intent";
    nextAction = "No action";
    lifecycleStage = "inactive";
  } else if (urgent && score >= 70) {
    status = "Ready for Call";
    nextAction = "Schedule Housing Strategy Session";
    lifecycleStage = "call_ready";
  } else if (data.wantRoadmap && /6–12|6-12|more than|researching/i.test(data.timeline)) {
    status = "Early Research";
    nextAction = "Send Manhattan Buying Roadmap";
    lifecycleStage = "engaged";
  } else if (score >= 55) {
    status = "Qualified Nurture";
    nextAction = data.wantRoadmap
      ? "Send Manhattan Buying Roadmap"
      : "Language-match specialist follow-up";
    lifecycleStage = "qualified";
  }

  const neighborhoods =
    data.neighborhoods?.filter((n) => n !== "Not sure yet").join(" and ") || "Manhattan broadly";
  const concern = (data.helpUnderstanding || "").trim() || "general process clarity";
  const aiSummary = [
    `Buyer from ${data.country} researching a ${data.budget} Manhattan purchase (${data.buyingGoal}).`,
    `Timeline: ${data.timeline}. Financing: ${data.financing}.`,
    `Neighborhood focus: ${neighborhoods}.`,
    `Primary concern: ${concern.slice(0, 180)}.`,
    data.wantRoadmap ? "Requested a personalized Manhattan Buying Roadmap." : null,
    `Preferred language: ${data.preferredLanguage}. Status: ${status}.`,
  ]
    .filter(Boolean)
    .join(" ");

  return { status, leadScore: score, nextAction, lifecycleStage, aiSummary };
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { firstName: parts[0] || fullName, lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function buildMessage(data: Payload, classified: ReturnType<typeof classify>) {
  return [
    "International Manhattan Strategy Request",
    `Status: ${classified.status} · Score: ${classified.leadScore}`,
    `Next action: ${classified.nextAction}`,
    `Language: ${data.preferredLanguage} — assign matching specialist`,
    "",
    classified.aiSummary,
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Country: ${data.country}`,
    data.city ? `City: ${data.city}` : null,
    `Contact: ${data.contactMethod}${data.contactDetail ? ` · ${data.contactDetail}` : ""}`,
    `Goal: ${data.buyingGoal}`,
    `Budget: ${data.budget} · Timeline: ${data.timeline} · Financing: ${data.financing}`,
    data.neighborhoods?.length ? `Neighborhoods: ${data.neighborhoods.join(", ")}` : null,
    data.helpUnderstanding ? `Biggest question: ${data.helpUnderstanding}` : null,
    `Want roadmap: ${data.wantRoadmap ? "Yes" : "No"}`,
    data.howFound ? `How found: ${data.howFound}` : null,
    data.sourcePage ? `Landing page: ${data.sourcePage}` : null,
    data.countrySlug ? `Country page: ${data.countrySlug}` : null,
    data.landingLanguage ? `Language version: ${data.landingLanguage}` : null,
    data.referrer ? `Referrer: ${data.referrer}` : null,
    [data.utmSource, data.utmMedium, data.utmCampaign].some(Boolean)
      ? `UTM: ${[data.utmSource, data.utmMedium, data.utmCampaign].filter(Boolean).join(" / ")}`
      : null,
    "",
    "CRM: Upserted to Attio when ATTIO_API_KEY is configured on Vercel.",
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendEmail(data: Payload, classified: ReturnType<typeof classify>) {
  const subject = `Intl Strategy [${classified.status}] — ${data.preferredLanguage} — ${data.fullName}`;
  const html = `
    <h2>International Strategy Request</h2>
    <p><strong>Status:</strong> ${classified.status} · Score ${classified.leadScore}</p>
    <p><strong>Next action:</strong> ${classified.nextAction}</p>
    <p><strong>Language match required:</strong> ${data.preferredLanguage}</p>
    <pre style="white-space:pre-wrap;font-family:Georgia,serif;line-height:1.5">${buildMessage(data, classified)}</pre>
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
        return { channel: "resend" as const };
      } catch (err) {
        if (to === recipients[recipients.length - 1]) throw err;
      }
    }
    return { channel: "resend" as const };
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
    return { channel: "gmail" as const };
  }

  console.log("[international-strategy] no email provider; logged only", data.email);
  return { channel: "log" as const };
}

async function attioRequest(path: string, method: string, body?: unknown) {
  const apiKey = process.env.ATTIO_API_KEY?.trim();
  if (!apiKey) return null;
  const res = await fetch(`${ATTIO_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Attio ${method} ${path} (${res.status}): ${text.slice(0, 400)}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

async function syncAttio(data: Payload, classified: ReturnType<typeof classify>) {
  if (!process.env.ATTIO_API_KEY?.trim()) {
    return { synced: false as const, reason: "ATTIO_API_KEY missing" };
  }
  if (process.env.ATTIO_SYNC_ENABLED?.toLowerCase() === "false") {
    return { synced: false as const, reason: "ATTIO_SYNC_ENABLED=false" };
  }

  const peopleObject = process.env.ATTIO_PEOPLE_OBJECT_ID?.trim() || "people";
  const housingObject =
    process.env.ATTIO_HOUSING_RECORD_OBJECT_ID?.trim() || "housing_advisory";
  const leadList = process.env.ATTIO_LEAD_LIST_ID?.trim() || "lead_pipeline";
  const { firstName, lastName } = splitName(data.fullName);
  const email = data.email.trim().toLowerCase();

  const personRes = (await attioRequest(
    `/objects/${encodeURIComponent(peopleObject)}/records?matching_attribute=email_addresses`,
    "PUT",
    {
      data: {
        values: {
          email_addresses: [{ email_address: email }],
          name: [{ first_name: firstName, last_name: lastName, full_name: data.fullName }],
          ...(data.contactDetail
            ? { phone_numbers: [{ original_phone_number: data.contactDetail }] }
            : {}),
        },
      },
    },
  )) as { data?: { id?: { record_id?: string } } } | null;

  const personId = personRes?.data?.id?.record_id;
  if (!personId) throw new Error("Attio person upsert returned no record id");

  const housingRes = (await attioRequest(
    `/objects/${encodeURIComponent(housingObject)}/records`,
    "POST",
    {
      data: {
        values: {
          name: [`Intl · ${data.country} · ${data.fullName}`],
          associated_person: [{ target_object: peopleObject, target_record_id: personId }],
          lifecycle_stage: [{ option: classified.lifecycleStage }],
          situation: [
            `International buyer · ${data.country} · ${data.buyingGoal}`,
          ],
          desired_outcome: [
            data.wantRoadmap
              ? `${data.buyingGoal} · Requested Manhattan Buying Roadmap`
              : data.buyingGoal,
          ],
          budget_range: [data.budget],
          timeline: [data.timeline],
          next_recommended_action: [
            `${classified.nextAction} · Speak ${data.preferredLanguage}`,
          ],
          last_conversation_summary: [classified.aiSummary.slice(0, 2000)],
          lead_score: [classified.leadScore],
        },
      },
    },
  ).catch(async (err) => {
    // Fallback: minimal create if custom attributes differ
    console.warn("[international-strategy] housing rich create failed, retrying minimal", err);
    return attioRequest(`/objects/${encodeURIComponent(housingObject)}/records`, "POST", {
      data: {
        values: {
          name: [`Intl · ${data.country} · ${data.fullName}`],
          associated_person: [{ target_object: peopleObject, target_record_id: personId }],
        },
      },
    });
  })) as { data?: { id?: { record_id?: string } } } | null;

  const housingId = housingRes?.data?.id?.record_id;

  // Lead Pipeline list entry (best-effort)
  try {
    await attioRequest(`/lists/${encodeURIComponent(leadList)}/entries`, "POST", {
      data: {
        parent_record_id: personId,
        parent_object: peopleObject,
        entry_values: {},
      },
    });
  } catch (err) {
    console.warn("[international-strategy] lead list entry skipped", err);
  }

  if (housingId) {
    try {
      await attioRequest("/notes", "POST", {
        data: {
          parent_object: housingObject,
          parent_record_id: housingId,
          title: "International strategy form",
          format: "plaintext",
          content: buildMessage(data, classified).slice(0, 10000),
        },
      });
    } catch (err) {
      console.warn("[international-strategy] note skipped", err);
    }

    if (classified.nextAction !== "No action") {
      try {
        const assigneeEmail = process.env.ATTIO_DEFAULT_ASSIGNEE_EMAIL?.trim();
        await attioRequest("/tasks", "POST", {
          data: {
            content: `Intl lead (${classified.status}): ${classified.nextAction} — ${data.fullName} [${data.preferredLanguage}]`,
            format: "plaintext",
            deadline_at: null,
            is_completed: false,
            linked_records: [
              { target_object: housingObject, target_record_id: housingId },
            ],
            assignees: assigneeEmail
              ? [{ workspace_member_email_address: assigneeEmail }]
              : [],
          },
        });
      } catch (err) {
        console.warn("[international-strategy] task skipped", err);
      }
    }
  }

  return {
    synced: true as const,
    personId,
    housingId: housingId || null,
  };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const validated = schema.parse(body);
    const classified = classify(validated);

    const emailResult = await sendEmail(validated, classified);
    let attio: Awaited<ReturnType<typeof syncAttio>> = {
      synced: false,
      reason: "not attempted",
    };
    try {
      attio = await syncAttio(validated, classified);
    } catch (err) {
      console.error("[international-strategy] attio sync error", err);
      attio = {
        synced: false,
        reason: err instanceof Error ? err.message : "Attio sync failed",
      };
    }

    return res.status(200).json({
      ok: true,
      leadStatus: classified.status,
      nextAction: classified.nextAction,
      leadScore: classified.leadScore,
      email: emailResult.channel,
      attio,
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
