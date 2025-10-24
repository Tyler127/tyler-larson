"use client";

import { StatsGridProps } from "../types";
import { GitHubStatCard } from "./stat-card";

export function GitHubStatsGrid({
  username,
  columns = 4,
  className = "",
  animate = true,
  githubToken,
}: StatsGridProps) {
  // Get username and token from env or props
  const user = username || process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const token = githubToken || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const gridCols = columns === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4";

  return (
    <div className={`grid ${gridCols} gap-4 ${className}`}>
      <GitHubStatCard
        username={user}
        type="repos"
        animate={animate}
        githubToken={token}
      />
      <GitHubStatCard
        username={user}
        type="stars"
        animate={animate}
        githubToken={token}
      />
      {columns === 4 && (
        <>
          <GitHubStatCard
            username={user}
            type="forks"
            animate={animate}
            githubToken={token}
          />
          <GitHubStatCard
            username={user}
            type="followers"
            animate={animate}
            githubToken={token}
          />
        </>
      )}
    </div>
  );
}
