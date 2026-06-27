"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Package, BookOpen, Heart, Droplet, TreePine, BriefcaseMedical, 
  Snowflake, GraduationCap, Home, Gift, Sprout, Accessibility, 
  Stethoscope, Backpack, Lightbulb, Hexagon
} from "lucide-react";
import { useMouseMagnet } from "../hooks/useMouseMagnet";

function MagnetWrapper({ children, options }: { children: React.ReactNode, options?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  useMouseMagnet(ref, options);
  return <div ref={ref} className="h-full w-full flex items-center justify-center">{children}</div>;
}

const MISSIONS = [
  // Layer 1: Centerpiece
  { id: "m-main", title: "Feed 200 Cows", status: "Created", location: "Local", layer: 1, pos: { x: 50, y: 55 }, size: "large" },
  
  // Layer 2: Nearby Prominent
  { id: "m-1", title: "50 Winter Blankets", status: "", location: "Delhi • 14 Volunteers", layer: 2, pos: { x: 20, y: 35 }, size: "medium" },
  { id: "m-2", title: "First Aid Camp", status: "", location: "Mumbai • Med-Kit", layer: 2, pos: { x: 80, y: 40 }, size: "medium" },
  { id: "m-3", title: "Animal Shelter Setup", status: "", location: "Bangalore • Labour", layer: 2, pos: { x: 65, y: 80 }, size: "medium" },
  { id: "m-4", title: "100 School Kits", status: "", location: "Pune • Education", layer: 2, pos: { x: 25, y: 75 }, size: "medium" },
  { id: "m-5", title: "Village Water Drive", status: "", location: "Rajasthan • Water", layer: 2, pos: { x: 75, y: 65 }, size: "medium" },
  { id: "m-6", title: "Community Kitchen", status: "", location: "Chennai • Food", layer: 2, pos: { x: 15, y: 55 }, size: "medium" },
  
  // Layer 4: Background (Small, Blurred)
  { id: "m-7", title: "Blood Donation Camp", status: "", location: "Kolkata", layer: 4, pos: { x: 10, y: 15 }, size: "small" },
  { id: "m-8", title: "Senior Citizen Support", status: "", location: "Hyderabad", layer: 4, pos: { x: 90, y: 20 }, size: "small" },
  { id: "m-9", title: "Tree Plantation", status: "", location: "Goa", layer: 4, pos: { x: 85, y: 90 }, size: "small" },
  { id: "m-10", title: "Women Skill Workshop", status: "", location: "Surat", layer: 4, pos: { x: 10, y: 90 }, size: "small" },
  { id: "m-11", title: "Wheelchair Donation", status: "", location: "Noida", layer: 4, pos: { x: 45, y: 15 }, size: "small" },
  { id: "m-12", title: "Library Setup", status: "", location: "Kerala", layer: 4, pos: { x: 55, y: 95 }, size: "small" },
  { id: "m-13", title: "Disaster Relief Kit", status: "", location: "Assam", layer: 4, pos: { x: 5, y: 70 }, size: "small" },
  { id: "m-14", title: "Career Mentorship", status: "", location: "Online", layer: 4, pos: { x: 95, y: 70 }, size: "small" },
  { id: "m-15", title: "Rural Internet Access", status: "", location: "Bihar", layer: 4, pos: { x: 40, y: 25 }, size: "small" },
  { id: "m-16", title: "School Renovation", status: "", location: "Punjab", layer: 4, pos: { x: 70, y: 15 }, size: "small" },
  { id: "m-17", title: "Youth Mentorship", status: "", location: "Online", layer: 4, pos: { x: 30, y: 90 }, size: "small" },
  { id: "m-18", title: "Stray Animal Rescue", status: "", location: "Delhi", layer: 4, pos: { x: 80, y: 50 }, size: "small" },
];

const CAUSES = [
  // Layer 3: Floating Cause Objects (Icons)
  { id: "c-1", name: "Food Bowl", icon: Package, pos: { x: 35, y: 65 } },
  { id: "c-2", name: "Open Book", icon: BookOpen, pos: { x: 25, y: 45 } },
  { id: "c-3", name: "Heart", icon: Heart, pos: { x: 65, y: 30 } },
  { id: "c-4", name: "Water Drop", icon: Droplet, pos: { x: 80, y: 75 } },
  { id: "c-5", name: "Tree", icon: TreePine, pos: { x: 75, y: 90 } },
  { id: "c-6", name: "Medical Kit", icon: BriefcaseMedical, pos: { x: 85, y: 30 } },
  { id: "c-7", name: "Blanket", icon: Snowflake, pos: { x: 30, y: 20 } },
  { id: "c-8", name: "Graduation Cap", icon: GraduationCap, pos: { x: 15, y: 80 } },
  { id: "c-9", name: "Shelter", icon: Home, pos: { x: 55, y: 75 } },
  { id: "c-10", name: "Care Package", icon: Gift, pos: { x: 10, y: 35 } },
  { id: "c-11", name: "Sapling", icon: Sprout, pos: { x: 90, y: 80 } },
  { id: "c-12", name: "Wheelchair", icon: Accessibility, pos: { x: 55, y: 20 } },
  { id: "c-13", name: "Stethoscope", icon: Stethoscope, pos: { x: 95, y: 20 } },
  { id: "c-14", name: "School Bag", icon: Backpack, pos: { x: 25, y: 95 } },
  { id: "c-15", name: "Light Bulb", icon: Lightbulb, pos: { x: 45, y: 85 } }
];

const CONNECTIONS = [
  { from: "m-main", to: "c-1" },
  { from: "m-main", to: "c-3" },
  { from: "m-6", to: "c-1" },
  { from: "m-4", to: "c-2" },
  { from: "m-12", to: "c-2" },
  { from: "m-5", to: "c-4" },
  { from: "m-9", to: "c-5" },
  { from: "m-11", to: "c-12" },
  { from: "m-2", to: "c-6" },
  { from: "m-1", to: "c-7" },
  { from: "m-3", to: "c-9" },
  { from: "m-2", to: "c-3" },
];

export function MissionEcosystem() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Normalize mouse pos from -1 to 1 based on container
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        setMousePos({ x, y });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Determine if a line should be active
  const isConnectionActive = (from: string, to: string) => {
    if (!hoveredId) return false;
    return hoveredId === from || hoveredId === to || hoveredId === "m-main"; 
  };

  // Determine element opacity based on hover state
  const getElementOpacity = (id: string, layer: number) => {
    if (!hoveredId) return layer === 4 ? 0.3 : (layer === 2 ? 0.7 : 1);
    if (hoveredId === id) return 1;
    
    // Check if connected
    const isConnected = CONNECTIONS.some(
      c => (c.from === hoveredId && c.to === id) || (c.to === hoveredId && c.from === id)
    );
    if (isConnected) return 1;
    if (hoveredId === "m-main") return layer === 4 ? 0.2 : 0.6; // Spotlight main connections
    
    return 0.1; // Dim non-connected
  };

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
      
      {/* Subheadline & Text */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-50 pointer-events-auto w-full px-6 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-4 drop-shadow-md pointer-events-none">
          Every mission starts with a <span className="font-playfair italic text-neki-gold">simple decision.</span>
        </h2>
        <p className="text-lg text-text-secondary font-medium tracking-wide mb-8 pointer-events-none">
          Choose a cause. Start a mission. Create impact.
        </p>
        <Link href="/missions" className="group flex items-center text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
          Explore Missions <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* SVG Glowing Connections Overlay */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible" style={{ filter: "drop-shadow(0 0 8px rgba(212,175,106,0.5))" }}>
        {CONNECTIONS.map((conn, i) => {
          const fromEl = [...MISSIONS, ...CAUSES].find(e => e.id === conn.from);
          const toEl = [...MISSIONS, ...CAUSES].find(e => e.id === conn.to);
          if (!fromEl || !toEl) return null;
          
          const active = isConnectionActive(conn.from, conn.to);
          
          return (
            <path
              key={i}
              d={`M ${fromEl.pos.x}% ${fromEl.pos.y}% Q 50% 50% ${toEl.pos.x}% ${toEl.pos.y}%`}
              fill="none"
              stroke={active ? "#D4AF6A" : "rgba(0,0,0,0.03)"}
              strokeWidth={active ? 2 : 1}
              className="transition-all duration-700 ease-out"
              style={{ opacity: active ? 1 : (hoveredId ? 0 : 1) }}
            />
          );
        })}
      </svg>

      {/* RENDER MISSIONS */}
      {MISSIONS.map((mission) => {
        const isMain = mission.layer === 1;
        const depth = mission.layer === 4 ? 40 : (mission.layer === 2 ? 20 : 5);
        const parallaxX = -mousePos.x * depth;
        const parallaxY = -mousePos.y * depth;
        
        return (
          <motion.div
            key={mission.id}
            onMouseEnter={() => setHoveredId(mission.id)}
            onMouseLeave={() => setHoveredId(null)}
            animate={{ 
              x: parallaxX,
              y: parallaxY
            }}
            transition={{ 
              type: "spring", stiffness: 50, damping: 20
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer
              ${isMain ? 'z-40' : (mission.layer === 2 ? 'z-30' : 'z-0')}
            `}
            style={{ 
              left: `${mission.pos.x}%`, 
              top: `${mission.pos.y}%`,
            }}
          >
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
              className="transition-all duration-500 origin-center"
              style={{
                opacity: getElementOpacity(mission.id, mission.layer),
                filter: mission.layer === 4 ? "blur(3px)" : "none",
                transform: `scale(${isMain ? (hoveredId === mission.id ? 1.05 : 1) : (mission.size === 'small' ? 0.7 : 0.9)})`
              }}
            >
            {isMain ? (
              // MAIN FEATURED CARD
              <MagnetWrapper options={{ maxRotation: 5, maxTranslation: 8 }}>
                <div className="bg-white/90 backdrop-blur-xl border border-neki-gold/30 p-8 rounded-3xl text-center w-72 shadow-2xl shadow-neki-gold/20 hover:shadow-neki-gold/40 transition-shadow">
                  <Hexagon strokeWidth={1} className="w-12 h-12 text-neki-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-3">{mission.title}</h3>
                  <div className="bg-surface text-neki-gold py-1.5 px-4 rounded-full text-sm font-semibold tracking-wide border border-neki-gold/20 inline-block">{mission.status}</div>
                </div>
              </MagnetWrapper>
            ) : (
              // STANDARD MISSION CARDS
              <MagnetWrapper options={{ maxRotation: 3, maxTranslation: 4 }}>
                <div className="bg-white/70 backdrop-blur-md border border-black/5 p-4 rounded-xl text-center w-48 shadow-lg shadow-black/5 hover:bg-white/95 hover:shadow-xl transition-all">
                  <h3 className="text-sm font-bold text-foreground mb-1">{mission.title}</h3>
                  <div className="text-text-muted text-xs">{mission.location}</div>
                </div>
              </MagnetWrapper>
            )}
            </motion.div>
          </motion.div>
        );
      })}

      {/* RENDER CAUSE OBJECTS (Premium Glass Badges) */}
      {CAUSES.map((cause) => {
        const Icon = cause.icon;
        const depth = 30;
        const parallaxX = mousePos.x * depth; // Reverse parallax for depth feel
        const parallaxY = mousePos.y * depth;
        
        return (
          <motion.div
            key={cause.id}
            onMouseEnter={() => setHoveredId(cause.id)}
            onMouseLeave={() => setHoveredId(null)}
            animate={{ 
              x: parallaxX,
              y: parallaxY
            }}
            transition={{ 
              type: "spring", stiffness: 40, damping: 20
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            style={{ 
              left: `${cause.pos.x}%`, 
              top: `${cause.pos.y}%`,
            }}
          >
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
              className="origin-center transition-all duration-500"
              style={{ opacity: getElementOpacity(cause.id, 3) }}
            >
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs py-1 px-3 rounded-full whitespace-nowrap pointer-events-none">
              {cause.name}
            </div>
            
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-4 rounded-full shadow-lg shadow-black/5 group-hover:bg-white/80 group-hover:scale-110 group-hover:shadow-neki-gold/30 transition-all duration-300">
              <Icon strokeWidth={1.5} className="w-6 h-6 text-foreground group-hover:text-neki-gold transition-colors" />
            </div>
            </motion.div>
          </motion.div>
        );
      })}

    </div>
  );
}
