"use client";

import { Github } from "lucide-react";
import { ActivityDashboardProps } from "@/components/github-activity/types";
import { GitHubStatsGrid } from "@/components/github-activity/core/stats-grid";
import { GitHubContributionGraph } from "@/components/github-activity/core/contribution-graph";
import { GitHubLanguageChart } from "@/components/github-activity/core/language-chart";
import { GitHubContributionStats } from "@/components/github-activity/core/contribution-stats";
import { GitHubActivityDashboardSkeleton } from "@/components/github-activity/core/skeleton";
import { useGitHubActivity } from "@/components/github-activity/hooks/use-github-activity";

export function GitHubActivityDashboard({
  username,
  githubToken,
  showStatsGrid = true,
  showContributionGraph = true,
  showLanguageChart = true,
  showContributionStats = true,
  className = "",
  onContributionClick,
  onContributionHover,
}: ActivityDashboardProps) {
  // Get username and token from env or props
  const user = username || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "";
  const token = githubToken || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  // Check if we have any data (even if loading)
  const { loading, error } = useGitHubActivity(user, {
    token,
    useApiRoute: !token,
  });

  // Loading state
  if (loading) {
    return <GitHubActivityDashboardSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className={className}>
        <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
          <div className="flex items-center gap-3 mb-8">
            <Github className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">GitHub Activity</h3>
          </div>
          <div className="text-center py-8">
            <div className="text-destructive mb-2">Failed to load GitHub activity</div>
            <div className="text-sm text-muted-foreground">{error.message}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Github className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold">GitHub Activity</h3>
          {user && (
            <a
              href={`https://github.com/${user}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View Profile →
            </a>
          )}
        </div>

        {/* Stats Grid */}
        {showStatsGrid && (
          <GitHubStatsGrid
            username={user}
            githubToken={token}
            className="mb-8"
          />
        )}

        {/* Contribution Graph */}
        {showContributionGraph && (
          <div className="bg-background/50 border border-border/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4">
              Contribution Graph
            </h4>
            <GitHubContributionGraph
              username={user}
              githubToken={token}
              onDayClick={onContributionClick}
              onDayHover={onContributionHover}
            />
          </div>
        )}

        {/* Language Chart */}
        {showLanguageChart && (
          <GitHubLanguageChart 
            username={user}
            githubToken={token}
            className="mt-8" 
          />
        )}

        {/* Contribution Stats */}
        {showContributionStats && (
          <div className="mt-8">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4">
              Contribution Stats
            </h4>
            <GitHubContributionStats 
              username={user}
              githubToken={token}
            />
          </div>
        )}
      </div>
    </div>
  );
}
