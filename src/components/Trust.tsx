"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export function Trust() {
  return (
    <section className="py-32 bg-neki-cream">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center p-4 bg-neki-green/10 text-neki-green rounded-full mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-neki-charcoal mb-6">
            Trust is our core product.
          </h2>
          <p className="text-lg text-neki-charcoal/70 max-w-2xl mx-auto mb-16">
            We built NEKI to eliminate uncertainty in charitable giving. Every organization is verified, every mission is tracked, and every impact is proven.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { icon: Lock, title: "Verified NGOs Only", desc: "Strict onboarding processes ensure only legitimate organizations can create missions." },
            { icon: Eye, title: "Transparent Tracking", desc: "Follow your contribution from intent to delivery, just like a modern e-commerce order." },
            { icon: FileText, title: "Photographic Proof", desc: "Missions are only marked complete when photographic evidence is uploaded and verified." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-neki-charcoal/5"
            >
              <feature.icon className="w-6 h-6 text-neki-green mb-4" />
              <h3 className="text-xl font-bold text-neki-charcoal mb-2">{feature.title}</h3>
              <p className="text-neki-charcoal/60 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}