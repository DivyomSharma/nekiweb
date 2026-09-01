import { DetailLayout } from "@/components/ui/DetailLayout";
import { Neki } from "@/components/ui/Neki";

export default function FoodPage() {
  return (
    <DetailLayout
      title="Food, Delivered."
      subtitle="A meal can change a day. Food shouldn't become waste when someone nearby needs it."
      shapeName="bowl"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">The Food Impact Ecosystem</h2>
        <p>
          At <Neki />, food coordination is more than a donation—it's a real-time matching network that connects resources directly with ground execution.
        </p>
        <p>
          We coordinate:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Resource Pooling:</strong> Surplus food, grain bags, and sponsorship funding from individuals and local businesses.</li>
          <li><strong>Execution Nodes:</strong> Vetted community kitchens, stray animal shelters, goshalas, and nutrition centers.</li>
          <li><strong>Fulfillment Logistics:</strong> Dedicated local volunteers who pick up, transport, and distribute meals.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Example Missions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">Feed 200 Cows</h4>
            <p className="text-xs text-text-secondary mt-1">Providing fresh green fodder and water supply at local shelters.</p>
          </div>
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">Community Kitchen</h4>
            <p className="text-xs text-text-secondary mt-1">Sponsoring and packing daily nutritious meals for local labor hubs.</p>
          </div>
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">Surplus Redistribution</h4>
            <p className="text-xs text-text-secondary mt-1">Routing leftover food from events/cafeterias to shelter homes.</p>
          </div>
          <div className="border border-black/5 p-4 rounded-xl">
            <h4 className="font-bold text-foreground">Emergency Food Kits</h4>
            <p className="text-xs text-text-secondary mt-1">Distributing raw ration kits (wheat, rice, lentils) to families in need.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Locate Active Needs</h2>
        <p>
          Have excess raw materials, dry rations, or cooked meals to share? Tell <Neki /> what you have, and our coordination algorithm will immediately route it to the nearest verified kitchen or shelter.
        </p>
      </section>
    </DetailLayout>
  );
}
