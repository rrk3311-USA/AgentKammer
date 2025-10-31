import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MorningEmailIcon } from "./MorningEmailIcon";

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
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email digest signup:", email);
    toast({
      title: "Success!",
      description: "You'll receive your first property digest tomorrow morning.",
    });
    setEmail("");
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-4">
            Get Your Email Every Morning
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wake up to personalized property matches delivered to your inbox daily
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MorningEmailIcon className="h-8 w-8" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="digest-email" className="text-base font-medium">
                Email Address
              </Label>
              <Input
                id="digest-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
                data-testid="input-digest-email"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full text-black"
              data-testid="button-subscribe-digest"
            >
              <Mail className="mr-2 h-5 w-5" />
              Start Receiving Daily Emails
            </Button>

            <div className="text-center space-y-2 pt-4">
              <p className="text-sm text-muted-foreground">
                ✓ Personalized property matches every morning
              </p>
              <p className="text-sm text-muted-foreground">
                ✓ Cancel anytime with one click
              </p>
              <p className="text-sm text-muted-foreground">
                ✓ No spam, just properties you'll love
              </p>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
