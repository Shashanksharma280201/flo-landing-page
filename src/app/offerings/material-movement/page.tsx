import { MaterialMovementHero } from "@/components/sections/material-movement/hero";
import { MaterialMovementFeatures } from "@/components/sections/material-movement/features";
import { MaterialMovementProcess } from "@/components/sections/material-movement/process";
import { MaterialMovementSpecs } from "@/components/sections/material-movement/specs";

export default function MaterialMovementPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero — dark forest green, 2-col, video thumbnail */}
      <MaterialMovementHero />
      {/* 2. Capabilities — cream, 6 numbered feature cards */}
      <MaterialMovementFeatures />
      {/* 3. How It Works — dark, 3-step process + use cases split */}
      <MaterialMovementProcess />
      {/* 4. Tech Specs — white, divide-y list + video + CTA */}
      <MaterialMovementSpecs />
    </div>
  );
}
