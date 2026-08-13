export const NAV_CONFIG = {
  mainNav: [
    {
      title: "Offerings",
      items: [
        {
          title: "Material Movement",
          href: "/offerings/material-movement",
          description: "Autonomous solutions for moving goods efficiently.",
        },
        {
          title: "Lawn maintenance",
          href: "/offerings/lawn-maintenance",
          description: "Smart robotic systems for landscape management.",
        },
        {
          title: "Fleet Control",
          href: "/offerings/fleet-control",
          description: "Centralized management for your autonomous fleet.",
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          title: "About",
          href: "/about",
          description: "Learn more about our mission and the team behind flo.",
        },
        {
          title: "Blogs",
          href: "/blogs",
          description:
            "Insights and updates from the world of autonomous mobility.",
        },
      ],
    },
    {
      title: "Careers",
      href: "/careers",
    },
  ],
  actions: {
    fleet: "https://fleet.flomobility.com",
    contact: "/contact",
  },
};

export const HERO_CONTENT = {
  title: "Robots for Construction",
  subtitle: "Enabling contractors to build smarter, faster, and safer",
  cta: {
    primary: { text: "Explore Solutions", href: "#raas" },
  },
};

export const RAAS_CONTENT = {
  title: "Robots as a Service",
  subtitle:
    "We offer cutting edge robots on a flexible subscription basis, helping you automate material handling and wall finishing activities seamlessly integrating with existing workflows.",
  products: [
    {
      id: "material-movement",
      title: "Material Movement",
      description:
        "With advanced sensors and autonomous navigation, this efficient and adaptable robot streamlines logistics operations with speed and reliability. Experience optimized efficiency, reduced manual labor, and increased productivity with the Material Movement Bot.",
      videoId: "KMTNnYjulQE",
      image: "/mmr-images/mmr-images-1.webp",
    },
    {
      id: "lawn-mower",
      title: "Lawn Mower",
      description:
        "Our lawn mowing robot will take care of your lawn, so you can relax and enjoy your free time. Efficient and safe. The robot is equipped with sensors that prevent it from colliding with objects or getting stuck. The cost is less expensive than hiring a traditional lawn service.",
      videoId: "KMTNnYjulQE",
      image: "/mmr-images/mmr-images-2.webp",
    },
    {
      id: "wall-finishing",
      title: "Wall Finishing",
      description:
        "Our wall finishing robot is designed to automate the tasks of sanding and putty application on the walls. With precision movement, the robot not only brings uniformity and consistency in wall finishing, but also saves material wastage thereby reducing cost while delivering better quality finish.",
      videoId: "KMTNnYjulQE",
      image: "/mmr-images/mmr-images-3.webp",
    },
  ],
};

export const BELIEVERS = [
  { name: "JITO", logo: "/believers/JITO.png" },
  { name: "Lets Venture", logo: "/believers/Lets-Venture.png" },
  { name: "IISC", logo: "/believers/IISC.png" },
  { name: "Venture Garage", logo: "/believers/Venture-Garage.png" },
  { name: "DevX", logo: "/believers/DevX.png" },
  { name: "Blume", logo: "/believers/Blume.png" },
];

export const CUSTOMERS = [
  { name: "Everest carbon", logo: "/customers/Everest-carbon.png" },
  { name: "Sobha", logo: "/customers/Sobha.png" },
  { name: "Hitech", logo: "/customers/Hitech.png" },
  { name: "Emboss", logo: "/customers/Emboss.png" },
  { name: "Ati motors", logo: "/customers/Ati-motors.png" },
  { name: "Icar iihr", logo: "/customers/Icar-iihr.png" },
  { name: "Group 30", logo: "/customers/Group-30.png" },
  { name: "Total environment 2", logo: "/customers/Total-environment-2.png" },
  { name: "Hitech 1", logo: "/customers/Hitech-1.png" },
  { name: "Capacite", logo: "/customers/Capacite.png" },
  { name: "K2K infrastructure", logo: "/customers/K2K-infrastructure.png" },
  { name: "Kolte Patil", logo: "/customers/Kolte-Patil.png" },
  { name: "PSP Projects", logo: "/customers/PSP-Projects.png" },
  { name: "Nissan", logo: "/customers/nissan.png" },
  { name: "L&T", logo: "/customers/LT.png" },
];

