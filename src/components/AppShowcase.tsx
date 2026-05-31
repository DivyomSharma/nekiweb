"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AppShowcase() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <div className="text-neki-orange font-semibold tracking-wide uppercase text-sm mb-4">
              The NEKI App
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-neki-charcoal mb-6">
              Goodness, in your pocket.
            </h2>
            <p className="text-lg text-neki-charcoal/70 mb-8 max-w-lg mx-auto md:mx-0">
              Manage your missions, track your impact, and get notified about urgent needs near you. The whole movement, beautifully designed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-neki-charcoal text-white px-8 py-3 rounded-xl font-medium hover:bg-black transition-colors">
                Download for iOS
              </button>
              <button className="bg-neki-charcoal text-white px-8 py-3 rounded-xl font-medium hover:bg-black transition-colors">
                Download for Android
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative"
          >
            <div className="relative w-full max-w-[320px] mx-auto aspect-[1/2] rounded-[3rem] border-8 border-neki-charcoal shadow-2xl overflow-hidden">
              <Image
                src="/images/trust_transparency_1780254742120.png"
                alt="NEKI App Interface"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}