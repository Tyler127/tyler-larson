"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Linkedin, Github, Globe, MapPin } from "lucide-react";
import { ResumeHeader } from "@/components/resume/resume-header";
import { downloadResume } from "@/components/resume/download-resume";
import { contactInfo, skills } from "@/components/resume/resume-data";

const iconMap = {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
};

export default function ResumePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <ResumeHeader onDownload={downloadResume} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 sm:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Tyler Larson
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Full Stack Developer
              </p>
              
              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {contactInfo.map((item, index) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="truncate">{item.label}</span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Professional Summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">Professional Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experienced Full Stack Developer with 7+ years of expertise in
                building scalable web applications. Passionate about creating
                elegant solutions and mentoring team members. Proven track record
                of delivering high-quality software that drives business value.
              </p>
            </motion.section>

            <Separator className="my-8" />

            {/* Technical Skills */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
              <div className="grid gap-6">
                {Object.entries(skills).map(([category, items], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-semibold mb-3 text-primary">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill, i) => (
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
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <Separator className="my-8" />

            {/* Work Experience Summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-6">Work Experience</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-semibold">
                        Senior Full Stack Developer
                      </h4>
                      <p className="text-primary font-medium">
                        Tech Innovations Inc.
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      2022 - Present
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    San Francisco, CA
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>Increased application performance by 40%</li>
                    <li>Led migration to microservices architecture</li>
                    <li>Reduced deployment time by 60% with CI/CD</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-semibold">
                        Full Stack Developer
                      </h4>
                      <p className="text-primary font-medium">
                        Digital Solutions Co.
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      2020 - 2022
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    Austin, TX
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>Built applications serving 100K+ users</li>
                    <li>Reduced bug count by 35%</li>
                    <li>Integrated third-party APIs</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-semibold">Frontend Developer</h4>
                      <p className="text-primary font-medium">StartUp Ventures</p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      2018 - 2020
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">Remote</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>Created reusable component library</li>
                    <li>Improved page load time by 50%</li>
                    <li>Achieved WCAG 2.1 AA compliance</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <Separator className="my-8" />

            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">Education</h3>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold">
                    Bachelor of Science in Computer Science
                  </h4>
                  <p className="text-primary font-medium">
                    University of Technology
                  </p>
                  <p className="text-muted-foreground text-sm">Boston, MA</p>
                  <Badge variant="outline" className="mt-2">
                    Magna Cum Laude
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  2014 - 2018
                </span>
              </div>
            </motion.section>

            <Separator className="my-8" />

            {/* Certifications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Certifications</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>AWS Certified Solutions Architect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Google Cloud Professional Developer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>MongoDB Certified Developer</span>
                </li>
              </ul>
            </motion.section>
          </Card>
        </motion.div>

        {/* Bottom Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <ResumeHeader onDownload={downloadResume} />
          <p className="text-sm text-muted-foreground mt-4">
            Download as HTML file (can be printed or converted to PDF)
          </p>
        </motion.div>
      </div>
    </div>
  );
}
