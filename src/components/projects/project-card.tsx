"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Code2, Download, Calendar } from "lucide-react";
import Image from "next/image";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  stars: number;
  license: string;
  highlights: string[];
  release?: {
    version: string;
    date: string;
    name: string;
    downloadUrl: string;
  };
  screenshots: Array<string | { src: string; label?: string }>;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Project Info */}
          <div className="flex flex-col lg:col-span-1">
            {/* Project Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-3">
                <Code2 className="w-8 h-8 text-primary flex-shrink-0" />
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {project.license}
                  </Badge>
                  {project.stars > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      ⭐ {project.stars}
                    </Badge>
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Features and Release Section */}
            <div className="mb-6 flex-grow">
              <div className="grid grid-cols-1 gap-4">
                {/* Key Features Card */}
                <Card className="p-4 bg-secondary/30">
                  <h4 className="font-semibold mb-3 text-sm text-primary flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Latest Release Card */}
                {project.release ? (
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <h4 className="font-semibold mb-3 text-sm text-primary flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Latest Release
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-lg font-bold text-foreground">
                          {project.release.version}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {project.release.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{project.release.date}</span>
                      </div>
                      <Button asChild size="sm" className="w-full mt-2">
                        <a
                          href={project.release.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-4 bg-muted/30 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground text-center">
                      No releases yet
                    </p>
                  </Card>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto">
              <Button asChild className="w-full">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>

          {/* Right Side - Screenshots */}
          <div className="flex flex-col gap-4 lg:col-span-2 h-full">
            {project.screenshots && project.screenshots.length > 0 ? (
              <>
                {project.screenshots.map((screenshot, i) => {
                  const screenshotSrc = typeof screenshot === 'string' ? screenshot : screenshot.src;
                  const screenshotLabel = typeof screenshot === 'object' && screenshot.label ? screenshot.label : null;
                  
                  return (
                    <div 
                      key={i} 
                      className={`rounded-lg overflow-hidden border border-border relative w-full ${
                        i === 0 ? 'flex-[3]' : 'flex-1'
                      }`}
                    >
                      <Image
                        src={screenshotSrc}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        className="object-contain bg-muted"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      {screenshotLabel && (
                        <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-3">
                          <p className="text-xs text-muted-foreground text-center">
                            {screenshotLabel}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="rounded-lg border border-border border-dashed bg-muted/30 flex items-center justify-center h-full min-h-[300px]">
                <p className="text-center text-muted-foreground">
                  No screenshots available yet
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

