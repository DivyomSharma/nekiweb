"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, MapPin, Camera, CheckCircle, ShieldCheck } from "lucide-react";

const sequenceSteps = [
  { icon: Heart, text: "Contribution made", time: "10:00 AM", active: true },
  { icon: ShieldCheck, text: "Volunteer assigned", time: "10:15 AM", active: true },
  { icon: MapPin, text: "Live tracking active", time: "10:30 AM", active: true },
  { icon: Camera, text: "Proof uploaded", time: "11:15 AM", active: true },
  { icon: CheckCircle, text: "Mission completed", time: "11:20 AM", active: true },
];

export function Problem() {
  return (
    <section className="py-32 bg-neki-cream text-neki-charcoal relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LEFT SIDE: Emotional Narrative */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-2 text-neki-orange font-semibold tracking-wide uppercase text-sm mb-6"
            >
              <span className="w-8 h-[2px] bg-neki-orange rounded-full" />
              The Trust Deficit
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight text-neki-charcoal"
            >
              People want to help. <br/>
              <span className="text-neki-charcoal/40">They just stopped trusting the system.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-lg md:text-xl text-neki-charcoal/70 leading-relaxed"
            >
              <p>
                For years, people donated hoping resources would reach the right hands — but without visibility, trust slowly disappeared.
              </p>
              <p>
                Donations vanished into opaque systems. There was no visibility, no proof, no tracking, and no emotional closure. We emotionally disconnected ourselves by saying, <span className="font-medium italic">"At least I did my part."</span>
              </p>
              <p className="text-neki-charcoal font-medium">
                NEKI rebuilds that trust through real-time missions, live tracking, verified volunteers, transparent delivery, and proof-driven impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mt-12 text-neki-green font-bold uppercase tracking-widest text-sm"
            >
              <span>Donate</span>
              <span className="w-4 h-[1px] bg-neki-green/50" />
              <span>Track</span>
              <span className="w-4 h-[1px] bg-neki-green/50" />
              <span>See it delivered</span>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Animated Operational Visuals */}
          <div className="flex-1 w-full max-w-xl relative">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50 bg-white"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/humanitarian_logistics_1780254699576.png"
                  alt="Operational Transparency"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neki-charcoal/90 via-neki-charcoal/30 to-transparent" />
              </div>

              {/* Animated Sequence Overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
                <div className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="font-bold text-neki-charcoal text-lg">Mission #8492</h4>
                      <p className="text-neki-charcoal/50 text-sm">Food for Cow Shelter</p>
                    </div>
                    <div className="bg-neki-green/10 text-neki-green px-3 py-1 rounded-full text-xs font-bold uppercase">
                      Verified
                    </div>
                  </div>

                  {/* Timeline Sequence */}
                  <div className="relative space-y-4">
                    {/* Connecting vertical line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-neki-charcoal/10" />
                    
                    {sequenceSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.5 + (i * 0.2), duration: 0.5 }}
                        className="flex items-center gap-4 relative z-10"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                          i === sequenceSteps.length - 1 ? 'bg-neki-green text-white scale-110' : 'bg-white border border-neki-charcoal/10 text-neki-charcoal'
                        }`}>
                          <step.icon className={`w-5 h-5 ${i === sequenceSteps.length - 1 ? '' : 'text-neki-orange'}`} />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <span className={`font-medium ${i === sequenceSteps.length - 1 ? 'text-neki-green' : 'text-neki-charcoal'}`}>
                            {step.text}
                          </span>
                          <span className="text-xs text-neki-charcoal/40 font-mono">{step.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Final Glow Effect for Completion */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute inset-0 border-2 border-neki-green/30 rounded-3xl pointer-events-none"
                    style={{ boxShadow: '0 0 40px rgba(30, 61, 43, 0.1) inset' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Floating Live Map Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute -right-8 top-12 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 hidden md:flex items-center gap-4"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-neki-orange/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-neki-orange" />
                </div>
                {/* Ping animation */}
                <div className="absolute inset-0 bg-neki-orange/20 rounded-full animate-ping" />
              </div>
              <div>
                <p className="text-xs font-bold text-neki-charcoal/50 uppercase">Live Routing</p>
                <p className="font-medium text-neki-charcoal text-sm">Volunteer 2km away</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}