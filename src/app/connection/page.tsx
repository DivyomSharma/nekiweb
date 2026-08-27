import { DetailLayout } from "@/components/ui/DetailLayout";

export default function ConnectionPage() {
  return (
    <DetailLayout
      title="Connected Goodness"
      subtitle="Goodness scales through connection. One person can help, but a network changes what is possible."
      shapeName="network"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Beyond Scattered Acts</h2>
        <p>
          Single acts of kindness are powerful, but they operate in isolation. When resources, coordinators, ground execution partners, and tracking tools are scattered, impact remains low.
        </p>
        <p>
          NEKI brings these nodes together. We coordinate:
        </p>
        <div className="bg-surface border border-black/5 p-6 rounded-2xl space-y-2 my-4">
          <p className="text-sm">
            <strong>Contributor</strong> (funds/goods) ➔ <strong>Volunteer</strong> (picks up/delivers) ➔ <strong>NGO / Executor</strong> (distributes) ➔ <strong>Beneficiary</strong> (receives) ➔ <strong>Public Ledger</strong> (records proof).
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading font-heading">Human Network Nodes</h2>
        <p>
          A single winter blanket drive connects multiple groups:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Corporates / CSR:</strong> Sponsoring raw materials or surplus blankets.</li>
          <li><strong>Schools / Colleges:</strong> Students volunteering to package, organize, and transport.</li>
          <li><strong>Verified NGOs:</strong> Ground workers mapping local families in need and handling distribution.</li>
          <li><strong>Contributors:</strong> Local residents checking progress and offering additional support.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Coordinated Scaling</h2>
        <p>
          When the connection is complete, scaling becomes organic. One verified mission generates photo proofs, which inspire other contributors, who then fund three more missions, recruiting ten more local volunteers. This is how goodness compounds.
        </p>
      </section>
    </DetailLayout>
  );
}
