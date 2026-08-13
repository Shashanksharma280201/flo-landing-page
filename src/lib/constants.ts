export const NAV_CONFIG = {
  mainNav: [
    {
      title: 'Offerings',
      items: [
        {
          title: 'Material Movement',
          href: '/offerings/material-movement',
          description: 'Autonomous solutions for moving goods efficiently.',
        },
        // {
        //   title: 'Lawn maintenance',
        //   href: '/offerings/lawn-maintenance',
        //   description: 'Smart robotic systems for landscape management.',
        // },
        {
          title: 'Fleet Control',
          href: '/offerings/fleet-control',
          description: 'Centralized management for your autonomous fleet.',
        },
      ],
    },
    {
      title: 'Resources',
      items: [
        {
          title: 'About',
          href: '/about',
          description: 'Learn more about our mission and the team behind flo.',
        },
        {
          title: 'Media Coverage',
          href: '/media-coverage',
          description: 'Flo in the news — interviews, features and TV coverage.',
        },
        {
          title: 'Blogs',
          href: '/blogs',
          description: 'Insights and updates from the world of autonomous mobility.',
        },
      ],
    },
    {
      title: 'Careers',
      href: '/careers',
    },
  ],
  actions: {
    fleet: 'https://fleet.flomobility.com',
    contact: '/contact',
  },
};

export const HERO_CONTENT = {
  title: 'Robots for Construction',
  subtitle: 'Enabling contractors to build smarter, faster, and safer',
  cta: {
    primary: { text: 'Explore Solutions', href: '#raas' },
  },
};

export const RAAS_CONTENT = {
  title: 'Robots as a Service',
  subtitle:
    'We offer cutting edge robots on a flexible subscription basis, helping you automate material handling and wall finishing activities seamlessly integrating with existing workflows.',
  products: [
    {
      id: 'material-movement',
      title: 'Material Movement',
      description:
        'With advanced sensors and autonomous navigation, this efficient and adaptable robot streamlines logistics operations with speed and reliability. Experience optimized efficiency, reduced manual labor, and increased productivity with the Material Movement Bot.',
      videoId: 'KMTNnYjulQE',
      image: '/mmr-images/mmr-images-1.avif',
    },
    // {
    //   id: 'lawn-mower',
    //   title: 'Lawn Mower',
    //   description:
    //     'Our lawn mowing robot will take care of your lawn, so you can relax and enjoy your free time. Efficient and safe. The robot is equipped with sensors that prevent it from colliding with objects or getting stuck. The cost is less expensive than hiring a traditional lawn service.',
    //   videoId: 'KMTNnYjulQE',
    //   image: '/mmr-images/mmr-images-2.avif',
    // },
    {
      id: 'wall-finishing',
      title: 'Wall Finishing',
      description:
        'Our wall finishing robot is designed to automate the tasks of sanding and putty application on the walls. With precision movement, the robot not only brings uniformity and consistency in wall finishing, but also saves material wastage thereby reducing cost while delivering better quality finish.',
      videoId: 'KMTNnYjulQE',
      image: '/mmr-images/mmr-images-3.avif',
    },
  ],
};

export const BELIEVERS = [
  { name: 'Mela Ventures', logo: '/believers/Mela.avif' },
  { name: 'Arali Ventures', logo: '/believers/Arali.avif' },
  { name: 'JITO Angel', logo: '/believers/JITO.avif' },
  { name: 'Lets Venture', logo: '/believers/Lets-Venture.avif' },
  { name: 'IISC - ArtPark', logo: '/believers/IISC.avif' },
  { name: 'DevX', logo: '/believers/DevX.avif' },
  { name: 'Blume Founders Fund', logo: '/believers/Blume.avif' },
];

