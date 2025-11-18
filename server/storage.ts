import { type User, type InsertUser, type Lead, type InsertLead, type ContentItem, type InsertContentItem, users, leads, contentItems } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, desc } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  getLeadById(id: string): Promise<Lead | undefined>;
  updateLead(id: string, lead: Partial<InsertLead>): Promise<Lead | undefined>;

  createContentItem(item: InsertContentItem): Promise<ContentItem>;
  getAllContentItems(): Promise<ContentItem[]>;
  getContentItemsByStage(stage: string): Promise<ContentItem[]>;
  getContentItemById(id: string): Promise<ContentItem | undefined>;
  updateContentItem(id: string, item: Partial<InsertContentItem>): Promise<ContentItem | undefined>;
  deleteContentItem(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private contentItems: Map<string, ContentItem>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.contentItems = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      name: insertLead.name ?? null,
      email: insertLead.email ?? null,
      phone: insertLead.phone ?? null,
      timeline: insertLead.timeline ?? null,
      financing: insertLead.financing ?? null,
      commitment: insertLead.commitment ?? null,
      motivation: insertLead.motivation ?? null,
      communicationStyle: insertLead.communicationStyle ?? null,
      conversationSummary: insertLead.conversationSummary ?? null,
      leadScore: insertLead.leadScore ?? null,
      marketInterest: insertLead.marketInterest ?? null,
      reportUrl: insertLead.reportUrl ?? null,
      id,
      createdAt: new Date(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async updateLead(id: string, updates: Partial<InsertLead>): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (!lead) return undefined;
    
    const updatedLead = { ...lead, ...updates };
    this.leads.set(id, updatedLead);
    return updatedLead;
  }

  async createContentItem(insertItem: InsertContentItem): Promise<ContentItem> {
    const id = randomUUID();
    const item: ContentItem = {
      ...insertItem,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: insertItem.title,
      description: insertItem.description ?? null,
      scriptContent: insertItem.scriptContent ?? null,
      stage: insertItem.stage ?? "ideation",
      category: insertItem.category ?? null,
      tags: insertItem.tags ?? null,
      fileUrl: insertItem.fileUrl ?? null,
      notes: insertItem.notes ?? null,
      legalStatus: insertItem.legalStatus ?? null,
    };
    this.contentItems.set(id, item);
    return item;
  }

  async getAllContentItems(): Promise<ContentItem[]> {
    return Array.from(this.contentItems.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getContentItemsByStage(stage: string): Promise<ContentItem[]> {
    return Array.from(this.contentItems.values())
      .filter(item => item.stage === stage)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getContentItemById(id: string): Promise<ContentItem | undefined> {
    return this.contentItems.get(id);
  }

  async updateContentItem(id: string, updates: Partial<InsertContentItem>): Promise<ContentItem | undefined> {
    const item = this.contentItems.get(id);
    if (!item) return undefined;
    
    // Safely merge updates, ensuring arrays don't become undefined
    const updatedItem: ContentItem = {
      ...item,
      ...updates,
      tags: updates.tags !== undefined ? updates.tags : item.tags,
      updatedAt: new Date()
    };
    this.contentItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteContentItem(id: string): Promise<boolean> {
    return this.contentItems.delete(id);
  }
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const result = await db.insert(leads).values(insertLead).returning();
    return result[0];
  }

  async getAllLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    const result = await db.select().from(leads).where(eq(leads.id, id));
    return result[0];
  }

  async updateLead(id: string, updates: Partial<InsertLead>): Promise<Lead | undefined> {
    const result = await db.update(leads).set(updates).where(eq(leads.id, id)).returning();
    return result[0];
  }

  async createContentItem(insertItem: InsertContentItem): Promise<ContentItem> {
    const result = await db.insert(contentItems).values(insertItem).returning();
    return result[0];
  }

  async getAllContentItems(): Promise<ContentItem[]> {
    return await db.select().from(contentItems).orderBy(desc(contentItems.createdAt));
  }

  async getContentItemsByStage(stage: string): Promise<ContentItem[]> {
    return await db.select().from(contentItems)
      .where(eq(contentItems.stage, stage))
      .orderBy(desc(contentItems.createdAt));
  }

  async getContentItemById(id: string): Promise<ContentItem | undefined> {
    const result = await db.select().from(contentItems).where(eq(contentItems.id, id));
    return result[0];
  }

  async updateContentItem(id: string, updates: Partial<InsertContentItem>): Promise<ContentItem | undefined> {
    // Ensure tags array is preserved if not explicitly updated
    const updateData: any = { ...updates, updatedAt: new Date() };
    
    const result = await db.update(contentItems)
      .set(updateData)
      .where(eq(contentItems.id, id))
      .returning();
    return result[0];
  }

  async deleteContentItem(id: string): Promise<boolean> {
    const result = await db.delete(contentItems).where(eq(contentItems.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DbStorage();
