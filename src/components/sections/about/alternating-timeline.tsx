"use client";

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

export function AlternatingTimeline() {
  return (
    <section className="bg-white py-24 lg:py-32 overflow-hidden">
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
        <div className="relative max-w-7xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7ccd54] via-gray-200 to-[#7ccd54] hidden lg:block" />

          {/* Milestones */}
          <div className="space-y-16 lg:space-y-24">
            {MILESTONES.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center`}
                >
                  {/* Left side */}
                  <div className={`${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                    {isLeft ? (
                      // Content on left
                      <div className={`lg:text-right lg:pr-12`}>
                        <div className="inline-block lg:block">
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
                    ) : (
                      // Image on left
                      <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Center dot (desktop only) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block z-10">
                    <div className="w-5 h-5 rounded-full bg-[#7ccd54] ring-4 ring-white shadow-lg" />
                  </div>

                  {/* Right side */}
                  <div className={`${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                    {isLeft ? (
                      // Image on right
                      <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      // Content on right
                      <div className={`lg:pl-12`}>
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
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
