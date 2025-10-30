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
      description="Comprehensive contribution analytics including current streak, longest streak, total contributions, busiest day, and day-of-week activity patterns. Perfect for showcasing coding consistency."
      code={contributionStatsCode}
      props={[
        {
          name: "username",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_USERNAME",
          description: "GitHub username to analyze contributions for"
        },
        {
          name: "githubToken",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_TOKEN",
          description: "GitHub personal access token for GraphQL API"
        },
        {
          name: "sections",
          type: "{ metrics?: boolean; additionalStats?: boolean; dayOfWeekActivity?: boolean; }",
          default: "{ metrics: true, additionalStats: true, dayOfWeekActivity: true }",
          description: "Control which sections to display"
        }
      ]}
      preview={
        <GitHubContributionStats username={DEMO_USERNAME} />
      }
    />
  );
}

