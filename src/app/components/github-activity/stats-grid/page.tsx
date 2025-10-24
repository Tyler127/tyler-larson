"use client";

import { GitHubStatsGrid } from "@/components/github-activity";
import { ComponentPreview } from "../_components/component-preview";

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
      description="Grid layout for displaying multiple GitHub stats"
      code={statsGridCode}
      preview={
        <GitHubStatsGrid
          username={DEMO_USERNAME}
          animate={false}
        />
      }
    />
  );
}

