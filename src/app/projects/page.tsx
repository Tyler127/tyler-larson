import { ProjectsHeader } from "@/components/projects/projects-header";
import { ProjectCard } from "@/components/projects/project-card";
import { GithubCTA } from "@/components/projects/github-cta";
import { projects } from "@/components/projects/projects-data";

export default function ProjectsPage() {
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
