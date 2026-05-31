"use client";

import { motion } from "framer-motion";
import { AlertTriangle, PlusCircle, Users, Truck, CheckCircle, Heart } from "lucide-react";

const steps = [
  { icon: AlertTriangle, title: "Need Identified", desc: "Someone needs help." },
  { icon: PlusCircle, title: "Mission Created", desc: "A verifiable mission is logged." },
  { icon: Users, title: "Community Responds", desc: "Nearby volunteers & contributors are alerted." },
  { icon: Truck, title: "Live Tracking", desc: "Pickup & delivery are tracked in real-time." },
  { icon: CheckCircle, title: "Proof Uploaded", desc: "Mission completed with photographic proof." },
  { icon: Heart, title: "Impact Visible", desc: "Real-world impact is registered and celebrated." },
];

export function HowItWorks() {
  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold text-neki-charcoal"
          >
            Operational Infrastructure <br/>
            <span className="text-neki-green">for Humanity.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-neki-charcoal/10 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-neki-cream shadow-xl mb-6 relative group-hover:scale-110 group-hover:border-neki-green transition-all duration-300">
                  <step.icon className="w-6 h-6 text-neki-charcoal group-hover:text-neki-green transition-colors" />
                  {/* Active dot animation */}
                  <div className="absolute -inset-2 rounded-full border border-neki-green/30 animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100" />
                </div>
                <div className="text-sm font-bold text-neki-orange mb-2">Step {i + 1}</div>
                <h3 className="text-lg font-semibold text-neki-charcoal mb-2">{step.title}</h3>
                <p className="text-sm text-neki-charcoal/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}