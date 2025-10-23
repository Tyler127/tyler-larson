"use client";

import {
  calculateContributionStats,
  ContributionWeek,
} from "./contribution-graph";
import { TrendingUp, Flame, Calendar, BarChart3 } from "lucide-react";

interface ContributionStatsProps {
  contributions: ContributionWeek[];
}

// Calculate streak information
function calculateStreaks(contributions: ContributionWeek[]) {
  const allDays = contributions.flatMap((week) => week.days);
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Sort by date descending to find current streak
  const sortedDays = [...allDays].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Calculate current streak (from most recent day)
  for (let i = 0; i < sortedDays.length; i++) {
    if (sortedDays[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calculate longest streak
  for (const day of allDays) {
    if (day.count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return { currentStreak, longestStreak };
}

// Calculate day of week stats
function calculateDayOfWeekStats(contributions: ContributionWeek[]) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayStats: { [key: string]: number } = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };

  contributions.forEach((week) => {
    week.days.forEach((day) => {
      const date = new Date(day.date + "T00:00:00Z");
      const dayName = dayNames[date.getUTCDay()];
      dayStats[dayName] += day.count;
    });
  });

  const maxCount = Math.max(...Object.values(dayStats));
  return { dayStats, maxCount };
}

// Calculate average contributions per day
function calculateAverages(contributions: ContributionWeek[]) {
  const allDays = contributions.flatMap((week) => week.days);
  const totalContributions = allDays.reduce((sum, day) => sum + day.count, 0);
  
  const avgPerDay = totalContributions / allDays.length;

  return { avgPerDay };
}

export function ContributionStats({ contributions }: ContributionStatsProps) {
  if (contributions.length === 0) {
    return null;
  }

  const { totalContributions, monthlyStats } =
    calculateContributionStats(contributions);
  const { currentStreak, longestStreak } = calculateStreaks(contributions);
  const { dayStats, maxCount } = calculateDayOfWeekStats(contributions);
  const { avgPerDay } = calculateAverages(contributions);

  // Find busiest month
  const busiestMonth =
    monthlyStats.length > 0
      ? monthlyStats.reduce((max, curr) => (curr[1] > max[1] ? curr : max))
      : ["N/A", 0];

  return (
    <div className="space-y-4">
      {/* Key Metrics Grid - 2x2 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Contributions */}
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <BarChart3 className="w-5 h-5 mx-auto mb-2 text-primary" />
          <div className="text-2xl font-bold">{totalContributions.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">contributions</div>
        </div>

        {/* Current Streak */}
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <Flame className="w-5 h-5 mx-auto mb-2 text-orange-500" />
          <div className="text-2xl font-bold">{currentStreak}</div>
          <div className="text-xs text-muted-foreground">day streak</div>
        </div>

        {/* Longest Streak */}
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <TrendingUp className="w-5 h-5 mx-auto mb-2 text-green-500" />
          <div className="text-2xl font-bold">{longestStreak}</div>
          <div className="text-xs text-muted-foreground">best streak</div>
        </div>

        {/* Daily Average */}
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <Calendar className="w-5 h-5 mx-auto mb-2 text-blue-500" />
          <div className="text-2xl font-bold">{avgPerDay.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground">avg per day</div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Busiest Month */}
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <TrendingUp className="w-5 h-5 mx-auto mb-2 text-primary" />
          <div className="text-lg font-bold">{busiestMonth[0]}</div>
          <div className="text-xs text-muted-foreground">{busiestMonth[1]} contributions</div>
        </div>

        {/* Most Active Day */}
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <Calendar className="w-5 h-5 mx-auto mb-2 text-purple-500" />
          <div className="text-2xl font-bold">
            {Object.entries(dayStats).reduce((max, curr) => 
              curr[1] > max[1] ? curr : max
            )[0]}
          </div>
          <div className="text-xs text-muted-foreground">most active day</div>
        </div>
      </div>

      {/* Day of Week Activity */}
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
    </div>
  );
}
