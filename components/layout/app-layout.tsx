"use client";
import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { QueryProvider } from "@/lib/providers/query-provider";
import { CommandPalette } from "./command-palette";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);

  return (
    <QueryProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full overflow-hidden bg-[#f4f6f8] dark:bg-[#0b1326] font-sans">
          {/* Sidebar */}
          <AppSidebar />
          
          <SidebarInset className="flex flex-col flex-1 min-w-0">
            {/* Top Bar */}
            <TopBar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
            
            {/* Main Content Area */}
            <main className="flex-1 w-full flex flex-col items-center overflow-auto px-6 py-6 md:px-8">
              <div className="w-full max-w-[1440px] animate-in fade-in slide-in-from-bottom-2 duration-700">
                {children}
              </div>
            </main>
          </SidebarInset>
          
          {/* Command Palette Overlay */}
          <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
        </div>
      </SidebarProvider>
    </QueryProvider>
  );
}
