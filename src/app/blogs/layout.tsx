"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// Lazy load the heavy animation component
const WavyBackground = dynamic(
  () => import("@/components/ui/wavy-background").then((mod) => mod.WavyBackground),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-[#FEFDFB] -z-10" />
  }
);

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // We can vary the speed or opacity based on whether we are on a post or the index
  const isPostPage = pathname.split("/").length > 2;

  return (
    <div className="relative min-h-screen">
      {/* Persistent Background Layer */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <WavyBackground 
          containerClassName="h-full w-full"
          className="opacity-40"
          blur={10}
          speed={isPostPage ? "slow" : "fast"}
          waveOpacity={0.2}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}
