const features = [
  {
    title: "Cloud-Based",
    titleHighlight: "Platform",
    description:
      "Access your fleet control centre from anywhere with our secure cloud infrastructure — no VPN or on-prem setup required.",
  },
  {
    title: "Remote",
    titleHighlight: "Teleoperation",
    description:
      "Take direct control of any robot in your fleet with low-latency video feeds and real-time control links.",
  },
  {
    title: "Dynamic Resource",
    titleHighlight: "Allocation",
    description:
      "Automatically distribute tasks across your fleet based on robot availability, battery level, and proximity.",
  },
  {
    title: "Multi-User",
    titleHighlight: "Access",
    description:
      "Role-based access control for operators, managers, and admins — with a full audit trail of every action.",
  },
  {
    title: "Real-Time",
    titleHighlight: "Monitoring",
    description:
      "Continuous health checks and status reporting for every hardware and software component in your fleet.",
  },
  {
    title: "Enterprise",
    titleHighlight: "Security",
    description:
      "End-to-end encryption, secure authentication, and SOC 2 compliance to protect your operational data.",
  },
];

export function FleetControlFeatures() {
  return (
    <section id="features" className="relative bg-gradient-to-b from-gray-300 to-white py-24 lg:py-32 xl:py-40 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-1/4 left-0 w-[700px] h-[700px] bg-[#7ccd54]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full px-6 sm:px-8 lg:px-12 xl:px-16">

        {/* Section header */}
        <div className="text-center mb-20 lg:mb-28 max-w-5xl mx-auto">
          {/* <h3 className="text-lg lg:text-xl font-semibold text-[#000000] mb-6 uppercase tracking-wider">
            Software Capabilities
          </h3> */}
          <h2
            className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-gray-900 mb-8 leading-[1.1]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Built for fleets of{" "}
            <span className="text-[#7ccd54]">any size.</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our software stack gives operations teams the tools they need to run
            large-scale autonomous deployments without adding headcount.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-[1600px] mx-auto">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative flex flex-col p-10 lg:p-12 rounded-xl bg-gray-300 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Title */}
              <h3
                className="text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 leading-tight w-full"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <span className="text-gray-900">{feature.title} </span>
                <span className="text-[#549c30]">{feature.titleHighlight}</span>
              </h3>

              {/* Description */}
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed flex-1">
                {feature.description}
              </p>

              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7ccd54]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
