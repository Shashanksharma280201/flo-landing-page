import { Hero } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats-section";
import { RaasSection } from "@/components/sections/raas-section";
import { MmrSection } from "@/components/sections/mmr-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { LogoShowcase } from "@/components/sections/logo-showcase";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <StatsSection />
      <MmrSection />
      <RaasSection />
      <GallerySection />
      <LogoShowcase />
      <TestimonialsSection />
    </main>
  );
}
