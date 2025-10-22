"use client";

import {
  calculateContributionStats,
  ContributionWeek,
} from "./contribution-graph";

interface ContributionStatsProps {
  contributions: ContributionWeek[];
}

export function ContributionStats({ contributions }: ContributionStatsProps) {
  if (contributions.length === 0) {
    return null;
  }

  const { totalContributions, monthlyStats } =
    calculateContributionStats(contributions);

  return (
    <div className="bg-background/50 border border-border/30 rounded-lg p-4 h-fit">
      <h4 className="text-sm font-semibold mb-4">Contribution Stats</h4>

      {/* Total for the year */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-primary">
          {totalContributions}
        </div>
        <div className="text-xs text-muted-foreground">
          contributions this year
        </div>
      </div>

      {/* Monthly breakdown */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-muted-foreground mb-2">
          By Month
        </div>
        <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1">
          {monthlyStats.map(([month, count]) => (
            <div
              key={month}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground">{month}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
