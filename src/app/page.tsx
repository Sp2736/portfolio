import { Hero } from "@/components/hero";
import { SkillsOrbit } from "@/components/skills-orbit";
import { Timeline } from "@/components/timeline"; 
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications"; // NEW
import { OpenInitiative } from "@/components/open-initiative"; // NEW
import { GithubActivity } from "@/components/github-activity";
import { Blog } from "@/components/blog";
import { CoreCapabilities } from "@/components/core-capabilities"; // Add this line

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />             {/* Identity & Terminal */}
      <Projects />         {/* Active Deployments */}
      <OpenInitiative />   {/* DSA Visualizer CTA */}
      <SkillsOrbit />      {/* Technical Arsenal */}
      <Timeline />         {/* Learning Journey */}
      <CoreCapabilities /> {/* Beyond Tech Life */}
      <Certifications />   {/* The Evidence Locker */}
      <GithubActivity />   {/* Version Control Pulse */}
      <Blog />             {/* Digital Garden & Book */}
    </div>
  );
}