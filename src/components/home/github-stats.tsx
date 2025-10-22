"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Github, GitFork, Star, Code2 } from "lucide-react";
import { ContributionGraph } from "./contribution-graph";
import { ContributionStats } from "./contribution-stats";
import { useGitHubStats, useGitHubContributions } from "./queries";

export function GitHubStats() {
  const {
    stats,
    languages,
    loading: statsLoading,
  } = useGitHubStats("Tyler127");
  const { contributions } = useGitHubContributions("Tyler127");

  const loading = statsLoading;

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Github className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">GitHub Activity</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
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
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">
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
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: languageColors[language] || "#666",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GitHub Contribution Graph */}
        <div className="mt-8 pt-8 border-t border-border/30">
          <h4 className="text-base font-semibold text-muted-foreground mb-4">
            Contribution Graph
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-6 items-start">
            {/* Graph */}
            <ContributionGraph contributions={contributions} />

            {/* Stats Card */}
            <ContributionStats contributions={contributions} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
