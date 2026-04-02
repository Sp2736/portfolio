"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  X,
  LayoutTemplate,
  Briefcase,
  Columns,
} from "lucide-react";

const resumeData = {
  name: "Swayam Patel",
  role: "AI & Data Science Enthusiast | Full-Stack Developer",
  email: "swayampatel2736@gmail.com",
  phone: "+91 98243 00664",
  linkedin: "https://linkedin.com/in/swayam-patel-316ba5317/",
  github: "https://github.com/Sp2736",
  portfolio: "https://swayam-patel-v1.vercel.app",
  location: "Vadodara, Gujarat, India",

  summary:
    "Computer Science student building data-driven systems and AI-assisted applications. Experienced in designing structured data pipelines, integrating LLM-based workflows, and developing scalable full-stack platforms. Delivered production-grade systems including an AI-powered evaluation engine and developer productivity tools. Focused on applied AI, analytics, and system design for converting raw data into actionable insights.",

  skills: {
    languages: "C, C++, Java, Python, JavaScript, TypeScript",
    frontend: "React, Next.js, Tailwind CSS, HTML, CSS",
    backend: "Node.js, Express.js",
    databases: "MongoDB, Oracle, MySQL, Firebase, Supabase",
    devTools: "Git, GitHub, Docker, VS Code API",
    cloud: "Azure, GCP",
    ai: "LLM APIs (OpenAI, Gemini, groq), Prompt Engineering",
    data: "Power BI, Looker Studio, JSON Processing",
  },

  projects: [
    {
      name: "AI-Powered SWOT Analysis System",
      tech: "Python, JSON Processing, LLM APIs",
      desc: "Built structured data pipeline to parse and normalize student records into JSON, enabling automated analysis; developed AI-driven evaluation engine generating insights, risk scores, and recommendations, reducing manual counseling effort by ~60%; engineered prompt workflows to ensure consistent outputs across varied inputs; automated report generation for scalable student assessment.",
    },

    {
      name: "ARCADE (RBAC Academic Platform)",
      tech: "React, Node.js, Express, MongoDB",
      desc: "Designed and developed role-based academic platform connecting students, faculty, and alumni; implemented multi-module system including dashboards, resume repositories, and domain recommendation engine; secured APIs and authentication flows preventing unauthorized access and client-side spoofing; built multi-level content validation pipeline improving data reliability across user roles.",
    },

    {
      name: "AI Logic Commenter (VS Code Extension)",
      tech: "TypeScript, VS Code API, Gemini API",
      desc: "Developed AI-powered VS Code extension generating logic-focused documentation for code blocks; integrated real-time LLM responses using BYOK architecture for secure API usage; reduced manual documentation effort and improved code readability during development workflows; deployed as installable extension with seamless editor integration.",
    },

    {
      name: "Wander-n-Wonder (Content Platform)",
      tech: "Next.js, Prisma, Tailwind CSS",
      desc: "Built production-ready blogging platform with optimized rendering and responsive UI; designed modern frontend architecture improving user experience and content accessibility; implemented structured layout system for consistent content delivery across devices.",
    },

    {
      name: "BrainBin (Knowledge Management System)",
      tech: "HTML, CSS, JavaScript, PHP, MySQL",
      desc: "Developed structured note management system enabling efficient storage and retrieval of code snippets and documents; implemented persistent storage using local and database-backed approaches; improved data organization and access efficiency for repeated usage patterns.",
    },

    {
      name: "VS Code Themes (Dark Angel & White Devil)",
      tech: "JSON, VS Code Theming API",
      desc: "Designed and published developer-focused VS Code themes improving readability and long-session ergonomics; achieved 150+ global users through optimized syntax highlighting and contrast tuning; enhanced coding experience across varied lighting conditions.",
    },
  ],

  openSource: [
    {
      name: "Open Source Contributions",
      projects: "Keploy, Zaplink, CareXpert",
      desc: "Contributed to Keploy API testing platform improving testing workflows and developer experience; collaborated on frontend and backend architecture for Zaplink and CareXpert during GDG Sprintathon; worked across UI components, API integration, and system design in team-based environment.",
    },
  ],

  certifications: [
    "IBM Data Science Professional Certificate",
    "Meta Full-Stack Developer Specialization",
    "Google Prompt Engineering & Generative AI Essentials",
    "Google Stakeholder and People Management Essentials",
  ],

  education: {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    university: "DEPSTAR, CHARUSAT University",
    grad: "Expected Graduation: 2028",
    coursework:
      "Data Structures, Algorithms, Object-Oriented Programming, Database Systems, Operating Systems, Artificial Intelligence, Data Science & Analytics",
  },
};

