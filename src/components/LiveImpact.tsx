"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Counter({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export function LiveImpact() {
  return (
    <section className="py-32 bg-neki-orange text-white text-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">Real-time Impact.</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Every action creates a ripple. See the nationwide movement in numbers.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Missions Completed", num: 12500, suffix: "+" },
            { label: "Meals Delivered", num: 450000, suffix: "+" },
            { label: "Active Volunteers", num: 8400, suffix: "+" },
            { label: "Cities Covered", num: 42, suffix: "" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20"
            >
              <div className="text-4xl md:text-5xl font-bold font-heading mb-2">
                <Counter end={stat.num} suffix={stat.suffix} />
              </div>
              <div className="text-sm uppercase tracking-wider text-white/70 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}