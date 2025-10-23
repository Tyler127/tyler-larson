"use client";

import React, { useState, useEffect } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

interface ContributionGraphProps {
  contributions: ContributionWeek[];
  onDayClick?: (date: string, count: number) => void;
  onDayHover?: (date: string, count: number) => void;
}

export const ContributionGraph = React.memo(function ContributionGraph({
  contributions,
  onDayClick,
  onDayHover,
}: ContributionGraphProps) {

  // Always use actual contributions if available, otherwise show empty grid
  // Generate empty structure with correct number of weeks
  const emptyContributions: ContributionWeek[] = Array.from({ length: 53 }, (_, weekIdx) => ({
    days: Array.from({ length: 7 }, (_, dayIdx) => ({
      date: `empty-${weekIdx}-${dayIdx}`,
      count: 0,
      level: 0 as 0 | 1 | 2 | 3 | 4
    }))
  }));

  // Use state to manage displayed contributions so transitions work
  const [displayContributions, setDisplayContributions] = useState<ContributionWeek[]>(emptyContributions);

  useEffect(() => {
    if (contributions && contributions.length > 0) {
      // Delay slightly to ensure transition is visible
      requestAnimationFrame(() => {
        setDisplayContributions(contributions);
      });
    }
  }, [contributions]);
  const getLevelColor = (level: 0 | 1 | 2 | 3 | 4) => {
    const colors = {
      0: "bg-muted/30", // Light gray for no contributions
      1: "bg-green-200 dark:bg-green-900/40",
      2: "bg-green-400 dark:bg-green-700/60",
      3: "bg-green-600 dark:bg-green-500/80",
      4: "bg-green-700 dark:bg-green-400",
    };
    return colors[level];
  };

  const formatDate = (dateString: string) => {
    // Parse as UTC to avoid timezone shifts
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const getDayName = (dateString: string) => {
    // Parse as UTC to avoid timezone shifts
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "UTC",
    });
  };

  // Calculate month labels based on the contribution weeks
  const getMonthLabels = () => {
    const labels: { month: string; offset: number }[] = [];
    let currentMonth = "";

    displayContributions.forEach((week, weekIdx) => {
      if (week.days.length > 0) {
        const date = new Date(week.days[0].date + "T00:00:00Z");
        const monthName = date.toLocaleDateString("en-US", {
          month: "short",
          timeZone: "UTC",
        });

        // Add label if it's a new month
        if (monthName !== currentMonth) {
          labels.push({ month: monthName, offset: weekIdx });
          currentMonth = monthName;
        }
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();

  // Calculate cell size based on container
  const totalWeeks = displayContributions.length;

  return (
    <div className="w-full">
      <TooltipProvider delayDuration={0}>
        <div className="w-full">
          {/* Month labels */}
          <div className="relative mb-3 h-4 overflow-hidden">
            <div
              className="flex"
              style={{
                width: `${(totalWeeks * 100) / totalWeeks}%`,
              }}
            >
              {monthLabels.map((label, idx) => {
                const position = (label.offset / totalWeeks) * 100;
                return (
                  <div
                    key={idx}
                    className="absolute text-xs text-muted-foreground font-medium"
                    style={{ left: `${position}%` }}
                  >
                    {label.month}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 w-full">
            {/* Day labels */}
            <div className="flex flex-col justify-between text-xs text-muted-foreground py-1 flex-shrink-0">
              <div>Mon</div>
              <div>Wed</div>
              <div>Fri</div>
              <div>Sun</div>
            </div>

            {/* Contribution grid - flex to fill available space */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div
                className="grid gap-[2px] p-0.5"
                style={{
                  gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`,
                  gridAutoFlow: "column",
                  minWidth: "fit-content",
                }}
              >
                {displayContributions.map((week, weekIdx) => (
                  <div key={weekIdx} className="grid grid-rows-7 gap-[2px]">
                    {week.days.map((day, dayIdx) => (
                      <TooltipPrimitive.Root
                        key={`${weekIdx}-${dayIdx}`}
                        delayDuration={0}
                      >
                          <TooltipTrigger asChild>
                            <div
                              className={`aspect-square rounded-sm hover:ring-2 hover:ring-primary/50 cursor-pointer min-w-[10px] min-h-[10px] ${getLevelColor(day.level)}`}
                              style={{
                                transition: 'background-color 2s ease-out',
                                transitionDelay: `${(weekIdx * 7 + dayIdx) * 3}ms`
                              }}
                              onMouseEnter={() => {
                                onDayHover?.(day.date, day.count);
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                onDayClick?.(day.date, day.count);
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs font-medium">
                              {day.count}{" "}
                              {day.count === 1 ? "contribution" : "contributions"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(day.date)} • {getDayName(day.date)}
                            </p>
                          </TooltipContent>
                        </TooltipPrimitive.Root>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend - below graph on left */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
            <span>Less</span>
            <div className="flex gap-1">
              <TooltipPrimitive.Root>
                <TooltipTrigger asChild>
                  <div className="w-3 h-3 rounded-sm bg-muted cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">0 contributions</p>
                </TooltipContent>
              </TooltipPrimitive.Root>

              <TooltipPrimitive.Root>
                <TooltipTrigger asChild>
                  <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900/40 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">1-2 contributions</p>
                </TooltipContent>
              </TooltipPrimitive.Root>

              <TooltipPrimitive.Root>
                <TooltipTrigger asChild>
                  <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700/60 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">3-5 contributions</p>
                </TooltipContent>
              </TooltipPrimitive.Root>

              <TooltipPrimitive.Root>
                <TooltipTrigger asChild>
                  <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500/80 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">6-8 contributions</p>
                </TooltipContent>
              </TooltipPrimitive.Root>

              <TooltipPrimitive.Root>
                <TooltipTrigger asChild>
                  <div className="w-3 h-3 rounded-sm bg-green-700 dark:bg-green-400 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">9+ contributions</p>
                </TooltipContent>
              </TooltipPrimitive.Root>
            </div>
            <span>More</span>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
});

// Export the stats calculation function
export function calculateContributionStats(contributions: ContributionWeek[]) {
  const monthlyStats: { [month: string]: number } = {};
  let totalContributions = 0;

  contributions.forEach((week) => {
    week.days.forEach((day) => {
      totalContributions += day.count;
      const date = new Date(day.date + "T00:00:00Z");
      const monthYear = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });
      monthlyStats[monthYear] = (monthlyStats[monthYear] || 0) + day.count;
    });
  });

  // Get last 12 months
  const sortedMonths = Object.entries(monthlyStats)
    .sort(([a], [b]) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 12);

  return { totalContributions, monthlyStats: sortedMonths };
}
