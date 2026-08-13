import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const contactDetails = [
  {
    icon: Phone,
    title: 'Call or WhatsApp',
    links: [{ value: '+91 6393569079', href: 'https://wa.me/916393569079' }],
  },
  {
    icon: Mail,
    title: 'Email Us',
    links: [{ value: 'contact@flomobility.com', href: 'mailto:contact@flomobility.com' }],
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    links: [
      {
        value: 'HSR Layout, Bengaluru, Karnataka, India',
        href: 'https://maps.google.com/?q=HSR+Layout,+Bengaluru,+India',
      },
    ],
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-12 lg:pr-12">
      <div className="space-y-6">
        <div className="bg-primary/10 text-primary border-primary/20 inline-block rounded-full border px-4 py-1 text-sm font-bold tracking-widest uppercase">
          Contact
        </div>
        <h2 className="text-foreground text-4xl leading-[1.15] font-black tracking-tighter text-balance break-words uppercase sm:text-6xl">
          Get in touch <br />
          <span className="text-primary inline [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
            with us
          </span>
        </h2>
        <p className="text-muted-foreground max-w-xl text-xl leading-relaxed">
          Whether you have questions about our autonomous solutions or want to discuss a
          potential partnership, our team is ready to help.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        {contactDetails.map((detail) => (
          <div
            key={detail.title}
            className="group border-border/50 bg-card/30 hover:bg-card/80 hover:border-primary/30 flex items-start gap-6 rounded-3xl border p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(124,205,84,0.1)]"
          >
            <div className="bg-primary/10 group-hover:bg-primary group-hover:text-background flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 group-hover:rotate-6">
              <detail.icon className="text-primary group-hover:text-background h-8 w-8 transition-colors" />
            </div>
            <div className="space-y-2">
              <h3 className="text-foreground text-lg font-black tracking-tight uppercase">
                {detail.title}
              </h3>
              <div className="flex flex-col gap-1">
                {detail.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground text-lg font-medium transition-colors"
                  >
                    {link.value}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
