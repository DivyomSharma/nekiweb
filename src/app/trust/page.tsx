import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function TrustPage() {
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
          How Trust <span className="font-playfair italic text-neki-green">Works.</span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed mb-12">
          Trust begins where uncertainty ends. Explore our verification and proof systems.
        </p>

        <div className="prose prose-lg prose-neutral prose-headings:font-heading prose-headings:font-bold max-w-none space-y-8">
          <ShieldCheck className="w-16 h-16 text-neki-green mb-8" strokeWidth={1.5} />
          
          <section>
            <h2 className="text-3xl">Verification & Accountability</h2>
            <p>Every participant in the NEKI network goes through rigorous verification. We don't just rely on goodwill; we build systems that enforce accountability at every step.</p>
          </section>

          <section>
            <h2 className="text-3xl">Proof Systems & Audit Trails</h2>
            <p>Cryptographic audit trails and immutable records ensure that when we say something is delivered, it is mathematically proven to be delivered.</p>
          </section>

          <section>
            <h2 className="text-3xl">NGO Trust</h2>
            <p>We work with vetted NGOs to ensure that the final mile delivery is handled by professionals who understand the ground realities.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
