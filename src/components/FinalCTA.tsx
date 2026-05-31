"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-32 bg-neki-green text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neki-green to-neki-charcoal opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/10 rounded-full">
              <Heart className="w-10 h-10 text-neki-yellow" />
            </div>
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
            The internet connected people. <br />
            <span className="text-neki-yellow">NEKI helps people help each other.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button className="bg-neki-yellow text-neki-charcoal px-8 py-4 rounded-full font-bold hover:bg-white transition-colors">
              Join as Volunteer
            </button>
            <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors">
              Start Contributing
            </button>
            <button className="bg-transparent border border-transparent text-white/80 hover:text-white px-8 py-4 rounded-full font-bold transition-colors">
              Onboard Organization
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}