export const JOBS = [
  {
    title: "Embedded Design Engineer",
    description: "Develop embedded firmware and CAN-based communication systems for autonomous robots.",
    location: "Bangalore",
    type: "Full Time",
    jdLink: "/docs/firmware-jd.pdf",
  },
  {
    title: "Operations Executive",
    description: "Lead operator onboarding, site logistics, and daily workflows to power material movement at major project sites.",
    location: "Bangalore",
    type: "Full Time",
    jdLink: "/docs/operations-executive-jd.pdf",
  },
  {
    title: "Business Development Manager",
    description: "Scaling robotic deployments through CXO partnerships and B2B sales excellence.",
    location: "Bangalore",
    type: "Full Time",
    jdLink: "/docs/business-development-jd.pdf",
  },
  {
    title: "Material Movement Robot Operator",
    description: "Operate robotic machinery and manage on-site material movement data via mobile applications.",
    location: "Bangalore",
    type: "Full Time",
    jdLink: "/docs/robot-operators-jd.pdf",
  },
];

export type MediaCategory = "press" | "video" | "event";

export type MediaItem = {
  id: string;
  title: string;
  outlet: string;
  /** ISO date — sorts the grid and feeds the NewsArticle/VideoObject schema. */
  date: string;
  /** Label shown on the card. Omit when the exact date isn't confirmed. */
  dateLabel?: string;
  description: string;
  category: MediaCategory;
  /** Exactly one item should be featured — it gets the large hero card. */
  featured?: boolean;
  url?: string;
  image?: string;
  /** YouTube ID — renders an inline player instead of a link. */
  videoId?: string;
  cta?: string;
};

