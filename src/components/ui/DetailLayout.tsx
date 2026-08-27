"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DetailCanvas } from "./DetailCanvas";

interface DetailLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  shapeName: "logo" | "phone" | "book" | "shield" | "camera" | "network" | "path";
  shapeColor?: string;
}

export function DetailLayout({
  children,
  title,
  subtitle,
  shapeName,
  shapeColor,
}: DetailLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-neki-gold/30 selection:text-foreground">
      
      {/* 3D Visual Column - Fixed on Desktop, Hidden on Mobile */}
      <div className="hidden md:block fixed top-0 right-0 w-[40%] h-screen z-0 border-l border-black/5">
        <DetailCanvas shapeName={shapeName} color={shapeColor} />
      </div>

      {/* Main Content Column */}
      <div className="w-full md:w-[60%] min-h-screen relative z-10 p-6 md:p-12 lg:p-24 flex flex-col justify-between">
        <div className="max-w-2xl">
          {/* Top Navigation */}
          <nav className="mb-16">
            <Link 
              href="/" 
              className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Journey
            </Link>
          </nav>

          {/* Heading */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-lg md:text-xl font-light text-text-secondary leading-relaxed">
              {subtitle}
            </p>
          </header>

          {/* Page Body Content */}
          <article className="prose prose-neutral max-w-none space-y-10 text-foreground/80 font-light leading-relaxed">
            {children}
          </article>
        </div>

        {/* Footer info */}
        <footer className="mt-20 pt-8 border-t border-black/5 text-xs text-text-muted">
          © {new Date().getFullYear()} NEKI. Verified Trust & Impact Infrastructure.
        </footer>
      </div>
    </main>
  );
}
