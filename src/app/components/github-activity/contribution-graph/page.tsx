"use client";

import { GitHubContributionGraph } from "@/components/github-activity";
import { ComponentPreview } from "../_components/component-preview";

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
      description="GitHub-style contribution heatmap with tooltips and customizable colors"
      code={contributionGraphCode}
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

