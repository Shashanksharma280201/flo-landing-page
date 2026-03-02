import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How difficult is it to integrate Flo's robots into an existing site?",
    answer: "Our robots are designed for 'Plug-and-Play' deployment. Our team handles the initial site mapping, and usually, the robots are fully operational within 48 hours without needing any changes to your infrastructure.",
  },
  {
    question: "What safety mechanisms are in place?",
    answer: "Safety is our priority. Every robot is equipped with LiDAR and Camera fusion for 360-degree obstacle detection, emergency stop triggers, and failsafe protocols that immediately halt the machine if a path is obstructed.",
  },
  {
    question: "How does the 'Robots as a Service' (RaaS) subscription work?",
    answer: "RaaS allows you to avoid high upfront capital expenditures. You pay a monthly fee that covers the robot, ongoing software updates, remote monitoring, and maintenance. It's fully scalable to your project needs.",
  },
  {
    question: "Can the robots operate in harsh weather conditions?",
    answer: "Yes, our hardware is IP65 rated and designed for all-terrain usage, handling dust, light rain, and uneven surfaces common in construction and mining environments.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-black tracking-tighter text-foreground sm:text-6xl lg:text-7xl text-balance uppercase">
            Common <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Everything you need to know about deploying autonomous systems.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-6">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border/50 px-8 bg-card/30 backdrop-blur-sm rounded-2xl transition-all hover:bg-card/50 hover:border-primary/20">
              <AccordionTrigger className="text-left text-lg font-bold text-foreground hover:text-primary hover:no-underline py-8 uppercase tracking-tight">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-lg font-medium leading-relaxed pb-8">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
