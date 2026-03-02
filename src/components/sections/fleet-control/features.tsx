import { Cloud, Radio, Settings, Users, Monitor, Shield } from "lucide-react";

const features = [
  {
    title: "Cloud-Based Platform",
    description:
      "Access your fleet control centre from anywhere with our secure cloud infrastructure — no VPN or on-prem setup required.",
    icon: Cloud,
  },
  {
    title: "Remote Teleoperation",
    description:
      "Take direct control of any robot in your fleet with low-latency video feeds and real-time control links.",
    icon: Radio,
  },
  {
    title: "Dynamic Resource Allocation",
    description:
      "Automatically distribute tasks across your fleet based on robot availability, battery level, and proximity.",
    icon: Settings,
  },
  {
    title: "Multi-User Access",
    description:
      "Role-based access control for operators, managers, and admins — with a full audit trail of every action.",
    icon: Users,
  },
  {
    title: "Real-Time Monitoring",
    description:
      "Continuous health checks and status reporting for every hardware and software component in your fleet.",
    icon: Monitor,
  },
  {
    title: "Enterprise Security",
    description:
      "End-to-end encryption, secure authentication, and SOC 2 compliance to protect your operational data.",
    icon: Shield,
  },
];

export function FleetControlFeatures() {
  return (
    <section id="features" className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block rounded-full bg-[#fdfcf0] px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
            Software Capabilities
          </div>
          <h2
            className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-4 text-balance"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Built for fleets of any size.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our software stack gives operations teams the tools they need to run
            large-scale autonomous deployments without adding headcount.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="flex flex-col p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#7ccd54]/30 transition-all duration-200"
            >
              <span
                className="text-xs font-semibold text-[#7ccd54]/60 block mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0faf0] mb-5">
                <feature.icon className="h-5 w-5 text-[#7ccd54]" />
              </div>
              <h3
                className="text-base font-semibold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
