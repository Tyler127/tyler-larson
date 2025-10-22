"use client";

import { motion } from "framer-motion";

export function ProjectsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
        My Projects
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
        A collection of my personal projects and open-source contributions.
        From game tools to productivity applications, here&apos;s what I&apos;ve been building.
      </p>
    </motion.div>
  );
}

