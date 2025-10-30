import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Send, Minimize2, Maximize2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl group-hover:blur-2xl transition-all" />
          
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-foreground via-foreground/95 to-foreground shadow-2xl border-2 border-primary/30 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(184,134,11,0.2)_0%,_transparent_50%)]" />
            
            <div className="relative text-center">
              <div className="w-12 h-12 mx-auto mb-1 rounded-full bg-background/20 backdrop-blur flex items-center justify-center border border-primary/30">
                <span className="text-2xl">🎩</span>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-primary/80 rounded-full" 
                   style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }} />
            </div>
          </div>

          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-foreground animate-pulse" />
          
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <Badge className="bg-foreground text-background border-primary/30 shadow-lg text-xs">
              Ask Agent K
            </Badge>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      <Card className={`w-96 shadow-2xl border-2 border-primary/30 overflow-hidden transition-all duration-300 ${
        isMinimized ? "h-16" : "h-[600px]"
      }`}>
        <div className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground text-background p-4 flex items-center justify-between border-b border-primary/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur flex items-center justify-center border border-primary/30">
                <span className="text-xl">🎩</span>
              </div>
              <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-primary/90 rounded-full" 
                   style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }} />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-foreground" />
            </div>
            <div>
              <h3 className="font-serif font-semibold">Agent Kammer</h3>
              <p className="text-xs text-background/80">Personal Concierge</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 text-background hover:bg-background/10"
              data-testid="button-minimize-chat"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-background hover:bg-background/10"
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
