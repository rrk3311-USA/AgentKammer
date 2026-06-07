import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Send, Minimize2, Maximize2, Shield, GraduationCap, DollarSign, Home, Mic, MicOff, Plane, PiggyBank, Briefcase, Calculator, ShieldCheck, Gift, TrendingUp, Wallet, Building, FileText, RefreshCw } from "lucide-react";
import { ChatCircle } from "@phosphor-icons/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import agentAvatar from "@assets/generated_images/Tuxedo_professional_on_phone_cd981587.png";
import { playCrunchyChime, playButtonClick } from "@/lib/soundEffects";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface PromptChip {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  prompt: string;
  featured?: boolean;
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
  const [isListening, setIsListening] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const realEstateTop: PromptChip = {
    id: "home-value",
    icon: Home,
    label: "Free Home Value",
    prompt: "I'd like a free home valuation estimate",
    featured: true,
  };

  const promptChips: PromptChip[] = [
    realEstateTop,
    { id: "buy-home", icon: Building, label: "Buy", prompt: "I'm looking to buy a home - what's the best strategy?" },
    { id: "sell-home", icon: DollarSign, label: "Sell", prompt: "I want to sell my home - how do I get top dollar?" },
    { id: "refinance", icon: RefreshCw, label: "Refinance", prompt: "Should I refinance my mortgage? What are my options?" },
    { id: "best-travel-cards", icon: Plane, label: "Travel Rewards", prompt: "What credit card gives the best travel rewards right now?" },
    { id: "highest-cashback", icon: Gift, label: "Cashback", prompt: "Show me the apps with the highest cashback rates" },
    { id: "cheapest-insurance", icon: Shield, label: "Insurance", prompt: "What's the cheapest home or renters insurance?" },
    { id: "fastest-credit-fix", icon: TrendingUp, label: "Fix Credit", prompt: "How can I build my credit score quickly?" },
    { id: "highest-savings", icon: PiggyBank, label: "Savings Rate", prompt: "Which bank has the highest savings interest rate?" },
    { id: "business-funding", icon: Briefcase, label: "Business Loans", prompt: "I need business funding - what's the fastest option?" },
    { id: "student-savings", icon: GraduationCap, label: "Student Loans", prompt: "How can I lower my student loan payments?" },
    { id: "micro-invest", icon: TrendingUp, label: "Invest $5", prompt: "How can I start investing with just a few dollars?" },
    { id: "tax-savings", icon: Calculator, label: "Tax Refund", prompt: "What's the best way to maximize my tax refund?" },
    { id: "identity-protect", icon: ShieldCheck, label: "Identity", prompt: "How do I protect myself from identity theft?" },
    { id: "cancel-subscriptions", icon: Wallet, label: "Hidden Fees", prompt: "Can you help me find subscriptions I'm overpaying for?" },
    { id: "estate-planning", icon: FileText, label: "Estate Plan", prompt: "How do I set up a will or trust to protect my family?" },
  ];

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
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

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

  const handlePromptSelect = (prompt: string) => {
    playCrunchyChime();
    handleSend(prompt);
  };

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
      <div className="fixed right-6 bottom-6 z-50">
        <button
          onClick={() => {
            playButtonClick();
            setIsOpen(true);
          }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-brand-champagne/40 bg-brand-midnight text-brand-champagne shadow-xl transition hover:border-brand-champagne/60 hover:shadow-[0_8px_24px_rgba(214,180,95,0.18)]"
          data-testid="button-open-chat"
          aria-label="Open chat"
        >
          <ChatCircle size={24} weight="regular" className="transition group-hover:text-brand-ivory" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand-champagne ring-2 ring-brand-midnight" aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Card
        className={`w-96 shadow-2xl border border-brand-champagne/35 overflow-hidden transition-all duration-300 flex flex-col bg-brand-ivory ${
          isMinimized ? "h-16" : "min-h-[420px] max-h-[calc(100vh-6rem)] h-[600px]"
        }`}
      >
        <div className="bg-gradient-to-br from-brand-midnight via-brand-midnight to-brand-midnight/95 text-brand-ivory p-4 flex items-center justify-between border-b border-brand-champagne/30">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-11 shrink-0">
              <div className="h-full w-full overflow-hidden rounded-[999px] border-2 border-brand-champagne/60 bg-brand-midnight shadow-[inset_0_0_0_1px_rgba(214,180,95,0.15)]">
                <img
                  src={agentAvatar}
                  alt="Agent Kammer"
                  className={`h-full w-full object-cover scale-110 transition-transform duration-300 ${
                    isAgentSpeaking ? "animate-subtle-nod" : ""
                  }`}
                  style={{ objectPosition: "center 35%" }}
                />
              </div>
              <span
                className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-brand-champagne ring-2 ring-brand-midnight animate-pulse"
                aria-hidden
              />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-brand-ivory">Agent Kammer</h3>
              <p className="text-xs text-brand-champagne/90 tracking-wide">at your service</p>
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
              className="h-8 w-8 text-brand-ivory hover:bg-brand-ivory/10 hover:text-brand-champagne"
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
              className="h-8 w-8 text-brand-ivory hover:bg-brand-ivory/10 hover:text-brand-champagne"
              data-testid="button-close-chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="shrink-0 border-b border-brand-champagne/20 bg-brand-ivory px-3 py-2.5">
              <p className="mb-2 px-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-midnight/45">
                Popular prompts
              </p>
              <div
                className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                data-testid="prompt-slider"
              >
                {promptChips.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => handlePromptSelect(chip.prompt)}
                    data-testid={`button-prompt-${chip.id}`}
                    className={`flex shrink-0 snap-start items-center gap-1.5 rounded-brand border px-3 py-1.5 text-left transition-colors hover:bg-brand-champagne/15 active:bg-brand-champagne/25 ${
                      chip.featured
                        ? "border-brand-champagne/70 bg-brand-champagne/10 text-brand-midnight"
                        : "border-brand-champagne/40 bg-brand-ivory text-brand-midnight/85"
                    }`}
                  >
                    <chip.icon className={`h-3.5 w-3.5 shrink-0 ${chip.featured ? "text-brand-champagne" : "text-brand-champagne/80"}`} />
                    <span className="whitespace-nowrap text-xs font-medium">{chip.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <ScrollArea className="flex-1 p-4 bg-brand-ivory" ref={scrollRef as any}>
              <div className="space-y-4">
                {messages.map((msg) => {
                  const renderMessage = () => {
                    if (msg.sender === "user") {
                      return <p className="text-sm text-brand-ivory">{msg.text}</p>;
                    }

                    const lines = msg.text.split("\n");
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
                        <p className="text-sm font-medium whitespace-pre-line text-brand-midnight">
                          {questionLines.join("\n")}
                        </p>
                        {options.length > 0 && (
                          <div className="mt-3 flex flex-col gap-2">
                            {options.map((opt) => (
                              <Button
                                key={opt.letter}
                                onClick={() => {
                                  playCrunchyChime();
                                  handleSend(`${opt.letter}. ${opt.text}`);
                                }}
                                className="h-auto w-full justify-start rounded-brand border border-brand-champagne/35 bg-brand-midnight px-4 py-2.5 text-left font-semibold normal-case tracking-normal text-brand-champagne hover:bg-brand-midnight/90"
                                data-testid={`button-option-${opt.letter.toLowerCase()}`}
                              >
                                <span className="mr-2 font-bold">{opt.letter}.</span>
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
                        className={`max-w-[80%] rounded-brand px-4 py-2 ${
                          msg.sender === "user"
                            ? "border border-brand-champagne/25 bg-brand-midnight text-brand-ivory"
                            : "border border-brand-champagne/40 bg-brand-champagne/12 text-brand-midnight"
                        }`}
                      >
                        {renderMessage()}
                        <p
                          className={`mt-1 text-xs ${
                            msg.sender === "agent" ? "text-brand-midnight/50" : "text-brand-ivory/65"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="shrink-0 border-t border-brand-champagne/20 bg-brand-ivory p-4">
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant={isListening ? "default" : "outline"}
                  onClick={toggleVoiceInput}
                  data-testid="button-voice-input"
                  className={`border-brand-champagne/30 ${isListening ? "animate-pulse bg-brand-midnight text-brand-champagne" : "text-brand-midnight hover:bg-brand-champagne/10"}`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Input
                  placeholder={isListening ? "Listening..." : "Ask about properties..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-brand-champagne/25 bg-brand-ivory text-brand-midnight placeholder:text-brand-midnight/40 focus-visible:ring-brand-champagne/40"
                  data-testid="input-chat-message"
                  disabled={isListening}
                />
                <Button
                  variant="brand"
                  size="icon"
                  onClick={() => {
                    playCrunchyChime();
                    handleSend();
                  }}
                  disabled={!message.trim() || isListening}
                  data-testid="button-send-message"
                >
                  <Send className="h-5 w-5" strokeWidth={2.5} />
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-brand-midnight/45">
                {isListening ? "Listening… speak now" : "AI-powered real estate assistance"}
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
