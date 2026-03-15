"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Palette } from "lucide-react";

const themes = [
  { id: "dark", name: "Dark Angel" },
  { id: "light", name: "White Devil" },
  { id: "solar", name: "Solar Flare" },
  { id: "cosmic", name: "Cosmic Space" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentThemeName = themes.find((t) => t.id === theme)?.name || "Dark Angel";

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/80 backdrop-blur-md transition-all duration-300 hover:bg-muted active:scale-95 group font-mono text-xs font-bold uppercase tracking-widest shadow-lg"
      >
        <Palette size={14} className="text-primary group-hover:rotate-12 transition-transform" />
        {currentThemeName}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-12 right-0 w-48 bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`text-left px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                  theme === t.id ? "bg-primary/10 text-primary border-l-2 border-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground border-l-2 border-transparent"
                }`}
              >
                {t.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}