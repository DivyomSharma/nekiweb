import { DetailLayout } from "@/components/ui/DetailLayout";

export default function TrustPage() {
  return (
    <DetailLayout
      title="How Trust Works"
      subtitle="Trust is built where uncertainty ends. Explore the layered verification infrastructure of the NEKI Trust Layer."
      shapeName="shield"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">The NEKI Trust Layer</h2>
        <p>
          Traditional philanthropy asks you to write a check and trust blindly. We believe trust shouldn't be assumed—it should be designed into the infrastructure.
        </p>
        <p>
          NEKI operates a three-part coordination protocol that ensures complete accountability from the moment you make a choice to the final delivery of impact.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">1. Organization Verification</h2>
        <p>
          Not just anyone can publish a mission. Every NGO, school, shelter, and community partner goes through a rigorous onboarding process:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Entity Verification:</strong> Verification of registrations, trust deeds, and statutory IDs.</li>
          <li><strong>Tax Eligibility checks:</strong> Status checks on active 12A / 80G tax exemptions where applicable.</li>
          <li><strong>Fulfillment Vetting:</strong> Background audits on past projects, ground operations, and local credibility.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">2. Contribution Recording</h2>
        <p>
          Every contribution—whether money, time, skills, or physical goods—is cataloged under a unique NEKI ID.
        </p>
        <p>
          This record creates an unalterable trail. We document who contributed, which volunteer picked it up, who coordinated the transport, and which verified organization accepted the final delivery.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">3. Verified Impact Records</h2>
        <p>
          The final mile is never left to assumption. Every completed mission is locked with:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Geotagged & Timestamped Photo Proof:</strong> Photos taken directly at execution.</li>
          <li><strong>Digital Receipt Acknowledgement:</strong> Standard signed slips from local beneficiaries or local community representatives.</li>
          <li><strong>Outcome Audits:</strong> Independent post-mission verification to evaluate long-term success.</li>
        </ul>
      </section>
    </DetailLayout>
  );
}
