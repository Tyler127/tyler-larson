# GitHub Activity Components Library

A flexible, reusable component library for displaying GitHub activity statistics, contribution graphs, and language usage.

## 🚀 Features

- **Modular Components**: Use individual components or the complete dashboard
- **Customizable**: Props-based customization for colors, layout, and behavior
- **Type-Safe**: Full TypeScript support
- **Theme-Aware**: Respects Tailwind dark mode
- **Animated**: Smooth transitions and number animations
- **Accessible**: Built with accessibility in mind

## 📦 Components

### Core Components

- **GitHubStatCard**: Display a single stat with icon
- **GitHubStatsGrid**: Grid layout for multiple stats
- **GitHubContributionGraph**: GitHub-style contribution heatmap
- **GitHubContributionStats**: Detailed contribution statistics
- **GitHubLanguageChart**: Language usage visualization
- **GitHubActivityDashboard**: Complete dashboard combining all components

### Skeleton Components

- **GitHubStatCardSkeleton**: Loading state for stat cards
- **GitHubStatsGridSkeleton**: Loading state for stats grid
- **GitHubLanguageChartSkeleton**: Loading state for language chart
- **GitHubContributionGraphSkeleton**: Loading state for contribution graph
- **GitHubContributionStatsSkeleton**: Loading state for contribution stats
- **GitHubActivityDashboardSkeleton**: Complete dashboard loading state

## 🎯 Usage

### Extremely Simple! Zero Props Needed!

**Just drop them in and they work!** No username, no data, no configuration needed.

### Setup (One Time)

Add to `.env.local`:

```bash
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_token_here
```

### Complete Dashboard (Literally Just Import!)

```tsx
import { GitHubActivityDashboard } from "@/components/github-activity";

<GitHubActivityDashboard />
```

**That's it!** No props needed! The component automatically:
- Reads `NEXT_PUBLIC_GITHUB_USERNAME` from environment
- Reads `NEXT_PUBLIC_GITHUB_TOKEN` from environment
- Fetches all GitHub stats (repos, stars, forks, followers)
- Fetches language data
- Fetches contribution graph
- Shows loading states
- Handles errors gracefully

### Individual Components (Also Zero Props!)

```tsx
import {
  GitHubStatCard,
  GitHubStatsGrid,
  GitHubContributionGraph,
  GitHubLanguageChart,
  GitHubContributionStats,
} from "@/components/github-activity";

// All automatically use env variables!
<GitHubStatCard type="repos" />
<GitHubStatsGrid />
<GitHubContributionGraph />
<GitHubLanguageChart />
<GitHubContributionStats />
```

### Optional: Override Per Component

If you need to show different users, you can still pass props:

```tsx
<GitHubActivityDashboard username="different-user" />
<GitHubStatsGrid username="another-user" githubToken="custom_token" />
```


## 🎨 Customization

### Colors

```tsx
import { GitHubContributionGraph } from "@/components/github-activity";

<GitHubContributionGraph
  contributions={contributions}
  colors={{
    0: "bg-gray-100 dark:bg-gray-800",
    1: "bg-blue-200 dark:bg-blue-900",
    2: "bg-blue-400 dark:bg-blue-700",
    3: "bg-blue-600 dark:bg-blue-500",
    4: "bg-blue-800 dark:bg-blue-300",
  }}
/>
```

### Language Colors

```tsx
import { GitHubLanguageChart } from "@/components/github-activity";

<GitHubLanguageChart
  languages={languages}
  colors={{
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    // ... custom colors
  }}
/>
```

### Conditional Sections

```tsx
<GitHubActivityDashboard
  stats={stats}
  languages={languages}
  contributions={contributions}
  showStatsGrid={true}
  showContributionGraph={true}
  showLanguageChart={false}  // Hide language chart
  showContributionStats={true}
/>
```

## 📋 TypeScript Types

All types are exported and can be imported:

