"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
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
          <color attach="background" args={["#FAF9F7"]} />
          <ambientLight intensity={1.2} />
          
          <ParticleMorpher progressRef={progressRef} />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.5} radius={0.4} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* DOM OVERLAYS - NATIVELY SCROLLING */}
      <div className="relative z-10 w-full pointer-events-none">
        
        {/* PAGE 0: HERO (Split Layout) */}
        <div className="h-screen w-full flex flex-col justify-center p-6 md:pl-[10%] text-left relative">
          <div className="max-w-xl">
            <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-foreground tracking-tight mb-4">
              Humanity, <br/><span className="text-neki-gold font-playfair italic">Delivered.</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary font-medium mb-6">
              The future of helping is visible.
            </p>
            <p className="text-lg text-text-muted mb-12 font-light">
              Track every contribution.<br/>
              Verify every mission.<br/>
              See every impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto items-center">
              <button className="bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors">
                Start a Mission
              </button>
              <button className="bg-transparent border border-black/10 text-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-black/5 transition-colors">
                Explore Missions
              </button>
            </div>
            <button className="mt-6 text-sm text-text-muted hover:text-foreground font-medium transition-colors pointer-events-auto underline underline-offset-4">
              For NGOs, institutions and communities →
            </button>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-bold tracking-widest text-text-muted uppercase">
            Scroll to follow the journey
          </div>
        </div>

        {/* PAGE 1: PROBLEM (Left) */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[15%]">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-6 max-w-2xl">
            Good intentions deserve <br/><span className="font-playfair italic text-text-muted">better infrastructure.</span>
          </h2>
          <p className="text-lg text-text-muted max-w-xl font-light leading-relaxed">
            People don't stop helping because they stop caring.<br/>
            They stop helping because they stop seeing where help goes.
          </p>
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
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[15%] text-right">
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight mb-4 max-w-2xl">
            Humanity works better as a <span className="font-playfair italic text-neki-gold">network.</span>
          </h2>
        </div>

        {/* PAGE 9: MISSION CREATION (Center / Scattered Cards) */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center relative">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-16 z-20 relative">
            Every mission starts with a <span className="font-playfair italic text-neki-gold">simple decision.</span>
          </h2>
          
          <div className="relative w-full max-w-4xl mx-auto h-[400px]">
            {/* Center Main Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md border border-black/5 p-6 rounded-2xl text-center w-64 shadow-xl shadow-black/5 z-10">
              <Package strokeWidth={1.5} className="w-8 h-8 text-neki-gold mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground mb-2">Feed 200 Cows</h3>
              <div className="bg-surface text-text-secondary py-1 px-3 rounded-full text-xs font-medium border border-black/5">Created</div>
            </div>

            {/* Scattered Cards */}
            <div className="absolute top-0 left-10 md:left-20 bg-white/60 backdrop-blur-md border border-black/5 p-4 rounded-xl text-center w-48 opacity-80 scale-90 -rotate-6 shadow-lg shadow-black/5">
              <h3 className="text-sm font-bold text-foreground mb-1">50 Winter Blankets</h3>
              <div className="text-text-muted text-xs">Delhi • 14 Volunteers</div>
            </div>

            <div className="absolute bottom-10 left-4 md:left-12 bg-white/60 backdrop-blur-md border border-black/5 p-4 rounded-xl text-center w-52 opacity-70 scale-75 rotate-3 shadow-lg shadow-black/5">
              <h3 className="text-sm font-bold text-foreground mb-1">Math Tutoring</h3>
              <div className="text-text-muted text-xs">Online • Skill Mission</div>
            </div>

            <div className="absolute top-10 right-10 md:right-24 bg-white/60 backdrop-blur-md border border-black/5 p-4 rounded-xl text-center w-48 opacity-90 scale-90 rotate-6 shadow-lg shadow-black/5">
              <h3 className="text-sm font-bold text-foreground mb-1">First Aid Camp</h3>
              <div className="text-text-muted text-xs">Mumbai • Med-Kit</div>
            </div>

            <div className="absolute bottom-0 right-10 md:right-16 bg-white/60 backdrop-blur-md border border-black/5 p-4 rounded-xl text-center w-56 opacity-60 scale-75 -rotate-3 shadow-lg shadow-black/5">
              <h3 className="text-sm font-bold text-foreground mb-1">Animal Shelter Setup</h3>
              <div className="text-text-muted text-xs">Bangalore • Labour</div>
            </div>
          </div>
        </div>

        {/* PAGE 10: TRACKING (Left) */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[15%]">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-4">
            Follow <span className="font-playfair italic">every step.</span>
          </h2>
          <p className="text-lg text-text-secondary mb-8 font-light">From contribution to completion. Nothing disappears.</p>
          <div className="bg-white/60 backdrop-blur-2xl border border-black/5 p-6 rounded-3xl w-full max-w-sm relative shadow-xl shadow-black/5">
            <div className="flex justify-between items-center mb-6">
              <span className="text-foreground text-xs font-bold tracking-widest uppercase">Live Tracking</span>
              <MapPin className="text-neki-gold w-4 h-4" />
            </div>
            <div className="space-y-4 font-medium text-sm">
              <div className="flex items-center gap-4 text-text-muted"><div className="w-2 h-2 rounded-full bg-black/10" /> Mission Created</div>
              <div className="flex items-center gap-4 text-text-muted"><div className="w-2 h-2 rounded-full bg-black/10" /> Volunteer Assigned</div>
              <div className="flex items-center gap-4 text-foreground"><div className="w-2 h-2 rounded-full bg-neki-gold shadow-[0_0_8px_rgba(212,175,106,0.6)]" /> En Route</div>
              <div className="flex items-center gap-4 text-text-muted/40"><div className="w-2 h-2 rounded-full border border-black/10" /> Delivered</div>
            </div>
          </div>
        </div>

        {/* PAGE 11: TRUST (Right) */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[15%] text-right">
          <ShieldCheck className="w-12 h-12 text-neki-green mb-6" strokeWidth={1.5} />
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-4 max-w-xl">
            Trust begins where <span className="font-playfair italic text-neki-green">uncertainty ends.</span>
          </h2>
        </div>

        {/* PAGE 12: PROOF OF IMPACT (Left) */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[15%]">
          <ImageIcon className="w-12 h-12 text-neki-gold mb-6" strokeWidth={1.5} />
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-6 max-w-xl">
            Impact should be seen. <br/><span className="text-text-muted font-playfair italic">Not assumed.</span>
          </h2>
          <p className="text-lg text-text-secondary font-light max-w-md">
            Every completed mission becomes proof. Every proof inspires another mission.
          </p>
        </div>

        {/* PAGE 13: MULTIPLIER (Right) */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[15%] text-right">
          <h2 className="text-5xl md:text-8xl font-heading font-extrabold text-foreground tracking-tighter mb-4">
            1 <span className="font-playfair italic text-neki-gold">→</span> 1000
          </h2>
          <p className="text-xl text-text-secondary font-light max-w-sm">One act inspires another. And another. And another.</p>
        </div>

        {/* PAGE 14: INDIA NETWORK (Center) */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight mb-4 max-w-4xl">
            When millions move together, <span className="font-playfair italic text-neki-gold">impossible</span> becomes routine.
          </h2>
        </div>

        {/* PAGE 15: FINAL (Center) */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-foreground tracking-tight mb-6">
            Humanity, <br/><span className="text-neki-gold font-playfair italic">Delivered.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto mb-12 font-light">
            Track every contribution. Verify every mission. See every impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-foreground text-background px-6 py-3 rounded-full font-medium text-base hover:bg-gray-200 transition-colors pointer-events-auto">
              Start a Mission
            </button>
            <button className="bg-transparent border border-black/10 text-foreground px-6 py-3 rounded-full font-medium text-base hover:bg-black/5 transition-colors pointer-events-auto">
              Become a Volunteer
            </button>
            <button className="bg-transparent border border-black/10 text-foreground px-6 py-3 rounded-full font-medium text-base hover:bg-black/5 transition-colors pointer-events-auto">
              Partner with NEKI
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
