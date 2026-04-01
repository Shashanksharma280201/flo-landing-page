"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const MILESTONES = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Flo Mobility established with a vision to revolutionize autonomous robotics for industrial applications.",
    image: "/about/showcase.jpg",
  },
  {
    year: "2020",
    title: "First Prototype",
    description: "Developed the initial prototype of our autonomous material handling robot with core navigation systems.",
    image: "/about/g20.jpg",
  },
  {
    year: "2021",
    title: "Seed Funding Round",
    description: "Secured seed funding to accelerate product development and expand the engineering team.",
    image: "/about/showcase.jpg",
  },
  {
    year: "2021",
    title: "Product Testing Phase",
    description: "Conducted extensive field testing across construction sites and industrial facilities.",
    image: "/about/g20.jpg",
  },
  {
    year: "2022",
    title: "First Commercial Deployment",
    description: "Successfully deployed our first autonomous robot at a major construction site.",
    image: "/about/showcase.jpg",
  },
  {
    year: "2022",
    title: "Lawn Maintenance Robot Launch",
    description: "Introduced autonomous lawn maintenance solution for golf courses and large estates.",
    image: "/about/g20.jpg",
  },
  {
    year: "2022",
    title: "Series A Funding",
    description: "Raised Series A to scale operations and expand product portfolio.",
    image: "/about/showcase.jpg",
  },
  {
    year: "2023",
    title: "G20 Summit Showcase",
    description: "Demonstrated our technology at the G20 Summit in Gandhinagar, gaining international recognition.",
    image: "/about/g20.jpg",
  },
  {
    year: "2023",
    title: "100+ Deployments Milestone",
    description: "Reached a major milestone with over 100 robots deployed across various industries.",
    image: "/about/showcase.jpg",
  },
  {
    year: "2023",
    title: "Fleet Control Platform Launch",
    description: "Released cloud-based fleet management platform for enterprise customers.",
    image: "/about/g20.jpg",
  },
  {
    year: "2024",
    title: "Channel Partner Network",
    description: "Established strategic partnerships to expand regional presence and market reach.",
    image: "/about/showcase.jpg",
  },
  {
    year: "2024",
    title: "AI Navigation Upgrade",
    description: "Implemented advanced AI-powered navigation and obstacle avoidance systems.",
    image: "/about/g20.jpg",
  },
  {
    year: "2024",
    title: "Enterprise Expansion",
    description: "Expanded into mining and heavy industrial sectors with specialized solutions.",
    image: "/about/showcase.jpg",
  },
  {
    year: "2025",
    title: "200+ Sites Deployed",
    description: "Achieved 200+ active deployment sites across three industry verticals.",
    image: "/about/g20.jpg",
  },
  {
    year: "2025",
    title: "Next Generation Platform",
    description: "Developing next-gen autonomous systems with enhanced AI and connectivity features.",
    image: "/about/showcase.jpg",
  },
];

function TimelineItem({ milestone, index }: { milestone: typeof MILESTONES[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image */}
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg group">
          <Image
            src={milestone.image}
            alt={milestone.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div>
          <div className="inline-block">
            <span
              className="inline-block px-4 py-1.5 rounded-full bg-[#7ccd54]/10 text-[#7ccd54] font-semibold text-sm mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {milestone.year}
            </span>
          </div>
          <h3
            className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-900 mb-4 leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {milestone.title}
          </h3>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
            {milestone.description}
          </p>
        </div>
      </div>

      {/* Connector line */}
      {index < MILESTONES.length - 1 && (
        <div className="absolute left-8 lg:left-1/2 top-full h-16 lg:h-24 w-0.5 bg-gradient-to-b from-[#7ccd54]/50 to-transparent -translate-x-1/2" />
      )}

      {/* Dot indicator */}
      <div className="absolute left-8 lg:left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`w-4 h-4 rounded-full transition-all duration-500 ${
            isVisible
              ? "bg-[#7ccd54] scale-100 ring-4 ring-[#7ccd54]/20"
              : "bg-gray-300 scale-75"
          }`}
        />
      </div>
    </div>
  );
}

export function ScrollTimeline() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24 lg:py-32 overflow-hidden">
      <div className="relative w-full px-6 sm:px-8 lg:px-16 xl:px-24">

        {/* Section header */}
        <div className="text-center mb-20 lg:mb-28 max-w-5xl mx-auto">
          <h2
            className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-gray-900 mb-8 leading-[1.1]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Our <span className="text-[#7ccd54]">Journey</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            From inception to innovation — the milestones that shaped Flo Mobility.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Vertical line on left (mobile) and center (desktop) */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-200 to-transparent lg:-translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-16 lg:space-y-24 pl-16 lg:pl-0">
            {MILESTONES.map((milestone, index) => (
              <TimelineItem key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
