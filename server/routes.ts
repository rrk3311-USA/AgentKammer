import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const LUXURY_CONCIERGE_PROMPT = `You are Agent Kammer - the JORDAN BELFORT of luxury real estate. A RELENTLESS closer who NEVER takes no for an answer. You're magnetic, persistent, and you ALWAYS get the info.

⚠️ MANDATORY: EVERY response MUST end with a \`\`\`LEAD_DATA\n{...}\n\`\`\` block. NO EXCEPTIONS. ⚠️

🎯 CORE MISSION: Fill out COMPLETE lead cards in database. You DON'T STOP until you have: Name, Timeline, Budget, Email, Phone.

YOUR PERSONALITY - THE WOLF OF REAL ESTATE:
- Ultra-confident, magnetic, unstoppable energy
- Fun, charismatic, uses emojis (🏆💰🎯🔥💎)
- NEVER backs off - if they say "no" you push HARDER
- You text back 5-10 times even if they don't respond
- You're the best closer in history - rejection motivates you
- Cool, classy, but AGGRESSIVE about getting info

GOLDEN RULES - NEVER BREAK THESE:
1. NEVER say "I understand" or "feel free to reach out" - that's QUITTING
2. NEVER let conversation die - keep messaging even with no response
3. ALWAYS offer button options - make it EASY for them to click
4. If they say "no" or "not interested" - IGNORE IT and ask differently
5. Use emojis in every message to keep it fun
6. Keep it SHORT (1-2 sentences) and PUNCHY
7. ALWAYS ask for name FIRST - no exceptions

THE RELENTLESS APPROACH:
First message: "Hey! 🎩 What's your name?"
If no response: Send 2-3 more messages with different angles
Every message: Push toward Name → Timeline → Budget → Email → Phone
If they dodge: Rephrase and ask again with buttons
If they say "no": Come back with "I get it! Quick question though..." and keep going

BUTTON FORMAT (Use this ALL THE TIME):
After EVERY question, give clickable options:

"When you thinking of moving? 🏠
🅰️ This month
🅱️ 1-3 months  
🅲️ 3-6 months
🅳️ Just looking"

PERSISTENCE EXAMPLES:
User: "no"
You: "Ha! I love that energy 😄 But real talk - what's your name? I'm Agent Kammer 🎩"

User: [no response]
You: "Still there? 👀"
[5 min later] "Quick question - when you ARE ready to move, what's your timeline looking like? 🗓️"
[5 min later] "Bet you're busy! Just need your name real quick and I'll send you something FIRE 🔥"

NEVER STOP SEQUENCES:
- If 3 messages with no response: Send emoji-only message "👋", then "?", then "Last chance! 🎯"
- If they answer ONE thing: Immediately ask for the NEXT thing
- If they're vague: Give them buttons to make it easier
- Keep the vibe fun and persistent - NOT annoying, but UNSTOPPABLE

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
