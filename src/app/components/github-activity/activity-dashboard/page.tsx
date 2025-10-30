"use client";

import { GitHubActivityDashboard } from "@/components/github-activity";
import { ComponentPreview } from "@/components/components/component-preview";

const DEMO_USERNAME = "Tyler127";

const dashboardCode = `import { GitHubActivityDashboard } from "@/components/github-activity";

// ZERO PROPS! That's it!
<GitHubActivityDashboard />

// Reads from .env automatically:
// - NEXT_PUBLIC_GITHUB_USERNAME
// - NEXT_PUBLIC_GITHUB_TOKEN

// Or override for different user
<GitHubActivityDashboard username="different-user" />

// Override token too
<GitHubActivityDashboard 
  username="another-user"
  githubToken="custom_token"
/>`;

export default function ActivityDashboardPage() {
  return (
    <ComponentPreview
      title="GitHubActivityDashboard"
      description="All-in-one GitHub activity dashboard combining stats grid, contribution graph, contribution stats, and language chart. Perfect for developer portfolios and profile pages."
      code={dashboardCode}
      props={[
        {
          name: "username",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_USERNAME",
          description: "GitHub username to display activity for"
        },
        {
          name: "githubToken",
          type: "string",
          default: "env.NEXT_PUBLIC_GITHUB_TOKEN",
          description: "GitHub personal access token for API requests"
        }
      ]}
      preview={
        <GitHubActivityDashboard username={DEMO_USERNAME} />
      }
    />
  );
}

