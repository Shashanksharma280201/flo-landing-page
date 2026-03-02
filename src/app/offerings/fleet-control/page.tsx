import { FleetControlHero } from "@/components/sections/fleet-control/hero";
import { FleetControlShowcase } from "@/components/sections/fleet-control/showcase";
import { FleetControlFeatures } from "@/components/sections/fleet-control/features";
import { FleetControlCTA } from "@/components/sections/fleet-control/cta";

export const metadata = {
  title: "Fleet Control | Flo Mobility",
  description:
    "Centralised interface for seamless coordination, monitoring, and management of your entire robotic fleet.",
};

export default function FleetControlPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero — dark forest green, 2-col, dashboard mockup */}
      <FleetControlHero />
      {/* 2. Showcase — cream, 2 alternating video + text sections */}
      <FleetControlShowcase />
      {/* 3. Features — white, 6 numbered capability cards */}
      <FleetControlFeatures />
      {/* 4. CTA — dark, trust items + demo request */}
      <FleetControlCTA />
    </div>
  );
}
