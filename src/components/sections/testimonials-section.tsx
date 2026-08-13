'use client';

const testimonials = [
  {
    quote:
      "Flo Mobility's autonomous robots have transformed our construction site operations. We've seen a 40% increase in productivity and significantly improved safety standards.",
    name: 'Rajesh Kumar',
    title: 'Project Manager, L&T Construction',
  },
  {
    quote:
      'The fleet control system is incredibly intuitive. Managing multiple robots across different sites has never been easier. This technology is a game-changer for the construction industry.',
    name: 'Sarah Thompson',
    title: 'Operations Director, Shapoorji Pallonji',
  },
  {
    quote:
      "We've reduced our material movement costs by 35% since implementing Flo's autonomous solutions. The ROI was evident within the first quarter itself.",
    name: 'Amit Patel',
    title: 'CEO, Buildtech Solutions',
  },
  {
    quote:
      'Their lawn maintenance robots have freed up our team to focus on more specialized tasks. The precision and reliability are outstanding.',
    name: 'Maria Garcia',
    title: 'Facilities Manager, Embassy Group',
  },
  {
    quote:
      "The customer support and ongoing innovation from Flo Mobility keeps us ahead of the competition. They're not just a vendor, they're a true partner in our growth.",
    name: 'David Chen',
    title: 'VP Operations, Prestige Group',
  },
  {
    quote:
      'From deployment to daily operations, the entire experience has been seamless. The autonomous robots integrate perfectly with our existing workflows.',
    name: 'Priya Sharma',
    title: 'Site Supervisor, Tata Projects',
  },
];

const TESTIMONIALS = [...testimonials, ...testimonials, ...testimonials];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      <div className="w-full">
        <div className="mb-5 text-center sm:mb-6 lg:mb-8">
          <div className="inline-block">
            <span
              className="font-bold tracking-[0.22em] text-black uppercase"
              style={{ fontSize: 'clamp(1.65rem, 3vw + 1rem, 2rem)' }}
            >
              What Our customers Say
            </span>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex items-stretch gap-4 py-0 whitespace-nowrap sm:gap-5">
            {TESTIMONIALS.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="flex w-88 shrink-0 flex-col justify-between rounded-2xl border border-neutral-200 bg-white px-6 py-5 shadow-sm sm:w-104"
              >
                <p className="text-[0.95rem] leading-7 whitespace-normal text-gray-700">
                  {item.quote}
                </p>
                <div className="mt-5 whitespace-normal">
                  <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-[#5ba83d]">{item.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
