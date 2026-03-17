"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// CSS for the violent screen shake
const shakeStyles = `
  .wall-punch-shake {
    animation: punchShake 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
  @keyframes punchShake {
    0%, 100% { transform: translate3d(0, 0, 0); }
    10% { transform: translate3d(-6px, -4px, 0) scale(1.02); }
    20% { transform: translate3d(8px, 6px, 0) scale(1.02); }
    30%, 50%, 70% { transform: translate3d(-10px, -6px, 0) scale(1.03); }
    40%, 60% { transform: translate3d(10px, 8px, 0) scale(1.03); }
    80% { transform: translate3d(6px, 4px, 0) scale(1.01); }
  }
`;

type Crack = {
  id: number;
  x: number;
  y: number;
  pathData: string;
  epicenterPolygons: string[];
  scale: number;
};

// Generates highly randomized path data for realistic fractures
const generateRealisticShatterPaths = () => {
  const center = 100; // SVG internal coordinate system center
  const paths: string[] = [];
  const epicenters: string[] = [];

  // Generate many rapid, irregular radial lines exploding outwards
  const numRadials = 80 + Math.random() * 40;
  for (let i = 0; i < numRadials; i++) {
    let d = `M${center},${center}`;
    // Base angle with significant random variance per segment
    let angle = (i / numRadials) * 360 + (Math.random() - 0.5) * 5;
    let px = center,
      py = center;
    let distance = 0;
    const maxDistance = 70 + Math.random() * 30; // some go to edge, some stop

    // Divide path into jerky segments to simulate jagged breaks
    while (distance < maxDistance) {
      const segDist = Math.random() * 10 + 2; // small jagged segments
      distance += segDist;
      angle += (Math.random() - 0.5) * 8; // veer off course
      px = px + segDist * Math.cos((angle * Math.PI) / 180);
      py = py + segDist * Math.sin((angle * Math.PI) / 180);
      d += ` L${px.toFixed(1)},${py.toFixed(1)}`;

      // Occasionally branch off
      if (Math.random() > 0.9 && distance < maxDistance / 2) {
        paths.push(
          `M${px.toFixed(1)},${py.toFixed(1)} L${(px + Math.random() * 10 - 5).toFixed(1)},${(py + Math.random() * 10 - 5).toFixed(1)}`,
        );
      }
    }
    paths.push(d);
  }

  // Add irregular concentric circumferential cracks connecting the radials
  const numRings = 4 + Math.random() * 3;
  for (let r = 0; r < numRings; r++) {
    const radius = 15 + r * (15 + Math.random() * 5);
    let d = "";
    const segments = 20;
    for (let i = 0; i < segments; i++) {
      if (Math.random() > 0.6) continue;

      const angle1 = (i / segments) * 360 + (Math.random() - 0.5) * 5;
      const angle2 =
        ((i + 1 + Math.random() * 0.5) / segments) * 360 +
        (Math.random() - 0.5) * 5;
      const px1 = center + radius * Math.cos((angle1 * Math.PI) / 180);
      const py1 = center + radius * Math.sin((angle1 * Math.PI) / 180);
      const px2 =
        center +
        (radius + (Math.random() - 0.5) * 5) *
          Math.cos((angle2 * Math.PI) / 180);
      const py2 =
        center +
        (radius + (Math.random() - 0.5) * 5) *
          Math.sin((angle2 * Math.PI) / 180);
      paths.push(
        `M${px1.toFixed(1)},${py1.toFixed(1)} L${px2.toFixed(1)},${py2.toFixed(1)}`,
      );
    }
  }

  // Generate tiny, dense pulverization polygons exactly at the center (the white/opaque core)
  const numShards = 15 + Math.random() * 10;
  for (let i = 0; i < numShards; i++) {
    const radius = 2 + Math.random() * 8;
    const angle1 = Math.random() * 360;
    const angle2 = angle1 + 10 + Math.random() * 40;
    const px1 =
      center + radius * Math.random() * Math.cos((angle1 * Math.PI) / 180);
    const py1 =
      center + radius * Math.random() * Math.sin((angle1 * Math.PI) / 180);
    const px2 =
      center +
      (radius * 1.5 + Math.random() * 5) *
        Math.cos((((angle1 + angle2) / 2) * Math.PI) / 180);
    const py2 =
      center +
      (radius * 1.5 + Math.random() * 5) *
        Math.sin((((angle1 + angle2) / 2) * Math.PI) / 180);
    epicenters.push(
      `${center},${center} ${px1.toFixed(1)},${py1.toFixed(1)} ${px2.toFixed(1)},${py2.toFixed(1)}`,
    );
  }

  return { pathData: paths.join(" "), epicenterPolygons: epicenters };
};

