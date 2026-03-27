import { Hero } from "@/components/sections/hero";
import { CustomersSection } from "@/components/sections/customers-section";
import { StatsSection } from "@/components/sections/stats-section";
import { RaasSection } from "@/components/sections/raas-section";
import { CaseStudySection } from "@/components/sections/case-study-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <CustomersSection />
      <StatsSection />
      <RaasSection />
      <CaseStudySection />
      <TestimonialsSection />
    </main>
  );
}
