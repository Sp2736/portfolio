"use client";

import { useState } from "react";
import { motion, Variants, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  Terminal, Cpu, Layers, BookOpen, 
  History, Coffee, Award 
} from "lucide-react";
import { useLenis } from "lenis/react";

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

  // Updated to your exact 7 navigation items
  // Note: "Home" is handled separately as the Terminal icon in the sidebar
  const navLinks = [
    { name: "deployments", id: "#projects", icon: Layers },
    { name: "arsenal", id: "#skills", icon: Cpu },
    { name: "chronology", id: "#chronology", icon: History }, 
    { name: "un-professional", id: "#capabilities", icon: Coffee },
    { name: "certifications", id: "#certifications", icon: Award },
    { name: "blogs", id: "#blog", icon: BookOpen },
  ];

  return (
    <>
      {/* TOP HEADER (Visible at the very top of the page) */}
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
          
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs lg:text-sm font-semibold text-muted-foreground">
            <a
              href="#hero"
              onClick={(e) => handleNav(e, "#hero")}
              className="hover:text-primary transition-colors"
            >
              ./home
            </a>
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
          <div className="w-32 hidden md:block"></div> 
        </div>
      </motion.header>

      {/* FLOATING SIDEBAR (Appears when scrolling down) */}
      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: isScrolled ? 0 : 100, opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        // Added scaling and compressed padding to prevent overlapping with bottom buttons
        className="fixed top-1/2 -translate-y-1/2 right-2 md:right-6 z-50 hidden md:flex flex-col items-center gap-1.5 p-2 bg-background/50 backdrop-blur-xl border border-border/50 rounded-full shadow-2xl scale-[0.85] sm:scale-100 origin-right"
      >
        {/* Home / Init Button */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/20 text-primary transition-colors group relative"
        >
          <Terminal size={18} strokeWidth={2} />
          <span className="absolute right-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-background/90 backdrop-blur-sm border border-border/50 rounded-md text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg whitespace-nowrap text-foreground">
            Home
          </span>
        </a>

        {/* Divider */}
        <div className="w-5 h-[1px] bg-border/50 my-1"></div>

        {/* The rest of the nav links */}
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.id}
              onClick={(e) => handleNav(e, link.id)}
              className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:bg-background/80 hover:text-foreground transition-all group relative"
            >
              <Icon size={18} strokeWidth={1.5} />
              <span className="absolute right-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-background/90 backdrop-blur-sm border border-border/50 rounded-md text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none capitalize shadow-lg whitespace-nowrap text-foreground">
                {link.name}
              </span>
            </a>
          );
        })}
      </motion.nav>
    </>
  );
}