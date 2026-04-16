import { KPICards } from "@/components/dashboard/kpi-cards";
import { ShipmentMap } from "@/components/dashboard/shipment-map";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ActionList } from "@/components/dashboard/action-list";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-8 relative">
      {/* Zone 1: KPI Cards */}
      <KPICards />

      {/* Zone 2: Interactive Map (60vh) */}
      <ShipmentMap />

      {/* Zone 3: Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ minHeight: "480px" }}>
        {/* Left: Action Required */}
        <ActionList />

        {/* Right: Activity Feed */}
        <ActivityFeed />
      </div>

      {/* Contextual FAB */}
      <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#0D9488] to-[#1B2A4A] text-white shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform z-50">
        <span className="material-symbols-outlined text-3xl">add</span>
        <span className="absolute right-full mr-4 px-3 py-1 bg-surface-container-highest text-on-surface rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-sm font-semibold shadow-xl">
          Create New Shipment
        </span>
      </button>
    </div>
  );
}
