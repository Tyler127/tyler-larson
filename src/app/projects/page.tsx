"use client";

import { useEffect } from "react";
import { ProjectsHeader } from "@/components/projects/projects-header";
import { ProjectCard } from "@/components/projects/project-card";
import { GithubCTA } from "@/components/projects/github-cta";
import { projects } from "@/components/projects/projects-data";

export default function ProjectsPage() {
  // Handle hash-based scrolling after page load
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    
    const scrollToHash = () => {
      const element = document.getElementById(hash.substring(1));
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    
    // Short delay to ensure animations complete
    const timer = setTimeout(scrollToHash, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectsHeader />

        <div className="space-y-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <GithubCTA />
      </div>
    </div>
  );
}
