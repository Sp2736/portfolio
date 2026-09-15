"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ListMusic, Play, CalendarDays, X, ChevronUp, ChevronDown } from "lucide-react";

type TrackInfo = {
  id: string;
  name?: string;
  artist?: string;
};

type PlaylistsData = {
  [key: string]: TrackInfo[];
};

const DAY_MAPPING = [
  "lonely-nights",    // 0: Sunday
  "enough-mentality", // 1: Monday
  "grandeur",         // 2: Tuesday
  "rain-forest",      // 3: Wednesday
  "night-rain",       // 4: Thursday
  "hardin-tessa",     // 5: Friday
  "hot-songs",        // 6: Saturday
];

const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const DAY_ABBREVS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function NowPlayingWidget() {
  const [data, setData] = useState<PlaylistsData | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // UI states
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    fetch("/spotify/playlists-rich.json")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Failed to load playlists", err));
  }, []);

  // Compute shuffled tracks for the currently selected day
  const shuffledTracks = useMemo(() => {
    if (!data) return [];
    const playlistKey = DAY_MAPPING[selectedDay];
    const tracks = data[playlistKey] || [];
    return shuffleArray(tracks);
  }, [data, selectedDay]);

  // Reset index when changing day
  useEffect(() => {
    setCurrentIndex(0);
    setIframeKey(k => k + 1);
  }, [shuffledTracks]);

  const handleNext = () => {
    if (shuffledTracks.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % shuffledTracks.length);
    setIframeKey(k => k + 1);
  };

  const handlePrev = () => {
    if (shuffledTracks.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + shuffledTracks.length) % shuffledTracks.length);
    setIframeKey(k => k + 1);
  };

  const pickTrack = (index: number) => {
    setCurrentIndex(index);
    setIframeKey(k => k + 1);
    setIsFlipped(false);
  };

  const pickDay = (dayIndex: number) => {
    setSelectedDay(dayIndex);
  };

  const scrollTracks = (direction: 'up' | 'down') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: direction === 'up' ? -150 : 150,
        behavior: 'smooth'
      });
    }
  };

  if (!data || shuffledTracks.length === 0) {
    return (
      <div className="w-full max-w-[350px] shrink-0 mx-auto px-2 hidden md:block">
        <div className="h-[352px] rounded-2xl bg-background/5 animate-pulse border border-border/10" />
      </div>
    );
  }

  const currentTrack = shuffledTracks[currentIndex];

  return (
    <div className="w-full max-w-[350px] shrink-0 mx-auto hidden md:flex flex-col items-center justify-center relative z-20 perspective-1000" style={{ perspective: "1000px" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="w-full flex flex-col items-center relative"
      >
        {/* Header Section */}
        <div className="w-full flex justify-between items-center mb-2 px-2">
          <div className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
            <span className="animate-pulse">🎲</span>
            <span>{DAY_NAMES[selectedDay]}'s shuffle</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFlipped(!isFlipped)}
              className="p-1.5 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              title="Flip to Browse Tracks & Days"
            >
              <ListMusic size={16} />
            </button>
          </div>
        </div>

        {/* 3D Flip Container */}
        <motion.div 
          className="w-full relative preserve-3d"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* FRONT FACE: Spotify Embed */}
          <div 
            className={`w-full overflow-hidden rounded-2xl bg-transparent relative group backface-hidden ${isFlipped ? "pointer-events-none" : "pointer-events-auto"}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={iframeKey}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <iframe
                  style={{ borderRadius: "12px", background: "transparent" }}
                  src={`https://open.spotify.com/embed/track/${currentTrack.id}?utm_source=generator&autoplay=1&auto_play=true`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen={false}
                  allowtransparency="true"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify track"
                />
              </motion.div>
            </AnimatePresence>

            {/* Nav Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={handlePrev}
                className="p-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/30 hover:bg-background text-foreground shadow-lg transition-all"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={handleNext}
                className="p-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/30 hover:bg-background text-foreground shadow-lg transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* BACK FACE: Custom Track & Day Picker */}
          <div 
            className={`absolute inset-0 w-full h-[352px] rounded-2xl overflow-hidden flex flex-col shadow-2xl backface-hidden ${!isFlipped ? "pointer-events-none" : "pointer-events-auto"}`}
            style={{ 
              backfaceVisibility: "hidden", 
              transform: "rotateY(180deg)",
              backgroundColor: "#121212", // Completely solid, un-glassable background
              color: "#ffffff"
            }}
          >
            {/* Day selector row */}
            <div className="flex w-full items-center justify-between p-2 border-b border-white/10 bg-black">
              {DAY_ABBREVS.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => pickDay(idx)}
                  className={`text-[10px] sm:text-xs font-bold px-2 py-1.5 rounded transition-colors ${
                    selectedDay === idx 
                      ? 'bg-green-500 text-black' 
                      : 'text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            
            {/* Track list with custom arrow scrolling */}
            <div className="flex-1 flex flex-col p-2 gap-1 pointer-events-auto overflow-hidden">
              <button 
                onClick={() => scrollTracks('up')} 
                className="w-full flex justify-center py-1 bg-white/5 hover:bg-white/10 rounded transition-colors shrink-0"
              >
                <ChevronUp size={16} className="text-white/50" />
              </button>
              
              <div ref={scrollContainerRef} className="flex-1 overflow-y-hidden flex flex-col gap-1 scroll-smooth">
                {shuffledTracks.map((track, idx) => (
                  <button
                    key={idx}
                    onClick={() => pickTrack(idx)}
                    className={`text-left w-full px-2 py-1.5 rounded flex items-center gap-2 transition-colors shrink-0 ${
                      currentIndex === idx 
                        ? 'bg-white/20' 
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <span className={`text-xs font-medium truncate flex-1 ${currentIndex === idx ? 'text-green-400' : 'text-white'}`}>
                      {track.name || `Track ${track.id.substring(0,6)}`}
                    </span>
                    {currentIndex === idx && (
                      <Play size={12} className="text-green-400 fill-green-400 animate-pulse shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => scrollTracks('down')} 
                className="w-full flex justify-center py-1 bg-white/5 hover:bg-white/10 rounded transition-colors shrink-0"
              >
                <ChevronDown size={16} className="text-white/50" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
