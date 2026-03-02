import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Flo's autonomous material movement has completely changed our site logistics. We've seen a 6x increase in turnaround time without adding any extra headcount.",
    author: "Rajesh Kumar",
    role: "Project Director, Sobha Ltd.",
    avatar: "/avatars/rajesh.jpg",
    initials: "RK",
  },
  {
    quote:
      "The precision and reliability of their navigation systems are unmatched. It's not just a robot; it's a seamless part of our construction workflow.",
    author: "Sarah D'Souza",
    role: "Operations Manager, L&T Construction",
    avatar: "/avatars/sarah.jpg",
    initials: "SD",
  },
  {
    quote:
      "Reliability was our main concern, but Flo Mobility delivered. The swappable batteries mean we have zero downtime during peak hours.",
    author: "Amit Shah",
    role: "Site Engineer, Hitech Precast",
    avatar: "/avatars/amit.jpg",
    initials: "AS",
  },
];

export function Testimonials() {
  return (
    <section className="bg-background py-24 lg:py-32 relative overflow-hidden border-y border-border/50">
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-black tracking-tighter text-foreground sm:text-6xl lg:text-7xl text-balance uppercase">
            Validated by <span className="text-primary">Industry Leaders</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground font-medium max-w-3xl mx-auto">
            Real impact, proven on active construction and industrial sites worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card hover:-translate-y-2 shadow-2xl"
            >
              <CardContent className="pt-16 pb-10 px-8 relative">
                <Quote className="absolute top-8 left-8 h-10 w-10 text-primary/10 fill-current" />
                <p className="text-xl text-foreground font-medium leading-relaxed mb-10 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-5 border-t border-border/50 pt-8">
                  <Avatar className="h-14 w-14 rounded-2xl ring-2 ring-primary/20">
                    <AvatarImage src={t.avatar} className="object-cover" />
                    <AvatarFallback className="rounded-2xl bg-primary/10 text-primary font-black">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-black text-foreground uppercase tracking-tight text-lg">{t.author}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">
                      {t.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
