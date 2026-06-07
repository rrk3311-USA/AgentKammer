import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Video, UserCheck, Building2, Award } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function BrokerRegistration() {
  const { toast } = useToast();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    yearsExperience: "",
    specialization: "",
    brokerage: "",
    neighborhoods: "",
    bio: "",
    linkedIn: "",
    website: "",
  });

  const brokerMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/broker-registration", data);
    },
    onSuccess: () => {
      toast({
        title: "Registration Submitted!",
        description: "We'll review your profile and video. You'll hear from us within 48 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        licenseNumber: "",
        yearsExperience: "",
        specialization: "",
        brokerage: "",
        neighborhoods: "",
        bio: "",
        linkedIn: "",
        website: "",
      });
      setVideoFile(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    brokerMutation.mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      toast({
        title: "Video Selected",
        description: `${file.name} ready to upload`,
      });
    }
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="relative h-80 bg-gradient-to-br from-foreground via-foreground/95 to-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(184,134,11,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(184,134,11,0.1)_0%,_transparent_50%)]" />
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div>
            <Badge className="mb-4 px-4 py-2 text-sm bg-background/20 border-background/30 text-background">
              For Brokers
            </Badge>
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-background mb-4">
              Broker Registration
            </h1>
            <p className="text-xl text-background/90 max-w-2xl mx-auto">
              Join Agent Kammer's network of elite NYC real estate professionals
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="font-serif text-3xl flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-primary" />
              Create Your Broker Profile
            </CardTitle>
            <p className="text-muted-foreground">
              Stand out to potential clients by showcasing your expertise and personality
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h3 className="font-serif text-xl font-semibold">Personal Information</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      required
                      data-testid="input-last-name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                      data-testid="input-phone"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Credentials */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h3 className="font-serif text-xl font-semibold">Professional Credentials</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Real Estate License Number</Label>
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) => handleChange("licenseNumber", e.target.value)}
                      required
                      data-testid="input-license"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearsExperience">Years of Experience</Label>
                    <Select
                      value={formData.yearsExperience}
                      onValueChange={(value) => handleChange("yearsExperience", value)}
                    >
                      <SelectTrigger id="yearsExperience" data-testid="select-experience">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16+">16+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brokerage">Brokerage Firm</Label>
                    <Input
                      id="brokerage"
                      placeholder="e.g., Douglas Elliman, Compass, Corcoran"
                      value={formData.brokerage}
                      onChange={(e) => handleChange("brokerage", e.target.value)}
                      required
                      data-testid="input-brokerage"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select
                      value={formData.specialization}
                      onValueChange={(value) => handleChange("specialization", value)}
                    >
                      <SelectTrigger id="specialization" data-testid="select-specialization">
                        <SelectValue placeholder="Select your focus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="luxury">Luxury Properties</SelectItem>
                        <SelectItem value="first-time">First-Time Buyers</SelectItem>
                        <SelectItem value="investment">Investment Properties</SelectItem>
                        <SelectItem value="commercial">Commercial Real Estate</SelectItem>
                        <SelectItem value="rental">Rentals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neighborhoods">Neighborhoods You Cover</Label>
                  <Input
                    id="neighborhoods"
                    placeholder="e.g., Upper West Side, Chelsea, SoHo"
                    value={formData.neighborhoods}
                    onChange={(e) => handleChange("neighborhoods", e.target.value)}
                    required
                    data-testid="input-neighborhoods"
                  />
                </div>
              </div>

              {/* About You */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h3 className="font-serif text-xl font-semibold">About You</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell clients about your experience, approach, and what makes you unique..."
                    value={formData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    rows={5}
                    required
                    data-testid="input-bio"
                  />
                  <p className="text-xs text-muted-foreground">
                    This will appear on your profile. Make it compelling!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedIn">LinkedIn Profile (optional)</Label>
                    <Input
                      id="linkedIn"
                      type="url"
                      placeholder="https://linkedin.com/in/yourname"
                      value={formData.linkedIn}
                      onChange={(e) => handleChange("linkedIn", e.target.value)}
                      data-testid="input-linkedin"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Personal Website (optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      data-testid="input-website"
                    />
                  </div>
                </div>
              </div>

              {/* Video Pitch */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h3 className="font-serif text-xl font-semibold">Your Pitch Video</h3>
                </div>

                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Video className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Why video matters</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Your video is how clients get to know you. Record a 60-90 second introduction where you:
                        </p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Introduce yourself and your background
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Explain your approach to working with clients
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Share what makes you unique as a broker
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Show your passion for NYC real estate
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="video" className="cursor-pointer">
                        <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 hover-elevate transition-all text-center">
                          <Upload className="h-10 w-10 text-primary mx-auto mb-3" />
                          <p className="font-medium mb-1">
                            {videoFile ? videoFile.name : "Click to upload your pitch video"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            MP4, MOV, or AVI • Max 100MB • 60-90 seconds recommended
                          </p>
                        </div>
                        <Input
                          id="video"
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="hidden"
                          required
                          data-testid="input-video"
                        />
                      </Label>

                      {videoFile && (
                        <div className="bg-background rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Video className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium text-sm">{videoFile.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setVideoFile(null)}
                            data-testid="button-remove-video"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                data-testid="button-submit-registration"
                disabled={brokerMutation.isPending}
              >
                {brokerMutation.isPending ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <Building2 className="h-10 w-10 text-primary mx-auto mb-3" />
              <h4 className="font-serif text-lg font-semibold mb-2">Premium Network</h4>
              <p className="text-sm text-muted-foreground">
                Join NYC's most exclusive broker network serving high-end clients
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 text-primary mx-auto mb-3" />
              <h4 className="font-serif text-lg font-semibold mb-2">Qualified Leads</h4>
              <p className="text-sm text-muted-foreground">
                Connect with pre-qualified buyers actively searching for properties
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <UserCheck className="h-10 w-10 text-primary mx-auto mb-3" />
              <h4 className="font-serif text-lg font-semibold mb-2">Client Choice</h4>
              <p className="text-sm text-muted-foreground">
                Let your expertise and personality win clients through video profiles
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
