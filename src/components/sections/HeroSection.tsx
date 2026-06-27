"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import Link from "next/link";
import { PremiumButton } from "../ui/PremiumButton";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initial entrance animation
    const tl = anime.timeline({
      easing: "cubicBezier(0.25, 1, 0.5, 1)", // Soft, heavy easing
    });

    if (headlineRef.current) {
      // Simple line-by-line reveal simulation by targeting the spans if they exist, 
      // or just fading the whole headline if not broken into spans.
      // For this, we'll fade the entire headline block smoothly.
      tl.add({
        targets: headlineRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: 500, // wait for background/butterfly to settle
      });
    }

    if (subheadRef.current) {
      tl.add({
        targets: subheadRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 1000,
      }, "-=800");
    }

    if (descRef.current) {
      tl.add({
        targets: descRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 1000,
      }, "-=800");
    }

    if (buttonsRef.current && buttonsRef.current.children) {
      tl.add({
        targets: buttonsRef.current.children,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(150),
      }, "-=600");
    }

    if (footerRef.current) {
      tl.add({
        targets: footerRef.current,
        opacity: [0, 1],
        duration: 1000,
      }, "-=400");
    }

    return () => {
      anime.remove([
        headlineRef.current, 
        subheadRef.current, 
        descRef.current, 
        buttonsRef.current?.children, 
        footerRef.current
      ]);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex flex-col justify-center p-6 md:pl-[10%] text-left relative">
      <div className="max-w-xl z-10 pointer-events-none">
        <h1 
          ref={headlineRef} 
          className="text-6xl md:text-8xl font-heading font-extrabold text-foreground tracking-tight mb-4 opacity-0"
        >
          Humanity, <br/><span className="text-neki-gold font-playfair italic">Delivered.</span>
        </h1>
        
        <p 
          ref={subheadRef}
          className="text-xl md:text-2xl text-text-secondary font-medium mb-6 opacity-0"
        >
          The future of helping is visible.
        </p>
        
        <p 
          ref={descRef}
          className="text-lg text-text-muted mb-12 font-light opacity-0"
        >
          Track every contribution.<br/>
          Verify every mission.<br/>
          See every impact.
        </p>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pointer-events-auto items-center opacity-0">
          <PremiumButton variant="primary">Start a Mission</PremiumButton>
          <PremiumButton variant="secondary">Explore Missions</PremiumButton>
        </div>
        
        <button 
          ref={footerRef}
          className="mt-6 text-sm text-text-muted hover:text-foreground font-medium transition-colors pointer-events-auto underline underline-offset-4 opacity-0"
        >
          For NGOs, institutions and communities →
        </button>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-bold tracking-widest text-text-muted uppercase">
        Scroll to follow the journey
      </div>
    </div>
  );
}
