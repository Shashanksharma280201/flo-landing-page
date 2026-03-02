import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    title: "Call or WhatsApp",
    value: "+91 8446614346",
    href: "https://wa.me/918446614346",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "contact@flomobility.com",
    href: "mailto:contact@flomobility.com",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "HSR Layout, Bengaluru, Karnataka, India",
    href: "https://maps.google.com/?q=HSR+Layout,+Bengaluru,+India",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-12 lg:pr-12">
      <div className="space-y-6">
        <div className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-bold uppercase tracking-widest text-primary border border-primary/20">
          Contact
        </div>
        <h2 className="text-4xl font-black tracking-tighter text-foreground sm:text-6xl uppercase">
          Get in touch <br />
          <span className="text-primary">with us</span>
        </h2>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
          Whether you have questions about our autonomous solutions or want to
          discuss a potential partnership, our team is ready to help.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        {contactDetails.map((detail) => (
          <a
            key={detail.title}
            href={detail.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-6 p-8 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:bg-card/80 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(124,205,84,0.1)] hover:-translate-y-1"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-500 group-hover:bg-primary group-hover:text-background group-hover:rotate-6">
              <detail.icon className="h-8 w-8 text-primary transition-colors group-hover:text-background" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">
                {detail.title}
              </h3>
              <p className="text-lg text-muted-foreground transition-colors group-hover:text-foreground font-medium">
                {detail.value}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
