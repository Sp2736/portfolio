"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Hero } from "@/components/hero";
import { SkillsOrbit } from "@/components/skills-orbit";
import { Timeline } from "@/components/timeline";
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications";
import { OpenInitiative } from "@/components/open-initiative";
import { GithubActivity } from "@/components/github-activity";
import { Blog } from "@/components/blog";
import { CoreCapabilities } from "@/components/core-capabilities";
import { PoeticOverride } from "@/components/poetic-override";
import { WallPunchOverride } from "@/components/wall-punch-override";
import { ThemeTearOverride } from "@/components/theme-tear-override";
import { ThermalOverride } from "@/components/thermal-override";
import { EchoOverride } from "@/components/echo-override";
import { ResumeOverride } from "@/components/resume-override";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <main id="main-content" className="w-full flex flex-col items-center">
        <Hero />
        <Projects />
        <OpenInitiative />
        <SkillsOrbit />
        <Timeline />
        <CoreCapabilities />
        <Certifications />
        <GithubActivity />
        <Blog />
        <ResumeOverride />
        <PoeticOverride />
        <WallPunchOverride />
        <ThemeTearOverride />
        <ThermalOverride />
        <EchoOverride />
      </main>
    </>
  );
}
