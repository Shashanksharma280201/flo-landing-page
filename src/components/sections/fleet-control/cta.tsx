import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const TRUST_ITEMS = [
  "No credit card required",
  "Setup in minutes",
  "Cancel anytime",
];

export function FleetControlCTA() {
  return (
    <section className="bg-[#1a3a1f] py-20 lg:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(124,205,84,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[#7ccd54]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
        <div className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] mb-8 border border-[#7ccd54]/20 uppercase">
          Now available worldwide
        </div>
        <h2
          className="text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl text-balance mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Experience the future of fleet management.
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto">
          Request a personalised demo to see how Flo Fleet Control can transform
          your autonomous operations.
        </p>

        {/* Trust items */}
        <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2 text-gray-400 text-sm">
              <CheckCircle className="w-4 h-4 text-[#7ccd54] shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7ccd54] text-gray-900 font-semibold hover:bg-[#5ba83d] transition-colors duration-200"
          >
            Request a Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/offerings/material-movement"
            className="px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors duration-200"
          >
            Explore Robots
          </Link>
        </div>
      </div>
    </section>
  );
}
