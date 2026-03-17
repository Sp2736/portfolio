"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Hero } from "@/components/hero";
import { SkillsOrbit } from "@/components/skills-orbit";
import { Timeline } from "@/components/timeline"; 
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications"; // NEW
import { OpenInitiative } from "@/components/open-initiative"; // NEW
import { GithubActivity } from "@/components/github-activity";
import { Blog } from "@/components/blog";
import { CoreCapabilities } from "@/components/core-capabilities"; // Add this line
import { PoeticOverride } from "@/components/poetic-override";
import { WallPunchOverride } from "@/components/wall-punch-override";
// import { RansomwareOverride } from "@/components/ransomware-override";
import { ThemeTearOverride } from "@/components/theme-tear-override";
// import { HallucinationOverride } from "@/components/hallucination-override";
import { ThermalOverride } from "@/components/thermal-override";
// import { KineticOverride } from "@/components/kinetic-override";
import { EchoOverride } from "@/components/echo-override";
import { ResumeOverride } from "@/components/resume-override";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

  return (
    <>
    <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
    <main id="main-content" className="w-full flex flex-col items-center">
      <Hero />             {/* Identity & Terminal */}
      <Projects />         {/* Active Deployments */}
      <OpenInitiative />   {/* DSA Visualizer CTA */}
      <SkillsOrbit />      {/* Technical Arsenal */}
      <Timeline />         {/* Learning Journey */}
      <CoreCapabilities /> {/* Beyond Tech Life */}
      <Certifications />   {/* The Evidence Locker */}
      <GithubActivity />   {/* Version Control Pulse */}
      <Blog />             {/* Digital Garden & Book */}
      <ResumeOverride/>
      <PoeticOverride/>
      <WallPunchOverride/>
      {/* <RansomwareOverride/> */}
      <ThemeTearOverride/>
      {/* <HallucinationOverride/> */}
      <ThermalOverride/>
      {/* <KineticOverride/> */}
      <EchoOverride/>
    </main>
    </>
  );
}