export const CUSTOMERS = [
  { name: 'L&T', logo: '/customers/LT.avif' },
  { name: 'Godrej', logo: '/customers/Godrej.avif' },
  { name: 'Kalpataru', logo: '/customers/kalpataru.avif' },
  { name: 'Embassy', logo: '/customers/Embassy.avif' },
  { name: 'Sobha', logo: '/customers/Sobha.avif' },
  { name: 'Al Gurg Group', logo: '/customers/Al-Gurg.avif' },

  { name: 'Nissan', logo: '/customers/nissan.avif' },
  { name: 'KEC', logo: '/customers/KEC.avif' },
  { name: 'ASBL', logo: '/customers/ASBL.avif' },
  { name: 'Ahluwalia Contracts', logo: '/customers/Ahluwalia.avif' },
  { name: 'Capacite', logo: '/customers/Capacite.avif' },
  { name: 'Tarc', logo: '/customers/Tarc.avif' },

  { name: 'Sowparnika Projects', logo: '/customers/Sowparnika.avif' },
  { name: 'Runwal', logo: '/customers/Runwal.avif' },
  { name: 'Total Environment', logo: '/customers/Total-environment-2.avif' },
  { name: 'Shriram', logo: '/customers/Shriram.avif' },
  { name: 'Leighton', logo: '/customers/Leighton.avif' },
  { name: 'Kolte Patil', logo: '/customers/Kolte-Patil.avif' },
  { name: 'M3M', logo: '/customers/m3m.avif' },

  { name: 'PSP Projects', logo: '/customers/PSP-Projects.avif' },
  { name: 'Century', logo: '/customers/Century.avif' },
  { name: 'K2K', logo: '/customers/K2K-infrastructure.avif' },
  { name: 'UPL', logo: '/customers/Upl.avif' },
  { name: 'Emboss', logo: '/customers/Emboss.avif' },
  { name: 'ICAR IIHR', logo: '/customers/Icar-iihr.avif' },

  { name: 'Hitech', logo: '/customers/Hitech-1.avif' },
];

export const JOBS = [
  {
    title: 'Embedded Design Engineer',
    description:
      'Develop embedded firmware and CAN-based communication systems for autonomous robots.',
    location: 'Bangalore',
    type: 'Full Time',
    jdLink: '/docs/firmware-jd.pdf',
  },
  {
    title: 'Operations Executive',
    description:
      'Lead operator onboarding, site logistics, and daily workflows to power material movement at major project sites.',
    location: 'Bangalore',
    type: 'Full Time',
    jdLink: '/docs/operations-executive-jd.pdf',
  },
  {
    title: 'Operations Associate',
    description:
      'Support field operations across project sites — coordinating site teams, onboarding, and execution workflows in fast-paced environments.',
    location: 'Bangalore',
    type: 'Full Time',
    jdLink: '/docs/operations-associate-jd.pdf',
  },
  {
    title: 'Business Development Manager',
    description:
      'Scaling robotic deployments through CXO partnerships and B2B sales excellence.',
    location: 'Bangalore',
    type: 'Full Time',
    jdLink: '/docs/business-development-jd.pdf',
  },
  {
    title: 'Material Movement Robot Operator',
    description:
      'Operate robotic machinery and manage on-site material movement data via mobile applications.',
    location: 'Bangalore',
    type: 'Full Time',
    jdLink: '/docs/robot-operators-jd.pdf',
  },
];

// ─── Media coverage ───────────────────────────────────────────────────────────
export type MediaCategory = 'press' | 'video' | 'event';

export interface MediaItem {
  id: string;
  outlet: string;
  category: MediaCategory; // filter group
  kind: string; // badge label — Article, Recognition, Podcast, Event, Milestone…
  title: string;
  description: string;
  date: string; // ISO (YYYY-MM-DD) — for sorting + schema
  dateLabel: string; // human label as published (e.g. "July 2026", "2025")
  url?: string;
  videoId?: string; // YouTube id → renders a click-to-play card
  image?: string; // /media-coverage/… local thumbnail
  heroImage?: string; // large image used by the featured overlay hero
  cta?: string; // link button label
  featured?: boolean;
}

