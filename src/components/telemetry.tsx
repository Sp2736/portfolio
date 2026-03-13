"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Cpu, Network, Zap, HardDrive, Clock, MapPin } from "lucide-react";

export function Telemetry() {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [ping, setPing] = useState(12);
  const [nodes, setNodes] = useState(0);
  const [memory, setMemory] = useState(45.2);
  const [uptime, setUptime] = useState(0);
  
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
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
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full border border-border bg-card/80 backdrop-blur-md shadow-lg hover:bg-muted transition-all active:scale-95 group"
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
            className="fixed bottom-24 right-6 z-50 w-72 bg-card/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-4 font-mono text-xs overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-primary" />
                <span className="font-bold tracking-widest uppercase">Live Telemetry</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                <MapPin size={10} /> Vadodara, IN
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Cpu size={12}/> FPS</span>
                <span className={`font-bold text-sm ${getStatusColor(fps, 55)}`}>{fps} <span className="text-[10px] text-muted-foreground">Hz</span></span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Network size={12}/> Ping</span>
                <span className="font-bold text-sm text-green-500">{ping} <span className="text-[10px] text-muted-foreground">ms</span></span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><HardDrive size={12}/> Memory</span>
                <span className="font-bold text-sm text-primary">{memory} <span className="text-[10px] text-muted-foreground">MB</span></span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Clock size={12}/> Uptime</span>
                <span className="font-bold text-sm text-foreground">{formatUptime(uptime)}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center pt-3 border-t border-border/50">
              <span className="text-muted-foreground flex items-center gap-1.5"><Activity size={12}/> DOM Nodes</span>
              <span className="font-bold text-foreground bg-muted px-2 py-1 rounded">{nodes} active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}