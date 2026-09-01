import { DetailLayout } from "@/components/ui/DetailLayout";
import { Neki } from "@/components/ui/Neki";

export default function CarePage() {
  return (
    <DetailLayout
      title="Care, Delivered."
      subtitle="Care should never be out of reach. Coordinating support and medical relief when and where it is needed most."
      shapeName="cross"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Coordinated Healthcare Access</h2>
        <p>
          <Neki /> serves as the logistics and resource matching coordinator. We connect donors, local volunteers, and qualified medical professionals to set up mobile clinics, procure critical medicines, and host health programs.
        </p>
        <blockquote>
          <strong>Important Coordination Standard:</strong> <Neki /> manages the logistics and coordinates resource flows; all clinical care, diagnosis, and medical procedures are executed solely by licensed professionals and accredited healthcare organizations.
        </blockquote>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Active Care Missions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">First Aid Camps</h4>
            <p className="text-xs text-text-secondary mt-1">Coordinating medical kit supply and volunteer support for slums.</p>
          </div>
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">Medicine Procurements</h4>
            <p className="text-xs text-text-secondary mt-1">Matching patients' prescriptions with local pharmacy donations.</p>
          </div>
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">Blood Donation Drives</h4>
            <p className="text-xs text-text-secondary mt-1">Routing emergency blood requirements to verified local donors.</p>
          </div>
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">Mobility Aid Matches</h4>
            <p className="text-xs text-text-secondary mt-1">Coordinating collection and delivery of second-hand wheelchairs.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Coordination Flow</h2>
        <p>
          A community needs a health check camp. <Neki /> maps the request ➔ coordinates medical kit sponsorship from individuals ➔ recruits logistics volunteers ➔ maps shifts for local doctors ➔ executes the camp ➔ uploads verified reports.
        </p>
      </section>
    </DetailLayout>
  );
}
