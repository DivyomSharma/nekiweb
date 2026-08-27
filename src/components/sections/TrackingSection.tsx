"use client";

import React, { useRef, useEffect } from "react";
import anime from "animejs";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useMouseMagnet } from "../../hooks/useMouseMagnet";

export function TrackingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Apply subtle mouse magnet effect to the tracking card
  useMouseMagnet(cardRef, { maxRotation: 3, maxTranslation: 5 });

  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;

    // Entrance Animation (Intersection Observer style can be added, but for now we'll do continuous/looping animations for the SVG)
    
    const pathLength = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${pathLength} ${pathLength}`;
    pathRef.current.style.strokeDashoffset = `${pathLength}`;

    // Path draw animation
    anime({
      targets: pathRef.current,
      strokeDashoffset: [pathLength, 0],
      easing: 'easeInOutSine',
      duration: 3000,
      direction: 'alternate',
      loop: true
    });

    // Pulse moving along path
    // We animate a value from 0 to 1 and update the circle's position
    const pulseAnim = { progress: 0 };
    anime({
      targets: pulseAnim,
      progress: 1,
      easing: 'easeInOutSine',
      duration: 3000,
      direction: 'alternate',
      loop: true,
      update: function() {
        if (!pathRef.current || !pulseRef.current) return;
        const pt = pathRef.current.getPointAtLength(pulseAnim.progress * pathLength);
        pulseRef.current.setAttribute('cx', pt.x.toString());
        pulseRef.current.setAttribute('cy', pt.y.toString());
      }
    });

    // Node pulsing
    if (nodesRef.current) {
      anime({
        targets: nodesRef.current.children,
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: anime.stagger(1000, { start: 500 }),
        loop: true
      });
    }

  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex flex-col items-start justify-center pl-6 pr-4 md:pl-[15%] pointer-events-auto max-w-[62%] md:max-w-none text-left">
      <h2 ref={headerRef} className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-4">
        Follow <span className="font-playfair italic">every step.</span>
      </h2>
      <p ref={pRef} className="text-xs xs:text-sm md:text-lg text-text-secondary mb-6 md:mb-8 font-light">From contribution to completion. Nothing disappears.</p>
      
      <div 
        ref={cardRef}
        className="bg-white/60 backdrop-blur-2xl border border-black/5 p-4 md:p-6 rounded-2xl md:rounded-3xl w-full max-w-[240px] xs:max-w-sm relative shadow-xl shadow-black/5 mb-6 md:mb-8"
      >
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <span className="text-foreground text-[10px] md:text-xs font-bold tracking-widest uppercase">Live Tracking</span>
          <MapPin className="text-neki-gold w-3.5 h-3.5 md:w-4 md:h-4" />
        </div>
        
        {/* SVG Route Visualization */}
        <div className="relative w-full h-24 md:h-32 mb-4 md:mb-6 bg-gray-50/50 rounded-xl overflow-hidden border border-black/5 flex items-center justify-center">
          <svg width="160" height="60" viewBox="0 0 200 80" className="opacity-80 scale-90 md:scale-100">
            {/* Background path */}
            <path d="M 20 40 Q 60 10, 100 40 T 180 40" fill="none" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round" />
            {/* Animated drawing path */}
            <path ref={pathRef} d="M 20 40 Q 60 10, 100 40 T 180 40" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
            {/* Traveling Pulse */}
            <circle ref={pulseRef as React.RefObject<SVGCircleElement>} cx="20" cy="40" r="4" fill="#D4AF37" className="shadow-[0_0_10px_rgba(212,175,106,0.8)]" />
          </svg>
          
          {/* Nodes */}
          <div ref={nodesRef} className="absolute inset-0 pointer-events-none flex items-center">
            {/* Start Node */}
            <div className="absolute left-[calc(50%-64px)] md:left-[calc(50%-80px)] top-[calc(50%-4px)] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black/20" />
            {/* Mid Node */}
            <div className="absolute left-[calc(50%)] top-[calc(50%-4px)] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black/20" />
            {/* End Node */}
            <div className="absolute left-[calc(50%+64px)] md:left-[calc(50%+80px)] top-[calc(50%-4px)] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black/20" />
          </div>
        </div>

        <div className="space-y-2 md:space-y-4 font-medium text-xs">
          <div className="flex items-center gap-3 text-text-muted"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black/10" /> Mission Created</div>
          <div className="flex items-center gap-3 text-text-muted"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black/10" /> Volunteer Assigned</div>
          <div className="flex items-center gap-3 text-foreground"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-neki-gold shadow-[0_0_8px_rgba(212,175,106,0.6)]" /> En Route</div>
          <div className="flex items-center gap-3 text-text-muted/40"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-black/10" /> Delivered</div>
        </div>
      </div>
      
      <Link ref={linkRef} href="/tracking" className="group flex items-center text-[10px] xs:text-xs md:text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors">
        See Mission Tracking <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
  );
}
