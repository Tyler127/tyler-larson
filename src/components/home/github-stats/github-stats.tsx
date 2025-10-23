"use client";

import { Badge } from "@/components/ui/badge";
import { Github, GitFork, Star, Code2 } from "lucide-react";
import { useGitHubStats, useGitHubContributions } from "./queries";
import { prefetchContributionData, openContributionDialog } from "./contribution-dialog-manager";
import { ContributionGraph, ContributionWeek } from "./contribution-graph";
import { ContributionStats } from "./contribution-stats";
import { ContributionDialogManager } from "./contribution-dialog-manager";

// Loading skeleton - matches actual layout
const GitHubStatsLoading = () => (
  <div>
    <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
      <div className="flex items-center gap-3 mb-8">
        <Github className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-bold">GitHub Activity</h3>
        <div className="ml-auto text-sm text-muted-foreground">View Profile →</div>
      </div>

      {/* Stats Grid - with skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <Code2 className="w-5 h-5 mx-auto mb-2 text-primary" />
          <div className="h-8 w-12 mx-auto mb-1 bg-muted animate-pulse rounded" />
          <div className="text-xs text-muted-foreground">Repositories</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <Star className="w-5 h-5 mx-auto mb-2 text-yellow-500" />
          <div className="h-8 w-12 mx-auto mb-1 bg-muted animate-pulse rounded" />
          <div className="text-xs text-muted-foreground">Stars</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <GitFork className="w-5 h-5 mx-auto mb-2 text-primary" />
          <div className="h-8 w-12 mx-auto mb-1 bg-muted animate-pulse rounded" />
          <div className="text-xs text-muted-foreground">Forks</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <Github className="w-5 h-5 mx-auto mb-2 text-primary" />
          <div className="h-8 w-12 mx-auto mb-1 bg-muted animate-pulse rounded" />
          <div className="text-xs text-muted-foreground">Followers</div>
        </div>
      </div>

      {/* Most Used Languages - skeleton */}
      <div className="bg-background/50 border border-border/30 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-muted-foreground mb-4">
          Most Used Languages
        </h4>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-muted/50 rounded-full" style={{ width: `${(5 - i) * 20}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contribution Graph and Stats - skeleton */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6 items-start">
        {/* Contribution Graph skeleton - full grid */}
        <div className="bg-background/50 border border-border/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">
            Contribution Graph
          </h4>
          <div className="w-full">
            {/* Month labels with proper positioning */}
            <div className="relative mb-3 h-4 overflow-hidden">
              <div className="flex" style={{ width: '100%' }}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => {
                  const position = (idx / 12) * 100;
                  return (
                    <div
                      key={idx}
                      className="absolute text-xs text-muted-foreground font-medium"
                      style={{ left: `${position}%` }}
                    >
                      {month}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Day labels + Contribution cells */}
            <div className="flex gap-2">
              {/* Day labels */}
              <div className="flex flex-col justify-between py-1 text-xs text-muted-foreground">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>
              {/* Grid */}
              <div className="flex-1 overflow-x-auto">
                <div
                  className="grid gap-[2px] p-0.5"
                  style={{
                    gridTemplateColumns: 'repeat(53, 1fr)',
                    gridAutoFlow: 'column',
                    minWidth: 'fit-content',
                  }}
                >
                  {[...Array(53)].map((_, weekIdx) => (
                    <div key={weekIdx} className="grid grid-rows-7 gap-[2px]">
                      {[...Array(7)].map((_, dayIdx) => (
                        <div
                          key={`${weekIdx}-${dayIdx}`}
                          className="aspect-square rounded-sm bg-muted/30 min-w-[10px] min-h-[10px]"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
              <span>Less</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-sm bg-muted/30" />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Contribution Stats skeleton */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">
            Contribution Stats
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
                <div className="h-4 w-12 mx-auto mb-1 bg-muted animate-pulse rounded" />
                <div className="h-6 w-8 mx-auto bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function GitHubStats() {
  const { stats, languages, loading: statsLoading } = useGitHubStats("Tyler127");
  const { contributions } = useGitHubContributions("Tyler127");

  // Show skeleton while stats are loading
  if (statsLoading || !stats) {
    return <GitHubStatsLoading />;
  }

  // Pass contributions even if still loading - they'll fade in when ready
  return <GitHubStatsContent 
    stats={stats} 
    languages={languages} 
    contributions={contributions}
  />;
}

function GitHubStatsContent({ stats, languages, contributions }: {
  stats: { publicRepos: number; followers: number; totalStars: number; totalForks: number };
  languages: { [key: string]: number };
  contributions: ContributionWeek[];
}) {

  const totalRepos = Object.values(languages).reduce(
    (sum, count) => sum + count,
    0,
  );

  const languageColors: { [key: string]: string } = {
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
  };

  return (
    <div>
      <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
        <div className="flex items-center gap-3 mb-8">
          <Github className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold">GitHub Activity</h3>
          <a
            href="https://github.com/Tyler127"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View Profile →
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
            <Code2 className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{stats.publicRepos}</div>
            <div className="text-xs text-muted-foreground">
              {stats.publicRepos === 1 ? "Repository" : "Repositories"}
            </div>
          </div>

          <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
            <Star className="w-5 h-5 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{stats.totalStars}</div>
            <div className="text-xs text-muted-foreground">
              {stats.totalStars === 1 ? "Star" : "Stars"}
            </div>
          </div>

          <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
            <GitFork className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{stats.totalForks}</div>
            <div className="text-xs text-muted-foreground">
              {stats.totalForks === 1 ? "Fork" : "Forks"}
            </div>
          </div>

          <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
            <Github className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{stats.followers}</div>
            <div className="text-xs text-muted-foreground">
              {stats.followers === 1 ? "Follower" : "Followers"}
            </div>
          </div>
        </div>

        {/* Most Used Languages */}
        <div className="bg-background/50 border border-border/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">
            Most Used Languages
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(languages).map(([language, count]) => {
              const percentage = ((count / totalRepos) * 100).toFixed(1);
              return (
                <Badge
                  key={language}
                  variant="outline"
                  className="flex items-center gap-2 px-3 py-1"
                  style={{
                    borderColor: languageColors[language] || "#666",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: languageColors[language] || "#666",
                    }}
                  />
                  <span>{language}</span>
                  <span className="text-xs text-muted-foreground">
                    {percentage}%
                  </span>
                </Badge>
              );
            })}
          </div>

          {/* Language Bar Chart */}
          <div className="mt-4 space-y-2">
            {Object.entries(languages).map(([language, count]) => {
              const percentage = (count / totalRepos) * 100;
              return (
                <div key={language} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{language}</span>
                    <span className="text-muted-foreground">
                      {count} {count === 1 ? "repo" : "repos"}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: languageColors[language] || "#666",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GitHub Contribution Graph and Stats */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6 items-start">
          {/* Contribution Graph */}
          <div className="bg-background/50 border border-border/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4">
              Contribution Graph
            </h4>
            <ContributionGraph 
              contributions={contributions}
              onDayClick={(date, count) => {
                openContributionDialog(date, count);
              }}
              onDayHover={(date, count) => {
                prefetchContributionData("Tyler127", date, count);
              }}
            />
          </div>

          {/* Contribution Stats */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-4">
              Contribution Stats
            </h4>
            <ContributionStats contributions={contributions} />
          </div>
        </div>
      </div>
      
      {/* Dialog Manager - Completely isolated, no re-renders of graph */}
      <ContributionDialogManager username="Tyler127" />
    </div>
  );
}
