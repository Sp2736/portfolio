"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Database,
  Server,
  Monitor,
  X,
} from "lucide-react";

const projectsData = [
  {
    id: "arcade",
    title: "ARCADE",
    subtitle: "Academic Resource & Career Assist Digital Environment",
    description: "A centralized, role-based digital ecosystem designed to unify verified academic resources and structured learning roadmaps within a university environment. Bridges the gap between faculty-approved study materials and career-focused skill analysis.",
    tech: ["React", "Node.js", "Prisma", "MySQL"],
    arch: [
      { name: "Client UI", icon: Monitor, label: "React" },
      { name: "API Gateway", icon: Server, label: "Node.js" },
      { name: "Database", icon: Database, label: "MySQL + Prisma" },
    ],
    github: "https://github.com/Sp2736/arcade",
    live: "#",
  },
  {
    id: "wander-n-wonder",
    title: "Wander-n-Wonder",
    subtitle: "Premium Digital Garden & Blogging Platform",
    description: "A futuristic blogging platform where tech, university life, and personal musings collide. Features an immersive, frosted-glass UI for readers and a private Creator Studio for drafting posts and tracking audience analytics.",
    tech: ["Next.js", "Tailwind", "Vercel"],
    arch: [
      { name: "Frontend", icon: Monitor, label: "Next.js App Router" },
      { name: "CMS", icon: Server, label: "Creator Studio" },
      { name: "Deployment", icon: Database, label: "Vercel Edge" },
    ],
    github: "https://github.com/Sp2736/blog-site-ui",
    live: "https://wander-n-wonder.vercel.app",
  },
  {
    id: "logic-commenter",
    title: "AI Logic Commenter",
    subtitle: "AI-Powered VS Code Extension",
    description: "A developer tool that automatically generates logic-focused documentation for selected code blocks. Integrates Google Gemini 2.5 Flash to analyze intent and structure, producing concise multiline comments tailored to the active language.",
    tech: ["TypeScript", "VS Code API", "Gemini AI"],
    arch: [
      { name: "VS Code", icon: Monitor, label: "Editor Extension" },
      { name: "Parser", icon: Server, label: "AST Analyzer" },
      { name: "AI Model", icon: Database, label: "Gemini 2.5 Flash" },
    ],
    github: "https://github.com/Sp2736/auto-comment-vscode",
    live: "https://marketplace.visualstudio.com/items?itemName=sp2736.logic-commenter",
  },
  {
    id: "brainbin",
    title: "BRAINBIN",
    subtitle: "Smart Knowledge Management",
    description: "A smart knowledge management and note-taking tool designed to organize thoughts, code snippets, and ideas in one centralized, visually connected interface.",
    tech: ["Next.js", "React", "State Management"],
    arch: [
      { name: "Interface", icon: Monitor, label: "React Nodes" },
      { name: "Logic Engine", icon: Server, label: "State Controller" },
      { name: "Storage", icon: Database, label: "Local/Cloud Sync" },
    ],
    github: "https://github.com/Sp2736/BrainBin",
    live: "#",
  },
];

// The animated node graph that proves system-level thinking
const ArchitectureFlow = ({ nodes }: { nodes: any[] }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-2xl mx-auto py-8 relative">
      {/* Animated Connecting Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block z-0" />
      <motion.div
        className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 hidden md:block z-0"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
      />

      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
            className="relative z-10 flex flex-col items-center gap-3 bg-card p-4 rounded-xl border border-border shadow-lg"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <Icon size={24} />
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground text-sm">{node.name}</p>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {node.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projectsData.find((p) => p.id === selectedId);

  return (
    <section
      className={`w-full py-12 px-6 relative transition-all duration-300 ${selectedId ? "z-[100]" : "z-10"}`}
      id="projects"
    >
      {" "}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-2">
            Lab Specimens
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Active Deployments
          </h3>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <motion.div
              layoutId={`card-${project.id}`}
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className="group cursor-pointer bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors h-full flex flex-col justify-between"
            >
              <div>
                <motion.h4
                  layoutId={`title-${project.id}`}
                  className="text-xl font-bold text-foreground mb-2"
                >
                  {project.title}
                </motion.h4>
                <motion.p
                  layoutId={`subtitle-${project.id}`}
                  className="text-sm text-muted-foreground mb-4"
                >
                  {project.subtitle}
                </motion.p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.slice(0, 3).map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Project Modal */}
        {/* Expanded Project Modal */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]" // Increased Z-index
              />

              {/* Modal Content */}
              <div className="fixed inset-0 flex items-center justify-center z-[110] p-4 pointer-events-none">
                {" "}
                {/* Increased Z-index */}
                <motion.div
                  layoutId={`card-${selectedProject.id}`}
                  className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl border border-border shadow-2xl pointer-events-auto"
                >
                  <div className="p-8 md:p-12 relative">
                    <button
                      onClick={() => setSelectedId(null)}
                      className="absolute top-6 right-6 p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <X size={20} />
                    </button>

                    <motion.h4
                      layoutId={`title-${selectedProject.id}`}
                      className="text-3xl font-extrabold text-foreground mb-2"
                    >
                      {selectedProject.title}
                    </motion.h4>
                    <motion.p
                      layoutId={`subtitle-${selectedProject.id}`}
                      className="text-lg text-primary font-mono mb-8"
                    >
                      {selectedProject.subtitle}
                    </motion.p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                      <div className="lg:col-span-2 text-muted-foreground leading-relaxed">
                        <p>{selectedProject.description}</p>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h5 className="font-bold text-foreground">
                          Tech Stack
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((t, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-sm font-mono bg-muted text-foreground rounded-lg border border-border"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4 mt-4">
                          <a
                            href={selectedProject.github}
                            className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors"
                          >
                            <Github size={18} /> Code
                          </a>
                          <a
                            href={selectedProject.live}
                            className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors"
                          >
                            <ExternalLink size={18} /> Live Demo
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-border">
                      <h5 className="font-bold text-foreground mb-6 text-center">
                        System Architecture
                      </h5>
                      <ArchitectureFlow nodes={selectedProject.arch} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
