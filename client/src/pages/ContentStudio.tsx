import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { ContentItem, InsertContentItem, ChatConversation } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContentItemSchema } from "@shared/schema";
import { z } from "zod";
import { Film, Lightbulb, Scale, Clapperboard, Archive, Plus, Trash2, Edit, MoveRight, Youtube, Instagram, Linkedin, FolderArchive, FileText, Globe, Headphones, GraduationCap, Download, ExternalLink, Building2, Users, MessageSquare, User, Mail, Phone, Star, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { ScrollArea } from "@/components/ui/scroll-area";

const stages = [
  { id: "current-project", label: "Current Project", icon: Headphones, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", isWide: true },
  { id: "elevator-pitches", label: "Elevator Pitches", icon: Sparkles, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { id: "ideation", label: "Ideation", icon: Lightbulb, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { id: "legal", label: "Legal Review", icon: Scale, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { id: "ready", label: "Ready to Shoot", icon: Clapperboard, color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { id: "completed", label: "Completed", icon: Archive, color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { id: "chat-archive", label: "Chat Archive", icon: MessageSquare, color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  { id: "offer-archive", label: "Offer Archive", icon: FolderArchive, color: "bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30" },
];

const elevatorPitches = [
  {
    id: "one-liner",
    title: "One-Liner",
    description: "Agent Kammer is the AI-powered financial comparison engine that matches users with the best products across 14 financial categories—when brokers compete, you win."
  },
  {
    id: "medium",
    title: "Medium Pitch",
    description: "Agent Kammer uses agentic AI to analyze 100+ financial products and match users with the best fit for their profile. We cover everything from elite credit cards and high-yield savings to investment accounts and mortgage refinancing. Our deterministic scoring algorithm delivers consistent, transparent recommendations. We're building the future of financial product discovery—where sophisticated AI research meets human-first design."
  },
  {
    id: "long",
    title: "Full Description",
    description: "Agent Kammer is the next-generation financial comparison platform powered by sophisticated AI. We analyze 100+ products across 14 financial categories—credit cards, personal loans, investment accounts, banking, insurance, refinancing, credit building, and more. Our proprietary agentic AI engine uses deterministic scoring to match users with products that actually fit their life, not just their balance sheet. No more endless spreadsheets. No more marketing fluff. Just clear, AI-driven recommendations backed by real analysis. We're trusted by thousands of users seeking genuine financial optionality."
  },
  {
    id: "casual",
    title: "Casual/Fun Pitch",
    description: "Agent Kammer: Where AI meets your wallet. We've built a sophisticated comparison engine that analyzes 100+ financial products so you don't have to. From credit cards that actually pay for themselves to investment accounts that make sense—we match users with products they'll actually want. Think of us as the financial equivalent of having a brilliant analyst in your back pocket."
  }
];

const offerArchiveItems = [
  { id: "document-portal", label: "Document Portal", href: "/document-portal", icon: FileText, description: "Zero-knowledge encrypted document management" },
  { id: "international-buyers", label: "International Buyers", href: "/international-buyers", icon: Globe, description: "Resources for global clients" },
  { id: "audiobooks", label: "Audiobooks", href: "/audiobooks", icon: Headphones, description: "Premium audio library" },
  { id: "ecourses", label: "Ecourses", href: "/ecourses", icon: GraduationCap, description: "Professional development courses" },
  { id: "downloads", label: "Downloads", href: "/downloads", icon: Download, description: "Free resources and templates" },
  { id: "commercial-investment", label: "Commercial Investment", href: "/commercial-investment", icon: Building2, description: "Commercial real estate opportunities" },
  { id: "coaching", label: "Consulting", href: "/coaching", icon: Users, description: "Transformational alignment coaching" },
];

const publishingPlatforms = [
  { id: "youtube", label: "YouTube", icon: Youtube, color: "bg-red-500/20 text-red-400" },
  { id: "instagram", label: "Instagram Reels", icon: Instagram, color: "bg-pink-500/20 text-pink-400" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "bg-blue-500/20 text-blue-400" },
];

export default function ContentStudio() {
  const [selectedStage, setSelectedStage] = useState("current-project");
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: allItems = [], isLoading } = useQuery<ContentItem[]>({
    queryKey: ["/api/content"],
  });

  const { data: chatConversations = [], isLoading: isLoadingChats } = useQuery<ChatConversation[]>({
    queryKey: ["/api/chat-conversations"],
  });

  const filteredItems = allItems.filter(item => item.stage === selectedStage);

  const form = useForm<z.infer<typeof insertContentItemSchema>>({
    resolver: zodResolver(insertContentItemSchema),
    defaultValues: {
      title: "",
      description: "",
      scriptContent: "",
      stage: selectedStage,
      category: "",
      notes: "",
      legalStatus: "",
      fileUrl: "",
      tags: [],
      publishingDestinations: [],
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertContentItem) => {
      return await apiRequest("POST", "/api/content", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Content item created" });
    },
    onError: (error) => {
      console.error("Create mutation error:", error);
      toast({ 
        title: "Error creating content item", 
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertContentItem> }) => {
      return await apiRequest("PATCH", `/api/content/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      setEditingItem(null);
      setIsDialogOpen(false);
      toast({ title: "Content item updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/content/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      toast({ title: "Content item deleted" });
    },
  });

  const deleteChatMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/chat-conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat-conversations"] });
      toast({ title: "Conversation deleted" });
    },
  });

  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);

  const moveToStage = (item: ContentItem, newStage: string) => {
    updateMutation.mutate({ id: item.id, data: { stage: newStage } });
  };

  const onSubmit = (data: z.infer<typeof insertContentItemSchema>) => {
    console.log("Form submitted with data:", data);
    console.log("Form errors:", form.formState.errors);
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (item: ContentItem) => {
    setEditingItem(item);
    form.reset({
      title: item.title,
      description: item.description || "",
      scriptContent: item.scriptContent || "",
      stage: item.stage,
      category: item.category || "",
      notes: item.notes || "",
      legalStatus: item.legalStatus || "",
      fileUrl: item.fileUrl || "",
      tags: item.tags || [],
      publishingDestinations: item.publishingDestinations || [],
    });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingItem(null);
    form.reset({
      title: "",
      description: "",
      scriptContent: "",
      stage: selectedStage,
      category: "",
      notes: "",
      legalStatus: "",
      fileUrl: "",
      tags: [],
      publishingDestinations: [],
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Film className="w-8 h-8 text-[#d4af37]" />
            <h1 className="text-4xl font-bold text-white">Content Studio</h1>
          </div>
          <p className="text-slate-200">Your creative command center for social media strategy</p>
        </div>

        <Tabs value={selectedStage} onValueChange={setSelectedStage} className="space-y-6">
          {/* Full-width Current Project Tab */}
          <TabsList className="w-full bg-emerald-600/30 border-2 border-emerald-500/50 backdrop-blur-sm p-2 mb-4">
            <TabsTrigger
              value="current-project"
              className="w-full data-[state=active]:bg-emerald-500/50 data-[state=active]:text-white gap-3 py-3 text-lg font-semibold"
              data-testid="tab-stage-current-project"
            >
              <Headphones className="w-5 h-5" />
              <span>Current Project</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-auto overflow-x-auto pb-2">
              <TabsList className="bg-slate-500/30 border border-slate-400/30 backdrop-blur-sm p-1.5 inline-flex">
                {stages.filter(s => s.id !== "current-project").map((stage) => {
                  const Icon = stage.icon;
                  const count = allItems.filter(item => item.stage === stage.id).length;
                  return (
                    <TabsTrigger
                      key={stage.id}
                      value={stage.id}
                      className="data-[state=active]:bg-slate-400/50 gap-2 whitespace-nowrap"
                      data-testid={`tab-stage-${stage.id}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{stage.label}</span>
                      <span className="sm:hidden">{stage.label.split(' ')[0]}</span>
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {count}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={openNewDialog}
                  className="bg-[#d4af37] hover:bg-[#c19b2f] text-black"
                  data-testid="button-add-content"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Content
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-600 border-slate-400">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingItem ? "Edit Content Item" : "Create New Content Item"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-100">Title</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-slate-500/50 border-slate-400 text-white" data-testid="input-title" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-100">Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} value={field.value || ""} className="bg-slate-500/50 border-slate-400 text-white" data-testid="input-description" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="scriptContent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-100">Script Content</FormLabel>
                          <FormControl>
                            <Textarea {...field} value={field.value || ""} rows={6} className="bg-slate-500/50 border-slate-400 text-white font-mono" data-testid="input-script" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-100">Stage</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-500/50 border-slate-400 text-white" data-testid="select-stage">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-600 border-slate-400">
                              {stages.map(stage => (
                                <SelectItem key={stage.id} value={stage.id} className="text-white">
                                  {stage.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-100">Category</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} className="bg-slate-500/50 border-slate-400 text-white" placeholder="e.g., Property Tour, Market Update" data-testid="input-category" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-100">Notes</FormLabel>
                          <FormControl>
                            <Textarea {...field} value={field.value || ""} className="bg-slate-500/50 border-slate-400 text-white" data-testid="input-notes" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fileUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-100">File URL</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} className="bg-slate-500/50 border-slate-400 text-white" placeholder="Paste link to uploaded script/asset" data-testid="input-file-url" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="publishingDestinations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-100">Publishing Destinations</FormLabel>
                          <div className="space-y-3 mt-2">
                            {publishingPlatforms.map((platform) => {
                              const Icon = platform.icon;
                              const isChecked = field.value?.includes(platform.id) || false;
                              return (
                                <div key={platform.id} className="flex items-center gap-3">
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || [];
                                      if (checked) {
                                        field.onChange([...currentValue, platform.id]);
                                      } else {
                                        field.onChange(currentValue.filter((v: string) => v !== platform.id));
                                      }
                                    }}
                                    data-testid={`checkbox-${platform.id}`}
                                  />
                                  <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4 text-slate-300" />
                                    <span className="text-sm text-slate-200">{platform.label}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedStage === "legal" && (
                      <FormField
                        control={form.control}
                        name="legalStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-100">Legal Status</FormLabel>
                            <FormControl>
                              <Textarea {...field} value={field.value || ""} className="bg-slate-500/50 border-slate-400 text-white" placeholder="Legal compliance notes..." data-testid="input-legal-status" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                        className="border-slate-300 text-slate-100 hover:bg-slate-500/50"
                        data-testid="button-cancel"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-[#d4af37] hover:bg-[#c19b2f] text-black"
                        disabled={createMutation.isPending || updateMutation.isPending}
                        data-testid="button-submit"
                      >
                        {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {stages.map((stage) => (
            <TabsContent key={stage.id} value={stage.id} className="space-y-4">
              {stage.id === "current-project" ? (
                <div className="space-y-6">
                  <Card className="bg-emerald-900/30 border-2 border-emerald-500/50 overflow-hidden">
                    <CardHeader className="bg-emerald-800/40 border-b border-emerald-500/30">
                      <CardTitle className="text-white flex items-center gap-3 text-2xl">
                        <Headphones className="w-7 h-7 text-emerald-400" />
                        God's Plan for You
                        <Badge className="bg-emerald-500/30 text-emerald-300 border-emerald-400/50 ml-2">
                          Audiobook
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Audiobook Cover Mockup */}
                        <div className="flex flex-col items-center">
                          <div 
                            className="w-48 h-64 rounded-lg flex items-center justify-center relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)',
                              boxShadow: '0 10px 40px rgba(5, 150, 105, 0.4)'
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                            <div className="text-center z-10 px-4">
                              <div className="text-white/90 text-xs uppercase tracking-wider mb-2">Audiobook</div>
                              <h3 className="text-white font-serif text-xl font-bold leading-tight mb-3">God's Plan for You</h3>
                              <div className="w-12 h-0.5 bg-emerald-300/50 mx-auto mb-3" />
                              <p className="text-emerald-200 text-xs">Discovering Your Divine Purpose</p>
                            </div>
                          </div>
                          <Badge className="mt-4 bg-emerald-500/20 text-emerald-300 border-emerald-400/50">
                            In Production
                          </Badge>
                        </div>

                        {/* Project Details */}
                        <div className="md:col-span-2 space-y-4">
                          <div>
                            <h4 className="text-emerald-300 text-sm font-semibold uppercase tracking-wide mb-2">Description</h4>
                            <p className="text-slate-200 leading-relaxed">
                              A transformative audiobook exploring the intersection of faith, purpose, and personal growth. 
                              This guide helps listeners discover their unique calling and align their daily actions with 
                              a greater spiritual mission.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-emerald-300 text-sm font-semibold uppercase tracking-wide mb-2">Format</h4>
                              <p className="text-slate-200">Digital Audiobook (MP3)</p>
                            </div>
                            <div>
                              <h4 className="text-emerald-300 text-sm font-semibold uppercase tracking-wide mb-2">Target Length</h4>
                              <p className="text-slate-200">4-6 hours</p>
                            </div>
                            <div>
                              <h4 className="text-emerald-300 text-sm font-semibold uppercase tracking-wide mb-2">Status</h4>
                              <p className="text-slate-200">Script Development</p>
                            </div>
                            <div>
                              <h4 className="text-emerald-300 text-sm font-semibold uppercase tracking-wide mb-2">Target Release</h4>
                              <p className="text-slate-200">Q1 2025</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-emerald-300 text-sm font-semibold uppercase tracking-wide mb-2">Chapters Outline</h4>
                            <div className="grid gap-2">
                              {[
                                "Introduction: The Search for Meaning",
                                "Chapter 1: Recognizing Divine Signals",
                                "Chapter 2: Overcoming Doubt and Fear",
                                "Chapter 3: Aligning Actions with Purpose",
                                "Chapter 4: Building Spiritual Discipline",
                                "Chapter 5: Living Your Calling Daily"
                              ].map((chapter, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-semibold">
                                    {idx + 1}
                                  </div>
                                  {chapter}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : stage.id === "elevator-pitches" ? (
                <div className="space-y-4 max-w-4xl">
                  <div className="grid gap-4">
                    {elevatorPitches.map((pitch) => (
                      <Card key={pitch.id} className="bg-slate-500/20 border-slate-400/40 hover:border-slate-300/50 transition-all hover-elevate">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                            {pitch.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-100 leading-relaxed">{pitch.description}</p>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="mt-4 border-slate-300 text-slate-100 hover:bg-slate-500/50"
                            onClick={() => {
                              navigator.clipboard.writeText(pitch.description);
                              toast({ title: "Copied to clipboard" });
                            }}
                            data-testid={`button-copy-pitch-${pitch.id}`}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Copy for Affiliate Registration
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : stage.id === "chat-archive" ? (
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="lg:col-span-1 space-y-3">
                    <h3 className="text-lg font-semibold text-white mb-4">Conversations ({chatConversations.length})</h3>
                    {isLoadingChats ? (
                      <div className="text-slate-300">Loading conversations...</div>
                    ) : chatConversations.length === 0 ? (
                      <Card className="bg-slate-500/20 border-slate-400/40">
                        <CardContent className="py-6 text-center text-slate-300">
                          No chat conversations yet. Conversations will appear here when visitors chat with the AI assistant.
                        </CardContent>
                      </Card>
                    ) : (
                      <ScrollArea className="h-[600px]">
                        <div className="space-y-2 pr-4">
                          {chatConversations.map((convo) => (
                            <Card 
                              key={convo.id}
                              className={`cursor-pointer transition-all ${
                                selectedConversation?.id === convo.id 
                                  ? 'bg-cyan-500/20 border-cyan-400/50' 
                                  : 'bg-slate-500/20 border-slate-400/40 hover:border-slate-300/50'
                              }`}
                              onClick={() => setSelectedConversation(convo)}
                              data-testid={`card-chat-${convo.id}`}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2 text-white font-medium truncate">
                                    <User className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                    <span className="truncate">{convo.leadName || 'Anonymous'}</span>
                                  </div>
                                  {convo.leadScore && (
                                    <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 flex-shrink-0">
                                      <Star className="w-3 h-3 mr-1" />
                                      {convo.leadScore}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-slate-300 space-y-1">
                                  {convo.categoryInterest && (
                                    <div className="truncate">Category: {convo.categoryInterest}</div>
                                  )}
                                  <div>{new Date(convo.updatedAt).toLocaleDateString()} {new Date(convo.updatedAt).toLocaleTimeString()}</div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </div>
                  
                  <div className="lg:col-span-2">
                    {selectedConversation ? (
                      <Card className="bg-slate-500/20 border-slate-400/40">
                        <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 border-b border-slate-500/40 pb-4">
                          <div>
                            <CardTitle className="text-white flex items-center gap-2">
                              <MessageSquare className="w-5 h-5 text-cyan-400" />
                              Conversation Details
                            </CardTitle>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-300">
                              {selectedConversation.leadName && (
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {selectedConversation.leadName}
                                </div>
                              )}
                              {selectedConversation.leadEmail && (
                                <div className="flex items-center gap-1">
                                  <Mail className="w-4 h-4" />
                                  {selectedConversation.leadEmail}
                                </div>
                              )}
                              {selectedConversation.leadPhone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="w-4 h-4" />
                                  {selectedConversation.leadPhone}
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              deleteChatMutation.mutate(selectedConversation.id);
                              setSelectedConversation(null);
                            }}
                            className="text-slate-300 hover:text-red-400"
                            data-testid="button-delete-conversation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ScrollArea className="h-[450px]">
                            <div className="space-y-3 pr-4">
                              {(() => {
                                try {
                                  const messages = JSON.parse(selectedConversation.messages);
                                  return messages.map((msg: { role: string; text: string }, idx: number) => (
                                    <div
                                      key={idx}
                                      className={`p-3 rounded-lg ${
                                        msg.role === 'user' || msg.role === 'User'
                                          ? 'bg-slate-600/40 ml-8'
                                          : 'bg-cyan-500/10 border border-cyan-500/20 mr-8'
                                      }`}
                                    >
                                      <div className="text-xs text-slate-400 mb-1 uppercase">
                                        {msg.role === 'user' || msg.role === 'User' ? 'Visitor' : 'AI Assistant'}
                                      </div>
                                      <div className="text-sm text-slate-100 whitespace-pre-wrap">{msg.text}</div>
                                    </div>
                                  ));
                                } catch {
                                  return <div className="text-slate-400">Unable to parse messages</div>;
                                }
                              })()}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-slate-500/20 border-slate-400/40">
                        <CardContent className="py-24 text-center">
                          <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                          <div className="text-slate-300">Select a conversation to view details</div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              ) : stage.id === "offer-archive" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {offerArchiveItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.id} href={item.href}>
                        <Card 
                          className="bg-[#d4af37]/10 border-[#d4af37]/30 backdrop-blur-sm hover:border-[#d4af37]/60 transition-all cursor-pointer group h-full"
                          data-testid={`card-archive-${item.id}`}
                        >
                          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3">
                            <div className="w-12 h-12 rounded-lg bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-[#d4af37]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg text-white flex items-center gap-2">
                                {item.label}
                                <ExternalLink className="w-4 h-4 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
                              </CardTitle>
                              <p className="text-sm text-slate-300 mt-1">{item.description}</p>
                            </div>
                          </CardHeader>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              ) : isLoading ? (
                <div className="text-center py-12 text-slate-300">Loading...</div>
              ) : filteredItems.length === 0 ? (
                <Card className="bg-slate-500/20 border-slate-400/40 backdrop-blur-sm">
                  <CardContent className="py-12 text-center">
                    <div className="text-slate-300">
                      No content items in {stage.label} stage yet.
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredItems.map((item) => (
                    <Card 
                      key={item.id} 
                      className="bg-slate-500/30 border-slate-400/50 backdrop-blur-sm hover-elevate group"
                      data-testid={`card-content-${item.id}`}
                    >
                      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg text-white truncate">{item.title}</CardTitle>
                          {item.category && (
                            <Badge variant="secondary" className="mt-2">
                              {item.category}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => openEditDialog(item)}
                            className="h-8 w-8 text-slate-200 hover:text-white"
                            data-testid={`button-edit-${item.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteMutation.mutate(item.id)}
                            className="h-8 w-8 text-slate-200 hover:text-red-400"
                            data-testid={`button-delete-${item.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {item.description && (
                          <p className="text-sm text-slate-200 line-clamp-2">{item.description}</p>
                        )}
                        
                        {item.scriptContent && (
                          <div className="bg-slate-700/40 rounded p-2 border border-slate-500/40">
                            <p className="text-xs text-slate-300 mb-1">Script</p>
                            <p className="text-xs text-slate-100 font-mono line-clamp-3">{item.scriptContent}</p>
                          </div>
                        )}

                        {item.notes && (
                          <div className="bg-slate-700/40 rounded p-2 border border-slate-500/40">
                            <p className="text-xs text-slate-300 mb-1">Notes</p>
                            <p className="text-xs text-slate-100 line-clamp-2">{item.notes}</p>
                          </div>
                        )}

                        {item.fileUrl && (
                          <div className="bg-slate-700/40 rounded p-2 border border-slate-500/40">
                            <p className="text-xs text-slate-300 mb-1">File</p>
                            <a 
                              href={item.fileUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-[#d4af37] hover:underline truncate block"
                            >
                              View File
                            </a>
                          </div>
                        )}

                        {stage.id === "legal" && item.legalStatus && (
                          <div className="bg-blue-500/20 rounded p-2 border border-blue-400/40">
                            <p className="text-xs text-blue-300 mb-1">Legal Status</p>
                            <p className="text-xs text-slate-100 line-clamp-2">{item.legalStatus}</p>
                          </div>
                        )}

                        {item.publishingDestinations && item.publishingDestinations.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs text-slate-300">Publishing To:</p>
                            <div className="flex flex-wrap gap-2">
                              {item.publishingDestinations.map((dest) => {
                                const platform = publishingPlatforms.find(p => p.id === dest);
                                if (!platform) return null;
                                const Icon = platform.icon;
                                return (
                                  <Badge 
                                    key={dest} 
                                    className={`${platform.color} border-0 flex items-center gap-1`}
                                    data-testid={`badge-${dest}-${item.id}`}
                                  >
                                    <Icon className="w-3 h-3" />
                                    <span>{platform.label}</span>
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2 border-t border-slate-400/30">
                          {stages
                            .filter(s => s.id !== stage.id)
                            .map(nextStage => (
                              <Button
                                key={nextStage.id}
                                size="sm"
                                variant="outline"
                                onClick={() => moveToStage(item, nextStage.id)}
                                className="flex-1 text-xs border-slate-300 text-slate-100"
                                data-testid={`button-move-${nextStage.id}-${item.id}`}
                              >
                                <MoveRight className="w-3 h-3 mr-1" />
                                {nextStage.label}
                              </Button>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
