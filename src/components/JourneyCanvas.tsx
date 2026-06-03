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
    <section ref={containerRef} className="relative w-full bg-[#050505]" style={{ height: "1700vh" }}>
      
      {/* 3D CANVAS - FIXED TO BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: false, alpha: false }}>
          <color attach="background" args={["#050505"]} />
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          
          <ParticleMorpher progressRef={progressRef} />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.6} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* DOM OVERLAYS - NATIVELY SCROLLING */}
      <div className="relative z-10 w-full pointer-events-none">
        
        {/* PAGE 0: HERO */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-white mb-6">
            Humanity, <br/><span className="text-neki-orange">Delivered.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl">
            NEKI makes helping people as easy, trackable and trustworthy as modern commerce.
          </p>
          <p className="text-white/30 text-sm mt-12 tracking-widest uppercase">Scroll to begin</p>
        </div>

        {/* PAGE 1: PROBLEM */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
            People want to help.
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white/50 mb-6">
            They just stopped trusting the system.
          </h3>
          <p className="text-lg text-white/60 max-w-xl">
            Donation boxes appear. Resources fade into uncertainty. Where did it actually go?
          </p>
        </div>

        {/* PAGE 2: FOOD */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[10%]">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-neki-green mb-4">
            Some contribute food.
          </h2>
          <p className="text-xl text-white/70">Grocery kits, grain bags, hot meals.</p>
        </div>

        {/* PAGE 3: CLOTHES */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[10%] text-right">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-blue-400 mb-4">
            Some contribute essentials.
          </h2>
          <p className="text-xl text-white/70">Blankets, winter wear, daily necessities.</p>
        </div>

        {/* PAGE 4: BOOKS */}
        <div className="h-screen w-full flex flex-col items-start justify-center p-6 md:pl-[10%]">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-yellow-400 mb-4">
            Some contribute knowledge.
          </h2>
          <p className="text-xl text-white/70">Books, notebooks, education kits.</p>
        </div>

        {/* PAGE 5: MEDICAL */}
        <div className="h-screen w-full flex flex-col items-end justify-center p-6 md:pr-[10%] text-right">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-red-400 mb-4">
            Some contribute care.
          </h2>
          <p className="text-xl text-white/70">First aid, medicines, healthcare support.</p>
        </div>

        {/* PAGE 6: VOLUNTEERS */}
        <div className="h-screen w-full flex flex-col items-center justify-end pb-[20vh] p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-neki-orange mb-4">
            Some contribute time.
          </h2>
          <p className="text-xl text-white/70">The backbone of real impact.</p>
        </div>

        {/* PAGE 7: SKILLS */}
        <div className="h-screen w-full flex flex-col items-center justify-start pt-[20vh] p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-purple-400 mb-4">
            Some contribute skills.
          </h2>
          <p className="text-xl text-white/70">Teachers, doctors, engineers, mentors.</p>
        </div>

        {/* PAGE 8: COMMUNITIES */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
            Together, contribution becomes <span className="text-neki-orange">impact.</span>
          </h2>
        </div>

        {/* PAGE 9: NEKI NETWORK */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-6xl md:text-8xl font-heading font-extrabold text-white mb-4 drop-shadow-2xl">
            NEKI coordinates the journey.
          </h2>
          <p className="text-2xl text-neki-yellow font-medium">Maps active. Volunteers online. NGOs connected.</p>
        </div>

        {/* PAGE 10: MISSION CREATION */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6">
          <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center max-w-sm w-full">
            <div className="w-12 h-12 bg-neki-orange/20 text-neki-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Package />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Feed 200 Cows</h3>
            <div className="bg-white/10 text-white/80 py-1 px-4 rounded-full text-sm inline-block">Status: Mission Created</div>
          </div>
        </div>

        {/* PAGE 11: TRACKING */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6">
          <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-sm w-full relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <span className="text-neki-green text-sm font-bold tracking-widest uppercase">Live Tracking</span>
              <MapPin className="text-neki-green w-5 h-5" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white/50"><div className="w-4 h-4 rounded-full bg-white/20" /> Picked Up</div>
              <div className="flex items-center gap-4 text-white"><div className="w-4 h-4 rounded-full bg-neki-orange shadow-[0_0_10px_#FF7A00]" /> En Route</div>
              <div className="flex items-center gap-4 text-white/20"><div className="w-4 h-4 rounded-full border border-white/20" /> Delivered</div>
            </div>
          </div>
        </div>

        {/* PAGE 12: TRUST */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <ShieldCheck className="w-20 h-20 text-neki-green mx-auto mb-6 drop-shadow-[0_0_30px_rgba(74,222,128,0.5)]" />
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4">
            Trust is built through <span className="text-neki-green">visibility.</span>
          </h2>
        </div>

        {/* PAGE 13: PROOF OF IMPACT */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
            Every completed mission inspires another.
          </h2>
          <p className="text-xl text-white/60">Photos, videos, and verified social proof.</p>
        </div>

        {/* PAGE 14: MULTIPLIER */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-6xl md:text-9xl font-heading font-extrabold text-white mb-4">
            1 → 1000
          </h2>
          <p className="text-2xl text-neki-yellow">The network effect of human goodness.</p>
        </div>

        {/* PAGE 15: LIVE IMPACT */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-6xl md:text-8xl font-heading font-extrabold text-white mb-4 drop-shadow-2xl">
            Humanity, coordinated.
          </h2>
          <p className="text-xl text-white/80 max-w-xl mx-auto">
            Thousands of live missions. Live routes. Live organizations.
          </p>
        </div>

        {/* PAGE 16: FINAL */}
        <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
          <h1 className="text-6xl md:text-9xl font-heading font-extrabold text-white mb-6 drop-shadow-2xl">
            Humanity, <br/><span className="text-neki-orange">Delivered.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12">
            Track every contribution. Verify every mission. See every impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-neki-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-neki-charcoal transition-colors shadow-[0_0_20px_rgba(255,122,0,0.4)] pointer-events-auto">
              Join NEKI
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors pointer-events-auto">
              Become a Volunteer
            </button>
            <button className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-colors pointer-events-auto">
              Onboard Organization
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
