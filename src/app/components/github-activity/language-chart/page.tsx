"use client";

import { GitHubLanguageChart } from "@/components/github-activity";
import { ComponentPreview } from "@/components/components/component-preview";

const DEMO_USERNAME = "Tyler127";

const languageChartCode = `import { GitHubLanguageChart } from "@/components/github-activity";

// Zero props! Auto-fetches language data!
<GitHubLanguageChart />

// Customize display
<GitHubLanguageChart 
  showBadges={true}
  showBarChart={true}
  maxLanguages={6}
/>`;

export default function LanguageChartPage() {
  return (
    <ComponentPreview
      title="GitHubLanguageChart"
      description="Visualize programming language usage with badges and bar charts"
      code={languageChartCode}
      preview={
        <GitHubLanguageChart username={DEMO_USERNAME} animate={false} />
      }
    />
  );
}

