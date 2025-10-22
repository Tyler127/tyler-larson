"use client";

import { motion } from "framer-motion";

export function ExperienceHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            My Journey
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Over the years, I&apos;ve had the privilege to work with amazing teams
            and build incredible products. Here&apos;s my professional story.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

