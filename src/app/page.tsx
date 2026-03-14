import { Hero } from "@/components/hero";
import { SkillsOrbit } from "@/components/skills-orbit";
import { Timeline } from "@/components/timeline"; 
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications"; // NEW
import { OpenInitiative } from "@/components/open-initiative"; // NEW
import { GithubActivity } from "@/components/github-activity";
import { Blog } from "@/components/blog";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />             {/* Identity & Terminal */}
      <SkillsOrbit />      {/* Technical Arsenal */}
      <Timeline />         {/* Learning Journey */}
      <Projects />         {/* Active Deployments */}
      <Certifications />   {/* The Evidence Locker */}
      <OpenInitiative />   {/* DSA Visualizer CTA */}
      <GithubActivity />   {/* Version Control Pulse */}
      <Blog />             {/* Digital Garden & Book */}
    </div>
  );
}