import { Hero } from "@/components/sections/hero";
import { CustomersSection } from "@/components/sections/customers-section";
import { StatsSection } from "@/components/sections/stats-section";
import { RaasSection } from "@/components/sections/raas-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <StatsSection />
      <RaasSection />
      <TestimonialsSection />
      <CustomersSection />
    </main>
  );
}
