"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {

  return (
    <footer className="w-full border-t border-border/30 bg-background/5 backdrop-blur-md relative z-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-sm text-muted-foreground flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Swayam Patel.</span>
          <span className="hidden md:inline">System stable.</span>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="https://github.com/Sp2736" className="hover:text-primary transition-colors">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/swayam-patel-316ba5317" className="hover:text-primary transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:swayampatel2736@gmail.com" className="hover:text-primary transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
