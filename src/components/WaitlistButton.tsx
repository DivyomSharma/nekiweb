"use client";

import React, { useState, useRef, useEffect } from "react";
import anime from "animejs";
import { X, Check } from "lucide-react";

export function WaitlistButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("Contributor");
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);

  const causesOptions = [
    "Food & Hunger",
    "Animal Welfare",
    "Education",
    "Healthcare",
    "Blood Donation",
    "Environmental Causes",
    "Disaster Relief",
  ];

  const toggleCause = (cause: string) => {
    if (selectedCauses.includes(cause)) {
      setSelectedCauses(selectedCauses.filter(c => c !== cause));
    } else {
      setSelectedCauses([...selectedCauses, cause]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      // Animate Modal Entrance
      anime({
        targets: modalOverlayRef.current,
        opacity: [0, 1],
        duration: 400,
        easing: "easeOutQuad",
      });

      anime({
        targets: modalContentRef.current,
        opacity: [0, 1],
        scale: [0.95, 1],
        translateY: [20, 0],
        duration: 500,
        easing: "cubicBezier(0.25, 1, 0.5, 1)",
      });
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleClose = () => {
    anime({
      targets: modalContentRef.current,
      opacity: [1, 0],
      scale: [1, 0.95],
      translateY: [0, 15],
      duration: 350,
      easing: "easeInQuad",
    });

    anime({
      targets: modalOverlayRef.current,
      opacity: [1, 0],
      duration: 400,
      easing: "easeInQuad",
      complete: () => {
        setIsOpen(false);
        setStep(1);
        setIsSubmitted(false);
        setSubmitting(false);
        setName("");
        setEmail("");
        setPhone("");
        setCity("");
        setRole("Contributor");
        setSelectedCauses([]);
      }
    });
  };

  const handleIframeLoad = () => {
    if (submitting) {
      setSubmitting(false);
      setIsSubmitted(true);
      
      // Animate Success State Entrance
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

  const handleSubmitAttempt = (e: React.FormEvent) => {
    setSubmitting(true);
    // The browser form element will target the hidden iframe and post standard attributes.
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 bg-foreground text-background px-6 py-3 rounded-full font-medium text-sm shadow-xl hover:bg-gray-800 transition-all hover:scale-105 pointer-events-auto"
      >
        Join <span className="text-neki-gold font-playfair italic font-bold">Neki</span> Waitlist
      </button>

      {/* Hidden Iframe for CORS-less background Google Forms Submission */}
      <iframe
        ref={iframeRef}
        name="hidden_iframe"
        id="hidden_iframe"
        style={{ display: "none" }}
        onLoad={handleIframeLoad}
      />

      {/* Modal Overlay */}
      {isOpen && (
        <div
          ref={modalOverlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 pointer-events-auto opacity-0"
        >
          {/* Modal Card */}
          <div
            ref={modalContentRef}
            className="relative bg-background border border-black/5 rounded-3xl w-full max-w-lg shadow-2xl p-8 md:p-10 overflow-hidden text-left"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors text-text-secondary"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form
                action="https://docs.google.com/forms/d/e/1FAIpQLSd0eHHv-8yy8Zu5WEaeFPpxXO9_TUnK9LK3hRmniKz-1r02_w/formResponse"
                method="POST"
                target="hidden_iframe"
                onSubmit={handleSubmitAttempt}
                className="space-y-6"
              >
                {/* Step 1: Info */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight mb-2">Be part of the movement.</h3>
                      <p className="text-sm text-text-secondary">Fill in your details to join the Neki waitlist.</p>
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
                      Next Step
                    </button>
                  </div>
                )}

                {/* Step 2: Preferences */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight mb-2">Almost there.</h3>
                      <p className="text-sm text-text-secondary">Help us tailor the experience for you.</p>
                    </div>

                    <div className="space-y-5">
                      {/* Join As (Dropdown) */}
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

                      {/* Causes (Multiple Selection) */}
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
                        {/* Hidden Inputs to post checked causes back to Google Forms */}
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
              // Success Screen
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
                <div className="success-icon w-16 h-16 bg-neki-green/15 text-neki-green rounded-full flex items-center justify-center scale-50 opacity-0">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">You're on the list!</h3>
                  <p className="text-sm text-text-secondary max-w-sm">
                    Thank you for applying. We will reach out to you with early access codes shortly.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="bg-foreground text-background px-8 py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
