"use client";

import { GitHubStatsGrid } from "@/components/github-activity";
import { ComponentPreview } from "@/components/components/component-preview";

const DEMO_USERNAME = "Tyler127";

const statsGridCode = `import { GitHubStatsGrid } from "@/components/github-activity";

// Zero props! Auto-fetches everything!
<GitHubStatsGrid />

// Customize if needed
<GitHubStatsGrid columns={2} animate={true} />`;

export default function StatsGridPage() {
  return (
    <ComponentPreview
      title="GitHubStatsGrid"
      description="A grid layout displaying all GitHub stats at once. Combines multiple GitHubStatCard components into a responsive grid for a comprehensive stats overview."
      code={statsGridCode}
      props={[
        {
          name: "username",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_USERNAME",
          description: "GitHub username to fetch stats for"
        },
        {
          name: "columns",
          type: "number",
          default: "4",
          description: "Number of columns in the grid (responsive)"
        },
        {
          name: "animate",
          type: "boolean",
          default: "true",
          description: "Enable count-up animation for all stat values"
        },
        {
          name: "githubToken",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_TOKEN",
          description: "GitHub personal access token for API requests"
        }
      ]}
      preview={
        <GitHubStatsGrid
          username={DEMO_USERNAME}
          animate={false}
        />
      }
    />
  );
}

