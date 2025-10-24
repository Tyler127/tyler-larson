"use client";

import React, { useState, useEffect } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContributionGraphProps } from "../types";
import { getContributionLevelColor } from "../utils/colors";
import { useGitHubContributions } from "../hooks/use-github-contributions";

export function GitHubContributionGraph({
  username,
  onDayClick,
  onDayHover,
  colors,
  className = "",
  showLegend = true,
  showMonthLabels = true,
  showDayLabels = true,
  githubToken,
}: ContributionGraphProps) {
  // Get username and token from env or props
  const user = username || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "";
  const token = githubToken || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  // Auto-fetch contributions
  const { contributions, loading } = useGitHubContributions(user, {
    token,
    useApiRoute: !token, // Use API route if no token
  });

  // Generate empty structure for initial render
  const emptyContributions = Array.from({ length: 53 }, (_, weekIdx) => ({
    days: Array.from({ length: 7 }, (_, dayIdx) => ({
      date: `empty-${weekIdx}-${dayIdx}`,
      count: 0,
      level: 0 as 0 | 1 | 2 | 3 | 4,
    })),
  }));

  // Use state to manage displayed contributions for transitions
  const [displayContributions, setDisplayContributions] =
    useState(emptyContributions);

  useEffect(() => {
    if (contributions && contributions.length > 0) {
      requestAnimationFrame(() => {
        setDisplayContributions(contributions);
      });
    }
  }, [contributions]);

  const getLevelColor = (level: 0 | 1 | 2 | 3 | 4) => {
    return getContributionLevelColor(level, colors);
  };

  const formatDate = (dateString: string) => {
    if (dateString.startsWith("empty")) return "";
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
    if (dateString.startsWith("empty")) return "";
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "UTC",
    });
  };

  // Calculate month labels
  const getMonthLabels = () => {
    const labels: { month: string; offset: number }[] = [];
    let currentMonth = "";

    displayContributions.forEach((week, weekIdx) => {
      if (week.days.length > 0 && !week.days[0].date.startsWith("empty")) {
        const date = new Date(week.days[0].date + "T00:00:00Z");
        const monthName = date.toLocaleDateString("en-US", {
          month: "short",
          timeZone: "UTC",
        });

        if (monthName !== currentMonth) {
          labels.push({ month: monthName, offset: weekIdx });
          currentMonth = monthName;
        }
      }
    });

    return labels;
  };

  const monthLabels = showMonthLabels ? getMonthLabels() : [];
  const totalWeeks = displayContributions.length;

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="w-full">
          {/* Skeleton */}
          <div className="relative mb-3 h-4 overflow-hidden">
            <div className="flex gap-4">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                <div key={month} className="text-xs text-muted-foreground font-medium">
                  {month}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col justify-between py-1 text-xs text-muted-foreground">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="flex-1 overflow-x-auto">
              <div
                className="grid gap-[2px] p-0.5"
                style={{
                  gridTemplateColumns: "repeat(53, 1fr)",
                  gridAutoFlow: "column",
                  minWidth: "fit-content",
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
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <TooltipProvider delayDuration={0}>
        <div className="w-full">
          {/* Month labels */}
          {showMonthLabels && (
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
          )}

          <div className="flex gap-2 w-full">
            {/* Day labels */}
            {showDayLabels && (
              <div className="flex flex-col justify-between text-xs text-muted-foreground py-1 flex-shrink-0">
                <div>Mon</div>
                <div>Wed</div>
                <div>Fri</div>
                <div>Sun</div>
              </div>
            )}

            {/* Contribution grid */}
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
                              transition: "background-color 2s ease-out",
                              transitionDelay: `${(weekIdx * 7 + dayIdx) * 3}ms`,
                            }}
                            onMouseEnter={() => {
                              if (onDayHover && !day.date.startsWith("empty")) {
                                onDayHover(day.date, day.count);
                              }
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              if (onDayClick && !day.date.startsWith("empty")) {
                                onDayClick(day.date, day.count);
                              }
                            }}
                          />
                        </TooltipTrigger>
                        {!day.date.startsWith("empty") && (
                          <TooltipContent>
                            <p className="text-xs font-medium">
                              {day.count}{" "}
                              {day.count === 1 ? "contribution" : "contributions"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(day.date)} • {getDayName(day.date)}
                            </p>
                          </TooltipContent>
                        )}
                      </TooltipPrimitive.Root>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          {showLegend && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <TooltipPrimitive.Root key={level}>
                    <TooltipTrigger asChild>
                      <div
                        className={`w-3 h-3 rounded-sm cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all ${getLevelColor(level as 0 | 1 | 2 | 3 | 4)}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        {level === 0 && "0 contributions"}
                        {level === 1 && "1-2 contributions"}
                        {level === 2 && "3-5 contributions"}
                        {level === 3 && "6-8 contributions"}
                        {level === 4 && "9+ contributions"}
                      </p>
                    </TooltipContent>
                  </TooltipPrimitive.Root>
                ))}
              </div>
              <span>More</span>
            </div>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
}
