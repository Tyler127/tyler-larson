"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

interface CertificationsSectionProps {
  certifications: string[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section className="py-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <Award className="w-8 h-8 text-primary" />
          <h2 className="text-3xl sm:text-4xl font-bold">Certifications</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="p-6 text-center h-full flex items-center justify-center hover:shadow-lg transition-all duration-300">
                <p className="font-medium">{cert}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

