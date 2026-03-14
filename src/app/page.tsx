import { Hero } from "@/components/hero";
import { SkillsOrbit } from "@/components/skills-orbit"; // Updated Import
import { Projects } from "@/components/projects";
import { GithubActivity } from "@/components/github-activity";
import { Blog } from "@/components/blog";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />
      <SkillsOrbit /> {/* Updated Component */}
      <Projects />
      <GithubActivity />
      <Blog />
    </div>
  );
}