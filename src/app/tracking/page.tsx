import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

export default function TrackingPage() {
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
          Live <span className="font-playfair italic text-foreground">Tracking.</span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed mb-12">
          Follow every step. From contribution to completion. Nothing disappears.
        </p>

        <div className="prose prose-lg prose-neutral prose-headings:font-heading prose-headings:font-bold max-w-none space-y-8">
          
          <div className="bg-white/60 backdrop-blur-2xl border border-black/5 p-8 rounded-3xl w-full max-w-sm relative shadow-xl shadow-black/5 my-12 not-prose">
            <div className="flex justify-between items-center mb-8">
              <span className="text-foreground text-sm font-bold tracking-widest uppercase">Tracking Philosophy</span>
              <MapPin className="text-neki-gold w-5 h-5" />
            </div>
            <div className="space-y-6 font-medium text-base">
              <div className="flex items-center gap-4 text-text-muted"><div className="w-3 h-3 rounded-full bg-black/10" /> Mission Created</div>
              <div className="flex items-center gap-4 text-text-muted"><div className="w-3 h-3 rounded-full bg-black/10" /> Volunteer Assigned</div>
              <div className="flex items-center gap-4 text-foreground"><div className="w-3 h-3 rounded-full bg-neki-gold shadow-[0_0_12px_rgba(212,175,106,0.6)]" /> En Route</div>
              <div className="flex items-center gap-4 text-text-muted/40"><div className="w-3 h-3 rounded-full border-2 border-black/10" /> Delivered</div>
              <div className="flex items-center gap-4 text-text-muted/40"><div className="w-3 h-3 rounded-full border-2 border-black/10" /> Verified</div>
            </div>
          </div>

          <section>
            <h2 className="text-3xl">Total Visibility</h2>
            <p>We believe that when you contribute, you have the right to know exactly what happens next. Our live tracking ensures that every action is documented.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
