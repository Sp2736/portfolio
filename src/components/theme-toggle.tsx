"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-background/50 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-muted active:scale-95 overflow-hidden group"
    >
      <div className="relative flex items-center justify-center w-5 h-5">
        <Moon className={`absolute w-4 h-4 transition-all duration-500 ${isDark ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
        <Sun className={`absolute w-4 h-4 transition-all duration-500 ${isDark ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
      </div>
      <span className="font-mono text-xs font-semibold tracking-widest uppercase transition-colors">
        {isDark ? "Dark Angel" : "White Devil"}
      </span>
    </button>
  );
}