"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { MagicDotPattern } from "@/components/ui/magicui-dot-pattern";

const testimonials = [
  {
    quote:
      "Flo Mobility's autonomous robots have transformed our construction site operations. We've seen a 40% increase in productivity and significantly improved safety standards.",
    name: "Rajesh Kumar",
    title: "Project Manager, L&T Construction",
  },
  {
    quote:
      "The fleet control system is incredibly intuitive. Managing multiple robots across different sites has never been easier. This technology is a game-changer for the construction industry.",
    name: "Sarah Thompson",
    title: "Operations Director, Shapoorji Pallonji",
  },
  {
    quote:
      "We've reduced our material movement costs by 35% since implementing Flo's autonomous solutions. The ROI was evident within the first quarter itself.",
    name: "Amit Patel",
    title: "CEO, Buildtech Solutions",
  },
  {
    quote:
      "Their lawn maintenance robots have freed up our team to focus on more specialized tasks. The precision and reliability are outstanding.",
    name: "Maria Garcia",
    title: "Facilities Manager, Embassy Group",
  },
  {
    quote:
      "The customer support and ongoing innovation from Flo Mobility keeps us ahead of the competition. They're not just a vendor, they're a true partner in our growth.",
    name: "David Chen",
    title: "VP Operations, Prestige Group",
  },
  {
    quote:
      "From deployment to daily operations, the entire experience has been seamless. The autonomous robots integrate perfectly with our existing workflows.",
    name: "Priya Sharma",
    title: "Site Supervisor, Tata Projects",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative bg-transparent py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Static dot pattern — full coverage, radial fade from center */}
      <MagicDotPattern
        width={32}
        height={32}
        cr={1.2}
        className="text-[#7ccd54]/[0.40] [mask-image:radial-gradient(ellipse_90%_80%_at_50%_50%,#000_40%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <div className="inline-block rounded-full bg-[#fdfcf0] px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-700 mb-4 sm:mb-6 border border-[#7ccd54]/20 uppercase shadow-sm">
            Testimonials
          </div>
          <h2
            className="text-2xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-3 sm:mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by industry leaders who are transforming their operations with autonomous robotics
          </p>
        </div>

        {/* Moving Cards */}
        <div className="relative">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
