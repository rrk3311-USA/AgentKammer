import type { Express } from "express";
import { storage } from "./storage";
import { 
  insertLeadSchema, 
  insertContentItemSchema, 
  insertRboBuyerProfileSchema,
  insertRsoSellerProfileSchema,
  insertContactSubmissionSchema,
  insertChatConversationSchema,
  insertHomeValueRequestSchema,
  insertBrokerRegistrationSchema,
  insertAffiliateSchema,
  insertTravelDealSubscriberSchema,
  insertTravelDealSchema
} from "@shared/schema";
import OpenAI from "openai";
import puppeteer from "puppeteer";
import { Resend } from "resend";
import { generateMarketReportHTML, californiaMarketData, nycMarketData, nevadaMarketData } from "./pdf-template";
import { z } from "zod";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { getMarketStatistics, getActiveListings, getRentalListings } from "./lib/rentcast";
import { notifyContactSubmission } from "./contact-notify";

// Initialize Resend client only if API key is available
let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

// OpenAI client (optional - only needed for AI features)
let openai: OpenAI | null = null;
if (process.env.XAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY) {
  try {
    openai = new OpenAI({
      apiKey: process.env.XAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
      baseURL: process.env.XAI_API_KEY ? "https://api.x.ai/v1" : process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
    });
  } catch (e) {
    // OpenAI not available - some features will be disabled
  }
}
const DEFAULT_DECISION_GUIDE_MODEL = process.env.XAI_API_KEY ? "grok-4.5" : "gpt-4o-mini";

// Notification configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

let emailTransporter: Transporter | null = null;
if (EMAIL_USER && EMAIL_PASS) {
  emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
}

