"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Trophy, Clock, Medal, Award } from "lucide-react";

export function Volunteer() {
  return (
    <section className="py-32 bg-neki-charcoal text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neki-green/20 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 w-full max-w-2xl relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10"
          >
            <Image
              src="/images/volunteer_energy_1780254728385.png"
              alt="Gen Z Volunteers"
              fill
              className="object-cover"
            />
            {/* Overlay stats */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl flex items-center justify-between">
              <div>
                <div className="text-sm text-white/60 font-medium uppercase tracking-wider mb-1">Total Hours</div>
                <div className="text-3xl font-bold font-heading">120+</div>
              </div>
              <div className="w-[1px] h-12 bg-white/20" />
              <div>
                <div className="text-sm text-white/60 font-medium uppercase tracking-wider mb-1">Missions</div>
                <div className="text-3xl font-bold font-heading">45</div>
              </div>
              <div className="w-[1px] h-12 bg-white/20" />
              <div>
                <div className="text-sm text-white/60 font-medium uppercase tracking-wider mb-1">Level</div>
                <div className="text-3xl font-bold font-heading text-neki-yellow">Gold</div>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-neki-yellow font-semibold tracking-wide uppercase text-sm mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-neki-yellow rounded-full" />
                For Volunteers & Youth
              </div>
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
                Modern Civic <br/>
                <span className="text-neki-yellow">Participation.</span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-10">
                Not just unpaid labor. It's about leadership, purpose, and real-world action. Join missions, build your impact profile, and get recognized for your efforts.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                { icon: Trophy, title: "Impact Profiles", desc: "Track every mission and hour." },
                { icon: Award, title: "Verified Certificates", desc: "Official recognition for your work." },
                { icon: Clock, title: "Flexible Missions", desc: "Help when you can, where you can." },
                { icon: Medal, title: "Leadership Roles", desc: "Lead community drives." },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-white/10 p-3 rounded-full text-neki-yellow">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-white/50">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 bg-neki-yellow text-neki-charcoal px-8 py-4 rounded-full font-bold hover:bg-white transition-all active:scale-95 group"
            >
              Become a Volunteer
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}