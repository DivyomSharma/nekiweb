"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label?: string;
}

export function CustomSelect({ name, value, onChange, options, label }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold mb-1">
          {label}
        </label>
      )}

      {/* Hidden native input for Google Forms serialization */}
      <input type="hidden" name={name} value={value} />

      {/* Trigger Display box */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-sm text-foreground bg-transparent outline-none cursor-pointer text-left focus:text-neki-gold transition-colors"
      >
        <span className="truncate">{value}</span>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-neki-gold" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          data-lenis-prevent
          className="absolute top-[100%] left-0 w-full bg-background border border-black/10 rounded-xl shadow-xl z-50 mt-1 max-h-60 overflow-y-auto overflow-x-hidden selection:bg-transparent py-1"
        >
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs transition-all ${
                  isSelected 
                    ? "bg-neki-gold/10 text-neki-gold font-bold" 
                    : "text-text-secondary hover:bg-black/5 hover:text-foreground"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
