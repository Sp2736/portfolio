import { Hero } from "@/components/hero";
import { SkillsTree } from "@/components/skills-tree";
import { Projects } from "@/components/projects";
import { Blog } from "@/components/blog";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />
      <SkillsTree />
      <Projects />
      <Blog />
    </div>
  );
}