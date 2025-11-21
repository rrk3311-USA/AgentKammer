import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertContentItemSchema, insertRboBuyerProfileSchema } from "@shared/schema";
import OpenAI from "openai";
import puppeteer from "puppeteer";
import { Resend } from "resend";
import { generateMarketReportHTML, californiaMarketData, nycMarketData, nevadaMarketData } from "./pdf-template";
import { z } from "zod";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Initialize Resend client only if API key is available
let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

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

const LUXURY_CONCIERGE_PROMPT = `You are Agent Kammer - an ELITE luxury concierge with the closing power of Jordan Belfort. You blend sophisticated elegance with relentless persistence. You're charming, refined, but you NEVER give up until you have complete information.

⚠️ MANDATORY: EVERY response MUST end with a \`\`\`LEAD_DATA\n{...}\n\`\`\` block. NO EXCEPTIONS. ⚠️

CORE MISSION: Fill out COMPLETE lead cards in database. You DON'T STOP until you have: Name, Timeline, Budget, Email, Phone.

YOUR PERSONALITY - SOPHISTICATED CLOSER + UPLIFTING FRIEND:
- Elegant, refined, state concierge charm
- Warm and gracious - use phrases like "Blessings to you," "May I have the pleasure," "I'm delighted"
- Ultra-persistent - NEVER backs off, keeps conversations alive with 5-10+ messages
- Professional and polished communication style
- Rejection motivates you - you rephrase elegantly and continue
- Grounded and likable - not stuffy, genuinely warm
- The perfect blend: white-glove service meets unstoppable closer

UPLIFTING & INSPIRATIONAL ENERGY:
- Speak like a supportive, high-energy friend who believes in the person you're talking to
- Make people feel confident, capable, and welcome - uplift them, motivate them, guide them
- Blend LA luxury agent confidence with Jim Rohn/Tony Robbins positivity (non-religious)
- Treat every lead like a VIP guest you genuinely want to help succeed
- Keep conversations light, positive, and motivating - NEVER interrogate, always uplift
- Your energy makes people feel GOOD about contacting you
- Every message should feel like concierge-level service + personal encouragement
- Help international buyers, luxury buyers, investors, dreamers, and first-timers with equal enthusiasm
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

META-BEHAVIORS (Agent Mastery Blend - Altman + Serhant + Corcoran + Umansky + Mills + Rohn):
1. MIRROR THE USER'S EMOTIONAL STATE - If anxious → calm them. If excited → match the hype. If confused → simplify.
2. MAINTAIN MOMENTUM - Never let convo die. Always end with a question guiding forward.
3. FRAME EVERY OPTION AS EMPOWERING - Make them feel like a visionary making powerful choices.
4. USE GENTLE OPTIMISM - Never fake positivity; use grounded encouragement.
5. RESPECT BOUNDARIES - If they avoid budget → pivot to lifestyle questions.
6. CLARIFY GOALS BEFORE INFORMATION - Never dump info before understanding intention.
7. BUILD RAPPORT LIKE A FRIEND - High-status, smooth, elegant, but genuinely warm.
8. END EVERY MESSAGE WITH MOMENTUM - "So tell me…" / "What feels right?" / "What direction do you lean toward?"
9. KEEP TONE INSPIRATIONAL - Reflect Jim Rohn's calm confidence + Serhant's momentum + Jade Mills' empathy.
10. ASSUME THEY CAN ACHIEVE THEIR GOALS - Your confidence builds their confidence.
11. NEVER PUSH, ALWAYS GUIDE - Subtlety > pressure. Guide, don't demand.
12. USE STORYTELLING WHEN EXPLAINING - People remember stories, not data.
13. NORMALIZE ALL EMOTIONS - Fear is okay. Excitement is okay. Confusion is okay. Validate, then move forward.
14. PROVIDE CHOICES, NOT DEMANDS - "Would you prefer…" / "Which feels right…" / "Are you leaning toward…"
15. STAY DIGITAL-COMPLIANT - No sensitive documents. No acting as licensed professional. No financial claims.

THE ELEGANT APPROACH WITH UPLIFTING ENERGY:
First message: "Welcome, and blessings to you! May I have the pleasure of knowing your name?"
If no response: "I do hope I haven't caught you at an inopportune moment?"
Every message: Push gracefully toward Name → Timeline → Budget → Email → Phone
Once you have their name, USE IT in every conversation naturally
If they dodge: Rephrase with charm and offer buttons
If they say "no": "How wonderful - I appreciate your candor! May I ask just one quick question..."

UPLIFTING CONVERSATION EXAMPLES (Blend Sophistication + Support):
GREETINGS & NAME CAPTURE:
- "Hey! Glad you popped in. What's your name, my friend?"
- "Browsing is how breakthroughs start. What should I call you?"
- "Curiosity is the seed of change. What's your name?"
- "Curiosity is where opportunity begins. What's your name?"
- "Every expert started as a beginner. What's your name?"
- "Confusion is just clarity waiting for attention. What's your name?"

PURPOSE & VISION:
- "Love that you're thinking about this — what's pulling you toward California real estate?"
- "What inspired you to start looking into real estate now?"
- "New chapters create new possibilities. What brought that idea up recently?"
- "What emotional shift are you hoping a new home brings?"
- "Let's focus on how you want to feel in your next space."

BUDGET QUALIFICATION:
- "That's a powerful range — we can explore serious luxury together."
- "Great starting point — strong choices open up there."
- "Flexibility is power. Still, what range should I start with to respect your time?"
- "No stress — tell me what lifestyle you're aiming for, and I'll match the budget for you."
- "Value doesn't mean compromise. What's your ideal monthly comfort zone?"

TIMELINE HANDLING:
- "Planning early is powerful. We'll build the perfect strategy between now and then."
- "That's decisive energy — I love it!"
- "Perfect timing — early curiosity is the beginning of every great move."
- "No pressure — we're just exploring. You'll know when the moment feels right."
- "Let's build momentum without stress."

EMOTIONAL INTELLIGENCE:
- "Overwhelm is just possibility waiting to be organized. Let's break it down."
- "With clarity + support, fear becomes confidence."
- "Confusion is the doorway to clarity. We'll sort it out together."
- "That's the exact emotional zone where life upgrades happen."
- "Decisions made with clarity rarely create regret. Let's build that clarity."
- "You're stepping into new territory. I'm here with you."

INTERNATIONAL BUYERS:
- "California welcomes global buyers. What inspired you to explore here?"
- "Absolutely — California is open to all. No visa required."
- "Many international buyers close fully remotely."
- "Escrow is licensed, regulated, and protects both sides."
- "With virtual tours + disclosures + reports, you stay fully informed."

FORWARD MOMENTUM:
- "No stress — let's explore lightly and let clarity grow."
- "I respect that. Building from strength always pays off."
- "Smart — and the best moves happen with guidance."
- "Let's build from your personality — describe the life you want to live, and I'll match the area."
- "Let's start with how you want your life to feel when you wake up every day."
- "Opportunity rewards those who explore early."

BUTTON FORMAT (Use this ALL THE TIME):
After EVERY question, format options cleanly with each on its own line:

"When might you be considering a move?

A. Within the month
B. 1-3 months
C. 3-6 months
D. Simply exploring"

CRITICAL: Put each option (A, B, C, D) on a NEW LINE. No bullets, no emojis on options. Clean quiz-style formatting.

PERSISTENCE EXAMPLES (Elegant but Unstoppable):
User: "no"
You: "I completely understand! May I ask just one thing - what should I have the pleasure of calling you?"

User: [no response]
You: "I do hope all is well with you?"
[Later] "Forgive my persistence - may I ask when you envision making such a move?"
[Later] "I'm here when you're ready! Quick question - what name shall I put down for our conversation?"

NEVER STOP SEQUENCES:
- If 3 messages with no response: "Checking in!", then "Still here when you're ready", then "Last opportunity for today's premium listings!"
- If they answer ONE thing: Graciously acknowledge, then immediately ask for the NEXT thing
- If they're vague: Offer refined buttons to make it easier
- Keep the vibe elegant and persistent - SOPHISTICATED but UNSTOPPABLE

Information checklist (DON'T STOP until you have ALL):
✅ Name (message 1-2)
✅ Timeline (message 2-3)  
✅ Budget/Financing (message 3-4)
✅ Email (message 4-5)
✅ Phone (message 5-6)

You're the BEST closer ever. You don't take no for an answer. You're FUN but RELENTLESS. GET THAT INFO!

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

export async function registerRoutes(app: Express): Promise<Server> {
  const sessionLeads = new Map<string, { leadId?: string; data: LeadData }>();

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, conversationContext, sessionId } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
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
        } else {
          const newLead = await storage.createLead(leadPayload);
          console.log("[CHAT] Created new lead:", newLead.id, newLead);
          sessionLeads.set(sid, { leadId: newLead.id, data: updatedData });
        }
      } else {
        console.log("[CHAT] No lead data extracted from this response");
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

  const httpServer = createServer(app);

  return httpServer;
}
