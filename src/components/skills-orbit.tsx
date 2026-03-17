"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import {
  X,
  Code2,
  Cpu,
  Blocks,
  Database,
  Cloud,
  LineChart,
  BrainCircuit,
  Sparkles,
  Wrench,
  Palette,
  Monitor,
} from "lucide-react";
// classification filters
const categories = [
  "Languages",
  "System Level",
  "Frameworks",
  "Databases",
  "Cloud & DevOps",
  "Data & Analytics",
  "AI & LLMs",
  "Generative AI",
  "Dev Tools & IDEs",
  "Design & PM",
  "Operating Systems",
];

const categoryIcons: Record<string, React.ElementType> = {
  Languages: Code2,
  "System Level": Cpu,
  Frameworks: Blocks,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  "Data & Analytics": LineChart,
  "AI & LLMs": BrainCircuit,
  "Generative AI": Sparkles,
  "Dev Tools & IDEs": Wrench,
  "Design & PM": Palette,
  "Operating Systems": Monitor,
};

const skillsData = [
  // Languages
  {
    name: "C",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=c",
  },
  {
    name: "C++",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=cpp",
  },
  {
    name: "Java",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=java",
  },
  // {
  //   name: "C#",
  //   category: "Languages",
  //   icon: "https://skillicons.dev/icons?i=cs",
  // },
  {
    name: "Python",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=py",
  },
  {
    name: "JavaScript",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=js",
  },
  {
    name: "TypeScript",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=ts",
  },
  {
    name: "PHP",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=php",
  },
  {
    name: "HTML",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=html",
  },
  {
    name: "CSS",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=css",
  },

  // System Level
  {
    name: "Embedded Assembly",
    category: "System Level",
    icon: "https://cdn.simpleicons.org/assemblyscript",
    invertDark: true,
  },
  {
    name: "VBScript",
    category: "System Level",
    icon: "https://karb0f0s.gallerycdn.vsassets.io/extensions/karb0f0s/vbscript/0.5.5/1524063222678/Microsoft.VisualStudio.Services.Icons.Default",
  },
  {
    name: "Batchscript",
    category: "System Level",
    icon: "https://e7.pngegg.com/pngimages/526/258/png-clipart-batch-file-computer-icons-computer-file-ms-dos-cmd-icon-electronics-commandline-interface.png",
  },
  {
    name: "Python",
    category: "System Level",
    icon: "https://skillicons.dev/icons?i=py",
  },

  // Frameworks
  {
    name: "React",
    category: "Frameworks",
    icon: "https://skillicons.dev/icons?i=react",
  },
  {
    name: "Next.js",
    category: "Frameworks",
    icon: "https://skillicons.dev/icons?i=nextjs",
  },
  {
    name: "Node.js",
    category: "Frameworks",
    icon: "https://skillicons.dev/icons?i=nodejs",
  },
  // {
  //   name: "Express",
  //   category: "Frameworks",
  //   icon: "https://skillicons.dev/icons?i=express",
  // },

  // Databases
  {
    name: "MongoDB",
    category: "Databases",
    icon: "https://skillicons.dev/icons?i=mongodb",
  },
  {
    name: "MySQL",
    category: "Databases",
    icon: "https://skillicons.dev/icons?i=mysql",
  },
  {
    name: "PostgreSQL",
    category: "Databases",
    icon: "https://skillicons.dev/icons?i=postgres",
  },
  {
    name: "Firebase",
    category: "Databases",
    icon: "https://skillicons.dev/icons?i=firebase",
  },
  {
    name: "Supabase",
    category: "Databases",
    icon: "https://skillicons.dev/icons?i=supabase",
  },
  {
    name: "Oracle",
    category: "Databases",
    icon: "https://5.imimg.com/data5/SELLER/Default/2022/7/FT/WW/IM/7756102/oracle-database-enterprise-edition-license-1-processor-500x500.png",
  },
  {
    name: "MSSQL",
    category: "Databases",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Microsoft_SQL_Server_2025_icon.svg/960px-Microsoft_SQL_Server_2025_icon.svg.png",
  },
  // {
  //   name: "Neon",
  //   category: "Databases",
  //   icon: "https://community.appsmith.com/sites/default/files/2024-03/neondatabase_logo.jpeg",
  // },
  {
    name: "XAMPP",
    category: "Databases",
    icon: "https://cdn.simpleicons.org/xampp",
    invertDark: true,
  },

  // Cloud & DevOps
  {
    name: "Azure",
    category: "Cloud & DevOps",
    icon: "https://skillicons.dev/icons?i=azure",
  },
  {
    name: "GCP",
    category: "Cloud & DevOps",
    icon: "https://skillicons.dev/icons?i=gcp",
  },
  {
    name: "Docker",
    category: "Cloud & DevOps",
    icon: "https://skillicons.dev/icons?i=docker",
  },
  {
    name: "Git",
    category: "Cloud & DevOps",
    icon: "https://skillicons.dev/icons?i=git",
  },
  {
    name: "GitHub",
    category: "Cloud & DevOps",
    icon: "https://skillicons.dev/icons?i=github",
  },
  {
    name: "n8n",
    category: "Cloud & DevOps",
    icon: "https://cdn.simpleicons.org/n8n",
    invertDark: true,
  },

  // Data & Analytics
  {
    name: "Jupyter",
    category: "Data & Analytics",
    icon: "https://images.seeklogo.com/logo-png/35/1/jupyter-logo-png_seeklogo-354673.png",
  },
  {
    name: "Google Colab",
    category: "Data & Analytics",
    icon: "https://cdn.simpleicons.org/googlecolab",
    invertDark: true,
  },
  {
    name: "Anaconda",
    category: "Data & Analytics",
    icon: "https://cdn.simpleicons.org/anaconda",
    invertDark: true,
  },
  {
    name: "Power BI",
    category: "Data & Analytics",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/1280px-New_Power_BI_Logo.svg.png",
  },
  {
    name: "Looker Studio",
    category: "Data & Analytics",
    icon: "https://cdn.simpleicons.org/looker",
    invertDark: true,
  },
  {
    name: "NotebookLM",
    category: "Data & Analytics",
    icon: "https://logosandtypes.com/wp-content/uploads/2025/05/notebooklm-scaled.png",
    invertDark: true,
  },

  // AI & LLMs
  {
    name: "ChatGPT",
    category: "AI & LLMs",
    icon: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/openai.png",
    invertDark: true,
  },
  {
    name: "Claude",
    category: "AI & LLMs",
    icon: "https://cdn.simpleicons.org/anthropic",
    invertDark: true,
  },
  {
    name: "Gemini",
    category: "AI & LLMs",
    icon: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/gemini-color.png",
  },
  {
    name: "Grok",
    category: "AI & LLMs",
    icon: "https://cdn.simpleicons.org/x",
    invertDark: true,
  },
  {
    name: "Perplexity",
    category: "AI & LLMs",
    icon: "https://cdn.simpleicons.org/perplexity",
    invertDark: true,
  },
  {
    name: "Copilot",
    category: "AI & LLMs",
    icon: "https://cdn.simpleicons.org/githubcopilot",
    invertDark: true,
  },
  {
    name: "Ollama",
    category: "AI & LLMs",
    icon: "https://cdn.simpleicons.org/ollama",
    invertDark: true,
  },

  // Generative AI
  {
    name: "Midjourney",
    category: "Generative AI",
    icon: "https://images.seeklogo.com/logo-png/50/2/midjourney-logo-png_seeklogo-501203.png",
    invertDark: true,
  },
  {
    name: "Sora",
    category: "Generative AI",
    icon: "data:image/jpeg;base64,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",
  },
  {
    name: "Suno AI",
    category: "Generative AI",
    icon: "https://play-lh.googleusercontent.com/5UR_1gDasYzAjJYSdx9onJ5FT68TVzxcV6O_FjTS2X_95_qHgexX__mCa_23lUIgWlU",
  },
  {
    name: "Runway",
    category: "Generative AI",
    icon: "https://logosandtypes.com/wp-content/uploads/2023/04/Runway.png",
  },
  {
    name: "Canva AI",
    category: "Generative AI",
    icon: "https://miro.medium.com/v2/resize:fit:1400/0*tviVu77uKID2H6Jn.png",
  },
  {
    name: "Gamma.io",
    category: "Generative AI",
    icon: "https://www.wpcrafter.com/wp-content/uploads/2024/08/gamma-1.png",
  },
  {
    name: "Notion AI",
    category: "Generative AI",
    icon: "https://skillicons.dev/icons?i=notion",
  },

  // Dev Tools & IDEs
  {
    name: "VS Code",
    category: "Dev Tools & IDEs",
    icon: "https://skillicons.dev/icons?i=vscode",
  },
  {
    name: "Visual Studio",
    category: "Dev Tools & IDEs",
    icon: "https://skillicons.dev/icons?i=visualstudio",
  },
  // {
  //   name: "Postman",
  //   category: "Dev Tools & IDEs",
  //   icon: "https://skillicons.dev/icons?i=postman",
  // },
  // {
  //   name: "Cursor AI",
  //   category: "Dev Tools & IDEs",
  //   icon: "https://cdn.simpleicons.org/cursor",
  //   invertDark: true,
  // },
  {
    name: "Antigravity",
    category: "Dev Tools & IDEs",
    icon: "https://media.licdn.com/dms/image/v2/D560BAQG5wmEaqHfmDg/company-logo_200_200/B56ZqUSJh0I4AM-/0/1763424377586/google_antigravity_logo?e=2147483647&v=beta&t=09EGMp77uIgS77oquLNRli_4mMEV8oGvXklIXLBP6YM",
  },
  // {
  //   name: "Wireshark",
  //   category: "Dev Tools & IDEs",
  //   icon: "https://cdn.simpleicons.org/wireshark",
  //   invertDark: true,
  // },
  {
    name: "Burp Suite",
    category: "Dev Tools & IDEs",
    icon: "https://cdn.simpleicons.org/burpsuite",
    invertDark: true,
  },

  // Design & PM
  {
    name: "Figma",
    category: "Design & PM",
    icon: "https://skillicons.dev/icons?i=figma",
  },
  {
    name: "Shadcn/UI",
    category: "Design & PM",
    icon: "https://cdn.simpleicons.org/shadcnui",
    invertDark: true,
  },
  {
    name: "Trello",
    category: "Design & PM",
    icon: "https://cdn.simpleicons.org/trello",
    invertDark: true,
  },
  {
    name: "Asana",
    category: "Design & PM",
    icon: "https://cdn.simpleicons.org/asana",
    invertDark: true,
  },
  {
    name: "Canva",
    category: "Design & PM",
    icon: "https://miro.medium.com/v2/resize:fit:1400/0*tviVu77uKID2H6Jn.png",
  },

  // Operating Systems
  {
    name: "Windows",
    category: "Operating Systems",
    icon: "https://skillicons.dev/icons?i=windows",
  },
  {
    name: "Ubuntu",
    category: "Operating Systems",
    icon: "https://skillicons.dev/icons?i=ubuntu",
  },
  {
    name: "Kali Linux",
    category: "Operating Systems",
    icon: "https://skillicons.dev/icons?i=kali",
  },
];

