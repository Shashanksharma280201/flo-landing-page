import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "How difficult is it to integrate Flo's robots into an existing site?",
    answer:
      "Our robots are designed for 'Plug-and-Play' deployment. Our team handles the initial site mapping, and usually, the robots are fully operational within 48 hours without needing any changes to your infrastructure.",
  },
  {
    question: 'What safety mechanisms are in place?',
    answer:
      'Safety is our priority. Every robot is equipped with LiDAR and Camera fusion for 360-degree obstacle detection, emergency stop triggers, and failsafe protocols that immediately halt the machine if a path is obstructed.',
  },
  {
    question: "How does the 'Robots as a Service' (RaaS) subscription work?",
    answer:
      "RaaS allows you to avoid high upfront capital expenditures. You pay a monthly fee that covers the robot, ongoing software updates, remote monitoring, and maintenance. It's fully scalable to your project needs.",
  },
  {
    question: 'Can the robots operate in harsh weather conditions?',
    answer:
      'Yes, our hardware is IP65 rated and designed for all-terrain usage, handling dust, light rain, and uneven surfaces common in construction and mining environments.',
  },
];

export function FAQ() {
  return (
    <section className="bg-background relative overflow-hidden py-24 lg:py-32">
      <div className="bg-primary/5 absolute top-0 right-0 h-[30%] w-[30%] rounded-full blur-[100px]" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="text-foreground text-4xl leading-[1.15] font-black tracking-tighter text-balance break-words uppercase sm:text-6xl lg:text-7xl">
            Common{' '}
            <span className="text-primary inline [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              Questions
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-xl font-medium">
            Everything you need to know about deploying autonomous systems.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-6">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-border/50 bg-card/30 hover:bg-card/50 hover:border-primary/20 rounded-2xl border px-8 backdrop-blur-sm transition-all"
            >
              <AccordionTrigger className="text-foreground hover:text-primary py-8 text-left text-lg font-bold tracking-tight uppercase hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-8 text-lg leading-relaxed font-medium">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
