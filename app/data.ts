type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
  bullets: string[]
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Motion Primitives Pro',
    description:
      'Advanced components and templates to craft beautiful websites.',
    link: 'https://pro.motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Motion Primitives',
    description: 'UI kit to make beautiful, animated interfaces.',
    link: 'https://motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Freelance',
    title: 'Pentester',
    start: '2024',
    end: 'Present',
    link: 'https://krisyotam.com',
    id: 'work1',
    bullets: [
      'Conducted network and web application penetration tests for small businesses',
      'Performed vulnerability assessments and wrote detailed remediation reports',
      'Built custom tooling for reconnaissance and enumeration in Python and Bash',
    ],
  },
  {
    company: 'Freelance',
    title: 'Systems Engineer',
    start: '2023',
    end: 'Present',
    link: 'https://krisyotam.com',
    id: 'work2',
    bullets: [
      'Designed and maintained self-hosted infrastructure on Arch Linux (Docker, nginx, Tor)',
      'Configured DNS ad-blocking, reverse proxies, and SSL/TLS across multiple services',
      'Automated deployment pipelines with shell scripts and systemd services',
    ],
  },
  {
    company: 'Freelance',
    title: 'Full-Stack Developer',
    start: '2022',
    end: 'Present',
    link: 'https://krisyotam.com',
    id: 'work3',
    bullets: [
      'Built production web applications with Next.js, TypeScript, and SQLite',
      'Developed REST APIs and integrated third-party services',
      'Shipped responsive, accessible interfaces with Tailwind CSS',
    ],
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/krisyotam',
  },
  {
    label: 'Twitter',
    link: 'https://x.com/krisyotam',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/krisyotam',
  },
  {
    label: 'Bluesky',
    link: 'https://bsky.app/profile/krisyotam.com',
  },
]

export const EMAIL = 'kris@krisyotam.com'
