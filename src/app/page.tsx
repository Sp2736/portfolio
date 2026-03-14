import { Hero } from "@/components/hero";
import { SkillsOrbit } from "@/components/skills-orbit";
import { Timeline } from "@/components/timeline"; // New Import
import { Projects } from "@/components/projects";
import { GithubActivity } from "@/components/github-activity";
import { Blog } from "@/components/blog";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />
      <SkillsOrbit />
      <Timeline /> {/* New Section */}
      <Projects />
      <GithubActivity />
      <Blog />
    </div>
  );
}