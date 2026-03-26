"use client";

import { motion, Variants } from "framer-motion";
import {
  ExternalLink,
  Github,
  ShoppingBag,
  Music,
  BookOpen,
  Linkedin,
  Youtube,
} from "lucide-react";

// DATA MAPPING
const projectsData = [
  {
    id: "arcade",
    title: "ARCADE",
    description:
      "A centralized, role-based digital ecosystem designed to unify verified academic resources and structured learning roadmaps within a university environment.",
    image: "./arcade.png", // Tech / Cyber vibe
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/arcade",
        icon: Github,
        primary: false,
      },
    ],
  },
  {
    id: "wander",
    title: "WANDER-N-WONDER",
    description:
      "A premium digital garden and futuristic blogging platform where tech, university life, and personal musings collide. Features an immersive frosted-glass UI.",
    image: "./wander-n-wonder.png", // Universe / Globe vibe
    techStack: ["Next.js", "Prisma", "Tailwind CSS"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/blog-site-ui",
        icon: Github,
        primary: false,
      },
      {
        label: "Visit",
        url: "https://wander-n-wonder.vercel.app",
        icon: ExternalLink,
        primary: true,
      },
    ],
  },
  {
    id: "brainbin",
    title: "BRAINBIN",
    description:
      "A smart knowledge management and note-taking tool. Organize thoughts, code snippets, and ideas efficiently in one centralized location.",
    image: "./brainbin.png", // Brain / Abstract AI vibe
    techStack: ["React", "TypeScript", "Next.js"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/BrainBin",
        icon: Github,
        primary: false,
      },
    ],
  },
  {
    id: "logic-commenter",
    title: "AI LOGIC COMMENTER",
    description:
      "An AI-powered VS Code extension that automatically generates logic-focused documentation for code blocks using the Google Gemini 2.5 Flash API.",
    image: "./logic-commenter.png", // Code / Scripting vibe
    techStack: ["TypeScript", "VS Code API", "Gemini AI"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/auto-comment-vscode",
        icon: Github,
        primary: false,
      },
      {
        label: "Install",
        url: "https://marketplace.visualstudio.com/items?itemName=sp2736.logic-commenter",
        icon: ShoppingBag,
        primary: true,
      },
    ],
  },
  {
    id: "dark-angel",
    title: "DARK ANGEL",
    description:
      "A sleek, deep-blue VS Code dark theme. Designed for long coding sessions — easy on the eyes, hard to forget.",
    image: "./dark-angel.png", // Dark code vibe
    techStack: ["JSON", "VS Code Theme", "UX Design"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/dark-angel",
        icon: Github,
        primary: false,
      },
      {
        label: "Install",
        url: "https://marketplace.visualstudio.com/items?itemName=sp2736.dark-angel-by-sp",
        icon: ShoppingBag,
        primary: true,
      },
    ],
  },
  {
    id: "white-devil",
    title: "WHITE DEVIL",
    description:
      "A crisp, minimal VS Code light theme. Clean whites and sharp accents — built for clarity and daylight coding.",
    image: "./white-devil.png", // Clean / White aesthetic
    techStack: ["JSON", "VS Code Theme", "UX Design"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/white-devil",
        icon: Github,
        primary: false,
      },
      {
        label: "Install",
        url: "https://marketplace.visualstudio.com/items?itemName=sp2736.white-devil-by-sp",
        icon: ShoppingBag,
        primary: true,
      },
    ],
  },
  {
    id: "suno-ai",
    title: "SUNO AI TRACKS",
    description:
      "AI-generated music compositions — experimenting with Suno AI to produce original tracks across multiple genres and styles.",
    image: "./suno.png", // Audio / Music vibe
    techStack: ["Suno AI", "Prompt Engineering", "Audio"],
    links: [
      {
        label: "Listen",
        url: "https://suno.com/@sp2736",
        icon: Music,
        primary: true,
      },
    ],
  },
  {
    id: "poetry-book",
    title: "BEFORE I LEARNED GOODBYE",
    description:
      "A poetry collection of 20 interconnected poems tracing a first love's rise and dissolution. Published by Bookleaf Publication — India | USA | UK.",
    image: "./bookleaf.jpeg", // Vintage / Book vibe
    techStack: ["Creative Writing", "Poetry", "Publishing"],
    links: [
      {
        label: "Published E-Book",
        url: "https://ebooks.bookleafpub.com/product-page/before-i-learned-goodbye",
        icon: BookOpen,
        primary: true,
      },
      {
        label: "Author Post",
        url: "https://www.linkedin.com/in/swayam-patel-316ba5317",
        icon: Linkedin,
        primary: false,
      },
    ],
  },
];

// ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
    },
  },
};

export function Projects() {
  return (
    <section className="w-full py-20 px-6 relative z-10" id="projects">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Title Block */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase mb-2">
            Featured Work
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Deployed Assets
          </h3>
          <p className="text-sm text-muted-foreground max-w-xl">
            A selection of open-source tools, scalable web applications, and
            creative endeavors.
          </p>
        </div>

        {/* Project Matrix */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              // The Card Container
              className="group flex flex-col bg-background/5 backdrop-blur-md border border-border/30 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_10px_30px_rgba(var(--primary),0.15)] hover:border-primary/40 hover:-translate-y-1"
            >
              {/* Image Banner */}
              <div className="relative h-44 w-full overflow-hidden border-b border-border/30">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>

              {/* Content Body */}
              <div className="flex flex-col flex-grow p-5 md:p-6">
                <h4 className="text-lg font-bold text-foreground font-mono tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {project.title}
                </h4>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-md bg-secondary text-secondary-foreground border border-border/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border/30">
                  {project.links.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-md transition-all duration-300 ${
                          link.primary
                            ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(var(--primary),0.4)]"
                            : "bg-transparent text-foreground border border-border/30 hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <Icon size={14} strokeWidth={2} />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
