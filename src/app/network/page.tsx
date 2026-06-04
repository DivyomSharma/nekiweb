import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NetworkPage() {
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
          How The <span className="font-playfair italic text-neki-gold">Network Works.</span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed mb-12">
          Humanity works better as a network. Discover how NEKI connects everyone to scale goodness.
        </p>

        <div className="prose prose-lg prose-neutral prose-headings:font-heading prose-headings:font-bold max-w-none space-y-8">
          <section>
            <h2 className="text-3xl">The Ecosystem</h2>
            <p>NEKI is not just an application; it is a living ecosystem connecting contributors, volunteers, NGOs, institutions, and local communities into a single cohesive network.</p>
          </section>
          
          <section>
            <h2 className="text-3xl">Contributors & Volunteers</h2>
            <p>Anyone can start a mission. Anyone can volunteer. The network matches needs with resources instantly, bridging the gap between intention and action.</p>
          </section>

          <section>
            <h2 className="text-3xl">Institutions & NGOs</h2>
            <p>Verified organizations leverage the network to broadcast their missions, gather resources, and prove their impact on a global stage, backed by undeniable transparency.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