// Real coverage sourced from the Media Section brief. Images live in
// public/media-coverage/. YouTube items (videoId) render click-to-play.
export const MEDIA_COVERAGE: MediaItem[] = [
  {
    id: 'yourstory-haul-materials',
    outlet: 'YourStory',
    category: 'press',
    kind: 'Article',
    title: 'Flo Mobility builds robots that haul construction materials',
    description:
      "YourStory featured Flo Mobility's autonomous robotics platform and its mission to transform construction material movement through Physical AI.",
    date: '2026-07-01',
    dateLabel: 'July 2026',
    url: 'https://yourstory.com/2026/07/flo-mobility-construction-robots',
    image: '/media-coverage/yourstory.avif',
    cta: 'Read Full Article',
    featured: true,
  },
  {
    id: 'builtworlds-robotics-top-50',
    outlet: 'BuiltWorlds',
    category: 'press',
    kind: 'Recognition',
    title: 'Recognized among the 2026 Robotics Top 50',
    description:
      "Flo Mobility was named by BuiltWorlds as one of the world's leading robotics companies driving innovation in construction and material transport.",
    date: '2026-07-01',
    dateLabel: 'July 2026',
    url: 'https://www.linkedin.com/posts/builtworlds_were-excited-to-release-the-2026-robotics-activity-7480728390212218881-PHOc',
    image: '/media-coverage/builtworlds-robotics-top-50.avif',
    cta: 'View Recognition',
  },
  {
    id: 'runtime-construction-robotics',
    outlet: 'Runtime',
    category: 'video',
    kind: 'Video',
    title: "Runtime features Flo Mobility's construction robotics innovation",
    description:
      "An inside look at Flo Mobility's autonomous construction robots and their impact on safety, productivity, and material movement.",
    date: '2026-06-01',
    dateLabel: 'June 2026',
    url: 'https://youtu.be/x-i_OhGSJOA',
    videoId: 'x-i_OhGSJOA',
    cta: 'Watch Video',
  },
  {
    id: 'economic-times-ai-innovators',
    outlet: 'The Economic Times',
    category: 'press',
    kind: 'Article',
    title: "Featured among India's construction AI innovators",
    description:
      "The Economic Times highlighted Flo Mobility's role in advancing AI-powered robotics to address labour shortages and improve construction productivity.",
    date: '2026-05-01',
    dateLabel: 'May 2026',
    url: 'https://economictimes.indiatimes.com/tech/artificial-intelligence/startups-lead-ai-push-into-construction-amid-labour-shortages/articleshow/130805879.cms',
    image: '/media-coverage/economic-times.avif',
    cta: 'Read Full Article',
  },
  {
    id: 'nicmar-agni-ignite',
    outlet: 'NICMAR AGNI IGNITE',
    category: 'event',
    kind: 'Event',
    title: 'Flo Mobility at AGNI IGNITE – North Conclave 2026',
    description:
      'Founder & CEO Manesh Jain joined industry leaders to discuss the future of construction, technology, and infrastructure.',
    date: '2026-03-01',
    dateLabel: 'March 2026',
    image: '/media-coverage/nicmar-agni-ignite.avif',
  },
  {
    id: 'elevate-x-think-turf',
    outlet: 'ELEVATE X',
    category: 'event',
    kind: 'Event',
    title: 'Showcasing our vision at ELEVATE X – Startup Leadership Think Turf',
    description:
      'Flo Mobility joined leading founders, investors, and industry experts to discuss the future of Physical AI and robotics.',
    date: '2026-02-01',
    dateLabel: 'February 2026',
    image: '/media-coverage/elevate-x.avif',
  },
  {
    id: 'srx-podcast-manesh-jain',
    outlet: 'SRX Podcast',
    category: 'video',
    kind: 'Podcast',
    title: 'Founder Manesh Jain on building robotics for construction',
    description:
      "Founder & CEO Manesh Jain shares Flo Mobility's journey — from early product development to real-world deployments, fundraising, and the future of construction robotics.",
    date: '2026-02-01',
    dateLabel: 'February 2026',
    url: 'https://lnkd.in/duceA_5T',
    image: '/media-coverage/srx-podcast.avif',
    cta: 'Watch Podcast',
  },
  {
    id: 'etv-bharat-autonomous-wheelbarrow',
    outlet: 'ETV Bharat',
    category: 'press',
    kind: 'TV Feature',
    title: "ETV Bharat features Flo's Made-in-India autonomous wheelbarrow",
    description:
      "ETV Bharat highlighted Flo Mobility's Made-in-India autonomous wheelbarrow designed to improve construction productivity and safety.",
    date: '2025-11-01',
    dateLabel: 'November 2025',
    url: 'https://www.etvbharat.com/en/business/bengaluru-start-ups-made-in-india-autonomous-wheelbarrow-aims-to-transform-construction-workflows-enn25111904856',
    cta: 'Read Full Article',
  },
  {
    id: 'india-deeptech-report-2025',
    outlet: 'India Deeptech Report',
    category: 'press',
    kind: 'Recognition',
    title: 'Featured in the India Deeptech Report 2025',
    description:
      'Recognized for advancing autonomous robotics and driving innovation in the construction technology sector.',
    date: '2025-09-01',
    dateLabel: 'September 2025',
    image: '/media-coverage/india-deeptech-report.avif',
  },
  {
    id: 'construction-world-flow-not-move',
    outlet: 'Construction World',
    category: 'press',
    kind: 'Article',
    title: "“We're building robots that flow, not just move”",
    description:
      "Founder Manesh Jain shares Flo Mobility's vision for intelligent material movement and the future of construction automation.",
    date: '2025-06-01',
    dateLabel: 'June 2025',
    url: 'https://www.constructionworld.in/latest-construction-technology/we---re-building-robots-that-flow--not-just-move/75548',
    image: '/media-coverage/construction-world.avif',
    cta: 'Read Full Article',
  },
  {
    id: 'credai-new-india-summit',
    outlet: 'CREDAI',
    category: 'event',
    kind: 'Event',
    title: 'Flo Mobility joins CREDAI New India Summit 2025',
    description:
      'Engaging with developers, investors, and industry leaders to accelerate the adoption of construction robotics.',
    date: '2025-05-01',
    dateLabel: 'May 2025',
    image: '/media-coverage/credai-new-india-summit.avif',
  },
  {
    id: 'republic-tv-debate',
    outlet: 'Republic TV',
    category: 'video',
    kind: 'TV',
    title: 'Flo Mobility on the national debate with Arnab',
    description:
      "Founder & CEO Manesh Jain joined a national debate on deep-tech innovation, startups, and India's role in shaping the future of technology.",
    date: '2025-04-01',
    dateLabel: 'April 2025',
    url: 'https://youtu.be/zIRonRogjVU',
    videoId: 'zIRonRogjVU',
    cta: 'Watch Episode',
  },
  {
    id: 'artpark-startup-mahakumbh',
    outlet: 'ARTPARK',
    category: 'event',
    kind: 'Event',
    title: 'ARTPARK showcases Flo Mobility at Startup Mahakumbh 2025',
    description:
      "Featured among ARTPARK's leading deep-tech startups, showcasing innovations in construction robotics and smart mobility.",
    date: '2025-04-01',
    dateLabel: 'April 2025',
    image: '/media-coverage/artpark-startup-mahakumbh.avif',
  },
  {
    id: 'cna-india-ai-race',
    outlet: 'CNA',
    category: 'video',
    kind: 'Documentary',
    title: 'Featured in CNA Insight: India and the AI Race',
    description:
      "Flo Mobility was featured in CNA's documentary exploring India's AI innovation ecosystem and the startups shaping its future.",
    date: '2025-03-01',
    dateLabel: '2025',
    url: 'https://www.channelnewsasia.com/watch/insight-20252026/india-and-ai-race-5269911',
    cta: 'Watch Documentary',
  },
  {
    id: 'bhogapuram-airport-deployment',
    outlet: 'Flo Mobility',
    category: 'video',
    kind: 'Project',
    title: 'Autonomous Hauler deployed at Bhogapuram Airport',
    description:
      "Flo Mobility's autonomous Hauler was deployed to support material movement at the Bhogapuram Airport infrastructure project.",
    date: '2024-12-01',
    dateLabel: 'December 2024',
    url: 'https://youtube.com/shorts/n-svQAaD8gU',
    videoId: 'n-svQAaD8gU',
    cta: 'Watch Project',
  },
  {
    id: 'bengaluru-tech-summit-hauler',
    outlet: 'Bengaluru Tech Summit',
    category: 'event',
    kind: 'Milestone',
    title: 'Unveiling the Hauler at Bengaluru Tech Summit 2024',
    description:
      'Flo Mobility officially launched its autonomous Hauler, marking a significant milestone in construction automation and robotics.',
    date: '2024-11-01',
    dateLabel: 'November 2024',
    image: '/media-coverage/bengaluru-tech-summit-hauler.avif',
  },
  {
    id: 'kerala-operations-launch',
    outlet: 'Flo Mobility',
    category: 'event',
    kind: 'Milestone',
    title: 'Launching operations in Kerala',
    description:
      "Inaugurated by Shri P. Rajeev, Hon'ble Minister for Law, Industries & Coir, Government of Kerala, at the Robotics Round Table Conference.",
    date: '2024-08-01',
    dateLabel: 'August 2024',
    image: '/media-coverage/kerala-launch.avif',
  },
];

export interface MediaOutlet {
  name: string;
  // Drop a logo file at public/media-coverage/logos/<file> and set it here to
  // render the real logo instead of the styled wordmark fallback.
  logo?: string;
}

export const MEDIA_OUTLETS: MediaOutlet[] = [
  { name: 'The Economic Times' },
  { name: 'YourStory' },
  { name: 'CNA' },
  { name: 'Construction World' },
  { name: 'BuiltWorlds' },
  { name: 'Republic TV' },
  { name: 'DD News' },
  { name: 'ETV Bharat' },
  { name: 'Runtime' },
  { name: 'Startupro' },
];
