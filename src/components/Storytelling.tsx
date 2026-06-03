"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// --- 3D COMPONENTS ---

function GlowingOrb({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const orbRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = progressRef.current; // 0 to 1 scroll progress

    if (orbRef.current) {
      // Rotate the orb
      orbRef.current.rotation.y = t * 0.2;
      orbRef.current.rotation.z = t * 0.1;
      
      // Move orb forward as progress increases
      orbRef.current.position.z = -p * 15;
      
      // Scene 2 (Fog/Uncertainty) - Dim the orb slightly
      const dimFactor = p > 0.15 && p < 0.3 ? 0.4 : 1;
      (orbRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 2 * dimFactor;
      if (lightRef.current) lightRef.current.intensity = 20 * dimFactor;
    }

    if (glowRef.current && orbRef.current) {
      glowRef.current.position.copy(orbRef.current.position);
      // Pulsing glow
      const scale = 1.2 + Math.sin(t * 2) * 0.1;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={orbRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial 
            color="#FFC247" 
            emissive="#FF7A00"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
        
        {/* Soft Glow Billboard */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial 
            color="#FF7A00"
            transparent={true}
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        <pointLight ref={lightRef} color="#FFC247" intensity={20} distance={10} />
      </Float>
    </>
  );
}

function ParticleNetwork({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate random points for the network
  const [positions] = useState(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 15; // Push back
    }
    return pos;
  });

  useFrame(({ clock }) => {
    const p = progressRef.current;
    if (pointsRef.current) {
      // Particles only become visible/active after scene 3
      const opacity = Math.max(0, (p - 0.4) * 2);
      (pointsRef.current.material as THREE.PointsMaterial).opacity = Math.min(1, opacity);
      
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      
      // Final zoom out effect
      if (p > 0.8) {
        const zoomP = (p - 0.8) * 5; // 0 to 1
        pointsRef.current.scale.set(1 + zoomP, 1 + zoomP, 1 + zoomP);
      } else {
        pointsRef.current.scale.set(1, 1, 1);
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

function StoryScene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera, scene } = useThree();

  useFrame(() => {
    const p = progressRef.current;
    
    // Fog logic for uncertainty scene
    if (p > 0.15 && p < 0.35) {
      const fogDensity = Math.min(0.08, (p - 0.15) * 0.5);
      scene.fog = new THREE.FogExp2("#111111", fogDensity);
    } else if (p >= 0.35) {
      scene.fog = new THREE.FogExp2("#111111", Math.max(0, 0.08 - (p - 0.35) * 0.5));
    } else {
      scene.fog = null;
    }

    // Camera movement
    camera.position.z = 5 - (p * 10);
    
    // Final pullback
    if (p > 0.85) {
      camera.position.z = 5 - (p * 10) + ((p - 0.85) * 40);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <Environment preset="city" />
      <GlowingOrb progressRef={progressRef} />
      <ParticleNetwork progressRef={progressRef} />
    </>
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

  // Framer Motion transforms for text opacity
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const scene2Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.25, 0.3], [0, 1, 1, 0]);
  const scene3Opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const scene4Opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const scene5Opacity = useTransform(scrollYProgress, [0.75, 0.8, 0.85, 0.9], [0, 1, 1, 0]);
  const scene6Opacity = useTransform(scrollYProgress, [0.9, 0.95, 1], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative bg-neki-charcoal" style={{ height: "700vh" }}>
      
      {/* 3D Canvas - Sticky Background */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: false }}>
          <color attach="background" args={["#111111"]} />
          <StoryScene progressRef={progressRef} />
        </Canvas>
      </div>

      {/* HTML Overlays - Scrolling content */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col">
        
        {/* SCENE 1 */}
        <div className="h-screen flex items-center justify-center p-8">
          <motion.div style={{ opacity: scene1Opacity }} className="text-center">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Good intentions deserve <br/><span className="text-neki-orange">visible impact.</span>
            </h2>
            <p className="text-white/60 text-lg">Scroll to see the journey of a contribution.</p>
          </motion.div>
        </div>

        {/* SCENE 2 - Fog */}
        <div className="h-screen flex items-center justify-center p-8">
          <motion.div style={{ opacity: scene2Opacity }} className="text-center max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Most contributions disappear into uncertainty.
            </h2>
            <p className="text-white/40 text-xl">
              Without visibility, trust fades. The connection between intent and impact gets lost in the fog.
            </p>
          </motion.div>
        </div>

        {/* SCENE 3 - Network Awakens */}
        <div className="h-screen flex items-center justify-center p-8">
          <motion.div style={{ opacity: scene3Opacity }} className="text-center">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              NEKI turns intent into action.
            </h2>
            <p className="text-neki-yellow text-xl font-medium">The network awakens.</p>
          </motion.div>
        </div>

        {/* SCENE 4 & 5 - Logistics and Tracking */}
        <div className="h-[200vh] flex flex-col items-center justify-center p-8">
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-lg">
            <motion.div style={{ opacity: scene4Opacity }} className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 text-white shadow-2xl">
              <div className="text-neki-orange text-sm font-bold uppercase mb-2">Live Mission: Cow Shelter Food Drive</div>
              <h3 className="text-2xl font-bold mb-6">Mission in Progress</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-neki-green shadow-[0_0_10px_#1E3D2B]" />
                  <span className="font-medium">Volunteer Assigned</span>
                </div>
                <div className="w-[2px] h-4 bg-white/20 ml-2" />
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-neki-green shadow-[0_0_10px_#1E3D2B]" />
                  <span className="font-medium">En Route to Pickup</span>
                </div>
                <div className="w-[2px] h-4 bg-white/20 ml-2" />
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full border-2 border-neki-yellow" />
                  <span className="text-white/60">Delivery Pending</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SCENE 6 & 7 - Trust and Final Zoom */}
        <div className="h-[200vh] flex flex-col items-center justify-end pb-[20vh] p-8">
          <motion.div style={{ opacity: scene6Opacity }} className="text-center max-w-4xl">
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
              Humanity, <span className="text-neki-orange">Delivered.</span>
            </h2>
            <p className="text-2xl text-white/80 mb-12">
              The operating system for collective human goodness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
              <button className="bg-neki-orange text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-neki-charcoal transition-colors">
                Join NEKI
              </button>
              <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors">
                Start Contributing
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}