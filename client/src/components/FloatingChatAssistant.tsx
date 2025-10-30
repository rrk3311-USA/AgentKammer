import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Send, Minimize2, Maximize2, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import agentAvatar from "@assets/generated_images/Happy_concierge_sunrise_party_portrait_7bbb9fd2.png";

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
          
          <div className="relative w-28 h-36 group-hover:scale-105 transition-all duration-300">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="65" rx="48" ry="63" fill="currentColor" className="text-foreground" />
              <ellipse cx="50" cy="65" rx="45" ry="60" fill="currentColor" className="text-background" />
            </svg>
            
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "ellipse(45% 46% at 50% 50%)" }}>
              <img 
                src={agentAvatar} 
                alt="Agent Kammer" 
                className="w-full h-full object-cover scale-110"
              />
            </div>

            <svg className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-8" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 15 28 C 15 28, 18 20, 22 22 C 26 24, 28 28, 32 24 C 36 20, 38 16, 40 14 C 42 16, 44 20, 48 24 C 52 28, 54 24, 58 22 C 62 20, 65 28, 65 28" 
                    stroke="currentColor" 
                    strokeWidth="1.2" 
                    fill="none"
                    className="text-primary"
                    strokeLinecap="round"
              />
              <path d="M 18 30 C 18 30, 20 24, 24 25 C 28 26, 30 30, 34 27 C 38 24, 40 20, 40 18 C 40 20, 42 24, 46 27 C 50 30, 52 26, 56 25 C 60 24, 62 30, 62 30" 
                    stroke="currentColor" 
                    strokeWidth="1.2" 
                    fill="none"
                    className="text-primary opacity-60"
                    strokeLinecap="round"
              />
              <circle cx="40" cy="26" r="2" fill="currentColor" className="text-primary" />
            </svg>

            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="text-3xl">🎩</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-5 bg-foreground/30 rounded-full" style={{ marginTop: '8px' }} />
                </div>
              </div>
            </div>
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
            <div className="relative w-11 h-14">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="65" rx="48" ry="63" fill="currentColor" className="text-foreground" />
                <ellipse cx="50" cy="65" rx="45" ry="60" fill="white" />
              </svg>
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "ellipse(43% 45% at 50% 50%)" }}>
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
