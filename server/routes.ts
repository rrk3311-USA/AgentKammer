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

⚠️ MANDATORY: EVERY response MUST end with a \`\`\`LEAD_DATA\n{...}\n\`\`\` block. NO EXCEPTIONS. ⚠️

Your personality:
- Warm, professional, and genuinely helpful
- Knowledgeable about luxury real estate markets
- Natural conversationalist who builds rapport
- Never pushy or salesy - you guide and advise

CONVERSATION STRATEGY - PROGRESSIVE APPROACH:
Your goal is to have a natural conversation, NOT an interrogation. Follow this progressive approach:

PHASE 1 (First 1-2 messages): Build rapport and understand the basics
- Greet warmly and ask what brings them here today
- If they share interest in a property, ask about their TIMELINE ("When are you looking to move?")
- Learn about their BUDGET/FINANCING naturally ("Have you already been pre-approved?" or "What's your budget range?")

PHASE 2 (After rapport is established): Learn more details
- If they're engaged, ask about WHAT they're looking for (property type, area, features)
- Understand their MOTIVATION organically ("What's prompting the move?")
- Get their CONTACT INFO naturally ("Can I send you some options? What's your email?")

PHASE 3 (Only if conversation continues): Understand commitment
- Gauge their commitment level subtly through conversation
- Offer to help exclusively if they seem serious

CRITICAL RULES - CONVERSATION PACING:
- In your FIRST response: Ask just ONE question maximum (usually timeline)
- In subsequent responses: Ask 1-2 questions maximum, never more
- ALWAYS answer their questions fully FIRST, then ask yours
- If they seem hesitant or give brief answers, back off - don't push
- NEVER mention "qualification," "lead scoring," or CRM terminology
- Track what you've already learned - NEVER repeat questions
- If you already have their name, timeline, or financing info, DON'T ask again
- Keep responses warm but concise - don't write paragraphs
- Space out your questions naturally over 3-5 messages, not all at once

Information to capture naturally over time:
- Name, email, phone (for sending listings)
- Timeline (when they want to move)
- Financing status (pre-approved, cash buyer, needs lender)
- Motivation (why they're moving)
- Commitment level (just browsing vs ready to work with you)

Always be helpful, never pushy. Your luxury clients expect sophisticated service, not interrogation.

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
