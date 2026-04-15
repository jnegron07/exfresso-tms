import { KPICards } from "@/components/dashboard/kpi-cards";
import { ShipmentMap } from "@/components/dashboard/shipment-map";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ActionList } from "@/components/dashboard/action-list";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-8 relative min-h-screen">
      <KPICards />

      <div className="grid grid-cols-12 gap-6">
        {/* Map Visualization (70%) */}
        <div className="col-span-12 lg:col-span-8">
          <ShipmentMap />
        </div>

        {/* Urgent Shipments (30%) */}
        <div className="col-span-12 lg:col-span-4">
          <ActionList />
        </div>
      </div>

      {/* Activity Feed Section */}
      <div className="w-full">
        <ActivityFeed />
      </div>

      {/* Contextual FAB */}
      <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform z-50">
        <span className="material-symbols-outlined text-3xl">add</span>
        <span className="absolute right-full mr-4 px-3 py-1 bg-surface-container-highest text-on-surface rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-sm font-semibold shadow-xl">
          Create New Shipment
        </span>
      </button>
    </div>
  );
}
