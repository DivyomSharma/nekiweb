"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import anime from "animejs";
import { ArrowLeft, Check, Copy, Link as LinkIcon, Download, Share2 } from "lucide-react";
import { Neki } from "@/components/ui/Neki";

function WaitlistFormContent() {
  const searchParams = useSearchParams();
  const referredBy = searchParams.get("ref");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // --- FORM STATES ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("Individual");

  // Success Sharing
  const [copied, setCopied] = useState(false);
  const [refUrl, setRefUrl] = useState("");
  const [sharingSupport, setSharingSupport] = useState(false);

  const roleOptions = [
    { id: "Individual", label: "Individual", desc: "Donate items, money, resources, or your time." },
    { id: "Community / Organisation", label: "Community / Organisation", desc: "Register your group and connect with contributors." },
    { id: "Corporate / Institution", label: "Corporate / Institution", desc: "Turn your surplus into meaningful CSR impact." }
  ];

  useEffect(() => {
    if (isSubmitted) {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://neki.io";
      const code = encodeURIComponent(name.trim() || "member");
      setRefUrl(`${origin}/waitlist?ref=${code}`);
      
      // Check if navigator supports file sharing
      if (typeof navigator !== "undefined" && (navigator as any).share && (navigator as any).canShare) {
        setSharingSupport(true);
      }
    }
  }, [isSubmitted, name]);

  const handleCopy = () => {
    navigator.clipboard.writeText(refUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerConfetti = () => {
    const container = document.getElementById("confetti-container");
    if (!container) return;

    container.innerHTML = "";
    const colors = ["#C5A880", "#1A1A1A", "#8FA996", "#E8D8C8"];

    for (let i = 0; i < 80; i++) {
      const p = document.createElement("div");
      p.className = "absolute w-2 h-2 rounded-sm opacity-0 pointer-events-none";
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = `${10 + Math.random() * 80}%`;
      p.style.top = "40%";
      container.appendChild(p);

      const angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI / 2);
      const velocity = 100 + Math.random() * 200;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;

      anime({
        targets: p,
        translateX: [0, x],
        translateY: [0, y],
        rotate: [0, Math.random() * 1080],
        opacity: [1, 1, 0],
        scale: [1.2, 0.4],
        duration: 1500 + Math.random() * 1000,
        easing: "easeOutQuad",
        complete: () => p.remove()
      });
    }
  };

  const drawPassCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    // 1. Background Fill
    ctx.fillStyle = "#FAF9F7";
    ctx.fillRect(0, 0, 800, 500);

    // 2. Gold Border
    ctx.strokeStyle = "#C5A880";
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 760, 460);

    // Watermark circle
    ctx.strokeStyle = "rgba(197, 168, 128, 0.07)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(700, 420, 160, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Neki Branding Logo
    ctx.fillStyle = "#C5A880";
    ctx.font = "italic bold 42px Georgia, serif";
    ctx.fillText("Neki", 60, 95);

    // 4. Pass Badge (Top Right)
    ctx.fillStyle = "rgba(197, 168, 128, 0.12)";
    const badgeX = 540;
    const badgeY = 60;
    const badgeW = 200;
    const badgeH = 44;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 22) : ctx.rect(badgeX, badgeY, badgeW, badgeH);
    ctx.fill();

    ctx.fillStyle = "#C5A880";
    ctx.font = "bold 13px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("WAITLIST PASS", badgeX + badgeW / 2, badgeY + 27);

    // Reset align
    ctx.textAlign = "left";

    // 5. Member Name Section
    ctx.fillStyle = "#888888";
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.fillText("MEMBER NAME", 60, 195);

    ctx.fillStyle = "#1A1A1A";
    ctx.font = "extrabold 36px system-ui, sans-serif";
    ctx.fillText(name, 60, 245);

    // 6. Designation Section
    ctx.fillStyle = "#888888";
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.fillText("DESIGNATION / ROLE", 60, 315);

    ctx.fillStyle = "#1A1A1A";
    ctx.font = "bold 18px system-ui, sans-serif";
    ctx.fillText(role.toUpperCase(), 60, 350);

    // 7. Divider Line
    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 395);
    ctx.lineTo(740, 395);
    ctx.stroke();

    // 8. Entry Status (Bottom Left)
    ctx.fillStyle = "#888888";
    ctx.font = "bold 11px system-ui, sans-serif";
    ctx.fillText("ENTRY STATUS", 60, 430);

    ctx.fillStyle = "#10B981";
    ctx.font = "bold 14px system-ui, sans-serif";
    ctx.fillText("✓ VERIFIED ENTRY", 60, 455);

    // 9. Date Joined (Bottom Right)
    ctx.fillStyle = "#888888";
    ctx.font = "bold 11px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("DATE JOINED", 740, 430);

    ctx.fillStyle = "#555555";
    ctx.font = "14px monospace";
    const dateStr = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric", day: "2-digit" });
    ctx.fillText(dateStr, 740, 455);

    return canvas;
  };

  const downloadPassImage = () => {
    const canvas = drawPassCanvas();
    const dataUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = `neki_pass_${name.toLowerCase().replace(/\s+/g, "_")}.png`;
    downloadLink.href = dataUrl;
    downloadLink.click();
  };

  const handleSharePass = async () => {
    const canvas = drawPassCanvas();
    try {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;

      const file = new File([blob], `neki_pass_${name.toLowerCase().replace(/\s+/g, "_")}.png`, { type: "image/png" });

      if ((navigator as any).share && (navigator as any).canShare && (navigator as any).canShare({ files: [file] })) {
        await (navigator as any).share({
          files: [file],
          title: "Neki Waitlist Pass",
          text: `I just joined the waitlist for Neki – building the coordination layer for social impact! Join me using my referral link:\n\n${refUrl}`
        });
      } else {
        // Fallback for devices/browsers that don't support file sharing
        downloadPassImage();
        alert("Pass image downloaded! You can now upload it directly to your Story or status.");
      }
    } catch (err) {
      console.error("Error sharing file pass:", err);
      // Fallback
      downloadPassImage();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      "entry.660105051": name,
      "entry.1133362056": email,
      "entry.849609389": phone || "N/A",
      "entry.285819162": city,
      "entry.222711120": role
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          anime({
            targets: ".success-icon",
            scale: [0.5, 1.2, 1],
            opacity: [0, 1],
            duration: 600,
            easing: "easeOutElastic(1, .6)",
          });
          triggerConfetti();
        }, 100);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full md:w-[60%] min-h-screen relative z-10 p-6 md:p-12 lg:p-24 flex flex-col justify-between">
      {/* Confetti canvas simulation container */}
      <div id="confetti-container" className="absolute inset-0 pointer-events-none overflow-hidden z-50" />

      <div className="max-w-xl w-full mx-auto md:mx-0">
        
        {/* Back button */}
        <nav className="mb-10 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Journey
          </Link>
          
          {referredBy && (
            <span className="bg-neki-gold/10 border border-neki-gold/20 text-neki-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Referred by {decodeURIComponent(referredBy)}
            </span>
          )}
        </nav>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-2">
                Join the <span className="font-playfair italic text-neki-gold">Waitlist.</span>
              </h1>
              <p className="text-sm text-text-secondary">
                Apply for early access to the infrastructure for social impact.
              </p>
            </div>

            {/* Segmented / Card-based Role Selection */}
            <div className="space-y-3">
              <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">
                How would you like to be a part of <Neki />? *
              </label>
              
              <div className="flex flex-col gap-3">
                {roleOptions.map((opt) => {
                  const isSelected = role === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRole(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-1 ${
                        isSelected 
                          ? "bg-neki-gold/5 border-neki-gold/60 shadow-sm" 
                          : "border-black/5 hover:border-black/15 bg-background"
                      }`}
                    >
                      <p className={`text-sm font-bold ${isSelected ? "text-neki-gold" : "text-foreground"}`}>
                        {opt.label}
                      </p>
                      <p className="text-xs text-text-secondary leading-normal">
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input fields */}
            <div className="space-y-4 pt-2">
              <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">Full Name *</label>
                <input
                  type="text" required value={name}
                  onChange={(e) => setName(e.target.value)} placeholder="Rahul Sharma"
                  className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                />
              </div>

              <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">Email Address *</label>
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)} placeholder="rahul@example.com"
                  className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                />
              </div>

              <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">Phone Number</label>
                <input
                  type="tel" value={phone}
                  onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210"
                  className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                />
              </div>

              <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">City, State *</label>
                <input
                  type="text" required value={city}
                  onChange={(e) => setCity(e.target.value)} placeholder="New Delhi, Delhi"
                  className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                />
              </div>
            </div>

            <button
              type="submit" disabled={submitting || !name || !email || !city}
              className="w-full bg-foreground text-background py-4 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              {submitting ? "Joining..." : "Join Waitlist"}
            </button>
          </form>
        ) : (
          // Success screen (Visual Shareable Greeting Pass Card)
          <div className="flex flex-col items-center justify-center text-center py-4 space-y-6 md:items-start md:text-left">
            <div className="success-icon w-12 h-12 bg-neki-green/10 text-neki-green rounded-full flex items-center justify-center scale-50 opacity-0 relative mb-2">
              <Check className="w-5 h-5" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight leading-tight">
                You're <span className="text-neki-gold font-playfair italic font-medium">on the list!</span>
                <svg className="w-6 h-6 inline-block ml-2 align-middle text-neki-gold animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
                </svg>
              </h3>
              <p className="text-xs text-text-secondary max-w-sm leading-relaxed pt-1">
                Thank you for stepping forward. You've just joined the network shaping the coordinate layer for social impact.
              </p>
            </div>

            {/* Shareable Neki Pass Greeting Card Component */}
            <div className="w-full max-w-sm bg-gradient-to-br from-[#FAF9F7] to-[#FAF9F7]/95 border-2 border-neki-gold/30 rounded-3xl p-6 shadow-xl relative overflow-hidden text-left border-double">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full border border-neki-gold/10 pointer-events-none" />
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-neki-gold font-playfair italic font-bold text-xl">Neki</span>
                <span className="bg-neki-gold/10 border border-neki-gold/20 text-neki-gold text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  Waitlist Pass
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-1">MEMBER NAME</span>
                  <h4 className="text-xl font-heading font-extrabold text-foreground tracking-tight">{name}</h4>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-1">DESIGNATION / ROLE</span>
                  <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider">{role}</p>
                </div>

                <div className="border-t border-black/5 pt-4 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-0.5">STATUS</span>
                    <span className="text-neki-green text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neki-green animate-pulse" /> Verified Entry
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-0.5">DATE JOINED</span>
                    <span className="text-text-secondary text-[10px] font-mono">
                      {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Native Share Card to Instagram Story / Apps */}
            <div className="w-full max-w-sm flex flex-col gap-3">
              <button
                onClick={handleSharePass}
                className="w-full bg-foreground text-background hover:bg-gray-800 py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Share2 className="w-4 h-4 text-neki-gold" />
                Share Pass directly to Stories / Apps
              </button>

              <button
                onClick={downloadPassImage}
                className="w-full border border-neki-gold/30 hover:bg-neki-gold/5 text-foreground py-3 rounded-full font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-neki-gold" />
                Download Pass Image
              </button>
            </div>

            {/* Referral Link Copy Box */}
            <div className="w-full bg-[#FAF9F7]/60 border border-black/5 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
              <LinkIcon className="w-4 h-4 text-neki-gold shrink-0" />
              <span className="text-[10px] font-mono select-all truncate text-text-secondary flex-1 text-left">
                {refUrl}
              </span>
              <button 
                onClick={handleCopy}
                className="bg-foreground text-background hover:bg-gray-800 p-2.5 rounded-full transition-all flex items-center justify-center shrink-0 shadow-sm"
                aria-label="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-neki-green" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Social Share Group */}
            <div className="w-full space-y-3">
              <label className="block text-[9px] uppercase tracking-widest text-text-muted font-bold text-left w-full">Share Link</label>
              
              <div className="grid grid-cols-2 gap-3 w-full">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just joined the waitlist for Neki – building the coordination layer for social impact! Join me using my referral link:\n\n${refUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-black/5 text-foreground hover:bg-black/5 px-6 py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Share on X
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`I just joined the waitlist for Neki. Join me using my link: ${refUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-black/5 text-foreground hover:bg-black/5 px-6 py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 0 0-6.98-2.879C6.222 1.96 1.798 6.33 1.795 11.76c0 1.77.476 3.5 1.387 5.048l-.993 3.626 3.868-.98z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            <Link
              href="/"
              className="bg-foreground text-background px-8 py-3.5 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors pt-3 shadow-sm"
            >
              Back to Homepage
            </Link>
          </div>
        )}

      </div>

      {/* Footer info */}
      <footer className="mt-20 pt-8 border-t border-black/5 text-xs text-text-muted">
        © {new Date().getFullYear()} <Neki />. Verified Trust & Impact Infrastructure.
      </footer>
    </div>
  );
}

export function WaitlistFormClient() {
  return (
    <Suspense fallback={<div className="p-12 text-sm text-text-muted">Loading waitlist form...</div>}>
      <WaitlistFormContent />
    </Suspense>
  );
}
