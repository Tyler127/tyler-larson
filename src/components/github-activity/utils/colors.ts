// Language color mappings (based on GitHub's official colors)
export const defaultLanguageColors: { [key: string]: string } = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Vue: "#41b883",
  React: "#61dafb",
  Svelte: "#ff3e00",
};

// Default contribution level colors
export const defaultContributionColors = {
  0: "bg-muted/30",
  1: "bg-green-200 dark:bg-green-900/40",
  2: "bg-green-400 dark:bg-green-700/60",
  3: "bg-green-600 dark:bg-green-500/80",
  4: "bg-green-700 dark:bg-green-400",
} as const;

// Helper to get language color with fallback
export function getLanguageColor(
  language: string,
  customColors?: { [key: string]: string }
): string {
  if (customColors && customColors[language]) {
    return customColors[language];
  }
  return defaultLanguageColors[language] || "#666";
}

// Helper to get contribution level color
export function getContributionLevelColor(
  level: 0 | 1 | 2 | 3 | 4,
  customColors?: { 0: string; 1: string; 2: string; 3: string; 4: string }
): string {
  if (customColors) {
    return customColors[level];
  }
  return defaultContributionColors[level];
}

