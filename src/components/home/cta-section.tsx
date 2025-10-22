"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let&apos;s Build Something Amazing
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Interested in working together? Check out my experience and
            resume, or get in touch!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/experience">View Experience</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/resume">Download Resume</Link>
            </Button>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

