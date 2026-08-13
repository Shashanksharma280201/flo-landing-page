const features = [
  {
    title: 'Cloud-Based',
    titleHighlight: 'Platform',
    description:
      'Access your fleet control centre from anywhere with our secure cloud infrastructure. No VPN or on-prem setup required.',
  },
  {
    title: 'Remote',
    titleHighlight: 'Teleoperation',
    description:
      'Take direct control of any robot in your fleet with low-latency video feeds and real-time control links.',
  },
  {
    title: 'Dynamic Resource',
    titleHighlight: 'Allocation',
    description:
      'Automatically distribute tasks across your fleet based on robot availability, battery level, and proximity.',
  },
  {
    title: 'Multi-User',
    titleHighlight: 'Access',
    description:
      'Role-based access control for operators, managers, and admins, with a full audit trail of every action.',
  },
  {
    title: 'Real-Time',
    titleHighlight: 'Monitoring',
    description:
      'Continuous health checks and status reporting for every hardware and software component in your fleet.',
  },
  {
    title: 'Enterprise',
    titleHighlight: 'Security',
    description:
      'End-to-end encryption, secure authentication, and SOC 2 compliance to protect your operational data.',
  },
];

export function FleetControlFeatures() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-gradient-to-b from-gray-300 to-white py-24 lg:py-32 xl:py-40"
    >
      {/* Ambient background effects */}
      <div className="pointer-events-none absolute top-1/4 left-0 h-[700px] w-[700px] rounded-full bg-[#7ccd54]/5 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section header */}
        <div className="mx-auto mb-20 max-w-5xl text-center lg:mb-28">
          {/* <h3 className="text-lg lg:text-xl font-semibold text-[#000000] mb-6 uppercase tracking-wider">
            Software Capabilities
          </h3> */}
          <h2
            className="mb-8 text-5xl leading-[1.15] font-medium tracking-tight text-balance break-words text-gray-900 lg:text-6xl xl:text-7xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Built for fleets of{' '}
            <span className="inline [box-decoration-break:clone] text-[#7ccd54] [-webkit-box-decoration-break:clone]">
              any size.
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
            Our software stack gives operations teams the tools they need to run
            large-scale autonomous deployments without adding headcount.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative flex flex-col rounded-xl bg-gray-300 p-10 transition-all duration-300 hover:-translate-y-1 lg:p-12"
            >
              {/* Title */}
              <h3
                className="mb-6 w-full text-2xl leading-[1.18] font-semibold text-balance break-words lg:text-3xl xl:text-4xl"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                <span className="text-gray-900">{feature.title} </span>
                <span className="inline [box-decoration-break:clone] text-[#549c30] [-webkit-box-decoration-break:clone]">
                  {feature.titleHighlight}
                </span>
              </h3>

              {/* Description */}
              <p className="flex-1 text-base leading-relaxed text-gray-600 lg:text-lg">
                {feature.description}
              </p>

              {/* Hover gradient effect */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#7ccd54]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
