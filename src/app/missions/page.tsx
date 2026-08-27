"use client";

import React, { useState } from "react";
import { DetailLayout } from "@/components/ui/DetailLayout";
import { Package, Heart, BookOpen, Snowflake, BriefcaseMedical, Calendar } from "lucide-react";

interface MissionItem {
  id: string;
  title: string;
  category: string;
  location: string;
  volunteers: number;
  progressCurrent: number;
  progressTarget: number;
  unit: string;
  actionText: string;
}

export default function MissionsPage() {
  const [giveType, setGiveType] = useState<string | null>(null);
  const [submittedGive, setSubmittedGive] = useState(false);

  // Form states for Give Anything
  const [givePhoto, setGivePhoto] = useState("");
  const [giveQty, setGiveQty] = useState("");
  const [giveCondition, setGiveCondition] = useState("Good");

  const giveOptions = [
    { label: "Food", icon: Package },
    { label: "Books", icon: BookOpen },
    { label: "Clothes", icon: Snowflake },
    { label: "Medicine", icon: BriefcaseMedical },
    { label: "Time", icon: Calendar },
    { label: "Skills", icon: Heart },
  ];

  const missionList: MissionItem[] = [
    {
      id: "m-1",
      title: "Feed 200 Cows",
      category: "Animals",
      location: "South Delhi Gaushala, Delhi",
      volunteers: 14,
      progressCurrent: 4200,
      progressTarget: 6000,
      unit: "₹",
      actionText: "Help Now",
    },
    {
      id: "m-2",
      title: "50 Winter Blankets",
      category: "Relief",
      location: "Noida Sector 62, Delhi NCR",
      volunteers: 8,
      progressCurrent: 35,
      progressTarget: 50,
      unit: "Blankets",
      actionText: "Volunteer",
    },
    {
      id: "m-3",
      title: "First Aid Camp Setup",
      category: "Healthcare",
      location: "Dharavi, Mumbai",
      volunteers: 22,
      progressCurrent: 1,
      progressTarget: 1,
      unit: "Camp",
      actionText: "Offer Medical Aid",
    },
    {
      id: "m-4",
      title: "Career Mentorship Program",
      category: "Education",
      location: "Online / Remote",
      volunteers: 5,
      progressCurrent: 3,
      progressTarget: 10,
      unit: "Mentors",
      actionText: "Offer Skill",
    },
  ];

  const handleGiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedGive(true);
    setTimeout(() => {
      setGiveType(null);
      setSubmittedGive(false);
      setGiveQty("");
    }, 4000);
  };

  return (
    <DetailLayout
      title="Mission Marketplace"
      subtitle="Every mission starts with a simple choice. Choose a cause, start a mission, and see your impact live."
      shapeName="book"
    >
      {/* SECTION 1: GIVE ANYTHING CONCEPT */}
      <section className="space-y-4 border-b border-black/5 pb-10">
        <h2 className="text-2xl font-bold font-heading">What do you have to give?</h2>
        <p className="text-sm">
          Instead of looking for a generic NGO list, tell us what resource or skill you have available. Our matching coordination system locates active local needs instantly.
        </p>

        {!giveType ? (
          <div className="grid grid-cols-3 gap-3 pt-2">
            {giveOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.label}
                  onClick={() => setGiveType(opt.label)}
                  className="border border-black/5 hover:border-neki-gold/30 hover:bg-neki-gold/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all"
                >
                  <Icon className="w-5 h-5 text-text-muted" />
                  <span className="text-xs font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleGiveSubmit} className="bg-surface border border-black/5 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-sm">Giving: <span className="text-neki-gold font-bold">{giveType}</span></h4>
              <button 
                type="button" 
                onClick={() => setGiveType(null)} 
                className="text-xs text-text-secondary underline"
              >
                Change
              </button>
            </div>

            {submittedGive ? (
              <div className="py-4 text-center text-sm text-neki-green font-medium">
                ✓ Finding matches... 3 organizations in Delhi NCR currently need this. We've notified local volunteers!
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1">Quantity</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. 10 packs, 3 hrs"
                      value={giveQty}
                      onChange={(e) => setGiveQty(e.target.value)}
                      className="w-full bg-background border border-black/5 rounded-lg px-3 py-2 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1">Condition</label>
                    <select 
                      value={giveCondition}
                      onChange={(e) => setGiveCondition(e.target.value)}
                      className="w-full bg-background border border-black/5 rounded-lg px-3 py-2 text-xs outline-none cursor-pointer"
                    >
                      <option value="New">New / Unopened</option>
                      <option value="Good">Gently Used</option>
                      <option value="Needs Vetting">Requires Check</option>
                    </select>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-foreground text-background text-xs py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Locate Organizations In Need
                </button>
              </div>
            )}
          </form>
        )}
      </section>

      {/* SECTION 2: LIVING MISSION MARKETPLACE */}
      <section className="space-y-6 pt-6">
        <h2 className="text-2xl font-bold font-heading">Active Missions</h2>
        <div className="space-y-4">
          {missionList.map((mission) => {
            const pct = Math.round((mission.progressCurrent / mission.progressTarget) * 100);
            return (
              <div key={mission.id} className="border border-black/5 rounded-2xl p-5 space-y-4 hover:shadow-lg transition-shadow bg-background">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-surface text-neki-gold px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-neki-gold/20">
                      {mission.category}
                    </span>
                    <h3 className="text-lg font-bold font-heading mt-2">{mission.title}</h3>
                    <p className="text-xs text-text-muted">{mission.location}</p>
                  </div>
                  <span className="text-xs text-text-secondary font-medium">
                    {mission.volunteers} Volunteers
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-semibold text-text-secondary">
                    <span>Progress: {pct}%</span>
                    <span>{mission.progressCurrent} / {mission.progressTarget} {mission.unit}</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full bg-neki-gold" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-text-secondary">Mission ID: #{mission.id.toUpperCase()}</span>
                  <button className="bg-foreground text-background text-xs px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-all">
                    {mission.actionText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </DetailLayout>
  );
}
