"use client";

import { TrendingUp, Flame, Calendar, BarChart3 } from "lucide-react";
import { ContributionStatsProps } from "@/components/github-activity/types";
import {
  calculateTotalContributions,
  calculateCurrentStreak,
  calculateLongestStreak,
  calculateAverageContributions,
  calculateMonthlyStats,
  calculateDayOfWeekStats,
  getMostActiveDay,
} from "@/components/github-activity/utils/calculations";
import { useGitHubContributions } from "@/components/github-activity/hooks/use-github-contributions";

export function GitHubContributionStats({
  username,
  className = "",
  sections = {
    metrics: true,
    additionalStats: true,
    dayOfWeekActivity: true,
  },
  githubToken,
}: ContributionStatsProps) {
  // Get username and token from env or props
  const user = username || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "";
  const token = githubToken || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  // Auto-fetch contributions
  const { contributions, loading } = useGitHubContributions(user, {
    token,
    useApiRoute: !token,
  });

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-lg bg-background/50 border border-border/30"
            >
              <div className="h-4 w-12 mx-auto mb-1 bg-muted animate-pulse rounded" />
              <div className="h-6 w-8 mx-auto bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (contributions.length === 0) {
    return null;
  }

  const totalContributions = calculateTotalContributions(contributions);
  const currentStreak = calculateCurrentStreak(contributions);
  const longestStreak = calculateLongestStreak(contributions);
  const avgPerDay = calculateAverageContributions(contributions);
  const { busiestMonth } = calculateMonthlyStats(contributions);
  const mostActiveDay = getMostActiveDay(contributions);
  const { dayStats, maxCount } = calculateDayOfWeekStats(contributions);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Key Metrics Grid */}
      {sections.metrics !== false && (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
            <BarChart3 className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">
              {totalContributions.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">contributions</div>
          </div>

          <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
            <Flame className="w-5 h-5 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{currentStreak}</div>
            <div className="text-xs text-muted-foreground">day streak</div>
          </div>

          <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
            <TrendingUp className="w-5 h-5 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{longestStreak}</div>
            <div className="text-xs text-muted-foreground">best streak</div>
          </div>

          <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
            <Calendar className="w-5 h-5 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{avgPerDay.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">avg per day</div>
          </div>
        </div>
      )}

      {/* Additional Stats */}
      {sections.additionalStats !== false && (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
            <TrendingUp className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">{busiestMonth[0]}</div>
            <div className="text-xs text-muted-foreground">
              {busiestMonth[1]} contributions
            </div>
          </div>

          <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
            <Calendar className="w-5 h-5 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{mostActiveDay}</div>
            <div className="text-xs text-muted-foreground">most active day</div>
          </div>
        </div>
      )}

      {/* Day of Week Activity */}
      {sections.dayOfWeekActivity !== false && (
        <div className="bg-background/50 border border-border/30 rounded-lg p-4">
          <h5 className="text-xs font-semibold text-muted-foreground mb-3">
            Activity by Day
          </h5>
          <div className="space-y-2">
            {Object.entries(dayStats).map(([day, count]) => {
              const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
              return (
                <div key={day} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground w-8">{day}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
