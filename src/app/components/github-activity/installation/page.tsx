"use client";

import { SyntaxHighlightedCodeBlock } from "@/components/components/syntax-highlighted-code-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings, Package, Rocket, Code2, Sparkles } from "lucide-react";

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Get started with GitHub Activity Components in your project. Follow these simple steps to integrate beautiful GitHub stats into your application.
        </p>
      </div>

      {/* Features Overview */}
      <Card className="bg-muted/30 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">What You Get</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-2">
            <li className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">✓</span>
              <span className="text-muted-foreground">Zero configuration - reads from environment variables</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">✓</span>
              <span className="text-muted-foreground">Fully customizable with Tailwind CSS</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">✓</span>
              <span className="text-muted-foreground">Real GitHub data via REST and GraphQL APIs</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">✓</span>
              <span className="text-muted-foreground">Built-in loading states and error handling</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">✓</span>
              <span className="text-muted-foreground">Automatic data fetching and caching</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">✓</span>
              <span className="text-muted-foreground">Responsive design and dark mode support</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Separator />

      {/* Step 1: Environment Setup */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
            1
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Environment Setup</h2>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardDescription>
              Add your GitHub credentials to your <code className="text-sm bg-muted px-1.5 py-0.5 rounded">.env.local</code> file:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SyntaxHighlightedCodeBlock
              code={`NEXT_PUBLIC_GITHUB_USERNAME=your-username
NEXT_PUBLIC_GITHUB_TOKEN=your-github-token`}
              language="bash"
            />
            <div className="p-4 rounded-lg bg-muted/50 border">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Note:</strong> The token is optional but recommended to avoid rate limits. Create one at{" "}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  GitHub Settings
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Step 2: Import Components */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
            2
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Import Components</h2>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardDescription>
              Import the components you need in your React/Next.js application:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SyntaxHighlightedCodeBlock
              code={`import {
  GitHubActivityDashboard,
  GitHubStatCard,
  GitHubStatsGrid,
  GitHubContributionGraph,
  GitHubContributionStats,
  GitHubLanguageChart,
} from "@/components/github-activity";`}
              language="tsx"
            />
          </CardContent>
        </Card>
      </div>

      {/* Step 3: Basic Usage */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
            3
          </div>
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Basic Usage</h2>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardDescription>
              The easiest way to get started - zero configuration needed!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SyntaxHighlightedCodeBlock code={`<GitHubActivityDashboard />`} language="tsx" />
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                🎉 <strong>That&apos;s it!</strong> The component will automatically read from your environment variables and fetch all the data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Step 4: Advanced Usage */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
            4
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Advanced Usage</h2>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardDescription>
              Override settings per component or use individual components for custom layouts:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SyntaxHighlightedCodeBlock
              code={`// Override username for a specific component
<GitHubActivityDashboard username="different-user" />

// Use individual components for custom layouts
<div className="grid md:grid-cols-2 gap-6">
  <GitHubStatsGrid />
  <GitHubLanguageChart />
</div>

<GitHubContributionGraph />
<GitHubContributionStats />`}
              language="tsx"
            />
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground">
            Now that you&apos;ve installed the components, explore the individual component pages to see all available props, customization options, and examples:
          </p>
          <ul className="space-y-2">
            <li>
              <a href="/components/github-activity/activity-dashboard" className="text-primary hover:underline">
                → GitHubActivityDashboard - Complete dashboard
              </a>
            </li>
            <li>
              <a href="/components/github-activity/stats-grid" className="text-primary hover:underline">
                → GitHubStatsGrid - Stats overview
              </a>
            </li>
            <li>
              <a href="/components/github-activity/contribution-graph" className="text-primary hover:underline">
                → GitHubContributionGraph - Contribution heatmap
              </a>
            </li>
            <li>
              <a href="/components/github-activity/overview" className="text-primary hover:underline">
                → View all components
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

