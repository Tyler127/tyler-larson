"use client";

import { GitHubActivityDashboard } from "@/components/github-activity";
import { ComponentPreview } from "../_components/component-preview";

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
      description="Complete dashboard combining all components with auto-fetch capability"
      code={dashboardCode}
      preview={
        <GitHubActivityDashboard username={DEMO_USERNAME} />
      }
    />
  );
}

