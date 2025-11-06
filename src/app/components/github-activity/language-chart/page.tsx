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
      description="Visualize programming language usage across repositories with color-coded badges and horizontal bar charts. Shows percentage breakdown of languages used."
      code={languageChartCode}
      props={[
        {
          name: "username",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_USERNAME",
          description: "GitHub username to analyze language usage for"
        },
        {
          name: "githubToken",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_TOKEN",
          description: "GitHub personal access token for API requests"
        },
        {
          name: "showBadges",
          type: "boolean",
          default: "true",
          description: "Display language badges with colors"
        },
        {
          name: "showBarChart",
          type: "boolean",
          default: "true",
          description: "Display horizontal bar chart"
        },
        {
          name: "maxLanguages",
          type: "number",
          default: "5",
          description: "Maximum number of languages to display"
        },
        {
          name: "animate",
          type: "boolean",
          default: "true",
          description: "Enable bar chart animation"
        }
      ]}
      preview={
        <GitHubLanguageChart username={DEMO_USERNAME} animate={false} />
      }
    />
  );
}

