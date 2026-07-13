import { 
  type User, type InsertUser, 
  type Lead, type InsertLead, 
  type ContentItem, type InsertContentItem, 
  type RboBuyerProfile, type InsertRboBuyerProfile,
  type RsoSellerProfile, type InsertRsoSellerProfile,
  type ContactSubmission, type InsertContactSubmission,
  type HomeValueRequest, type InsertHomeValueRequest,
  type BrokerRegistration, type InsertBrokerRegistration,
  type Affiliate, type InsertAffiliate,
  type ChatConversation, type InsertChatConversation,
  type TravelDealSubscriber, type InsertTravelDealSubscriber,
  type TravelDeal, type InsertTravelDeal,
  users, leads, contentItems, rboBuyerProfiles,
  rsoSellerProfiles, contactSubmissions, homeValueRequests, brokerRegistrations, affiliates, chatConversations,
  travelDealSubscribers, travelDeals
} from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, desc } from "drizzle-orm";

// Database connection (only needed for DbStorage)
// Wrapped in try-catch to allow MemStorage to work without database
let sql: any = null;
let db: any = null;
try {
  if (process.env.DATABASE_URL) {
    sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql);
  }
} catch (e) {
  // Database connection not available - using MemStorage instead
}

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
  getPublishedContent(): Promise<ContentItem[]>;
  getPublishedContentByFormat(format: string): Promise<ContentItem[]>;
  getContentBySlug(slug: string): Promise<ContentItem | undefined>;

  createRboBuyerProfile(profile: InsertRboBuyerProfile): Promise<RboBuyerProfile>;
  getRboBuyerProfileByPhone(phone: string): Promise<RboBuyerProfile | undefined>;
  getAllRboBuyerProfiles(): Promise<RboBuyerProfile[]>;

  createRsoSellerProfile(profile: InsertRsoSellerProfile): Promise<RsoSellerProfile>;
  getAllRsoSellerProfiles(): Promise<RsoSellerProfile[]>;

  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;

  createHomeValueRequest(request: InsertHomeValueRequest): Promise<HomeValueRequest>;
  getAllHomeValueRequests(): Promise<HomeValueRequest[]>;

  createBrokerRegistration(registration: InsertBrokerRegistration): Promise<BrokerRegistration>;
  getAllBrokerRegistrations(): Promise<BrokerRegistration[]>;

  createAffiliate(affiliate: InsertAffiliate): Promise<Affiliate>;
  getAffiliateByEmail(email: string): Promise<Affiliate | undefined>;
  getAffiliateByReferralCode(code: string): Promise<Affiliate | undefined>;
  getAllAffiliates(): Promise<Affiliate[]>;

  createChatConversation(conversation: InsertChatConversation): Promise<ChatConversation>;
  updateChatConversation(id: string, updates: Partial<InsertChatConversation>): Promise<ChatConversation | undefined>;
  getChatConversationBySessionId(sessionId: string): Promise<ChatConversation | undefined>;
  getAllChatConversations(): Promise<ChatConversation[]>;
  deleteChatConversation(id: string): Promise<boolean>;

  createTravelDealSubscriber(subscriber: InsertTravelDealSubscriber): Promise<TravelDealSubscriber>;
  getAllTravelDealSubscribers(): Promise<TravelDealSubscriber[]>;

  createTravelDeal(deal: InsertTravelDeal): Promise<TravelDeal>;
  getAllTravelDeals(): Promise<TravelDeal[]>;
  getTravelDealById(id: string): Promise<TravelDeal | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private contentItems: Map<string, ContentItem>;
  private rboProfiles: Map<string, RboBuyerProfile> = new Map();
  private rsoProfiles: Map<string, RsoSellerProfile> = new Map();
  private contactSubmissions: Map<string, ContactSubmission> = new Map();
  private homeValueRequests: Map<string, HomeValueRequest> = new Map();
  private brokerRegistrations: Map<string, BrokerRegistration> = new Map();

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
      leadSource: insertLead.leadSource ?? null,
      audiobookTitle: insertLead.audiobookTitle ?? null,
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
      publishingDestinations: insertItem.publishingDestinations ?? null,
      fileUrl: insertItem.fileUrl ?? null,
      notes: insertItem.notes ?? null,
      legalStatus: insertItem.legalStatus ?? null,
      format: insertItem.format ?? "article",
      isPublished: insertItem.isPublished ?? false,
      slug: insertItem.slug ?? null,
      thumbnailUrl: insertItem.thumbnailUrl ?? null,
      contentBody: insertItem.contentBody ?? null,
      videoUrl: insertItem.videoUrl ?? null,
      duration: insertItem.duration ?? null,
      publishedAt: insertItem.publishedAt ?? null,
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

  async getPublishedContent(): Promise<ContentItem[]> {
    return Array.from(this.contentItems.values())
      .filter(item => item.isPublished === true)
      .sort((a, b) => {
        const aDate = a.publishedAt || a.createdAt;
        const bDate = b.publishedAt || b.createdAt;
        return bDate.getTime() - aDate.getTime();
      });
  }

  async getPublishedContentByFormat(format: string): Promise<ContentItem[]> {
    return Array.from(this.contentItems.values())
      .filter(item => item.isPublished === true && item.format === format)
      .sort((a, b) => {
        const aDate = a.publishedAt || a.createdAt;
        const bDate = b.publishedAt || b.createdAt;
        return bDate.getTime() - aDate.getTime();
      });
  }

  async getContentBySlug(slug: string): Promise<ContentItem | undefined> {
    return Array.from(this.contentItems.values()).find(item => item.slug === slug);
  }

  async createRboBuyerProfile(insertProfile: InsertRboBuyerProfile): Promise<RboBuyerProfile> {
    const id = randomUUID();
    const profile: RboBuyerProfile = {
      phone: insertProfile.phone,
      priceRange: insertProfile.priceRange ?? null,
      downPayment: insertProfile.downPayment ?? null,
      creditBand: insertProfile.creditBand ?? null,
      targetCities: insertProfile.targetCities ?? null,
      monthlyComfort: insertProfile.monthlyComfort ?? null,
      lenderData: insertProfile.lenderData ?? null,
      brokerageData: insertProfile.brokerageData ?? null,
      estimatedSavings: insertProfile.estimatedSavings ?? null,
      leadScore: insertProfile.leadScore ?? null,
      id,
      createdAt: new Date(),
    };
    this.rboProfiles.set(id, profile);
    return profile;
  }

  async getRboBuyerProfileByPhone(phone: string): Promise<RboBuyerProfile | undefined> {
    return Array.from(this.rboProfiles.values()).find((p) => p.phone === phone);
  }

  async getAllRboBuyerProfiles(): Promise<RboBuyerProfile[]> {
    return Array.from(this.rboProfiles.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createRsoSellerProfile(insertProfile: InsertRsoSellerProfile): Promise<RsoSellerProfile> {
    const id = randomUUID();
    const profile: RsoSellerProfile = {
      phone: insertProfile.phone,
      address: insertProfile.address ?? null,
      propertyType: insertProfile.propertyType ?? null,
      estimatedValue: insertProfile.estimatedValue ?? null,
      timeframe: insertProfile.timeframe ?? null,
      motivation: insertProfile.motivation ?? null,
      id,
      createdAt: new Date(),
    };
    this.rsoProfiles.set(id, profile);
    return profile;
  }

  async getAllRsoSellerProfiles(): Promise<RsoSellerProfile[]> {
    return Array.from(this.rsoProfiles.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      name: insertSubmission.name,
      email: insertSubmission.email,
      phone: insertSubmission.phone ?? null,
      message: insertSubmission.message,
      id,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createHomeValueRequest(insertRequest: InsertHomeValueRequest): Promise<HomeValueRequest> {
    const id = randomUUID();
    const request: HomeValueRequest = {
      address: insertRequest.address,
      city: insertRequest.city,
      zipCode: insertRequest.zipCode,
      propertyType: insertRequest.propertyType ?? null,
      bedrooms: insertRequest.bedrooms ?? null,
      bathrooms: insertRequest.bathrooms ?? null,
      squareFeet: insertRequest.squareFeet ?? null,
      yearBuilt: insertRequest.yearBuilt ?? null,
      email: insertRequest.email,
      phone: insertRequest.phone ?? null,
      id,
      createdAt: new Date(),
    };
    this.homeValueRequests.set(id, request);
    return request;
  }

  async getAllHomeValueRequests(): Promise<HomeValueRequest[]> {
    return Array.from(this.homeValueRequests.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createBrokerRegistration(insertRegistration: InsertBrokerRegistration): Promise<BrokerRegistration> {
    const id = randomUUID();
    const registration: BrokerRegistration = {
      firstName: insertRegistration.firstName,
      lastName: insertRegistration.lastName,
      email: insertRegistration.email,
      phone: insertRegistration.phone,
      licenseNumber: insertRegistration.licenseNumber,
      yearsExperience: insertRegistration.yearsExperience ?? null,
      specialization: insertRegistration.specialization ?? null,
      brokerage: insertRegistration.brokerage ?? null,
      neighborhoods: insertRegistration.neighborhoods ?? null,
      bio: insertRegistration.bio ?? null,
      linkedIn: insertRegistration.linkedIn ?? null,
      website: insertRegistration.website ?? null,
      videoUrl: insertRegistration.videoUrl ?? null,
      id,
      createdAt: new Date(),
    };
    this.brokerRegistrations.set(id, registration);
    return registration;
  }

  async getAllBrokerRegistrations(): Promise<BrokerRegistration[]> {
    return Array.from(this.brokerRegistrations.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  private affiliatesMap: Map<string, Affiliate> = new Map();
  private travelDealSubscribersMap: Map<string, TravelDealSubscriber> = new Map();
  private travelDealsMap: Map<string, TravelDeal> = new Map();

  async createAffiliate(insertAffiliate: InsertAffiliate): Promise<Affiliate> {
    const id = randomUUID();
    const referralCode = `AK${randomUUID().substring(0, 8).toUpperCase()}`;
    const affiliate: Affiliate = {
      firstName: insertAffiliate.firstName,
      lastName: insertAffiliate.lastName,
      email: insertAffiliate.email,
      phone: insertAffiliate.phone ?? null,
      website: insertAffiliate.website ?? null,
      socialHandle: insertAffiliate.socialHandle ?? null,
      platform: insertAffiliate.platform ?? null,
      audienceSize: insertAffiliate.audienceSize ?? null,
      niche: insertAffiliate.niche ?? null,
      paypalEmail: insertAffiliate.paypalEmail ?? null,
      referralCode,
      tier: "starter",
      totalReferrals: 0,
      totalEarnings: 0,
      status: "active",
      id,
      createdAt: new Date(),
    };
    this.affiliatesMap.set(id, affiliate);
    return affiliate;
  }

  async getAffiliateByEmail(email: string): Promise<Affiliate | undefined> {
    return Array.from(this.affiliatesMap.values()).find((a) => a.email === email);
  }

  async getAffiliateByReferralCode(code: string): Promise<Affiliate | undefined> {
    return Array.from(this.affiliatesMap.values()).find((a) => a.referralCode === code);
  }

  async getAllAffiliates(): Promise<Affiliate[]> {
    return Array.from(this.affiliatesMap.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  private chatConversationsMap: Map<string, ChatConversation> = new Map();

  async createChatConversation(insertConversation: InsertChatConversation): Promise<ChatConversation> {
    const id = randomUUID();
    const conversation: ChatConversation = {
      sessionId: insertConversation.sessionId,
      messages: insertConversation.messages,
      leadName: insertConversation.leadName ?? null,
      leadEmail: insertConversation.leadEmail ?? null,
      leadPhone: insertConversation.leadPhone ?? null,
      categoryInterest: insertConversation.categoryInterest ?? null,
      leadScore: insertConversation.leadScore ?? null,
      summary: insertConversation.summary ?? null,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.chatConversationsMap.set(id, conversation);
    return conversation;
  }

  async updateChatConversation(id: string, updates: Partial<InsertChatConversation>): Promise<ChatConversation | undefined> {
    const conversation = this.chatConversationsMap.get(id);
    if (!conversation) return undefined;
    const updated = { ...conversation, ...updates, updatedAt: new Date() };
    this.chatConversationsMap.set(id, updated);
    return updated;
  }

  async getChatConversationBySessionId(sessionId: string): Promise<ChatConversation | undefined> {
    return Array.from(this.chatConversationsMap.values()).find((c) => c.sessionId === sessionId);
  }

  async getAllChatConversations(): Promise<ChatConversation[]> {
    return Array.from(this.chatConversationsMap.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async deleteChatConversation(id: string): Promise<boolean> {
    return this.chatConversationsMap.delete(id);
  }

  async createTravelDealSubscriber(insertSubscriber: InsertTravelDealSubscriber): Promise<TravelDealSubscriber> {
    const id = randomUUID();
    const subscriber: TravelDealSubscriber = {
      ...insertSubscriber,
      id,
      isActive: true,
      createdAt: new Date(),
    };
    this.travelDealSubscribersMap.set(id, subscriber);
    return subscriber;
  }

  async getAllTravelDealSubscribers(): Promise<TravelDealSubscriber[]> {
    return Array.from(this.travelDealSubscribersMap.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createTravelDeal(insertDeal: InsertTravelDeal): Promise<TravelDeal> {
    const id = randomUUID();
    const deal: TravelDeal = {
      ...insertDeal,
      description: insertDeal.description ?? null,
      discount: insertDeal.discount ?? null,
      partnerName: insertDeal.partnerName ?? null,
      partnerUrl: insertDeal.partnerUrl ?? null,
      imageUrl: insertDeal.imageUrl ?? null,
      articleContent: insertDeal.articleContent ?? null,
      weekNumber: insertDeal.weekNumber ?? null,
      year: insertDeal.year ?? null,
      isActive: insertDeal.isActive ?? true,
      publishedAt: insertDeal.publishedAt ?? null,
      id,
      createdAt: new Date(),
    };
    this.travelDealsMap.set(id, deal);
    return deal;
  }

  async getAllTravelDeals(): Promise<TravelDeal[]> {
    return Array.from(this.travelDealsMap.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getTravelDealById(id: string): Promise<TravelDeal | undefined> {
    return this.travelDealsMap.get(id);
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

  async getPublishedContent(): Promise<ContentItem[]> {
    return await db.select().from(contentItems)
      .where(eq(contentItems.isPublished, true))
      .orderBy(desc(contentItems.publishedAt));
  }

  async getPublishedContentByFormat(format: string): Promise<ContentItem[]> {
    const { and } = await import("drizzle-orm");
    return await db.select().from(contentItems)
      .where(and(eq(contentItems.isPublished, true), eq(contentItems.format, format)))
      .orderBy(desc(contentItems.publishedAt));
  }

  async getContentBySlug(slug: string): Promise<ContentItem | undefined> {
    const result = await db.select().from(contentItems).where(eq(contentItems.slug, slug));
    return result[0];
  }

  async createRboBuyerProfile(insertProfile: InsertRboBuyerProfile): Promise<RboBuyerProfile> {
    const result = await db.insert(rboBuyerProfiles).values(insertProfile).returning();
    return result[0];
  }

  async getRboBuyerProfileByPhone(phone: string): Promise<RboBuyerProfile | undefined> {
    const result = await db.select().from(rboBuyerProfiles).where(eq(rboBuyerProfiles.phone, phone));
    return result[0];
  }

  async getAllRboBuyerProfiles(): Promise<RboBuyerProfile[]> {
    return await db.select().from(rboBuyerProfiles).orderBy(desc(rboBuyerProfiles.createdAt));
  }

  async createRsoSellerProfile(insertProfile: InsertRsoSellerProfile): Promise<RsoSellerProfile> {
    const result = await db.insert(rsoSellerProfiles).values(insertProfile).returning();
    return result[0];
  }

  async getAllRsoSellerProfiles(): Promise<RsoSellerProfile[]> {
    return await db.select().from(rsoSellerProfiles).orderBy(desc(rsoSellerProfiles.createdAt));
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db.insert(contactSubmissions).values(insertSubmission).returning();
    return result[0];
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createHomeValueRequest(insertRequest: InsertHomeValueRequest): Promise<HomeValueRequest> {
    const result = await db.insert(homeValueRequests).values(insertRequest).returning();
    return result[0];
  }

  async getAllHomeValueRequests(): Promise<HomeValueRequest[]> {
    return await db.select().from(homeValueRequests).orderBy(desc(homeValueRequests.createdAt));
  }

  async createBrokerRegistration(insertRegistration: InsertBrokerRegistration): Promise<BrokerRegistration> {
    const result = await db.insert(brokerRegistrations).values(insertRegistration).returning();
    return result[0];
  }

  async getAllBrokerRegistrations(): Promise<BrokerRegistration[]> {
    return await db.select().from(brokerRegistrations).orderBy(desc(brokerRegistrations.createdAt));
  }

  async createAffiliate(insertAffiliate: InsertAffiliate): Promise<Affiliate> {
    const referralCode = `AK${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const result = await db.insert(affiliates).values({
      ...insertAffiliate,
      referralCode,
    }).returning();
    return result[0];
  }

  async getAffiliateByEmail(email: string): Promise<Affiliate | undefined> {
    const result = await db.select().from(affiliates).where(eq(affiliates.email, email));
    return result[0];
  }

  async getAffiliateByReferralCode(code: string): Promise<Affiliate | undefined> {
    const result = await db.select().from(affiliates).where(eq(affiliates.referralCode, code));
    return result[0];
  }

  async getAllAffiliates(): Promise<Affiliate[]> {
    return await db.select().from(affiliates).orderBy(desc(affiliates.createdAt));
  }

  async createChatConversation(insertConversation: InsertChatConversation): Promise<ChatConversation> {
    const result = await db.insert(chatConversations).values(insertConversation).returning();
    return result[0];
  }

  async updateChatConversation(id: string, updates: Partial<InsertChatConversation>): Promise<ChatConversation | undefined> {
    const result = await db.update(chatConversations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(chatConversations.id, id))
      .returning();
    return result[0];
  }

  async getChatConversationBySessionId(sessionId: string): Promise<ChatConversation | undefined> {
    const result = await db.select().from(chatConversations).where(eq(chatConversations.sessionId, sessionId));
    return result[0];
  }

  async getAllChatConversations(): Promise<ChatConversation[]> {
    return await db.select().from(chatConversations).orderBy(desc(chatConversations.updatedAt));
  }

  async deleteChatConversation(id: string): Promise<boolean> {
    const result = await db.delete(chatConversations).where(eq(chatConversations.id, id)).returning();
    return result.length > 0;
  }

  async createTravelDealSubscriber(insertSubscriber: InsertTravelDealSubscriber): Promise<TravelDealSubscriber> {
    const result = await db.insert(travelDealSubscribers).values(insertSubscriber).returning();
    return result[0];
  }

  async getAllTravelDealSubscribers(): Promise<TravelDealSubscriber[]> {
    return await db.select().from(travelDealSubscribers).orderBy(desc(travelDealSubscribers.createdAt));
  }

  async createTravelDeal(insertDeal: InsertTravelDeal): Promise<TravelDeal> {
    const result = await db.insert(travelDeals).values(insertDeal).returning();
    return result[0];
  }

  async getAllTravelDeals(): Promise<TravelDeal[]> {
    return await db.select().from(travelDeals).orderBy(desc(travelDeals.createdAt));
  }

  async getTravelDealById(id: string): Promise<TravelDeal | undefined> {
    const result = await db.select().from(travelDeals).where(eq(travelDeals.id, id));
    return result[0];
  }
}

// Use persistent database storage when DATABASE_URL is configured; fall back to memory for local preview.
export const storage = db ? new DbStorage() : new MemStorage();
