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
      description="Display a single stat with an icon and optional animation"
      code={statCardCode}
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

