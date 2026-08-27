"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import anime from "animejs";
import { ArrowLeft, Check, Copy, Share2, ChevronRight, ChevronLeft } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";

function WaitlistFormContent() {
  const searchParams = useSearchParams();
  const referredBy = searchParams.get("ref");

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // --- FORM STATES ---
  // Step 1: General Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  // Step 2: Role
  const [role, setRole] = useState("Contributor");

  // Step 2A: Volunteer specific
  const [volunteerInterests, setVolunteerInterests] = useState<string[]>([]);
  const [timeCommitment, setTimeCommitment] = useState("1–2 hrs/week");

  // Step 2B: Organization specific
  const [orgName, setOrgName] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgType, setOrgType] = useState("NGO");
  const [orgInterests, setOrgInterests] = useState<string[]>([]);

  // Step 3: Contribution
  const [contributionPreferences, setContributionPreferences] = useState<string[]>([]);
  const [contributionFrequency, setContributionFrequency] = useState("Occasionally");
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);

  // Step 4: Product / Feedback
  const [impactImportance, setImpactImportance] = useState("10"); // Scale 1-10
  const [featureGPS, setFeatureGPS] = useState("Very Valuable");
  const [featureProfiles, setFeatureProfiles] = useState("Very Valuable");
  const [featureLedger, setFeatureLedger] = useState("Very Valuable");
  const [featureP2P, setFeatureP2P] = useState("Very Valuable");

  // Success Sharing
  const [copied, setCopied] = useState(false);
  const [refUrl, setRefUrl] = useState("");

  const roleOptions = [
    "Contributor", "Volunteer", "NGO / Non-Profit", "School", "College",
    "Corporate / CSR Team", "Community Group", "Shelter / Gaushala",
    "Hospital / Medical Organization", "Other"
  ];

  const causesOptions = [
    "Food & Hunger", "Animal Welfare", "Education", "Healthcare",
    "Blood Donation", "Environmental Causes", "Women Empowerment",
    "Skill Development", "Elderly Care", "Disaster Relief",
    "Community Development", "Water Access", "Mental Health", "Child Welfare"
  ];

  const contributionTypeOptions = [
    "Money", "Food", "Clothes", "Books", "Medicine", "Skills", "Time", "Resources", "Sponsorship"
  ];

  const volunteerInterestOptions = [
    "Mission Execution", "Food Distribution", "Education", "Healthcare Support",
    "Animal Welfare", "Community Events", "Disaster Relief", "Skill-Based Volunteering"
  ];

  const orgInterestOptions = [
    "Creating Missions", "Receiving Support", "Volunteer Coordination",
    "CSR Programs", "Campus Initiatives", "Community Campaigns"
  ];

  const isOrgRole = ["NGO / Non-Profit", "School", "College", "Corporate / CSR Team", "Shelter / Gaushala", "Hospital / Medical Organization"].includes(role);
  const isVolunteerRole = role === "Volunteer";

  useEffect(() => {
    if (isSubmitted) {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://neki.io";
      const code = encodeURIComponent(name.trim() || "member");
      setRefUrl(`${origin}/waitlist?ref=${code}`);
    }
  }, [isSubmitted, name]);

  const toggleSelection = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleIframeLoad = () => {
    if (submitting) {
      setSubmitting(false);
      setIsSubmitted(true);
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

  const determineNextStep = () => {
    if (step === 2) {
      if (isVolunteerRole) return 21; // Step 2A (Volunteer options)
      if (isOrgRole) return 22; // Step 2B (Org options)
      return 3;
    }
    if (step === 21 || step === 22) return 3;
    return step + 1;
  };

  const determinePrevStep = () => {
    if (step === 3) {
      if (isVolunteerRole) return 21;
      if (isOrgRole) return 22;
      return 2;
    }
    if (step === 21 || step === 22) return 2;
    return step - 1;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full md:w-[60%] min-h-screen relative z-10 p-6 md:p-12 lg:p-24 flex flex-col justify-between">
      <iframe
        ref={iframeRef}
        name="waitlist_iframe"
        id="waitlist_iframe"
        style={{ display: "none" }}
        onLoad={handleIframeLoad}
      />

      <div className="max-w-xl w-full mx-auto md:mx-0">
        
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
            onSubmit={() => setSubmitting(true)}
            className="space-y-8"
          >
            {/* --- BACKEND FALLBACK HIDDEN FIELD INJECTIONS --- */}
            {/* Step 5 questions removed from UI - Google Forms requires values */}
            <input type="hidden" name="entry.1197797153" value="N/A" />
            <input type="hidden" name="entry.1188271775" value="N/A" />
            <input type="hidden" name="entry.1667554094" value="Yes, I'd love early access" />

            {/* Conditional Role Fallbacks if role is not active */}
            {!isVolunteerRole && (
              <>
                <input type="hidden" name="entry.1451990690" value="N/A" />
                <input type="hidden" name="entry.1134721925" value="N/A" />
              </>
            )}

            {!isOrgRole && (
              <>
                <input type="hidden" name="entry.1535691708" value="N/A" />
                <input type="hidden" name="entry.1799090949" value="https://neki.io" />
                <input type="hidden" name="entry.308378145" value="Other" />
                <input type="hidden" name="entry.489114980" value="N/A" />
              </>
            )}

            {/* STEP 1: GENERAL INFO */}
            <div className={step === 1 ? "space-y-6" : "hidden"}>
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
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">Full Name *</label>
                  <input
                    type="text" name="entry.660105051" value={name}
                    onChange={(e) => setName(e.target.value)} placeholder="Rahul Sharma"
                    className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                  />
                </div>

                <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">Email Address *</label>
                  <input
                    type="email" name="entry.1133362056" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="rahul@example.com"
                    className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                  />
                </div>

                <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">Phone Number *</label>
                  <input
                    type="tel" name="entry.849609389" value={phone}
                    onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210"
                    className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                  />
                </div>

                <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">City, State *</label>
                  <input
                    type="text" name="entry.285819162" value={city}
                    onChange={(e) => setCity(e.target.value)} placeholder="New Delhi, Delhi"
                    className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                  />
                </div>
              </div>

              <button
                type="button" disabled={!name || !email || !phone || !city}
                onClick={() => setStep(2)}
                className="w-full bg-foreground text-background py-4 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* STEP 2: ROLE SELECT */}
            <div className={step === 2 ? "space-y-6" : "hidden"}>
              <div>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-3">Your Role.</h1>
                <p className="text-sm text-text-secondary">I would like to join NEKI as:</p>
              </div>

              <div className="relative border-b border-black/10 transition-colors py-2">
                <CustomSelect
                  name="entry.222711120"
                  value={role}
                  onChange={(val) => setRole(val)}
                  options={roleOptions}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button" onClick={() => setStep(determinePrevStep())}
                  className="w-1/3 border border-black/10 text-foreground py-4 rounded-full font-medium text-sm hover:bg-black/5 transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button" onClick={() => setStep(determineNextStep())}
                  className="w-2/3 bg-foreground text-background py-4 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* STEP 2A: VOLUNTEER DETAILS (Conditional) */}
            <div className={step === 21 ? "space-y-6" : "hidden"}>
              <div>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-3">Volunteer Profile.</h1>
                <p className="text-sm text-text-secondary">Tell us about your volunteering interests.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold mb-3">Volunteer Interests *</label>
                  <div className="flex flex-wrap gap-2">
                    {volunteerInterestOptions.map((opt) => {
                      const isSel = volunteerInterests.includes(opt);
                      return (
                        <button
                          type="button" key={opt} onClick={() => toggleSelection(volunteerInterests, setVolunteerInterests, opt)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                            isSel ? "bg-neki-gold/15 border-neki-gold text-neki-gold" : "border-black/10 hover:border-black/25 text-foreground"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {/* Render parameters conditionally by name only when role is active */}
                  {isVolunteerRole && volunteerInterests.map(opt => (
                    <input key={opt} type="hidden" name="entry.1451990690" value={opt} />
                  ))}
                </div>

                <div className="relative border-b border-black/10 transition-colors py-2">
                  <CustomSelect
                    name={isVolunteerRole ? "entry.1134721925" : "inactive_timeCommitment"}
                    value={timeCommitment}
                    onChange={(val) => setTimeCommitment(val)}
                    options={["1–2 hrs/week", "3–5 hrs/week", "5–10 hrs/week", "10+ hrs/week"]}
                    label="How much time can you contribute? *"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button" onClick={() => setStep(2)}
                  className="w-1/3 border border-black/10 text-foreground py-4 rounded-full font-medium text-sm hover:bg-black/5 transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button" disabled={isVolunteerRole && volunteerInterests.length === 0}
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-foreground text-background py-4 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* STEP 2B: ORG DETAILS (Conditional) */}
            <div className={step === 22 ? "space-y-6" : "hidden"}>
              <div>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-3">Organization Profile.</h1>
                <p className="text-sm text-text-secondary">Information for verified partners.</p>
              </div>

              <div className="space-y-4">
                <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">Organization Name *</label>
                  <input
                    type="text" 
                    name={isOrgRole ? "entry.1535691708" : "inactive_orgName"} 
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)} placeholder="ABC Foundation"
                    className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                  />
                </div>

                <div className="relative border-b border-black/10 focus-within:border-neki-gold transition-colors py-2">
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">Website / Social Link *</label>
                  <input
                    type="url" 
                    name={isOrgRole ? "entry.1799090949" : "inactive_orgWebsite"} 
                    value={orgWebsite}
                    onChange={(e) => setOrgWebsite(e.target.value)} placeholder="https://abc.org"
                    className="w-full bg-transparent outline-none border-none text-foreground py-1 text-sm placeholder-black/20"
                  />
                </div>

                <div className="relative border-b border-black/10 transition-colors py-2">
                  <CustomSelect
                    name={isOrgRole ? "entry.308378145" : "inactive_orgType"}
                    value={orgType}
                    onChange={(val) => setOrgType(val)}
                    options={["NGO", "School", "College", "Corporate", "Shelter", "Hospital", "Community Group", "Other"]}
                    label="Organization Type *"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold mb-3">Interested In *</label>
                  <div className="flex flex-wrap gap-2">
                    {orgInterestOptions.map((opt) => {
                      const isSel = orgInterests.includes(opt);
                      return (
                        <button
                          type="button" key={opt} onClick={() => toggleSelection(orgInterests, setOrgInterests, opt)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                            isSel ? "bg-neki-gold/15 border-neki-gold text-neki-gold" : "border-black/10 hover:border-black/25 text-foreground"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {isOrgRole && orgInterests.map(opt => (
                    <input key={opt} type="hidden" name="entry.489114980" value={opt} />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button" onClick={() => setStep(2)}
                  className="w-1/3 border border-black/10 text-foreground py-4 rounded-full font-medium text-sm hover:bg-black/5 transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button" disabled={isOrgRole && (!orgName || !orgWebsite || orgInterests.length === 0)}
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-foreground text-background py-4 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* STEP 3: CONTRIBUTION PREFERENCES */}
            <div className={step === 3 ? "space-y-6" : "hidden"}>
              <div>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-3">Contributions.</h1>
                <p className="text-sm text-text-secondary">How you prefer to interact and help.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold mb-3">How would you prefer to contribute? *</label>
                  <div className="flex flex-wrap gap-2">
                    {contributionTypeOptions.map((opt) => {
                      const isSel = contributionPreferences.includes(opt);
                      return (
                        <button
                          type="button" key={opt} onClick={() => toggleSelection(contributionPreferences, setContributionPreferences, opt)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                            isSel ? "bg-neki-gold/15 border-neki-gold text-neki-gold" : "border-black/10 hover:border-black/25 text-foreground"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {/* Contribution types serialization fallback */}
                  {contributionPreferences.length > 0 ? (
                    contributionPreferences.map(opt => (
                      <input key={opt} type="hidden" name="entry.368946662" value={opt} />
                    ))
                  ) : (
                    <input type="hidden" name="entry.368946662" value="Time" />
                  )}
                </div>

                <div className="relative border-b border-black/10 transition-colors py-2">
                  <CustomSelect
                    name="entry.297171350"
                    value={contributionFrequency}
                    onChange={(val) => setContributionFrequency(val)}
                    options={["Weekly", "Monthly", "Occasionally", "Only for urgent missions"]}
                    label="How often would you like to contribute? *"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold mb-3">Causes that matter most to you? *</label>
                  <div className="flex flex-wrap gap-2">
                    {causesOptions.map((opt) => {
                      const isSel = selectedCauses.includes(opt);
                      return (
                        <button
                          type="button" key={opt} onClick={() => toggleSelection(selectedCauses, setSelectedCauses, opt)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                            isSel ? "bg-neki-gold/15 border-neki-gold text-neki-gold" : "border-black/10 hover:border-black/25 text-foreground"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {selectedCauses.length > 0 ? (
                    selectedCauses.map(opt => (
                      <input key={opt} type="hidden" name="entry.553781524" value={opt} />
                    ))
                  ) : (
                    <input type="hidden" name="entry.553781524" value="Community Development" />
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button" onClick={() => setStep(determinePrevStep())}
                  className="w-1/3 border border-black/10 text-foreground py-4 rounded-full font-medium text-sm hover:bg-black/5 transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button" disabled={contributionPreferences.length === 0 || selectedCauses.length === 0}
                  onClick={() => setStep(4)}
                  className="w-2/3 bg-foreground text-background py-4 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* STEP 4: PRODUCT PREFERENCES (Grid rows) */}
            <div className={step === 4 ? "space-y-6" : "hidden"}>
              <div>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-3">Impact & Product.</h1>
                <p className="text-sm text-text-secondary">Evaluating features and trackability weight.</p>
              </div>

              <div className="space-y-6">
                {/* Importance Scale */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold mb-2">
                    Importance of tracking impact (1-10) *
                  </label>
                  <div className="flex justify-between items-center gap-1">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((num) => (
                      <button
                        type="button" key={num} onClick={() => setImpactImportance(num)}
                        className={`w-8 h-8 rounded-full border text-xs font-semibold flex items-center justify-center transition-all ${
                          impactImportance === num ? "bg-neki-gold border-neki-gold text-background shadow-md" : "border-black/5 hover:border-black/25 text-foreground"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="entry.227345805" value={impactImportance} />
                </div>

                {/* Feature Value Grid */}
                <div className="space-y-4 pt-2">
                  <label className="block text-[10px] uppercase tracking-widest text-text-muted font-bold">
                    Valuable Platform Features
                  </label>
                  
                  {/* Row 1: GPS tracking */}
                  <div className="border border-black/5 rounded-xl p-3.5 space-y-2.5 bg-background">
                    <p className="text-xs font-bold">Real-time mission tracking (GPS/photos)</p>
                    <div className="flex gap-2">
                      {["Very Valuable", "Neutral", "Less Valuable"].map((v) => (
                        <button
                          type="button" key={v} onClick={() => setFeatureGPS(v)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                            featureGPS === v ? "bg-foreground text-background" : "bg-surface border border-black/5 text-text-secondary hover:text-foreground"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="entry.324658014" value={featureGPS} />
                  </div>

                  {/* Row 2: Verified profiles */}
                  <div className="border border-black/5 rounded-xl p-3.5 space-y-2.5 bg-background">
                    <p className="text-xs font-bold">Verified contributor & recipient profiles</p>
                    <div className="flex gap-2">
                      {["Very Valuable", "Neutral", "Less Valuable"].map((v) => (
                        <button
                          type="button" key={v} onClick={() => setFeatureProfiles(v)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                            featureProfiles === v ? "bg-foreground text-background" : "bg-surface border border-black/5 text-text-secondary hover:text-foreground"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="entry.159809934" value={featureProfiles} />
                  </div>

                  {/* Row 3: Digital ledger */}
                  <div className="border border-black/5 rounded-xl p-3.5 space-y-2.5 bg-background">
                    <p className="text-xs font-bold">Digital ledger of all contributions</p>
                    <div className="flex gap-2">
                      {["Very Valuable", "Neutral", "Less Valuable"].map((v) => (
                        <button
                          type="button" key={v} onClick={() => setFeatureLedger(v)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                            featureLedger === v ? "bg-foreground text-background" : "bg-surface border border-black/5 text-text-secondary hover:text-foreground"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="entry.1634275683" value={featureLedger} />
                  </div>

                  {/* Row 4: P2P Volunteer tools */}
                  <div className="border border-black/5 rounded-xl p-3.5 space-y-2.5 bg-background">
                    <p className="text-xs font-bold">Peer-to-peer volunteer coordination</p>
                    <div className="flex gap-2">
                      {["Very Valuable", "Neutral", "Less Valuable"].map((v) => (
                        <button
                          type="button" key={v} onClick={() => setFeatureP2P(v)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                            featureP2P === v ? "bg-foreground text-background" : "bg-surface border border-black/5 text-text-secondary hover:text-foreground"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="entry.1412803646" value={featureP2P} />
                  </div>

                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button" onClick={() => setStep(3)}
                  className="w-1/3 border border-black/10 text-foreground py-4 rounded-full font-medium text-sm hover:bg-black/5 transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit" disabled={submitting}
                  className="w-2/3 bg-foreground text-background py-4 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
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
