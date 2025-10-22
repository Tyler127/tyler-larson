"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Award, Code2 } from "lucide-react";
import { Experience } from "./experience-data";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-2xl font-semibold mb-2">
              {experience.title}
            </h3>
            <p className="text-lg text-primary font-medium">
              {experience.company}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{experience.period}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{experience.location}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4">
          {experience.description}
        </p>

        <div className="mb-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            Key Achievements
          </h4>
          <ul className="space-y-1 ml-6">
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-muted-foreground list-disc"
              >
                {achievement}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge variant="secondary">{skill}</Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

