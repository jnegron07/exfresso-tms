"use client";

import { AppSidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { QueryProvider } from "@/lib/providers/query-provider";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-surface text-on-surface font-sans">
        {/* Fixed Sidebar */}
        <AppSidebar />
        {/* Fixed TopBar (offset by sidebar width) */}
        <TopBar />
        {/* Main Content (offset by sidebar + topbar) */}
        <main className="ml-64 pt-20 min-h-screen">
          {children}
        </main>
      </div>
    </QueryProvider>
  );
}
