"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeartHandshake, Repeat, Utensils, BookOpen, Dog, Building2 } from "lucide-react";

const contributorWays = [
  { icon: Utensils, title: "Donate Food", desc: "Support local shelters and community kitchens." },
  { icon: Repeat, title: "Recurring Seva", desc: "Make helping a habit with monthly contributions." },
  { icon: Dog, title: "Animal Care", desc: "Provide feed and medical support for strays." },
  { icon: BookOpen, title: "Sponsor Education", desc: "Fund rural drives and educational kits." },
  { icon: HeartHandshake, title: "Community Drives", desc: "Join blanket drives and festive givings." },
  { icon: Building2, title: "Support Shelters", desc: "Help maintain safe spaces for the vulnerable." },
];

export function Contributor() {
  return (
    <section className="py-32 bg-neki-cream overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 w-full max-w-2xl relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/community_missions_1780254713986.png"
              alt="Community Missions and Distributions"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neki-charcoal/80 to-transparent flex items-end p-8">
              <h3 className="text-white text-2xl font-semibold">Community in Action</h3>
            </div>
          </motion.div>

          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="text-neki-orange font-semibold tracking-wide uppercase text-sm mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-neki-orange rounded-full" />
                For Contributors & Families
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-neki-charcoal mb-6">
                Small actions. <br/>
                <span className="text-neki-orange">Real impact.</span>
              </h2>
              <p className="text-lg text-neki-charcoal/70 leading-relaxed max-w-lg">
                Whether it's a one-time donation or a recurring seva, your contribution directly empowers verified missions on the ground.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contributorWays.map((way, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-neki-charcoal/5 hover:border-neki-green/30 transition-colors group cursor-pointer"
                >
                  <div className="bg-neki-cream p-3 rounded-xl text-neki-orange group-hover:text-neki-green group-hover:bg-neki-green/10 transition-colors">
                    <way.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neki-charcoal mb-1">{way.title}</h4>
                    <p className="text-sm text-neki-charcoal/60">{way.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}