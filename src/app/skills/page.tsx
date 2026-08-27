import { DetailLayout } from "@/components/ui/DetailLayout";

export default function SkillsPage() {
  return (
    <DetailLayout
      title="Skills, Delivered."
      subtitle="Expertise is a powerful form of service. Match your capabilities directly with community needs."
      shapeName="gear"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Matching Capability with Need</h2>
        <p>
          You don't need a corporate surplus or capital to make a difference. Some of the most valuable resources are locked in the minds of professionals. NEKI matches capability with needs to help grassroot organizations scale up.
        </p>
        <p>
          We coordinate skills across multiple areas:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Technology & Design:</strong> Designing branding, building websites, or structuring data for small NGOs.</li>
          <li><strong>Teaching & Mentorship:</strong> Organizing digital literacy classes, career guidance sessions, or language courses.</li>
          <li><strong>Professional Audits:</strong> Helping grassroots organizations audit accounts, draft legal documents, or plan CSR compliance.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading font-heading">Example Skill Missions</h2>
        <div className="border border-black/5 p-5 rounded-2xl space-y-3 mt-2 bg-background">
          <div className="flex justify-between items-center border-b border-black/5 pb-2">
            <h4 className="font-bold text-foreground">NGO Website Redesign</h4>
            <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-[10px] font-bold">5 Hours</span>
          </div>
          <p className="text-xs text-text-secondary">
            Help local animal shelter redesign their home page to increase adoption rates. Needs React/Tailwind experience.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">The Skills Network Effect</h2>
        <p>
          By coordinating skills, NEKI increases the execution capability of charities. A developer in Bangalore can build an portal for a kitchen in Noida, who can then feed 500 more children daily. Goodness multiplies when we share what we know.
        </p>
      </section>
    </DetailLayout>
  );
}
