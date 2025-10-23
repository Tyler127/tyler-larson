"use client";

import dynamic from "next/dynamic";

// Loading skeleton component
const GitHubStatsLoading = () => (
  <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-6 h-6 rounded-full bg-muted animate-pulse" />
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <div className="w-5 h-5 mx-auto mb-2 bg-muted animate-pulse rounded" />
          <div className="h-6 w-12 mx-auto mb-1 bg-muted animate-pulse rounded" />
          <div className="h-4 w-16 mx-auto bg-muted animate-pulse rounded" />
        </div>
      ))}
    </div>
  </div>
);

// Lazy load the GitHub stats component with no SSR
export const GitHubStatsLazy = dynamic(
  () => import("./github-stats").then(module => module.GitHubStats),
  { 
    ssr: false,
    loading: GitHubStatsLoading
  }
);

