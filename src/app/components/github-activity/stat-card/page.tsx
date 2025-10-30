"use client";

import { GitHubStatCard } from "@/components/github-activity";
import { ComponentPreview } from "@/components/components/component-preview";

const DEMO_USERNAME = "Tyler127";

const statCardCode = `import { GitHubStatCard } from "@/components/github-activity";

// Zero props needed! Uses NEXT_PUBLIC_GITHUB_USERNAME from .env
<GitHubStatCard type="repos" animate={true} />
<GitHubStatCard type="stars" animate={true} />

// Or override username per component
<GitHubStatCard username="another-user" type="forks" />`;

export default function StatCardPage() {
  return (
    <ComponentPreview
      title="GitHubStatCard"
      description="Display individual GitHub statistics with an icon and optional count-up animation. Perfect for highlighting key metrics like repositories, stars, forks, and followers."
      code={statCardCode}
      props={[
        {
          name: "type",
          type: "'repos' | 'stars' | 'forks' | 'followers'",
          default: "—",
          description: "The type of GitHub stat to display"
        },
        {
          name: "username",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_USERNAME",
          description: "GitHub username to fetch stats for"
        },
        {
          name: "animate",
          type: "boolean",
          default: "true",
          description: "Enable count-up animation for the stat value"
        },
        {
          name: "githubToken",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_TOKEN",
          description: "GitHub personal access token for API requests"
        }
      ]}
      preview={
        <div className="grid grid-cols-2 gap-4">
          <GitHubStatCard
            username={DEMO_USERNAME}
            type="repos"
            animate={true}
          />
          <GitHubStatCard
            username={DEMO_USERNAME}
            type="stars"
            animate={true}
          />
          <GitHubStatCard
            username={DEMO_USERNAME}
            type="forks"
            animate={false}
          />
          <GitHubStatCard
            username={DEMO_USERNAME}
            type="followers"
            animate={false}
          />
        </div>
      }
    />
  );
}