```tsx
import {
  GitHubStats,
  LanguageStats,
  ContributionDay,
  ContributionWeek,
  ContributionGraphProps,
  // ... more types
} from "@/components/github-activity";
```

## 🪝 Hooks

### useGitHubActivity (Recommended)

Fetches all GitHub data at once:

```tsx
import { useGitHubActivity } from "@/components/github-activity";

const { stats, languages, contributions, loading, error, refetch } = useGitHubActivity(
  "yourusername",
  {
    token: "ghp_your_token_here", // Optional but recommended
    useApiRoute: false, // Set to true to use Next.js API routes instead
    cache: true, // Enable caching (default: true)
  }
);
```

### Individual Hooks

Fetch specific data types separately:

```tsx
import {
  useGitHubStats,
  useGitHubLanguages,
  useGitHubContributions
} from "@/components/github-activity";

// Fetch basic stats (repos, stars, forks, followers)
const { stats, loading, error } = useGitHubStats("username", {
  token: "ghp_token", // Optional
});

// Fetch language statistics
const { languages, loading, error } = useGitHubLanguages("username", {
  token: "ghp_token", // Optional
});

// Fetch contribution graph data
const { contributions, loading, error } = useGitHubContributions("username", {
  token: "ghp_token", // Required unless useApiRoute is true
  useApiRoute: false, // Use Next.js API route instead of direct calls
  apiEndpoint: "/api/github-contributions", // Custom API endpoint
});
```

## 🔑 GitHub Token Setup (Required)

### Why Required?

- **Higher rate limits**: 5,000 requests/hour vs 60 without token
- **Access to GraphQL API**: Required for contribution data
- **More reliable**: Avoid rate limit issues
- **Components work automatically**: No manual data fetching needed!

### How to Get a Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `read:user` and `public_repo`
4. Copy the token and add to `.env.local`:

```bash
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_token_here
```

### Security Note

The `NEXT_PUBLIC_` prefix makes these available on the client-side. Only use tokens with minimal permissions (`read:user`, `public_repo`).

## 🛠️ Utilities

### Calculation Utilities

```tsx
import {
  calculateTotalContributions,
  calculateCurrentStreak,
  calculateLongestStreak,
  calculateAverageContributions,
  calculateMonthlyStats,
  calculateDayOfWeekStats,
  getMostActiveDay,
} from "@/components/github-activity";
```

### API Utilities

Direct GitHub API functions:

```tsx
import {
  fetchGitHubUser,
  fetchGitHubRepos,
  fetchGitHubContributionsGraphQL,
  fetchGitHubContributionsViaAPI,
  checkGitHubRateLimit,
} from "@/components/github-activity";

// Check rate limit
const rateLimit = await checkGitHubRateLimit(token);
console.log(`${rateLimit.remaining}/${rateLimit.limit} requests remaining`);
```

## 🎭 Dependencies

### Required (Peer Dependencies)
- `react` >=18
- `tailwindcss` >=3

### Optional (Peer Dependencies)
- `lucide-react` - For default icons
- `@radix-ui/react-tooltip` - For tooltips
- UI components from shadcn/ui (Button, Badge, Card, etc.)

## 🎨 Skeleton/Loading States

All components have corresponding skeleton versions for loading states:

```tsx
import {
  GitHubStatsGridSkeleton,
  GitHubActivityDashboardSkeleton,
} from "@/components/github-activity";

// Use during loading
{loading ? <GitHubStatsGridSkeleton /> : <GitHubStatsGrid stats={stats} />}
```

## 🚧 Roadmap

- [x] Core components (Phase 1)
- [x] Type definitions
- [x] Utility functions
- [x] Data fetching hooks with token support (Phase 2)
- [x] GitHub API utilities (REST & GraphQL)
- [x] Skeleton/loading components (Phase 3)
- [x] Component showcase page with examples
- [ ] npm package setup (Phase 4)
- [ ] Documentation site
- [ ] Component registry for copy-paste distribution
- [ ] More customization options
- [ ] Storybook examples

## 📄 License

MIT

