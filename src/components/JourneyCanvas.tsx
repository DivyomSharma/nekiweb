"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ParticleMorpher } from "./ParticleMorpher";
import { MissionEcosystem } from "./MissionEcosystem";
import { ShieldCheck, MapPin, Package, Image as ImageIcon } from "lucide-react";
import Lenis from "lenis";
import Link from "next/link";
import { HeroSection } from "./sections/HeroSection";
import { TrackingSection } from "./sections/TrackingSection";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";

export function JourneyCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hasManyTouchPoints = navigator.maxTouchPoints > 1;
    const isSmallScreen = window.innerWidth < 1024;
    setIsLowEnd(mobileUA || hasManyTouchPoints || isSmallScreen);

    const lenis = new Lenis({
      lerp: mobileUA ? 0.25 : 0.1,
      wheelMultiplier: 1,
      smoothWheel: !mobileUA, // Let mobile use optimized native physics
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Restore scroll position
    const savedScroll = sessionStorage.getItem("homepage-scroll");
    if (savedScroll) {
      const scrollY = parseInt(savedScroll, 10);
      setTimeout(() => {
        lenis.scrollTo(scrollY, { immediate: true });
      }, 100);
    }

    // Save scroll position on scroll
    lenis.on("scroll", (e: any) => {
      sessionStorage.setItem("homepage-scroll", Math.round(e.scroll).toString());
    });

    return () => {
      lenis.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-background" style={isMobile ? undefined : { height: "1600vh" }}>
      
      {/* 3D CANVAS - FIXED TO BACKGROUND (desktop/tablet only; skipped on phones) */}
      {!isMobile && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
            dpr={isTablet ? 0.8 : [1, 1.5]}
          >
            <color attach="background" args={["#FAF9F7"]} />
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 10]} intensity={2} />

            <ParticleMorpher progressRef={progressRef} />

            {!isTablet && !isLowEnd && (
              <EffectComposer>
                <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.5} radius={0.4} />
              </EffectComposer>
            )}
          </Canvas>
        </div>
      )}
      {isMobile && <div className="fixed inset-0 z-0 pointer-events-none bg-[#FAF9F7]" />}

      {/* DOM OVERLAYS - NATIVELY SCROLLING */}
      <div className="relative z-10 w-full pointer-events-none" style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}>
        
        {/* PAGE 0: HERO (Split Layout) */}
        <HeroSection />

        {/* PAGE 1: PROBLEM (Left) */}
        <div className="py-16 md:py-0 md:h-screen w-full flex flex-col items-start justify-center pl-6 pr-4 md:pl-[15%] pointer-events-auto text-left">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-6 max-w-2xl">
            Good intentions deserve <br/><span className="font-playfair italic text-text-muted">better infrastructure.</span>
          </h2>
          <p className="text-xs xs:text-sm md:text-lg text-text-muted max-w-xl font-light leading-relaxed mb-8">
            People don't stop helping because they stop caring.<br/>
            They stop helping because they stop seeing where help goes.
          </p>
          <Link href="/why-neki" className="group flex items-center text-[10px] xs:text-xs md:text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
            Why NEKI Exists <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* PAGE 2: FOOD (Right) */}
        <div className="py-16 md:py-0 md:h-screen w-full flex flex-col items-end justify-center pr-6 pl-4 md:pr-[15%] pointer-events-auto ml-auto text-right">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-neki-green tracking-tight mb-4">
              A meal can <span className="font-playfair italic">change a day.</span>
            </h2>
            <p className="text-xs xs:text-sm md:text-lg text-text-secondary font-light mb-6">Food. Community kitchens. Animal shelters.</p>
            <Link href="/food" className="group inline-flex items-center text-[10px] xs:text-xs md:text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
              Explore <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* PAGE 3: BOOKS (Left) */}
        <div className="py-16 md:py-0 md:h-screen w-full flex flex-col items-start justify-center pl-6 pr-4 md:pl-[15%] pointer-events-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-neki-gold tracking-tight mb-4 max-w-xl">
              Knowledge travels farther <span className="font-playfair italic">than books.</span>
            </h2>
            <p className="text-xs xs:text-sm md:text-lg text-text-secondary font-light mb-6">Education. Learning. Opportunity.</p>
            <Link href="/education" className="group inline-flex items-center text-[10px] xs:text-xs md:text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
              Explore <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* PAGE 4: MEDICAL (Right) */}
        <div className="py-16 md:py-0 md:h-screen w-full flex flex-col items-end justify-center pr-6 pl-4 md:pr-[15%] pointer-events-auto ml-auto text-right">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-red-400 tracking-tight mb-4 max-w-xl">
              Care should never be <span className="font-playfair italic">out of reach.</span>
            </h2>
            <p className="text-xs xs:text-sm md:text-lg text-text-secondary font-light mb-6">Healthcare. Medicine. Relief.</p>
            <Link href="/care" className="group inline-flex items-center text-[10px] xs:text-xs md:text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
              Explore <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* PAGE 5: TIME (Left) */}
        <div className="py-16 md:py-0 md:h-screen w-full flex flex-col items-start justify-center pl-6 pr-4 md:pl-[15%] pointer-events-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-blue-400 tracking-tight mb-4 max-w-2xl">
              Some contributions can't be <span className="font-playfair italic">measured in money.</span>
            </h2>
            <p className="text-xs xs:text-sm md:text-lg text-text-secondary font-light mb-6">Time. Presence. Effort.</p>
            <Link href="/contribution" className="group inline-flex items-center text-[10px] xs:text-xs md:text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
              Explore <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* PAGE 6: SKILLS (Right) */}
        <div className="py-16 md:py-0 md:h-screen w-full flex flex-col items-end justify-center pr-6 pl-4 md:pr-[15%] pointer-events-auto ml-auto text-right">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-purple-400 tracking-tight mb-4 max-w-xl">
              Expertise can be a <span className="font-playfair italic">form of service.</span>
            </h2>
            <p className="text-xs xs:text-sm md:text-lg text-text-secondary font-light mb-6">Teaching. Mentoring. Building. Healing.</p>
            <Link href="/skills" className="group inline-flex items-center text-[10px] xs:text-xs md:text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
              Explore <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* PAGE 7: CONNECTION (Left) */}
        <div className="py-16 md:py-0 md:h-screen w-full flex flex-col items-start justify-center pl-6 pr-4 md:pl-[15%] pointer-events-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-6 max-w-2xl">
              Goodness scales through <span className="text-neki-gold font-playfair italic">connection.</span>
            </h2>
            <p className="text-xs xs:text-sm md:text-lg text-text-secondary font-light mb-6">The strongest force is people, connected.</p>
            <Link href="/connection" className="group inline-flex items-center text-[10px] xs:text-xs md:text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
              Explore <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* PAGE 8: NEKI NETWORK (Right) */}
        <div className="py-16 md:py-0 md:h-screen w-full flex flex-col items-end justify-center pr-6 pl-4 md:pr-[15%] pointer-events-auto ml-auto text-right">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight mb-8 max-w-2xl">
            Humanity works better as a <span className="font-playfair italic text-neki-gold">network.</span>
          </h2>
          <Link href="/network" className="group flex items-center justify-end text-[10px] xs:text-xs md:text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
            How The Network Works <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* PAGE 9: MISSION CREATION (Center / Scattered Cards) */}
        <div className="md:h-screen w-full relative overflow-hidden pointer-events-none">
          <MissionEcosystem />
        </div>

        {/* PAGE 10: TRACKING (Left) */}
        <TrackingSection />

        {/* PAGE 11: TRUST (Right) */}
        <div className="py-16 md:py-0 md:h-screen w-full flex flex-col items-end justify-center pr-6 pl-4 md:pr-[15%] pointer-events-auto ml-auto text-right">
          <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-neki-green mb-4 md:mb-6" strokeWidth={1.5} />
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-8 max-w-xl">
            Trust begins where <span className="font-playfair italic text-neki-green">uncertainty ends.</span>
          </h2>
          <Link href="/trust" className="group flex items-center justify-end text-[10px] xs:text-xs md:text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
            How Trust Works <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* PAGE 12: PROOF OF IMPACT (Left) */}
        <div className="py-16 md:py-0 md:h-screen w-full flex flex-col items-start justify-center pl-6 pr-4 md:pl-[15%] pointer-events-auto text-left">
          <ImageIcon className="w-8 h-8 md:w-12 md:h-12 text-neki-gold mb-4 md:mb-6" strokeWidth={1.5} />
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-6 max-w-xl">
            Impact should be seen. <br/><span className="text-text-muted font-playfair italic">Not assumed.</span>
          </h2>
          <p className="text-xs xs:text-sm md:text-lg text-text-secondary font-light max-w-md mb-8">
            Every completed mission becomes proof. Every proof inspires another mission.
          </p>
          <Link href="/impact" className="group flex items-center text-[10px] xs:text-xs md:text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
            View Impact Stories <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* PAGE 13: MULTIPLIER / NETWORK (Center) */}
        <div className="py-20 md:py-0 md:h-screen w-full flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
          <h2 className="text-xl xs:text-3xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight mb-4 max-w-4xl px-2">
            When millions move together, <br/><span className="font-playfair italic text-neki-gold">impossible</span> becomes routine.
          </h2>
        </div>

        {/* PAGE 15: FINAL (Center) */}
        <div className="py-20 md:py-0 md:h-screen w-full flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
          <h1 className="text-3xl xs:text-4xl md:text-7xl font-heading font-extrabold text-foreground tracking-tight mb-6">
            Humanity, <br/><span className="text-neki-gold font-playfair italic">Delivered.</span>
          </h1>
          <p className="text-xs xs:text-sm md:text-xl text-text-secondary max-w-xl mx-auto mb-12 font-light px-2">
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
