"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, BarChart3, Calendar, TrendingUp, Sparkles } from "lucide-react";

export default function ComponentsOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Component Library Overview</h2>
        <p className="text-lg text-muted-foreground">
          A collection of reusable React components designed to showcase GitHub activity, statistics, and contribution data in beautiful, customizable ways.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <CardTitle>Zero Configuration</CardTitle>
            </div>
            <CardDescription>
              Just add your GitHub username to environment variables and components auto-fetch everything
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <CardTitle>Fully Customizable</CardTitle>
            </div>
            <CardDescription>
              Built with Tailwind CSS, every component supports custom styling and theming
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <CardTitle>Real GitHub Data</CardTitle>
            </div>
            <CardDescription>
              Powered by GitHub's REST and GraphQL APIs for accurate, real-time statistics
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <CardTitle>Production Ready</CardTitle>
            </div>
            <CardDescription>
              Includes loading states, error handling, caching, and responsive design
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Component Categories */}
      <div className="space-y-6 mt-12">
        <h3 className="text-2xl font-bold">Available Components</h3>
        
        <Card>
          <CardHeader>
            <CardTitle>GitHub Activity Components</CardTitle>
            <CardDescription>
              Display GitHub statistics, contribution graphs, language usage, and more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ComponentLink
                href="/components/github-activity/stat-card"
                title="GitHubStatCard"
                description="Display individual stats like repos, stars, forks"
              />
              <ComponentLink
                href="/components/github-activity/stats-grid"
                title="GitHubStatsGrid"
                description="Grid layout for multiple statistics"
              />
              <ComponentLink
                href="/components/github-activity/contribution-graph"
                title="GitHubContributionGraph"
                description="GitHub-style contribution heatmap"
              />
              <ComponentLink
                href="/components/github-activity/contribution-stats"
                title="GitHubContributionStats"
                description="Detailed contribution metrics and patterns"
              />
              <ComponentLink
                href="/components/github-activity/language-chart"
                title="GitHubLanguageChart"
                description="Programming language usage visualization"
              />
              <ComponentLink
                href="/components/github-activity/activity-dashboard"
                title="GitHubActivityDashboard"
                description="Complete dashboard with all components"
              />
            </div>
            <div className="mt-6 pt-6 border-t">
              <Link
                href="/components/github-activity/installation"
                className="text-primary hover:underline font-medium"
              >
                View Installation Guide →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start */}
      <Card className="mt-8 bg-muted/50">
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">1. Add to your .env.local:</p>
            <pre className="p-4 rounded-lg bg-background border text-sm">
              <code>{`NEXT_PUBLIC_GITHUB_USERNAME=your-username
NEXT_PUBLIC_GITHUB_TOKEN=your-token`}</code>
            </pre>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">2. Import and use:</p>
            <pre className="p-4 rounded-lg bg-background border text-sm">
              <code>{`import { GitHubActivityDashboard } from "@/components/github-activity";

<GitHubActivityDashboard />`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ComponentLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="block p-4 rounded-lg border hover:border-primary hover:bg-accent transition-colors"
    >
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}

