"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, TrackballControls, Sphere, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

// Official SVGs from Devicon CDN
const skillsData = [
  // Web Core (Orbit 1)
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  
  // Languages & Compute (Orbit 2)
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  
  // DB & Infrastructure (Orbit 3)
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Ubuntu", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg" }
];

function AtomNetwork() {
  // Split skills into 3 distinct orbital rings
  const orbit1 = skillsData.slice(0, 5);
  const orbit2 = skillsData.slice(5, 8);
  const orbit3 = skillsData.slice(8, 12);

  return (
    <group>
      {/* Central Power Source (Nucleus) */}
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color="hsl(var(--primary))" emissive="hsl(var(--primary))" emissiveIntensity={2} />
      </Sphere>

      {/* Orbital Rings */}
      <OrbitRing radius={2.2} speed={0.4} tilt={[0.2, 0.4, 0]} items={orbit1} />
      <OrbitRing radius={3.5} speed={-0.3} tilt={[-0.5, 0.2, 0]} items={orbit2} />
      <OrbitRing radius={4.8} speed={0.2} tilt={[0.8, -0.6, 0]} items={orbit3} />
    </group>
  );
}

function OrbitRing({ radius, speed, tilt, items }: { radius: number, speed: number, tilt: number[], items: any[] }) {
  const ref = useRef<THREE.Group>(null);

  // Rotate the ring continuously
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
    }
  });

  const { positions, ringPoints } = useMemo(() => {
    const pos = [];
    const pts = [];
    const segments = 64;
    
    // Calculate solid orbital ring path
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }

    // Calculate positions for the specific skills on this ring
    const count = items.length;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      pos.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return { positions: pos, ringPoints: pts };
  }, [radius, items.length]);

  return (
    <group rotation={tilt as any}>
      {/* The visible orbital path */}
      <Line points={ringPoints} color="hsl(var(--primary))" opacity={0.2} transparent lineWidth={1} />
      
      {/* The Skill Nodes (Electrons) */}
      <group ref={ref}>
        {items.map((item, i) => (
          <group key={i}>
            {/* Neural network tether connecting the node back to the center power source */}
            <Line points={[new THREE.Vector3(0,0,0), positions[i]]} color="hsl(var(--primary))" opacity={0.15} transparent lineWidth={1} />
            
            <group position={positions[i]}>
              {/* `transform sprite` forces the HTML to act as a 2D billboard that ALWAYS faces the camera */}
              <Html transform sprite center>
                <div className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/20 hover:border-primary/80 hover:bg-primary/10 transition-all duration-300 shadow-xl cursor-pointer">
                  {/* Image container adds a solid white circle behind logos like Next.js so they are visible on dark themes */}
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1.5 shadow-inner">
                    <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  
                  {/* Hover Tooltip */}
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border text-foreground text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap pointer-events-none shadow-lg">
                    {item.name}
                  </span>
                </div>
              </Html>
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}

export function SkillsSphere() {
  return (
    // Tightened global spacing (py-12)
    <section className="w-full py-12 px-6 relative z-10 bg-background" id="skills">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div>
            <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Technical Arsenal</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">The Neural Network</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Technologies are just tools; the real skill is knowing how they connect. From low-level memory management to high-level UI state, this is the tech ecosystem powering my deployments.
          </p>
          <div className="p-4 border border-border bg-muted/20 rounded-xl font-mono text-sm text-foreground/80 mt-2 backdrop-blur-sm">
            &gt; Left-click and drag to rotate the system.<br/>
            &gt; Hover over nodes to identify technologies.
          </div>
        </motion.div>

        <div className="h-[450px] w-full relative cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={1} />
            <TrackballControls noPan noZoom={false} rotateSpeed={2.5} />
            <AtomNetwork />
          </Canvas>
        </div>

      </div>
    </section>
  );
}