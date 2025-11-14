import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Send, Minimize2, Maximize2, Sparkles, MousePointer, TrendingDown, Clock, Shield, GraduationCap, DollarSign, Home, Mic, MicOff } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import agentAvatar from "@assets/generated_images/Tuxedo_professional_on_phone_cd981587.png";

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
      text: "Good evening. I'm Agent Kammer, your personal real estate concierge. How may I assist you in finding your perfect luxury property today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [activeTab, setActiveTab] = useState("chat");
  const [isListening, setIsListening] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSend = async (text?: string) => {
    const messageText = text || message;
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setActiveTab("chat");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentResponse]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing a technical difficulty. Please try again in a moment.",
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    }
  };

  const popularPrompts = [
    { id: "free-estimate", icon: Home, label: "Free Home Estimate", prompt: "I'd like a free home valuation estimate", featured: true },
    { id: "best-deal", icon: DollarSign, label: "Best Deal Right Now", prompt: "Show me the best deal on the market right now" },
    { id: "longest-market", icon: Clock, label: "Longest on Market", prompt: "Which properties have been on the market the longest?" },
    { id: "safest-location", icon: Shield, label: "Safest Locations", prompt: "What are the safest luxury neighborhoods?" },
    { id: "school-zone", icon: GraduationCap, label: "Best School Zones", prompt: "Show me properties in the best school zones" },
    { id: "price-reduced", icon: TrendingDown, label: "Recently Reduced", prompt: "Show me properties with recent price reductions" },
    { id: "new-listings", icon: Home, label: "New Listings", prompt: "What are the newest luxury listings?" },
  ];

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed right-2 bottom-16 z-50 scale-[0.8]">
        <button
          onClick={() => setIsOpen(true)}
          className="relative group"
          data-testid="button-open-chat"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 blur-2xl group-hover:blur-3xl transition-all" />
          
          <div className="relative group-hover:scale-105 transition-transform">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 animate-sparkle opacity-0">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="absolute top-0 left-1/3 -translate-x-1/2 animate-sparkle-delayed opacity-0">
              <Sparkles className="w-3 h-3 text-primary" />
            </div>
            <div className="absolute top-1 right-1/3 translate-x-1/2 animate-sparkle-delayed-2 opacity-0">
              <MousePointer className="w-3 h-3 text-primary" />
            </div>
            <div className="absolute top-3 left-1/4 animate-sparkle-delayed-3 opacity-0">
              <MousePointer className="w-3 h-3 text-primary" />
            </div>
            
            <div className="text-center animate-wiggle">
              <div className="text-5xl filter drop-shadow-2xl">🎩</div>
            </div>

            <div className="mt-2 flex flex-col items-end space-y-1">
              <Badge className="bg-gray-700 text-background border-none shadow-md text-[0.65rem] px-1.5 py-0.5 flex items-center gap-1">
                <div className="relative w-1.5 h-1.5">
                  <div className="absolute inset-0 rounded-full bg-green-500 animate-ping-slow" />
                  <div className="absolute inset-0 rounded-full bg-red-500 animate-ping-slow-red" />
                </div>
                <span className="font-semibold">Live</span>
              </Badge>
              
              <Badge className="bg-foreground text-background border-none shadow-md text-xs px-2 py-0.5">
                Chat with Agent K
              </Badge>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed right-2 bottom-16 z-50 scale-[0.8]">
      <Card className={`w-96 shadow-2xl border-2 border-primary/50 overflow-hidden transition-all duration-300 flex flex-col ${
        isMinimized ? "h-16" : "min-h-[420px] max-h-[calc(100vh-6rem)] h-[600px]"
      }`}>
        <div className="bg-gradient-to-br from-[#0a1628] via-[#0c1a2e] to-[#0a1628] text-white p-4 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-14">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="65" rx="48" ry="63" fill="currentColor" className="text-white" />
                <ellipse cx="50" cy="65" rx="45" ry="60" fill="#0a1628" />
              </svg>
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "ellipse(43% 45% at 50% 50%)" }}>
                <img 
                  src={agentAvatar} 
                  alt="Agent Kammer" 
                  className="w-full h-full object-cover scale-125"
                  style={{ objectPosition: "center 30%" }}
                />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0a1628] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-semibold">Agent Kammer</h3>
                <Sparkles className="w-3 h-3" />
              </div>
              <p className="text-xs text-white/90">Your Luxury Concierge</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 text-white hover:bg-white/10"
              data-testid="button-minimize-chat"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/10"
              data-testid="button-close-chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 overflow-hidden">
              <TabsList className="w-full grid grid-cols-2 rounded-none bg-muted/50 shrink-0">
                <TabsTrigger value="prompts" data-testid="tab-prompts">Popular Prompts</TabsTrigger>
                <TabsTrigger value="chat" data-testid="tab-chat">Chat</TabsTrigger>
              </TabsList>

              <TabsContent value="prompts" className="flex-1 overflow-hidden m-0">
                <ScrollArea className="h-full p-4 bg-background">
                  <div className="grid grid-cols-2 gap-2">
                    {popularPrompts.map((prompt) => (
                      <Button
                        key={prompt.id}
                        variant={(prompt as any).featured ? "default" : "outline"}
                        className={`h-auto p-3 flex flex-col items-center gap-2 text-center hover-elevate active-elevate-2 ${
                          (prompt as any).featured ? "col-span-2 bg-[#0a1628] text-[#d4af37] border border-[#d4af37]/30 font-semibold py-4" : ""
                        }`}
                        onClick={() => handleSend(prompt.prompt)}
                        data-testid={`button-prompt-${prompt.id}`}
                      >
                        <prompt.icon className={`h-6 w-6 ${(prompt as any).featured ? "text-[#d4af37]" : "text-primary"}`} />
                        <span className={`leading-tight ${(prompt as any).featured ? "text-sm font-bold" : "text-xs"}`}>{prompt.label}</span>
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Click any prompt to start a conversation
                  </p>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="chat" className="flex-1 overflow-hidden m-0">
                <ScrollArea className="h-full p-4 bg-background" ref={scrollRef as any}>
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            msg.sender === "user"
                              ? "bg-[#4A90E2] text-white border border-[#4A90E2]"
                              : "bg-[#d4af37] border border-[#d4af37]"
                          }`}
                        >
                          <p className={`text-sm ${msg.sender === "agent" ? "text-black font-medium" : "text-white"}`}>{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.sender === "agent" ? "text-black/60" : "text-white/70"}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>

            <div className="p-4 border-t bg-background shrink-0">
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant={isListening ? "default" : "outline"}
                  onClick={toggleVoiceInput}
                  data-testid="button-voice-input"
                  className={isListening ? "animate-pulse" : ""}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Input
                  placeholder={isListening ? "Listening..." : "Ask about properties..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  data-testid="input-chat-message"
                  disabled={isListening}
                />
                <Button
                  size="icon"
                  onClick={() => handleSend()}
                  disabled={!message.trim() || isListening}
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {isListening ? "🎤 Listening... Speak now" : "AI-powered real estate assistance"}
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
