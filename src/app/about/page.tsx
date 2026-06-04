import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
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
          About <span className="font-playfair italic text-neki-gold">NEKI.</span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed mb-12">
          Humanity, Delivered. Our manifesto, vision, and the long-term dream.
        </p>

        <div className="prose prose-lg prose-neutral prose-headings:font-heading prose-headings:font-bold max-w-none space-y-8">
          <section>
            <h2 className="text-3xl">Our Manifesto</h2>
            <p>We believe that goodness is abundant, but the infrastructure to support it is broken. We are building the rails for global kindness.</p>
          </section>

          <section>
            <h2 className="text-3xl">The Vision</h2>
            <p>A world where every act of goodwill is seamlessly executed, completely transparent, and compounding in its impact.</p>
          </section>

          <section>
            <h2 className="text-3xl">The Long-term Dream</h2>
            <p>To make the impossible routine. When millions move together with perfect coordination and trust, we can solve problems that currently seem insurmountable.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
