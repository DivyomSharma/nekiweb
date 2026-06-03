"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ShieldCheck, User } from "lucide-react";

// --- 3D COMPONENTS ---

function GlowingOrb({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const orbRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = progressRef.current; // 0 to 1

    if (orbRef.current && materialRef.current) {
      // Gentle float
      orbRef.current.position.y = Math.sin(t) * 0.2;
      
      // Scale down during tracking scenes, scale massively at the end
      let scale = 1;
      if (p > 0.4 && p < 0.8) scale = 0.5;
      else if (p >= 0.8) scale = 1 + (p - 0.8) * 20; // Massive expansion at end
      
      orbRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);

      // Emissive Intensity fades in fog (Scene 2)
      let intensity = 4;
      if (p > 0.15 && p < 0.35) intensity = 1; // Dim in fog
      else if (p >= 0.8) intensity = 10; // Extremely bright at end
      
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, intensity, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#FFC247" 
          emissive="#FF7A00"
          emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}

function ParticleNetwork({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create an organic galaxy/network shape
  const positions = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 40;
      const theta = Math.random() * 2 * Math.PI;
      const y = (Math.random() - 0.5) * 20;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius - 20; // Push back behind orb
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const p = progressRef.current;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      
      // Fade particles in after scene 3
      const opacityTarget = p > 0.35 ? Math.min(1, (p - 0.35) * 3) : 0;
      (pointsRef.current.material as THREE.PointsMaterial).opacity = THREE.MathUtils.lerp(
        (pointsRef.current.material as THREE.PointsMaterial).opacity,
        opacityTarget,
        0.1
      );

      // Camera fly-through effect at the very end
      if (p > 0.85) {
        const flyProgress = (p - 0.85) * 6; // 0 to ~1
        pointsRef.current.position.z = flyProgress * 50;
      } else {
        pointsRef.current.position.z = 0;
      }
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFC247"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0}
      />
    </Points>
  );
}

// --- DOM COMPONENTS ---

export function Storytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      progressRef.current = latest;
    });
  }, [scrollYProgress]);

  // Framer Motion transforms for perfectly centered, cross-fading text scenes
  // Scene 1: Intent
  const s1Op = useTransform(scrollYProgress, [0, 0.08, 0.12], [1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.12], [0, -50]);

  // Scene 2: Fog / Uncertainty
  const s2Op = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [50, 0, 0, -50]);

  // Scene 3: Network Awakens
  const s3Op = useTransform(scrollYProgress, [0.38, 0.42, 0.5, 0.55], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.38, 0.42, 0.5, 0.55], [50, 0, 0, -50]);

  // Scene 4/5: Live Tracking Cards
  const s4Op = useTransform(scrollYProgress, [0.58, 0.62, 0.75, 0.8], [0, 1, 1, 0]);
  const s4Scale = useTransform(scrollYProgress, [0.58, 0.62], [0.9, 1]);

  // Scene 6/7: Final Zoom Out / Humanity Delivered
  const s6Op = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const s6Y = useTransform(scrollYProgress, [0.85, 0.9], [50, 0]);

  return (
    <section ref={containerRef} className="relative bg-[#050505]" style={{ height: "800vh" }}>
      
      {/* STICKY CONTAINER - Locks to screen while user scrolls through the 800vh */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* 3D CANVAS */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ antialias: false, alpha: false }}>
            <color attach="background" args={["#050505"]} />
            <ambientLight intensity={0.2} />
            <Environment preset="city" />
            
            <GlowingOrb progressRef={progressRef} />
            <ParticleNetwork progressRef={progressRef} />
            
            <EffectComposer>
              <Bloom luminanceThreshold={0} mipmapBlur intensity={1.5} radius={0.8} />
            </EffectComposer>
          </Canvas>
        </div>

        {/* DOM OVERLAYS - Fixed positioned, fading based on scroll */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none p-6">
          
          {/* SCENE 1 */}
          <motion.div style={{ opacity: s1Op, y: s1Y }} className="absolute text-center max-w-4xl">
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              Good intentions deserve <br/><span className="text-neki-orange">visible impact.</span>
            </h2>
            <p className="text-white/50 text-xl font-medium tracking-wide uppercase">Scroll to see the journey</p>
          </motion.div>

          {/* SCENE 2 */}
          <motion.div style={{ opacity: s2Op, y: s2Y }} className="absolute text-center max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white/90 mb-6 leading-tight">
              But most contributions disappear into uncertainty.
            </h2>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              Without visibility, trust fades. The connection between your intent and real-world impact gets lost in the fog.
            </p>
          </motion.div>

          {/* SCENE 3 */}
          <motion.div style={{ opacity: s3Op, y: s3Y }} className="absolute text-center max-w-4xl">
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
              NEKI turns intent into action.
            </h2>
            <p className="text-neki-yellow text-2xl font-medium">The network awakens.</p>
          </motion.div>

          {/* SCENE 4 & 5 */}
          <motion.div style={{ opacity: s4Op, scale: s4Scale }} className="absolute w-full max-w-md">
            <div className="bg-black/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 text-white shadow-2xl relative overflow-hidden">
              {/* Subtle glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-neki-orange text-xs font-bold uppercase tracking-widest">Live Mission</div>
                  <div className="bg-neki-green/20 text-neki-green px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Verified
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-8">Disaster Relief Kits</h3>
                
                <div className="space-y-6 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-white/10" />
                  
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-neki-green shadow-[0_0_15px_#1E3D2B] flex-shrink-0" />
                    <span className="font-medium text-lg text-white">Need Identified</span>
                  </div>
                  
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-neki-orange flex items-center justify-center shadow-[0_0_15px_#FF7A00] flex-shrink-0">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium text-lg text-white">Volunteer En Route</span>
                  </div>
                  
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-6 h-6 rounded-full border-2 border-white/20 bg-black flex-shrink-0" />
                    <span className="font-medium text-lg text-white/40">Delivery Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SCENE 6 & 7 */}
          <motion.div style={{ opacity: s6Op, y: s6Y }} className="absolute text-center max-w-5xl pointer-events-auto">
            <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-extrabold text-white mb-8 leading-none drop-shadow-2xl">
              Humanity, <br/><span className="text-neki-orange">Delivered.</span>
            </h2>
            <p className="text-2xl md:text-3xl text-white/80 mb-12 font-medium drop-shadow-md">
              The operating system for collective human goodness.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-neki-orange text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-neki-charcoal transition-colors shadow-[0_0_30px_rgba(255,122,0,0.4)]">
                Start Contributing
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-colors">
                Onboard NGO
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}