export function SkillsOrbit() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isZeroG, setIsZeroG] = useState(false);
  const [segfaultCount, setSegfaultCount] = useState(0);
  const [isSegfault, setIsSegfault] = useState(false);
  useEffect(() => {
    if (segfaultCount >= 3) {
      setIsSegfault(true);
      setSegfaultCount(0); // Reset
      setTimeout(() => setIsSegfault(false), 3500); // Crash lasts 3.5 seconds
    }
  }, [segfaultCount]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ZERO-G PHYSICS ENGINE
  useEffect(() => {
    if (!isZeroG) return;

    // Grab all the icons currently rendered on screen
    const originalNodes = document.querySelectorAll(".skill-physics-node");
    if (originalNodes.length === 0) return;

    // Create a global full-screen sandbox
    const sandbox = document.createElement("div");
    sandbox.id = "zero-g-sandbox";
    sandbox.style.position = "fixed";
    sandbox.style.inset = "0";
    sandbox.style.pointerEvents = "none"; // Lets you click through it
    sandbox.style.zIndex = "99999";
    document.body.appendChild(sandbox);

    // Clone the nodes, hide the originals, and set up physics bodies
    const bodies = Array.from(originalNodes).map((node) => {
      const el = node as HTMLElement;
      const rect = el.getBoundingClientRect();
      const clone = el.cloneNode(true) as HTMLElement;

      // Lock clone to exact absolute coordinates
      clone.style.position = "absolute";
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.margin = "0";
      clone.style.transition = "none";
      clone.style.transform = "none"; // strip framer-motion animations
      clone.style.pointerEvents = "auto"; // Make clones interactive

      sandbox.appendChild(clone);
      el.style.opacity = "0"; // hide original

      return {
        el: clone,
        x: rect.left,
        y: rect.top,
        w: rect.width,
        h: rect.height,
        // Initial explosive burst velocity
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15 - 5,
        rot: 0,
        vRot: (Math.random() - 0.5) * 8,
      };
    });

    // Mouse Tracking for Repulsion Force
    let mx = -1000,
      my = -1000;
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationId: number;
    const loop = () => {
      bodies.forEach((b) => {
        // Space Friction
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed > 2) {
          b.vx *= 0.98;
          b.vy *= 0.98;
        }

        // Magnetic Repulsion from Mouse
        const dx = b.x + b.w / 2 - mx;
        const dy = b.y + b.h / 2 - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          b.vx += (dx / dist) * force * 1.5;
          b.vy += (dy / dist) * force * 1.5;
          b.vRot += (dx / dist) * force * 2;
        }

        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.vRot;

        // Bouncy Screen Boundaries
        const elasticity = 0.8;
        if (b.x <= 0) {
          b.x = 0;
          b.vx *= -elasticity;
          b.vRot += b.vy * 0.1;
        }
        if (b.x + b.w >= window.innerWidth) {
          b.x = window.innerWidth - b.w;
          b.vx *= -elasticity;
          b.vRot -= b.vy * 0.1;
        }
        if (b.y <= 0) {
          b.y = 0;
          b.vy *= -elasticity;
          b.vRot -= b.vx * 0.1;
        }
        if (b.y + b.h >= window.innerHeight) {
          b.y = window.innerHeight - b.h;
          b.vy *= -elasticity;
          b.vRot += b.vx * 0.1;
        }

        // Apply transformations
        b.el.style.left = `${b.x}px`;
        b.el.style.top = `${b.y}px`;
        b.el.style.transform = `rotate(${b.rot}deg)`;
      });
      animationId = requestAnimationFrame(loop);
    };
    loop();

    // Press Escape to restore gravity
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZeroG(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", onMouseMove);
      if (document.getElementById("zero-g-sandbox")) sandbox.remove();
      originalNodes.forEach((node) => {
        (node as HTMLElement).style.opacity = "1";
      });
    };
  }, [isZeroG]);

  const currentTheme = mounted ? resolvedTheme || theme : "dark";
  const isDarkTheme = currentTheme !== "light";

  const filteredSkills = activeCategory
    ? skillsData.filter((s) => s.category === activeCategory)
    : [];

  return (
    <section className="w-full py-12 px-6 relative z-10" id="skills">
      {/* Title Block */}
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-primary font-mono text-[10px] tracking-widest uppercase mb-1">
          Technical Arsenal
        </h2>
        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
          Known Tools and Technologies
        </h3>
      </div>

      <motion.div
        layout
        className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start min-h-[300px]"
      >
        {/* LEFT WING: The Physical Holographic Nodes */}
        <motion.div
          layout
          className={`flex flex-wrap justify-center gap-4 md:gap-5 transition-all duration-500 ease-in-out ${
            activeCategory
              ? "w-full lg:w-1/4 flex-row lg:flex-col items-center"
              : "w-full"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {categories.map((cat, i) => {
              if (activeCategory && activeCategory !== cat) return null;

              const isActive = activeCategory === cat;
              const Icon = categoryIcons[cat] || Cpu;

              return (
                <motion.div
                  layout // Handles the smooth glide to the left
                  key={cat}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 1.4,
                    filter: "blur(10px)",
                    transition: { duration: 0.2 },
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative z-20"
                >
                  {/* The Physics Wrapper: Moves the ENTIRE bubble perfectly together */}
                  <motion.div
                    animate={isActive ? { y: 0 } : { y: [-5, 5, -5] }} // Docks firmly when active, floats when idle
                    transition={{
                      duration: 4 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.button
                      layoutId={`bubble-bg-${cat}`} // Handles the shape morph
                      onClick={() => setActiveCategory(isActive ? null : cat)}
                      className={`relative flex flex-col items-center justify-center gap-2 cursor-pointer rounded-full backdrop-blur-md border transition-colors duration-300 group overflow-hidden ${
                        isActive
                          ? "w-28 h-28 md:w-32 md:h-32 bg-primary/20 border-primary shadow-[0_0_30px_rgba(var(--primary),0.5)]"
                          : "w-24 h-24 md:w-28 md:h-28 bg-background/5 border-border/30 hover:border-primary/50 hover:bg-background/80 shadow-lg"
                      }`}
                    >
                      {/* Integrated Icon & Text (No more plain text boredom) */}
                      <Icon
                        size={isActive ? 28 : 22}
                        strokeWidth={isActive ? 2 : 1.5}
                        className={`transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}
                      />
                      <span
                        className={`font-mono text-[9px] md:text-[10px] font-bold leading-tight px-3 text-center transition-colors duration-300 ${isActive ? "text-primary-foreground" : "text-foreground"}`}
                      >
                        {cat}
                      </span>

                      {/* Close/Revert Badge */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="absolute bottom-3 flex items-center gap-1 text-primary bg-background/80 px-2.5 py-1 rounded-full border border-primary/30 shadow-md"
                        >
                          <X size={10} strokeWidth={3} />
                          <span className="text-[8px] uppercase tracking-widest font-extrabold">
                            Close
                          </span>
                        </motion.div>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT WING: The Arsenal Nodes (Remains the flawless Zero-Gravity Cascade) */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="w-full lg:w-3/4 flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6"
            >
              {filteredSkills.map((skill, index) => {
                const iconUrl = skill.icon.includes("skillicons.dev")
                  ? `${skill.icon}&theme=${isDarkTheme ? "dark" : "light"}`
                  : skill.icon;
                const needsInvert = skill.invertDark && isDarkTheme;

                return (
                  <motion.div
                    key={`${skill.name}-${skill.category}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.03,
                      type: "spring",
                    }}
                    // ADDED CLASS AND ONCLICK HERE:
                    className="relative z-10 hover:z-50 skill-physics-node"
                    onClick={() => {
                      // Zero-G Trigger
                      if (skill.name === "Antigravity" && !isZeroG) {
                        setIsZeroG(true);
                      }

                      // Segmentation Fault Trigger
                      if (skill.name === "C++" || skill.name === "Assembly") {
                        setSegfaultCount((prev) => prev + 1);
                      }
                    }}
                  >
                    <motion.div
                      animate={isZeroG ? { y: 0 } : { y: [0, -8, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3 + (index % 3),
                        delay: index * 0.1,
                        ease: "easeInOut",
                      }}
                      className="group flex flex-col items-center justify-center cursor-crosshair"
                    >
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary/30 to-transparent p-[1px] shadow-md group-hover:shadow-[0_0_25px_rgba(var(--primary),0.6)] transition-all duration-300 group-hover:scale-110">
                        <div className="w-full h-full rounded-full bg-background/70 backdrop-blur-md flex items-center justify-center border border-border/30 group-hover:border-primary/50 transition-colors">
                          <img
                            src={iconUrl}
                            alt={skill.name}
                            className={`w-7 h-7 md:w-9 md:h-9 object-contain drop-shadow-lg transition-transform duration-300 ${needsInvert ? "invert opacity-90" : ""}`}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      </div>

                      <div className="absolute top-[110%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="text-[9px] md:text-[10px] font-mono font-bold text-primary-foreground bg-primary px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap block border border-primary/50">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {/* ZERO-G WARNING HUD */}
      <AnimatePresence>
        {isZeroG && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-[100000] pointer-events-none text-center"
          >
            <div className="bg-red-500/10 backdrop-blur-md border border-red-500 text-red-500 px-6 py-3 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.4)]">
              <h1 className="font-mono text-sm md:text-base font-black tracking-widest uppercase animate-pulse">
                Zero-G Protocol Engaged
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-wider mt-1 opacity-80">
                Press [ESC] to restore gravity
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* SEGMENTATION FAULT OVERLAY */}
      <AnimatePresence>
        {isSegfault && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] bg-black text-[#00ff00] font-mono p-4 md:p-8 flex flex-col justify-start items-start pointer-events-none overflow-hidden text-xs md:text-sm"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col gap-1">
              <p>
                [ 0.000000] Linux version 6.1.0-sp-sys (root@mainframe) (gcc
                (GCC) 11.2.0, GNU ld) #1 SMP PREEMPT_DYNAMIC
              </p>
              <p>
                [ 2.143211] BUG: unable to handle page fault for address:
                ffffffffffffffff
              </p>
              <p>
                [ 2.143215] #PF: supervisor instruction fetch in kernel mode
              </p>
              <p>[ 2.143218] #PF: error_code(0x0010) - not-present page</p>
              <p className="text-red-500 font-bold mt-2">
                [ 2.143220] SEGFAULT: Core Dumped. Pointer dereferenced at
                0x00000000
              </p>
              <p>[ 2.143225] Oops: 0010 [#1] PREEMPT SMP NOPTI</p>
              <p>
                [ 2.143230] CPU: 0 PID: 1 Comm: init Not tainted 6.1.0-sp-sys #1
              </p>
              <p>
                [ 2.143235] Hardware name: Custom SP.SYS Architecture /
                Motherboard v2.0
              </p>
              <p>[ 2.143240] RIP: 0010:0xffffffffffffffff</p>
              <p className="mt-4 text-red-500 animate-pulse">
                Kernel panic - not syncing: Fatal exception
              </p>
              <p className="mt-2 text-muted-foreground">
                Rebooting system in 3 seconds...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
