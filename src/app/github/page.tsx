"use client";

import { GitHubStats } from "@/components/home/github-stats";

export default function GitHubPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <GitHubStats />
      </div>
    </div>
  );
}

