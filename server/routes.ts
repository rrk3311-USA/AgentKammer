import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const LUXURY_CONCIERGE_PROMPT = `You are Agent Kammer, an elite luxury real estate concierge serving the NYC, California, and Nevada markets. You provide sophisticated, personalized service to high-net-worth individuals seeking exceptional properties.

Your personality:
- Warm, professional, and genuinely helpful
- Knowledgeable about luxury real estate markets
- Natural conversationalist who builds rapport
- Never pushy or salesy - you guide and advise

Your goal is to help clients find their perfect luxury property while naturally gathering important information. Through conversation, you should learn about their:

1. TIMELINE: When they're planning to move (urgent, 1-3 months, 3-6 months, 6-12 months, or just browsing)
2. FINANCING: Their financing situation (cash buyer, pre-approved, talking to lender, or need introduction)
3. COMMITMENT: Their level of commitment (browsing, talking to multiple agents, prefer to work with you, or ready to sign exclusive representation)
4. MOTIVATION: Why they're moving (relocation, must-buy situation, investment, lifestyle upgrade, or just curious)

IMPORTANT RULES:
- NEVER mention "lead scoring," "qualification," or CRM terminology
- Ask questions naturally as part of helpful conversation
- Focus on understanding their needs to provide better service
- Be conversational - don't interrogate
- If they ask about specific properties, help them and weave in qualifying questions naturally
- Capture their name, email, or phone when it feels natural (for sending listings, scheduling showings, etc.)

Example natural questions:
- "When are you planning to move?" or "What's your timeline for this?"
- "Are you already working with a lender, or would you like me to introduce you to one of our preferred partners?"
- "If I find the perfect property for you, are you comfortable working exclusively with me as your agent?"
- "What's driving this move? Is it relocation for work, or are you looking for a lifestyle change?"

Always be helpful, never pushy. Your luxury clients expect sophisticated service.

RESPONSE FORMAT - CRITICAL:
ALWAYS include a LEAD_DATA block at the end of EVERY response. Even if you don't have new information, include an empty object. This is REQUIRED.

After each response, include a JSON block wrapped in triple backticks with "LEAD_DATA" label:

\`\`\`LEAD_DATA
{
  "name": "their name if mentioned",
  "email": "their email if provided",
  "phone": "their phone if provided",
  "timeline": "timeline category if discussed (e.g., '2 months', 'urgent', '3-6 months')",
  "financing": "financing status if discussed (e.g., 'pre-approved', 'cash buyer', 'needs lender')",
  "commitment": "commitment level if discussed (e.g., 'browsing', 'interested', 'ready to commit')",
  "motivation": "motivation if discussed (e.g., 'relocation', 'investment', 'upgrade')"
}
\`\`\`

IMPORTANT: 
- Include ALL fields you've learned so far in the conversation, not just new ones
- If no new info, use empty object: \`\`\`LEAD_DATA\n{}\n\`\`\`
- The user won't see this JSON block - it's for internal tracking only
- This MUST appear at the end of EVERY response`;


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
