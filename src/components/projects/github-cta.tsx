"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function GithubCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-16 text-center"
    >
      <Card className="p-8 sm:p-12 max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <Github className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Want to See More?
        </h2>
        <p className="text-muted-foreground mb-6">
          Check out my GitHub profile for more projects, contributions, and code samples.
        </p>
        <Button asChild size="lg">
          <a
            href="https://github.com/Tyler127"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <Github className="w-5 h-5" />
            Visit My GitHub
          </a>
        </Button>
      </Card>
    </motion.div>
  );
}

