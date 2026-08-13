import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Flo's autonomous material movement has completely changed our site logistics. We've seen a 6x increase in turnaround time without adding any extra headcount.",
    author: 'Rajesh Kumar',
    role: 'Project Director, Sobha Ltd.',
    avatar: '/avatars/rajesh.jpg',
    initials: 'RK',
  },
  {
    quote:
      "The precision and reliability of their navigation systems are unmatched. It's not just a robot; it's a seamless part of our construction workflow.",
    author: "Sarah D'Souza",
    role: 'Operations Manager, L&T Construction',
    avatar: '/avatars/sarah.jpg',
    initials: 'SD',
  },
  {
    quote:
      'Reliability was our main concern, but Flo Mobility delivered. The swappable batteries mean we have zero downtime during peak hours.',
    author: 'Amit Shah',
    role: 'Site Engineer, Hitech Precast',
    avatar: '/avatars/amit.jpg',
    initials: 'AS',
  },
];

export function Testimonials() {
  return (
    <section className="bg-background border-border/50 relative overflow-hidden border-y py-24 lg:py-32">
      <div className="bg-primary/5 absolute bottom-0 left-0 h-[40%] w-[40%] rounded-full blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="text-foreground text-4xl leading-[1.15] font-black tracking-tighter text-balance break-words uppercase sm:text-6xl lg:text-7xl">
            Validated by{' '}
            <span className="text-primary inline [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              Industry Leaders
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-6 max-w-3xl text-xl font-medium">
            Real impact, proven on active construction and industrial sites worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card rounded-3xl border shadow-2xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2"
            >
              <CardContent className="relative px-8 pt-16 pb-10">
                <Quote className="text-primary/10 absolute top-8 left-8 h-10 w-10 fill-current" />
                <p className="text-foreground mb-10 text-xl leading-relaxed font-medium italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-border/50 flex items-center gap-5 border-t pt-8">
                  <Avatar className="ring-primary/20 h-14 w-14 rounded-2xl ring-2">
                    <AvatarImage src={t.avatar} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 text-primary rounded-2xl font-black">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-foreground text-lg font-black tracking-tight uppercase">
                      {t.author}
                    </div>
                    <div className="text-primary text-xs font-bold tracking-widest uppercase">
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
