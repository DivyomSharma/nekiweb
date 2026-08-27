import { DetailLayout } from "@/components/ui/DetailLayout";

export default function NetworkPage() {
  return (
    <DetailLayout
      title="How The Network Works"
      subtitle="Humanity works better as a network. NEKI connects resources, execution, and tracking into a single, cohesive infrastructure."
      shapeName="network"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">The Interconnected Flywheel</h2>
        <p>
          NEKI does not act as a gatekeeper or a simple donation collector. Instead, it serves as a decentralized coordination network where each participant strengthens the system.
        </p>
        <p>
          As more volunteers, NGOs, and corporations join the network, the speed, transparency, and impact verification of every mission increases exponentially.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-heading">The Four Core Nodes</h2>
        
        <div className="space-y-4">
          <div className="border-l-2 border-neki-gold pl-4 space-y-1">
            <h4 className="font-bold text-foreground">1. Individuals (The Intention Node)</h4>
            <p className="text-xs text-text-secondary">
              Provide the raw fuel: money, physical goods, time, or professional skills. Anyone can launch or fund a mission.
            </p>
          </div>

          <div className="border-l-2 border-neki-gold pl-4 space-y-1">
            <h4 className="font-bold text-foreground">2. Organizations (The Execution Node)</h4>
            <p className="text-xs text-text-secondary">
              Vetted NGOs, gaushalas, schools, and hospitals that create structured missions, request specific resources, and execute the final-mile work on the ground.
            </p>
          </div>

          <div className="border-l-2 border-neki-gold pl-4 space-y-1">
            <h4 className="font-bold text-foreground">3. Volunteers (The Logistics Node)</h4>
            <p className="text-xs text-text-secondary">
              The physical bridge. Volunteers pick up goods, coordinate transport, teach classes, set up medical camps, and verify deliveries.
            </p>
          </div>

          <div className="border-l-2 border-neki-gold pl-4 space-y-1">
            <h4 className="font-bold text-foreground">4. Enterprises & Institutions (The Resource Node)</h4>
            <p className="text-xs text-text-secondary">
              Colleges running service-learning campaigns, schools organizing local drives, and corporations sponsoring campaigns, deploying employees, or routing corporate surplus.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-heading">Coordinated Impact Flow</h2>
        <p>
          When an institution donates surplus laptops, NEKI automatically matches it with schools in need, coordinates pickup with local logistics volunteers, tracks delivery en route, and logs verified photo proof. 
        </p>
        <p>
          No item gets lost. No intention gets wasted. The network ensures that every resource flows precisely where it creates maximum impact.
        </p>
      </section>
    </DetailLayout>
  );
}
