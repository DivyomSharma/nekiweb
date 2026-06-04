import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

export default function ImpactPage() {
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
          Proof of <span className="font-playfair italic text-neki-gold">Impact.</span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed mb-12">
          Impact should be seen. Not assumed. Dive into real stories and visual proof.
        </p>

        <div className="prose prose-lg prose-neutral prose-headings:font-heading prose-headings:font-bold max-w-none space-y-8">
          <ImageIcon className="w-16 h-16 text-neki-gold mb-8" strokeWidth={1.5} />
          
          <section>
            <h2 className="text-3xl">Visual Proof</h2>
            <p>Every mission concludes with verifiable visual proof—photos and videos uploaded by volunteers and verified by the network.</p>
          </section>

          <section>
            <h2 className="text-3xl">Mission Stories</h2>
            <p>Numbers don't tell the whole story. We document the human element behind every mission, creating a living archive of kindness.</p>
          </section>

          <section>
            <h2 className="text-3xl">Inspiration Loops</h2>
            <p>Seeing real impact inspires more action. By sharing these stories socially, one completed mission can spark the creation of ten more.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
