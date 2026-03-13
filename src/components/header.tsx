"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-40 px-6 py-6 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        <div 
          className="flex items-center gap-2 font-mono font-bold text-lg tracking-tighter"
          data-code="<Logo owner='SP' status='online' />"
        >
          <Terminal size={20} className="text-primary" />
          <span>SP<span className="text-primary">.</span>SYS</span>
        </div>

        <nav 
          className="hidden md:flex items-center gap-8 font-mono text-sm font-semibold text-muted-foreground"
          data-code="<Navigation links={['init', 'deployments', 'blog']} />"
        >
          <a href="#hero" className="hover:text-primary transition-colors">./init</a>
          <a href="#projects" className="hover:text-primary transition-colors">./deployments</a>
          <a href="#blog" className="hover:text-primary transition-colors">~/wander-n-wonder</a>
        </nav>

        {/* Space for the absolute positioned ThemeToggle */}
        <div className="w-32"></div>
      </div>
    </motion.header>
  );
}