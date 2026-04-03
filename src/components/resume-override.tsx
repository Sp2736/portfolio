"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, X, ExternalLink } from "lucide-react";

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
    "Engineered AI-driven systems and scalable web platforms, including an automated evaluation engine processing 100+ records and reducing manual analysis effort by 60%. Experienced in building data pipelines, LLM-integrated workflows, and production-ready full-stack applications with real-world use cases.",

  skills: {
    languages: "C, C++, Java, Python, JavaScript, TypeScript",
    frontend: "React, Next.js, Tailwind CSS",
    backend: "Node.js, Express.js",
    databases: "MongoDB, PostgreSQL, MySQL, Firebase, Supabase",
    devTools: "Git, GitHub, Docker",
    cloud: "Azure, GCP",
    ai: "Workflow Automation (n8n), LLM APIs (OpenAI, Gemini), Prompt Engineering",
    data: "Power BI, Looker Studio, JSON Processing",
  },

  projects: [
    {
      name: "AI-Powered SWOT Analysis System",
      tech: "Python, JSON Processing, LLM APIs",
      link: "https://github.com/Sp2736/counseling-reports-portal",
      desc: "Architected and deployed an AI-driven evaluation engine processing 100+ structured student records, transforming raw data into actionable insights, risk scores, and recommendations; reduced manual counseling effort by ~60% through automated scoring pipelines and LLM-based workflows; engineered prompt pipelines and normalization layers ensuring consistent outputs across diverse inputs; built scalable report generation system enabling automated assessment at scale.",
    },
    {
      name: "AI-Powered Personal Productivity Assistant",
      tech: "Workflow Automation, API Integration, LLM-based Systems",
      link: "https://drive.google.com/file/d/16m9aJ6uydZ49hVnqlMSAn0PNk7VCwXIE/view?usp=sharing",
      desc: "Designed and deployed a chatbot-driven automation system using Telegram and n8n, enabling end-to-end management of scheduling and content workflows; integrated Google Calendar APIs for conversational timetable automation and reminders; built AI-assisted Instagram content posting pipelines and work-log using excel sheets to automatically update status of content posts; engineered event-driven workflows reducing manual effort in repetitive productivity tasks.",
    },
    {
      name: "ARCADE (RBAC Academic Platform)",
      tech: "React, Node.js, Express, MongoDB",
      link: "https://github.com/Sp2736/arcade",
      desc: "Designed and developed a role-based academic platform with 5+ integrated modules connecting students, faculty, and alumni; implemented secure authentication and RBAC authorization preventing unauthorized access and mitigating client-side spoofing; built RESTful APIs and modular dashboards supporting multi-role interaction and data isolation; engineered multi-level validation pipeline improving data integrity across user roles.",
    },
    {
      name: "AI Logic Commenter (VS Code Extension)",
      tech: "TypeScript, VS Code API, Gemini API",
      link: "https://marketplace.visualstudio.com/items?itemName=sp2736.logic-commenter",
      desc: "Developed and deployed an AI-powered VS Code extension generating context-aware code documentation using real-time LLM inference pipelines; integrated BYOK architecture for secure and scalable API usage; reduced manual documentation effort by ~30–40%, improving developer productivity; enabled seamless in-editor usage with real-time response handling during development workflows.",
    },
    {
      name: "VS Code Themes (Dark Angel & White Devil)",
      tech: "JSON, VS Code Theming API",
      links: [
        { label: "Dark Angel", url: "https://marketplace.visualstudio.com/items?itemName=sp2736.dark-angel-by-sp" },
        { label: "White Devil", url: "https://marketplace.visualstudio.com/items?itemName=sp2736.white-devil-by-sp" }
      ],
      desc: "Designed and published developer-focused VS Code themes on VSCode Marketplace, improving readability and long-session ergonomics; achieved 150+ global users with optimized syntax highlighting and contrast tuning; enhanced coding experience across varied lighting conditions.",
    },
  ],

  openSource: [
    {
      name: "Open Source Contributions",
      projects: "Keploy, Zaplink, CareXpert",
      desc: "Merged 3 pull requests across Zaplink and CareXpert improving frontend and backend components during GDG Sprintathon 2026; contributed to Keploy API testing platform by enhancing workflow efficiency and developer usability; implemented UI features and API integrations in collaborative, team-driven and production-grade environments.",
    },
  ],

  hackathons: [
    {
      title: "GDG Sprintathon '26",
      desc: "Participated in a university-level hackathon focused on open-source contributions, leading to 3 merged pull requests across Zaplink and CareXpert; worked on frontend and backend improvements, API integrations, and rapid prototyping in a collaborative, production-oriented environment.",
    },
    {
      title: "ThinkX Hackathon",
      desc: "Developed innovative solutions under time-constrained conditions, focusing on ideation, system design, and practical implementation of scalable concepts.",
    },
    {
      title: "Code Quest Hackathon '25",
      desc: "Engaged in competitive problem solving and collaborative coding challenges, strengthening algorithmic thinking and development efficiency.",
    },
  ],

  workshops: [
    {
      title: "Foundation of Agentic Systems – From Prompt to Production",
      desc: "Gained hands-on exposure to designing agent-based AI systems, prompt engineering strategies, and transitioning LLM workflows into production-ready pipelines.",
    },
    {
      title: "AWS Cloud Club Workshop",
      desc: "Explored cloud fundamentals including deployment models, scalable infrastructure, and practical usage of cloud services in modern applications.",
    },
    {
      title: "Hacking & Hardening – Web Vulnerabilities and WAF",
      desc: "Learned core web security concepts including common vulnerabilities, attack vectors, and defensive mechanisms using Web Application Firewalls.",
    },
    {
      title: "Edunet Green Skills AI Workshop",
      desc: "Participated in industry-oriented training focused on applied AI concepts to implement Green Skills, real-world use cases of AI/ML/DL and practical implementation strategies.",
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
    const handleOpenResume = () => setIsActive(true);
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
    // Replace this string with your actual Google Drive PDF link
    const driveLink = "https://drive.google.com/file/d/1TjCpBy2Qrc2x2swTwKMb1Xn32VdaDGUC/view?usp=drive_link";
    
    // Automatically convert a standard Google Drive viewing link into a direct download link
    const fileIdMatch = driveLink.match(/\/d\/(.*?)\//);
    
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      const directDownloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
      
      // Create a temporary anchor tag to trigger the silent download
      const a = document.createElement("a");
      a.href = directDownloadLink;
      a.download = "Swayam_Patel_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Fallback just in case you use a different hosting provider
      window.open(driveLink, "_blank");
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          <div className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-neutral-100 rounded-2xl shadow-2xl overflow-hidden border border-border">
            
            {/* MODERN HEADER CONTROL BAR */}
            <div className="flex justify-between items-center p-4 px-6 bg-white border-b border-neutral-200 shrink-0 z-10">
              <div className="flex items-center gap-3 font-mono text-sm font-bold tracking-widest text-neutral-800 uppercase">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <FileText size={18} />
                </div>
                Resume_Preview
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDownload}
                  className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  <Download size={16} /> Download PDF
                </button>
                <button
                  onClick={() => setIsActive(false)}
                  className="p-2.5 bg-neutral-100 rounded-full hover:bg-neutral-200 hover:text-destructive text-neutral-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* SCROLLABLE PREVIEW PANE */}
            {/* FIXED: Removed 'flex justify-center' which was causing the height clipping bug */}
            <div
              className="flex-1 overflow-y-auto p-4 md:p-8 bg-neutral-200/50"
              data-lenis-prevent="true"
            >
              {/* ATS MINIMAL RESUME CANVAS */}
              {/* FIXED: Added 'mx-auto' for horizontal centering and 'h-fit' to allow natural height expansion */}
              <div
                className="w-full max-w-[800px] mx-auto h-fit bg-white text-black shadow-xl ring-1 ring-neutral-200/50"
                style={{ minHeight: "1056px", padding: "35px 40px" }}
              >
                <div className="font-sans leading-snug">
                  <div className="text-center mb-4">
                    <h1 className="text-3xl font-black uppercase tracking-tight mb-1">
                      {resumeData.name}
                    </h1>
                    <p className="text-sm font-bold text-neutral-800 mb-1">
                      {resumeData.role}
                    </p>
                    <div className="text-[11px] text-neutral-600 flex justify-center items-center gap-1.5 flex-wrap">
                      <span>{resumeData.location}</span>
                      <span>•</span>
                      <a
                        href={`mailto:${resumeData.email}`}
                        target="_blank"
                        className="hover:text-black transition-colors inline-flex items-center gap-0.5"
                      >
                        {resumeData.email} <ExternalLink size={10} className="text-neutral-400" />
                      </a>
                      <span>•</span>
                      <span>{resumeData.phone}</span>
                    </div>
                    <div className="text-[11px] text-neutral-600 flex justify-center items-center gap-1.5 flex-wrap mt-0.5">
                      <a href={resumeData.linkedin} target="_blank" className="hover:text-black transition-colors inline-flex items-center gap-0.5">
                        LinkedIn <ExternalLink size={10} className="text-neutral-400" />
                      </a>
                      <span>•</span>
                      <a href={resumeData.github} target="_blank" className="hover:text-black transition-colors inline-flex items-center gap-0.5">
                        GitHub <ExternalLink size={10} className="text-neutral-400" />
                      </a>
                      <span>•</span>
                      <a
                        href={resumeData.portfolio}
                        target="_blank"
                        className="hover:text-black transition-colors inline-flex items-center gap-0.5"
                      >
                        Portfolio <ExternalLink size={10} className="text-neutral-400" />
                      </a>
                    </div>
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
                            <h3 className="text-[12px] font-bold flex flex-wrap items-center gap-1">
                              {proj.link ? (
                                <a href={proj.link} target="_blank" className="hover:text-neutral-600 transition-colors inline-flex items-center gap-0.5">
                                  {proj.name} <ExternalLink size={10} className="text-neutral-400" />
                                </a>
                              ) : proj.links ? (
                                <>
                                  {proj.name}
                                  {proj.links.map((lnk, idx) => (
                                    <a key={idx} href={lnk.url} target="_blank" className="hover:text-neutral-800 transition-colors inline-flex items-center gap-0.5 ml-1 text-neutral-500 font-normal text-[10px]">
                                      ({lnk.label}) <ExternalLink size={10} className="text-neutral-400" />
                                    </a>
                                  ))}
                                </>
                              ) : (
                                proj.name
                              )}
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
                      Hackathons & Workshops
                    </h2>
                    <div className="flex flex-col gap-2.5">
                      {resumeData.hackathons.map((hack, i) => (
                        <div key={`hack-${i}`}>
                          <h3 className="text-[12px] font-bold mb-0.5">{hack.title}</h3>
                          <p className="text-[11px] text-neutral-800">{hack.desc}</p>
                        </div>
                      ))}
                      {resumeData.workshops.map((ws, i) => (
                        <div key={`ws-${i}`}>
                          <h3 className="text-[12px] font-bold mb-0.5">{ws.title}</h3>
                          <p className="text-[11px] text-neutral-800">{ws.desc}</p>
                        </div>
                      ))}
                    </div>
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
              </div>
            </div>
            
            {/* MOBILE DOWNLOAD BUTTON (Sticky Bottom) */}
            <div className="p-4 bg-white border-t border-neutral-200 sm:hidden">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  <Download size={16} /> Download PDF
                </button>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}