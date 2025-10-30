"use client";

import { GitHubStatCardSkeleton, GitHubStatsGridSkeleton } from "@/components/github-activity";
import { ComponentPreview } from "@/components/components/component-preview";

const skeletonCode = `import { 
  GitHubStatCardSkeleton,
  GitHubStatsGridSkeleton,
  GitHubActivityDashboardSkeleton,
} from "@/components/github-activity";

// Loading states are automatic!
// But you can use them separately for custom loading UIs
<GitHubStatsGridSkeleton />
<GitHubActivityDashboardSkeleton />`;

export default function SkeletonPage() {
  return (
    <ComponentPreview
      title="Skeleton Components"
      description="Animated loading states for all GitHub Activity components. These are displayed automatically while data is being fetched, but can also be used independently for custom loading UIs."
      code={skeletonCode}
      preview={
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">GitHubStatCardSkeleton</h4>
            <GitHubStatCardSkeleton />
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">GitHubStatsGridSkeleton</h4>
            <GitHubStatsGridSkeleton />
          </div>
        </div>
      }
    />
  );
}

