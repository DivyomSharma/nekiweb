"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ParticleMorpher } from "./ParticleMorpher";
import { MissionEcosystem } from "./MissionEcosystem";
import { ShieldCheck, MapPin, Package, Image as ImageIcon } from "lucide-react";
import Lenis from "lenis";
import Link from "next/link";
import { HeroSection } from "./sections/HeroSection";
import { TrackingSection } from "./sections/TrackingSection";
import { NetworkEffectSection } from "./sections/NetworkEffectSection";
import { useScroll, useMotionValueEvent } from "framer-motion";

export function JourneyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    progressRef.current = latest;
  });

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-background" style={{ height: "1600vh" }}>
      
      {/* 3D CANVAS - FIXED TO BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: false, alpha: false }}>
          <color attach="background" args={["#FAF9F7"]} />
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 10, 10]} intensity={2} />
          
          <ParticleMorpher progressRef={progressRef} />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.5} radius={0.4} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* DOM OVERLAYS - NATIVELY SCROLLING */}
      <div className="relative z-10 w-full pointer-events-none">
        
        {/* PAGE 0: HERO (Split Layout) */}
        <HeroSection />

        {/* PAGE 1: PROBLEM (Left) */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[15%] pointer-events-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-6 max-w-2xl">
            Good intentions deserve <br/><span className="font-playfair italic text-text-muted">better infrastructure.</span>
          </h2>
          <p className="text-lg text-text-muted max-w-xl font-light leading-relaxed mb-8">
            People don't stop helping because they stop caring.<br/>
            They stop helping because they stop seeing where help goes.
          </p>
          <Link href="/why-neki" className="group flex items-center text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
            Why NEKI Exists <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* PAGE 2: FOOD (Right) */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[15%] text-right">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-neki-green tracking-tight mb-4">
            A meal can <span className="font-playfair italic">change a day.</span>
          </h2>
          <p className="text-lg text-text-secondary font-light">Food. Community kitchens. Animal shelters.</p>
        </div>

        {/* PAGE 3: BOOKS (Left) */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[15%]">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-neki-gold tracking-tight mb-4 max-w-xl">
            Knowledge travels farther <span className="font-playfair italic">than books.</span>
          </h2>
          <p className="text-lg text-text-secondary font-light">Education. Learning. Opportunity.</p>
        </div>

        {/* PAGE 4: MEDICAL (Right) */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[15%] text-right">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-red-400 tracking-tight mb-4 max-w-xl">
            Care should never be <span className="font-playfair italic">out of reach.</span>
          </h2>
          <p className="text-lg text-text-secondary font-light">Healthcare. Medicine. Relief.</p>
        </div>

        {/* PAGE 5: TIME (Left) */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[15%]">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-blue-400 tracking-tight mb-4 max-w-2xl">
            Some contributions can't be <span className="font-playfair italic">measured in money.</span>
          </h2>
          <p className="text-lg text-text-secondary font-light">Time. Presence. Effort.</p>
        </div>

        {/* PAGE 6: SKILLS (Right) */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[15%] text-right">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-purple-400 tracking-tight mb-4 max-w-xl">
            Expertise can be a <span className="font-playfair italic">form of service.</span>
          </h2>
          <p className="text-lg text-text-secondary font-light">Teaching. Mentoring. Building. Healing.</p>
        </div>

        {/* PAGE 7: NETWORK EFFECT (Left) */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[15%]">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-tight mb-6 max-w-2xl">
            Goodness scales through <span className="text-neki-gold font-playfair italic">connection.</span>
          </h2>
          <p className="text-lg text-text-secondary font-light">The strongest force is people, connected.</p>
        </div>

        {/* PAGE 8: NEKI NETWORK (Right) */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[15%] text-right pointer-events-auto">
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight mb-8 max-w-2xl">
            Humanity works better as a <span className="font-playfair italic text-neki-gold">network.</span>
          </h2>
          <Link href="/network" className="group flex items-center justify-end text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
            How The Network Works <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* PAGE 9: MISSION CREATION (Center / Scattered Cards) */}
        <div className="h-screen w-full relative overflow-hidden pointer-events-none">
          <MissionEcosystem />
        </div>

        {/* PAGE 10: TRACKING (Left) */}
        <TrackingSection />

        {/* PAGE 11: TRUST (Right) */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[15%] text-right pointer-events-auto">
          <ShieldCheck className="w-12 h-12 text-neki-green mb-6" strokeWidth={1.5} />
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-8 max-w-xl">
            Trust begins where <span className="font-playfair italic text-neki-green">uncertainty ends.</span>
          </h2>
          <Link href="/trust" className="group flex items-center justify-end text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
            How Trust Works <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* PAGE 12: PROOF OF IMPACT (Left) */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[15%] pointer-events-auto">
          <ImageIcon className="w-12 h-12 text-neki-gold mb-6" strokeWidth={1.5} />
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-6 max-w-xl">
            Impact should be seen. <br/><span className="text-text-muted font-playfair italic">Not assumed.</span>
          </h2>
          <p className="text-lg text-text-secondary font-light max-w-md mb-8">
            Every completed mission becomes proof. Every proof inspires another mission.
          </p>
          <Link href="/impact" className="group flex items-center text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
            View Impact Stories <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* PAGE 13: MULTIPLIER / NETWORK (Center) */}
        <NetworkEffectSection />

        {/* PAGE 15: FINAL (Center) */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-foreground tracking-tight mb-6">
            Humanity, <br/><span className="text-neki-gold font-playfair italic">Delivered.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto mb-12 font-light">
            Track every contribution. Verify every mission. See every impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="group flex items-center bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors">
              About NEKI <span className="ml-3 opacity-70 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
