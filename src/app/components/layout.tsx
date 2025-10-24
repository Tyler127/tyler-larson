"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const sidebarSections = [
  {
    title: "Overview",
    items: [
      { id: "overview", name: "Overview", href: "/components" },
    ]
  },
  {
    title: "GitHub Activity",
    items: [
      { id: "stat-card", name: "GitHubStatCard", href: "/components/github-activity/stat-card" },
      { id: "stats-grid", name: "GitHubStatsGrid", href: "/components/github-activity/stats-grid" },
      { id: "language-chart", name: "GitHubLanguageChart", href: "/components/github-activity/language-chart" },
      { id: "contribution-graph", name: "GitHubContributionGraph", href: "/components/github-activity/contribution-graph" },
      { id: "contribution-stats", name: "GitHubContributionStats", href: "/components/github-activity/contribution-stats" },
      { id: "activity-dashboard", name: "GitHubActivityDashboard", href: "/components/github-activity/activity-dashboard" },
      { id: "skeleton", name: "Skeleton Components", href: "/components/github-activity/skeleton" },
      { id: "installation", name: "Installation", href: "/components/github-activity/installation" },
    ]
  }
];

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Components</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mb-6 p-4 border rounded-lg bg-card">
            {sidebarSections.map((section) => (
              <div key={section.title} className="mb-6 last:mb-0">
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                  {section.title}
                </h3>
                <nav className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive
                            ? "text-foreground bg-accent font-medium border-l-2 border-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        )}

        {/* Layout with Sidebar */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                    {section.title}
                  </h3>
                  <nav className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                            isActive
                              ? "text-foreground bg-accent font-medium border-l-2 border-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          }`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

