import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Clock, 
  DollarSign, 
  Star, 
  Play,
  CheckCircle2,
  Users,
  Trophy,
  Brain,
  Scale,
  Target,
  Handshake,
  TrendingUp,
  Shield
} from "lucide-react";

export default function Ecourses() {
  const featuredCourse = {
    id: "perfect-decision-making",
    title: "Perfect Decision-Making",
    subtitle: "The Strategic Neutrality Method",
    instructor: "Agent Kammer",
    duration: "1 hour",
    price: "$100",
    rating: 5.0,
    students: 847,
    description: "Master the art of neutral decision-making. Learn to externalize your thoughts, suspend judgment, and analyze information like a Swiss diplomat. This course teaches you to become the impartial judge of your own mind by systematically laying out pros, cons, counterarguments, and alternatives before making any decision. Transform chaos into clarity.",
    highlights: [
      "The Swiss Neutrality Framework for decisions",
      "Externalizing thought patterns and biases",
      "Systematic pros/cons/counterargument analysis",
      "Becoming the judge of your own mind",
      "Real estate negotiation applications",
      "High-stakes decision protocols"
    ]
  };

  const courses = [
    {
      id: "luxury-client-psychology",
      title: "Luxury Client Psychology",
      instructor: "Agent Kammer",
      duration: "1.5 hours",
      price: "$150",
      rating: 4.9,
      students: 612,
      description: "Decode the mindset of ultra-high-net-worth clients. Learn the psychological triggers, communication patterns, and relationship-building strategies that close $5M+ deals. Understand what luxury buyers really want beyond the property specs.",
      icon: Brain,
      highlights: [
        "UHNW client behavioral patterns",
        "Luxury buying triggers and motivations",
        "White-glove service standards",
        "Building trust at the highest level"
      ]
    },
    {
      id: "negotiation-mastery-elite",
      title: "Negotiation Mastery for Elite Agents",
      instructor: "Agent Kammer",
      duration: "2 hours",
      price: "$200",
      rating: 5.0,
      students: 1043,
      description: "Advanced negotiation tactics for luxury real estate transactions. Learn how to create win-win scenarios in competitive bidding wars, handle multiple offers, and structure deals that protect your client while maximizing value. Includes real case studies from $10M+ transactions.",
      icon: Handshake,
      highlights: [
        "Multi-offer strategy frameworks",
        "Competitive bidding psychology",
        "$10M+ deal structuring techniques",
        "Protecting client interests at scale"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.1),transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-4">
            <Badge 
              className="mb-6 border-0" 
              style={{ 
                background: 'rgba(212,175,55,0.2)', 
                color: '#d4af37',
                backdropFilter: 'blur(10px)'
              }}
            >
              <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
              Premium Online Courses
            </Badge>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-white">
              Master Your Craft
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Exclusive training from industry experts. Strategic frameworks, psychological insights, 
              and real-world tactics to elevate your luxury real estate practice.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Course */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge 
              className="mb-4 border-0" 
              style={{ 
                background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                color: '#000',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem'
              }}
            >
              <Trophy className="h-4 w-4 mr-2" />
              Featured Course
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
              {featuredCourse.title}
            </h2>
            <p className="text-xl mt-2" style={{ color: '#d4af37' }}>
              {featuredCourse.subtitle}
            </p>
          </div>

          <Card 
            className="overflow-hidden border-0" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(15,32,55,0.95) 100%)',
              backdropFilter: 'blur(20px)'
            }}
            data-testid="card-featured-course"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left: Course Icon & Stats */}
              <div className="flex flex-col items-center justify-center space-y-6">
                <div 
                  className="w-48 h-48 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.3), rgba(212,175,55,0.05))',
                    border: '2px solid rgba(212,175,55,0.3)'
                  }}
                >
                  <Scale className="h-24 w-24" style={{ color: '#d4af37' }} />
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
                      <span className="font-bold text-white">{featuredCourse.rating}</span>
                    </div>
                    <p className="text-xs text-white/60">Rating</p>
                  </div>
                  <div className="h-8 w-px bg-white/20" />
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-[#d4af37]" />
                      <span className="font-bold text-white">{featuredCourse.students}</span>
                    </div>
                    <p className="text-xs text-white/60">Students</p>
                  </div>
                </div>
              </div>

              {/* Right: Course Details */}
              <div className="flex flex-col justify-center">
                <h3 className="font-serif text-3xl font-bold mb-4 text-white">
                  {featuredCourse.title}
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {featuredCourse.description}
                </p>

                <div className="space-y-3 mb-6">
                  <p className="text-sm font-semibold text-white/70 uppercase tracking-wide">What You'll Learn:</p>
                  <div className="grid gap-2">
                    {featuredCourse.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#d4af37' }} />
                        <span className="text-sm text-white/80">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2" style={{ color: 'rgba(212,175,55,0.9)' }}>
                    <Clock className="h-5 w-5" />
                    <span className="font-semibold">{featuredCourse.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-2xl font-bold" style={{ color: '#d4af37' }}>
                    <DollarSign className="h-6 w-6" />
                    {featuredCourse.price.replace('$', '')}
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="gap-2 border-0 w-full"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                    color: '#000',
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                  data-testid="button-enroll-featured"
                >
                  <Play className="h-5 w-5" />
                  Enroll Now
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Additional Courses */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(to bottom, #1e293b, #0f172a)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-white">
              More Elite Training
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Continue your professional development with these specialized courses designed for luxury real estate professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card 
                key={course.id}
                className="overflow-hidden border-0"
                style={{ 
                  background: 'rgba(15,23,42,0.8)',
                  backdropFilter: 'blur(10px)'
                }}
                data-testid={`card-course-${course.id}`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: 'rgba(212,175,55,0.15)',
                        border: '1px solid rgba(212,175,55,0.3)'
                      }}
                    >
                      <course.icon className="h-8 w-8" style={{ color: '#d4af37' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-semibold mb-1 text-white">
                        {course.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'rgba(212,175,55,0.8)' }}>
                        by {course.instructor}
                      </p>
                    </div>
                    <Badge 
                      className="shrink-0 border-0" 
                      style={{ 
                        background: 'rgba(212,175,55,0.2)', 
                        color: '#d4af37'
                      }}
                    >
                      <Star className="h-3 w-3 mr-1 fill-[#d4af37] text-[#d4af37]" />
                      {course.rating}
                    </Badge>
                  </div>

                  <p className="leading-relaxed mb-4 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {course.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {course.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: '#d4af37' }} />
                        <span className="text-xs text-white/70">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1" style={{ color: 'rgba(212,175,55,0.8)' }}>
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1" style={{ color: 'rgba(212,175,55,0.8)' }}>
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-lg font-bold" style={{ color: '#d4af37' }}>
                      <DollarSign className="h-5 w-5" />
                      {course.price.replace('$', '')}
                    </div>
                  </div>

                  <Button 
                    className="gap-2 border-0 w-full"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                      color: '#000',
                      fontWeight: 600
                    }}
                    data-testid={`button-enroll-${course.id}`}
                  >
                    <Play className="h-4 w-4" />
                    Enroll Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold mb-6">
            Invest in Your Professional Excellence
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Join thousands of elite real estate professionals who have transformed their practice through our exclusive training programs.
          </p>
          <Button size="lg" className="gap-2" data-testid="button-browse-courses">
            <GraduationCap className="h-5 w-5" />
            Browse All Courses
          </Button>
        </div>
      </section>
    </div>
  );
}
