"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type CommandHistory = {
  command: string;
  output: React.ReactNode;
};

export function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "help",
      output: (
        <div className="flex flex-col gap-1 text-sm">
          <span>Available commands:</span>
          <span className="text-primary">whoami<span className="text-foreground"> - display identity</span></span>
          <span className="text-primary">skills<span className="text-foreground"> - list technical arsenal</span></span>
          <span className="text-primary">projects<span className="text-foreground"> - view current deployments</span></span>
          <span className="text-primary">credentials<span className="text-foreground"> - validate system clearances</span></span>
          <span className="text-primary">read poetry<span className="text-foreground"> - [REDACTED]</span></span>
          <span className="text-primary">clear<span className="text-foreground"> - clear terminal</span></span>
        </div>
      ),
    },
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="flex flex-col gap-1 text-sm">
            <span>Available commands:</span>
            <span className="text-primary">whoami<span className="text-foreground"> - display identity</span></span>
            <span className="text-primary">skills<span className="text-foreground"> - list technical arsenal</span></span>
            <span className="text-primary">projects<span className="text-foreground"> - view current deployments</span></span>
            <span className="text-primary">credentials<span className="text-foreground"> - validate system clearances</span></span>
            <span className="text-primary">read poetry<span className="text-foreground"> - [REDACTED]</span></span>
            <span className="text-primary">clear<span className="text-foreground"> - clear terminal</span></span>
          </div>
        );
        break;
      case "whoami":
        output = "Swayam Patel. Computer Science Student at Charusat University. Full-Stack Developer, Systems Architect, and Builder of Things.";
        break;
      case "skills":
        output = "Java, C++, React, Next.js, Python, MySQL, Prisma, Git, Ubuntu ecosystem.";
        break;
      case "projects":
        output = (
          <div className="flex flex-col gap-1">
            <span>&gt; ARCADE: Role-based digital ecosystem for universities.</span>
            <span>&gt; BRAINBIN: Knowledge management & note-taking tool.</span>
            <span>&gt; Wander-n-Wonder: Personal blog platform.</span>
            <span>&gt; Logic Commenter: AI-powered VS Code extension.</span>
          </div>
        );
        break;
      case "credentials":
      case "verify credentials":
        output = (
          <div className="flex flex-col gap-2 mt-1">
            <span className="text-muted-foreground italic text-xs">Initiating secure handshake...</span>
            <div className="border-l-2 border-primary pl-3 flex flex-col gap-1 bg-primary/5 py-2 pr-2 rounded-r-md">
              <span className="text-primary font-bold text-xs tracking-widest uppercase">Coursera Secure_ID: [Verified]</span>
              <span className="text-foreground font-bold">Object-Oriented Hierarchies in Java</span>
              <span className="text-xs text-muted-foreground">Validating structural architecture, inheritance patterns, and scalable logic design.</span>
            </div>
            <span className="text-muted-foreground italic text-xs mt-1">Awaiting further clearance uploads...</span>
          </div>
        );
        break;
      case "read poetry":
        output = (
          <span className="italic text-accent-foreground/80">
            Fetching excerpt from "BEFORE I LEARNED GOODBYE"...<br/>
            "The compiler does not care about your broken heart, but the art remains."
          </span>
        );
        break;
      case "sudo":
        output = "Nice try. This incident will be reported to the system administrator.";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "":
        output = "";
        break;
      default:
        output = `Command not found: ${cmd}. Type 'help' for a list of commands.`;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      // Applied Glassmorphism
      className="w-full max-w-lg rounded-xl border border-border/50 bg-background/40 backdrop-blur-md shadow-2xl overflow-hidden font-mono text-sm flex flex-col h-[350px]"
      onClick={() => inputRef.current?.focus({ preventScroll: true })} 
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-background/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        </div>
        <div className="mx-auto text-xs text-muted-foreground select-none">swayam@ubuntu:~</div>
      </div>

      <div ref={containerRef} className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-2">
        {history.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            {item.command && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">➜</span>
                <span className="text-secondary-foreground">~</span>
                <span>{item.command}</span>
              </div>
            )}
            {item.output && <div className="text-foreground/90 pl-4">{item.output}</div>}
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
          <span className="text-primary">➜</span>
          <span className="text-secondary-foreground">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-foreground"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </motion.div>
  );
}