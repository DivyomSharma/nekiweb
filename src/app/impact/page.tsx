"use client";

import React, { useState } from "react";
import { DetailLayout } from "@/components/ui/DetailLayout";
import { Search, ShieldAlert, Sparkles } from "lucide-react";

interface LedgerEntry {
  id: string;
  contribution: string;
  contributor: string;
  organization: string;
  location: string;
  beneficiaries: string;
  deliveredDate: string;
  proofType: string;
}

export default function ImpactPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "individual" | "corporate">("all");

  const ledgerData: LedgerEntry[] = [
    {
      id: "NEK48291",
      contribution: "120 Books",
      contributor: "XYZ Corporation (CSR)",
      organization: "ABC Foundation",
      location: "Delhi",
      beneficiaries: "87 Students",
      deliveredDate: "24 Aug 2026",
      proofType: "Photos + Receipt",
    },
    {
      id: "NEK88390",
      contribution: "50 Winter Blankets",
      contributor: "Divyom Sharma",
      organization: "Noida Shelter Home",
      location: "Noida",
      beneficiaries: "50 Residents",
      deliveredDate: "26 Aug 2026",
      proofType: "Geotagged Photo",
    },
    {
      id: "NEK29481",
      contribution: "70 Laptops (Surplus)",
      contributor: "Tech Solutions Ltd",
      organization: "Youth Literacy NGO",
      location: "Gurugram",
      beneficiaries: "70 Students",
      deliveredDate: "18 Aug 2026",
      proofType: "Assets Signed Slip",
    },
    {
      id: "NEK10294",
      contribution: "200 Litres Milk",
      contributor: "Anjali Gupta",
      organization: "Shree Gaushala",
      location: "South Delhi",
      beneficiaries: "200 Cows Fed",
      deliveredDate: "25 Aug 2026",
      proofType: "Acknowledgement Receipt",
    },
  ];

  const filteredData = ledgerData.filter(item => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      item.id.toLowerCase().includes(query) ||
      item.contribution.toLowerCase().includes(query) ||
      item.contributor.toLowerCase().includes(query) ||
      item.organization.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query);

    if (filterType === "all") return matchesSearch;
    if (filterType === "corporate") return matchesSearch && item.contributor.includes("CSR") || item.contributor.includes("Ltd") || item.contributor.includes("Solutions");
    if (filterType === "individual") return matchesSearch && !item.contributor.includes("CSR") && !item.contributor.includes("Ltd") && !item.contributor.includes("Solutions");
    return matchesSearch;
  });

  return (
    <DetailLayout
      title="Proof of Impact"
      subtitle="Goodness should be seen, not assumed. Every completed mission is logged transparently on the public Neki Impact Ledger."
      shapeName="camera"
    >
      {/* Search & Filter Bar */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 bg-surface border border-black/5 rounded-xl px-4 py-2 flex items-center gap-3">
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search by ID, Contributor, or NGO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-foreground placeholder-black/20"
            />
          </div>
          <div className="flex bg-surface border border-black/5 p-1 rounded-xl gap-1">
            {(["all", "individual", "corporate"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                  filterType === type 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-text-secondary hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Entries List */}
        <div className="space-y-4 pt-2">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="border border-black/5 rounded-2xl p-5 space-y-4 hover:shadow-lg transition-shadow bg-background">
                <div className="flex justify-between items-start border-b border-black/5 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-foreground font-heading">ID: #{item.id}</h3>
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mt-1">
                      Delivered: {item.deliveredDate}
                    </p>
                  </div>
                  <span className="bg-neki-green/10 text-neki-green border border-neki-green/20 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neki-green" />
                    Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-text-muted mb-0.5">Contribution</span>
                    <p className="font-semibold text-foreground">{item.contribution}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-text-muted mb-0.5">Contributor</span>
                    <p className="font-semibold text-foreground">{item.contributor}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-text-muted mb-0.5">Target NGO / Organization</span>
                    <p className="font-semibold text-foreground">{item.organization}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-text-muted mb-0.5">Location</span>
                    <p className="font-semibold text-foreground">{item.location}</p>
                  </div>
                </div>

                <div className="bg-surface border border-black/5 px-4 py-2.5 rounded-xl flex items-center justify-between text-[11px] text-text-secondary">
                  <div><strong>Beneficiaries:</strong> {item.beneficiaries}</div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-neki-gold">
                    <Sparkles className="w-3.5 h-3.5" />
                    {item.proofType}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-black/10 rounded-2xl text-text-muted space-y-2">
              <ShieldAlert className="w-8 h-8 mx-auto text-text-muted/40" />
              <p className="text-xs">No matching verified ledger entries found.</p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-bold font-heading">Digital Memory of Goodwill</h2>
        <p>
          The NEKI Impact Ledger operates as a secure digital ledger. It locks receipts, beneficiary documentation, and execution coordinates into a permanent record, allowing volunteers, NGOs, and CSR departments to check and audits their work in real-time.
        </p>
      </section>
    </DetailLayout>
  );
}