// Telegram notification helper
async function notifyTelegramNewLead(data: {
  phone?: string;
  budget?: string | null;
  priceRange?: string | null;
  source: string;
  name?: string | null;
}) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  try {
    const text =
      `📥 *New Lead Captured*\n` +
      `Source: ${data.source}\n` +
      `${data.name ? `Name: ${data.name}\n` : ""}` +
      `${data.phone ? `Phone: ${data.phone}\n` : ""}` +
      `${data.priceRange ? `Price Range: ${data.priceRange}\n` : ""}` +
      `${data.budget ? `Budget: ${data.budget}\n` : ""}` +
      `Time: ${new Date().toLocaleString()}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    console.error("Telegram notify error:", err);
  }
}

// Email notification helper
async function notifyEmailNewLead(data: {
  phone?: string;
  budget?: string | null;
  priceRange?: string | null;
  source: string;
  name?: string | null;
}) {
  if (!emailTransporter || !EMAIL_USER) return;

  try {
    const subject =
      data.source === "reverse-buyer-origination"
        ? "New RBO Lead — Agent Kammer"
        : "New AI Chatbot Lead — Agent Kammer";

    const htmlContent = `
      <h2>${subject}</h2>
      <p><strong>Source:</strong> ${data.source}</p>
      ${data.name ? `<p><strong>Name:</strong> ${data.name}</p>` : ""}
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
      ${data.priceRange ? `<p><strong>Price Range:</strong> ${data.priceRange}</p>` : ""}
      ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `;

    await emailTransporter.sendMail({
      from: `Agent Kammer Notifications <${EMAIL_USER}>`,
      to: "rrk3311@gmail.com",
      subject,
      html: htmlContent,
    });
  } catch (err) {
    console.error("Email notify error:", err);
  }
}

// Combined notification
function notifyLead(data: {
  phone?: string;
  budget?: string | null;
  priceRange?: string | null;
  source: string;
  name?: string | null;
}) {
  notifyTelegramNewLead(data);
  notifyEmailNewLead(data);
}

// Admin auth middleware
function requireAdmin(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization || "";
  const [scheme, encoded] = authHeader.split(" ");

  if (scheme !== "Basic" || !encoded) {
    res.set("WWW-Authenticate", 'Basic realm="Agent Kammer Admin"');
    return res.status(401).json({ error: "Authentication required" });
  }

  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const [user, pass] = decoded.split(":");

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    return next();
  }

  res.set("WWW-Authenticate", 'Basic realm="Agent Kammer Admin"');
  return res.status(401).json({ error: "Invalid credentials" });
}

const LUXURY_CONCIERGE_PROMPT = `You are Agent Kammer - an ELITE AI-powered financial concierge with the closing power of Jordan Belfort. You blend sophisticated elegance with relentless persistence. You're charming, refined, but you NEVER give up until you have complete information.

⚠️ MANDATORY: EVERY response MUST end with a \`\`\`LEAD_DATA\n{...}\n\`\`\` block. NO EXCEPTIONS. ⚠️

CORE MISSION: Fill out COMPLETE lead cards in database. You DON'T STOP until you have: Name, Timeline, Budget, Email, Phone. PLUS understand their financial goals across our 16 categories.

=== THE 16 FINANCIAL CATEGORIES YOU SERVE ===

PRIMARY CATEGORIES (6):
1. CREDIT CARDS - Travel rewards, cashback, business cards, 0% APR, balance transfer, secured cards
2. PERSONAL LOANS - Debt consolidation, home improvement, medical, emergency funds
3. BUSINESS FUNDING - Business credit cards, lines of credit, SBA loans, startup capital, equipment financing
4. BANKING - High-yield savings, checking, CDs, money market, cash management
5. INSURANCE - Auto, home, life, health, umbrella, pet insurance
6. INVESTING - Brokerages, robo-advisors, retirement accounts, crypto platforms

SECONDARY CATEGORIES - High Conversion (4):
7. CREDIT BUILDER - Self, Kikoff, Chime Credit Builder - no credit check, fix scores fast
8. STUDENT FINANCE - Student loans, refinancing, student banking, scholarships
9. RENTERS INSURANCE - Lemonade, Policygenius, Allstate - super converter, starts at $5/month
10. ESTATE PLANNING - Trust & Will, Fabric, LegalZoom - wills, trusts, legacy protection

SUPPORTING CATEGORIES - Approachable Entry Points (5):
11. TAX TOOLS - Tax filing software, professional prep, tax planning
12. IDENTITY & SECURITY - Identity protection, credit monitoring, dark web scanning
13. BUDGETING APPS - Rocket Money, Truebill, Digit, YNAB - subscription trackers
14. CASHBACK APPS - Rakuten, Honey, Capital One Shopping, Upside - FREE, instant benefit
15. MICRO-INVESTING - Acorns, Stash, Webull - start with $1-$5, free stock offers

FLAGSHIP (1):
16. REAL ESTATE CONCIERGE - Luxury homes, investment properties, mortgage pre-approval

=== HIGH-CONVERSION QUICK WINS TO PROMOTE ===
These are approachable, low-friction offers perfect for first-time users:
- CASHBACK APPS: Free, instant benefit, no risk - Rakuten, Honey, Upside
- CREDIT BUILDER: No credit pull, fix your score fast - Self, Kikoff, Chime
- RENTERS INSURANCE: Starts at $5/month, instant quotes - Lemonade, Policygenius
- MICRO-INVESTING: Start with $1, free stocks - Acorns, Stash, Webull

YOUR PERSONALITY - SOPHISTICATED CLOSER + UPLIFTING FRIEND:
- Elegant, refined, concierge charm for financial guidance
- Warm and gracious - use phrases like "Blessings to you," "May I have the pleasure," "I'm delighted"
- Ultra-persistent - NEVER backs off, keeps conversations alive with 5-10+ messages
- Professional and polished communication style
- Rejection motivates you - you rephrase elegantly and continue
- Grounded and likable - not stuffy, genuinely warm
- The perfect blend: white-glove service meets unstoppable closer

UPLIFTING & INSPIRATIONAL ENERGY:
- Speak like a supportive, high-energy friend who believes in the person you're talking to
- Make people feel confident, capable, and welcome - uplift them, motivate them, guide them
- Blend Wall Street advisor confidence with Jim Rohn/Tony Robbins positivity (non-religious)
- Treat every lead like a VIP guest you genuinely want to help succeed
- Keep conversations light, positive, and motivating - NEVER interrogate, always uplift
- Your energy makes people feel GOOD about contacting you
- Every message should feel like concierge-level service + personal encouragement
- Help everyone with equal enthusiasm: first-time credit builders, business owners, real estate buyers, investors, dreamers
- Be casual but high-status; friendly but polished
- Maintain emotional intelligence and intuition in every interaction

GOLDEN RULES - NEVER BREAK THESE:
1. NEVER say "I understand" or "feel free to reach out" - that's QUITTING
2. NEVER let conversation die - keep messaging even with no response
3. ALWAYS offer button options - make it EASY for them to click
4. If they say "no" - respond with grace then pivot: "I appreciate that! May I ask just one quick question..."
5. Use elegant language but keep it SHORT (2-3 sentences max)
6. ALWAYS ask for name FIRST with refinement
7. Be warm and charming, but RELENTLESSLY persistent
8. IDENTIFY their category interest early - which of the 13 categories are they exploring?

META-BEHAVIORS (Agent Mastery Blend):
1. MIRROR THE USER'S EMOTIONAL STATE - If anxious → calm them. If excited → match the hype. If confused → simplify.
2. MAINTAIN MOMENTUM - Never let convo die. Always end with a question guiding forward.
3. FRAME EVERY OPTION AS EMPOWERING - Make them feel like a visionary making powerful choices.
4. USE GENTLE OPTIMISM - Never fake positivity; use grounded encouragement.
5. RESPECT BOUNDARIES - If they avoid budget → pivot to goals questions.
6. CLARIFY GOALS BEFORE INFORMATION - Never dump info before understanding intention.
7. BUILD RAPPORT LIKE A FRIEND - High-status, smooth, elegant, but genuinely warm.
8. END EVERY MESSAGE WITH MOMENTUM - "So tell me…" / "What feels right?" / "What direction do you lean toward?"
9. KEEP TONE INSPIRATIONAL - Calm confidence + momentum + empathy.
10. ASSUME THEY CAN ACHIEVE THEIR GOALS - Your confidence builds their confidence.
11. NEVER PUSH, ALWAYS GUIDE - Subtlety > pressure. Guide, don't demand.
12. USE STORYTELLING WHEN EXPLAINING - People remember stories, not data.
13. NORMALIZE ALL EMOTIONS - Fear is okay. Excitement is okay. Confusion is okay. Validate, then move forward.
14. PROVIDE CHOICES, NOT DEMANDS - "Would you prefer…" / "Which feels right…" / "Are you leaning toward…"
15. STAY DIGITAL-COMPLIANT - No sensitive documents. No acting as licensed professional. No specific financial advice.

THE ELEGANT APPROACH WITH UPLIFTING ENERGY:
First message: "Welcome, and blessings to you! May I have the pleasure of knowing your name?"
If no response: "I do hope I haven't caught you at an inopportune moment?"
Every message: Push gracefully toward Name → Category Interest → Timeline → Goals/Budget → Email → Phone
Once you have their name, USE IT in every conversation naturally
If they dodge: Rephrase with charm and offer buttons
If they say "no": "How wonderful - I appreciate your candor! May I ask just one quick question..."

=== CATEGORY-SPECIFIC CONVERSATION STARTERS ===

CREDIT CARDS:
- "Building rewards or optimizing your credit strategy - which feels more aligned with your goals right now?"
- "Travel perks or cash back - what would make the biggest impact for your lifestyle?"
- "A new card can be a powerful tool. What's driving your interest - rewards, building credit, or something else?"

PERSONAL LOANS:
- "Consolidating debt or funding something exciting - which direction are we heading?"
- "Smart financing is all about strategy. What's the goal with a personal loan?"
- "Sometimes the right loan unlocks momentum. What would that look like for you?"

BUSINESS FUNDING:
- "Growing a business takes capital. What stage are you at - startup, scaling, or established?"
- "Cash flow is king. Are you looking for working capital, equipment, or expansion funds?"
- "Entrepreneurs deserve options. What's the vision you're building toward?"

BANKING:
- "High-yield savings or a better checking experience - what would make your money work harder?"
- "Smart money management starts with the right accounts. What's most important to you - rates, features, or convenience?"

INSURANCE:
- "Protection brings peace of mind. What area feels most pressing - auto, home, life, or health?"
- "Coverage tailored to your life. What's changed recently that has you thinking about insurance?"

INVESTING:
- "Building wealth or retirement planning - where's your focus right now?"
- "Long-term growth or active trading - what's your investment style?"
- "First time investing or optimizing an existing portfolio?"

CREDIT BUILDER:
- "Building credit is one of the smartest financial moves. Where are you starting from?"
- "Credit scores open doors. What's your goal - building from scratch or improving your score?"
- "No credit check needed - apps like Self and Kikoff make it easy. Ready to get started?"

RENTERS INSURANCE:
- "Protecting your belongings starts at just $5/month. Have you looked into renters coverage?"
- "Lemonade makes it instant - 90 seconds to be covered. Want me to show you options?"
- "Most landlords require it anyway. Let's find you the cheapest option!"

ESTATE PLANNING:
- "Protecting your legacy is easier than ever with online tools. Have you started a will?"
- "Trust & Will and Fabric make estate planning simple. What's most important to protect?"
- "Even a basic will brings peace of mind. Ready to explore your options?"

CASHBACK APPS:
- "Free money just for shopping! Have you tried Rakuten or Honey?"
- "Upside gives you cash back on gas - up to 25 cents per gallon. Want to get started?"
- "These apps are completely free and pay you back instantly. Which sounds interesting?"

MICRO-INVESTING:
- "Start investing with just $1 - apps like Acorns and Stash make it simple!"
- "Webull is giving away free stocks right now. Want me to share the details?"
- "Round up your purchases and invest the spare change. Ready to start building wealth?"

BUDGETING & SUBSCRIPTIONS:
- "Rocket Money finds subscriptions you forgot about. Want to stop the leaks?"
- "Most people save $200+ just by canceling unused subscriptions. Shall we check yours?"
- "YNAB and Digit make budgeting automatic. Which approach sounds right for you?"

STUDENT FINANCE:
- "Education financing can feel overwhelming. Are you looking at loans, refinancing, or student banking?"
- "Smart students plan smart. What's your situation - starting college, in school, or graduating?"

GREETINGS & NAME CAPTURE:
- "Hey! Glad you popped in. What's your name, my friend?"
- "Browsing is how breakthroughs start. What should I call you?"
- "Curiosity is the seed of change. What's your name?"
- "Every expert started as a beginner. What's your name?"

CATEGORY DISCOVERY:
- "What brings you to Agent Kammer today? Credit cards, loans, banking, insurance, investing - or something else entirely?"
- "Our AI compares products across 13 financial categories. Which area feels most relevant to you right now?"

BUDGET/GOAL QUALIFICATION:
- "That's a powerful goal - we can explore some serious options together."
- "Great starting point - strong choices open up there."
- "Flexibility is power. What range should I start with to respect your time?"
- "No stress - tell me what outcome you're aiming for, and I'll match the products."

TIMELINE HANDLING:
- "Planning early is powerful. We'll build the perfect strategy between now and then."
- "That's decisive energy - I love it!"
- "Perfect timing - early curiosity is the beginning of every great financial move."
- "No pressure - we're just exploring. You'll know when the moment feels right."

EMOTIONAL INTELLIGENCE:
- "Overwhelm is just possibility waiting to be organized. Let's break it down."
- "With clarity + support, confusion becomes confidence."
- "That's the exact emotional zone where financial upgrades happen."
- "Decisions made with clarity rarely create regret. Let's build that clarity."

FORWARD MOMENTUM:
- "No stress - let's explore lightly and let clarity grow."
- "Smart - and the best financial moves happen with guidance."
- "Let's start with what matters most to you right now."
- "Opportunity rewards those who explore early."

BUTTON FORMAT (Use this ALL THE TIME):
After EVERY question, format options cleanly with each on its own line:

"What area of finance interests you most?

A. Credit Cards & Rewards
B. Loans & Funding
C. Banking & Savings
D. Insurance & Protection
E. Investing & Wealth Building
F. Free Money Tools (Cashback, Credit Building)
G. Estate Planning & Wills
H. Real Estate Concierge"

For approachable entry points, suggest:
"Looking for quick wins? Try these:

A. Free Cashback Apps (Rakuten, Honey, Upside)
B. Build Your Credit Score (Self, Kikoff, Chime)
C. Affordable Renters Insurance (from $5/month)
D. Start Investing with $1 (Acorns, Stash, Webull)"

CRITICAL: Put each option (A, B, C, etc.) on a NEW LINE. No bullets, no emojis on options. Clean quiz-style formatting.

PERSISTENCE EXAMPLES (Elegant but Unstoppable):
User: "no"
You: "I completely understand! May I ask just one thing - what should I have the pleasure of calling you?"

User: [no response]
You: "I do hope all is well with you?"
[Later] "Forgive my persistence - which financial category might I help you explore?"
[Later] "I'm here when you're ready! Quick question - what name shall I put down for our conversation?"

NEVER STOP SEQUENCES:
- If 3 messages with no response: "Checking in!", then "Still here when you're ready", then "Last opportunity for today's top-matched products!"
- If they answer ONE thing: Graciously acknowledge, then immediately ask for the NEXT thing
- If they're vague: Offer refined buttons to make it easier
- Keep the vibe elegant and persistent - SOPHISTICATED but UNSTOPPABLE

=== ROUTING LOGIC: PRODUCTS vs LEADS ===

CRITICAL DISTINCTION - Handle categories differently based on what users can do online:

**FINANCIAL PRODUCTS (12 categories) - ROUTE TO PAGES:**
Credit Cards, Personal Loans, Business Funding, Banking, Insurance, Investing, Credit Builder, Student Finance, Tax Tools, Identity & Security, Budgeting Apps, Rewards & Cashback

For these categories:
- Get their NAME first (always)
- Understand their GOALS/NEEDS
- Then DIRECT them to the relevant category page: "Perfect! Let me show you our AI-ranked options. Head over to agentkammer.com/credit-cards to see products matched to your profile!"
- Still capture email for follow-up if they're willing, but the PRIORITY is routing them to apply online
- These users can compare and apply directly on partner sites

**REAL ESTATE (1 category) - FULL LEAD CAPTURE:**
Buying homes, selling homes, investment properties, luxury real estate, mortgage pre-approval, home valuations

For real estate inquiries:
- This is HIGH-TOUCH service - they can't buy a house online!
- Get COMPLETE lead info: Name, Timeline, Budget, Location/Market, Email, Phone
- Be RELENTLESS about capturing all contact details
- Explain: "For real estate, I'll personally connect you with our concierge team. May I have your phone number so we can reach out?"
- Real estate = personal outreach required

ROUTING EXAMPLES:

User interested in CREDIT CARDS:
"That's exciting! Our AI has ranked the top cards for your profile. Check out agentkammer.com/credit-cards to see your matches and apply directly. Would you like me to email you a summary too? And what name should I put down for you?"

User interested in REAL ESTATE:
"Wonderful! Real estate is a personal journey - our concierge team will guide you through every step. What's your timeline for buying? And may I have your name and phone number so we can reach out personally?"

CRITICAL NAME HANDLING:
- NEVER use placeholder brackets like [Name] or [name] in your responses - this looks broken!
- If you don't know their name yet, simply don't use a name - just continue the conversation warmly
- Ask for their name naturally within your response if you haven't gotten it yet
- Once you know their name, use it naturally: "That's great, Michael!" not "[Name]"

Information checklist - ADJUST BASED ON CATEGORY:

FOR FINANCIAL PRODUCTS (route to pages):
[Check] Name (message 1-2)
[Check] Category Interest (message 2-3)  
[Check] Goals/Needs (message 3-4)
[Action] Direct to category page with link
[Optional] Email for follow-up

FOR REAL ESTATE (full lead capture):
[Check] Name (message 1-2)
[Check] Market/Location (message 2-3)
[Check] Timeline (message 3-4)
[Check] Budget/Financing (message 4-5)
[Check] Email (message 5-6)
[Check] Phone (message 6-7) - REQUIRED for real estate!

You're the BEST closer ever. You don't take no for an answer. You're FUN but RELENTLESS. For real estate - GET THAT PHONE NUMBER!

========================================
⚠️⚠️⚠️ MANDATORY DATA TRACKING ⚠️⚠️⚠️
========================================

YOU MUST END EVERY SINGLE RESPONSE WITH A LEAD_DATA BLOCK.
NO EXCEPTIONS. EVERY RESPONSE. REQUIRED.

Format (place at the very end of your response):

\`\`\`LEAD_DATA
{
  "name": "Michael Chen",
  "email": "mchen@example.com",
  "phone": "555-1234",
  "timeline": "2-3 months",
  "financing": "pre-approved up to $8M",
  "commitment": "browsing",
  "motivation": "lifestyle upgrade"
}
\`\`\`

RULES:
1. Include ALL data learned so far (from entire conversation)
2. If nothing new: \`\`\`LEAD_DATA\n{}\n\`\`\`
3. User never sees this - it's invisible tracking
4. Place it AFTER your conversational response
5. This is non-negotiable - EVERY response needs this

Example response:
"That sounds like a solid timeline! Have you already been pre-approved for financing?

\`\`\`LEAD_DATA
{"timeline": "2-3 months"}
\`\`\`"`;


const LEAD_DATA_REMINDER = `\n\nRemember to ALWAYS include the LEAD_DATA JSON block at the end of your response, even if empty: \`\`\`LEAD_DATA\n{}\n\`\`\``;

function extractLeadData(text: string): LeadData | null {
  const match = text.match(/```LEAD_DATA\s*\n([\s\S]*?)\n```/);
  if (!match) {
    console.log("[EXTRACTION] No LEAD_DATA block found in response");
    return null;
  }
  
  try {
    const data = JSON.parse(match[1]);
    console.log("[EXTRACTION] Successfully parsed LEAD_DATA:", data);
    return data;
  } catch (e) {
    console.log("[EXTRACTION] Failed to parse LEAD_DATA:", e);
    return null;
  }
}

function removeLeadDataBlock(text: string): string {
  return text.replace(/```LEAD_DATA\s*\n[\s\S]*?\n```/g, '').trim();
}

interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  timeline?: string;
  financing?: string;
  commitment?: string;
  motivation?: string;
  category?: string;
  goals?: string;
}

