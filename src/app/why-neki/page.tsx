import { DetailLayout } from "@/components/ui/DetailLayout";

export default function WhyNekiPage() {
  return (
    <DetailLayout
      title="Why NEKI Exists"
      subtitle="Good intentions deserve better infrastructure. Rebuilding the invisible chain between intention and outcome."
      shapeName="phone"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">The Invisible Chain of Giving</h2>
        <p>
          People still want to help. In fact, human empathy is at an all-time high. But many of us have developed a psychological stopping point: <i>"I've made my donation. I've done my part."</i>
        </p>
        <p>
          We do this because what happens after payment is completely invisible. We don't know where the contribution went, who handled it, whether it reached the intended destination, or if the mission was actually completed.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">The Trust Deficit</h2>
        <p>
          People don't stop helping because they stop caring. They stop helping because they stop seeing where help goes.
        </p>
        <p>
          Traditional platforms treat donations as a simple transactional checkout. They solve payment but fail at visibility. NEKI treats helping as a live, trackable loop—bringing clarity where uncertainty used to reside.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Our Core Philosophy</h2>
        <p>
          We are not building another place to pitch charities. We are building the coordination and trust infrastructure that connects human goodness with verified, real-world impact.
        </p>
        <div className="bg-surface border border-black/5 p-6 rounded-2xl space-y-2 mt-4">
          <h4 className="font-semibold text-neki-gold">The Flywheel Loop:</h4>
          <p className="text-sm">
            Intention ➔ Contribution ➔ Mission ➔ Coordination ➔ Execution ➔ Live Tracking ➔ Verified Proof ➔ Visible Impact ➔ Inspiration.
          </p>
        </div>
      </section>
    </DetailLayout>
  );
}
