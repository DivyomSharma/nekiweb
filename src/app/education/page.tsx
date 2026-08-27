import { DetailLayout } from "@/components/ui/DetailLayout";

export default function EducationPage() {
  return (
    <DetailLayout
      title="Knowledge, Delivered."
      subtitle="Knowledge travels farther than books. The most valuable thing you can share is what you know."
      shapeName="book"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Beyond Material Donations</h2>
        <p>
          Education at NEKI is not just about shipping boxes of notebooks. It is about matching educational resources and capability directly with schools, libraries, and youth centers.
        </p>
        <p>
          We coordinate:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Tangible Resources:</strong> Uniforms, school bags, learning kits, computers, and internet access setups.</li>
          <li><strong>Capability:</strong> Volunteer teaching, career guidance, mentorship, coding workshops, and local tutoring drives.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Education Missions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">100 School Kits</h4>
            <p className="text-xs text-text-secondary mt-1">Distributing backpacks, notebooks, and writing materials to rural schools.</p>
          </div>
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">Library Setup</h4>
            <p className="text-xs text-text-secondary mt-1">Collecting and indexing educational books for community reading rooms.</p>
          </div>
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">Career Mentorship</h4>
            <p className="text-xs text-text-secondary mt-1">Professionals providing online career path guidance and resume reviews.</p>
          </div>
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">Rural Internet Access</h4>
            <p className="text-xs text-text-secondary mt-1">Installing router hardware and screens to enable digital learning hubs.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Share What You Know</h2>
        <p>
          If you have professional expertise—whether in programming, design, languages, or management—you have a valuable resource to contribute. Skip the check and teach a class, guide a student, or help set up a school's computer lab.
        </p>
      </section>
    </DetailLayout>
  );
}
