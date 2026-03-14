"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Terminal, Home, Cpu, Layers, BookOpen, History } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100 && !isScrolled) setIsScrolled(true);
    if (latest <= 100 && isScrolled) setIsScrolled(false);
  });

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "init", id: "#hero", icon: Home },
    { name: "arsenal", id: "#skills", icon: Cpu },
    { name: "chronology", id: "#chronology", icon: History }, 
    { name: "deployments", id: "#projects", icon: Layers },
    { name: "logs", id: "#blog", icon: BookOpen },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? -100 : 0, opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-40 px-6 py-6 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <a
            href="#hero"
            onClick={(e) => handleNav(e, "#hero")}
            className="flex items-center gap-2 font-mono font-bold text-lg tracking-tighter hover:opacity-80 transition-opacity"
          >
            <Terminal size={20} className="text-primary" />
            <span>
              SP<span className="text-primary">.</span>SYS
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 font-mono text-sm font-semibold text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.id}
                onClick={(e) => handleNav(e, link.id)}
                className="hover:text-primary transition-colors"
              >
                ./{link.name}
              </a>
            ))}
          </nav>
          <div className="w-32"></div> 
        </div>
      </motion.header>

      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: isScrolled ? 0 : 100, opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        // Applied Glassmorphism
        className="fixed top-1/2 -translate-y-1/2 right-6 z-50 hidden md:flex flex-col gap-6 py-6 px-3 bg-background/40 backdrop-blur-md border border-border/50 rounded-full shadow-xl"
      >
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-colors group relative"
        >
          <Terminal size={20} />
          <span className="absolute right-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-background/80 backdrop-blur-sm border border-border/50 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Home
          </span>
        </a>
        <div className="w-full h-[1px] bg-border/50"></div>
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.id}
              onClick={(e) => handleNav(e, link.id)}
              className="p-2 rounded-full text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors group relative"
            >
              <Icon size={20} />
              <span className="absolute right-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-background/80 backdrop-blur-sm border border-border/50 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none capitalize shadow-lg">
                {link.name}
              </span>
            </a>
          );
        })}
      </motion.nav>
    </>
  );
}