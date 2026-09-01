import { DetailLayout } from "@/components/ui/DetailLayout";
import { Neki } from "@/components/ui/Neki";

export default function AboutPage() {
  return (
    <DetailLayout
      title={<>About <Neki /></>}
      subtitle={<><Neki /> = an act of goodness. We are building the coordinate rails and transparency layer for global kindness.</>}
      shapeName="logo"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Our Origin & Meaning</h2>
        <p>
          Derived from the word meaning <i>"an act of goodness or kindness,"</i> <Neki /> was born out of a simple observation: human goodness is abundant, but the infrastructure surrounding it is severely fragmented.
        </p>
        <p>
          We realized that while modern commerce has engineered seamless pipelines to deliver food, rides, and goods in minutes, social impact still relies on methods from the previous century. We set out to change that.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Our Mission</h2>
        <p>
          Our mission is to make helping people as fast, trusted, and repeatable as modern commerce. 
        </p>
        <p>
          By creating the **coordination layer for social impact**, we bridge the gap between intent and outcome. We empower individuals, mobilize volunteers, enable verified NGOs, and connect corporate resources to solve real-world problems transparently.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">The Long-Term Vision</h2>
        <p>
          We envision a future where social good is not an occasional transaction, but a seamless, everyday economy of participation. 
        </p>
        <p>
          Through our verified impact tracking, live ledgers, and coordination nodes, we turn vague intentions into undeniable outcomes. When millions can move together with perfect trust, what once seemed impossible becomes routine.
        </p>
      </section>
    </DetailLayout>
  );
}
