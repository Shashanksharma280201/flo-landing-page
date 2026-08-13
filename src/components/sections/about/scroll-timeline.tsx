'use client';

import { useEffect, useRef, useState } from 'react';
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

function TimelineItem({
  milestone,
  index,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
}) {
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
        rootMargin: '0px 0px -100px 0px',
      },
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
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="group relative aspect-video overflow-hidden rounded-xl shadow-lg">
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
      </div>

      {/* Connector line */}
      {index < MILESTONES.length - 1 && (
        <div className="absolute top-full left-8 h-16 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#7ccd54]/50 to-transparent lg:left-1/2 lg:h-24" />
      )}

      {/* Dot indicator */}
      <div className="absolute top-0 left-8 -translate-x-1/2 -translate-y-1/2 lg:left-1/2">
        <div
          className={`h-4 w-4 rounded-full transition-all duration-500 ${
            isVisible
              ? 'scale-100 bg-[#7ccd54] ring-4 ring-[#7ccd54]/20'
              : 'scale-75 bg-gray-300'
          }`}
        />
      </div>
    </div>
  );
}

export function ScrollTimeline() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 lg:py-32">
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
        <div className="relative mx-auto max-w-6xl">
          {/* Vertical line on left (mobile) and center (desktop) */}
          <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-transparent via-gray-200 to-transparent lg:left-1/2 lg:-translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-16 pl-16 lg:space-y-24 lg:pl-0">
            {MILESTONES.map((milestone, index) => (
              <TimelineItem key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
