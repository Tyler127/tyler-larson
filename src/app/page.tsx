import { HeroSection } from "@/components/home/hero-section";
import { WhatIDoSection } from "@/components/home/what-i-do-section";
import { CTASection } from "@/components/home/cta-section";
import { GitHubStats } from "@/components/home/github-stats";

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