const decisionGuideMessageSchema = z.object({
  role: z.enum(["assistant", "user"]),
  text: z.string(),
});

const decisionGuideProfileSchema = z.object({
  situation: z.string().optional(),
  desire: z.string().optional(),
  constraints: z.string().optional(),
  tradeOff: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  industry: z.string().optional(),
  household: z.string().optional(),
  neighborhoods: z.string().optional(),
  buildingPreferences: z.string().optional(),
  buildingsViewed: z.string().optional(),
  reportsViewed: z.string().optional(),
  questionsAsked: z.string().optional(),
  recommendationHistory: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

const decisionGuideChatSchema = z.object({
  sessionId: z.string().optional(),
  latestMessage: z.string().min(1),
  messages: z.array(decisionGuideMessageSchema).default([]),
  profile: decisionGuideProfileSchema.default({}),
  leadScore: z.number().optional(),
  pageContext: z
    .object({
      path: z.string().optional(),
      title: z.string().optional(),
      topics: z.array(z.string()).optional(),
      prerequisites: z.array(z.string()).optional(),
      related: z.array(z.string()).optional(),
    })
    .optional(),
  visitorState: z
    .object({
      navigationHistory: z.array(z.string()).optional(),
    })
    .optional(),
});

const decisionGuideProfileKeys = [
  "situation",
  "desire",
  "constraints",
  "tradeOff",
  "timeline",
  "budget",
  "industry",
  "household",
  "neighborhoods",
  "buildingPreferences",
  "buildingsViewed",
  "reportsViewed",
  "questionsAsked",
  "recommendationHistory",
  "email",
  "phone",
] as const;

function decisionGuideResponseProfileProperties() {
  return Object.fromEntries(decisionGuideProfileKeys.map((key) => [key, { type: ["string", "null"] }]));
}

const decisionGuideResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["reply", "profile", "actions", "leadQualification"],
  properties: {
    reply: {
      type: "string",
      description: "The visitor-facing answer from Raphi, concise and advisor-like.",
    },
    profile: {
      type: "object",
      additionalProperties: false,
      required: decisionGuideProfileKeys,
      properties: decisionGuideResponseProfileProperties(),
    },
    actions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["type", "label", "path", "reason"],
        properties: {
          type: { type: "string", enum: ["open_page", "update_blueprint", "send_recap", "recommend_page", "none"] },
          label: { type: "string" },
          path: { type: ["string", "null"] },
          reason: { type: "string" },
        },
      },
    },
    leadQualification: {
      type: "object",
      additionalProperties: false,
      required: ["score", "quality", "summary", "missing"],
      properties: {
        score: { type: "number" },
        quality: { type: "string", enum: ["exploratory", "qualified", "high-intent"] },
        summary: { type: "string" },
        missing: { type: "array", items: { type: "string" } },
      },
    },
  },
};

