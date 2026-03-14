"use client";

import { motion } from "framer-motion";
import { Brain, Code, Database, Shield, Cloud, Lightbulb } from "lucide-react";

const certData = [
  {
    id: "ai",
    title: "AI & Prompt Engineering",
    issuer: "Google / Vanderbilt",
    icon: Brain,
    skills: ["LLM Reasoning", "Generative AI Ethics", "Prompt Design"],
    certs: [
      "Prompt Engineering Specialization",
      "ChatGPT Advanced Data Analysis",
      "Trustworthy Generative AI",
      "Google AI & Prompting Essentials",
    ],
  },
  {
    id: "swe",
    title: "Software Engineering",
    issuer: "Meta",
    icon: Code,
    skills: ["Frontend", "JS/TS", "Version Control"],
    certs: [
      "Meta Full-Stack Developer",
      "Programming with JavaScript",
      "HTML & CSS in Depth",
      "Intro to Databases",
    ],
  },
  {
    id: "data",
    title: "Data Science",
    issuer: "IBM",
    icon: Database,
    skills: ["Python", "Data Analysis", "Machine Learning"],
    certs: [
      "Python for Data Science",
      "Data Analysis & Visualization",
      "Machine Learning Basics",
    ],
  },
  {
    id: "prog",
    title: "Core Programming",
    issuer: "NPTEL / Coursera",
    icon: Code,
    skills: ["C/C++", "Java", "Memory Management"],
    certs: [
      "Object-Oriented Hierarchies in Java",
      "C Programming & Assembly",
      "Modern C++",
    ],
  },
  {
    id: "sec",
    title: "Cyber Security",
    issuer: "Independent",
    icon: Shield,
    skills: ["Ethical Hacking", "WAF", "System Hardening"],
    certs: [
      "Ethical Hacking Foundations",
      "Web Vulnerabilities & WAF",
      "Hacking & Hardening",
    ],
  },
  {
    id: "lead",
    title: "Leadership & Cloud",
    issuer: "Google / AWS",
    icon: Cloud,
    skills: ["Project Management", "Agile", "Cloud Architecture"],
    certs: [
      "AWS Cloud Club Completion",
      "Google People Management",
      "Deloitte Technology Program",
    ],
  },
];

export function Certifications() {
  return (
    <section className="w-full py-12 px-6 relative z-10" id="certifications">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center" data-code="<Validation src='authorities' />">
          <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-2">The Evidence Locker</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Verified Knowledge</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certData.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-background/40 backdrop-blur-md border border-border/50 shadow-xl hover:bg-background/60 hover:border-primary/50 transition-all flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground bg-background/50 border border-border/50 px-2 py-1 rounded-full">
                    {category.issuer}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-foreground mb-1">{category.title}</h4>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {category.skills.map((skill, i) => (
                    <span key={i} className="text-[10px] font-mono text-primary">
                      #{skill.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>

                <ul className="mt-auto space-y-2 border-t border-border/50 pt-4">
                  {category.certs.map((cert, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5 opacity-50">▹</span>
                      <span className="leading-snug">{cert}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}