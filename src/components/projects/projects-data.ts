import { Project } from "./project-card";

export const projects: Project[] = [
  {
    title: "Marvel Rivals Role Assigner",
    description:
      "A C++ application designed to assign roles to players in Marvel Rivals. Features a Qt-based GUI for easy role assignment and player management.",
    tech: ["C++", "Qt", "CMake", "GUI"],
    github: "https://github.com/Tyler127/MarvelRivalsRoleAssigner",
    stars: 1,
    license: "MIT",
    highlights: [
      "Intuitive GUI for role assignment",
      "Clipboard management integration",
      "Player configuration system",
      "Cross-platform compatibility",
    ],
    release: {
      version: "v0.2.0",
      date: "Jan 15, 2025",
      name: "First stable version",
      downloadUrl: "https://github.com/Tyler127/MarvelRivalsRoleAssigner/releases/download/v0.2.0/MarvelRivalsRoleAssigner_v0.2.0.zip",
    },
    screenshots: [
      { src: "/screenshots/marvel-rivals-1.PNG", label: "Application UI" },
      { src: "/screenshots/marvel-rivals-2.PNG", label: "Discord-formatted clipboard integration" },
    ],
  },
  {
    title: "MTG Booster Generator",
    description:
      "A Python program to create booster packs of Magic: The Gathering cards. Generate custom booster packs with configurable rarity distributions and card sets.",
    tech: ["Python", "CSV Processing", "Data Analysis"],
    github: "https://github.com/Tyler127/MTGBoosterGenerator",
    stars: 0,
    license: "MIT",
    highlights: [
      "Custom booster pack generation",
      "CSV-based card database",
      "Configurable rarity distributions",
      "Support for multiple sets",
    ],
    screenshots: [],
  },
  {
    title: "R6 Randomizer",
    description:
      "A randomizer tool for Rainbow Six Siege that helps players discover new operators and loadouts by generating random selections for more varied gameplay experiences.",
    tech: ["Java", "Game Tools", "CLI"],
    github: "https://github.com/Tyler127/R6Randomizer",
    stars: 0,
    license: "MIT",
    highlights: [
      "Random operator selection",
      "Loadout randomization",
      "Customizable operator pools",
      "Enhanced gameplay variety",
    ],
    release: {
      version: "v1.0",
      date: "Sep 20, 2023",
      name: "Version 1",
      downloadUrl: "https://github.com/Tyler127/R6Randomizer/releases/download/1.0/R6Randomizer.jar",
    },
    screenshots: [],
  },
  {
    title: "Drone Delivery System",
    description:
      "Worked within an Agile Scrum team of four to develop and integrate features for an existing drone delivery system. Implemented data collection and export features with CSV generation for analytics.",
    tech: ["Software Design Patterns", "Agile Scrum", "CSV Export", "System Integration"],
    github: "",
    stars: 0,
    license: "",
    highlights: [
      "Designed and implemented data collection and export features",
      "Applied software design patterns for code scalability",
      "Co-authored technical documentation for new code",
      "Debugged and resolved integration conflicts",
    ],
    screenshots: [],
    academicProject: true,
    period: "April 2024 - May 2024",
    course: "Program Design & Development",
  },
  {
    title: "Schedule Builder",
    description:
      "A web application for building schedules with Server-Side Rendering. Features an Express.js API with user session management and MySQL database integration.",
    tech: ["HTML", "CSS", "JavaScript", "jQuery", "Express.js", "MySQL", "SSR"],
    github: "",
    stars: 0,
    license: "",
    highlights: [
      "Express.js API with Fetch request handling",
      "User session management",
      "MySQL database integration",
      "Server-Side Rendering with dynamically rendered HTML",
    ],
    screenshots: [],
    academicProject: true,
    period: "April 2024",
    course: "Internet Programming",
  },
  {
    title: "SLOW-ARC (Slow Pitch Automated Review Calculation)",
    description:
      "A pitch classification system developed in Python to determine ball or strike calls with 70% accuracy. Participated in full SDLC within an Agile Scrum team.",
    tech: ["Python", "Machine Learning", "Agile Scrum", "Software Engineering"],
    github: "",
    stars: 0,
    license: "",
    highlights: [
      "70% accuracy in pitch classification",
      "Co-authored Software Requirements Specification",
      "Co-authored Software Design Document",
      "Participated in full SDLC phases",
    ],
    screenshots: [],
    academicProject: true,
    period: "October 2023 - December 2023",
    course: "Software Engineering I",
  },
];

