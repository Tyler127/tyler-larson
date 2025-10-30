"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Boxes, Rocket, Palette } from "lucide-react";

export default function ComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Components Library</h1>
        <p className="text-xl text-muted-foreground">
          A collection of production-ready, reusable React components built for modern web applications. Each component is designed with flexibility, performance, and developer experience in mind.
        </p>
      </div>

      {/* Key Benefits */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              <CardTitle>Production Ready</CardTitle>
            </div>
            <CardDescription>
              Battle-tested components with built-in error handling, loading states, and responsive design
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <CardTitle>Developer Friendly</CardTitle>
            </div>
            <CardDescription>
              Fully typed with TypeScript, documented with examples, and easy to customize
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <CardTitle>Beautifully Designed</CardTitle>
            </div>
            <CardDescription>
              Modern UI with Tailwind CSS, dark mode support, and consistent design patterns
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Boxes className="w-5 h-5 text-primary" />
              <CardTitle>Modular & Composable</CardTitle>
            </div>
            <CardDescription>
              Mix and match components to build exactly what you need without unnecessary bloat
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Component Categories */}
      <div className="space-y-6 mt-16">
        <h2 className="text-3xl font-bold">Component Categories</h2>
        <p className="text-muted-foreground">
          Browse through different component categories to find what you need for your project.
        </p>
        
        <div className="grid gap-6 mt-8">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl">GitHub Activity Components</CardTitle>
              <CardDescription className="text-base">
                Comprehensive suite of components for displaying GitHub statistics, contribution graphs, language usage, and activity metrics. Perfect for developer portfolios, team dashboards, and project showcases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Includes:</span>
                  <span className="text-muted-foreground">
                    Stat Cards, Contribution Graphs, Language Charts, Activity Dashboards, and more
                  </span>
                </div>
                <Link
                  href="/components/github-activity/overview"
                  className="inline-flex items-center text-primary hover:underline font-medium"
                >
                  Explore GitHub Activity Components →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Use These Components */}
      <Card className="mt-16 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-2xl">Why Use These Components?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold mb-1">Save Development Time</h4>
              <p className="text-sm text-muted-foreground">
                Skip the boilerplate and focus on what matters. These components handle the complex logic so you don't have to.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Maintain Consistency</h4>
              <p className="text-sm text-muted-foreground">
                Built with shared design patterns and principles to ensure a cohesive user experience across your application.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Learn Best Practices</h4>
              <p className="text-sm text-muted-foreground">
                Each component demonstrates modern React patterns, TypeScript usage, and performance optimizations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Built for Real Projects</h4>
              <p className="text-sm text-muted-foreground">
                These aren't just demos—they're production-grade components used in real applications, including this portfolio site.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <div className="mt-16 p-6 border rounded-lg bg-card">
        <h3 className="text-xl font-bold mb-3">Getting Started</h3>
        <p className="text-muted-foreground mb-4">
          Each component category has its own documentation, installation guide, and usage examples. Select a category from the sidebar to get started.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/components/github-activity/overview">
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Browse Components
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

