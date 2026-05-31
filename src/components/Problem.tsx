"use client";

import { motion } from "framer-motion";
import { Smartphone, ShieldOff, AlertCircle, ArrowRight } from "lucide-react";

const problems = [
  { icon: Smartphone, title: "Passive Scrolling", desc: "Good intentions trapped on screens." },
  { icon: ShieldOff, title: "Lack of Trust", desc: "Uncertainty about where help actually goes." },
  { icon: AlertCircle, title: "Slow Coordination", desc: "Fragmented NGOs and disconnected systems." },
];

export function Problem() {
  return (
    <section className="py-32 bg-neki-charcoal text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-heading text-4xl md:text-5xl font-bold mb-6"
          >
            The internet connected people. <br/>
            <span className="text-neki-charcoal text-opacity-50 stroke-white/20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
              But real-world action remained broken.
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full">
            {problems.map((prob, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center p-8 rounded-3xl bg-white/5 border border-white/10"
              >
                <div className="bg-white/10 p-4 rounded-full mb-6 text-neki-yellow">
                  <prob.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{prob.title}</h3>
                <p className="text-white/60">{prob.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.8 }}
            className="mt-24 flex flex-col items-center"
          >
            <div className="w-[2px] h-24 bg-gradient-to-b from-transparent via-neki-orange to-neki-orange mb-8" />
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-neki-orange flex items-center gap-4">
              NEKI turns intent into action.
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}