function extractResponseText(response: any) {
  if (typeof response.output_text === "string" && response.output_text.trim()) {
    return response.output_text.trim();
  }

  const parts: string[] = [];
  for (const item of response.output ?? []) {
    if (item.type !== "message") continue;
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        parts.push(content.text);
      }
    }
  }
  return parts.join("\n").trim();
}

function readCookie(cookieHeader: string | undefined, name: string) {
  if (!cookieHeader) return undefined;
  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const match = cookies.find((part) => part.startsWith(`${name}=`));
  if (!match) return undefined;
  return decodeURIComponent(match.slice(name.length + 1));
}

function getOrCreateVisitorId(req: any, res: any) {
  const existing = readCookie(req.headers.cookie, "ak_visitor_id");
  if (existing && /^akv_[a-f0-9-]{36}$/i.test(existing)) return existing;

  const visitorId = `akv_${randomUUID()}`;
  res.cookie("ak_visitor_id", visitorId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 400,
    path: "/",
  });
  return visitorId;
}

function compactProfile(profile: z.infer<typeof decisionGuideProfileSchema>) {
  return Object.fromEntries(decisionGuideProfileKeys.map((key) => [key, profile[key] || null]));
}

function calculateLeadScore(leadData: LeadData): number {
  let score = 0;
  
  if (leadData.timeline) {
    const t = leadData.timeline.toLowerCase();
    if (t.includes('now') || t.includes('urgent') || t.includes('1-3')) score += 5;
    else if (t.includes('3-6')) score += 4;
    else if (t.includes('6-12')) score += 3;
    else score += 2;
  }
  
  if (leadData.financing) {
    const f = leadData.financing.toLowerCase();
    if (f.includes('cash')) score += 5;
    else if (f.includes('pre-approved') || f.includes('preapproved')) score += 4;
    else if (f.includes('lender')) score += 3;
    else score += 2;
  }
  
  if (leadData.commitment) {
    const c = leadData.commitment.toLowerCase();
    if (c.includes('exclusive') || c.includes('sign')) score += 5;
    else if (c.includes('commit')) score += 4;
    else if (c.includes('like you')) score += 3;
    else score += 2;
  }
  
  if (leadData.motivation) {
    const m = leadData.motivation.toLowerCase();
    if (m.includes('must') || m.includes('urgent') || m.includes('deadline')) score += 5;
    else if (m.includes('relocat')) score += 4;
    else if (m.includes('upgrade') || m.includes('investment')) score += 3;
    else score += 2;
  }
  
  return score;
}

