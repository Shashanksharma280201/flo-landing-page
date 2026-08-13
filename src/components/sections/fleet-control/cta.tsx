import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

const TRUST_ITEMS = ['No credit card required', 'Setup in minutes', 'Cancel anytime'];

export function FleetControlCTA() {
  return (
    <section className="relative overflow-hidden bg-[#1a3a1f] py-20 lg:py-28">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(124,205,84,0.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[200px] w-[700px] -translate-x-1/2 rounded-full bg-[#7ccd54]/8 blur-[100px]" />

      <div className="relative z-10 container mx-auto max-w-3xl px-4 text-center">
        <div className="mb-8 inline-block rounded-full border border-[#7ccd54]/20 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] uppercase">
          Now available worldwide
        </div>
        <h2
          className="mb-6 text-3xl font-medium tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Experience the future of fleet management.
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-gray-300">
          Request a personalised demo to see how Flo Fleet Control can transform your
          autonomous operations.
        </p>

        {/* Trust items */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-5">
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle className="h-4 w-4 shrink-0 text-[#7ccd54]" />
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#7ccd54] px-7 py-3.5 font-semibold text-gray-900 transition-colors duration-200 hover:bg-[#5ba83d]"
          >
            Request a Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/offerings/material-movement"
            className="rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-white/5"
          >
            Explore Robots
          </Link>
        </div>
      </div>
    </section>
  );
}
