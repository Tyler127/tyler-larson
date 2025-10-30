# GitHub Activity Components - Usage Examples

## 📚 Table of Contents

- [Quick Start](#quick-start)
- [Using Individual Hooks](#using-individual-hooks)
- [Custom Styling](#custom-styling)
- [Error Handling](#error-handling)
- [With Next.js API Routes](#with-nextjs-api-routes)
- [Advanced Usage](#advanced-usage)

## Quick Start

### 1. With GitHub Token (Recommended)

The simplest way to get started - just provide a username and token:

```tsx
import { GitHubActivityDashboard } from "@/components/github-activity";

export default function ProfilePage() {
  return (
    <GitHubActivityDashboard 
      username="Tyler127"
      githubToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN}
    />
  );
}
```

### 2. Without Token (Using API Routes)

If you have Next.js API routes set up:

```tsx
import { GitHubActivityDashboard } from "@/components/github-activity";

export default function ProfilePage() {
  return (
    <GitHubActivityDashboard username="Tyler127" />
  );
}
```

## Using Individual Hooks

### Fetch All Data at Once

```tsx
"use client";

import { useGitHubActivity } from "@/components/github-activity";

export default function GitHubProfile() {
  const { stats, languages, contributions, loading, error, refetch } = 
    useGitHubActivity("Tyler127", {
      token: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
    });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>GitHub Stats</h1>
      <p>Repos: {stats?.publicRepos}</p>
      <p>Stars: {stats?.totalStars}</p>
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
}
```

### Fetch Only Stats

```tsx
"use client";

import { useGitHubStats, GitHubStatsGrid } from "@/components/github-activity";
import { Code2, Star, GitFork, Github } from "lucide-react";

export default function StatsOnly() {
  const { stats, loading, error } = useGitHubStats("Tyler127", {
    token: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  });

  if (loading || !stats) return <div>Loading...</div>;

  return (
    <GitHubStatsGrid
      stats={[
        { icon: Code2, value: stats.publicRepos, label: "Repositories" },
        { icon: Star, value: stats.totalStars, label: "Stars", iconColor: "text-yellow-500" },
        { icon: GitFork, value: stats.totalForks, label: "Forks" },
        { icon: Github, value: stats.followers, label: "Followers" },
      ]}
    />
  );
}
```

### Fetch Only Contributions

```tsx
"use client";

import { useGitHubContributions, GitHubContributionGraph } from "@/components/github-activity";

export default function ContributionsOnly() {
  const { contributions, loading } = useGitHubContributions("Tyler127", {
    token: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  });

  if (loading) return <div>Loading...</div>;

  return (
    <GitHubContributionGraph
      contributions={contributions}
      onDayClick={(date, count) => {
        console.log(`Clicked: ${date}, ${count} contributions`);
      }}
    />
  );
}
```

## Custom Styling

### Custom Colors

```tsx
import { GitHubActivityDashboard } from "@/components/github-activity";

export default function CustomColors() {
  return (
    <GitHubActivityDashboard 
      username="Tyler127"
      githubToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN}
      className="my-custom-class"
    />
  );
}
```

### Custom Contribution Graph Colors

```tsx
import { GitHubContributionGraph } from "@/components/github-activity";

export default function CustomGraphColors({ contributions }) {
  return (
    <GitHubContributionGraph
      contributions={contributions}
      colors={{
        0: "bg-gray-100 dark:bg-gray-800",
        1: "bg-purple-200 dark:bg-purple-900",
        2: "bg-purple-400 dark:bg-purple-700",
        3: "bg-purple-600 dark:bg-purple-500",
        4: "bg-purple-800 dark:bg-purple-300",
      }}
    />
  );
}
```

### Custom Language Colors

```tsx
import { GitHubLanguageChart } from "@/components/github-activity";

export default function CustomLanguageColors({ languages }) {
  return (
    <GitHubLanguageChart
      languages={languages}
      colors={{
        TypeScript: "#007acc",
        JavaScript: "#f7df1e",
        Python: "#3776ab",
        // ... more custom colors
      }}
    />
  );
}
```

## Error Handling

### With Error Boundary

```tsx
"use client";

import { useGitHubActivity, GitHubActivityDashboard } from "@/components/github-activity";
import { useEffect } from "react";

export default function GitHubWithErrorHandling() {
  const { stats, languages, contributions, loading, error } = 
    useGitHubActivity("Tyler127", {
      token: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
    });

  useEffect(() => {
    if (error) {
      // Log to error tracking service
      console.error("GitHub API Error:", error);
    }
  }, [error]);

  if (loading) {
    return <div className="p-8">Loading GitHub activity...</div>;
  }

  if (error) {
    return (
      <div className="p-8 border border-red-500 rounded-lg">
        <h3 className="text-red-500 font-bold">Failed to Load</h3>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Check your token and rate limits.
        </p>
      </div>
    );
  }

  return (
    <GitHubActivityDashboard
      stats={stats || undefined}
      languages={languages}
      contributions={contributions}
      username="Tyler127"
    />
  );
}
```

## With Next.js API Routes

### Use Existing API Routes

If you already have `/api/github-contributions` endpoint:

```tsx
import { useGitHubActivity } from "@/components/github-activity";

export default function WithAPIRoute() {
  const { stats, languages, contributions, loading } = 
    useGitHubActivity("Tyler127", {
      useApiRoute: true, // Use API route for contributions
      apiEndpoint: "/api/github-contributions", // Custom endpoint (optional)
    });

  // ... render components
}
```

## Advanced Usage

### Mix Manual and Auto-Fetched Data

```tsx
"use client";

import { GitHubActivityDashboard } from "@/components/github-activity";
import { ContributionWeek } from "@/components/github-activity";

// Provide some data manually, let others be fetched
export default function MixedData() {
  const manualContributions: ContributionWeek[] = [
    // ... your manually provided data
  ];

  return (
    <GitHubActivityDashboard 
      username="Tyler127"
      githubToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN}
      contributions={manualContributions} // Manual
      // stats and languages will be auto-fetched
    />
  );
}
```

### Selective Sections

```tsx
import { GitHubActivityDashboard } from "@/components/github-activity";

export default function SelectiveSections() {
  return (
    <GitHubActivityDashboard 
      username="Tyler127"
      githubToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN}
      showStatsGrid={true}
      showContributionGraph={true}
      showLanguageChart={false} // Hide this section
      showContributionStats={true}
    />
  );
}
```

### Check Rate Limits

```tsx
"use client";

import { checkGitHubRateLimit } from "@/components/github-activity";
import { useEffect, useState } from "react";

export default function RateLimitChecker() {
  const [rateLimit, setRateLimit] = useState<any>(null);

  useEffect(() => {
    checkGitHubRateLimit(process.env.NEXT_PUBLIC_GITHUB_TOKEN)
      .then(setRateLimit)
      .catch(console.error);
  }, []);

  if (!rateLimit) return <div>Checking rate limit...</div>;

  return (
    <div>
      <p>Remaining: {rateLimit.remaining}/{rateLimit.limit}</p>
      <p>Resets: {new Date(rateLimit.reset * 1000).toLocaleString()}</p>
    </div>
  );
}
```

### Custom Component Composition

```tsx
"use client";

import {
  useGitHubActivity,
  GitHubStatsGrid,
  GitHubContributionGraph,
  GitHubLanguageChart,
  GitHubContributionStats,
} from "@/components/github-activity";
import { Code2, Star, GitFork, Github } from "lucide-react";

export default function CustomComposition() {
  const { stats, languages, contributions, loading } = 
    useGitHubActivity("Tyler127", {
      token: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
    });

  if (loading || !stats) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      {/* Your custom header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold">My GitHub Activity</h1>
      </header>

      {/* Stats in 2 columns */}
      <GitHubStatsGrid
        stats={[
          { icon: Code2, value: stats.publicRepos, label: "Repos" },
          { icon: Star, value: stats.totalStars, label: "Stars" },
        ]}
        columns={2}
      />

      {/* Custom layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GitHubContributionGraph contributions={contributions} />
        <GitHubLanguageChart languages={languages} showBadges={false} />
      </div>

      {/* Stats at the bottom */}
      <GitHubContributionStats 
        contributions={contributions}
        sections={{
          metrics: true,
          additionalStats: false, // Hide this section
          dayOfWeekActivity: true,
        }}
      />
    </div>
  );
}
```

## Environment Variables

Create a `.env.local` file:

```bash
# GitHub Personal Access Token
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_token_here
```

> ⚠️ **Security Note**: The `NEXT_PUBLIC_` prefix makes this available on the client-side. Only use tokens with minimal permissions (`read:user`, `public_repo`).

