"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  ExternalLink,
  Github,
  ShoppingBag,
  Music,
  BookOpen,
  Linkedin,
  BookOpenCheck,
  ArrowUpRight,
} from "lucide-react";

// DATA MAPPING
const projectsData = [
  // 1. College Projects
  {
    id: "arcade",
    title: "ARCADE",
    category: "college",
    description:
      "A centralized, role-based digital ecosystem designed to unify verified academic resources and structured learning roadmaps within a university environment.",
    image: "./arcade.png",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/arcade",
        icon: Github,
        primary: false,
      },
      {
        label: "Architecture",
        url: "/architecture/arcade.html",
        icon: ArrowUpRight,
        primary: true,
      },
    ],
  },
  {
    id: "brainbin",
    title: "BRAINBIN",
    category: "college",
    description:
      "A smart knowledge management and note-taking tool. Organize thoughts, code snippets, and ideas efficiently in one centralized location.",
    image: "./brainbin.png",
    techStack: ["React", "TypeScript", "Next.js"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/BrainBin",
        icon: Github,
        primary: false,
      },
      {
        label: "Architecture",
        url: "/architecture/brainbin.html",
        icon: ArrowUpRight,
        primary: true,
      },
    ],
  },
  {
    id: "datamind",
    title: "DATAMIND",
    category: "college",
    description:
      "An autonomous, LLM-powered exploratory data analysis (EDA) framework that auto-generates research questions, writes self-correcting analysis code, and visualizes insights from raw datasets.",
    image: "./datamind.png",
    techStack: ["Python", "LLMs", "Data Science", "React"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/data-mind",
        icon: Github,
        primary: false,
      },
      {
        label: "Architecture",
        url: "/architecture/datamind.html",
        icon: ArrowUpRight,
        primary: true,
      },
    ],
  },

  // 2. Tools & Extensions
  {
    id: "logic-commenter",
    title: "AI LOGIC COMMENTER",
    category: "tools",
    description:
      "An AI-powered VS Code extension that automatically generates logic-focused documentation for code blocks using the Google Gemini 2.5 Flash API.",
    image: "./logic-commenter.png",
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
      {
        label: "Architecture",
        url: "/architecture/logic-commenter.html",
        icon: ArrowUpRight,
        primary: true,
      },
    ],
  },
  {
    id: "dark-angel",
    title: "DARK ANGEL THEME",
    category: "tools",
    description: "A sleek, deep-blue dark theme for VS Code.",
    image: "./dark-angel.png",
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
      {
        label: "Architecture",
        url: "/architecture/dark-angel.html",
        icon: ArrowUpRight,
        primary: true,
      },
    ],
  },
  {
    id: "white-devil",
    title: "WHITE DEVIL THEME",
    category: "tools",
    description: "A crisp, minimal light theme for VS Code.",
    image: "./white-devil.png",
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
      {
        label: "Architecture",
        url: "/architecture/white-devil.html",
        icon: ArrowUpRight,
        primary: true,
      },
    ],
  },

  // 3. Freelance & Internship
  {
    id: "counseling-reports-portal",
    title: "COUNSELING SWOT PORTAL",
    category: "freelance",
    description:
      "A comprehensive role-based web portal using automated AI-driven SWOT analysis for counseling reports.",
    image: "./swot-portal.png",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "NextAuth"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/counseling-reports-portal",
        icon: Github,
        primary: false,
      },
      {
        label: "Architecture",
        url: "/architecture/swot.html",
        icon: ArrowUpRight,
        primary: true,
      },
    ],
  },
  {
    id: "sukoon",
    title: "SUKOON DEVELOPER",
    category: "freelance",
    description:
      "A modern real estate platform, made for a client, featuring dynamic property listings.",
    image: "./sukoon.png",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    links: [
      {
        label: "Visit",
        url: "https://sukoondeveloper.com",
        icon: ExternalLink,
        primary: true,
      },
    ],
  },
  {
    id: "finiq",
    title: "FINIQ",
    category: "freelance",
    description:
      "A robust financial management SaaS platform featuring dedicated investor and distributor modules. Includes secure API integrations, advanced capital gains reporting, and an ethical finance-oriented UI.",
    image: "./finiq.png",
    techStack: ["Next.js", "Node.js", "Express", "SQL", "AWS"],
    links: [
      {
        label: "Architecture",
        url: "/architecture/finiq.html",
        icon: ArrowUpRight,
        primary: true,
      },
    ],
  },

  // 4. Hackathons
  {
    id: "asset-flow",
    title: "ASSET-FLOW (Odoo 2026 Qualifier)",
    category: "hackathon",
    description:
      "A centralized ERP platform simplifying how organizations track, allocate, and maintain physical assets. Features structured lifecycles and real-time booking visibility.",
    image: "./asset-flow.png",
    techStack: ["ERP", "Asset Management", "Hackathon"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/asset-flow",
        icon: Github,
        primary: false,
      },
      {
        label: "Architecture",
        url: "/architecture/asset-flow.html",
        icon: ArrowUpRight,
        primary: true,
      },
    ],
  },
  {
    id: "dealflow360",
    title: "DEAL-FLOW360 (Odoo 2026 Final)",
    category: "hackathon",
    description:
      "An advanced AI-powered B2B Deal and Quotation Management System. Streamlines business transactions from initial AI-driven negotiation to fulfillment and invoicing.",
    image: "./dealflow360.png",
    techStack: ["AI", "B2B SaaS", "Hackathon"],
    links: [
      {
        label: "Code",
        url: "https://github.com/Sp2736/team-488-dealflow360",
        icon: Github,
        primary: false,
      },
      {
        label: "Architecture",
        url: "/architecture/dealflow360.html",
        icon: ArrowUpRight,
        primary: true,
      },
    ],
  },

  // 5. Creativity
  {
    id: "suno-ai",
    title: "SUNO AI TRACKS",
    category: "creativity",
    description:
      "AI-generated music compositions — experimenting with Suno AI to produce original tracks across multiple genres and styles.",
    image: "./suno.png",
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
    category: "creativity",
    description:
      "A poetry collection of 20 interconnected poems tracing a first love's rise and dissolution. Published by Bookleaf Publication — India | USA | UK.",
    image: "./bookleaf.jpeg",
    techStack: ["Creative Writing", "Poetry", "Publishing"],
    links: [
      {
        label: "E-Book",
        url: "https://ebooks.bookleafpub.com/product-page/before-i-learned-goodbye",
        icon: BookOpen,
        primary: false,
      },
      {
        label: "Paperback",
        url: "https://store.bookleafpub.com/products/9789375273813",
        icon: BookOpenCheck,
        primary: false,
      },
      {
        label: "Author Post",
        url: "https://www.linkedin.com/posts/swayam-patel-316ba5317_author-publishedauthor-bookpublication-ugcPost-7466396339426443264-nZr2/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFBxwYIBNXDtICjTLtPqyKcrxn03rH1yBPA",
        icon: Linkedin,
        primary: true,
      },
    ],
  },
];

