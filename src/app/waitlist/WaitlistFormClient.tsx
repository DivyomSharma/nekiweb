"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import anime from "animejs";
import { ArrowLeft, Check, Copy, Share2 } from "lucide-react";
import { DetailCanvas } from "@/components/ui/DetailCanvas";

function WaitlistFormContent() {
  const searchParams = useSearchParams();
  const referredBy = searchParams.get("ref");

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("Contributor");
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [refUrl, setRefUrl] = useState("");

  const causesOptions = [
    "Food & Hunger",
    "Animal Welfare",
    "Education",
    "Healthcare",
    "Blood Donation",
    "Environmental Causes",
    "Disaster Relief",
  ];

  useEffect(() => {
    if (isSubmitted) {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://neki.io";
      const code = encodeURIComponent(name.trim() || "member");
      setRefUrl(`${origin}/waitlist?ref=${code}`);
    }
  }, [isSubmitted, name]);

  const toggleCause = (cause: string) => {
    if (selectedCauses.includes(cause)) {
      setSelectedCauses(selectedCauses.filter(c => c !== cause));
    } else {
      setSelectedCauses([...selectedCauses, cause]);
    }
  };

  const handleIframeLoad = () => {
    if (submitting) {
      setSubmitting(false);
      setIsSubmitted(true);
      
      // Success checkmark animation
      setTimeout(() => {
        anime({
          targets: ".success-icon",
          scale: [0.5, 1.2, 1],
          opacity: [0, 1],
          duration: 600,
          easing: "easeOutElastic(1, .6)",
        });
      }, 100);
    }
  };

  const handleSubmitAttempt = () => {
    setSubmitting(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full md:w-[60%] min-h-screen relative z-10 p-6 md:p-12 lg:p-24 flex flex-col justify-between">
      {/* Hidden Iframe for CORS-less Google Forms Submit */}
      <iframe
        ref={iframeRef}
        name="waitlist_iframe"
        id="waitlist_iframe"
        style={{ display: "none" }}
        onLoad={handleIframeLoad}
      />

      <div className="max-w-md w-full mx-auto md:mx-0">
        
        {/* Back button */}
        <nav className="mb-12 flex items-center justify-between">
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
          <form
            action="https://docs.google.com/forms/d/e/1FAIpQLSd0eHHv-8yy8Zu5WEaeFPpxXO9_TUnK9LK3hRmniKz-1r02_w/formResponse"
            method="POST"
            target="waitlist_iframe"
            onSubmit={handleSubmitAttempt}
            className="space-y-8"
          >
            {/* Step 1: Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-3">
                    Join the <span className="font-playfair italic text-neki-gold">Waitlist.</span>
                  </h1>
                  <p className="text-sm text-text-secondary">
                    Apply for early access to the infrastructure for social impact.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                    <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">Full Name</label>
                    <input
                      type="text"
                      required
                      name="entry.660105051"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rahul Sharma"
                      className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                    />
                  </div>

                  <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                    <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      name="entry.1133362056"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                    />
                  </div>

                  <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                    <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">Phone Number</label>
                    <input
                      type="tel"
                      required
                      name="entry.849609389"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                    />
                  </div>

                  <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                    <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">City, State</label>
                    <input
                      type="text"
                      required
                      name="entry.285819162"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="New Delhi, Delhi"
                      className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!name || !email || !phone || !city}
                  onClick={() => setStep(2)}
                  className="w-full bg-foreground text-background py-4 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Preferences */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-3">
                    Preferences.
                  </h1>
                  <p className="text-sm text-text-secondary">
                    Help us customize the platform coordination for you.
                    {referredBy && ` You were referred by ${decodeURIComponent(referredBy)}.`}
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                    <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold mb-1">I want to join as</label>
                    <select
                      name="entry.222711120"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm cursor-pointer"
                    >
                      <option value="Contributor">Contributor (Donor)</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="NGO / Non-Profit">NGO / Non-Profit</option>
                      <option value="School">School / College</option>
                      <option value="Corporate / CSR Team">Corporate / CSR Team</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold mb-3">Causes that matter to you</label>
                    <div className="flex flex-wrap gap-2">
                      {causesOptions.map((cause) => {
                        const selected = selectedCauses.includes(cause);
                        return (
                          <button
                            type="button"
                            key={cause}
                            onClick={() => toggleCause(cause)}
                            className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
                              selected
                                ? "bg-neki-gold/15 border-neki-gold text-neki-gold"
                                : "border-black/10 hover:border-black/25 text-foreground"
                            }`}
                          >
                            {cause}
                          </button>
                        );
                      })}
                    </div>
                    {selectedCauses.map((cause) => (
                      <input
                        key={cause}
                        type="hidden"
                        name="entry.553781524"
                        value={cause}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-transparent border border-black/10 text-foreground py-4 rounded-full font-medium text-sm hover:bg-black/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-2/3 bg-foreground text-background py-4 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : (
          // Success screen with referral sharing
          <div className="flex flex-col items-center justify-center text-center py-6 space-y-6 md:items-start md:text-left">
            <div className="success-icon w-14 h-14 bg-neki-green/15 text-neki-green rounded-full flex items-center justify-center scale-50 opacity-0">
              <Check className="w-7 h-7" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-3xl font-heading font-bold tracking-tight">You're on the list.</h3>
              <p className="text-xs text-text-secondary max-w-sm">
                Thank you for applying. Share your referral link below to invite others to join the coordinate network!
              </p>
            </div>

            {/* Referral Link Copy Box */}
            <div className="w-full bg-surface border border-black/5 p-4 rounded-2xl flex items-center justify-between gap-3">
              <span className="text-[10px] font-mono select-all truncate text-text-secondary flex-1 text-left">
                {refUrl}
              </span>
              <button 
                onClick={handleCopy}
                className="bg-foreground text-background hover:bg-gray-800 p-2 rounded-xl transition-all flex items-center justify-center shrink-0"
                aria-label="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-neki-green" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Social Share Group */}
            <div className="w-full space-y-3">
              <label className="block text-[9px] uppercase tracking-widest text-text-muted font-bold">Share to your network</label>
              
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just joined the waitlist for NEKI – building the coordination layer for social impact! Join me using my referral link:\n\n${refUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-black/5 text-foreground hover:bg-black/5 px-4 py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share on X
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`I just joined the waitlist for NEKI. Join me using my link: ${refUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-black/5 text-foreground hover:bg-black/5 px-4 py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>

            <Link
              href="/"
              className="bg-foreground text-background px-8 py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors pt-3"
            >
              Back to Homepage
            </Link>
          </div>
        )}

      </div>

      {/* Footer info */}
      <footer className="mt-20 pt-8 border-t border-black/5 text-xs text-text-muted">
        © {new Date().getFullYear()} NEKI. Verified Trust & Impact Infrastructure.
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
