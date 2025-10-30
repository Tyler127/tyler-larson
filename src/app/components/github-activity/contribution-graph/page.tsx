"use client";

import { GitHubContributionGraph } from "@/components/github-activity";
import { ComponentPreview } from "@/components/components/component-preview";

const DEMO_USERNAME = "Tyler127";

const contributionGraphCode = `import { GitHubContributionGraph } from "@/components/github-activity";

// Zero props! Auto-fetches contribution data!
<GitHubContributionGraph />

// Add event handlers
<GitHubContributionGraph
  onDayClick={(date, count) => {
    console.log(\`Clicked: \${date}, \${count} contributions\`);
  }}
  showLegend={true}
/>`;

export default function ContributionGraphPage() {
  return (
    <ComponentPreview
      title="GitHubContributionGraph"
      description="GitHub-style contribution heatmap displaying a year of activity. Features interactive tooltips, customizable colors, and detailed day-by-day contribution data."
      code={contributionGraphCode}
      props={[
        {
          name: "username",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_USERNAME",
          description: "GitHub username to fetch contributions for"
        },
        {
          name: "githubToken",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_TOKEN",
          description: "GitHub personal access token for GraphQL API"
        },
        {
          name: "onDayClick",
          type: "(date: string, count: number) => void",
          default: "undefined",
          description: "Callback when a day cell is clicked"
        },
        {
          name: "showLegend",
          type: "boolean",
          default: "true",
          description: "Show contribution level legend"
        }
      ]}
      preview={
        <div className="overflow-x-auto">
          <GitHubContributionGraph
            username={DEMO_USERNAME}
            onDayClick={(date, count) => {
              console.log(`Clicked: ${date}, ${count} contributions`);
            }}
          />
        </div>
      }
    />
  );
}

