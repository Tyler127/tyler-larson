"use client";

import { GitHubContributionStats } from "@/components/github-activity";
import { ComponentPreview } from "@/components/components/component-preview";

const DEMO_USERNAME = "Tyler127";

const contributionStatsCode = `import { GitHubContributionStats } from "@/components/github-activity";

// Zero props! Auto-fetches everything!
<GitHubContributionStats />

// Customize sections
<GitHubContributionStats 
  sections={{
    metrics: true,
    additionalStats: false,
    dayOfWeekActivity: true,
  }}
/>`;

export default function ContributionStatsPage() {
  return (
    <ComponentPreview
      title="GitHubContributionStats"
      description="Detailed contribution statistics including streaks and activity patterns"
      code={contributionStatsCode}
      preview={
        <GitHubContributionStats username={DEMO_USERNAME} />
      }
    />
  );
}

