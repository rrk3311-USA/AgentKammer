import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { ContentItem, InsertContentItem } from "@shared/schema";
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
import { Film, Lightbulb, Scale, Clapperboard, Archive, Plus, Trash2, Edit, MoveRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const stages = [
  { id: "ideation", label: "Ideation", icon: Lightbulb, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { id: "legal", label: "Legal Review", icon: Scale, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { id: "ready", label: "Ready to Shoot", icon: Clapperboard, color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { id: "completed", label: "Completed", icon: Archive, color: "bg-green-500/20 text-green-400 border-green-500/30" },
];

export default function ContentStudio() {
  const [selectedStage, setSelectedStage] = useState("ideation");
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: allItems = [], isLoading } = useQuery<ContentItem[]>({
    queryKey: ["/api/content"],
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-auto overflow-x-auto pb-2">
              <TabsList className="bg-slate-500/30 border border-slate-400/30 backdrop-blur-sm p-1.5 inline-flex">
                {stages.map((stage) => {
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
              {isLoading ? (
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
