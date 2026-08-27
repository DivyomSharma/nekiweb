import { DetailLayout } from "@/components/ui/DetailLayout";

export default function ContributionPage() {
  return (
    <DetailLayout
      title="Beyond Money"
      subtitle="Some contributions can't be measured in currency. Time, presence, effort, and care."
      shapeName="heart"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Not Just a Donation Directory</h2>
        <p>
          At NEKI, volunteering and physical participation are treated as core resource nodes. You don't have to contribute money to create real-world impact. Your physical presence, time, and logistics assistance are just as critical.
        </p>
        <p>
          We translate these acts of goodwill into a structured, trackable participation record:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Logistics Coordination:</strong> Picking up items from donors and dropping them at shelters.</li>
          <li><strong>Direct Service:</strong> Packaging food, cleaning schools, distributing relief kits, or helping shelters.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">The Volunteer Journey</h2>
        <div className="bg-surface border border-black/5 p-6 rounded-2xl space-y-2 mt-2">
          <p className="text-sm font-medium">
            Discover a local mission ➔ Commit to a specific slot ➔ Show up on-site ➔ Complete the tasks ➔ Get verified ➔ Build your permanent impact record.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading font-heading">Verified Impact Record</h2>
        <p>
          Every hour you dedicate is locked on the NEKI platform. You build a public or private profile detailing your volunteer hours, completed drives, and verified ground projects. This becomes a tangible, certified history of your contributions to the community.
        </p>
      </section>
    </DetailLayout>
  );
}
