"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Cpu, Network, Zap, HardDrive, Clock, MapPin, Maximize, Monitor } from "lucide-react";

export function Telemetry() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Dynamic metrics
  const [fps, setFps] = useState(60);
  const [ping, setPing] = useState(12);
  const [nodes, setNodes] = useState(0);
  const [memory, setMemory] = useState(45.2);
  const [uptime, setUptime] = useState(0);
  
  // Real system hardware metrics
  const [viewport, setViewport] = useState("");
  const [cores, setCores] = useState(0);
  const [platform, setPlatform] = useState("");
  const [connection, setConnection] = useState("unknown");

  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);

  // Initialize System Data
  useEffect(() => {
    setViewport(`${window.innerWidth}x${window.innerHeight}`);
    setCores(navigator.hardwareConcurrency || 0);
    // @ts-ignore - Vendor prefix/experimental feature
    setPlatform(navigator.userAgentData?.platform || navigator.platform || "Unknown");
    // @ts-ignore
    setConnection(navigator.connection?.effectiveType || "4g");

    const handleResize = () => setViewport(`${window.innerWidth}x${window.innerHeight}`);
    window.addEventListener("resize", handleResize);

    const startTime = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  const calculateFPS = (time: number) => {
    frameCountRef.current += 1;
    const delta = time - lastTimeRef.current;

    if (delta >= 1000) {
      setFps(Math.round((frameCountRef.current * 1000) / delta));
      frameCountRef.current = 0;
      lastTimeRef.current = time;
      
      setPing(Math.floor(Math.random() * 8) + 12);
      setNodes(document.querySelectorAll('*').length);
      setMemory(+(45 + Math.random() * 5).toFixed(1));
    }
    requestRef.current = requestAnimationFrame(calculateFPS);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(calculateFPS);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const getStatusColor = (val: number, threshold: number) => 
    val >= threshold ? "text-green-500" : val >= threshold - 10 ? "text-yellow-500" : "text-red-500";

  const formatUptime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full border border-border/50 bg-background/40 backdrop-blur-md shadow-xl hover:bg-background/60 transition-all active:scale-95 group"
      >
        <Activity size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-24 z-50 w-80 bg-background/70 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl p-5 font-mono text-xs overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-primary animate-pulse" />
                <span className="font-bold tracking-widest uppercase">System Diagnostics</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-background/50 px-2 py-0.5 rounded-full border border-border/50">
                <MapPin size={10} /> Local
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Cpu size={12}/> Logic Cores</span>
                <span className="font-bold text-sm text-foreground">{cores} <span className="text-[10px] text-muted-foreground">Threads</span></span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Network size={12}/> Connection</span>
                <span className="font-bold text-sm text-green-500 uppercase">{connection} <span className="text-[10px] text-muted-foreground">Ping: {ping}ms</span></span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><HardDrive size={12}/> Heap Mem</span>
                <span className="font-bold text-sm text-primary">{memory} <span className="text-[10px] text-muted-foreground">MB</span></span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Monitor size={12}/> Client Env</span>
                <span className="font-bold text-sm text-foreground capitalize truncate">{platform}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Maximize size={12}/> Viewport</span>
                <span className="font-bold text-sm text-foreground">{viewport}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Activity size={12}/> Render FPS</span>
                <span className={`font-bold text-sm ${getStatusColor(fps, 55)}`}>{fps} <span className="text-[10px] text-muted-foreground">Hz</span></span>
              </div>
            </div>

            <div className="mt-5 flex justify-between items-center pt-3 border-t border-border/50">
              <span className="text-muted-foreground flex items-center gap-1.5"><Clock size={12}/> Session Uptime</span>
              <span className="font-bold text-foreground bg-background/50 border border-border/50 px-2 py-1 rounded">{formatUptime(uptime)}</span>
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-1.5">DOM Graph</span>
              <span className="font-bold text-foreground bg-background/50 border border-border/50 px-2 py-1 rounded">{nodes} nodes</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}