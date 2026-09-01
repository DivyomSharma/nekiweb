import { DetailLayout } from "@/components/ui/DetailLayout";
import { Neki } from "@/components/ui/Neki";

export default function CorporatePage() {
  return (
    <DetailLayout
      title="For Corporate & CSR"
      subtitle="Coordinated programs, employee volunteering, and surplus redistribution backed by verified impact tracking."
      shapeName="shield"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Build Measurable Social Programs</h2>
        <p>
          At <Neki />, we don't ask you to simply send CSR donations. Instead, we help you connect your social targets with verified NGOs, volunteers, and measurable ground outcomes.
        </p>
        <blockquote>
          <strong>Statutory Compliance Standard:</strong> <Neki /> coordinates campaigns and provides tracking/reporting systems; all corporate contributions flow directly to qualified nonprofit implementing partners and verified 80G/12A organizations.
        </blockquote>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Corporate Surplus to Social Impact</h2>
        <p>
          Turn excess inventory, old office laptops, or stationery into structured missions:
        </p>
        <div className="bg-surface border border-black/5 p-6 rounded-2xl space-y-2 my-4">
          <p className="text-sm">
            <strong>Surplus Identified</strong> (e.g. 70 laptops) ➔ <strong>Match</strong> (youth schools in need) ➔ <strong>Pickup</strong> (logistics volunteers) ➔ <strong>Verify</strong> (photo proofs) ➔ <strong>CSR Report</strong>.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Employee Volunteering</h2>
        <p>
          Coordinating employee volunteering shouldn't be a chore. Browse active local skill or labor needs, select slots, assign employees, and track execution:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Skill Sharing:</strong> Developers building NGO websites, lawyers reviewing leases, or doctors hosting camps.</li>
          <li><strong>Consolidated Reporting:</strong> Download real-time audits on total hours contributed, NGOs supported, and verified beneficiaries touched.</li>
        </ul>
      </section>
    </DetailLayout>
  );
}
