import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MissionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12 lg:p-24 selection:bg-neki-gold/30 selection:text-foreground">
      <nav className="mb-20">
        <Link href="/" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Journey
        </Link>
      </nav>

      <article className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-8">
          Explore <span className="font-playfair italic text-neki-gold">Missions.</span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed mb-12">
          Every mission starts with a simple decision. Welcome to the mission marketplace.
        </p>

        <div className="prose prose-lg prose-neutral prose-headings:font-heading prose-headings:font-bold max-w-none space-y-8">
          <section>
            <h2 className="text-3xl">Mission Categories</h2>
            <p>From providing food and medical aid to sharing knowledge and dedicating time, missions span across all forms of human kindness.</p>
          </section>
          
          <section>
            <h2 className="text-3xl">The Mission Lifecycle</h2>
            <p>A mission goes through specific phases: Created, Assigned, En Route, Delivered, and Verified. Every state change is logged and visible.</p>
          </section>

          <section>
            <h2 className="text-3xl">Start a Mission</h2>
            <p>Creating a mission is as simple as defining a need and setting a goal. The network takes over to find the right people to make it happen.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
