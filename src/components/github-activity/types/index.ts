// Core GitHub Stats Types
export interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
}

// Language Statistics
export interface LanguageStats {
  [key: string]: number;
}

// Contribution Types
export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

// Contribution Detail Types
export type ContributionType = "commit" | "pullRequest" | "issue" | "review";

export interface ContributionDetail {
  type: ContributionType;
  repo: string;
  title?: string;
  url?: string;
  commitCount?: number;
  occurredAt: string;
}

// Component Prop Types
export interface StatCardProps {
  username?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_USERNAME if not provided
  type: "repos" | "stars" | "forks" | "followers";
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  color?: string;
  iconColor?: string;
  className?: string;
  animate?: boolean;
  githubToken?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_TOKEN if not provided
}

export interface StatsGridProps {
  username?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_USERNAME if not provided
  columns?: 2 | 4;
  className?: string;
  animate?: boolean;
  githubToken?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_TOKEN if not provided
}

export interface ContributionGraphProps {
  username?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_USERNAME if not provided
  onDayClick?: (date: string, count: number) => void;
  onDayHover?: (date: string, count: number) => void;
  colors?: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
  };
  className?: string;
  showLegend?: boolean;
  showMonthLabels?: boolean;
  showDayLabels?: boolean;
  githubToken?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_TOKEN if not provided
}

export interface ContributionStatsProps {
  username?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_USERNAME if not provided
  className?: string;
  sections?: {
    metrics?: boolean;
    additionalStats?: boolean;
    dayOfWeekActivity?: boolean;
  };
  githubToken?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_TOKEN if not provided
}

export interface LanguageChartProps {
  username?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_USERNAME if not provided
  showBadges?: boolean;
  showBarChart?: boolean;
  maxLanguages?: number;
  animate?: boolean;
  className?: string;
  colors?: { [key: string]: string };
  githubToken?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_TOKEN if not provided
}

export interface ActivityDashboardProps {
  username?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_USERNAME if not provided
  githubToken?: string; // Optional - reads from NEXT_PUBLIC_GITHUB_TOKEN if not provided
  
  // Customization
  showStatsGrid?: boolean;
  showContributionGraph?: boolean;
  showLanguageChart?: boolean;
  showContributionStats?: boolean;
  
  // Layout
  className?: string;
  
  // Callbacks
  onContributionClick?: (date: string, count: number) => void;
  onContributionHover?: (date: string, count: number) => void;
}

// Hook Options
export interface UseGitHubStatsOptions {
  token?: string;
  cache?: boolean;
}

export interface UseGitHubContributionsOptions {
  token?: string;
  cache?: boolean;
  useApiRoute?: boolean; // If true, uses /api/github-contributions
  apiEndpoint?: string;  // Custom API endpoint
}

