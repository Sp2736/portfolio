"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ExternalLink, Server } from "lucide-react";

const externalLogs = [
  {
    id: "log-01",
    date: "MAR 2026",
    title: "Marks v/s Understanding",
    category: "University Diaries",
    excerpt: "Two students may score the same marks in an exam, yet their actual understanding of the subject can be completely different.",
    link: "https://wander-n-wonder.vercel.app/posts/the-difference-between-studying-for-marks-vs-understanding-concepts" 
  },
  {
    id: "log-02",
    date: "MAR 2026",
    title: "Debugging is IT",
    category: "Brain Dumps",
    excerpt: "In reality, a large portion of programming time is spent doing something far less glamorous but far more important: debugging.",
    link: "https://wander-n-wonder.vercel.app/posts/why-debugging-is-the-real-programming-skill"
  },
  {
    id: "log-03",
    date: "FEB 2026",
    title: "Will AI Replace Us?",
    category: "Fun Facts and TIL",
    excerpt: "The narrative sounds dramatic, but the reality is much more interesting.",
    link: "https://wander-n-wonder.vercel.app/posts/why-ai-will-change-programming-but-not-replace-programmers"
  }
];

export function Blog() {
  return (
    // Purged: bg-background
    <section className="w-full py-12 px-6 relative z-10" id="blog">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-5 flex flex-col gap-6" data-code="<ExternalGateway target='Wander-n-Wonder' />">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4 text-primary">
              <Server size={24} />
              <h2 className="font-mono text-sm tracking-widest uppercase font-bold">External Deployment</h2>
            </div>
            <h3 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">
              Wander-n-Wonder.
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I don't just write code; I write documentation, architecture breakdowns, and poetry. 
              Instead of building a static blog here, I engineered a dedicated, scalable platform to house my thoughts.
            </p>
            
            <a 
              href="https://wander-n-wonder.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-mono text-sm font-semibold group shadow-[0_0_20px_rgba(var(--primary),0.3)]"
            >
              Launch Platform 
              <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="text-sm font-mono text-muted-foreground mb-2 flex items-center gap-2">
            <BookOpen size={14} /> Featured Transmissions
          </div>
          {externalLogs.map((log, i) => (
            <motion.a
              href={log.link}
              target="_blank"
              rel="noopener noreferrer"
              key={log.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              // Applied Glassmorphism
              className="group block p-6 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md shadow-xl hover:border-primary/50 hover:bg-background/60 transition-all relative overflow-hidden"
              data-code={`<Redirect to='${log.id}' />`}
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
                
                <div className="hidden md:flex w-10 h-10 rounded-full border border-border/50 bg-background/50 items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all shrink-0">
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