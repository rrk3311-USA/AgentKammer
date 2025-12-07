import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  Play, 
  FileText, 
  Video, 
  Newspaper, 
  Clock,
  Calendar,
  Eye,
  ChevronRight,
  Layers
} from "lucide-react";
import type { ContentItem } from "@shared/schema";

const formatFilters = [
  { id: "all", label: "All Content", icon: Layers },
  { id: "article", label: "Articles", icon: FileText },
  { id: "video", label: "Videos", icon: Video },
  { id: "short-form", label: "Short Form", icon: Play },
  { id: "guide", label: "Guides", icon: Newspaper },
];

function ContentCard({ item }: { item: ContentItem }) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getFormatIcon = (format: string | null) => {
    switch (format) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "short-form":
        return <Play className="h-4 w-4" />;
      case "guide":
        return <Newspaper className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getFormatColor = (format: string | null) => {
    switch (format) {
      case "video":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "short-form":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "guide":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    }
  };

  return (
    <Link href={`/media-center/${item.slug || item.id}`}>
      <Card 
        className="bg-white/5 border-white/10 overflow-hidden hover-elevate transition-all cursor-pointer group h-full flex flex-col"
        data-testid={`card-content-${item.id}`}
      >
        {item.thumbnailUrl ? (
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={item.thumbnailUrl} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {item.format === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="h-6 w-6 text-white ml-1" fill="white" />
                </div>
              </div>
            )}
            {item.duration && (
              <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-0 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {item.duration}
              </Badge>
            )}
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            {getFormatIcon(item.format)}
          </div>
        )}
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              variant="outline" 
              className={`text-xs ${getFormatColor(item.format)}`}
            >
              {getFormatIcon(item.format)}
              <span className="ml-1 capitalize">{item.format || "article"}</span>
            </Badge>
            {item.category && (
              <Badge variant="outline" className="text-xs text-white/60 border-white/20">
                {item.category}
              </Badge>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#d4af37] transition-colors line-clamp-2">
            {item.title}
          </h3>
          
          {item.description && (
            <p className="text-white/60 text-sm line-clamp-2 mb-3 flex-1">
              {item.description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-white/40 mt-auto pt-2 border-t border-white/10">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(item.publishedAt || item.createdAt)}
            </span>
            <span className="flex items-center gap-1 text-[#d4af37] group-hover:translate-x-1 transition-transform">
              Read More <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function ContentSkeleton() {
  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <Skeleton className="aspect-video bg-white/10" />
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 bg-white/10" />
          <Skeleton className="h-5 w-20 bg-white/10" />
        </div>
        <Skeleton className="h-6 w-full bg-white/10" />
        <Skeleton className="h-4 w-3/4 bg-white/10" />
        <Skeleton className="h-4 w-1/2 bg-white/10" />
      </div>
    </Card>
  );
}

export default function MediaCenter() {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: content, isLoading } = useQuery<ContentItem[]>({
    queryKey: activeFilter === "all" 
      ? ["/api/media-center"] 
      : ["/api/media-center/format", activeFilter],
  });

  const filteredContent = content || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <section className="border-b border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-4" data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Media <span style={{ color: "#d4af37" }}>Center</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl">
            Financial insights, market analysis, and educational content to help you make smarter decisions
          </p>
        </div>
      </section>

      <section className="py-6 px-4 border-b border-white/10 sticky top-0 bg-slate-950/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {formatFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className={activeFilter === filter.id 
                  ? "bg-[#d4af37] text-black hover:bg-[#c9a02e]" 
                  : "border-white/20 text-white/70 hover:text-white hover:border-white/40"
                }
                data-testid={`button-filter-${filter.id}`}
              >
                <filter.icon className="h-4 w-4 mr-2" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ContentSkeleton key={i} />
              ))}
            </div>
          ) : filteredContent.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <Eye className="h-8 w-8 text-white/30" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Content Yet</h3>
              <p className="text-white/60 max-w-md mx-auto">
                We're working on creating valuable content for you. Check back soon for articles, videos, and more!
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-white/70 mb-6">
            Get the latest financial insights and market analysis delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#d4af37]"
              data-testid="input-newsletter-email"
            />
            <Button 
              className="bg-[#d4af37] text-black hover:bg-[#c9a02e]"
              data-testid="button-subscribe"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
