"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin, Navigation } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-neki-cream pt-20">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/humanitarian_logistics_1780254699576.png"
            alt="Humanitarian Logistics"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-neki-cream/50 via-neki-cream to-neki-cream" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Text Content */}
        <div className="flex flex-col flex-1 max-w-2xl gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 text-neki-orange font-semibold tracking-wide uppercase text-sm"
          >
            <span className="w-8 h-[2px] bg-neki-orange rounded-full" />
            Quick commerce for social good
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-heading text-5xl md:text-7xl font-bold leading-tight tracking-tighter text-neki-charcoal"
          >
            Humanity, <br />
            <span className="text-neki-orange">Delivered.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-neki-charcoal/70 leading-relaxed max-w-xl"
          >
            NEKI makes helping people as fast, trusted, and actionable as modern commerce — connecting contributors, volunteers, NGOs, and communities through real-time missions and transparent impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <button className="flex items-center justify-center gap-2 bg-neki-green text-white px-8 py-4 rounded-full font-medium hover:bg-neki-green/90 transition-all active:scale-95 group">
              Join NEKI
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-2 bg-white text-neki-charcoal px-8 py-4 rounded-full font-medium shadow-sm hover:shadow-md transition-all active:scale-95 border border-neki-charcoal/10">
              Explore Missions
            </button>
          </motion.div>
        </div>

        {/* Live Mission Dashboard / Visuals */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex-1 w-full max-w-xl relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/40 backdrop-blur-sm"
        >
          <Image
            src="/images/trust_transparency_1780254742120.png"
            alt="Live Tracking Dashboard"
            fill
            className="object-cover"
          />
          
          {/* Animated Overlay Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4"
          >
            <div className="bg-neki-orange/20 p-3 rounded-full text-neki-orange">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-neki-charcoal/50 uppercase">Mission Status</div>
              <div className="font-medium text-neki-charcoal">Volunteer Assigned</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-8 right-8 bg-neki-green text-white p-4 rounded-2xl shadow-xl flex items-center gap-4"
          >
            <div className="bg-white/20 p-3 rounded-full">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white/70 uppercase">Delivery</div>
              <div className="font-medium">Picked up in 2 hrs</div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}