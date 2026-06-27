"use client";

import React, { useRef } from "react";
import anime from "animejs";

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function PremiumButton({ children, variant = "primary", className = "", ...props }: PremiumButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    anime({
      targets: btnRef.current,
      scale: 1.02,
      boxShadow: variant === "primary" 
        ? "0px 10px 30px rgba(0,0,0,0.2)" 
        : "0px 10px 30px rgba(0,0,0,0.05)",
      duration: 600,
      easing: "cubicBezier(0.25, 1, 0.5, 1)",
    });

    if (arrowRef.current) {
      anime({
        targets: arrowRef.current,
        translateX: 4,
        duration: 400,
        easing: "cubicBezier(0.25, 1, 0.5, 1)",
      });
    }
  };

  const handleMouseLeave = () => {
    anime({
      targets: btnRef.current,
      scale: 1,
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 800,
      easing: "cubicBezier(0.25, 1, 0.5, 1)",
    });

    if (arrowRef.current) {
      anime({
        targets: arrowRef.current,
        translateX: 0,
        duration: 600,
        easing: "cubicBezier(0.25, 1, 0.5, 1)",
      });
    }
  };

  const handleMouseDown = () => {
    anime({
      targets: btnRef.current,
      scale: 0.98,
      duration: 200,
      easing: "cubicBezier(0.25, 1, 0.5, 1)",
    });
  };

  const handleMouseUp = () => {
    anime({
      targets: btnRef.current,
      scale: 1.02,
      duration: 400,
      easing: "cubicBezier(0.25, 1, 0.5, 1)",
    });
  };

  const baseClasses = "relative flex items-center justify-center rounded-full font-medium text-lg transition-colors";
  const primaryClasses = "bg-foreground text-background hover:bg-gray-800 px-8 py-4";
  const secondaryClasses = "bg-transparent border border-black/10 text-foreground hover:bg-black/5 px-8 py-4";

  return (
    <button
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`${baseClasses} ${variant === "primary" ? primaryClasses : secondaryClasses} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {variant === "secondary" && (
          <span ref={arrowRef} className="opacity-70">→</span>
        )}
      </span>
    </button>
  );
}
