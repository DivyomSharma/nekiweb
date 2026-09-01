"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const NAMES = [
  "Rahul", "Priya", "Aarav", "Sneha", "Vikram", "Ananya", "Rohan", "Kavya",
  "Arjun", "Meera", "Siddharth", "Ishita", "Karan", "Neha", "Aditya", "Pooja",
  "Nikhil", "Riya", "Varun", "Sanjana", "Manoj", "Swara", "Gaurav", "Tanvi",
  "Suresh", "Divya", "Mohan", "Kriti", "Amit", "Sonia", "Raj", "Shreya",
  "Vijay", "Nidhi", "Ankur", "Preeti", "Deepak", "Anjali", "Sunil", "Rashmi",
  "Rohit", "Simran", "Pratik", "Meghana", "Abhishek", "Komal", "Tushar", "Saanvi",
];

const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Indore", "Nagpur",
  "Bhopal", "Patna", "Vadodara", "Coimbatore", "Chandigarh", "Kochi",
  "Noida", "Gurgaon",
];

const DOT_COLORS = ["bg-neki-green", "bg-neki-gold"];

function randItem<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

type Entry = { id: number; label: string; color: string };

let entrySeq = 0;
function makeEntry(): Entry {
  return {
    id: entrySeq++,
    label: `${randItem(NAMES)} · ${randItem(CITIES)}`,
    color: randItem(DOT_COLORS),
  };
}

function generateEntries(n: number) {
  return Array.from({ length: n }, () => makeEntry());
}

function AnimatedCounter({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 120, damping: 22, mass: 1 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("en-IN"));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className="tabular-nums">{display}</motion.span>;
}

export function WaitlistMarquee({ className = "" }: { className?: string }) {
  const [entries, setEntries] = useState<Entry[]>(() => generateEntries(22));
  const [count, setCount] = useState(1247);
  const [pulse, setPulse] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const id = setInterval(() => {
      const add = 1 + Math.floor(Math.random() * 4);
      setCount((c) => c + add);
      setEntries((prev) => {
        const next = prev.slice();
        const i = Math.floor(Math.random() * next.length);
        next[i] = makeEntry();
        return next;
      });
      setPulse(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setPulse(false), 700);
    }, 3500 + Math.random() * 4500);
    return () => {
      clearInterval(id);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const track = (
    <div className="flex items-center gap-3 px-5 py-3">
      {entries.map((e) => (
        <span
          key={e.id}
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/60 bg-white/40 backdrop-blur-md px-3.5 py-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${e.color}`} />
          <span className="text-sm font-medium text-foreground/80">{e.label}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`w-full md:w-[60%] border-b border-black/5 bg-[#FAF9F7]/70 backdrop-blur-lg ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes neki-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-neki-marquee { animation: neki-marquee 32s linear infinite; }
      ` }} />

      <div className="flex items-center justify-between px-6 py-3 border-b border-black/5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
          Live Waitlist Activity
        </span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-neki-green opacity-60 ${pulse ? "animate-ping" : ""}`} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neki-green" />
          </span>
          <span className="text-sm font-heading font-bold text-foreground">
            <AnimatedCounter value={count} />{" "}
            <span className="text-text-muted font-normal">people joined</span>
          </span>
        </span>
      </div>

      <div className="overflow-hidden">
        <div className="flex w-[200%] animate-neki-marquee">
          {track}
          {track}
        </div>
      </div>
    </div>
  );
}
