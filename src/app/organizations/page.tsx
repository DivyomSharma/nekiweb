import { DetailLayout } from "@/components/ui/DetailLayout";

export default function OrganizationsPage() {
  return (
    <DetailLayout
      title="For Organizations"
      subtitle="The coordination and distribution rails for NGOs, colleges, schools, and community groups."
      shapeName="network"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Empowering NGOs & Shelters</h2>
        <p>
          NEKI serves as your tech, logistics, and trust partner. Grassroots organizations often spend too much time chasing donors and managing coordination. We streamline your operations so you can focus on execution.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Publish Needs:</strong> Create structured missions detailing specific resource, funding, or volunteer requirements.</li>
          <li><strong>Volunteer Recruitment:</strong> Access a pool of local student and professional volunteers automatically matched to your tasks.</li>
          <li><strong>Build Credibility:</strong> Accumulate unalterable photo proofs and acknowledgements on the public Impact Ledger to build long-term reputation.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">For Colleges & Schools</h2>
        <p>
          Engage students in real-world community drives and volunteering with seamless tracking:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Service Learning:</strong> Organize campus drives, cleanups, or local teaching campaigns.</li>
          <li><strong>Automated Hours & Certificates:</strong> NEKI logs verified hours automatically. No more manual logs or signed sheets.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading font-heading">Onboarding Process</h2>
        <p>
          Onboarding is straightforward. We verify registrations, active 12A/80G filings, and operational track records. Once approved, you can launch your first mission instantly.
        </p>
      </section>
    </DetailLayout>
  );
}
