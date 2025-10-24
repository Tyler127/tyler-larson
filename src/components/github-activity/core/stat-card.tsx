"use client";

import { StatCardProps } from "../types";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useGitHubStats } from "../hooks/use-github-stats";
import { Code2, Star, GitFork, Github } from "lucide-react";

export function GitHubStatCard({
  username,
  type,
  icon,
  label,
  color,
  iconColor,
  className = "",
  animate = true,
  githubToken,
}: StatCardProps) {
  // Get username and token from env or props
  const user = username || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "";
  const token = githubToken || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  // Auto-fetch stats
  const { stats, loading } = useGitHubStats(user, { token });

  // Default icons and labels
  const defaults = {
    repos: { icon: Code2, label: "Repositories", color: "text-primary" },
    stars: { icon: Star, label: "Stars", color: "text-yellow-500" },
    forks: { icon: GitFork, label: "Forks", color: "text-primary" },
    followers: { icon: Github, label: "Followers", color: "text-primary" },
  };

  const Icon = icon || defaults[type].icon;
  const displayLabel = label || defaults[type].label;
  const displayIconColor = iconColor || defaults[type].color;

  // Get value based on type
  const getValue = () => {
    if (!stats) return 0;
    switch (type) {
      case "repos":
        return stats.publicRepos;
      case "stars":
        return stats.totalStars;
      case "forks":
        return stats.totalForks;
      case "followers":
        return stats.followers;
    }
  };

  const value = getValue();

  if (loading) {
    return (
      <div
        className={`text-center p-4 rounded-lg bg-background/50 border border-border/30 ${className}`}
      >
        <div className="w-5 h-5 mx-auto mb-2 bg-muted animate-pulse rounded" />
        <div className="h-8 w-16 mx-auto mb-1 bg-muted animate-pulse rounded" />
        <div className="h-3 w-20 mx-auto bg-muted animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div
      className={`text-center p-4 rounded-lg bg-background/50 border border-border/30 ${className}`}
      style={color ? { borderColor: color } : undefined}
    >
      <Icon className={`w-5 h-5 mx-auto mb-2 ${displayIconColor}`} />
      <div className="text-2xl font-bold">
        {animate ? <NumberTicker value={value} /> : value}
      </div>
      <div className="text-xs text-muted-foreground">{displayLabel}</div>
    </div>
  );
}