export function WallPunchOverride() {
  const [cracks, setCracks] = useState<Crack[]>([]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // Only trigger if holding Shift
      if (!e.shiftKey) return;

      // Prevent text selection while punching
      e.preventDefault();

      const { pathData, epicenterPolygons } = generateRealisticShatterPaths();

      // Add a new crack at the mouse coordinates
      const newCrack: Crack = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        pathData: pathData,
        epicenterPolygons: epicenterPolygons,
        scale: Math.random() * 0.4 + 0.9, // Random size between 0.9x and 1.3x
      };

      // Limit max cracks on screen to prevent performance lag (and because after a few hits the screen is gone)
      setCracks((prev) => [...prev, newCrack].slice(-8));

      // Trigger the screen shake by adding a class to the body
      document.body.classList.add("wall-punch-shake");

      // Remove the shake class after the animation completes
      setTimeout(() => {
        document.body.classList.remove("wall-punch-shake");
      }, 350);
    };

    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, []);

  // An SVG graphic representing shattered glass with photorealistic effects
  const ShatterGraphic = ({ data }: { data: Crack }) => (
    <svg
      viewBox="0 0 200 200"
      className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] opacity-90 overflow-visible"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <filter
          id={`glassFilter-${data.id}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
        >
          {/* Blur the input paths slightly to create "depth" map */}
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="0.4"
            result="blurMap"
          />

          {/* Generate Diffuse lighting (pseudo-3D surface catching ambient light) */}
          <feDiffuseLighting
            in="blurMap"
            surfaceScale="2"
            diffuseConstant="1.2"
            lightingColor="white"
            result="diffuseLight"
          >
            <fePointLight x="100" y="100" z="60" />{" "}
            {/* Light comes from impact epicenter */}
          </feDiffuseLighting>

          {/* Generate Specular Lighting (tiny, bright highlights on sharp edges) */}
          <feSpecularLighting
            in="blurMap"
            surfaceScale="2.5"
            specularConstant="2.2"
            specularExponent="35"
            lightingColor="#white"
            result="specularHighlight"
          >
            <fePointLight x="100" y="100" z="80" />
          </feSpecularLighting>

          {/* Combine the lighting with the original fracture paths */}
          <feComposite
            in="diffuseLight"
            in2="SourceGraphic"
            operator="in"
            result="diffuseApply"
          />
          <feComposite
            in="specularHighlight"
            in2="SourceGraphic"
            operator="in"
            result="specularApply"
          />

          {/* Add a microscopic shadow/bevel under the lines for depth */}
          <feOffset in="SourceGraphic" dx="0.5" dy="0.5" result="offsetMap" />
          <feColorMatrix
            in="offsetMap"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.8 0"
            result="shadowMap"
          />

          {/* Merge all layers: Shadow -> Diffuse grooves -> Specular glints */}
          <feMerge result="mergedGlass">
            <feMergeNode in="shadowMap" />
            <feMergeNode in="diffuseApply" />
            <feMergeNode in="specularApply" />
          </feMerge>

          {/* Subtle chromatic aberration effect only on the glass (adds realism) */}
          <feColorMatrix
            in="mergedGlass"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="red"
          />
          <feColorMatrix
            in="mergedGlass"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="green"
          />
          <feColorMatrix
            in="mergedGlass"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="blue"
          />
          <feOffset in="red" dx="-0.5" dy="-0.5" result="redOffset" />
          <feOffset in="blue" dx="0.5" dy="0.5" result="blueOffset" />
          <feMerge result="aberrationGlass">
            <feMergeNode in="redOffset" />
            <feMergeNode in="green" />
            <feMergeNode in="blueOffset" />
          </feMerge>
        </filter>
      </defs>

      {/* Pulverized Center (highly opaque/dusty shards) */}
      <g filter={`url(#glassFilter-${data.id})`}>
        {data.epicenterPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="white"
            opacity={0.3 + Math.random() * 0.5} // Varied opacity for pulverized dust
            stroke="white"
            strokeWidth="0.1"
          />
        ))}
      </g>

      {/* Main Hyper-Thin Randomized Fractures (The hair-thin spiderweb) */}
      <g filter={`url(#glassFilter-${data.id})`}>
        <path
          d={data.pathData}
          stroke="white"
          strokeWidth="0.2" // Hyper-thin lines catch the specular filter best
          fill="none"
          strokeLinecap="round"
          opacity={0.8}
        />
      </g>

      {/* Micro-highlights (pure white glints that ignore filter depth) */}
      <g>
        <circle
          cx="100"
          cy="100"
          r="1.5"
          fill="white"
          filter="blur(0.5px)"
          opacity={0.6}
        />
        <circle cx="102" cy="98" r="0.8" fill="white" filter="blur(0.3px)" />
      </g>
    </svg>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shakeStyles }} />

      {/* Render all cracks fixed to the viewport */}
      <div className="fixed inset-0 z-[99998] pointer-events-none overflow-hidden">
        <AnimatePresence>
          {cracks.map((crack) => (
            <motion.div
              key={crack.id}
              initial={{
                opacity: 0,
                scale: 0.1,
                rotate: Math.random() * 10 - 5,
              }}
              animate={{ opacity: 1, scale: crack.scale }}
              exit={{
                opacity: 0,
                scale: 1.5,
                filter: "blur(10px)",
                transition: { duration: 1 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute pointer-events-none origin-center"
              style={{
                left: crack.x,
                top: crack.y,
                // Center the graphic exactly on the mouse coordinates
                transform: `translate(-50%, -50%)`,
              }}
            >
              <ShatterGraphic data={crack} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
