"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/hero-section";
import { WhatIDoSection } from "@/components/home/what-i-do-section";
import { CTASection } from "@/components/home/cta-section";

// Lazy load the heavy GitHub stats component with no SSR
const GitHubStats = dynamic(
  () => import("@/components/home/github-stats").then(module => module.GitHubStats),
  { 
    ssr: false,
    loading: () => (
      <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-6 h-6 rounded-full bg-muted animate-pulse" />
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
              <div className="w-5 h-5 mx-auto mb-2 bg-muted animate-pulse rounded" />
              <div className="h-6 w-12 mx-auto mb-1 bg-muted animate-pulse rounded" />
              <div className="h-4 w-16 mx-auto bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }
);

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* GitHub Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3/4">
          <GitHubStats />
        </div>
      </section>
      
      <HeroSection />

      {/* Gradient Transition */}
      <div className="h-48 bg-gradient-to-b from-background via-background/50 to-secondary/30 -mt-1"></div>

      <WhatIDoSection />

      

      <CTASection />
    </div>
  );
}
