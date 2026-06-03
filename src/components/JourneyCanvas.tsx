"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ParticleMorpher } from "./ParticleMorpher";
import { ShieldCheck, MapPin, CheckCircle, Package } from "lucide-react";

export function JourneyCanvas() {
  return (
    <section className="relative w-full h-screen bg-[#050505]">
      {/* Absolute positioning prevents scrolling of the container itself, ScrollControls handles internal scrolling */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: false, alpha: false }}>
          <color attach="background" args={["#050505"]} />
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          
          <ScrollControls pages={17} damping={0.25} maxSpeed={0.5}>
            
            {/* The 3D Engine */}
            <ParticleMorpher />
            
            <EffectComposer>
              <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.6} />
            </EffectComposer>

            {/* The DOM Overlays (17 Pages) */}
            <Scroll html style={{ width: "100%", height: "100%" }}>
              
              {/* PAGE 0: HERO (0 - 100vh) */}
              <div className="absolute top-[0vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-white mb-6">
                  Humanity, <br/><span className="text-neki-orange">Delivered.</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/70 max-w-2xl">
                  NEKI makes helping people as easy, trackable and trustworthy as modern commerce.
                </p>
                <p className="text-white/30 text-sm mt-12 tracking-widest uppercase">Scroll to begin</p>
              </div>

              {/* PAGE 1: PROBLEM (100vh - 200vh) */}
              <div className="absolute top-[100vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
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

              {/* PAGE 2: FOOD (200vh - 300vh) */}
              <div className="absolute top-[200vh] w-full h-screen flex flex-col items-start justify-center p-6 md:pl-[10%] pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-neki-green mb-4">
                  Some contribute food.
                </h2>
                <p className="text-xl text-white/70">Grocery kits, grain bags, hot meals.</p>
              </div>

              {/* PAGE 3: CLOTHES (300vh - 400vh) */}
              <div className="absolute top-[300vh] w-full h-screen flex flex-col items-end justify-center p-6 md:pr-[10%] text-right pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-blue-400 mb-4">
                  Some contribute essentials.
                </h2>
                <p className="text-xl text-white/70">Blankets, winter wear, daily necessities.</p>
              </div>

              {/* PAGE 4: BOOKS (400vh - 500vh) */}
              <div className="absolute top-[400vh] w-full h-screen flex flex-col items-start justify-center p-6 md:pl-[10%] pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-yellow-400 mb-4">
                  Some contribute knowledge.
                </h2>
                <p className="text-xl text-white/70">Books, notebooks, education kits.</p>
              </div>

              {/* PAGE 5: MEDICAL (500vh - 600vh) */}
              <div className="absolute top-[500vh] w-full h-screen flex flex-col items-end justify-center p-6 md:pr-[10%] text-right pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-red-400 mb-4">
                  Some contribute care.
                </h2>
                <p className="text-xl text-white/70">First aid, medicines, healthcare support.</p>
              </div>

              {/* PAGE 6: VOLUNTEERS (600vh - 700vh) */}
              <div className="absolute top-[600vh] w-full h-screen flex flex-col items-center justify-end pb-[20vh] p-6 text-center pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-neki-orange mb-4">
                  Some contribute time.
                </h2>
                <p className="text-xl text-white/70">The backbone of real impact.</p>
              </div>

              {/* PAGE 7: SKILLS (700vh - 800vh) */}
              <div className="absolute top-[700vh] w-full h-screen flex flex-col items-center justify-start pt-[20vh] p-6 text-center pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-purple-400 mb-4">
                  Some contribute skills.
                </h2>
                <p className="text-xl text-white/70">Teachers, doctors, engineers, mentors.</p>
              </div>

              {/* PAGE 8: COMMUNITIES (800vh - 900vh) */}
              <div className="absolute top-[800vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
                  Together, contribution becomes <span className="text-neki-orange">impact.</span>
                </h2>
              </div>

              {/* PAGE 9: NEKI NETWORK (900vh - 1000vh) */}
              <div className="absolute top-[900vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <h2 className="text-6xl md:text-8xl font-heading font-extrabold text-white mb-4 drop-shadow-2xl">
                  NEKI coordinates the journey.
                </h2>
                <p className="text-2xl text-neki-yellow font-medium">Maps active. Volunteers online. NGOs connected.</p>
              </div>

              {/* PAGE 10: MISSION CREATION (1000vh - 1100vh) */}
              <div className="absolute top-[1000vh] w-full h-screen flex flex-col items-center justify-center p-6 pointer-events-none">
                <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center max-w-sm w-full">
                  <div className="w-12 h-12 bg-neki-orange/20 text-neki-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Feed 200 Cows</h3>
                  <div className="bg-white/10 text-white/80 py-1 px-4 rounded-full text-sm inline-block">Status: Mission Created</div>
                </div>
              </div>

              {/* PAGE 11: TRACKING (1100vh - 1200vh) */}
              <div className="absolute top-[1100vh] w-full h-screen flex flex-col items-center justify-center p-6 pointer-events-none">
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

              {/* PAGE 12: TRUST (1200vh - 1300vh) */}
              <div className="absolute top-[1200vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <ShieldCheck className="w-20 h-20 text-neki-green mx-auto mb-6 drop-shadow-[0_0_30px_rgba(74,222,128,0.5)]" />
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4">
                  Trust is built through <span className="text-neki-green">visibility.</span>
                </h2>
              </div>

              {/* PAGE 13: PROOF OF IMPACT (1300vh - 1400vh) */}
              <div className="absolute top-[1300vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
                  Every completed mission inspires another.
                </h2>
                <p className="text-xl text-white/60">Photos, videos, and verified social proof.</p>
              </div>

              {/* PAGE 14: MULTIPLIER (1400vh - 1500vh) */}
              <div className="absolute top-[1400vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <h2 className="text-6xl md:text-9xl font-heading font-extrabold text-white mb-4">
                  1 → 1000
                </h2>
                <p className="text-2xl text-neki-yellow">The network effect of human goodness.</p>
              </div>

              {/* PAGE 15: LIVE IMPACT (1500vh - 1600vh) */}
              <div className="absolute top-[1500vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <h2 className="text-6xl md:text-8xl font-heading font-extrabold text-white mb-4 drop-shadow-2xl">
                  Humanity, coordinated.
                </h2>
                <p className="text-xl text-white/80 max-w-xl mx-auto">
                  Thousands of live missions. Live routes. Live organizations.
                </p>
              </div>

              {/* PAGE 16: FINAL (1600vh - 1700vh) */}
              <div className="absolute top-[1600vh] w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
                <h1 className="text-6xl md:text-9xl font-heading font-extrabold text-white mb-6 drop-shadow-2xl">
                  Humanity, <br/><span className="text-neki-orange">Delivered.</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12">
                  Track every contribution. Verify every mission. See every impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-neki-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-neki-charcoal transition-colors shadow-[0_0_20px_rgba(255,122,0,0.4)]">
                    Join NEKI
                  </button>
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors">
                    Become a Volunteer
                  </button>
                  <button className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-colors">
                    Onboard Organization
                  </button>
                </div>
              </div>

            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </section>
  );
}
