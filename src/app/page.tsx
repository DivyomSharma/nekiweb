import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Contributor } from "@/components/Contributor";
import { Volunteer } from "@/components/Volunteer";
import { NGO } from "@/components/NGO";
import { Institutions } from "@/components/Institutions";
import { LiveImpact } from "@/components/LiveImpact";
import { Trust } from "@/components/Trust";
import { Storytelling } from "@/components/Storytelling";
import { AppShowcase } from "@/components/AppShowcase";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <Hero />
      <Problem />
      <HowItWorks />
      <Contributor />
      <Volunteer />
      <NGO />
      <Institutions />
      <LiveImpact />
      <Trust />
      <Storytelling />
      <AppShowcase />
      <FinalCTA />
      <Footer />
    </main>
  );
}
