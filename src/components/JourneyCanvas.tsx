"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ParticleMorpher } from "./ParticleMorpher";
import { ShieldCheck, MapPin, Package, Image as ImageIcon } from "lucide-react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Lenis from "lenis";

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
          <color attach="background" args={["#050505"]} />
          <ambientLight intensity={1.2} />
          <Environment preset="city" />
          
          <ParticleMorpher progressRef={progressRef} />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.5} radius={0.4} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* DOM OVERLAYS - NATIVELY SCROLLING */}
      <div className="relative z-10 w-full pointer-events-none">
        
        {/* PAGE 0: HERO */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-6xl md:text-9xl font-heading font-extrabold text-foreground tracking-tight mb-6">
            Humanity, <br/><span className="text-neki-gold">Delivered.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl font-light">
            NEKI makes helping people as easy, trackable, and trustworthy as modern commerce.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
            <button className="bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:bg-[#222222] transition-colors">
              Start Contributing
            </button>
            <button className="bg-transparent border border-white/20 text-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-white/5 transition-colors">
              Become a Volunteer
            </button>
            <button className="bg-transparent border border-white/20 text-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-white/5 transition-colors">
              Partner with NEKI
            </button>
          </div>
        </div>

        {/* PAGE 1: PROBLEM */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-6">
            Good intentions deserve better infrastructure.
          </h2>
          <p className="text-xl md:text-3xl text-text-muted max-w-3xl font-light leading-relaxed">
            People don't stop helping because they stop caring.<br/>
            They stop helping because they stop seeing where help goes.
          </p>
        </div>

        {/* PAGE 2: FOOD */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[10%]">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-neki-green tracking-tight mb-4">
            A meal can change a day.
          </h2>
          <p className="text-2xl text-text-secondary font-light">Food. Community kitchens. Animal shelters.</p>
        </div>

        {/* PAGE 3: BOOKS */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[10%] text-right">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-neki-gold tracking-tight mb-4">
            Knowledge travels farther than books.
          </h2>
          <p className="text-2xl text-text-secondary font-light">Education. Learning. Opportunity.</p>
        </div>

        {/* PAGE 4: MEDICAL */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[10%]">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-red-400 tracking-tight mb-4">
            Care should never be out of reach.
          </h2>
          <p className="text-2xl text-text-secondary font-light">Healthcare. Medicine. Relief.</p>
        </div>

        {/* PAGE 5: TIME */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[10%] text-right">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-blue-400 tracking-tight mb-4 max-w-4xl">
            Some contributions can't be measured in money.
          </h2>
          <p className="text-2xl text-text-secondary font-light">Time. Presence. Effort.</p>
        </div>

        {/* PAGE 6: SKILLS */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[10%]">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-purple-400 tracking-tight mb-4">
            Expertise can be a form of service.
          </h2>
          <p className="text-2xl text-text-secondary font-light">Teaching. Mentoring. Building. Healing.</p>
        </div>

        {/* PAGE 7: NETWORK EFFECT */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-6xl md:text-8xl font-heading font-bold text-foreground tracking-tight mb-6">
            Goodness scales through connection.
          </h2>
          <p className="text-2xl text-text-secondary font-light">The strongest force is people, connected.</p>
        </div>

        {/* PAGE 8: NEKI NETWORK */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-6xl md:text-8xl font-heading font-extrabold text-foreground tracking-tight mb-4">
            Humanity works better as a network.
          </h2>
        </div>

        {/* PAGE 9: MISSION CREATION */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-12">
            Every mission starts with a simple decision.
          </h2>
          <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl text-center max-w-sm w-full shadow-2xl shadow-white/5">
            <div className="w-12 h-12 bg-neki-gold/10 text-neki-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Package strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-foreground tracking-tight mb-2">Feed 200 Cows</h3>
            <div className="bg-surface text-text-secondary py-1 px-4 rounded-full text-sm font-medium border border-white/5">Mission Status: Created</div>
          </div>
        </div>

        {/* PAGE 10: TRACKING */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-4">
            Follow every step.
          </h2>
          <p className="text-xl text-text-secondary mb-12 font-light">From contribution to completion. Nothing disappears.</p>
          <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl max-w-sm w-full relative overflow-hidden shadow-2xl shadow-white/5 text-left">
            <div className="flex justify-between items-center mb-6">
              <span className="text-foreground text-sm font-bold tracking-widest uppercase">Live Tracking</span>
              <MapPin className="text-neki-gold w-5 h-5" />
            </div>
            <div className="space-y-4 font-medium text-sm">
              <div className="flex items-center gap-4 text-text-muted"><div className="w-3 h-3 rounded-full bg-white/10" /> Mission Created</div>
              <div className="flex items-center gap-4 text-text-muted"><div className="w-3 h-3 rounded-full bg-white/10" /> Volunteer Assigned</div>
              <div className="flex items-center gap-4 text-text-muted"><div className="w-3 h-3 rounded-full bg-white/10" /> Pickup Complete</div>
              <div className="flex items-center gap-4 text-foreground"><div className="w-3 h-3 rounded-full bg-neki-gold shadow-[0_0_10px_rgba(212,175,106,0.4)]" /> En Route</div>
              <div className="flex items-center gap-4 text-text-muted/50"><div className="w-3 h-3 rounded-full border border-white/10" /> Delivered</div>
              <div className="flex items-center gap-4 text-text-muted/50"><div className="w-3 h-3 rounded-full border border-white/10" /> Verified</div>
            </div>
          </div>
        </div>

        {/* PAGE 11: TRUST */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <ShieldCheck className="w-20 h-20 text-neki-green mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-4">
            Trust begins where uncertainty ends.
          </h2>
        </div>

        {/* PAGE 12: PROOF OF IMPACT */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <ImageIcon className="w-20 h-20 text-neki-gold mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-6">
            Impact should be seen. <br/><span className="text-text-muted">Not assumed.</span>
          </h2>
          <p className="text-2xl text-text-secondary font-light max-w-2xl">
            Every completed mission becomes proof.<br/>
            Every proof inspires another mission.
          </p>
        </div>

        {/* PAGE 13: MULTIPLIER */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-6xl md:text-9xl font-heading font-extrabold text-foreground tracking-tighter mb-4">
            1 → 1000
          </h2>
          <p className="text-3xl text-text-secondary font-light">One act inspires another. And another. And another.</p>
        </div>

        {/* PAGE 14: INDIA NETWORK */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-extrabold text-foreground tracking-tight mb-4 max-w-5xl">
            When millions move together, impossible becomes routine.
          </h2>
        </div>

        {/* PAGE 15: FINAL */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
          <h1 className="text-6xl md:text-9xl font-heading font-extrabold text-foreground tracking-tight mb-6">
            Humanity, <br/><span className="text-neki-gold">Delivered.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12 font-light">
            Track every contribution.<br/>
            Verify every mission.<br/>
            See every impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:bg-[#222222] transition-colors pointer-events-auto">
              Start a Mission
            </button>
            <button className="bg-transparent border border-white/20 text-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-white/5 transition-colors pointer-events-auto">
              Become a Volunteer
            </button>
            <button className="bg-transparent border border-white/20 text-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-white/5 transition-colors pointer-events-auto">
              Partner with NEKI
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
