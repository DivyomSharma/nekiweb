"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ParticleMorpher } from "./ParticleMorpher";
import { ShieldCheck, MapPin, Package } from "lucide-react";
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
    <section ref={containerRef} className="relative w-full bg-background" style={{ height: "1700vh" }}>
      
      {/* 3D CANVAS - FIXED TO BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: false, alpha: false }}>
          <color attach="background" args={["#FAF9F7"]} />
          <ambientLight intensity={1.2} />
          <Environment preset="city" />
          
          <ParticleMorpher progressRef={progressRef} />
          
          {/* Subtle Bloom for the Gold Highlights */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.5} radius={0.4} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* DOM OVERLAYS - NATIVELY SCROLLING */}
      <div className="relative z-10 w-full pointer-events-none">
        
        {/* PAGE 0: HERO */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-foreground tracking-tight mb-6">
            Humanity, <br/><span className="text-neki-gold">Delivered.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl font-light">
            NEKI makes helping people as easy, trackable and trustworthy as modern commerce.
          </p>
          <p className="text-text-muted text-sm mt-12 tracking-widest uppercase font-medium">Scroll to begin</p>
        </div>

        {/* PAGE 1: PROBLEM */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-6">
            People want to help.
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading font-medium text-text-muted mb-6">
            They just stopped trusting the system.
          </h3>
          <p className="text-lg text-text-secondary max-w-xl font-light">
            Donation boxes appear. Resources fade into uncertainty. Where did it actually go?
          </p>
        </div>

        {/* PAGE 2: FOOD */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[10%]">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-neki-green tracking-tight mb-4">
            Some contribute food.
          </h2>
          <p className="text-xl text-text-secondary font-light">Grocery kits, grain bags, hot meals.</p>
        </div>

        {/* PAGE 3: CLOTHES */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[10%] text-right">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-blue-400 tracking-tight mb-4">
            Some contribute essentials.
          </h2>
          <p className="text-xl text-text-secondary font-light">Blankets, winter wear, daily necessities.</p>
        </div>

        {/* PAGE 4: BOOKS */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[10%]">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-neki-gold tracking-tight mb-4">
            Some contribute knowledge.
          </h2>
          <p className="text-xl text-text-secondary font-light">Books, notebooks, education kits.</p>
        </div>

        {/* PAGE 5: MEDICAL */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[10%] text-right">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-red-400 tracking-tight mb-4">
            Some contribute care.
          </h2>
          <p className="text-xl text-text-secondary font-light">First aid, medicines, healthcare support.</p>
        </div>

        {/* PAGE 6: VOLUNTEERS */}
        <div className="h-screen w-full flex flex-col items-center justify-end pb-[20vh] p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-neki-gold tracking-tight mb-4">
            Some contribute time.
          </h2>
          <p className="text-xl text-text-secondary font-light">The backbone of real impact.</p>
        </div>

        {/* PAGE 7: SKILLS */}
        <div className="h-screen w-full flex flex-col items-center justify-start pt-[20vh] p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-purple-400 tracking-tight mb-4">
            Some contribute skills.
          </h2>
          <p className="text-xl text-text-secondary font-light">Teachers, doctors, engineers, mentors.</p>
        </div>

        {/* PAGE 8: COMMUNITIES */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-6">
            Together, contribution becomes <span className="text-neki-gold">impact.</span>
          </h2>
        </div>

        {/* PAGE 9: NEKI NETWORK */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-6xl md:text-8xl font-heading font-extrabold text-foreground tracking-tight mb-4">
            NEKI coordinates the journey.
          </h2>
          <p className="text-2xl text-text-secondary font-light">Maps active. Volunteers online. NGOs connected.</p>
        </div>

        {/* PAGE 10: MISSION CREATION */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6">
          <div className="bg-white/60 backdrop-blur-2xl border border-black/5 p-8 rounded-3xl text-center max-w-sm w-full shadow-2xl shadow-black/5">
            <div className="w-12 h-12 bg-neki-gold/10 text-neki-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Package strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-foreground tracking-tight mb-2">Feed 200 Cows</h3>
            <div className="bg-surface text-text-secondary py-1 px-4 rounded-full text-sm inline-block font-medium border border-black/5">Status: Mission Created</div>
          </div>
        </div>

        {/* PAGE 11: TRACKING */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6">
          <div className="bg-white/60 backdrop-blur-2xl border border-black/5 p-8 rounded-3xl max-w-sm w-full relative overflow-hidden shadow-2xl shadow-black/5">
            <div className="flex justify-between items-center mb-6">
              <span className="text-neki-green text-sm font-bold tracking-widest uppercase">Live Tracking</span>
              <MapPin className="text-neki-green w-5 h-5" />
            </div>
            <div className="space-y-4 font-medium">
              <div className="flex items-center gap-4 text-text-muted"><div className="w-4 h-4 rounded-full bg-black/10" /> Picked Up</div>
              <div className="flex items-center gap-4 text-foreground"><div className="w-4 h-4 rounded-full bg-neki-gold shadow-[0_0_10px_rgba(212,175,106,0.4)]" /> En Route</div>
              <div className="flex items-center gap-4 text-text-muted/50"><div className="w-4 h-4 rounded-full border border-black/10" /> Delivered</div>
            </div>
          </div>
        </div>

        {/* PAGE 12: TRUST */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <ShieldCheck className="w-20 h-20 text-neki-green mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-4">
            Trust is built through <span className="text-neki-green">visibility.</span>
          </h2>
        </div>

        {/* PAGE 13: PROOF OF IMPACT */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-6">
            Every completed mission inspires another.
          </h2>
          <p className="text-xl text-text-secondary font-light">Photos, videos, and verified social proof.</p>
        </div>

        {/* PAGE 14: MULTIPLIER */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-6xl md:text-9xl font-heading font-extrabold text-foreground tracking-tighter mb-4">
            1 → 1000
          </h2>
          <p className="text-2xl text-text-secondary font-light">The network effect of human goodness.</p>
        </div>

        {/* PAGE 15: LIVE IMPACT */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-6xl md:text-8xl font-heading font-extrabold text-foreground tracking-tight mb-4">
            Humanity, coordinated.
          </h2>
          <p className="text-xl text-text-secondary max-w-xl mx-auto font-light">
            Thousands of live missions. Live routes. Live organizations.
          </p>
        </div>

        {/* PAGE 16: FINAL */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
          <h1 className="text-6xl md:text-9xl font-heading font-extrabold text-foreground tracking-tight mb-6">
            Humanity, <br/><span className="text-neki-gold">Delivered.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12 font-light">
            Track every contribution. Verify every mission. See every impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:bg-[#222222] transition-colors pointer-events-auto">
              Join NEKI
            </button>
            <button className="bg-transparent border border-[#D8D4CE] text-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-black/5 transition-colors pointer-events-auto">
              Become a Volunteer
            </button>
            <button className="bg-transparent border border-[#D8D4CE] text-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-black/5 transition-colors pointer-events-auto">
              Onboard Organization
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
