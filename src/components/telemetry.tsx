"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Cpu, Network, Zap, HardDrive, Clock, MapPin, Maximize, Monitor, Wifi } from "lucide-react";

export function Telemetry() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Real-time Dynamic Metrics
  const [fps, setFps] = useState(0);
  const [ping, setPing] = useState<number | string>("...");
  const [downlink, setDownlink] = useState<number | string>("...");
  const [nodes, setNodes] = useState(0);
  const [memory, setMemory] = useState<number | string>("...");
  const [uptime, setUptime] = useState(0);
  
  // Static Hardware Metrics
  const [viewport, setViewport] = useState("...");
  const [cores, setCores] = useState(0);
  const [platform, setPlatform] = useState("...");
  const [connection, setConnection] = useState("...");
  const [gpu, setGpu] = useState("...");

  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);

  // --- 1. INITIALIZE HARDWARE & STATIC DATA ---
  useEffect(() => {
    // Viewport
    const handleResize = () => setViewport(`${window.innerWidth}x${window.innerHeight}`);
    handleResize();
    window.addEventListener("resize", handleResize);

    // CPU Threads
    setCores(navigator.hardwareConcurrency || 0);

    // Operating System / Platform
    // @ts-ignore
    const uaData = navigator.userAgentData;
    let os = "Unknown OS";
    if (uaData && uaData.platform) {
      os = uaData.platform;
    } else {
      const ua = navigator.userAgent;
      if (ua.includes("Win")) os = "Windows";
      else if (ua.includes("Mac")) os = "macOS";
      else if (ua.includes("Linux")) os = "Linux";
      else if (ua.includes("Android")) os = "Android";
      else if (ua.includes("like Mac")) os = "iOS";
    }
    setPlatform(os);

    // GPU Extraction (Using WebGL)
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        // @ts-ignore
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          // @ts-ignore
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          // Clean up long GPU strings (e.g., removing "ANGLE (NVIDIA..." boilerplate)
          const cleanGpu = renderer.replace(/ANGLE \(/g, '').split(' Direct')[0].split(' vs_')[0].replace(/\)/g, '');
          setGpu(cleanGpu || "Unknown GPU");
        }
      }
    } catch (e) {
      setGpu("Restricted");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- 2. LIVE DATA POLLING (1s Interval) ---
  useEffect(() => {
    const startTime = Date.now();

    const pollData = () => {
      // Session Uptime
      setUptime(Math.floor((Date.now() - startTime) / 1000));
      
      // Live DOM Node Count
      setNodes(document.getElementsByTagName('*').length);

      // Live JS Heap Memory (Chromium specific)
      // @ts-ignore
      if (performance && performance.memory) {
        // @ts-ignore
        const usedJSHeap = performance.memory.usedJSHeapSize / (1024 * 1024);
        setMemory(+(usedJSHeap).toFixed(1));
      } else {
        setMemory("Restricted");
      }

      // Live Network Diagnostics (Chromium specific)
      // @ts-ignore
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        setConnection(conn.effectiveType || "online");
        setPing(conn.rtt !== undefined ? conn.rtt : "...");
        setDownlink(conn.downlink !== undefined ? conn.downlink : "...");
      }
    };

    pollData(); // Initial poll
    const interval = setInterval(pollData, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- 3. RAW RENDER FPS CALCULATION ---
  const calculateFPS = (time: number) => {
    frameCountRef.current += 1;
    const delta = time - lastTimeRef.current;

    if (delta >= 1000) {
      setFps(Math.round((frameCountRef.current * 1000) / delta));
      frameCountRef.current = 0;
      lastTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(calculateFPS);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(calculateFPS);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Helpers
  const getStatusColor = (val: number, threshold: number) => 
    val >= threshold ? "text-green-500" : val >= threshold - 15 ? "text-yellow-500" : "text-red-500";

  const formatUptime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <>
      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full border border-border/50 bg-background/40 backdrop-blur-md shadow-xl hover:bg-background/60 transition-all active:scale-95 group"
      >
        <Activity size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </button>

      {/* TELEMETRY PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
transition={{ type: "spring", stiffness: 300, damping: 30 }}            className="fixed bottom-6 right-24 z-50 w-80 bg-background/70 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl p-5 font-mono text-xs overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-primary animate-pulse" />
                <span className="font-bold tracking-widest uppercase">System Diagnostics</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-background/50 px-2 py-0.5 rounded-full border border-border/50 shadow-inner">
                <MapPin size={10} className="text-primary" /> Local
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              
              {/* Logic Cores */}
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Cpu size={12}/> Logic Cores</span>
                <span className="font-bold text-sm text-foreground">{cores || "N/A"} <span className="text-[10px] text-muted-foreground">Threads</span></span>
              </div>
              
              {/* Real Connection & Ping */}
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Network size={12}/> Connection</span>
                <span className="font-bold text-sm text-green-500 uppercase">
                  {connection} <span className="text-[10px] text-muted-foreground">{ping}ms</span>
                </span>
              </div>

              {/* Real JS Heap Memory */}
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><HardDrive size={12}/> Heap Mem</span>
                <span className="font-bold text-sm text-primary">
                  {memory} <span className="text-[10px] text-muted-foreground">{typeof memory === 'number' ? 'MB' : ''}</span>
                </span>
              </div>

              {/* Real Bandwidth / Downlink */}
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Wifi size={12}/> Bandwidth</span>
                <span className="font-bold text-sm text-foreground">
                  {downlink} <span className="text-[10px] text-muted-foreground">{typeof downlink === 'number' ? 'Mbps' : ''}</span>
                </span>
              </div>

              {/* Client Environment / OS */}
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Monitor size={12}/> Environment</span>
                <span className="font-bold text-sm text-foreground capitalize truncate">{platform}</span>
              </div>

              {/* Viewport Dimensions */}
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1.5"><Maximize size={12}/> Viewport</span>
                <span className="font-bold text-sm text-foreground">{viewport}</span>
              </div>

            </div>

            {/* Render Hardware (GPU Extract) */}
            <div className="mt-4 pt-3 border-t border-border/50 flex flex-col gap-1">
              <span className="text-muted-foreground flex items-center gap-1.5">Render Hardware</span>
              <span className="font-bold text-foreground truncate text-primary">{gpu}</span>
            </div>

            {/* Uptime & DOM Nodes & FPS */}
            <div className="mt-4 pt-3 border-t border-border/50 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1.5"><Clock size={12}/> Session Uptime</span>
                <span className="font-bold text-foreground bg-background/50 border border-border/50 px-2 py-1 rounded shadow-sm">{formatUptime(uptime)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1.5">DOM Nodes</span>
                <span className="font-bold text-foreground bg-background/50 border border-border/50 px-2 py-1 rounded shadow-sm">{nodes} nodes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1.5"><Activity size={12}/> Render FPS</span>
                <span className={`font-bold text-sm ${getStatusColor(fps, 45)}`}>{fps} <span className="text-[10px] text-muted-foreground">Hz</span></span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}