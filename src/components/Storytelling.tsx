"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial, Environment, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { ShieldCheck, User } from "lucide-react";

// --- 3D COMPONENTS ---

function EtherealOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = scroll.offset; // 0 to 1

    if (groupRef.current) {
      // Dynamic Orb Movement with Scroll
      // Moves closer, then darts away, then returns
      groupRef.current.position.z = Math.sin(p * Math.PI) * 2 - p * 5;
      groupRef.current.position.y = Math.sin(p * Math.PI * 2) * 1.5;
      
      // Floating animation independent of scroll
      groupRef.current.position.y += Math.sin(t) * 0.1;
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = t * 0.1;

      // Final massive expansion
      if (p > 0.85) {
        const scale = 1 + (p - 0.85) * 15;
        groupRef.current.scale.set(scale, scale, scale);
      } else {
        groupRef.current.scale.set(1, 1, 1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Inner Glowing Core */}
        <mesh>
          <sphereGeometry args={[0.5, 64, 64]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        
        {/* Outer Ethereal Shell */}
        <mesh>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshPhysicalMaterial 
            color="#FF7A00"
            emissive="#FF4500"
            emissiveIntensity={0.5}
            transmission={0.9}
            opacity={1}
            transparent
            roughness={0.1}
            ior={1.5}
            thickness={2}
          />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const scroll = useScroll();
  
  const positions = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 50;
      const theta = Math.random() * 2 * Math.PI;
      const y = (Math.random() - 0.5) * 30;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius - 15; 
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const p = scroll.offset;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      
      // Fade in particles after scene 2
      const targetOpacity = p > 0.25 ? Math.min(1, (p - 0.25) * 4) : 0;
      (pointsRef.current.material as THREE.PointsMaterial).opacity = THREE.MathUtils.lerp(
        (pointsRef.current.material as THREE.PointsMaterial).opacity,
        targetOpacity,
        0.1
      );

      // Camera fly-through effect at the end
      pointsRef.current.position.z = p > 0.8 ? (p - 0.8) * 30 : 0;
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

function FogManager() {
  const scroll = useScroll();
  useFrame(({ scene }) => {
    const p = scroll.offset;
    // Thick fog in Scene 2 (p around 0.15 to 0.3)
    if (p > 0.1 && p < 0.35) {
      scene.fog = new THREE.FogExp2("#050505", 0.15);
    } else {
      scene.fog = new THREE.FogExp2("#050505", 0.02);
    }
  });
  return null;
}

// --- DOM COMPONENTS ---

export function Storytelling() {
  return (
    <section className="relative w-full h-[100vh] bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: false, alpha: false }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        
        <ScrollControls pages={7} damping={0.25} maxSpeed={0.5}>
          
          <EtherealOrb />
          <ParticleNetwork />
          <FogManager />
          
          <EffectComposer>
            {/* High threshold means only the bright white core blooms intensely */}
            <Bloom luminanceThreshold={0.8} mipmapBlur intensity={2} radius={0.6} />
          </EffectComposer>

          {/* HTML OVERLAYS - Naturally scrolled by ScrollControls */}
          <Scroll html style={{ width: "100%", height: "100%" }}>
            
            {/* SCENE 1 */}
            <div className="absolute top-[0vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
              <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight max-w-4xl">
                Good intentions deserve <br/><span className="text-neki-orange">visible impact.</span>
              </h2>
              <p className="text-white/50 text-xl font-medium tracking-wide uppercase">Scroll to explore</p>
            </div>

            {/* SCENE 2 */}
            <div className="absolute top-[100vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white/90 mb-6 leading-tight max-w-3xl">
                But most contributions disappear into uncertainty.
              </h2>
              <p className="text-white/60 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
                Without visibility, trust fades. The connection between your intent and real-world impact gets lost in the fog.
              </p>
            </div>

            {/* SCENE 3 */}
            <div className="absolute top-[200vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
              <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 max-w-4xl">
                NEKI turns intent into action.
              </h2>
              <p className="text-neki-yellow text-2xl font-medium">The network awakens.</p>
            </div>

            {/* SCENE 4 & 5 */}
            <div className="absolute top-[350vh] w-full h-screen flex flex-col items-center justify-center p-6 pointer-events-none">
              <div className="w-full max-w-md bg-black/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 text-white shadow-2xl relative overflow-hidden">
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
            </div>

            {/* SCENE 6 & 7 */}
            <div className="absolute top-[550vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
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
            </div>

          </Scroll>
        </ScrollControls>
      </Canvas>
    </section>
  );
}