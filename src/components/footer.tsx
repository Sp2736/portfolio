"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CupSoda, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const [shakesConsumed, setShakesConsumed] = useState(142);
  const [showToast, setShowToast] = useState(false);

  const handleFuelClick = () => {
    setShakesConsumed((prev) => prev + 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <footer className="w-full border-t border-border/50 bg-background/40 backdrop-blur-md relative z-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-sm text-muted-foreground flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Swayam Patel.</span>
          <span className="hidden md:inline">System stable.</span>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">
            <Github size={18} />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
