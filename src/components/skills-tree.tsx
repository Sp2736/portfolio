"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Float, Line } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";

// Helper component for individual 3D skill nodes
function SkillNode({ position, text, color, scale = 1 }: { position: [number, number, number], text: string, color: string, scale?: number }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position} scale={scale}>
        {/* The glowing orb */}
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} wireframe />
        </mesh>
        {/* The 3D Text */}
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.3}
          color="hsl(var(--foreground))"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="hsl(var(--background))"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
}

// Helper component to draw connecting lines between nodes
function Connection({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  return (
    <Line
      points={[start, end]}
      color="hsl(var(--muted-foreground))"
      lineWidth={1}
      dashed={true}
      dashScale={50}
      dashSize={1}
      dashOffset={0}
      opacity={0.3}
      transparent
    />
  );
}

export function SkillsTree() {
  // Define 3D coordinates for your skill constellation
  const nodes = {
    core: [0, 0, 0] as [number, number, number],
    java: [-2, 2, -1] as [number, number, number],
    cpp: [2, 2, -1] as [number, number, number],
    react: [-3, -1, 1] as [number, number, number],
    nextjs: [-4, -3, 2] as [number, number, number],
    db: [3, -1, 1] as [number, number, number],
    data: [1, -3, 2] as [number, number, number],
  };

  return (
    <section className="w-full py-24 px-6 relative z-10 bg-background" id="skills">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div>
            <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Technical Arsenal</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">The Knowledge Graph</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed" data-code="<SkillTree data={skills} />">
            My skill set isn't a linear list; it's a connected architecture. 
            Object-oriented principles learned in Java inform how I structure React components. 
            Understanding C++ memory management translates to writing highly optimized Next.js server actions.
          </p>
          <div className="p-4 border border-border bg-muted/20 rounded-xl font-mono text-sm text-foreground/80 mt-4 backdrop-blur-sm">
            &gt; Left-click and drag to rotate the graph.<br/>
            &gt; Scroll to zoom in on specific nodes.
          </div>
        </motion.div>

        {/* Right Side: 3D Canvas */}
        <div className="h-[500px] w-full rounded-3xl border border-border bg-card/10 backdrop-blur-md overflow-hidden relative cursor-grab active:cursor-grabbing shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
          
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              
              <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              
              {/* Central Node */}
              <SkillNode position={nodes.core} text="Computer Science" color="hsl(var(--primary))" scale={1.2} />
              
              {/* Branch 1: OOP & Systems */}
              <SkillNode position={nodes.java} text="Java & OOP" color="#e32c2e" />
              <SkillNode position={nodes.cpp} text="C++ & DSA" color="#00599C" />
              <Connection start={nodes.core} end={nodes.java} />
              <Connection start={nodes.core} end={nodes.cpp} />

              {/* Branch 2: Web Ecosystem */}
              <SkillNode position={nodes.react} text="React & TS" color="#61DAFB" />
              <SkillNode position={nodes.nextjs} text="Next.js" color="#ffffff" />
              <Connection start={nodes.core} end={nodes.react} />
              <Connection start={nodes.react} end={nodes.nextjs} />

              {/* Branch 3: Data & Backend */}
              <SkillNode position={nodes.db} text="MySQL + Prisma" color="#4479A1" />
              <SkillNode position={nodes.data} text="Data Science" color="#FFD43B" />
              <Connection start={nodes.core} end={nodes.db} />
              <Connection start={nodes.core} end={nodes.data} />
              <Connection start={nodes.db} end={nodes.data} />

            </Suspense>
          </Canvas>
        </div>

      </div>
    </section>
  );
}