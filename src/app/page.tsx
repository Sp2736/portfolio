import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />
      <Projects />
      {/* Next components will go here */}
      <div className="h-40 w-full"></div> {/* Bottom spacer */}
    </div>
  );
}