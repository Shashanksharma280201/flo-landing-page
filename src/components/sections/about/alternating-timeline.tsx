'use client';

import Image from 'next/image';

const MILESTONES = [
  {
    year: '2020',
    title: 'Company Founded',
    description:
      'Flo Mobility established with a vision to revolutionize autonomous robotics for industrial applications.',
    image: '/about/showcase.avif',
  },
  {
    year: '2020',
    title: 'First Prototype',
    description:
      'Developed the initial prototype of our autonomous material handling robot with core navigation systems.',
    image: '/about/g20.avif',
  },
  {
    year: '2021',
    title: 'Seed Funding Round',
    description:
      'Secured seed funding to accelerate product development and expand the engineering team.',
    image: '/about/showcase.avif',
  },
  {
    year: '2021',
    title: 'Product Testing Phase',
    description:
      'Conducted extensive field testing across construction sites and industrial facilities.',
    image: '/about/g20.avif',
  },
  {
    year: '2022',
    title: 'First Commercial Deployment',
    description:
      'Successfully deployed our first autonomous robot at a major construction site.',
    image: '/about/showcase.avif',
  },
  {
    year: '2022',
    title: 'Lawn Maintenance Robot Launch',
    description:
      'Introduced autonomous lawn maintenance solution for golf courses and large estates.',
    image: '/about/g20.avif',
  },
  {
    year: '2022',
    title: 'Series A Funding',
    description: 'Raised Series A to scale operations and expand product portfolio.',
    image: '/about/showcase.avif',
  },
  {
    year: '2023',
    title: 'G20 Summit Showcase',
    description:
      'Demonstrated our technology at the G20 Summit in Gandhinagar, gaining international recognition.',
    image: '/about/g20.avif',
  },
  {
    year: '2023',
    title: '100+ Deployments Milestone',
    description:
      'Reached a major milestone with over 100 robots deployed across various industries.',
    image: '/about/showcase.avif',
  },
  {
    year: '2023',
    title: 'Fleet Control Platform Launch',
    description:
      'Released cloud-based fleet management platform for enterprise customers.',
    image: '/about/g20.avif',
  },
  {
    year: '2024',
    title: 'Channel Partner Network',
    description:
      'Established strategic partnerships to expand regional presence and market reach.',
    image: '/about/showcase.avif',
  },
  {
    year: '2024',
    title: 'AI Navigation Upgrade',
    description:
      'Implemented advanced AI-powered navigation and obstacle avoidance systems.',
    image: '/about/g20.avif',
  },
  {
    year: '2024',
    title: 'Enterprise Expansion',
    description:
      'Expanded into mining and heavy industrial sectors with specialized solutions.',
    image: '/about/showcase.avif',
  },
  {
    year: '2025',
    title: '200+ Sites Deployed',
    description: 'Achieved 200+ active deployment sites across three industry verticals.',
    image: '/about/g20.avif',
  },
  {
    year: '2025',
    title: 'Next Generation Platform',
    description:
      'Developing next-gen autonomous systems with enhanced AI and connectivity features.',
    image: '/about/showcase.avif',
  },
];

export function AlternatingTimeline() {
  return (
    <section className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="relative w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section header */}
        <div className="mx-auto mb-20 max-w-5xl text-center lg:mb-28">
          <h2
            className="mb-8 text-5xl leading-[1.15] font-medium tracking-tight text-balance break-words text-gray-900 lg:text-6xl xl:text-7xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Our{' '}
            <span className="inline [box-decoration-break:clone] text-[#7ccd54] [-webkit-box-decoration-break:clone]">
              Journey
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
            From inception to innovation, the milestones that shaped Flo Mobility.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-7xl">
          {/* Center line */}
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 bg-gradient-to-b from-[#7ccd54] via-gray-200 to-[#7ccd54] lg:block" />

          {/* Milestones */}
          <div className="space-y-16 lg:space-y-24">
            {MILESTONES.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16`}
                >
                  {/* Left side */}
                  <div className={`${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                    {isLeft ? (
                      // Content on left
                      <div className={`lg:pr-12 lg:text-right`}>
                        <div className="inline-block lg:block">
                          <span
                            className="mb-4 inline-block rounded-full bg-[#7ccd54]/10 px-4 py-1.5 text-sm font-semibold text-[#7ccd54]"
                            style={{ fontFamily: 'var(--font-space-grotesk)' }}
                          >
                            {milestone.year}
                          </span>
                        </div>
                        <h3
                          className="mb-4 text-2xl leading-tight font-semibold text-gray-900 lg:text-3xl xl:text-4xl"
                          style={{ fontFamily: 'var(--font-space-grotesk)' }}
                        >
                          {milestone.title}
                        </h3>
                        <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
                          {milestone.description}
                        </p>
                      </div>
                    ) : (
                      // Image on left
                      <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
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
                  <div className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
                    <div className="h-5 w-5 rounded-full bg-[#7ccd54] shadow-lg ring-4 ring-white" />
                  </div>

                  {/* Right side */}
                  <div className={`${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                    {isLeft ? (
                      // Image on right
                      <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
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
                            className="mb-4 inline-block rounded-full bg-[#7ccd54]/10 px-4 py-1.5 text-sm font-semibold text-[#7ccd54]"
                            style={{ fontFamily: 'var(--font-space-grotesk)' }}
                          >
                            {milestone.year}
                          </span>
                        </div>
                        <h3
                          className="mb-4 text-2xl leading-tight font-semibold text-gray-900 lg:text-3xl xl:text-4xl"
                          style={{ fontFamily: 'var(--font-space-grotesk)' }}
                        >
                          {milestone.title}
                        </h3>
                        <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
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
