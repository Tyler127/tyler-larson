import { ExperienceHero } from "@/components/experience/experience-hero";
import { ExperienceCard } from "@/components/experience/experience-card";
import { EducationSection } from "@/components/experience/education-section";
import { CertificationsSection } from "@/components/experience/certifications-section";
import { Separator } from "@/components/ui/separator";
import { Briefcase } from "lucide-react";
import { experiences, education, certifications } from "@/components/experience/experience-data";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen">
      <ExperienceHero />

      {/* Experience Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="w-8 h-8 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">Work Experience</h2>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-16" />
      </div>

      <EducationSection education={education} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-16" />
      </div>

      <CertificationsSection certifications={certifications} />
    </div>
  );
}