export const MEDIA_COVERAGE: MediaItem[] = [
  {
    id: "yourstory-haul-materials",
    title: "Flo Mobility builds robots that haul construction materials. L&T and Godrej use them",
    outlet: "YourStory",
    date: "2026-07-01",
    dateLabel: "July 2026",
    description:
      "The Bengaluru-based startup's autonomous robot carries up to 1.5 tonnes across building sites. It raised $2.5 million in a pre-Series A round.",
    category: "press",
    featured: true,
    url: "https://yourstory.com/2026/07/flo-mobility-construction-robots",
    image: "/media-coverage/yourstory.avif",
  },
  {
    id: "builtworlds-robotics-top-50",
    title: "Flo Mobility named to the 2026 Robotics Top 50",
    outlet: "BuiltWorlds",
    date: "2026-07-08",
    dateLabel: "July 2026",
    description:
      "Listed under Material Transport for its electric autonomous material movers built for construction sites.",
    category: "press",
    url: "https://builtworlds.com/insights/2026-robotics-50/",
    image: "/media-coverage/builtworlds-robotics-top-50.avif",
    cta: "See the list",
  },
  {
    id: "economic-times-ai-innovators",
    title: "Mindful Construction Inc",
    outlet: "The Economic Times",
    date: "2026-02-01",
    dateLabel: "Feb 2026",
    description:
      "ET's NuE Trends on how AI-powered startups — Flo Mobility among them — are tackling labour shortages and speeding up construction's digital transformation.",
    category: "press",
    image: "/media-coverage/economic-times.avif",
  },
  {
    id: "construction-world-flow-not-move",
    title: "We're building robots that flow, not just move",
    outlet: "Construction World",
    date: "2025-07-01",
    dateLabel: "July 2025",
    description:
      "Founder Manesh Jain on Flo Mobility's origin, its LiDAR-free vision-AI stack, and expansion into the Middle East.",
    category: "press",
    url: "https://www.constructionworld.in/latest-construction-technology/we---re-building-robots-that-flow--not-just-move/75547",
    image: "/media-coverage/construction-world.avif",
  },
  {
    id: "india-deeptech-report-2025",
    title: "Mapped in the India Deeptech Report 2025",
    outlet: "TDK Ventures & Kae Capital",
    date: "2025-09-01",
    dateLabel: "Sept 2025",
    description:
      "Flo Mobility features under Construction & Heavy Duty Robots in the robotics chapter of the India Deeptech Report.",
    category: "press",
    url: "https://kae-capital.com/reports/india-deeptech-2025/",
    image: "/media-coverage/india-deeptech-report.avif",
    cta: "Read the report",
  },
  {
    id: "srx-podcast-manesh-jain",
    title: "SRX E3 | The Art of Execution is the Key to Success",
    outlet: "SRX Podcast",
    date: "2026-03-01",
    description:
      "Founder Manesh Jain on building construction site robots in India, and why execution decides which startups survive.",
    category: "video",
    image: "/media-coverage/srx-podcast.avif",
  },
  {
    id: "nicmar-agni-ignite",
    title: "Agni Ignite 2026 — North Conclave",
    outlet: "NICMAR University",
    date: "2026-01-01",
    dateLabel: "2026",
    description:
      "Manesh Jain on the panel 'Startup Environment in Construction Sector: Myth or Reality'.",
    category: "event",
    image: "/media-coverage/nicmar-agni-ignite.avif",
  },
  {
    id: "bengaluru-tech-summit-hauler",
    title: "The Flo Hauler on show at Bengaluru Tech Summit",
    outlet: "Bengaluru Tech Summit",
    date: "2025-11-01",
    dateLabel: "Nov 2025",
    description:
      "Flo's autonomous material mover on display outside Bangalore Palace during the summit.",
    category: "event",
    image: "/media-coverage/bengaluru-tech-summit-hauler.avif",
  },
  {
    id: "credai-new-india-summit",
    title: "Recognised at the CREDAI New India Summit",
    outlet: "CREDAI",
    date: "2025-03-01",
    dateLabel: "March 2025",
    description:
      "Felicitated at Viksit Bharat — Unlocking the Potential of Emerging Cities, Nashik, Maharashtra.",
    category: "event",
    image: "/media-coverage/credai-new-india-summit.avif",
  },
  {
    id: "artpark-startup-mahakumbh",
    title: "At Startup Mahakumbh with ARTPARK",
    outlet: "Startup Mahakumbh",
    date: "2025-04-01",
    description:
      "Showcasing autonomous material movement at the ARTPARK Robotics & Connected Autonomous Systems pavilion.",
    category: "event",
    image: "/media-coverage/artpark-startup-mahakumbh.avif",
  },
  {
    id: "kerala-launch",
    title: "Autonomous robotic wheelbarrow launched in Kerala",
    outlet: "Kerala Launch",
    date: "2025-06-01",
    description:
      "Demonstrating the impact of autonomous material movement to builders and officials in Kerala.",
    category: "event",
    image: "/media-coverage/kerala-launch.avif",
  },
  {
    id: "elevate-x",
    title: "Selected for Elevate X",
    outlet: "Elevate X",
    date: "2025-08-01",
    description:
      "Flo Mobility among the cohort of startups selected for the Elevate X programme.",
    category: "event",
    image: "/media-coverage/elevate-x.avif",
  },
];

/** Rendered in the "As featured in" band. `logo` falls back to the outlet name. */
export const MEDIA_OUTLETS: { name: string; logo?: string }[] = [
  { name: "YourStory" },
  { name: "The Economic Times" },
  { name: "Construction World" },
  { name: "BuiltWorlds" },
  { name: "TDK Ventures" },
  { name: "Kae Capital" },
];
