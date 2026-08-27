"use client";

import React, { useState } from "react";
import { DetailLayout } from "@/components/ui/DetailLayout";
import { MapPin, User, Shield, CheckCircle, Package, Truck, ClipboardCheck } from "lucide-react";

interface TrackStep {
  id: number;
  label: string;
  desc: string;
  time: string;
  icon: any;
  volunteer?: string;
  location?: string;
  proofUrl?: string;
}

export default function TrackingPage() {
  const [activeStep, setActiveStep] = useState(3); // En Route

  const steps: TrackStep[] = [
    {
      id: 1,
      label: "Mission Created",
      desc: "NGO published request for 50 Winter Blankets in Noida.",
      time: "10:30 AM, 26 Aug 2026",
      icon: Package,
      location: "Gautam Buddha Nagar, Noida",
    },
    {
      id: 2,
      label: "Volunteer Assigned",
      desc: "Aman Verma accepted the pickup task.",
      time: "11:15 AM, 26 Aug 2026",
      icon: User,
      volunteer: "Aman Verma (Level 3 Responder)",
    },
    {
      id: 3,
      label: "Pickup Complete",
      desc: "Blankets collected from warehouse Hub 4.",
      time: "02:00 PM, 26 Aug 2026",
      icon: Truck,
      location: "Neki Hub 4, Okhla Phase 3",
    },
    {
      id: 4,
      label: "En Route to Destination",
      desc: "Volunteer is traveling to shelter home.",
      time: "Active Status",
      icon: MapPin,
      location: "En Route near Sector 62",
    },
    {
      id: 5,
      label: "Delivered",
      desc: "Package handed over to NGO shelter coordinator.",
      time: "Pending",
      icon: ClipboardCheck,
    },
    {
      id: 6,
      label: "Verified & Completed",
      desc: "Audit check completed. Acknowledgement receipt uploaded.",
      time: "Pending",
      icon: Shield,
    },
  ];

  return (
    <DetailLayout
      title="Live Mission Tracking"
      subtitle="Follow every step from contribution to final delivery. Our coordinate tracking layer makes the impact journey visible."
      shapeName="path"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Active Tracking: Mission #NEK78392</h2>
        <p className="text-sm">
          Think of this as Uber or Blinkit delivery tracking, but engineered for social impact. Click on any active step below to see live coordinator logs and status updates.
        </p>

        {/* Live Tracking Map Indicator */}
        <div className="bg-surface border border-black/5 p-6 rounded-2xl space-y-4 mt-6">
          <div className="flex justify-between items-center border-b border-black/5 pb-4">
            <div>
              <h4 className="text-xs uppercase font-bold tracking-widest text-text-muted">Target Mission</h4>
              <p className="text-base font-bold text-foreground font-heading">50 Winter Blankets for Noida Shelter</p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-neki-gold animate-ping" />
          </div>

          {/* Interactive Steps timeline */}
          <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-black/5">
            {steps.map((step) => {
              const Icon = step.icon;
              const isPast = step.id < activeStep;
              const isActive = step.id === activeStep;
              
              return (
                <div 
                  key={step.id} 
                  onClick={() => { if (step.id <= activeStep) setActiveStep(step.id); }}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isActive ? "translate-x-1" : ""
                  }`}
                >
                  {/* Timeline Dot Icon */}
                  <div className={`absolute -left-[24px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isPast ? "bg-neki-green/10 border-neki-green/30 text-neki-green" :
                    isActive ? "bg-neki-gold shadow-[0_0_12px_rgba(212,175,106,0.5)] border-neki-gold text-white" :
                    "bg-background border-black/10 text-text-muted"
                  }`}>
                    {isPast ? <CheckCircle className="w-3.5 h-3.5" /> : <Icon className="w-3 h-3" />}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className={`text-sm font-bold font-heading ${
                        isActive ? "text-foreground" : isPast ? "text-text-secondary" : "text-text-muted/50"
                      }`}>{step.label}</h4>
                      <span className="text-[10px] text-text-muted font-medium">{step.time}</span>
                    </div>
                    <p className={`text-xs ${
                      isActive ? "text-text-secondary" : isPast ? "text-text-muted" : "text-text-muted/40"
                    }`}>{step.desc}</p>

                    {/* Expandable Active info box */}
                    {isActive && (step.volunteer || step.location) && (
                      <div className="bg-background border border-black/5 p-3 rounded-lg text-[11px] mt-2 space-y-1 text-text-secondary">
                        {step.volunteer && <div><strong>Responder:</strong> {step.volunteer}</div>}
                        {step.location && <div><strong>Location:</strong> {step.location}</div>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-bold font-heading">Fulfillment Coordination Layer</h2>
        <p>
          Each coordinate update is logged by verified volunteers on the field. When an item enters a new status, it requires dual confirmations from both the delivering volunteer and the receiving NGO representative before it registers on the public ledger.
        </p>
      </section>
    </DetailLayout>
  );
}
