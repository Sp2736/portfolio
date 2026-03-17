"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Variants, animate, useAnimation } from "framer-motion";
import { Terminal } from "lucide-react";

// Scrambles text randomly before settling on the target string
function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  useEffect(() => {
    let iteration = 0;
    let animationFrame: number;

    const scramble = () => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join(""),
      );

      if (iteration < text.length) {
        iteration += 1 / 3; // Controls the speed of decryption
        animationFrame = requestAnimationFrame(scramble);
      }
    };

    animationFrame = requestAnimationFrame(scramble);
    return () => cancelAnimationFrame(animationFrame);
  }, [text]);

  return <span>{displayText}</span>;
}

// Main Preloader Component
interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "complete">("loading");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const controls = animate(0, 100, {
      duration: 2.5,
      ease: [0.83, 0, 0.17, 1], // Luxurious cinematic easing
      onUpdate: (value) => setProgress(Math.round(value)),
      onComplete: () => {
        setPhase("complete");
        setTimeout(() => {
          onComplete();
          document.body.style.overflow = "auto";
        }, 800); // Wait for the exit animation to finish
      },
    });

    return () => {
      controls.stop();
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden"
      initial={{
        y: 0,
        borderBottomLeftRadius: "0%",
        borderBottomRightRadius: "0%",
      }}
      exit={{
        y: "-100vh",
        // THE LIQUID CURTAIN EFFECT: Bends the bottom as it accelerates up
        borderBottomLeftRadius: "50%",
        borderBottomRightRadius: "50%",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* BACKGROUND VFE: Ambient Grid & Pulse */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border border-primary/30"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full border border-primary/20"
        />
        {/* Dynamic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_80%)]" />
      </div>

      {/* FOREGROUND: Core Identity */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* Logo Block */}
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="flex items-center gap-3 text-4xl md:text-5xl font-black tracking-tighter"
          >
            <motion.div
              animate={
                phase === "complete"
                  ? { rotate: 90, scale: 1.2, color: "var(--primary)" }
                  : {}
              }
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <Terminal size={36} className="text-primary" strokeWidth={2.5} />
            </motion.div>
            <span>
              SP<span className="text-primary animate-pulse">.</span>SYS
            </span>
          </motion.div>
        </div>

        {/* Scrambled Subtitle */}
        <div className="h-6 mb-12 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground text-center"
          >
            {/* The text physically decrypts on screen */}
            {progress > 10 ? (
              <ScrambleText text="SYSTEM ARCHITECT" />
            ) : (
              "INITIALIZING..."
            )}
          </motion.div>
        </div>

        {/* PROGRESS VISUALIZATION */}
        <div className="w-full relative flex flex-col items-center">
          {/* Progress Bar Track */}
          <div className="w-full h-[2px] bg-border/40 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_20px_rgba(var(--primary),1)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {/* Telemetry Numbers */}
          <div className="w-full flex justify-between items-end mt-4 font-mono text-xs md:text-sm font-bold">
            <div className="flex flex-col">
              <span className="text-muted-foreground tracking-widest uppercase text-[8px] md:text-[9px] opacity-70">
                Status
              </span>
              <span
                className={
                  phase === "complete" ? "text-primary" : "text-foreground"
                }
              >
                {phase === "complete" ? "ACCESS GRANTED" : "DECRYPTING_"}
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-muted-foreground tracking-widest uppercase text-[8px] md:text-[9px] opacity-70">
                Load
              </span>
              <span className="text-primary text-base md:text-lg">
                {progress.toString().padStart(3, "0")}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
