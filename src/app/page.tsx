import { HeroSection } from "@/components/home/hero-section";
import { WhatIDoSection } from "@/components/home/what-i-do-section";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Gradient Transition */}
      <div className="h-48 bg-gradient-to-b from-background via-background/50 to-secondary/30 -mt-1"></div>

      <WhatIDoSection />

      

      <CTASection />
    </div>
  );
}
