"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code, Rocket, Sparkles, LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Code,
    title: "Full Stack Development",
    description:
      "Building robust applications from frontend to backend with modern technologies",
  },
  {
    icon: Sparkles,
    title: "UI/UX Design",
    description:
      "Creating beautiful, intuitive interfaces that users love to interact with",
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description:
      "Ensuring applications run smoothly and efficiently at scale",
  },
];

export function WhatIDoSection() {
  return (
    <section className="py-20 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            What I Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized in creating innovative solutions across the full stack
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group">
                <item.icon className="w-12 h-12 mb-4 text-primary group-hover:text-primary/80 transition-colors" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

