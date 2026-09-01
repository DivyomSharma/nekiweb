import type { Metadata } from "next";
import { WaitlistFormClient } from "./WaitlistFormClient";
import { DetailCanvas } from "@/components/ui/DetailCanvas";

export const metadata: Metadata = {
  title: "Join the NEKI Waitlist",
  description: "Apply for early access to NEKI, the live coordination network and trust layer for social impact in India.",
  openGraph: {
    title: "I joined the NEKI Waitlist",
    description: "Building the trust and coordination infrastructure for social impact. Discover how you can participate.",
    url: "https://neki.io/waitlist",
    images: [
      {
        url: "/og-waitlist.jpg",
        width: 1080,
        height: 1080,
        alt: "NEKI – We're now accepting waitlist signups.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I joined the NEKI Waitlist",
    description: "Building the trust and coordination infrastructure for social impact.",
    images: ["/og-waitlist.jpg"],
  }
};

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-neki-gold/30 selection:text-foreground flex">
      {/* Client-side form handler */}
      <WaitlistFormClient />

      {/* Right Column: Floating 3D Butterfly Logo (Hidden on Mobile) */}
      <div className="hidden md:block fixed top-0 right-0 w-[40%] h-screen z-0 border-l border-black/5">
        <DetailCanvas shapeName="logo" />
      </div>
    </main>
  );
}
