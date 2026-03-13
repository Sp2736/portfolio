"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Terminal } from "lucide-react";

const logs = [
  {
    id: "log-01",
    date: "MAR 2026",
    title: "System Architecture of ARCADE",
    category: "Engineering",
    excerpt: "Breaking down the transition from a monolithic structure to a role-based digital ecosystem using Next.js and Prisma.",
    link: "#"
  },
  {
    id: "log-02",
    date: "MAR 2026",
    title: "BEFORE I LEARNED GOODBYE",
    category: "Poetry",
    excerpt: "The compiler does not care about your broken heart. A collection of thoughts, published and preserved.",
    link: "#"
  },
  {
    id: "log-03",
    date: "FEB 2026",
    title: "Building Wander-n-Wonder",
    category: "Full-Stack",
    excerpt: "Designing the database schema and deployment pipeline for a personal, scalable blogging platform.",
    link: "#"
  },
  {
    id: "log-04",
    date: "JAN 2026",
    title: "AI Context in VS Code",
    category: "Tooling",
    excerpt: "How Logic Commenter uses AST parsing and LLMs to generate standardized codebase documentation.",
    link: "#"
  }
];

export function Blog() {
  return (
    <section className="w-full py-24 px-6 relative z-10 bg-background" id="blog">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: The Platform Identity */}
        <div className="lg:col-span-4 flex flex-col gap-6" data-code="<Module name='Wander-n-Wonder' />">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4 text-primary">
              <BookOpen size={24} />
              <h2 className="font-mono text-sm tracking-widest uppercase font-bold">~/wander-n-wonder</h2>
            </div>
            <h3 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">
              System Logs &<br />
              <span className="text-muted-foreground">Human Thoughts.</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A dedicated space for documentation. From optimizing database queries and building AI extensions, to the poetry written between commits. 
            </p>
            
            <button className="mt-8 flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-mono text-sm font-semibold group">
              Access Full Platform 
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Right Side: The Log Entries */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {logs.map((log, i) => (
            <motion.a
              href={log.link}
              key={log.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group block p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors relative overflow-hidden"
              data-code={`<Article id='${log.id}' type='${log.category}' />`}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 font-mono text-xs font-bold">
                    <span className="text-muted-foreground">{log.date}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className={log.category === 'Poetry' ? 'text-secondary' : 'text-primary'}>
                      {log.category}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {log.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {log.excerpt}
                  </p>
                </div>
                
                <div className="hidden md:flex w-10 h-10 rounded-full border border-border items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all shrink-0">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}