"use client";

import { CodeBlock } from "@/components/components/code-block";

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Installation</h2>
        <p className="text-muted-foreground">
          Get started with GitHub Activity Components in your project
        </p>
      </div>

      <div className="space-y-6">
        {/* Environment Setup */}
        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Environment Setup</h3>
          <p className="text-muted-foreground">
            Add your GitHub credentials to your <code>.env.local</code> file:
          </p>
          <CodeBlock
            code={`NEXT_PUBLIC_GITHUB_USERNAME=your-username
NEXT_PUBLIC_GITHUB_TOKEN=your-github-token`}
          />
          <p className="text-sm text-muted-foreground">
            The token is optional but recommended to avoid rate limits. Create one at{" "}
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub Settings
            </a>
          </p>
        </section>

        {/* Import Components */}
        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Import Components</h3>
          <CodeBlock
            code={`import {
  GitHubActivityDashboard,
  GitHubStatCard,
  GitHubStatsGrid,
  GitHubContributionGraph,
  GitHubContributionStats,
  GitHubLanguageChart,
} from "@/components/github-activity";`}
          />
        </section>

        {/* Basic Usage */}
        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-muted-foreground">
            The easiest way to get started - zero configuration needed!
          </p>
          <CodeBlock code={`<GitHubActivityDashboard />`} />
          <p className="text-sm text-muted-foreground mt-2">
            Just import and use - no configuration needed!
          </p>
        </section>

        {/* Advanced Usage */}
        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Advanced Usage</h3>
          <p className="text-muted-foreground">Override username or token per component:</p>
          <CodeBlock
            code={`// Override username
<GitHubActivityDashboard username="different-user" />

// Use individual components
<GitHubStatsGrid />
<GitHubContributionGraph />
<GitHubLanguageChart />`}
          />
        </section>

        {/* Features */}
        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Features</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>🚀 Zero configuration - reads from environment variables</li>
            <li>🎨 Fully customizable with Tailwind CSS</li>
            <li>📊 Real GitHub data via REST and GraphQL APIs</li>
            <li>⚡ Built-in loading states and error handling</li>
            <li>🔄 Automatic data fetching and caching</li>
            <li>📱 Responsive design out of the box</li>
            <li>🌙 Dark mode support</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