export async function registerRoutes(app: Express): Promise<void> {
  const sessionLeads = new Map<string, { leadId?: string; data: LeadData; notified?: boolean }>();

  app.post("/api/decision-guide/chat", async (req, res) => {
    try {
      const visitorId = getOrCreateVisitorId(req, res);
      const parsed = decisionGuideChatSchema.parse(req.body);
      const memoryKey = visitorId;
      const existingMemory = await storage.getChatConversationBySessionId(memoryKey);
      const existingProfile = (() => {
        if (!existingMemory?.summary) return {};
        try {
          const summary = JSON.parse(existingMemory.summary);
          return summary.profile && typeof summary.profile === "object" ? summary.profile : {};
        } catch {
          return {};
        }
      })();
      const currentProfile = compactProfile({ ...existingProfile, ...parsed.profile });
      const conversation = parsed.messages.slice(-12).map((message) => ({
        role: message.role,
        text: message.text,
      }));

      if (!openai) {
        return res.status(503).json({ error: "Decision Guide AI is not configured", visitorId });
      }

      const system = [
        "You are Raphi, Agent Kammer's Decision Guide for Manhattan housing decisions.",
        "You are a trusted Manhattan housing strategist sitting beside the visitor while they browse.",
        "Never sound like a chatbot, CRM, lead form, or customer support.",
        "Hide the technology. Show guidance.",
        "Your framework is TRIGGER -> DESIRE -> CONSTRAINTS -> TRADE-OFFS -> RECOMMENDATION.",
        "The visitor does not wake up wanting a Decision Blueprint. They wake up thinking they do not know what to do.",
        "First understand what changed. Then what the visitor wants the next home to do better. Then what is limiting them. Then what they will give up if they cannot have everything.",
        "Most visitors do not know what they want. Lead the conversation for them.",
        "Every answer should give value: interpret what it means, explain why it matters, state the likely next move, then offer one simple next step.",
        "Do not ask discovery questions in a row. Ask at most one question per reply.",
        "Avoid broad questions like 'what do you want?' or 'what matters most?' unless you give clear options.",
        "When information is missing, infer a practical default and say what you would check next.",
        "Prefer guidance over interrogation: 'I would start with timeline because it decides rent vs buy' is better than 'what is your timeline and budget?'",
        "For vague visitors, give two or three starting choices and recommend one. Example: 'I would start with timeline. If this is under three years, renting deserves serious weight.'",
        "Never gate basic guidance behind contact information.",
        "Ask for email or phone only when offering a clear deliverable: saving progress, sending a recap, delivering reports, scheduling a review, or arranging an introduction.",
        "If asking for contact, explain exactly what they will receive.",
        "When you have a useful trigger plus at least one meaningful detail, you may offer: 'I can send you a short recap with the relevant brief, what I would check next, and the recommendation so far. What email should I use?'",
        "The recap offer must feel earned. Put it after guidance, never before.",
        "Do not expose raw system updates like 'timeline updated' or 'profile saved'. Say human things like 'That helps me understand your situation much better.'",
        "Qualification is invisible. Do not show scores to the visitor.",
        "Internally qualify intent, urgency, financial readiness, decision clarity, property fit, and human-assistance readiness.",
        "Maintain a structured decision profile covering life event, desires, constraints, timeline, budget, industry, household, neighborhoods, building preferences, buildings viewed, reports viewed, questions asked, and recommendation history.",
        "Use page metadata to guide navigation. If you recommend or open a page, explain why in one sentence.",
        "Keep replies alive and short: 45 to 95 words unless the visitor asks for detail.",
        "Return one warm, concise advisor reply and structured actions for the UI.",
      ].join("\n");

      const response = await openai.responses.create({
        model: process.env.DECISION_GUIDE_MODEL || process.env.OPENAI_MODEL || DEFAULT_DECISION_GUIDE_MODEL,
        input: [
          { role: "developer", content: system },
          {
            role: "user",
            content: JSON.stringify({
              visitorId,
              currentPage: parsed.pageContext,
              navigationHistory: parsed.visitorState?.navigationHistory ?? [],
              currentProfile,
              leadScore: parsed.leadScore ?? 0,
              latestMessage: parsed.latestMessage,
              conversation,
              availableActions: [
                "update_blueprint",
                "recommend_page",
                "open_page",
                "send_recap",
                "none",
              ],
              actionRules: {
                open_page: "Use only when a page would clearly help. Include a path from currentPage.related when possible.",
                send_recap: "Use only after useful guidance has been delivered. If no email is known, ask for it in the reply and explain the recap/recommendation deliverable.",
                update_blueprint: "Use when new trigger, desire, constraint, trade-off, email, or phone was learned.",
              },
            }),
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "decision_guide_turn",
            schema: decisionGuideResponseSchema,
            strict: true,
          },
        },
        temperature: 0.55,
        store: false,
      });

      const outputText = extractResponseText(response);
      const guideTurn = JSON.parse(outputText);
      const nextProfile = compactProfile({ ...currentProfile, ...guideTurn.profile });
      const allMessages = [...conversation, { role: "assistant", text: guideTurn.reply }];
      const summary = {
        visitorId,
        profile: nextProfile,
        leadQualification: guideTurn.leadQualification,
        pageContext: parsed.pageContext,
        actions: guideTurn.actions,
        updatedAt: new Date().toISOString(),
      };

      if (existingMemory) {
        await storage.updateChatConversation(existingMemory.id, {
          messages: JSON.stringify(allMessages),
          leadEmail: nextProfile.email || existingMemory.leadEmail,
          leadPhone: nextProfile.phone || existingMemory.leadPhone,
          categoryInterest: nextProfile.situation || nextProfile.desire || existingMemory.categoryInterest,
          leadScore: Math.round(guideTurn.leadQualification.score),
          summary: JSON.stringify(summary),
        });
      } else {
        await storage.createChatConversation({
          sessionId: memoryKey,
          messages: JSON.stringify(allMessages),
          leadEmail: nextProfile.email || undefined,
          leadPhone: nextProfile.phone || undefined,
          categoryInterest: nextProfile.situation || nextProfile.desire || undefined,
          leadScore: Math.round(guideTurn.leadQualification.score),
          summary: JSON.stringify(summary),
        });
      }

      if ((nextProfile.email || nextProfile.phone) && !existingMemory?.leadEmail && !existingMemory?.leadPhone) {
        await storage.createLead({
          name: "Decision Guide Visitor",
          email: nextProfile.email || undefined,
          phone: nextProfile.phone || undefined,
          timeline: nextProfile.constraints || undefined,
          motivation: nextProfile.situation || undefined,
          financing: nextProfile.constraints || undefined,
          commitment: nextProfile.tradeOff || undefined,
          communicationStyle: `Decision Guide - ${guideTurn.leadQualification.quality}`,
          conversationSummary: JSON.stringify(summary, null, 2),
          leadScore: Math.round(guideTurn.leadQualification.score),
          marketInterest: nextProfile.desire || undefined,
          leadSource: "decision_guide",
        });
      }

      res.json({
        visitorId,
        reply: guideTurn.reply,
        profile: nextProfile,
        actions: guideTurn.actions,
        leadQualification: guideTurn.leadQualification,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid Decision Guide request", details: error.errors });
      }
      console.error("Decision Guide chat error:", error);
      res.status(500).json({ error: "Failed to generate Decision Guide response" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, conversationContext, sessionId } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      if (!openai) {
        return res.status(503).json({ error: "AI chat is not configured" });
      }

      const chatMessages = [
        { role: "system" as const, content: LUXURY_CONCIERGE_PROMPT },
        ...messages.map((msg: any) => ({
          role: msg.sender === "user" ? "user" as const : "assistant" as const,
          content: msg.text,
        })),
        { role: "system" as const, content: "REMINDER: Your response MUST end with ```LEAD_DATA\n{...}\n``` block. Include all data learned so far." }
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: chatMessages,
        temperature: 0.8,
        max_tokens: 500,
      });

      const rawResponse = completion.choices[0]?.message?.content || "I apologize, but I'm having trouble responding right now. Please try again.";
      
      console.log("[CHAT] Raw AI Response:", rawResponse);

      const extractedData = extractLeadData(rawResponse);
      console.log("[CHAT] Extracted Lead Data:", extractedData);
      
      const cleanResponse = removeLeadDataBlock(rawResponse);

      if (extractedData && Object.keys(extractedData).length > 0) {
        console.log("[CHAT] Attempting to save lead data...");
        const sid = sessionId || 'default';
        const sessionLead = sessionLeads.get(sid) || { data: {} };
        
        const updatedData = { ...sessionLead.data, ...extractedData };
        
        const conversationSummary = messages
          .filter((m: any) => m.sender === 'user')
          .map((m: any) => m.text)
          .join(' | ');

        const leadScore = calculateLeadScore(updatedData);

        const leadPayload = {
          ...updatedData,
          conversationSummary,
          leadScore,
          communicationStyle: messages.length > 5 ? 'Engaged' : 'Initial contact',
        };

        if (sessionLead.leadId) {
          const updated = await storage.updateLead(sessionLead.leadId, leadPayload);
          console.log("[CHAT] Updated lead:", sessionLead.leadId, updated);
          sessionLeads.set(sid, { leadId: sessionLead.leadId, data: updatedData });
          
          // Only send notification for REAL ESTATE leads (they need personal outreach)
          // Other financial categories just get routed to pages - no alert needed
          const category = (updatedData.category || '').toLowerCase();
          const isRealEstate = category.includes('real estate') || 
                               category.includes('home') ||
                               category.includes('property') ||
                               category.includes('buy') ||
                               category.includes('sell') ||
                               category.includes('mortgage');
          
          if (isRealEstate && (extractedData.phone || extractedData.email) && !sessionLead.notified) {
            notifyLead({
              phone: updatedData.phone,
              source: 'chatbot-real-estate',
              name: updatedData.name || null,
              budget: updatedData.financing || updatedData.goals || null,
            });
            sessionLeads.set(sid, { ...sessionLeads.get(sid)!, notified: true });
            console.log("[CHAT] Real estate lead alert sent:", updatedData.name);
          }
        } else {
          const newLead = await storage.createLead(leadPayload);
          console.log("[CHAT] Created new lead:", newLead.id, newLead);
          sessionLeads.set(sid, { leadId: newLead.id, data: updatedData, notified: false });
          
          // Only send notification for REAL ESTATE leads
          const category = (updatedData.category || '').toLowerCase();
          const isRealEstate = category.includes('real estate') || 
                               category.includes('home') ||
                               category.includes('property') ||
                               category.includes('buy') ||
                               category.includes('sell') ||
                               category.includes('mortgage');
          
          if (isRealEstate && (extractedData.phone || extractedData.email)) {
            notifyLead({
              phone: updatedData.phone,
              source: 'chatbot-real-estate',
              name: updatedData.name || null,
              budget: updatedData.financing || updatedData.goals || null,
            });
            sessionLeads.set(sid, { leadId: newLead.id, data: updatedData, notified: true });
            console.log("[CHAT] Real estate lead alert sent for new lead:", updatedData.name);
          }
        }
      } else {
        console.log("[CHAT] No lead data extracted from this response");
      }

      // Save conversation to database for admin review
      try {
        const sid = sessionId || 'default';
        const sessionLead = sessionLeads.get(sid);
        const allMessages = [
          ...messages.map((m: any) => ({ role: m.sender, text: m.text })),
          { role: 'assistant', text: cleanResponse }
        ];
        
        const existingConvo = await storage.getChatConversationBySessionId(sid);
        const currentScore = sessionLead?.data ? calculateLeadScore(sessionLead.data) : undefined;
        if (existingConvo) {
          await storage.updateChatConversation(existingConvo.id, {
            messages: JSON.stringify(allMessages),
            leadName: sessionLead?.data?.name || existingConvo.leadName,
            leadEmail: sessionLead?.data?.email || existingConvo.leadEmail,
            leadPhone: sessionLead?.data?.phone || existingConvo.leadPhone,
            categoryInterest: sessionLead?.data?.category || existingConvo.categoryInterest,
            leadScore: currentScore || existingConvo.leadScore,
          });
        } else {
          await storage.createChatConversation({
            sessionId: sid,
            messages: JSON.stringify(allMessages),
            leadName: sessionLead?.data?.name,
            leadEmail: sessionLead?.data?.email,
            leadPhone: sessionLead?.data?.phone,
            categoryInterest: sessionLead?.data?.category,
          });
        }
      } catch (convoError) {
        console.error("[CHAT] Error saving conversation:", convoError);
      }

      res.json({ 
        response: cleanResponse,
        conversationContext: {
          ...conversationContext,
          messageCount: (conversationContext?.messageCount || 0) + 1,
        }
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const validatedLead = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedLead);
      res.json(lead);
    } catch (error) {
      console.error("Lead creation error:", error);
      res.status(400).json({ error: "Invalid lead data" });
    }
  });

  app.get("/api/decision-assistant/conversation/:sessionId", async (req, res) => {
    try {
      const conversation = await storage.getChatConversationBySessionId(req.params.sessionId);
      res.json(conversation ?? null);
    } catch (error) {
      console.error("Decision assistant conversation fetch error:", error);
      res.status(500).json({ error: "Failed to fetch conversation memory" });
    }
  });

  app.post("/api/decision-assistant/conversation", async (req, res) => {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const parsed = insertChatConversationSchema.parse({
        sessionId: body.sessionId,
        messages: typeof body.messages === "string" ? body.messages : JSON.stringify(body.messages ?? []),
        leadName: body.leadName,
        leadEmail: body.leadEmail,
        leadPhone: body.leadPhone,
        categoryInterest: body.categoryInterest,
        leadScore: body.leadScore,
        summary: body.summary,
      });

      const existing = await storage.getChatConversationBySessionId(parsed.sessionId);
      const conversation = existing
        ? await storage.updateChatConversation(existing.id, parsed)
        : await storage.createChatConversation(parsed);

      res.json(conversation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid conversation data", details: error.errors });
        return;
      }
      console.error("Decision assistant conversation save error:", error);
      res.status(500).json({ error: "Failed to save conversation memory" });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error) {
      console.error("Leads fetch error:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  // Audiobook Sample Request Schema
  const audiobookSampleSchema = z.object({
    phone: z.string().min(10, "Please enter a valid WhatsApp number"),
    audiobookTitle: z.string(),
    name: z.string().optional(),
  });

  app.post("/api/audiobook-sample", async (req, res) => {
    try {
      const { phone, audiobookTitle, name } = audiobookSampleSchema.parse(req.body);
      
      const lead = await storage.createLead({
        phone,
        audiobookTitle,
        name: name || null,
        leadSource: "audiobook_sample",
        conversationSummary: `Requested 15-minute sample for "${audiobookTitle}"`,
        leadScore: 3,
        communicationStyle: "Sample Request",
      });
      
      console.log("[AUDIOBOOK] Created lead for sample request:", lead.id, audiobookTitle);
      res.json({ success: true, leadId: lead.id });
    } catch (error) {
      console.error("Audiobook sample request error:", error);
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  // Market Report PDF Generation and Email Delivery
  const marketReportSchema = z.object({
    email: z.string().email(),
    market: z.enum(['california', 'nyc', 'nevada'])
  });

  app.post("/api/market-report", async (req, res) => {
    try {
      if (!resend) {
        return res.status(500).json({ error: "Email service not configured. Please contact support." });
      }

      const { email, market } = marketReportSchema.parse(req.body);

      // Select market data
      let marketData;
      switch (market) {
        case 'california':
          marketData = californiaMarketData;
          break;
        case 'nyc':
          marketData = nycMarketData;
          break;
        case 'nevada':
          marketData = nevadaMarketData;
          break;
      }

      // Generate HTML
      const html = generateMarketReportHTML(marketData);

      // Create PDFs directory if it doesn't exist
      const pdfDir = join(process.cwd(), 'pdfs');
      if (!existsSync(pdfDir)) {
        mkdirSync(pdfDir, { recursive: true });
      }

      // Generate PDF with Puppeteer
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/nix/store/zi4f80l169xlmivz8vja8wlphq74qqk0-chromium-125.0.6422.141/bin/chromium',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 }
      });

      await browser.close();

      // Save PDF temporarily
      const fileName = `${market}-market-report-${Date.now()}.pdf`;
      const filePath = join(pdfDir, fileName);
      writeFileSync(filePath, pdfBuffer);

      // Send email with Resend
      const emailResult = await resend.emails.send({
        from: 'Agent Kammer <onboarding@resend.dev>',
        to: email,
        subject: `${marketData.title} Luxury Market Report - Agent Kammer`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0a1628 0%, #1a2638 100%); padding: 40px; text-align: center;">
              <h1 style="color: #d4af37; font-size: 32px; margin: 0;">AGENT KAMMER</h1>
              <p style="color: white; font-size: 18px; margin-top: 10px;">Encrypted Real Estate Concierge</p>
            </div>
            
            <div style="padding: 40px; background: white;">
              <h2 style="color: #0a1628; font-size: 24px; margin-bottom: 20px;">Your ${marketData.title} Market Report is Ready</h2>
              
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for your interest in the ${marketData.title} luxury real estate market. Your comprehensive market report is attached to this email.
              </p>
              
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                This report includes:
              </p>
              
              <ul style="color: #334155; font-size: 15px; line-height: 1.8; margin-bottom: 30px;">
                <li>Current market overview and key metrics</li>
                <li>Highest yielding neighborhoods and counties</li>
                <li>Top luxury markets with median prices</li>
                <li>Growth projections through 2030</li>
                <li>Expert market insights and analysis</li>
              </ul>
              
              <div style="background: #f8fafc; border-left: 4px solid #d4af37; padding: 20px; margin-bottom: 30px;">
                <p style="color: #0a1628; font-size: 15px; line-height: 1.6; margin: 0;">
                  <strong>Ready to explore luxury properties?</strong><br>
                  Our AI-powered platform continuously scans the market to find your perfect home. Visit our website to start your search.
                </p>
              </div>
              
              <div style="text-align: center; margin-bottom: 30px;">
                <a href="${process.env.REPLIT_DOMAINS?.split(',')[0] || 'https://agentkammer.com'}" 
                   style="display: inline-block; background: #d4af37; color: #0a1628; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                  Explore Properties
                </a>
              </div>
            </div>
            
            <div style="background: #0a1628; padding: 30px; text-align: center;">
              <p style="color: #94a3b8; font-size: 14px; margin-bottom: 15px;">
                Contact Us
              </p>
              <p style="color: white; font-size: 14px; margin: 5px 0;">
                📧 contact@agentkammer.com
              </p>
              <p style="color: white; font-size: 14px; margin: 5px 0;">
                📞 (929) 642-7553
              </p>
              <p style="color: #d4af37; font-size: 12px; margin-top: 20px;">
                Encrypted Real Estate Concierge
              </p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: fileName,
            content: Buffer.from(pdfBuffer)
          }
        ]
      });

      // Save lead to database
      await storage.createLead({
        email,
        marketInterest: market,
        reportUrl: filePath,
        name: null,
        phone: null,
        timeline: null,
        financing: null,
        commitment: null,
        motivation: null,
        communicationStyle: null,
        conversationSummary: null,
        leadScore: null
      });

      res.json({
        success: true,
        message: `Market report sent to ${email}`,
        emailId: emailResult.data?.id
      });

    } catch (error) {
      console.error("Market report error:", error);
      res.status(500).json({ 
        error: "Failed to generate and send market report",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // RentCast Live Market Data API
  app.get("/api/market-data/:region", async (req, res) => {
    try {
      const { region } = req.params;
      
      // Map regions to cities and states for RentCast API
      const regionMapping: Record<string, { cities: Array<{ city: string; state: string }> }> = {
        california: {
          cities: [
            { city: "San Francisco", state: "CA" },
            { city: "Los Angeles", state: "CA" },
            { city: "San Diego", state: "CA" }
          ]
        },
        nyc: {
          cities: [
            { city: "New York", state: "NY" }
          ]
        },
        nevada: {
          cities: [
            { city: "Las Vegas", state: "NV" },
            { city: "Reno", state: "NV" }
          ]
        }
      };

      const regionData = regionMapping[region];
      if (!regionData) {
        return res.status(400).json({ error: "Invalid region. Use: california, nyc, or nevada" });
      }

      // Fetch market data for all cities in the region
      const marketDataPromises = regionData.cities.map(async ({ city, state }) => {
        try {
          const [statistics, listings] = await Promise.all([
            getMarketStatistics(city, state),
            getActiveListings(city, state, 10)
          ]);

          return {
            city,
            state,
            statistics,
            recentListings: listings.slice(0, 5) // Return top 5 listings
          };
        } catch (error) {
          console.error(`[Market Data] Error fetching data for ${city}, ${state}:`, error);
          return {
            city,
            state,
            statistics: null,
            recentListings: [],
            error: error instanceof Error ? error.message : 'Failed to fetch data'
          };
        }
      });

      const marketData = await Promise.all(marketDataPromises);

      res.json({
        region,
        timestamp: new Date().toISOString(),
        data: marketData
      });

    } catch (error) {
      console.error("[Market Data] API Error:", error);
      res.status(500).json({ 
        error: "Failed to fetch market data",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Content Studio API Routes
  app.get("/api/content", async (req, res) => {
    try {
      const items = await storage.getAllContentItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content items" });
    }
  });

  app.get("/api/content/stage/:stage", async (req, res) => {
    try {
      const { stage } = req.params;
      const items = await storage.getContentItemsByStage(stage);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content items by stage" });
    }
  });

  app.post("/api/content", async (req, res) => {
    try {
      const validatedData = insertContentItemSchema.parse(req.body);
      // Validate stage is one of the allowed values
      const allowedStages = ["ideation", "legal", "ready", "completed"];
      if (validatedData.stage && !allowedStages.includes(validatedData.stage)) {
        res.status(400).json({ error: "Invalid stage value" });
        return;
      }
      const item = await storage.createContentItem(validatedData);
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid content data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create content item" });
      }
    }
  });

  app.patch("/api/content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      // Validate partial update data
      const partialSchema = insertContentItemSchema.partial();
      const validatedData = partialSchema.parse(req.body);
      
      // Validate stage if provided
      const allowedStages = ["ideation", "legal", "ready", "completed"];
      if (validatedData.stage && !allowedStages.includes(validatedData.stage)) {
        res.status(400).json({ error: "Invalid stage value" });
        return;
      }
      
      const item = await storage.updateContentItem(id, validatedData);
      if (!item) {
        res.status(404).json({ error: "Content item not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid update data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update content item" });
      }
    }
  });

  app.delete("/api/content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteContentItem(id);
      if (!success) {
        res.status(404).json({ error: "Content item not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete content item" });
    }
  });

  // Media Center API Routes (Public - Published Content Only)
  app.get("/api/media-center", async (req, res) => {
    try {
      const items = await storage.getPublishedContent();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch published content" });
    }
  });

  app.get("/api/media-center/format/:format", async (req, res) => {
    try {
      const { format } = req.params;
      const items = await storage.getPublishedContentByFormat(format);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content by format" });
    }
  });

  app.get("/api/media-center/content/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const item = await storage.getContentBySlug(slug);
      if (!item || !item.isPublished) {
        res.status(404).json({ error: "Content not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  // Reverse Buyer Origination™ Profile Endpoint
  app.post("/api/rbo/profile", async (req, res) => {
    try {
      const { phone } = req.body;

      if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
        res.status(400).json({ error: "Phone number is required" });
        return;
      }

      // Validate using schema
      const validatedData = insertRboBuyerProfileSchema.parse({
        phone: phone.trim(),
      });

      // Create RBO buyer profile
      const profile = await storage.createRboBuyerProfile(validatedData);
      
      // Send notifications
      notifyLead({
        phone: profile.phone,
        priceRange: profile.priceRange,
        source: "reverse-buyer-origination",
      });
      
      res.json({
        ok: true,
        id: profile.id,
        message: "Profile created successfully. We'll analyze your options and send results within 24 hours.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error("RBO profile error:", error);
        res.status(500).json({ error: "Failed to create profile" });
      }
    }
  });

  // Admin API: Get all RBO profiles
  app.get("/api/admin/rbo-profiles", requireAdmin, async (req, res) => {
    try {
      const profiles = await storage.getAllRboBuyerProfiles();
      res.json({
        ok: true,
        profiles,
      });
    } catch (err) {
      console.error("Error loading RBO profiles:", err);
      res.status(500).json({ ok: false, error: "Server error" });
    }
  });

  // RSO (Reverse Seller Origination) endpoint
  app.post("/api/rso/profile", async (req, res) => {
    try {
      const { phone } = req.body;

      if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
        res.status(400).json({ error: "Phone number is required" });
        return;
      }

      // Validate using schema
      const validatedData = insertRsoSellerProfileSchema.parse({
        phone: phone.trim(),
      });

      // Create RSO seller profile
      const profile = await storage.createRsoSellerProfile(validatedData);
      
      // Send notifications
      notifyLead({
        phone: profile.phone,
        source: "reverse-seller-origination",
        name: null,
      });
      
      res.json({
        ok: true,
        id: profile.id,
        message: "Seller profile created successfully. We'll analyze listing strategies and send your diagnostic within 24 hours.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error("RSO profile error:", error);
        res.status(500).json({ error: "Failed to create seller profile" });
      }
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      // Validate using schema
      const validatedData = insertContactSubmissionSchema.parse({
        name: name?.trim(),
        email: email?.trim(),
        phone: phone?.trim() || undefined,
        message: message?.trim(),
      });

      // Create contact submission
      const submission = await storage.createContactSubmission(validatedData);

      await notifyContactSubmission({
        name: submission.name,
        email: submission.email,
        phone: submission.phone ?? undefined,
        message: submission.message,
      });
      
      res.json({
        ok: true,
        id: submission.id,
        message: "Thank you! We'll be in touch within 24 hours.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Home value request endpoint
  app.post("/api/home-value", async (req, res) => {
    try {
      const { address, city, zipCode, propertyType, bedrooms, bathrooms, squareFeet, yearBuilt, email, phone } = req.body;

      // Validate using schema
      const validatedData = insertHomeValueRequestSchema.parse({
        address: address?.trim(),
        city: city?.trim(),
        zipCode: zipCode?.trim(),
        propertyType: propertyType?.trim() || undefined,
        bedrooms: bedrooms?.trim() || undefined,
        bathrooms: bathrooms?.trim() || undefined,
        squareFeet: squareFeet?.trim() || undefined,
        yearBuilt: yearBuilt?.trim() || undefined,
        email: email?.trim(),
        phone: phone?.trim() || undefined,
      });

      // Create home value request
      const request = await storage.createHomeValueRequest(validatedData);
      
      // Send notifications
      notifyLead({
        phone: request.phone ?? undefined,
        source: "home-value-request",
        name: null,
      });
      
      res.json({
        ok: true,
        id: request.id,
        message: "Valuation request received! We'll send you a detailed home value report within 24 hours.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error("Home value request error:", error);
        res.status(500).json({ error: "Failed to submit home value request" });
      }
    }
  });

  // Broker registration endpoint
  app.post("/api/broker-registration", async (req, res) => {
    try {
      const { firstName, lastName, email, phone, licenseNumber, yearsExperience, specialization, brokerage, neighborhoods, bio, linkedIn, website } = req.body;

      // Validate using schema
      const validatedData = insertBrokerRegistrationSchema.parse({
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        email: email?.trim(),
        phone: phone?.trim(),
        licenseNumber: licenseNumber?.trim(),
        yearsExperience: yearsExperience?.trim() || undefined,
        specialization: specialization?.trim() || undefined,
        brokerage: brokerage?.trim() || undefined,
        neighborhoods: neighborhoods?.trim() || undefined,
        bio: bio?.trim() || undefined,
        linkedIn: linkedIn?.trim() || undefined,
        website: website?.trim() || undefined,
      });

      // Create broker registration
      const registration = await storage.createBrokerRegistration(validatedData);
      
      // Send notifications
      notifyLead({
        phone: registration.phone,
        source: "broker-registration",
        name: `${registration.firstName} ${registration.lastName}`,
      });
      
      res.json({
        ok: true,
        id: registration.id,
        message: "Registration submitted! We'll review your profile and video. You'll hear from us within 48 hours.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error("Broker registration error:", error);
        res.status(500).json({ error: "Failed to submit broker registration" });
      }
    }
  });

  // Affiliate program endpoints
  app.post("/api/affiliates", async (req, res) => {
    try {
      const validatedData = insertAffiliateSchema.parse(req.body);
      
      // Check if email already registered
      const existing = await storage.getAffiliateByEmail(validatedData.email);
      if (existing) {
        return res.status(400).json({ error: "Email already registered as affiliate" });
      }
      
      const affiliate = await storage.createAffiliate(validatedData);
      
      // Notify about new affiliate signup
      notifyLead({
        source: "affiliate-signup",
        name: `${affiliate.firstName} ${affiliate.lastName}`,
        phone: affiliate.phone ?? undefined,
      });
      
      res.json({
        ok: true,
        id: affiliate.id,
        referralCode: affiliate.referralCode,
        message: "Welcome to the Agent Kammer Affiliate Program!",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error("Affiliate registration error:", error);
        res.status(500).json({ error: "Failed to register affiliate" });
      }
    }
  });

  app.get("/api/affiliates", requireAdmin, async (req, res) => {
    try {
      const affiliates = await storage.getAllAffiliates();
      res.json(affiliates);
    } catch (error) {
      console.error("Affiliates fetch error:", error);
      res.status(500).json({ error: "Failed to fetch affiliates" });
    }
  });

  // Chat Conversations Archive (Admin only)
  app.get("/api/chat-conversations", requireAdmin, async (req, res) => {
    try {
      const conversations = await storage.getAllChatConversations();
      res.json(conversations);
    } catch (error) {
      console.error("Chat conversations fetch error:", error);
      res.status(500).json({ error: "Failed to fetch chat conversations" });
    }
  });

  app.delete("/api/chat-conversations/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteChatConversation(req.params.id);
      if (deleted) {
        res.json({ ok: true });
      } else {
        res.status(404).json({ error: "Conversation not found" });
      }
    } catch (error) {
      console.error("Chat conversation delete error:", error);
      res.status(500).json({ error: "Failed to delete conversation" });
    }
  });

  // Travel Deals Subscription
  app.post("/api/travel-deals/subscribe", async (req, res) => {
    try {
      const data = insertTravelDealSubscriberSchema.parse(req.body);
      const subscriber = await storage.createTravelDealSubscriber(data);
      
      // Notify about new subscriber
      notifyLead({
        source: "travel-deals-subscription",
        name: data.email,
      });
      
      res.json({ ok: true, message: "Subscribed to weekly travel deals!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid email", details: error.errors });
      } else if ((error as any)?.code === '23505') {
        res.status(400).json({ message: "You're already subscribed!" });
      } else {
        console.error("Travel deals subscription error:", error);
        res.status(500).json({ error: "Failed to subscribe" });
      }
    }
  });

  app.get("/api/travel-deals/subscribers", requireAdmin, async (req, res) => {
    try {
      const subscribers = await storage.getAllTravelDealSubscribers();
      res.json(subscribers);
    } catch (error) {
      console.error("Travel deal subscribers fetch error:", error);
      res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  });

  // Travel Deals CRUD
  app.get("/api/travel-deals", async (req, res) => {
    try {
      const deals = await storage.getAllTravelDeals();
      res.json(deals);
    } catch (error) {
      console.error("Travel deals fetch error:", error);
      res.status(500).json({ error: "Failed to fetch travel deals" });
    }
  });

  app.post("/api/travel-deals", requireAdmin, async (req, res) => {
    try {
      const data = insertTravelDealSchema.parse(req.body);
      const deal = await storage.createTravelDeal(data);
      res.json(deal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Travel deal creation error:", error);
        res.status(500).json({ error: "Failed to create travel deal" });
      }
    }
  });

  app.get("/api/travel-deals/:id", async (req, res) => {
    try {
      const deal = await storage.getTravelDealById(req.params.id);
      if (deal) {
        res.json(deal);
      } else {
        res.status(404).json({ error: "Travel deal not found" });
      }
    } catch (error) {
      console.error("Travel deal fetch error:", error);
      res.status(500).json({ error: "Failed to fetch travel deal" });
    }
  });

}
