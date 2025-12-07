import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
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
  Share2,
  Bookmark,
  ChevronRight
} from "lucide-react";
import type { ContentItem } from "@shared/schema";

export default function ContentDetail() {
  const [, params] = useRoute("/media-center/:slug");
  const slug = params?.slug;

  const { data: content, isLoading, error } = useQuery<ContentItem>({
    queryKey: ["/api/media-center/content", slug],
    enabled: !!slug,
  });

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getFormatIcon = (format: string | null) => {
    switch (format) {
      case "video":
        return <Video className="h-5 w-5" />;
      case "short-form":
        return <Play className="h-5 w-5" />;
      case "guide":
        return <Newspaper className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 bg-white/10 mb-6" />
          <Skeleton className="h-12 w-full bg-white/10 mb-4" />
          <Skeleton className="h-6 w-3/4 bg-white/10 mb-8" />
          <Skeleton className="aspect-video w-full bg-white/10 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full bg-white/10" />
            <Skeleton className="h-4 w-full bg-white/10" />
            <Skeleton className="h-4 w-3/4 bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <Card className="bg-white/5 border-white/10 p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <FileText className="h-8 w-8 text-white/30" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Content Not Found</h2>
          <p className="text-white/60 mb-6">
            The content you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/media-center">
            <Button className="bg-[#d4af37] text-black hover:bg-[#c9a02e]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Media Center
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <article className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/media-center">
          <Button variant="ghost" className="mb-6" data-testid="button-back-media-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Media Center
          </Button>
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge 
              variant="outline" 
              className={`${getFormatColor(content.format)}`}
            >
              {getFormatIcon(content.format)}
              <span className="ml-1 capitalize">{content.format || "article"}</span>
            </Badge>
            {content.category && (
              <Badge variant="outline" className="text-white/60 border-white/20">
                {content.category}
              </Badge>
            )}
            {content.duration && (
              <Badge variant="outline" className="text-white/60 border-white/20">
                <Clock className="h-3 w-3 mr-1" />
                {content.duration}
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {content.title}
          </h1>

          {content.description && (
            <p className="text-lg md:text-xl text-white/70 mb-6">
              {content.description}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(content.publishedAt || content.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" data-testid="button-share">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-bookmark">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {content.thumbnailUrl && (
          <div className="mb-8 rounded-xl overflow-hidden relative">
            <img 
              src={content.thumbnailUrl} 
              alt={content.title}
              className="w-full aspect-video object-cover"
            />
            {content.format === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="h-10 w-10 text-white ml-1" fill="white" />
                </div>
              </div>
            )}
          </div>
        )}

        {content.videoUrl && (
          <div className="mb-8 rounded-xl overflow-hidden aspect-video">
            <iframe
              src={content.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {content.contentBody && (
          <div 
            className="prose prose-invert prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: content.contentBody }}
          />
        )}

        {content.scriptContent && !content.contentBody && (
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <div className="whitespace-pre-wrap text-white/80 leading-relaxed">
              {content.scriptContent}
            </div>
          </div>
        )}

        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 pt-6 border-t border-white/10">
            <span className="text-white/50 text-sm mr-2">Tags:</span>
            {content.tags.map((tag, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-white/60 border-white/20 hover:border-[#d4af37] hover:text-[#d4af37] cursor-pointer transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Card className="bg-white/5 border-white/10 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Enjoyed this content?
              </h3>
              <p className="text-white/60 text-sm">
                Explore more insights in our Media Center
              </p>
            </div>
            <Link href="/media-center">
              <Button className="bg-[#d4af37] text-black hover:bg-[#c9a02e]">
                Browse All Content
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      </article>
    </div>
  );
}
