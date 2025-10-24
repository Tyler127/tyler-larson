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
      description="Loading states for all components"
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