export function ResumeOverride() {
  const [isActive, setIsActive] = useState(false);
  const [template, setTemplate] = useState<"minimal" | "modern" | "composite">(
    "minimal",
  );
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let buffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      )
        return;

      buffer += e.key.toLowerCase();
      if (buffer.length > 10) buffer = buffer.slice(-6);

      if (buffer.endsWith("resume") || buffer.endsWith("cv")) {
        setIsActive(true);
        buffer = "";
      }
      if (e.key === "Escape" && isActive) setIsActive(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  useEffect(() => {
    const handleOpenResume = () => {
      setIsActive(true);
    };

    window.addEventListener("open-resume", handleOpenResume);
    return () => window.removeEventListener("open-resume", handleOpenResume);
  }, []);

  useEffect(() => {
    if (isActive) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isActive]);

  const handleDownload = () => {
    const printElement = printRef.current;
    if (!printElement) return;

    // Create a iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // Extract Tailwind CSS from the main window so the PDF renders beautifully
    const styleElements = document.querySelectorAll(
      'style, link[rel="stylesheet"]',
    );
    const styles = Array.from(styleElements)
      .map((el) => el.outerHTML)
      .join("");

    // Inject the isolated resume into the iframe
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.name} - Resume</title>
          ${styles}
          <style>
            @page { margin: 0; size: auto; }
            body { 
              margin: 0; 
              background: white !important; 
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important; 
            }
            #printable-resume { 
              box-shadow: none !important; 
              width: 100%; 
              max-width: 800px; 
              margin: 0 auto; 
            }
          </style>
        </head>
        <body>
          ${printElement.outerHTML}
        </body>
      </html>
    `);
    iframeDoc.close();

    // Wait for styles to apply, trigger the print dialog, and clean up the iframe
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div className="w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
            {/* LEFT SIDEBAR: CONTROLS */}
            <div className="w-full md:w-80 border-r border-border bg-muted/20 flex flex-col shrink-0">
              <div className="p-6 border-b border-border flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2 text-foreground font-mono font-bold tracking-widest text-sm uppercase">
                  <FileText size={16} className="text-primary" />
                  CV_Generator
                </div>
                <button
                  onClick={() => setIsActive(false)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div
                className="p-6 flex-grow flex flex-col gap-6 overflow-y-auto overscroll-contain min-h-0"
                data-lenis-prevent="true"
              >
                <div>
                  <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                    Signal Format
                  </h3>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setTemplate("minimal")}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${template === "minimal" ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-muted-foreground text-foreground"}`}
                    >
                      <LayoutTemplate size={18} />
                      <div>
                        <p className="font-bold text-sm">ATS Kernel</p>
                        <p className="text-[10px] opacity-70">
                          Strict, dense, machine-readable.
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={() => setTemplate("modern")}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${template === "modern" ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-muted-foreground text-foreground"}`}
                    >
                      <Briefcase size={18} />
                      <div>
                        <p className="font-bold text-sm">Modern Tech</p>
                        <p className="text-[10px] opacity-70">
                          Two-column hierarchy.
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={() => setTemplate("composite")}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${template === "composite" ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-muted-foreground text-foreground"}`}
                    >
                      <Columns size={18} />
                      <div>
                        <p className="font-bold text-sm">Executive Composite</p>
                        <p className="text-[10px] opacity-70">
                          Grid-based, high visual impact.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border bg-background shrink-0">
                <button
                  onClick={handleDownload}
                  className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  <Download size={18} /> Download PDF
                </button>
              </div>
            </div>

            {/* RIGHT SIDEBAR: PREVIEW PANE */}
            <div
              className="flex-1 bg-neutral-900/50 p-4 md:p-8 overflow-y-auto overscroll-contain min-h-0 flex justify-center items-start"
              data-lenis-prevent="true"
            >
              <div
                id="printable-resume"
                ref={printRef}
                className="w-full max-w-[800px] bg-white text-black shadow-2xl overflow-hidden"
                style={{ minHeight: "1056px", padding: "35px 40px" }}
              >
                {/* TEMPLATE 1: ATS MINIMAL (HIGH DENSITY) */}
                {template === "minimal" && (
                  <div className="font-sans leading-snug">
                    <div className="text-center mb-4">
                      <h1 className="text-3xl font-black uppercase tracking-tight mb-1">
                        {resumeData.name}
                      </h1>
                      <p className="text-sm font-bold text-neutral-800 mb-1">
                        {resumeData.role}
                      </p>
                      <p className="text-[11px] text-neutral-600">
                        {resumeData.location} •{" "}
                        <a
                          href="mailto:swayampatel2736@gmail.com"
                          target="_blank"
                        >
                          {resumeData.email}
                        </a>{" "}
                        • {resumeData.phone} •{" "}
                        <a href="https://github.com/Sp2736" target="_blank">
                          {resumeData.github}
                        </a>
                      </p>
                      <p className="text-[11px] text-neutral-600">
                        •{" "}
                        <a
                          href="https://swayam-patel-v1.vercel.app"
                          target="_blank"
                        >
                          {resumeData.portfolio}
                        </a>
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-[11px] text-neutral-800 text-justify">
                        {resumeData.summary}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-[12px] font-black uppercase border-b-[1.5px] border-black pb-0.5 mb-2 tracking-widest">
                        Technical Skills
                      </h2>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[11px]">
                          <span className="font-bold">Languages:</span>{" "}
                          {resumeData.skills.languages}
                        </p>
                        <p className="text-[11px]">
                          <span className="font-bold">Frontend:</span>{" "}
                          {resumeData.skills.frontend}
                        </p>
                        <p className="text-[11px]">
                          <span className="font-bold">Backend & DB:</span>{" "}
                          {resumeData.skills.backend} |{" "}
                          {resumeData.skills.databases}
                        </p>
                        <p className="text-[11px]">
                          <span className="font-bold">Dev & Cloud:</span>{" "}
                          {resumeData.skills.devTools} |{" "}
                          {resumeData.skills.cloud}
                        </p>
                        <p className="text-[11px]">
                          <span className="font-bold">AI & Data:</span>{" "}
                          {resumeData.skills.ai} | {resumeData.skills.data}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-[12px] font-black uppercase border-b-[1.5px] border-black pb-0.5 mb-2 tracking-widest">
                        Selected Projects
                      </h2>
                      <div className="flex flex-col gap-2.5">
                        {resumeData.projects.map((proj, i) => (
                          <div key={i}>
                            <div className="flex justify-between items-baseline mb-0.5">
                              <h3 className="text-[12px] font-bold">
                                {proj.name}
                              </h3>
                              <span className="text-[10px] font-mono text-neutral-600">
                                {proj.tech}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-800">
                              {proj.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-[12px] font-black uppercase border-b-[1.5px] border-black pb-0.5 mb-2 tracking-widest">
                        Open Source
                      </h2>
                      {resumeData.openSource.map((os, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-baseline mb-0.5">
                            <h3 className="text-[12px] font-bold">{os.name}</h3>
                            <span className="text-[10px] font-mono text-neutral-600">
                              {os.projects}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-800">
                            {os.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h2 className="text-[12px] font-black uppercase border-b-[1.5px] border-black pb-0.5 mb-2 tracking-widest">
                        Education
                      </h2>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="text-[12px] font-bold">
                          {resumeData.education.degree}
                        </h3>
                        <span className="text-[11px] font-bold">
                          {resumeData.education.university}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-800 mb-0.5">
                        {resumeData.education.grad}
                      </p>
                      <p className="text-[10px] text-neutral-600">
                        <span className="font-bold">Coursework:</span>{" "}
                        {resumeData.education.coursework}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-[12px] font-black uppercase border-b-[1.5px] border-black pb-0.5 mb-2 tracking-widest">
                        Certifications
                      </h2>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {resumeData.certifications.map((cert, i) => (
                          <p key={i} className="text-[11px]">
                            • {cert}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TEMPLATE 2: MODERN TECH */}
                {template === "modern" && (
                  <div className="font-sans flex gap-6">
                    {/* Left Column */}
                    <div className="w-[35%] flex flex-col gap-5">
                      <div>
                        <h1 className="text-3xl font-black leading-none tracking-tighter mb-1">
                          {resumeData.name.split(" ")[0]}
                        </h1>
                        <h1 className="text-3xl font-light leading-none tracking-tighter mb-2">
                          {resumeData.name.split(" ")[1]}
                        </h1>
                        <p className="text-[11px] font-bold text-neutral-600 uppercase tracking-wide">
                          {resumeData.role}
                        </p>
                      </div>

                      <div>
                        <h2 className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-1.5 border-b border-neutral-200 pb-1">
                          Contact
                        </h2>
                        <div className="text-[10px] flex flex-col gap-1 text-neutral-700">
                          <p>{resumeData.phone}</p>
                          <p>
                            <a
                              href="mailto:swayampatel2736@gmail.com"
                              target="_blank"
                            >
                              {resumeData.email}
                            </a>
                          </p>
                          <p>
                            <a href="https://github.com/Sp2736" target="_blank">
                              {resumeData.github}
                            </a>
                          </p>
                          <p>
                            <a
                              href="https://swayam-patel-v1.vercel.app"
                              target="_blank"
                            >
                              {resumeData.portfolio}
                            </a>
                          </p>
                          <p>{resumeData.location}</p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-1.5 border-b border-neutral-200 pb-1">
                          Education
                        </h2>
                        <p className="text-[11px] font-bold text-black">
                          {resumeData.education.degree}
                        </p>
                        <p className="text-[10px] text-neutral-700 mb-1">
                          {resumeData.education.university}
                        </p>
                        <p className="text-[9px] text-neutral-500 mb-2">
                          {resumeData.education.grad}
                        </p>
                        <p className="text-[9px] text-neutral-500 leading-tight">
                          <span className="font-bold">Focus:</span>{" "}
                          {resumeData.education.coursework}
                        </p>
                      </div>

                      <div>
                        <h2 className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-1.5 border-b border-neutral-200 pb-1">
                          Stack
                        </h2>
                        <div className="flex flex-col gap-1.5 text-[10px]">
                          <p>
                            <span className="font-bold text-neutral-800">
                              Core:
                            </span>{" "}
                            {resumeData.skills.languages}
                          </p>
                          <p>
                            <span className="font-bold text-neutral-800">
                              Web:
                            </span>{" "}
                            {resumeData.skills.frontend},{" "}
                            {resumeData.skills.backend}
                          </p>
                          <p>
                            <span className="font-bold text-neutral-800">
                              DB & Cloud:
                            </span>{" "}
                            {resumeData.skills.databases},{" "}
                            {resumeData.skills.cloud}
                          </p>
                          <p>
                            <span className="font-bold text-neutral-800">
                              AI:
                            </span>{" "}
                            {resumeData.skills.ai}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-1.5 border-b border-neutral-200 pb-1">
                          Certifications
                        </h2>
                        <ul className="text-[10px] flex flex-col gap-1 text-neutral-700">
                          {resumeData.certifications.map((cert, i) => (
                            <li key={i} className="leading-tight">
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-[65%] flex flex-col gap-5">
                      <div>
                        <h2 className="text-[12px] font-black uppercase text-black tracking-widest border-b border-black pb-0.5 mb-2">
                          Profile
                        </h2>
                        <p className="text-[11px] leading-relaxed text-neutral-800 text-justify">
                          {resumeData.summary}
                        </p>
                      </div>

                      <div>
                        <h2 className="text-[12px] font-black uppercase text-black tracking-widest border-b border-black pb-0.5 mb-3">
                          Architectural Projects
                        </h2>
                        <div className="flex flex-col gap-3.5">
                          {resumeData.projects.map((proj, i) => (
                            <div key={i}>
                              <div className="flex justify-between items-end mb-0.5">
                                <h3 className="text-[12px] font-bold text-black">
                                  {proj.name}
                                </h3>
                                <p className="text-[9px] text-neutral-500 font-mono mb-1">
                                  {proj.tech}
                                </p>
                              </div>
                              <p className="text-[11px] text-neutral-800 leading-snug">
                                {proj.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="text-[12px] font-black uppercase text-black tracking-widest border-b border-black pb-0.5 mb-3">
                          Open Source
                        </h2>
                        {resumeData.openSource.map((os, i) => (
                          <div key={i}>
                            <div className="flex justify-between items-end mb-0.5">
                              <h3 className="text-[12px] font-bold text-black">
                                {os.name}
                              </h3>
                              <p className="text-[9px] text-neutral-500 font-mono mb-1">
                                {os.projects}
                              </p>
                            </div>
                            <p className="text-[11px] text-neutral-800 leading-snug">
                              {os.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TEMPLATE 3: EXECUTIVE COMPOSITE */}
                {template === "composite" && (
                  <div className="font-sans">
                    {/* Header Split */}
                    <div className="flex justify-between items-end border-b-2 border-black pb-3 mb-4">
                      <div>
                        <h1 className="text-4xl font-black tracking-tighter text-black leading-none">
                          {resumeData.name}
                        </h1>
                        <p className="text-sm font-bold text-neutral-600 mt-1 tracking-widest uppercase">
                          {resumeData.role}
                        </p>
                      </div>
                      <div className="text-right text-[10px] text-neutral-800 flex flex-col gap-0.5 font-mono">
                        <p>
                          <a
                            href="mailto:swayampatel2736@gmail.com"
                            target="_blank"
                          >
                            {resumeData.email}
                          </a>{" "}
                          | {resumeData.phone}
                          <span className="text-neutral-300">|</span>{" "}
                          <a href="https://github.com/Sp2736" target="_blank">
                            {resumeData.github}
                          </a>
                        </p>
                        <p>
                          <a
                            href="https://swayam-patel-v1.vercel.app"
                            target="_blank"
                          >
                            {resumeData.portfolio}
                          </a>
                        </p>
                        <p>
                          <span className="text-neutral-300">|</span>{" "}
                          {resumeData.location}
                        </p>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-[11px] text-neutral-800 leading-relaxed mb-5 font-medium text-justify">
                      {resumeData.summary}
                    </p>

                    {/* Grid Core */}
                    <div className="grid grid-cols-12 gap-6">
                      {/* Left: Projects (Takes 7 columns) */}
                      <div className="col-span-7 flex flex-col gap-4">
                        <div>
                          <h2 className="text-[11px] font-black uppercase tracking-widest bg-black text-white inline-block px-2 py-1 mb-3">
                            Engineering Projects
                          </h2>
                          <div className="flex flex-col gap-3.5">
                            {resumeData.projects.map((proj, i) => (
                              <div
                                key={i}
                                className="pl-3 border-l-2 border-neutral-300"
                              >
                                <h3 className="text-[12px] font-bold text-black leading-none mb-1">
                                  {proj.name}
                                </h3>
                                <p className="text-[9px] font-mono text-neutral-500 mb-1">
                                  {proj.tech}
                                </p>
                                <p className="text-[11px] text-neutral-800 leading-snug">
                                  {proj.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h2 className="text-[11px] font-black uppercase tracking-widest bg-black text-white inline-block px-2 py-1 mb-3">
                            Open Source
                          </h2>
                          {resumeData.openSource.map((os, i) => (
                            <div
                              key={i}
                              className="pl-3 border-l-2 border-neutral-300"
                            >
                              <h3 className="text-[12px] font-bold text-black leading-none mb-1">
                                {os.name}
                              </h3>
                              <p className="text-[11px] text-neutral-800 leading-snug">
                                {os.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Skills, Edu, Certs (Takes 5 columns) */}
                      <div className="col-span-5 flex flex-col gap-5">
                        <div>
                          <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-neutral-300 pb-1 mb-2">
                            Technical Matrix
                          </h2>
                          <div className="flex flex-col gap-1.5 text-[10px]">
                            <p>
                              <span className="font-bold block text-black">
                                Languages
                              </span>{" "}
                              <span className="text-neutral-700">
                                {resumeData.skills.languages}
                              </span>
                            </p>
                            <p>
                              <span className="font-bold block text-black">
                                Frameworks
                              </span>{" "}
                              <span className="text-neutral-700">
                                {resumeData.skills.frontend},{" "}
                                {resumeData.skills.backend}
                              </span>
                            </p>
                            <p>
                              <span className="font-bold block text-black">
                                Infrastructure & DB
                              </span>{" "}
                              <span className="text-neutral-700">
                                {resumeData.skills.databases},{" "}
                                {resumeData.skills.cloud}
                              </span>
                            </p>
                            <p>
                              <span className="font-bold block text-black">
                                AI & Tooling
                              </span>{" "}
                              <span className="text-neutral-700">
                                {resumeData.skills.ai},{" "}
                                {resumeData.skills.devTools}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-neutral-300 pb-1 mb-2">
                            Education
                          </h2>
                          <div className="text-[11px]">
                            <p className="font-bold text-black">
                              {resumeData.education.degree}
                            </p>
                            <p className="text-neutral-700">
                              {resumeData.education.university}
                            </p>
                            <p className="text-neutral-500 text-[10px] mb-1">
                              {resumeData.education.grad}
                            </p>
                            <p className="text-[10px] text-neutral-700 leading-tight border-l border-neutral-300 pl-2 ml-1 mt-1">
                              {resumeData.education.coursework}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-neutral-300 pb-1 mb-2">
                            Certifications
                          </h2>
                          <ul className="text-[10px] text-neutral-700 flex flex-col gap-1 list-none">
                            {resumeData.certifications.map((cert, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-neutral-400">▹</span>{" "}
                                {cert}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
