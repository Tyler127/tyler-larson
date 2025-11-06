"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { LanguageChartProps } from "@/components/github-activity/types";
import { getLanguageColor } from "@/components/github-activity/utils/colors";
import { useGitHubLanguages } from "@/components/github-activity/hooks/use-github-languages";

export function GitHubLanguageChart({
  username,
  showBadges = true,
  showBarChart = true,
  maxLanguages = 6,
  animate = true,
  className = "",
  colors,
  githubToken,
}: LanguageChartProps) {
  // Get username and token from env or props
  const user = username || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "";
  const token = githubToken || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  // Auto-fetch languages
  const { languages, loading } = useGitHubLanguages(user, { token });

  const [animateLanguages, setAnimateLanguages] = useState(animate);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimateLanguages(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  // Calculate total
  const total = Object.values(languages).reduce((sum, count) => sum + count, 0);

  // Limit to top N languages
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxLanguages);

  if (loading) {
    return (
      <div className={`bg-background/50 border border-border/30 rounded-lg p-4 ${className}`}>
        <h4 className="text-sm font-semibold text-muted-foreground mb-4">
          Most Used Languages
        </h4>
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-7 rounded-md bg-muted animate-pulse"
              style={{ width: `${80 + (i * 7) % 40}px` }}
            />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-2 bg-muted rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-background/50 border border-border/30 rounded-lg p-4 ${className}`}>
      <h4 className="text-sm font-semibold text-muted-foreground mb-4">
        Most Used Languages
      </h4>

      {/* Language Badges */}
      {showBadges && (
        <div className="flex flex-wrap gap-2">
          {topLanguages.map(([language, count], index) => {
            const percentage = ((count / total) * 100).toFixed(1);
            const color = getLanguageColor(language, colors);

            return (
              <Badge
                key={language}
                variant="outline"
                className="flex items-center gap-2 px-3 py-1 transition-opacity duration-300"
                style={{
                  borderColor: color,
                  opacity: animateLanguages ? 0 : 1,
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span>{language}</span>
                <span className="text-xs text-muted-foreground">
                  {percentage}%
                </span>
              </Badge>
            );
          })}
        </div>
      )}

      {/* Language Bar Chart */}
      {showBarChart && (
        <div className={`space-y-2 ${showBadges ? "mt-4" : ""}`}>
          {topLanguages.map(([language, count], index) => {
            const percentage = (count / total) * 100;
            const color = getLanguageColor(language, colors);

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
                    className="h-full rounded-full transition-[width] duration-500 ease-out"
                    style={{
                      width: animateLanguages ? "0%" : `${percentage}%`,
                      backgroundColor: color,
                      transitionDelay: `${index * 75}ms`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
