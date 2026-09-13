"use client";

import { motion, Variants } from "framer-motion";
import {
  Briefcase,
  ExternalLink,
  Code2,
  Globe,
  Bot,
  Palette,
} from "lucide-react";

const gigData = [
  {
    id: "fullstack-web",
    title: "Full-Stack Web Development",
    category: "Web Development",
    icon: Globe,
    description: "End-to-end web application development using React, Next.js, and Node.js. From architecture to deployment.",
    deliverables: ["Responsive UI", "REST API", "DB Schema", "Deployment"],
    techStack: ["Next.js", "React", "Node.js", "MongoDB"],
    fiverrUrl: "https://www.fiverr.com/swayampatel440/build-a-full-stack-web-app-using-react-next-js-and-node-js/",
    status: "available",
  },
  {
    id: "website-copy",
    title: "Persuasive Website Copy",
    category: "Copywriting",
    icon: Palette,
    description: "Write persuasive website copy that converts visitors into customers. Crafted to engage and drive action.",
    deliverables: ["Website Copy", "Landing Pages", "Brand Messaging"],
    techStack: ["Copywriting", "Sales Funnels", "UX Writing"],
    fiverrUrl: "https://www.fiverr.com/swayampatel440/write-persuasive-website-copy-that-converts-visitors-into-customers/",
    status: "available",
  },
  {
    id: "seo-blog",
    title: "SEO Optimized Blog Posts",
    category: "Content Writing",
    icon: Bot,
    description: "Write SEO optimized blog posts and articles that rank. High-quality, engaging content tailored to your niche.",
    deliverables: ["SEO Articles", "Keyword Research", "Blog Posts"],
    techStack: ["SEO", "Content Strategy", "Writing"],
    fiverrUrl: "https://www.fiverr.com/swayampatel440/write-seo-optimized-blog-posts-and-articles-that-rank/",
    status: "available",
  },
];

// ── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const containerVars: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVars: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

// ── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest border ${
        status === "available"
          ? "bg-green-500/10 text-green-500 border-green-500/30"
          : "bg-muted/50 text-muted-foreground border-border/30"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "available" ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
        }`}
      />
      {status}
    </span>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function Freelance() {
  return (
    <section className="w-full py-20 px-6 relative z-10" id="freelance">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase mb-2">
            Client Work
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Freelance{" "}
            <span className="text-primary underline decoration-primary/30 underline-offset-8">
              Services
            </span>
          </h3>
          <p className="text-sm text-muted-foreground max-w-xl">
            Available on Fiverr for client web applications, developer tooling, and
            AI integrations. Precision-built, production-deployed.
          </p>
          <a
            href="https://www.fiverr.com/swayampatel440"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 text-xs font-mono font-bold text-primary hover:underline underline-offset-4"
          >
            <ExternalLink size={12} />
            View Fiverr Profile → swayampatel440
          </a>
        </div>

        {/* Gig Grid */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {gigData.map((gig) => {
            const Icon = gig.icon;
            return (
              <motion.div
                key={gig.id}
                variants={itemVars}
                className="group flex flex-col p-6 rounded-2xl bg-background/5 backdrop-blur-md border border-border/30 shadow-xl hover:bg-background/60 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        {gig.category}
                      </p>
                      <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {gig.title}
                      </h4>
                    </div>
                  </div>
                  <StatusBadge status={gig.status} />
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 grow">
                  {gig.description}
                </p>

                {/* Deliverables */}
                <div className="mb-4">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    Deliverables
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {gig.deliverables.map((d, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono rounded-md bg-primary/10 text-primary border border-primary/20"
                      >
                        <span className="text-primary opacity-60">▹</span> {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech + CTA */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/30">
                  <div className="flex flex-wrap gap-1.5">
                    {gig.techStack.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider rounded bg-secondary text-secondary-foreground border border-border/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={gig.fiverrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1.5 px-3 py-2 text-[10px] font-mono font-bold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    <Briefcase size={12} />
                    Hire
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* TODO notice */}
        <p className="text-center text-[10px] font-mono text-muted-foreground/50">
          {/* TODO: Update gig entries with confirmed Fiverr gig titles and descriptions */}
          Gig data self-reported. Profile: fiverr.com/swayampatel440
        </p>
      </div>
    </section>
  );
}
