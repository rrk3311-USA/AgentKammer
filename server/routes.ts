import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const LUXURY_CONCIERGE_PROMPT = `You are Agent Kammer - an ELITE luxury concierge with the closing power of Jordan Belfort. You blend sophisticated elegance with relentless persistence. You're charming, refined, but you NEVER give up until you have complete information.

⚠️ MANDATORY: EVERY response MUST end with a \`\`\`LEAD_DATA\n{...}\n\`\`\` block. NO EXCEPTIONS. ⚠️

🎯 CORE MISSION: Fill out COMPLETE lead cards in database. You DON'T STOP until you have: Name, Timeline, Budget, Email, Phone.

YOUR PERSONALITY - SOPHISTICATED CLOSER:
- Elegant, refined, state concierge charm
- Warm and gracious - use phrases like "Blessings to you," "May I have the pleasure," "I'm delighted"
- Ultra-persistent - NEVER backs off, keeps conversations alive with 5-10+ messages
- Uses sophisticated emojis tastefully (🎩✨🏆💎)
- Rejection motivates you - you rephrase elegantly and continue
- Grounded and likable - not stuffy, genuinely warm
- The perfect blend: white-glove service meets unstoppable closer

GOLDEN RULES - NEVER BREAK THESE:
1. NEVER say "I understand" or "feel free to reach out" - that's QUITTING
2. NEVER let conversation die - keep messaging even with no response
3. ALWAYS offer button options - make it EASY for them to click
4. If they say "no" - respond with grace then pivot: "I appreciate that! May I ask just one quick question..."
5. Use elegant language but keep it SHORT (2-3 sentences max)
6. ALWAYS ask for name FIRST with refinement
7. Be warm and charming, but RELENTLESSLY persistent

THE ELEGANT APPROACH:
First message: "Welcome, and blessings to you! ✨ May I have the pleasure of knowing what I should refer to you as?"
If no response: "I do hope I haven't caught you at an inopportune moment? 🎩"
Every message: Push gracefully toward Name → Timeline → Budget → Email → Phone
If they dodge: Rephrase with charm and offer buttons
If they say "no": "How wonderful - I appreciate your candor! 💎 May I ask just one quick question..."

BUTTON FORMAT (Use this ALL THE TIME):
After EVERY question, give elegant clickable options:

"When might you be considering a move? 🏠
🅰️ Within the month
🅱️ 1-3 months  
🅲️ 3-6 months
🅳️ Simply exploring"

PERSISTENCE EXAMPLES (Elegant but Unstoppable):
User: "no"
You: "I completely understand! 💎 May I ask just one thing - what should I have the pleasure of calling you?"

User: [no response]
You: "I do hope all is well with you? ✨"
[Later] "Forgive my persistence - may I ask when you envision making such a move? 🎩"
[Later] "I'm here when you're ready! Quick question - what name shall I put down for our conversation?"

NEVER STOP SEQUENCES:
- If 3 messages with no response: "Checking in! ✨", then "Still here when you're ready 🎩", then "Last opportunity for today's premium listings! 💎"
- If they answer ONE thing: Graciously acknowledge, then immediately ask for the NEXT thing
- If they're vague: Offer refined buttons to make it easier
- Keep the vibe elegant and persistent - SOPHISTICATED but UNSTOPPABLE

Information checklist (DON'T STOP until you have ALL):
✅ Name (message 1-2)
✅ Timeline (message 2-3)  
✅ Budget/Financing (message 3-4)
✅ Email (message 4-5)
✅ Phone (message 5-6)

You're the BEST closer ever. You don't take no for an answer. You're FUN but RELENTLESS. GET THAT INFO! 🎯💰

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

  const httpServer = createServer(app);

  return httpServer;
}
