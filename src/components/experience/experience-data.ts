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
  focus?: string;
}

export const experiences: Experience[] = [
  {
    title: "Merchandiser",
    company: "O'Reilly Auto Parts",
    location: "Andover, MN",
    period: "May 2022 - September 2023",
    description:
      "Managed inventory operations and merchandise organization to optimize store efficiency and product availability.",
    achievements: [
      "Conducted efficient stock check-ins and replenishment to ensure product availability",
      "Lead solo projects to optimize merchandise organization, enhancing the efficiency of daily tasks",
    ],
    skills: ["Inventory Management", "Organization", "Time Management", "Independent Work"],
  },
  {
    title: "Student Staff",
    company: "University of Minnesota, Twin Cities - Department of Mechanical Engineering",
    location: "Minneapolis, MN",
    period: "August 2021 - May 2022",
    description:
      "Provided administrative and operational support for the Department of Mechanical Engineering.",
    achievements: [
      "Provided support for a student population of over 800, creating a welcoming and inclusive environment",
      "Completed routine tasks for department faculty, enabling them to focus on higher-priority projects",
    ],
    skills: ["Customer Service", "Administrative Support", "Communication", "Organization"],
  },
];

export const education: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    focus: "Software Engineering",
    institution: "University of Minnesota, Twin Cities",
    location: "Minneapolis, MN",
    period: "September 2021 - May 2024",
    honors: "Cumulative GPA: 3.3",
  },
];

export const certifications: string[] = [];

