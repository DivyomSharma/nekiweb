"use client";

import { useEffect, useState } from "react";

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

function randItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEntries(n: number) {
  const arr: string[] = [];
  for (let i = 0; i < n; i++) arr.push(`${randItem(NAMES)} · ${randItem(CITIES)}`);
  return arr;
}

export function WaitlistMarquee({ className = "" }: { className?: string }) {
  const [entries, setEntries] = useState<string[]>(() => generateEntries(22));
  const [count, setCount] = useState(1247);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const add = 1 + Math.floor(Math.random() * 4);
      setCount((c) => c + add);
      setEntries((prev) => {
        const next = prev.slice();
        const i = Math.floor(Math.random() * next.length);
        next[i] = `${randItem(NAMES)} · ${randItem(CITIES)}`;
        return next;
      });
      setPulse(true);
      setTimeout(() => setPulse(false), 700);
    }, 3500 + Math.random() * 4500);
    return () => clearInterval(id);
  }, []);

  const track = (
    <div className="flex items-center gap-6 px-5 py-2.5">
      {entries.map((e, i) => (
        <span key={i} className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-neki-green" />
          <span className="text-sm font-medium text-foreground/80">{e}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`w-full md:w-[60%] border-b border-black/5 bg-[#FAF9F7]/80 backdrop-blur-md ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes neki-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-neki-marquee { animation: neki-marquee 30s linear infinite; }
      ` }} />

      <div className="flex items-center justify-between px-6 py-3 border-b border-black/5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
          Live Waitlist Activity
        </span>
        <span className="flex items-center gap-2">
          <span className={`relative flex h-2.5 w-2.5`}>
            <span className={`absolute inline-flex h-full w-full rounded-full bg-neki-green opacity-60 ${pulse ? "animate-ping" : ""}`} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neki-green" />
          </span>
          <span className="text-sm font-heading font-bold text-foreground">
            {count.toLocaleString()}{" "}
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