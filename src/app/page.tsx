import { HeroWithScroll } from "@/components/hero-with-scroll";
import { CustomersSection } from "@/components/sections/customers-section";
import { StatsSection } from "@/components/sections/stats-section";
import { RaasSection } from "@/components/sections/raas-section";
import { CaseStudySection } from "@/components/sections/case-study-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <main className="flex flex-col bg-white">
      <HeroWithScroll />
      <StatsSection />
      <RaasSection />
      {/* <CaseStudySection /> */}
      <CustomersSection />
      {/* <TestimonialsSection /> */}
    </main>
  );
}
