import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DigestProperty {
  id: string;
  image: string;
  price: number;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}

interface EmailDigestPreviewProps {
  properties: DigestProperty[];
}

export function EmailDigestPreview({ properties }: EmailDigestPreviewProps) {
  const { toast } = useToast();
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SMS signup:", phone);
    toast({
      title: "Success!",
      description: "You'll start receiving property alerts via text.",
    });
    setPhone("");
  };

  return (
    <section className="py-10 lg:py-12 bg-[#0a1628]">
      <div className="max-w-3xl mx-auto px-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur shadow-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-3">
              <h2 className="font-serif text-2xl font-semibold mb-2 text-white">
                Get the Texts That Matter to You
              </h2>
              <p className="text-sm text-white/70">
                Instant property alerts delivered right to your phone
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone-number" className="text-sm font-medium text-white">
                Phone Number
              </Label>
              <Input
                id="phone-number"
                type="tel"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                data-testid="input-phone-number"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full text-black h-11"
              data-testid="button-subscribe-sms"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Receiving Text Alerts
            </Button>

            <div className="grid grid-cols-3 gap-3 pt-3 text-center">
              <div className="text-xs text-white/70">
                New listings
              </div>
              <div className="text-xs text-white/70">
                Price drops
              </div>
              <div className="text-xs text-white/70">
                Market updates
              </div>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
