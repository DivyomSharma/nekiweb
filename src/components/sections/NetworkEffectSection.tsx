"use client";

import React, { useRef, useEffect, useState } from "react";
import anime from "animejs";

export function NetworkEffectSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesGroupRef = useRef<SVGGElement>(null);
  const edgesGroupRef = useRef<SVGGElement>(null);
  
  const [nodeCount, setNodeCount] = useState(1);

  useEffect(() => {
    if (!containerRef.current || !nodesGroupRef.current || !edgesGroupRef.current) return;

    // We animate the appearance of nodes. We generate say 100 nodes.
    const nodes = Array.from(nodesGroupRef.current.children);
    const edges = Array.from(edgesGroupRef.current.children);

    // Initial state: hide everything except the center node
    anime.set(nodes.slice(1), { opacity: 0, scale: 0 });
    anime.set(edges, { strokeDashoffset: anime.setDashoffset, opacity: 0 });

    const tl = anime.timeline({
      easing: 'cubicBezier(0.25, 1, 0.5, 1)',
      loop: true,
      direction: 'alternate',
    });

    // Animate edges drawing
    tl.add({
      targets: edges,
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 0.2],
      duration: 3000,
      delay: anime.stagger(20, { start: 500 }),
    });

    // Animate nodes popping in
    tl.add({
      targets: nodes.slice(1),
      opacity: [0, 1],
      scale: [0, 1],
      duration: 2000,
      delay: anime.stagger(30),
      update: function(anim) {
        // Update the counter based on progress
        const currentCount = Math.floor(1 + (nodes.length - 1) * anim.progress / 100);
        if (anim.progress % 2 === 0) setNodeCount(currentCount); // throttle updates
      }
    }, "-=2500");

    return () => {
      anime.remove([nodes, edges]);
    };
  }, []);

  // Generate deterministic node positions
  const generateNodes = () => {
    const nodes = [];
    const edges = [];
    nodes.push({ id: 0, x: 200, y: 200, isCenter: true, r: 4 });

    for (let i = 1; i < 150; i++) {
      const angle = (i * 137.5) * (Math.PI / 180); // Golden angle
      const radius = 10 + Math.sqrt(i) * 12;
      const x = 200 + Math.cos(angle) * radius;
      const y = 200 + Math.sin(angle) * radius;
      const r = Math.random() * 1.5 + 0.5;
      nodes.push({ id: i, x, y, isCenter: false, r });

      // Connect to a previous node (to form a tree-like network)
      const parentId = Math.floor(i / 2); // Simple binary-ish tree
      edges.push({ id: i, x1: nodes[parentId].x, y1: nodes[parentId].y, x2: x, y2: y });
    }
    return { nodes, edges };
  };

  const { nodes, edges } = generateNodes();

  return (
    <div ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center p-6 text-center">
      
      <div className="relative w-full max-w-2xl aspect-square mb-8">
        {/* The Network Graph SVG */}
        <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">
          <g ref={edgesGroupRef}>
            {edges.map((edge) => (
              <line key={edge.id} x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} stroke="#D4AF37" strokeWidth="0.5" />
            ))}
          </g>
          <g ref={nodesGroupRef}>
            {nodes.map((node) => (
              <circle 
                key={node.id} 
                cx={node.x} 
                cy={node.y} 
                r={node.r} 
                fill={node.isCenter ? "#D4AF37" : "#050505"}
                className={node.isCenter ? "shadow-[0_0_15px_rgba(212,175,106,1)]" : "opacity-40"}
              />
            ))}
          </g>
        </svg>

        {/* Counter Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-black/5 shadow-xl shadow-black/5 flex items-center gap-4">
            <span className="text-xl font-bold">{nodeCount === 0 ? 1 : nodeCount}</span>
            <span className="text-text-muted text-sm uppercase tracking-widest">Impacts</span>
          </div>
        </div>
      </div>

      <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight mb-4 max-w-4xl">
        When millions move together, <br/><span className="font-playfair italic text-neki-gold">impossible</span> becomes routine.
      </h2>
    </div>
  );
}
