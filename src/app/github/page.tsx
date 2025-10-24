"use client";

import { GitHubActivityDashboard } from "@/components/github-activity";

export default function GitHubPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <GitHubActivityDashboard username="Tyler127" />
      </div>
    </div>
  );
}