projectsData.sort((a, b) => a.title.localeCompare(b.title));

// FILTER CONFIG
const FILTERS = [
  { key: "college", label: "College Projects" },
  { key: "tools", label: "Tools & Extensions" },
  { key: "freelance", label: "Freelance & Internship" },
  { key: "hackathon", label: "Hackathons" },
  { key: "creativity", label: "Creativity" },
  { key: "all", label: "All Projects" },
];

// ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

// REUSABLE PROJECT CARD
function ProjectCard({ project }: { project: { title: string; description: string; image: string | string[]; techStack: string[]; links: { label: string; url: string; icon: any; primary: boolean }[]; category: string; id: string } }) {
  const isArray = Array.isArray(project.image);
  const images = (isArray ? project.image : [project.image]) as string[];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!isArray || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2500); // 2.5 seconds
    return () => clearInterval(interval);
  }, [isArray, images.length]);

  return (
    <div className="group flex flex-col bg-background/5 backdrop-blur-md border border-border/30 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_10px_30px_rgba(var(--primary),0.15)] hover:border-primary/40 hover:-translate-y-1 h-full">
      {/* Image Banner */}
      <div className="relative h-44 w-full overflow-hidden border-b border-border/30 shrink-0">
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
        
        {images.map((imgSrc: string, index: number) => (
          <img
            key={index}
            src={imgSrc}
            alt={`${project.title} - ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0 ${
              index === currentImageIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
            loading="lazy"
          />
        ))}
      </div>

      {/* Content Body */}
      <div className="flex flex-col grow p-5 md:p-6">
        <h4 className="text-lg font-bold text-foreground font-mono tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {project.title}
        </h4>

        <p className="text-xs text-muted-foreground mb-4 line-clamp-3 flex-1">
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
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border/30 mt-auto">
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
    </div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("college");

  const filtered =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

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

        {/* Filter Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-wider rounded-full border transition-all duration-200 ${
                activeFilter === f.key
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_rgba(var(--primary),0.35)]"
                  : "bg-background/5 text-muted-foreground border-border/30 hover:border-primary/40 hover:text-foreground backdrop-blur-md"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project Matrix */}
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <motion.div key={project.id} variants={cardVariants} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
