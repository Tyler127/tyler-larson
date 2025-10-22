export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  honors?: string;
}

export const experiences: Experience[] = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description:
      "Leading development of enterprise-scale applications using modern web technologies. Architecting scalable solutions and mentoring junior developers.",
    achievements: [
      "Increased application performance by 40% through optimization",
      "Led migration to microservices architecture",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
    ],
    skills: ["React", "Node.js", "TypeScript", "Python", "REST API", "Docker", "PostgreSQL", "Bash"],
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Co.",
    location: "Austin, TX",
    period: "2020 - 2022",
    description:
      "Developed and maintained multiple client-facing web applications. Collaborated with design team to implement pixel-perfect UI components.",
    achievements: [
      "Built responsive web applications serving 100K+ users",
      "Reduced bug count by 35% through comprehensive testing",
      "Integrated third-party APIs for enhanced functionality",
    ],
    skills: ["React", "PHP", "Laravel", "JavaScript", "HTML", "CSS", "Tailwind CSS", "REST API"],
  },
  {
    title: "Frontend Developer",
    company: "StartUp Ventures",
    location: "Remote",
    period: "2018 - 2020",
    description:
      "Created engaging user interfaces and interactive experiences. Worked closely with UX designers to bring mockups to life.",
    achievements: [
      "Developed reusable component library used across 5+ projects",
      "Improved page load time by 50% through code splitting",
      "Implemented accessibility standards achieving WCAG 2.1 AA compliance",
    ],
    skills: ["JavaScript", "React", "HTML", "CSS", "Tailwind CSS", "Webpack", "Git"],
  },
];

export const education: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    location: "Boston, MA",
    period: "2014 - 2018",
    honors: "Magna Cum Laude",
  },
];

export const certifications: string[] = [
  "AWS Certified Solutions Architect",
  "Google Cloud Professional Developer",
  "MongoDB Certified Developer",
];

