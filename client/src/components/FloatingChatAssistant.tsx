import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Send, Minimize2, Maximize2, Sparkles, MousePointer, TrendingDown, Clock, Shield, GraduationCap, DollarSign, Home, Mic, MicOff, Volume2, VolumeX, CreditCard, Plane, Percent, PiggyBank, Briefcase, Calculator, ShieldCheck, Gift, TrendingUp, Wallet, Building, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import agentAvatar from "@assets/generated_images/Tuxedo_professional_on_phone_cd981587.png";
import { playCrunchyChime, playButtonClick } from "@/lib/soundEffects";

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
      text: "Welcome, and blessings to you! May I have the pleasure of knowing your name?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [activeTab, setActiveTab] = useState("chat");
  const [isListening, setIsListening] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === "agent") {
      setIsAgentSpeaking(true);
      const duration = Math.min(lastMessage.text.length * 50, 3000);
      const timer = setTimeout(() => {
        setIsAgentSpeaking(false);
      }, duration);
      
      return () => clearTimeout(timer);
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

    playCrunchyChime();

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

  // Real Estate Module - 3-part container
  const realEstateModule = [
    { id: "home-value", icon: Home, label: "Home Value", prompt: "I'd like a free home valuation estimate" },
    { id: "buy-home", icon: Building, label: "Buy", prompt: "I'm looking to buy a home - what's the best strategy?" },
    { id: "sell-home", icon: DollarSign, label: "Sell", prompt: "I want to sell my home - how do I get top dollar?" },
  ];

  // Benefit-driven affiliate category prompts
  const benefitPrompts = [
    { id: "best-travel-cards", icon: Plane, label: "Best Travel Rewards", prompt: "What credit card gives the best travel rewards right now?" },
    { id: "highest-cashback", icon: Gift, label: "Highest Cashback", prompt: "Show me the apps with the highest cashback rates" },
    { id: "cheapest-insurance", icon: Shield, label: "Cheapest Insurance", prompt: "What's the cheapest home or renters insurance?" },
    { id: "fastest-credit-fix", icon: TrendingUp, label: "Fix Credit Fast", prompt: "How can I build my credit score quickly?" },
    { id: "highest-savings", icon: PiggyBank, label: "Best Savings Rate", prompt: "Which bank has the highest savings interest rate?" },
    { id: "business-funding", icon: Briefcase, label: "Fast Business Loans", prompt: "I need business funding - what's the fastest option?" },
    { id: "student-savings", icon: GraduationCap, label: "Student Loan Help", prompt: "How can I lower my student loan payments?" },
    { id: "micro-invest", icon: TrendingUp, label: "Start Investing $5", prompt: "How can I start investing with just a few dollars?" },
    { id: "tax-savings", icon: Calculator, label: "Max Tax Refund", prompt: "What's the best way to maximize my tax refund?" },
    { id: "identity-protect", icon: ShieldCheck, label: "Protect My Identity", prompt: "How do I protect myself from identity theft?" },
    { id: "cancel-subscriptions", icon: Wallet, label: "Find Hidden Fees", prompt: "Can you help me find subscriptions I'm overpaying for?" },
    { id: "estate-planning", icon: FileText, label: "Protect My Family", prompt: "How do I set up a will or trust to protect my family?" },
  ];

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    playButtonClick();

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
          onClick={() => {
            playButtonClick();
            setIsOpen(true);
          }}
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
              <div className="filter drop-shadow-2xl text-5xl">
                🎩
              </div>
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
                  className={`w-full h-full object-cover scale-110 transition-transform duration-300 ${
                    isAgentSpeaking ? 'animate-subtle-nod' : ''
                  }`}
                  style={{ objectPosition: "center 35%" }}
                />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0a1628] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-semibold">Agent Kammer</h3>
                <span className="text-sm">🎩</span>
              </div>
              <p className="text-xs text-white/90">at your service</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                playButtonClick();
                setIsMinimized(!isMinimized);
              }}
              className="h-8 w-8 text-white hover:bg-white/10"
              data-testid="button-minimize-chat"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                playButtonClick();
                setIsOpen(false);
              }}
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
                <ScrollArea className="h-full p-3 bg-background">
                  {/* Real Estate Module - 3-part container */}
                  <div className="grid grid-cols-[2fr_1fr_1fr] gap-1 mb-3">
                    {realEstateModule.map((item, idx) => (
                      <Button
                        key={item.id}
                        variant="outline"
                        className={`h-auto py-2 px-2 flex flex-col items-center gap-1 text-center hover-elevate active-elevate-2 ${
                          idx === 0 
                            ? "bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700" 
                            : "bg-muted/30 border-muted"
                        }`}
                        onClick={() => {
                          playCrunchyChime();
                          handleSend(item.prompt);
                        }}
                        data-testid={`button-prompt-${item.id}`}
                      >
                        <item.icon className={`h-4 w-4 ${idx === 0 ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-[10px] leading-tight ${idx === 0 ? "font-medium" : "text-muted-foreground"}`}>{item.label}</span>
                      </Button>
                    ))}
                  </div>

                  {/* Benefit-driven affiliate prompts */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {benefitPrompts.map((prompt) => (
                      <Button
                        key={prompt.id}
                        variant="outline"
                        className="h-auto p-2 flex flex-col items-center gap-1 text-center hover-elevate active-elevate-2 border-primary/20 bg-primary/5"
                        onClick={() => {
                          playCrunchyChime();
                          handleSend(prompt.prompt);
                        }}
                        data-testid={`button-prompt-${prompt.id}`}
                      >
                        <prompt.icon className="h-4 w-4 text-[#d4af37]" />
                        <span className="text-[10px] leading-tight font-medium">{prompt.label}</span>
                      </Button>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-3 text-center">
                    Tap any topic to get personalized recommendations
                  </p>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="chat" className="flex-1 overflow-hidden m-0">
                <ScrollArea className="h-full p-4 bg-background" ref={scrollRef as any}>
                  <div className="space-y-4">
                    {messages.map((msg) => {
                      const renderMessage = () => {
                        if (msg.sender === "user") {
                          return <p className="text-sm text-white">{msg.text}</p>;
                        }

                        const lines = msg.text.split('\n');
                        const questionLines: string[] = [];
                        const options: { letter: string; text: string }[] = [];
                        
                        lines.forEach((line) => {
                          const trimmed = line.trim();
                          const match = trimmed.match(/^([A-D])\.\s*(.+)$/);
                          if (match) {
                            options.push({ letter: match[1], text: match[2] });
                          } else if (trimmed) {
                            questionLines.push(trimmed);
                          }
                        });

                        return (
                          <div className="space-y-3">
                            <p className="text-sm text-black font-medium whitespace-pre-line">
                              {questionLines.join('\n')}
                            </p>
                            {options.length > 0 && (
                              <div className="flex flex-col gap-2 mt-3">
                                {options.map((opt) => (
                                  <Button
                                    key={opt.letter}
                                    onClick={() => {
                                      playCrunchyChime();
                                      handleSend(`${opt.letter}. ${opt.text}`);
                                    }}
                                    className="bg-[#001a4d] text-[#facc15] border border-[#facc15]/30 font-semibold hover:bg-[#001a4d]/90 justify-start text-left h-auto py-2.5 px-4"
                                    data-testid={`button-option-${opt.letter.toLowerCase()}`}
                                  >
                                    <span className="font-bold mr-2">{opt.letter}.</span>
                                    {opt.text}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      };

                      return (
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
                            {renderMessage()}
                            <p className={`text-xs mt-1 ${msg.sender === "agent" ? "text-black/60" : "text-white/70"}`}>
                              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
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
                  variant="luxury"
                  size="icon"
                  onClick={() => {
                    playCrunchyChime();
                    handleSend();
                  }}
                  disabled={!message.trim() || isListening}
                  data-testid="button-send-message"
                  className="rounded-full"
                  style={{
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
                  }}
                >
                  <Send className="h-5 w-5" strokeWidth={2.5} />
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
