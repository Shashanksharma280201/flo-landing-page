import { LawnMaintenanceHero } from "@/components/sections/lawn-maintenance/hero";
import { LawnMaintenanceFeatures } from "@/components/sections/lawn-maintenance/features";
import { LawnMaintenanceMetrics } from "@/components/sections/lawn-maintenance/metrics";
import { LawnMaintenanceSpecs } from "@/components/sections/lawn-maintenance/specs";

export const metadata = {
  title: "Lawn Maintenance | Flo Mobility",
  description:
    "Autonomous lawn maintenance solutions powered by precision robotics and electric power trains.",
};

export default function LawnMaintenancePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero — dark forest green, 2-col, video thumbnail */}
      <LawnMaintenanceHero />
      {/* 2. Capabilities — cream, 6 numbered feature cards */}
      <LawnMaintenanceFeatures />
      {/* 3. Tech Specs — white, two clean numbered tables */}
      <LawnMaintenanceMetrics />
      {/* 4. Build Quality + CTA — cream stat visual + dark CTA */}
      <LawnMaintenanceSpecs />
    </div>
  );
}
