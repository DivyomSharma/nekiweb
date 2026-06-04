import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WhyNekiPage() {
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
          Why NEKI <span className="font-playfair italic text-text-muted">Exists.</span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed mb-12">
          Good intentions deserve better infrastructure. This is the origin story of why we had to build something new.
        </p>

        <div className="prose prose-lg prose-neutral prose-headings:font-heading prose-headings:font-bold max-w-none space-y-8">
          <section>
            <h2 className="text-3xl">The Trust Problem</h2>
            <p>For decades, people have donated with hope, but without sight. The chain of giving has been broken by intermediaries, lack of visibility, and an unfortunate history of misuse.</p>
          </section>
          
          <section>
            <h2 className="text-3xl">Why People Stopped Trusting</h2>
            <p>People do not stop helping because they stop caring. They stop helping because they stop seeing where their help goes. When the impact is invisible, the intention fades.</p>
          </section>

          <section>
            <h2 className="text-3xl">Why Infrastructure Matters</h2>
            <p>We realized that to restore trust, we didn't need better marketing—we needed better infrastructure. A transparent, undeniable ledger of goodwill where every contribution is tracked, verified, and proven.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
