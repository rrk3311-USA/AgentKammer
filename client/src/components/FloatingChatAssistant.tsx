import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Send, Minimize2, Maximize2, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import agentAvatar from "@assets/generated_images/Bruce_Wayne_3/4_back_NYC_view_2e3acb92.png";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export function FloatingChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Good evening. I'm Agent Kammer, your personal real estate concierge. How may I assist you in finding your perfect Manhattan property today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // TODO: Replace with real agentic AI response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you're interested in that property. Let me pull up the latest details and schedule a private showing for you. What day works best?",
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative group"
          data-testid="button-open-chat"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 blur-2xl group-hover:blur-3xl transition-all" />
          
          <div className="relative w-32 h-40 group-hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-foreground rounded-[50%] shadow-2xl" style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }} />
            
            <div className="absolute inset-1 bg-background rounded-[50%] overflow-hidden" style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}>
              <img 
                src={agentAvatar} 
                alt="Agent Kammer" 
                className="w-full h-full object-cover scale-110"
              />
            </div>

            <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20 45 Q 25 35, 30 40 Q 35 45, 40 38 Q 45 30, 50 25 Q 55 30, 60 38 Q 65 45, 70 40 Q 75 35, 80 45" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    fill="none"
                    className="text-primary"
              />
              <path d="M 25 48 Q 30 42, 35 45 Q 40 48, 45 43 Q 50 38, 55 43 Q 60 48, 65 45 Q 70 42, 75 48" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    fill="none"
                    className="text-primary opacity-60"
              />
            </svg>
          </div>

          <div className="absolute -top-2 -right-2 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-background shadow-lg animate-pulse" />
          </div>
          
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <Badge className="bg-gradient-to-r from-primary via-primary/90 to-primary text-foreground border-none shadow-xl text-sm font-semibold px-4 py-1.5">
              💬 Chat with Agent K
            </Badge>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      <Card className={`w-96 shadow-2xl border-2 border-primary/50 overflow-hidden transition-all duration-300 ${
        isMinimized ? "h-16" : "h-[600px]"
      }`}>
        <div className="bg-gradient-to-br from-primary via-primary/95 to-primary text-foreground p-4 flex items-center justify-between border-b border-foreground/20">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-14">
              <div className="absolute inset-0 bg-foreground rounded-[50%]" style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }} />
              <div className="absolute inset-0.5 bg-white rounded-[50%] overflow-hidden" style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}>
                <img 
                  src={agentAvatar} 
                  alt="Agent Kammer" 
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-primary animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-semibold">Agent Kammer</h3>
                <Sparkles className="w-3 h-3" />
              </div>
              <p className="text-xs text-foreground/90">Your Luxury Concierge</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 text-foreground hover:bg-foreground/10"
              data-testid="button-minimize-chat"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-foreground hover:bg-foreground/10"
              data-testid="button-close-chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <ScrollArea className="h-[460px] p-4 bg-background" ref={scrollRef as any}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground border border-border"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about properties..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  data-testid="input-chat-message"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!message.trim()}
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                AI-powered real estate assistance
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
